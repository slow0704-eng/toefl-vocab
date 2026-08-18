/* ============================================================
   어휘 — 플래시카드 · 퀴즈 · 단어장
   ------------------------------------------------------------
   세 화면이 order/idx/selected 같은 상태를 공유하고 서로를 다시 그리므로
   한 파일에 둔다. 밖으로 나가는 것은 없다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        qsa = A.qsa,
        esc = A.esc,
        ls = A.ls,
        shuffleInPlace = A.shuffleInPlace,
        shuffled = A.shuffled,
        boldWord = A.boldWord,
        findInflection = A.findInflection,
        LV = A.LV,
        store = A.store,
        save = A.save,
        isKnown = A.isKnown,
        isStar = A.isStar,
        toggleFlag = A.toggleFlag,
        updateProgress = A.updateProgress,
        toast = A.toast,
        WORDS = A.WORDS,
        speak = A.speak,
        beep = A.beep,
        confetti = A.confetti,
        comboBadge = A.comboBadge,
        comboPopup = A.comboPopup,
        comboSummary = A.comboSummary,
        registerCombo = A.registerCombo,
        bestCombo = A.bestCombo,
        bestLabel = A.bestLabel,
        makeWordFilter = A.makeWordFilter;

  // ---- 플래시카드 ----
  let order=[], idx=0, flipped=false;
  const card=$("card");
  const flashF = makeWordFilter("flash", ()=>{ rebuildOrder(); renderCard(); });
  function rebuildOrder(){ order = WORDS.map((_,i)=>i).filter(i=>flashF.match(WORDS[i])); idx=0; }
  const cur=()=>WORDS[order[idx]];
  function renderCard(){
    flipped=false; card.classList.remove("flipped");
    if(!order.length){
      $("fc-word").textContent="(해당 단어 없음)"; $("fc-pos").textContent="—";
      $("fc-lv").textContent="—"; $("fc-lv").className="lv-badge"; $("fc-topic").textContent="—";
      $("fc-ko").textContent="—"; $("fc-en").textContent=""; $("fc-ex").innerHTML="";
      $("fc-index").textContent="0 / 0";
      $("prev-btn").disabled=true; $("next-btn").disabled=true;
      return;
    }
    const w=cur(); if(!w) return;
    $("fc-pos").textContent=w.pos;
    const lb=$("fc-lv"); lb.textContent=LV[w.level].n; lb.className="lv-badge "+LV[w.level].c;
    $("fc-topic").textContent=w.topic||"—";
    $("fc-word").textContent=w.word;
    $("fc-ko").textContent=w.ko; $("fc-en").textContent=w.en;
    $("fc-ex").innerHTML="“"+boldWord(w.ex,w.word)+"”";
    $("fc-index").textContent=(idx+1)+" / "+order.length;
    const s=$("star-btn"); s.textContent=isStar(w.word)?"★":"☆"; s.classList.toggle("on",isStar(w.word));
    $("btn-known").innerHTML=isKnown(w.word)?"✓ 외움 (해제)":"✓ 외웠어요";
    $("prev-btn").disabled=idx===0; $("next-btn").disabled=idx===order.length-1;
  }
  function flip(){ flipped=!flipped; card.classList.toggle("flipped",flipped); }
  function go(d){ const n=idx+d; if(n<0||n>=order.length)return; idx=n; renderCard(); }
  card.addEventListener("click",e=>{ if(!order.length)return; if(e.target.closest(".star-btn")||e.target.closest(".speak"))return; flip(); });
  $("star-btn").addEventListener("click",()=>{ if(!order.length)return; toggleFlag(store.star,cur().word); renderCard(); });
  $("fc-speak-f").addEventListener("click",()=>{ if(order.length)speak(cur().word); });
  $("fc-speak-b").addEventListener("click",()=>{ if(order.length)speak(cur().word); });
  $("prev-btn").addEventListener("click",()=>go(-1));
  $("next-btn").addEventListener("click",()=>go(1));
  $("btn-known").addEventListener("click",()=>{ if(!order.length)return; const on=toggleFlag(store.known,cur().word); updateProgress(); renderCard(); if(on&&idx<order.length-1)setTimeout(()=>go(1),180); });
  $("btn-again").addEventListener("click",()=>{ if(!order.length)return; const w=cur().word; delete store.known[w]; save(); updateProgress(); renderCard(); if(idx<order.length-1)setTimeout(()=>go(1),120); });

  function shuffle(){ shuffleInPlace(order); idx=0; renderCard(); }
  $("shuffle-btn").addEventListener("click",()=>{ shuffle(); toast("순서를 섞었습니다 🔀"); });


  // ---- 퀴즈 ----
  // w2k=단어→뜻, k2w=뜻→단어, blank=빈칸 채우기, mix=혼합
  const DIR_KEY="toefl-vocab-quiz-dir", COUNT_KEY="toefl-vocab-quiz-count";
  const DIRS=["w2k","k2w","blank","mix"];
  const COUNTS=[10,20,30,50,0];           // 0 = 전체
  let quiz=null;
  let quizDir = DIRS.indexOf(ls.get(DIR_KEY,"w2k"))>=0 ? ls.get(DIR_KEY,"w2k") : "w2k";
  let quizCount = (function(){ const n=parseInt(ls.get(COUNT_KEY,"10"),10); return COUNTS.indexOf(n)>=0 ? n : 10; })();
  // 효과음 상태는 fx.js 가 갖는다. 여기서는 버튼 표시만 맞춘다.
  const soundLabel = () => {
    const on = A.isSoundOn();
    $("quiz-sound").setAttribute("aria-pressed",on);
    $("quiz-sound").textContent = on ? "🔊 효과음" : "🔇 효과음";
  };
  const quizF = makeWordFilter("quiz", ()=>startQuiz());
  function quizPool(){ return WORDS.filter(w=>quizF.match(w)); }
  $("quiz-dir").querySelectorAll("[data-dir]").forEach(b=>{
    b.setAttribute("aria-pressed", b.dataset.dir===quizDir);
    b.addEventListener("click",()=>{
      $("quiz-dir").querySelectorAll("[data-dir]").forEach(x=>x.setAttribute("aria-pressed",x===b));
      quizDir=b.dataset.dir; ls.set(DIR_KEY,quizDir); startQuiz();
    });
  });
  // 문항 수 칩 — 현재 필터로 뽑히는 단어 수보다 큰 선택지는 숨긴다
  function buildCountChips(){
    const n=quizPool().length;
    const items=COUNTS.filter(c=>c===0||c<=n);
    if(items.indexOf(quizCount)<0) quizCount=0;
    $("quiz-count").innerHTML=items.map(c=>
      '<button data-qc="'+c+'" aria-pressed="'+(c===quizCount)+'">'+(c===0?"전체 "+n:c+"문항")+'</button>').join("");
    $("quiz-count").querySelectorAll("[data-qc]").forEach(b=>b.addEventListener("click",()=>{
      quizCount=parseInt(b.dataset.qc,10); ls.set(COUNT_KEY,quizCount); startQuiz();
    }));
  }
  $("quiz-sound").addEventListener("click",()=>{
    A.toggleSound();
    soundLabel();
  });


  function withDistractors(answer, prefer, keyOf){
    const takenWord={}, takenLabel={};
    takenWord[answer.word]=1; takenLabel[keyOf(answer)]=1;
    const out=[answer];
    const drain=list=>{
      for(let i=0;i<list.length&&out.length<4;i++){
        const w=list[i], label=keyOf(w);
        if(takenWord[w.word]||takenLabel[label])continue;
        takenWord[w.word]=1; takenLabel[label]=1;
        out.push(w);
      }
    };
    drain(shuffled(WORDS.filter(prefer)));
    drain(shuffled(WORDS));
    return shuffleInPlace(out);
  }
  /** 예문 안에 표제어가 실제로 등장해야 빈칸 문제를 만들 수 있다. */
  const blankable = w => !!findInflection(w.word,w.ex);
  /* 예문에서 표제어(굴절형 포함)를 빈칸으로 바꾼다.
     form 은 예문에 실제로 쓰인 형태라서, 정답 공개 때 "modified" 처럼 그대로 채워 넣을 수 있다. */
  function blankSentence(w){
    const m=findInflection(w.word,w.ex);
    if(!m)return null;
    return {
      html: esc(w.ex.slice(0,m.index))+'<span class="blank">______</span>'+esc(w.ex.slice(m.index+m.text.length)),
      form: m.text
    };
  }
  function buildQuestion(w, dir){
    if(dir==="blank"){
      const b=blankSentence(w);
      if(b) return {w:w, dir:"blank", sentence:b.html, form:b.form,
                    opts:withDistractors(w, x=>x.pos===w.pos, x=>x.word)};
      dir="w2k";   // 예문에 표제어가 없으면 뜻 문제로 대체한다
    }
    return dir==="k2w"
      ? {w:w, dir:"k2w", opts:withDistractors(w, x=>x.level===w.level, x=>x.word)}
      : {w:w, dir:"w2k", opts:withDistractors(w, x=>x.level===w.level, x=>x.ko)};
  }
  function startQuiz(){
    buildCountChips();
    const p=quizPool();
    const n = quizCount===0 ? p.length : Math.min(quizCount,p.length);
    let source=shuffled(p).slice(0,n);
    // "빈칸" 전용 모드는 예문에 표제어가 있는 단어만 골라 문제 품질을 지킨다
    if(quizDir==="blank"){
      const ok=shuffled(p.filter(blankable)).slice(0,n);
      if(ok.length)source=ok;
    }
    const list=source.map(w=>buildQuestion(w, quizDir==="mix"?["w2k","k2w","blank"][Math.floor(Math.random()*3)]:quizDir));
    quiz={list:list,i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.quiz,records:0,missed:[]};
    renderQuiz();
  }
  function streakHTML(){ return quiz ? comboBadge(quiz.streak) : ''; }
  function renderQuiz(){
    if(!quiz)return;
    if(!quiz.list.length){ $("quiz-body").innerHTML='<div class="empty">이 조건에 해당하는 단어가 없습니다.<br/>난이도·주제 필터를 넓혀 보세요.</div>'; return; }
    if(quiz.i>=quiz.list.length){ renderQuizResult(); return; }
    const item=quiz.list[quiz.i], q=item.w, dir=item.dir;
    const opts=item.opts;
    quiz.answered=false;
    const pct=Math.round(quiz.i/quiz.list.length*100);
    const streakBadge = '<span id="quiz-streak">'+streakHTML()+'</span>';
    const lvBadge = '<span class="lv-badge '+LV[q.level].c+'">'+LV[q.level].n+'</span>';
    const topline = t => '<div class="quiz-topline"><span class="quiz-q">'+t+' · '+(quiz.i+1)+' / '+quiz.list.length+'</span>'+streakBadge+'</div>';
    let head;
    if(dir==="blank"){
      head = topline("빈칸에 알맞은 단어를 고르세요")+
        '<div class="quiz-sentence">'+item.sentence+'</div>'+
        '<div class="quiz-blank-meta"><b>'+esc(q.pos)+'</b> · '+lvBadge+(q.topic?' · <span class="topic-tag">'+esc(q.topic)+'</span>':'')+'</div>';
    }else if(dir==="k2w"){
      head = topline("다음 뜻을 가진 단어를 고르세요")+
        '<div class="quiz-word" style="font-size:27px">'+esc(q.ko)+'</div>'+
        '<div class="quiz-pos">'+esc(q.pos)+' · '+esc(q.en)+' · '+lvBadge+'</div>';
    }else{
      head = topline("다음 단어의 뜻을 고르세요")+
        '<div class="quiz-word">'+esc(q.word)+' <button class="speak" style="vertical-align:middle;margin-left:6px" id="quiz-speak">🔊</button></div>'+
        '<div class="quiz-pos">'+esc(q.pos)+' · '+lvBadge+(q.topic?' · <span class="topic-tag">'+esc(q.topic)+'</span>':'')+'</div>';
    }
    // 빈칸 유형은 보기가 단어라, 한글 뜻을 채점 후에만 덧붙여 보여준다
    const optLabel = o => dir==="w2k" ? esc(o.ko)
      : esc(o.word)+(dir==="blank"?'<span class="ko-gloss">'+esc(o.ko)+'</span>':'');
    // 다음 버튼(quiz-foot)은 보기 바로 아래 고정, 해설은 그 아래에 펼쳐진다
    $("quiz-body").innerHTML='<div class="quiz-card" id="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+head+
      opts.map((o,i)=>'<button class="opt" data-w="'+esc(o.word)+'"><span class="key">'+(i+1)+'</span>'+optLabel(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="quiz-score-n">'+quiz.score+'</b> / '+quiz.list.length+bestLabel("quiz")+'</span>'+
      '<button class="quiz-next" id="quiz-next">다음 →</button></div>'+
      '<div id="quiz-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    if(dir==="w2k") $("quiz-speak").addEventListener("click",e=>{ e.stopPropagation(); speak(q.word); });
    $("quiz-body").querySelectorAll(".opt").forEach(o=>o.addEventListener("click",()=>answer(o,q)));
    $("quiz-next").addEventListener("click",()=>{ quiz.i++; renderQuiz(); });
  }
  function answer(btn,q){
    if(quiz.answered)return; quiz.answered=true;
    const correct=btn.dataset.w===q.word;
    let record=false;
    if(correct){
      quiz.score++; quiz.streak++; quiz.best=Math.max(quiz.best,quiz.streak);
      btn.classList.add("correct");
      store.known[q.word]=true; save(); updateProgress();
      record=registerCombo(quiz,"quiz");
      if(record)quiz.records++;
      beep("ok",quiz.streak);
      confetti(record?110:quiz.streak>=10?90:quiz.streak>=5?70:quiz.streak>=3?45:26);
      comboPopup(quiz.streak,record);
      const sn=$("quiz-score-n"); sn.textContent=quiz.score; sn.classList.add("bump");
      // 진행바를 정답 직후 한 칸 채워 성취감을 준다
      const barI=document.querySelector(".quiz-progress > i");
      if(barI)barI.style.width=Math.round((quiz.i+1)/quiz.list.length*100)+"%";
    }else{
      quiz.streak=0; quiz.recordShown=false;   // 연속이 끊기면 다음 연속에서 다시 신기록 도전
      btn.classList.add("wrong");
      beep("no");
      quiz.missed.push(q);
    }
    $("quiz-body").querySelectorAll(".opt").forEach(o=>{ o.disabled=true; if(o.dataset.w===q.word)o.classList.add("correct"); });
    // 정답 공개: 보기의 한글 뜻을 드러내고, 빈칸에는 예문에 쓰인 실제 형태를 채운다
    const card=$("quiz-card"); if(card)card.classList.add("revealed");
    const blank=$("quiz-body").querySelector(".quiz-sentence .blank");
    if(blank){ blank.textContent=quiz.list[quiz.i].form||q.word; blank.classList.add("filled"); }
    // 상단 연속 배지도 이번 채점 결과로 즉시 갱신 (해설의 배지와 숫자가 어긋나지 않게)
    const sb=$("quiz-streak"); if(sb) sb.innerHTML=streakHTML();
    // 정답 해설: 판정 + 단어·뜻·예문 (다음 버튼 아래에 표시)
    const streakLine = correct ? ' '+comboBadge(quiz.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':'') : '';
    $("quiz-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은')+streakLine+'</div>'+
      '<div class="rv-word">'+esc(q.word)+' <button class="speak" id="quiz-speak2" style="vertical-align:middle;margin-left:4px;padding:4px 10px">🔊</button></div>'+
      '<div class="rv-sub">'+esc(q.ko)+' · '+esc(q.en)+'</div>'+
      '<div class="rv-ex">“'+boldWord(q.ex,q.word)+'”</div>'+
    '</div>';
    $("quiz-speak2").addEventListener("click",e=>{ e.stopPropagation(); speak(q.word); });
    const nb=$("quiz-next");
    nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=quiz.i===quiz.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderQuizResult(){
    const pct=Math.round(quiz.score/quiz.list.length*100);
    const perfect=quiz.score===quiz.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"복습이 필요해요 📖";
    // 틀린 단어는 결과 화면에서 바로 복습할 수 있게 모아 보여준다
    const missed = quiz.missed.length
      ? '<div class="missed-title">틀린 단어 '+quiz.missed.length+'개</div><div class="missed">'+
        quiz.missed.map(w=>'<div><b>'+esc(w.word)+'</b><span class="p">'+esc(w.pos)+'</span> — '+esc(w.ko)+'</div>').join('')+'</div>'
      : '';
    $("quiz-body").innerHTML='<div class="result"><div class="big">'+quiz.score+' / '+quiz.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(quiz,"quiz")+missed+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="quiz-restart">다시 풀기 (Enter)</button></div>';
    $("quiz-restart").addEventListener("click",startQuiz);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",quiz.best); }
  }

  // ---- 퀴즈 키보드 조작 ----
  document.addEventListener("keydown",e=>{
    if(!$("panel-quiz").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("quiz-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(!quiz||!quiz.list.length)return;
    const opts=Array.prototype.slice.call($("quiz-body").querySelectorAll(".opt"));
    const n=parseInt(e.key,10);
    if(!quiz.answered && n>=1 && n<=opts.length){ e.preventDefault(); opts[n-1].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      const nb=$("quiz-next");
      if(quiz.answered && nb) nb.click();
    }
  });


  // ---- 단어장 ----
  const VIEW_KEY="toefl-vocab-browse-view";
  let browseFilter="all";
  let selected={}, selectMode=false, blankMode=false;
  const browseF = makeWordFilter("browse", ()=>renderBrowse());
  let browseView = ls.get(VIEW_KEY,"card")==="list" ? "list" : "card";
  $("browse-search").addEventListener("input",()=>renderBrowse());
  $("browse-filter").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
    $("browse-filter").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
    browseFilter=b.dataset.filter; renderBrowse();
  }));
  $("browse-view").querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{
    $("browse-view").querySelectorAll("[data-view]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    browseView=b.dataset.view; ls.set(VIEW_KEY,browseView);
    renderBrowse();
  }));
  $("browse-hide").addEventListener("click",()=>{
    const on=$("browse-hide").getAttribute("aria-pressed")==="true";
    $("browse-hide").setAttribute("aria-pressed",!on);
    $("browse-hide").textContent = on ? "🙈 뜻 가리기" : "👁 뜻 보이기";
    document.body.classList.toggle("hide-ko",!on);
    renderBrowse(false);
  });
  function syncBrowseView(){
    $("browse-view").querySelectorAll("[data-view]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.view===browseView));
  }
  // 현재 필터 조건에 맞는 단어 목록
  function browseList(){
    const q=($("browse-search").value||"").trim().toLowerCase();
    return WORDS.filter(w=>{
      if(!browseF.match(w))return false;
      if(browseFilter==="known"&&!isKnown(w.word))return false;
      if(browseFilter==="unknown"&&isKnown(w.word))return false;
      if(browseFilter==="star"&&!isStar(w.word))return false;
      if(q&&!(w.word.toLowerCase().includes(q)||w.ko.includes(q)||w.en.toLowerCase().includes(q)||(w.topic||"").includes(q)))return false;
      return true;
    });
  }
  // 1,400단어를 한 번에 그리면 느려서 PAGE 개씩 "더 보기"로 나눠 그린다
  const BROWSE_PAGE=150;
  let browseShown=BROWSE_PAGE;

  const flagButtons = w =>
    '<button class="star '+(isStar(w.word)?"on":"")+'" data-star="'+esc(w.word)+'" aria-label="즐겨찾기">'+(isStar(w.word)?"★":"☆")+'</button>'+
    '<button class="known '+(isKnown(w.word)?"on":"")+'" data-known="'+esc(w.word)+'" aria-label="외움 표시">✓</button>'+
    '<button data-speak="'+esc(w.word)+'" aria-label="발음 듣기">🔊</button>';

  function browseCardMarkup(list){
    return list.map(w=>
      '<div class="w-item">'+
        '<input type="checkbox" class="sel" data-sel="'+esc(w.word)+'"'+(selected[w.word]?" checked":"")+' aria-label="선택" />'+
        '<div class="main">'+
        '<div class="top"><span class="w">'+esc(w.word)+'</span><span class="p">'+esc(w.pos)+'</span>'+
        '<span class="lv-badge '+LV[w.level].c+'">'+LV[w.level].n+'</span>'+
        (w.topic?'<span class="topic-tag">'+esc(w.topic)+'</span>':'')+
        (isKnown(w.word)?'<span class="badge-known">외움</span>':'')+'</div>'+
        '<div class="k">'+esc(w.ko)+'</div><div class="e">'+esc(w.en)+'</div>'+
        '<div class="e">“'+boldWord(w.ex,w.word)+'”</div></div>'+
        '<div class="flags">'+flagButtons(w)+'</div>'+
      '</div>').join('');
  }
  // 목록형: 한 줄에 단어–뜻, 행을 누르면 영영뜻·예문 펼침
  function browseListMarkup(list){
    return '<div class="w-list">'+list.map((w,i)=>
      '<div class="w-row'+(isKnown(w.word)?" known":"")+'" data-i="'+i+'">'+
        '<input type="checkbox" class="sel" data-sel="'+esc(w.word)+'"'+(selected[w.word]?" checked":"")+' aria-label="선택" />'+
        '<span class="dot '+LV[w.level].c+'" title="'+LV[w.level].n+'"></span>'+
        '<span class="w">'+esc(w.word)+'<span class="p">'+esc(w.pos)+'</span></span>'+
        '<span class="k">'+esc(w.ko)+'</span>'+
        '<span class="acts">'+flagButtons(w)+'</span>'+
      '</div>'+
      '<div class="w-detail" data-d="'+i+'" style="display:none">'+
        '<div class="e">'+esc(w.en)+'</div><div class="e">“'+boldWord(w.ex,w.word)+'”</div>'+
        (w.topic?'<div><span class="topic-tag">'+esc(w.topic)+'</span></div>':'')+
      '</div>').join('')+'</div>';
  }

  /** 카드형에서 "외움" 배지만 붙였다 뗀다 — 목록 전체를 다시 그리지 않기 위해. */
  function syncKnownBadge(item,on){
    const top=item.querySelector(".top"); if(!top)return;
    const badge=top.querySelector(".badge-known");
    if(on&&!badge){ const s=document.createElement("span"); s.className="badge-known"; s.textContent="외움"; top.appendChild(s); }
    else if(!on&&badge){ badge.parentNode.removeChild(badge); }
  }

  function bindBrowse(box){
    // 플래그는 목록 전체를 다시 그리지 않고 해당 요소만 갱신한다.
    // 단, 지금 보고 있는 필터에서 그 단어가 빠져야 하는 경우엔 다시 그린다.
    qsa("[data-star]",box).forEach(b=>b.addEventListener("click",e=>{
      e.stopPropagation();
      const on=toggleFlag(store.star,b.dataset.star);
      b.classList.toggle("on",on); b.textContent=on?"★":"☆";
      if(browseFilter==="star"&&!on) renderBrowse(false);
    }));
    qsa("[data-known]",box).forEach(b=>b.addEventListener("click",e=>{
      e.stopPropagation();
      const on=toggleFlag(store.known,b.dataset.known);
      b.classList.toggle("on",on);
      const row=b.closest(".w-row"); if(row)row.classList.toggle("known",on);
      const item=b.closest(".w-item"); if(item)syncKnownBadge(item,on);
      updateProgress();
      if(browseFilter==="known"||browseFilter==="unknown") renderBrowse(false);
    }));
    qsa("[data-speak]",box).forEach(b=>b.addEventListener("click",e=>{ e.stopPropagation(); speak(b.dataset.speak); }));
    qsa(".w-row",box).forEach(row=>row.addEventListener("click",e=>{
      if(e.target.closest("button")||e.target.closest("input"))return;
      row.querySelector(".k").classList.add("show");
      const d=box.querySelector('[data-d="'+row.dataset.i+'"]');
      if(d) d.style.display = d.style.display==="none" ? "block" : "none";
    }));
    qsa(".w-item .k",box).forEach(k=>k.addEventListener("click",()=>k.classList.add("show")));
    const more=$("browse-more");
    if(more) more.addEventListener("click",()=>{ browseShown+=BROWSE_PAGE; renderBrowse(false); });
  }

  /** @param {boolean} [resetPage=true] false 면 "더 보기"로 펼친 범위를 유지한다. */
  function renderBrowse(resetPage){
    if(resetPage!==false) browseShown=BROWSE_PAGE;
    const list=browseList();
    $("browse-count").textContent=list.length+"개 단어";
    updateExportScope(list);
    const box=$("browse-list");
    if(!list.length){ box.innerHTML='<div class="empty">해당하는 단어가 없습니다.</div>'; return; }
    const slice=list.slice(0,browseShown);
    box.innerHTML=(browseView==="list"?browseListMarkup(slice):browseCardMarkup(slice))+
      (list.length>browseShown
        ? '<button class="more-btn" id="browse-more">더 보기 · '+(list.length-browseShown)+'개 남음</button>'
        : '');
    bindBrowse(box);
    bindSelectBoxes(box);
  }


  // ---- 선택 & 내보내기 (인쇄·PDF / 엑셀 CSV) ----
  function selectedWords(){ return Object.keys(selected).filter(w=>selected[w]); }
  function bindSelectBoxes(box){
    box.querySelectorAll("[data-sel]").forEach(c=>c.addEventListener("change",()=>{
      const w=c.dataset.sel;
      if(c.checked) selected[w]=true; else delete selected[w];
      updateExportScope();
    }));
  }
  // 내보내기 대상: 선택한 단어가 있으면 그것만, 없으면 현재 필터 결과 전체
  function exportTarget(){
    const sel=selectedWords();
    if(sel.length){ const s={}; sel.forEach(w=>s[w]=1); return WORDS.filter(w=>s[w.word]); }
    return browseList();
  }
  function exportDesc(){
    const sel=selectedWords();
    if(sel.length) return "직접 선택한 단어";
    const p=[browseF.desc()];
    const fname={unknown:"안 외운 것",known:"외운 것",star:"즐겨찾기"}[browseFilter];
    if(fname)p.push(fname);
    const q=($("browse-search").value||"").trim(); if(q)p.push('검색 "'+q+'"');
    return p.join(" · ");
  }
  function updateExportScope(list){
    const n=selectedWords().length;
    $("export-scope").textContent = n ? ("선택 "+n+"개 내보내기") : ("현재 목록 "+(list||browseList()).length+"개 내보내기");
  }
  function stamp(){ const d=new Date(), p=n=>String(n).padStart(2,"0"); return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate()); }

  function downloadCSV(){
    const list=exportTarget();
    if(!list.length){ toast("내보낼 단어가 없습니다"); return; }
    const head=["No","Word","POS","뜻","영영뜻","예문","난이도","주제","외움","즐겨찾기"];
    const rows=list.map((w,i)=>[i+1,w.word,w.pos,w.ko,w.en,w.ex,LV[w.level].n,w.topic||"",isKnown(w.word)?"O":"",isStar(w.word)?"O":""]);
    const cell=v=>'"'+String(v).replace(/"/g,'""')+'"';
    // 엑셀에서 한글이 깨지지 않도록 BOM 포함
    const BOM=String.fromCharCode(0xFEFF);
    const csv=BOM+[head].concat(rows).map(r=>r.map(cell).join(",")).join("\r\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download="vocab_"+stamp()+"_"+list.length+".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    toast(list.length+"개 단어를 CSV로 저장했습니다 📊");
  }

  function printList(){
    const list=exportTarget();
    if(!list.length){ toast("인쇄할 단어가 없습니다"); return; }
    const rows=list.map((w,i)=>
      '<tr>'+
        '<td class="c-no">'+(i+1)+'</td>'+
        '<td class="c-w">'+esc(w.word)+'</td>'+
        '<td class="c-p">'+esc(w.pos)+'</td>'+
        '<td class="c-lv">'+LV[w.level].n+'<br/><span style="color:#777">'+esc(w.topic||"")+'</span></td>'+
        '<td class="c-ko">'+(blankMode?'<div class="c-blank"></div>':'<b>'+esc(w.ko)+'</b><div class="ex">'+esc(w.en)+'</div>')+'</td>'+
        '<td>'+esc(w.ex)+'</td>'+
      '</tr>').join('');
    $("print-area").innerHTML=
      '<h1>📖 나의 단어장'+(blankMode?' · 시험지형':'')+'</h1>'+
      '<div class="meta">'+esc(exportDesc())+' · 총 '+list.length+'개 · '+stamp()+'</div>'+
      '<table><thead><tr>'+
        '<th class="c-no">#</th><th class="c-w">Word</th><th class="c-p">품사</th>'+
        '<th class="c-lv">난이도·주제</th><th class="c-ko">'+(blankMode?'뜻 쓰기':'뜻 / 영영뜻')+'</th><th>예문</th>'+
      '</tr></thead><tbody>'+rows+'</tbody></table>';
    setTimeout(()=>window.print(),60);
  }

  $("btn-select").addEventListener("click",()=>{
    selectMode=!selectMode;
    $("btn-select").setAttribute("aria-pressed",selectMode);
    document.body.classList.toggle("select-mode",selectMode);
    toast(selectMode?"단어 왼쪽 체크박스로 선택하세요 ☑":"선택 모드를 껐습니다");
  });
  $("btn-select-all").addEventListener("click",()=>{
    browseList().forEach(w=>selected[w.word]=true);
    if(!selectMode){ selectMode=true; $("btn-select").setAttribute("aria-pressed",true); document.body.classList.add("select-mode"); }
    renderBrowse(false); toast(selectedWords().length+"개 선택됨");
  });
  $("btn-select-none").addEventListener("click",()=>{ selected={}; renderBrowse(false); toast("선택을 모두 해제했습니다"); });
  $("btn-blank").addEventListener("click",()=>{
    blankMode=!blankMode;
    $("btn-blank").setAttribute("aria-pressed",blankMode);
    toast(blankMode?"뜻을 빈칸으로 인쇄합니다 ✍️":"뜻을 함께 인쇄합니다");
  });
  $("btn-print").addEventListener("click",printList);
  $("btn-csv").addEventListener("click",downloadCSV);


  // ---- 키보드 ----
  document.addEventListener("keydown",e=>{
    if(!$("panel-flash").classList.contains("active"))return;
    if(e.target.tagName==="INPUT")return;
    if(!order.length)return;
    if(e.code==="Space"){ e.preventDefault(); flip(); }
    else if(e.code==="ArrowLeft")go(-1);
    else if(e.code==="ArrowRight")go(1);
    else if(e.code==="Enter"){ const w=cur().word; store.known[w]=true; save(); updateProgress(); renderCard(); if(idx<order.length-1)setTimeout(()=>go(1),150); }
  });



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"flash",
    init(){ rebuildOrder(); renderCard(); }
  });
  A.panel({ id:"quiz",
    init(){
      soundLabel();
      startQuiz();
    },
    // 다시 열 때 이미 채점된 화면이 남아 있으면 다음 문제로 넘긴다.
    // 진행 중인 세션과 콤보는 유지한다 — 잠깐 다른 탭을 봤다고 초기화되면 곤란하다.
    resume(){
      if(!quiz || !$("quiz-body").innerHTML) startQuiz();
      else if(quiz.answered){ quiz.i++; renderQuiz(); }
    }
  });
  A.panel({ id:"browse",
    init(){ syncBrowseView(); renderBrowse(); },
    resume(){ renderBrowse(); }
  });

  // 학습 기록을 지우면 카드와 단어장을 다시 그린다
  A.onReset(function(){
    renderCard();
    if($("panel-browse").classList.contains("active")) renderBrowse();
  });

})(window.APP);
