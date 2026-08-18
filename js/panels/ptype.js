/* ============================================================
   지문 유형 — 글의 짜임
   ------------------------------------------------------------
   리딩 탭이 문제 유형과 주제 분야를 다룬다면 여기서는 그 아래 축인
   전개 방식을 다룬다. 같은 주제라도 짜임이 다르면 읽는 법이 달라진다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        esc = A.esc,
        shuffled = A.shuffled,
        AB = A.AB,
        stopSpeak = A.stopSpeak,
        speakBest = A.speakBest,
        beep = A.beep,
        confetti = A.confetti,
        comboBadge = A.comboBadge,
        comboPopup = A.comboPopup,
        comboSummary = A.comboSummary,
        registerCombo = A.registerCombo,
        bestCombo = A.bestCombo,
        bestLabel = A.bestLabel;

  // ---- 지문 유형 (글의 짜임) ----
  // 리딩 탭이 "문제 유형"과 "주제 분야"를 다룬다면 여기서는 그 아래 축인 "전개 방식"을 다룬다.
  const PT = window.PASSAGES || [];
  const PGROUPS = (function(){ const s=[]; PT.forEach(x=>{ if(s.indexOf(x.group)<0)s.push(x.group); }); return s; })();
  let pGroup="all", pMode="learn", pSes=null;

  function ptypeList(){
    const q=($("ptype-search").value||"").trim().toLowerCase();
    return PT.filter(x=>{
      if(pGroup!=="all"&&x.group!==pGroup)return false;
      if(!q)return true;
      const hay=[x.type,x.desc,x.howto,x.group,x.signals.join(" "),x.points.join(" "),
                 x.examples.map(e=>e.title+" "+e.en+" "+e.ko).join(" ")].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }
  function buildPtypeChips(){
    $("ptype-group").innerHTML='<button class="tp-chip" data-pg="all" aria-pressed="'+(pGroup==="all")+'">🗂 전체<span class="c">'+PT.length+'</span></button>'+
      PGROUPS.map(g=>{const n=PT.filter(x=>x.group===g).length;
        return '<button class="tp-chip" data-pg="'+esc(g)+'" aria-pressed="'+(pGroup===g)+'">'+esc(g)+'<span class="c">'+n+'</span></button>';}).join('');
    $("ptype-group").querySelectorAll("[data-pg]").forEach(b=>b.addEventListener("click",()=>{
      pGroup=b.dataset.pg; pSes=null; buildPtypeChips(); renderPtype(); }));
  }
  $("ptype-search").addEventListener("input",()=>{ if(pMode==="learn")renderPtype(); });
  $("ptype-mode").querySelectorAll("[data-pmode]").forEach(b=>b.addEventListener("click",()=>{
    $("ptype-mode").querySelectorAll("[data-pmode]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    pMode=b.dataset.pmode; pSes=null; stopSpeak(); renderPtype(); }));
  $("ptype-shuffle").addEventListener("click",()=>{ pSes=null; renderPtype(); });

  function renderPtype(){
    const list=ptypeList();
    const nEx=list.reduce((s,x)=>s+x.examples.length,0);
    $("ptype-count").textContent=list.length+"개 유형 · 예문 "+nEx+"개";
    if(!PT.length){ $("ptype-body").innerHTML='<div class="empty">passages.js 를 불러오지 못했습니다.</div>'; return; }
    if(!list.length){ $("ptype-body").innerHTML='<div class="empty">해당하는 유형이 없습니다.</div>'; return; }
    if(pMode==="quiz") return renderPtypeQuiz(list);
    $("ptype-body").innerHTML=list.map((x,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(x.group)+'</span>'+
            '<span class="topic-tag">예문 '+x.examples.length+'개</span></div>'+
          '<div class="tp-title">'+x.icon+' '+esc(x.type)+'</div>'+
          '<div class="tp-sub">'+esc(x.desc)+'</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="sp-sec-title">🚩 신호 표현</div>'+
          '<div class="tp-gloss">'+x.signals.map(s=>'<span><b>'+esc(s)+'</b></span>').join('')+'</div>'+
          '<div class="sp-sec-title">🧭 읽는 요령</div><div class="pt-note">'+esc(x.howto)+'</div>'+
          '<div class="sp-sec-title">🎯 출제 포인트</div>'+
          '<ul class="pt-points">'+x.points.map(p=>'<li>'+esc(p)+'</li>').join('')+'</ul>'+
          x.examples.map((e,k)=>
            '<div class="tp-qbox" data-ex="'+k+'">'+
              '<div class="tp-qn">예문 '+(k+1)+' · '+esc(e.title)+'</div>'+
              '<div class="sp-controls" style="margin:0 0 10px">'+
                '<button data-act="play">▶ 듣기</button><button data-act="stop">■ 정지</button>'+
                '<button data-act="ko" aria-pressed="false">🇰🇷 해석</button></div>'+
              '<div class="tp-passage">'+esc(e.en)+'</div>'+
              '<div class="ko-text" style="display:none;margin-top:10px"><div class="tp-ko">'+esc(e.ko)+'</div></div>'+
              '<div class="sp-sec-title">🧩 구조 분석</div>'+
              '<div class="pt-map">'+e.map.map(m=>'<div class="pt-map-row"><span class="pt-part">'+esc(m.part)+'</span>'+
                '<span class="pt-role">'+esc(m.role)+'</span></div>').join('')+'</div>'+
            '</div>').join('')+
        '</div></div>').join('');
    $("ptype-body").querySelectorAll(".sp-item").forEach(item=>{
      const x=list[parseInt(item.dataset.i,10)];
      item.querySelector(".sp-head").addEventListener("click",()=>{const o=item.classList.toggle("open");if(!o)stopSpeak();});
      item.querySelectorAll("[data-ex]").forEach(box=>{
        const e=x.examples[parseInt(box.dataset.ex,10)];
        box.querySelector('[data-act="play"]').addEventListener("click",ev=>{ev.stopPropagation();
          const b=ev.currentTarget;b.textContent="🔊 재생 중…";
          speakBest(e.en,{rate:.92,onend:()=>b.textContent="▶ 듣기"});});
        box.querySelector('[data-act="stop"]').addEventListener("click",ev=>{ev.stopPropagation();stopSpeak();
          box.querySelector('[data-act="play"]').textContent="▶ 듣기";});
        const kb=box.querySelector('[data-act="ko"]');
        kb.addEventListener("click",ev=>{ev.stopPropagation();const on=kb.getAttribute("aria-pressed")==="true";
          kb.setAttribute("aria-pressed",!on);box.querySelector(".ko-text").style.display=on?"none":"block";});
      });
    });
  }

  // 유형 맞히기 — 예문을 읽고 어떤 전개 방식인지 고른다
  function renderPtypeQuiz(list){
    if(list.length<2){ $("ptype-body").innerHTML='<div class="empty">유형이 2개 이상이어야 퀴즈를 낼 수 있습니다.</div>'; return; }
    if(!pSes||pSes.finished){
      const pool=[];
      list.forEach(x=>x.examples.forEach(e=>pool.push({ex:e,type:x})));
      pSes={list:shuffled(pool).slice(0,Math.min(8,pool.length)),i:0,score:0,answered:false,
            streak:0,best:0,prevBest:bestCombo.ptype||0,pool:list};
    }
    drawPtypeQ();
  }
  function drawPtypeQ(){
    if(pSes.i>=pSes.list.length){
      const pct=Math.round(pSes.score/pSes.list.length*100);
      $("ptype-body").innerHTML='<div class="result"><div class="big">'+pSes.score+' / '+pSes.list.length+'</div>'+
        '<p>'+(pct>=80?"글의 짜임이 보이기 시작했네요! 🎉":pct>=50?"좋아요, 신호 표현을 다시 훑어보세요 💪":"유형 익히기로 돌아가 볼까요 📖")+' ('+pct+'%)</p>'+
        comboSummary(pSes,"ptype")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="pt2-restart">새 문제 풀기</button></div>';
      pSes.finished=true;
      $("pt2-restart").addEventListener("click",()=>{pSes=null;renderPtype();});
      if(pct>=80){confetti(80);beep("ok",pSes.best);}
      return;
    }
    const it=pSes.list[pSes.i]; pSes.answered=false;
    // 보기: 정답 유형 + 같은 목록에서 뽑은 오답 3개
    if(!it.opts){
      const wrong=shuffled(pSes.pool.filter(x=>x.type!==it.type.type)).slice(0,3);
      const opts=shuffled([it.type].concat(wrong));
      it.opts=opts.map(o=>o.icon+" "+o.type);
      it.ans=opts.indexOf(it.type);
    }
    $("ptype-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(pSes.i/pSes.list.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">'+(pSes.i+1)+' / '+pSes.list.length+'</span>'+
        '<span id="pt2-streak">'+comboBadge(pSes.streak)+'</span></div>'+
      '<div class="tp-passage" style="max-height:300px;overflow-y:auto;margin-bottom:16px">'+esc(it.ex.en)+'</div>'+
      '<div class="q-text" style="font-size:15px;font-weight:700;line-height:1.8;margin-bottom:14px">이 글은 어떤 방식으로 전개되고 있나요?</div>'+
      it.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="pt2-score">'+pSes.score+'</b> / '+pSes.list.length+bestLabel("ptype")+'</span>'+
      '<button class="quiz-next" id="pt2-next">다음 →</button></div><div id="pt2-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    $("ptype-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerPtype(parseInt(b.dataset.i,10),it)));
    $("pt2-next").addEventListener("click",()=>{pSes.i++;drawPtypeQ();window.scrollTo({top:0,behavior:"smooth"});});
  }
  function answerPtype(pick,it){
    if(pSes.answered)return; pSes.answered=true;
    const ok=pick===it.ans,btns=$("ptype-body").querySelectorAll(".opt");
    let rec=false;
    if(ok){
      pSes.score++;pSes.streak++;pSes.best=Math.max(pSes.best,pSes.streak);
      if(bestCombo.ptype===undefined)bestCombo.ptype=0;
      rec=registerCombo(pSes,"ptype");
      beep("ok",pSes.streak);confetti(rec?110:pSes.streak>=5?70:pSes.streak>=3?45:26);
      comboPopup(pSes.streak,rec);
      const s=$("pt2-score");s.textContent=pSes.score;s.classList.add("bump");
      const bi=document.querySelector("#ptype-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((pSes.i+1)/pSes.list.length*100)+"%";
    }else{pSes.streak=0;pSes.recordShown=false;beep("no");btns[pick].classList.add("wrong");}
    btns.forEach((b,i)=>{b.disabled=true;if(i===it.ans)b.classList.add("correct");});
    const sb=$("pt2-streak");if(sb)sb.innerHTML=comboBadge(pSes.streak);
    $("pt2-reveal").innerHTML='<div class="reveal '+(ok?"ok":"no")+'">'+
      '<div class="verdict">'+(ok?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[it.ans]+') '+esc(it.type.type))+
        (ok?' '+comboBadge(pSes.streak)+(rec?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp"><b>'+esc(it.ex.title)+'</b> · '+esc(it.type.howto)+'</div>'+
      '<div class="pt-map" style="margin-top:10px">'+it.ex.map.map(m=>'<div class="pt-map-row">'+
        '<span class="pt-part">'+esc(m.part)+'</span><span class="pt-role">'+esc(m.role)+'</span></div>').join('')+'</div>'+
      '</div>';
    const nb=$("pt2-next");nb.style.visibility="visible";nb.classList.add("on");
    nb.textContent=pSes.i===pSes.list.length-1?"결과 보기 →":"다음 →";
  }
  document.addEventListener("keydown",e=>{
    if(!$("panel-ptype").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(pMode!=="quiz"||!pSes||!pSes.list)return;
    const opts=Array.prototype.slice.call($("ptype-body").querySelectorAll(".opt"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){const n=parseInt(e.key,10);if(n>=1&&n<=opts.length)idx=n-1;}
    if(!pSes.answered&&idx>=0&&idx<opts.length){e.preventDefault();opts[idx].click();return;}
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){e.preventDefault();
      if(pSes.answered&&$("pt2-next"))$("pt2-next").click();}
  });



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"ptype", wide:true,
    init(){ buildPtypeChips(); renderPtype(); },
    resume(){ if(pMode==="quiz" && pSes && pSes.answered){ pSes.i++; drawPtypeQ(); } }
  });

})(window.APP);
