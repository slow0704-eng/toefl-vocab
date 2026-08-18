/* ============================================================
   문법 — 토익 Part 5 형식 단문 빈칸
   ------------------------------------------------------------
   한 문장 안에서 품사 자리·동사 형태·접속사를 고른다. 유형과 난이도로
   교차 필터링하며, 문제 풀기와 문제 보기 두 모드를 갖는다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        esc = A.esc,
        shuffled = A.shuffled,
        LV = A.LV,
        toast = A.toast,
        beep = A.beep,
        confetti = A.confetti,
        comboBadge = A.comboBadge,
        comboPopup = A.comboPopup,
        comboSummary = A.comboSummary,
        registerCombo = A.registerCombo,
        bestCombo = A.bestCombo,
        bestLabel = A.bestLabel;

  // ---- 문법 (토익 Part 5 형식) ----
  const GRAM = (window.GRAMMAR_QUESTIONS || []).slice();
  const GCATS = (function(){ const s=[]; GRAM.forEach(g=>{ if(s.indexOf(g.cat)<0)s.push(g.cat); }); return s; })();
  const AB = ["A","B","C","D"];
  let gLv=0, gCat="all", gMode="solve", gram=null;

  function gramPool(){
    const q=($("gram-search").value||"").trim().toLowerCase();
    return GRAM.filter(g=>{
      if(gLv!==0 && g.level!==gLv)return false;
      if(gCat!=="all" && g.cat!==gCat)return false;
      if(q && !((g.q||"").toLowerCase().includes(q)||(g.ko||"").includes(q)||(g.exp||"").includes(q)||
                (g.cat||"").includes(q)||(g.sub||"").includes(q)||(g.opts||[]).join(" ").toLowerCase().includes(q)))return false;
      return true;
    });
  }
  // 빈칸(----)을 밑줄 또는 정답이 채워진 형태로 렌더
  function gramSentence(g, filled, cls){
    const parts = esc(g.q).split("----");
    const mid = filled ? '<span class="filled">'+esc(filled)+'</span>' : '<span class="blank"></span>';
    return '<div class="'+(cls||"gram-q")+'">'+parts[0]+mid+(parts[1]||"")+'</div>';
  }
  function buildGramChips(){
    const inCat = GRAM.filter(g=>gCat==="all"||g.cat===gCat);
    $("gram-lv").innerHTML = [[0,"전체","--accent"],[1,"기초","--lv1"],[2,"중급","--lv2"],[3,"고급","--lv3"]].map(function(d){
      const cnt = d[0]===0?inCat.length:inCat.filter(g=>g.level===d[0]).length;
      const dot = d[0]===0?"":'<span class="dot" style="background:var('+d[2]+')"></span>';
      return '<button class="lv-chip" data-lv="'+d[0]+'" aria-pressed="'+(gLv===d[0])+'">'+dot+d[1]+' <span style="opacity:.7">'+cnt+'</span></button>';
    }).join("");
    const inLv = GRAM.filter(g=>gLv===0||g.level===gLv);
    $("gram-cat").innerHTML = '<button class="tp-chip" data-gc="all" aria-pressed="'+(gCat==="all")+'">🗂 전체 유형<span class="c">'+inLv.length+'</span></button>'+
      GCATS.map(function(c){
        const n=inLv.filter(g=>g.cat===c).length;
        return '<button class="tp-chip" data-gc="'+esc(c)+'" aria-pressed="'+(gCat===c)+'">'+esc(c)+'<span class="c">'+n+'</span></button>';
      }).join("");
    $("gram-lv").querySelectorAll(".lv-chip").forEach(b=>b.addEventListener("click",()=>{ gLv=parseInt(b.dataset.lv,10); buildGramChips(); startGram(); }));
    $("gram-cat").querySelectorAll(".tp-chip").forEach(b=>b.addEventListener("click",()=>{ gCat=b.dataset.gc; buildGramChips(); startGram(); }));
  }
  $("gram-search").addEventListener("input",()=>{ buildGramChips(); startGram(); });
  $("gram-mode").querySelectorAll("[data-gmode]").forEach(b=>b.addEventListener("click",()=>{
    $("gram-mode").querySelectorAll("[data-gmode]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    gMode=b.dataset.gmode; startGram();
  }));
  $("gram-shuffle").addEventListener("click",()=>{ startGram(); toast(gMode==="solve"?"새 문제 세트를 뽑았습니다 🔀":"순서를 섞었습니다 🔀"); });

  function startGram(){
    const pool=gramPool();
    $("gram-count").textContent = pool.length+"문항"+(gMode==="solve"&&pool.length?" 중 10문항 출제":"");
    if(!pool.length){ gram=null; $("gram-body").innerHTML='<div class="empty">조건에 맞는 문제가 없습니다.<br/>유형·난이도 필터를 넓혀 보세요.</div>'; return; }
    if(gMode==="list"){ gram=null; renderGramList(pool); return; }
    gram={list:shuffled(pool).slice(0,Math.min(10,pool.length)),i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.gram,records:0};
    renderGram();
  }
  function renderGram(){
    if(!gram)return;
    if(gram.i>=gram.list.length){ renderGramResult(); return; }
    const g=gram.list[gram.i];
    gram.answered=false;
    const pct=Math.round(gram.i/gram.list.length*100);
    $("gram-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 것을 고르세요 · '+(gram.i+1)+' / '+gram.list.length+'</span>'+
        '<span id="gram-streak">'+gramStreakHTML()+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(g.cat)+'</span>'+
        (g.sub?'<span class="topic-tag">'+esc(g.sub)+'</span>':'')+
        '<span class="lv-badge '+LV[g.level].c+'">'+LV[g.level].n+'</span></div>'+
      gramSentence(g)+
      g.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="gram-score-n">'+gram.score+'</b> / '+gram.list.length+bestLabel("gram")+'</span>'+
      '<button class="quiz-next" id="gram-next">다음 →</button></div>'+
      '<div id="gram-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    $("gram-body").querySelectorAll(".opt").forEach(o=>o.addEventListener("click",()=>answerGram(parseInt(o.dataset.i,10),g)));
    $("gram-next").addEventListener("click",()=>{ gram.i++; renderGram(); });
  }
  function gramStreakHTML(){ return gram ? comboBadge(gram.streak) : ''; }
  function answerGram(pick,g){
    if(gram.answered)return; gram.answered=true;
    const correct = pick===g.ans;
    const btns=$("gram-body").querySelectorAll(".opt");
    let record=false;
    if(correct){
      gram.score++; gram.streak++; gram.best=Math.max(gram.best,gram.streak);
      record=registerCombo(gram,"gram");
      if(record)gram.records++;
      beep("ok",gram.streak);
      confetti(record?110:gram.streak>=10?90:gram.streak>=5?70:gram.streak>=3?45:26);
      comboPopup(gram.streak,record);
      const sn=$("gram-score-n"); sn.textContent=gram.score; sn.classList.add("bump");
      const bi=document.querySelector("#gram-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((gram.i+1)/gram.list.length*100)+"%";
    }else{ gram.streak=0; gram.recordShown=false; beep("no"); btns[pick].classList.add("wrong"); }
    btns.forEach((b,i)=>{ b.disabled=true; if(i===g.ans)b.classList.add("correct"); });
    const sb=$("gram-streak"); if(sb)sb.innerHTML=gramStreakHTML();
    $("gram-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[g.ans]+')')+
        (correct?' '+comboBadge(gram.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      gramSentence(g,g.opts[g.ans],"gram-list-q")+
      '<div class="gram-ko">'+esc(g.ko)+'</div>'+
      '<div class="gram-exp">'+esc(g.exp)+'</div>'+
    '</div>';
    const nb=$("gram-next"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=gram.i===gram.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderGramResult(){
    const pct=Math.round(gram.score/gram.list.length*100);
    const perfect=gram.score===gram.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"해설을 다시 보며 복습해요 📖";
    $("gram-body").innerHTML='<div class="result"><div class="big">'+gram.score+' / '+gram.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(gram,"gram")+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="gram-restart">새 문제 풀기 (Enter)</button></div>';
    $("gram-restart").addEventListener("click",startGram);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",gram.best); }
  }
  // 문제 보기 모드: 제목만 보이고 누르면 정답·해석·해설 펼침
  function renderGramList(pool){
    $("gram-body").innerHTML=pool.map((g,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(g.cat)+'</span>'+
            (g.sub?'<span class="topic-tag">'+esc(g.sub)+'</span>':'')+
            '<span class="lv-badge '+LV[g.level].c+'">'+LV[g.level].n+'</span></div>'+
          gramSentence(g,null,"gram-list-q")+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="gram-ans">정답 ('+AB[g.ans]+') '+esc(g.opts[g.ans])+'</div>'+
          '<div class="gram-opts">'+g.opts.map((o,k)=>'<span class="'+(k===g.ans?"ok":"")+'">('+AB[k]+') '+esc(o)+'</span>').join('')+'</div>'+
          gramSentence(g,g.opts[g.ans],"gram-list-q")+
          '<div class="gram-ko">'+esc(g.ko)+'</div>'+
          '<div class="gram-exp">'+esc(g.exp)+'</div>'+
        '</div>'+
      '</div>').join('');
    $("gram-body").querySelectorAll(".sp-item").forEach(item=>{
      item.querySelector(".sp-head").addEventListener("click",()=>item.classList.toggle("open"));
    });
  }
  // 문법 키보드 조작 (A~D / 1~4 / Enter)
  document.addEventListener("keydown",e=>{
    if(!$("panel-gram").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("gram-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(!gram||gMode!=="solve")return;
    const opts=Array.prototype.slice.call($("gram-body").querySelectorAll(".opt"));
    if(!opts.length)return;
    const k=String(e.key||"").toUpperCase();
    let idx=AB.indexOf(k);
    if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
    if(!gram.answered && idx>=0 && idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(gram.answered && $("gram-next")) $("gram-next").click();
    }
  });



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"gram", wide:true,
    init(){ buildGramChips(); startGram(); },
    resume(){ if(gMode==="solve" && gram && gram.answered){ gram.i++; renderGram(); } }
  });

})(window.APP);
