/* ============================================================
   장르·슬랭 — SF·판타지 / 힙합 / 스트리트 구어
   ------------------------------------------------------------
   같은 슬랭이라도 어디서 써도 되는지가 달라서 항목마다 사용 등급을 붙였다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        qsa = A.qsa,
        esc = A.esc,
        shuffleInPlace = A.shuffleInPlace,
        shuffled = A.shuffled,
        AB = A.AB,
        toast = A.toast,
        speak = A.speak,
        stopSpeak = A.stopSpeak,
        beep = A.beep,
        confetti = A.confetti,
        comboBadge = A.comboBadge,
        comboPopup = A.comboPopup,
        comboSummary = A.comboSummary,
        registerCombo = A.registerCombo,
        bestCombo = A.bestCombo,
        bestLabel = A.bestLabel;

  // ---- 장르·슬랭 (SF·판타지 / 힙합 / 스트리트) ----
  const SLANG = (window.SLANG || []).slice();
  const SL_DOMAINS = (function(){ const d=[]; SLANG.forEach(x=>{ if(d.indexOf(x.domain)<0)d.push(x.domain); }); return d; })();
  // 사용 등급 — 이 탭의 핵심. 어디까지 써도 되는지를 색으로 구분한다.
  const REG = {1:{n:"어디서나",c:"r1",i:"🟢"},2:{n:"친한 사이",c:"r2",i:"🟡"},3:{n:"이해만",c:"r3",i:"🔴"}};
  let slDomain="all", slCat="all", slReg=0, slMode="list", slang=null;

  function slangMatch(x, skip){
    if(skip!=="domain" && slDomain!=="all" && x.domain!==slDomain) return false;
    if(skip!=="cat" && slCat!=="all" && x.cat!==slCat) return false;
    if(skip!=="reg" && slReg!==0 && x.reg!==slReg) return false;
    const q=($("slang-search").value||"").trim().toLowerCase();
    if(q && !((x.term||"").toLowerCase().includes(q) || (x.ko||"").includes(q) ||
              (x.en||"").toLowerCase().includes(q) || (x.ex||"").toLowerCase().includes(q) ||
              (x.exKo||"").includes(q) || (x.note||"").includes(q) ||
              (x.cat||"").includes(q) || (x.domain||"").includes(q))) return false;
    return true;
  }
  function slangPool(){ return SLANG.filter(x=>slangMatch(x)); }
  // 분류 칩은 현재 고른 영역 안의 것만 보여 준다 (영역마다 분류 체계가 다르다)
  function slangCats(){
    const src=SLANG.filter(x=>slDomain==="all"||x.domain===slDomain);
    const out=[]; src.forEach(x=>{ if(out.indexOf(x.cat)<0)out.push(x.cat); });
    return out;
  }

  function buildSlangChips(){
    const forDom = SLANG.filter(x=>slangMatch(x,"domain"));
    $("slang-domain").innerHTML='<button class="tp-chip" data-sd="all" aria-pressed="'+(slDomain==="all")+'">🗂 전체<span class="c">'+forDom.length+'</span></button>'+
      SL_DOMAINS.map(function(d){
        const n=forDom.filter(x=>x.domain===d).length;
        return '<button class="tp-chip" data-sd="'+esc(d)+'" aria-pressed="'+(slDomain===d)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(d)+'<span class="c">'+n+'</span></button>';
      }).join("");
    const forCat = SLANG.filter(x=>slangMatch(x,"cat"));
    $("slang-cat").innerHTML='<button class="tp-chip" data-slc="all" aria-pressed="'+(slCat==="all")+'">🗂 전체 분류<span class="c">'+forCat.length+'</span></button>'+
      slangCats().map(function(c){
        const n=forCat.filter(x=>x.cat===c).length;
        return '<button class="tp-chip" data-slc="'+esc(c)+'" aria-pressed="'+(slCat===c)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(c)+'<span class="c">'+n+'</span></button>';
      }).join("");
    const forReg = SLANG.filter(x=>slangMatch(x,"reg"));
    $("slang-reg").innerHTML='<button data-slr="0" aria-pressed="'+(slReg===0)+'">전체 '+forReg.length+'</button>'+
      [1,2,3].map(function(r){
        const n=forReg.filter(x=>x.reg===r).length;
        return '<button data-slr="'+r+'" aria-pressed="'+(slReg===r)+'"'+(n?'':' style="opacity:.35"')+'>'+REG[r].i+' '+REG[r].n+' '+n+'</button>';
      }).join("");
    qsa("[data-sd]",$("slang-domain")).forEach(b=>b.addEventListener("click",()=>{ slDomain=b.dataset.sd; slCat="all"; buildSlangChips(); startSlang(); }));
    qsa("[data-slc]",$("slang-cat")).forEach(b=>b.addEventListener("click",()=>{ slCat=b.dataset.slc; buildSlangChips(); startSlang(); }));
    qsa("[data-slr]",$("slang-reg")).forEach(b=>b.addEventListener("click",()=>{ slReg=parseInt(b.dataset.slr,10); buildSlangChips(); startSlang(); }));
  }
  const regBadge = r => '<span class="reg-badge '+REG[r].c+'">'+REG[r].i+' '+REG[r].n+'</span>';
  // 예문에서 표제어가 쓰인 자리를 강조하거나 빈칸으로 가린다
  function slangEx(x, mode, filled){
    const i=x.ex.indexOf(x.blank);
    const mid = mode==="blank"
      ? (filled ? '<span class="blank filled">'+esc(filled)+'</span>' : '<span class="blank">______</span>')
      : '<span class="hl">'+esc(x.blank)+'</span>';
    return esc(x.ex.slice(0,i))+mid+esc(x.ex.slice(i+x.blank.length));
  }

  $("slang-search").addEventListener("input",()=>{ buildSlangChips(); startSlang(); });
  qsa("[data-slmode]",$("slang-mode")).forEach(b=>b.addEventListener("click",()=>{
    qsa("[data-slmode]",$("slang-mode")).forEach(x=>x.setAttribute("aria-pressed",x===b));
    slMode=b.dataset.slmode; startSlang();
  }));
  $("slang-shuffle").addEventListener("click",()=>{
    startSlang();
    toast(slMode==="quiz"?"새 문제 세트를 뽑았습니다 🔀":"영역 순서로 정렬했습니다");
  });

  function startSlang(){
    const pool=slangPool();
    $("slang-count").textContent = pool.length+"개"+(slMode==="quiz"&&pool.length?" 중 "+Math.min(10,pool.length)+"문항 출제":"");
    if(!pool.length){ slang=null; $("slang-body").innerHTML='<div class="empty">조건에 맞는 표현이 없습니다.<br/>영역·분류·등급 필터를 넓혀 보세요.</div>'; return; }
    if(slMode==="list"){ slang=null; renderSlangList(pool); return; }
    // 문제 유형: 예문 빈칸 / 뜻 고르기를 섞어 낸다
    slang={
      list: shuffled(pool).slice(0,Math.min(10,pool.length)).map(x=>{
        const kind = Math.random()<.5 ? "blank" : "meaning";
        return {x:x, kind:kind, opts:slangOpts(x,kind)};
      }),
      i:0, score:0, answered:false, streak:0, best:0, prevBest:bestCombo.slang, records:0, missed:[]
    };
    renderSlang();
  }
  /* 오답 보기는 같은 영역에서 먼저 뽑는다 — SF 단어 사이에 스트리트 슬랭이 섞이면
     내용을 몰라도 눈치로 걸러낼 수 있어 문제가 헐거워진다. */
  function slangOpts(x,kind){
    const key = kind==="blank" ? (w=>w.blank) : (w=>w.ko);
    const taken={}; taken[key(x)]=1;
    const out=[x];
    const drain=list=>{
      for(let i=0;i<list.length&&out.length<4;i++){
        const w=list[i]; if(w.term===x.term||taken[key(w)])continue;
        taken[key(w)]=1; out.push(w);
      }
    };
    drain(shuffled(SLANG.filter(w=>w.domain===x.domain)));
    drain(shuffled(SLANG));
    return shuffleInPlace(out);
  }
  function renderSlang(){
    if(!slang)return;
    if(slang.i>=slang.list.length){ renderSlangResult(); return; }
    const it=slang.list[slang.i], x=it.x;
    slang.answered=false;
    const pct=Math.round(slang.i/slang.list.length*100);
    const head = it.kind==="blank"
      ? '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 표현을 고르세요 · '+(slang.i+1)+' / '+slang.list.length+'</span>'+
        '<span id="slang-streak">'+comboBadge(slang.streak)+'</span></div>'+
        '<div class="sl-q">'+slangEx(x,"blank")+'</div>'
      : '<div class="quiz-topline"><span class="quiz-q">다음 표현의 뜻을 고르세요 · '+(slang.i+1)+' / '+slang.list.length+'</span>'+
        '<span id="slang-streak">'+comboBadge(slang.streak)+'</span></div>'+
        '<div class="quiz-word">'+esc(x.term)+' <button class="speak" style="vertical-align:middle;margin-left:6px" id="slang-speak">🔊</button></div>'+
        '<div class="quiz-pos">'+esc(x.pos)+'</div>';
    const label = o => it.kind==="blank" ? esc(o.blank) : esc(o.ko);
    $("slang-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(x.domain)+'</span>'+
        '<span class="topic-tag">'+esc(x.cat)+'</span></div>'+
      head+
      it.opts.map((o,i)=>'<button class="opt" data-t="'+esc(o.term)+'"><span class="key ab">'+AB[i]+'</span>'+label(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="slang-score-n">'+slang.score+'</b> / '+slang.list.length+bestLabel("slang")+'</span>'+
      '<button class="quiz-next" id="slang-next">다음 →</button></div>'+
      '<div id="slang-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    if(it.kind==="meaning") $("slang-speak").addEventListener("click",e=>{ e.stopPropagation(); speak(x.term); });
    qsa(".opt",$("slang-body")).forEach(b=>b.addEventListener("click",()=>answerSlang(b,it)));
    $("slang-next").addEventListener("click",()=>{ slang.i++; renderSlang(); });
  }
  function answerSlang(btn,it){
    if(slang.answered)return; slang.answered=true;
    const x=it.x, correct=btn.dataset.t===x.term;
    let record=false;
    if(correct){
      slang.score++; slang.streak++; slang.best=Math.max(slang.best,slang.streak);
      record=registerCombo(slang,"slang");
      if(record)slang.records++;
      beep("ok",slang.streak);
      confetti(record?110:slang.streak>=10?90:slang.streak>=5?70:slang.streak>=3?45:26);
      comboPopup(slang.streak,record);
      const sn=$("slang-score-n"); sn.textContent=slang.score; sn.classList.add("bump");
      const bi=document.querySelector("#slang-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((slang.i+1)/slang.list.length*100)+"%";
    }else{
      slang.streak=0; slang.recordShown=false; beep("no");
      btn.classList.add("wrong"); slang.missed.push(x);
    }
    qsa(".opt",$("slang-body")).forEach(b=>{ b.disabled=true; if(b.dataset.t===x.term)b.classList.add("correct"); });
    const qBox=$("slang-body").querySelector(".sl-q");
    if(qBox)qBox.innerHTML=slangEx(x,"blank",x.blank);
    const sb=$("slang-streak"); if(sb)sb.innerHTML=comboBadge(slang.streak);
    // 해설에서 사용 등급을 반드시 보여 준다 — 뜻만 알고 아무 데서나 쓰면 곤란해지는 말들이다
    $("slang-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 '+esc(it.kind==="blank"?x.blank:x.ko))+
        (correct?' '+comboBadge(slang.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="sl-term">'+esc(x.term)+'<span class="p">'+esc(x.pos)+'</span> '+regBadge(x.reg)+'</div>'+
      '<div class="sl-ko">'+esc(x.ko)+'</div>'+
      '<div class="sl-en">'+esc(x.en)+'</div>'+
      '<div class="sl-ex">'+slangEx(x,"hl")+'</div>'+
      '<div class="sl-exko">'+esc(x.exKo)+'</div>'+
      '<div class="sl-note'+(x.reg===3?' warn':'')+'">'+esc(x.note)+'</div>'+
    '</div>';
    const nb=$("slang-next"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=slang.i===slang.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderSlangResult(){
    const pct=Math.round(slang.score/slang.list.length*100);
    const perfect=slang.score===slang.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"보기 모드에서 다시 훑어봐요 📖";
    const missed = slang.missed.length
      ? '<div class="missed-title">틀린 표현 '+slang.missed.length+'개</div><div class="missed">'+
        slang.missed.map(x=>'<div><b>'+esc(x.term)+'</b><span class="p">'+esc(x.domain)+'</span> — '+esc(x.ko)+'</div>').join('')+'</div>'
      : '';
    $("slang-body").innerHTML='<div class="result"><div class="big">'+slang.score+' / '+slang.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(slang,"slang")+missed+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="slang-restart">새 문제 풀기 (Enter)</button></div>';
    $("slang-restart").addEventListener("click",startSlang);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",slang.best); }
  }
  // 보기 모드: 표제어와 등급만 접힌 채로 보이고, 누르면 예문·해석·사용법이 펼쳐진다
  function renderSlangList(pool){
    $("slang-body").innerHTML=pool.map((x,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(x.domain)+'</span>'+
            '<span class="topic-tag">'+esc(x.cat)+'</span>'+regBadge(x.reg)+'</div>'+
          '<div class="sl-term">'+esc(x.term)+'<span class="p">'+esc(x.pos)+'</span></div>'+
          '<div class="sl-ko">'+esc(x.ko)+'</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="sl-en">'+esc(x.en)+'</div>'+
          '<div class="sl-ex">'+slangEx(x,"hl")+'</div>'+
          '<div class="sl-exko">'+esc(x.exKo)+'</div>'+
          '<div class="sl-note'+(x.reg===3?' warn':'')+'">'+esc(x.note)+'</div>'+
          '<div class="sp-controls" style="margin:12px 0 0"><button data-say="'+esc(x.ex)+'">🔊 예문 듣기</button></div>'+
        '</div>'+
      '</div>').join('');
    qsa(".sp-item",$("slang-body")).forEach(item=>{
      item.querySelector(".sp-head").addEventListener("click",()=>{ const o=item.classList.toggle("open"); if(!o)stopSpeak(); });
      const say=item.querySelector("[data-say]");
      if(say)say.addEventListener("click",e=>{ e.stopPropagation(); speak(say.dataset.say,{rate:.9}); });
    });
  }
  // 장르·슬랭 키보드 조작
  document.addEventListener("keydown",e=>{
    if(!$("panel-slang").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("slang-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(!slang||slMode!=="quiz")return;
    const opts=qsa(".opt",$("slang-body"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
    if(!slang.answered && idx>=0 && idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(slang.answered && $("slang-next")) $("slang-next").click();
    }
  });



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"slang", wide:true,
    init(){ buildSlangChips(); startSlang(); },
    resume(){ if(slMode==="quiz" && slang && slang.answered){ slang.i++; renderSlang(); } }
  });

})(window.APP);
