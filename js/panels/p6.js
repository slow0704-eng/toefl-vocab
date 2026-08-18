/* ============================================================
   TOEIC Part 6 — 장문 빈칸 채우기
   ------------------------------------------------------------
   빈칸 넷이 한 지문을 공유하므로 문항을 섞지 않고 세트 단위로 진행한다.
   푼 빈칸은 지문 안에 정답을 채워 남겨 다음 빈칸의 근거가 되게 한다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        qsa = A.qsa,
        esc = A.esc,
        shuffled = A.shuffled,
        LV = A.LV,
        AB = A.AB,
        toast = A.toast,
        beep = A.beep,
        confetti = A.confetti,
        comboBadge = A.comboBadge,
        comboPopup = A.comboPopup,
        comboSummary = A.comboSummary,
        registerCombo = A.registerCombo,
        bestCombo = A.bestCombo,
        bestLabel = A.bestLabel;

  // ---- TOEIC Part 6 (장문 빈칸 채우기) ----
  // Part 5 는 문항 단위로 섞어도 되지만 Part 6 는 그러면 안 된다.
  // 빈칸 네 개가 같은 지문을 공유하고, 앞 빈칸에서 잡은 시제·화자가
  // 뒤 빈칸의 근거가 되기 때문이다. 그래서 세트 단위로 진행하고
  // 이미 푼 빈칸은 지문 안에 정답을 채워 넣어 보여 준다.
  const P6 = window.PART6 || [];
  let p6Mode="solve", p6Lv=0, p6Ses=null;

  function p6Pool(){ return P6.filter(x=>p6Lv===0||x.level===p6Lv); }
  function p6Levels(){
    const box=$("p6-lv");
    box.innerHTML=[[0,"전체","--accent"],[2,"중급","--lv2"],[3,"고급","--lv3"]].map(function(d){
      const n=d[0]===0?P6.length:P6.filter(x=>x.level===d[0]).length;
      const dot=d[0]===0?"":'<span class="dot" style="background:var('+d[2]+')"></span>';
      return '<button class="lv-chip" data-lv="'+d[0]+'" aria-pressed="'+(p6Lv===d[0])+'"'+(n?'':' disabled style="opacity:.35"')+'>'+
             dot+d[1]+' <span style="opacity:.7">'+n+'</span></button>';
    }).join("");
    box.querySelectorAll(".lv-chip").forEach(b=>b.addEventListener("click",()=>{
      p6Lv=parseInt(b.dataset.lv,10); p6Ses=null; p6Levels(); startP6();
    }));
  }
  /** 지문의 ___n___ 자리를 채운다. fill(n) 이 null 을 주면 번호 칸으로 남긴다. */
  function p6Text(set, fill, cur){
    let html=esc(set.en);
    for(let n=1;n<=4;n++){
      const v=fill?fill(n):null;
      const cls = v!=null ? "p6-blank done" : (n===cur ? "p6-blank now" : "p6-blank");
      const body = v!=null ? esc(v) : "("+n+")";
      html=html.replace("___"+n+"___", '<span class="'+cls+'">'+body+'</span>');
    }
    return html.replace(/\n/g,"<br/>");
  }
  function p6Gloss(set){
    return '<div class="sp-sec-title">💡 핵심 어휘</div><div class="tp-gloss">'+
      set.gloss.map(g=>'<span><b>'+esc(g.w)+'</b>'+esc(g.ko)+'</span>').join('')+'</div>';
  }

  function startP6(){
    const pool=p6Pool();
    $("p6-count").textContent=pool.length+"세트 · "+pool.reduce((s,x)=>s+x.qs.length,0)+"문항";
    if(!pool.length){ $("p6-body").innerHTML='<div class="empty">해당 난이도의 지문이 없습니다.</div>'; return; }
    if(p6Mode==="list") return renderP6List(pool);
    if(!p6Ses||p6Ses.finished) p6Ses={sets:shuffled(pool),si:0,qi:0,score:0,total:0,picks:{},answered:false,streak:0,best:0,prevBest:bestCombo.p6||0};
    drawP6();
  }

  function renderP6List(pool){
    $("p6-body").innerHTML=pool.map((set,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="exam-badge toeic">TOEIC Part 6</span>'+
            '<span class="cat-badge">'+esc(set.type)+'</span>'+
            '<span class="lv-badge '+LV[set.level].c+'">'+LV[set.level].n+'</span>'+
            '<span class="topic-tag">4문항</span></div>'+
          '<div class="tp-title">'+esc(set.title)+'</div>'+
          '<div class="tp-sub">'+esc(set.topic)+' · '+set.en.split(/\s+/).length+' words</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="sp-controls">'+
            '<button data-act="ko" aria-pressed="false">🇰🇷 한글 해석</button></div>'+
          '<div class="sp-sec-title">📄 지문 (정답이 채워진 상태)</div>'+
          '<div class="tp-passage mono">'+p6Text(set, n=>{const q=set.qs[n-1]; return q.opts[q.ans];})+'</div>'+
          '<div class="ko-text" style="display:none;margin-top:12px"><div class="sp-sec-title">🇰🇷 해석</div>'+
            '<div class="tp-ko">'+esc(set.ko)+'</div></div>'+
          p6Gloss(set)+
          '<div class="sp-sec-title">❓ 문제 · 해설</div>'+
          set.qs.map(q=>'<div class="tp-qbox"><div class="tp-qn">('+q.no+')<span class="p6-cat">'+esc(q.cat)+'</span></div>'+
            '<div class="gram-opts">'+q.opts.map((o,j)=>'<span class="'+(j===q.ans?"ok":"")+'">('+AB[j]+') '+esc(o)+'</span>').join('')+'</div>'+
            '<div class="gram-exp">정답 ('+AB[q.ans]+') · '+esc(q.exp)+'</div></div>').join('')+
        '</div></div>').join('');
    qsa(".sp-item",$("p6-body")).forEach(item=>{
      item.querySelector(".sp-head").addEventListener("click",()=>item.classList.toggle("open"));
      const kb=item.querySelector('[data-act="ko"]');
      kb.addEventListener("click",e=>{e.stopPropagation();const on=kb.getAttribute("aria-pressed")==="true";
        kb.setAttribute("aria-pressed",!on);item.querySelector(".ko-text").style.display=on?"none":"block";});
    });
  }

  function drawP6(){
    const S=p6Ses;
    if(S.si>=S.sets.length){
      const pct=Math.round(S.score/Math.max(1,S.total)*100);
      $("p6-body").innerHTML='<div class="result"><div class="big">'+S.score+' / '+S.total+'</div>'+
        '<p>'+(pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"지문 흐름을 다시 살펴보세요 📄")+' ('+pct+'%)</p>'+
        comboSummary(S,"p6")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="p6-restart">새 세트 풀기</button></div>';
      S.finished=true;
      $("p6-restart").addEventListener("click",()=>{p6Ses=null;startP6();});
      if(pct>=80){confetti(80);beep("ok",S.best);}
      return;
    }
    const set=S.sets[S.si], q=set.qs[S.qi];
    S.answered=false;
    const done=S.picks[set.id]||{};
    $("p6-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(S.qi/4*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">지문 '+(S.si+1)+' / '+S.sets.length+' · 빈칸 '+(S.qi+1)+' / 4</span>'+
        '<span id="p6-streak">'+comboBadge(S.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="exam-badge toeic">TOEIC Part 6</span>'+
        '<span class="cat-badge">'+esc(set.type)+'</span><span class="lv-badge '+LV[set.level].c+'">'+LV[set.level].n+'</span>'+
        '<span class="topic-tag">'+esc(q.cat)+'</span></div>'+
      '<div class="tp-title" style="margin-bottom:8px">'+esc(set.title)+'</div>'+
      '<div class="tp-passage mono p6-pass">'+p6Text(set, n=>done[n]!=null?set.qs[n-1].opts[set.qs[n-1].ans]:null, q.no)+'</div>'+
      '<div class="q-text" style="font-size:15px;font-weight:700;margin:14px 0 12px">('+q.no+') 번 빈칸에 알맞은 것은?</div>'+
      q.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="p6-score">'+S.score+'</b> / '+S.total+bestLabel("p6")+'</span>'+
      '<button class="quiz-next" id="p6-next">다음 →</button></div><div id="p6-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    qsa(".opt",$("p6-body")).forEach(b=>b.addEventListener("click",()=>answerP6(parseInt(b.dataset.i,10),set,q)));
    $("p6-next").addEventListener("click",()=>{
      if(S.qi<3){ S.qi++; }
      else { S.si++; S.qi=0; }
      drawP6(); window.scrollTo({top:0,behavior:"smooth"});
    });
  }
  function answerP6(pick,set,q){
    const S=p6Ses;
    if(S.answered)return; S.answered=true; S.total++;
    if(!S.picks[set.id])S.picks[set.id]={};
    S.picks[set.id][q.no]=pick;
    const ok=pick===q.ans, btns=qsa(".opt",$("p6-body"));
    let rec=false;
    if(ok){
      S.score++;S.streak++;S.best=Math.max(S.best,S.streak);
      if(bestCombo.p6===undefined)bestCombo.p6=0;
      rec=registerCombo(S,"p6");
      beep("ok",S.streak);confetti(rec?110:S.streak>=5?70:S.streak>=3?45:26);
      comboPopup(S.streak,rec);
      const sc=$("p6-score");sc.textContent=S.score;sc.classList.add("bump");
    }else{S.streak=0;S.recordShown=false;beep("no");btns[pick].classList.add("wrong");}
    btns.forEach((b,i)=>{b.disabled=true;if(i===q.ans)b.classList.add("correct");});
    const sb=$("p6-streak");if(sb)sb.innerHTML=comboBadge(S.streak);
    // 방금 푼 빈칸을 지문 안에서 정답으로 채워 보여 준다
    const pass=document.querySelector("#p6-body .p6-pass");
    if(pass){
      const done=S.picks[set.id];
      pass.innerHTML=p6Text(set, n=>done[n]!=null?set.qs[n-1].opts[set.qs[n-1].ans]:null, null);
    }
    const last=S.qi===3;
    $("p6-reveal").innerHTML='<div class="reveal '+(ok?"ok":"no")+'">'+
      '<div class="verdict">'+(ok?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[q.ans]+')')+
        (ok?' '+comboBadge(S.streak)+(rec?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp">'+esc(q.exp)+'</div></div>'+
      (last?'<div class="p6-wrap"><div class="sp-sec-title">🇰🇷 지문 해석</div><div class="tp-ko">'+esc(set.ko)+'</div>'+p6Gloss(set)+'</div>':'');
    const nb=$("p6-next");nb.style.visibility="visible";nb.classList.add("on");
    nb.textContent=last?(S.si===S.sets.length-1?"결과 보기 →":"다음 지문 →"):"다음 빈칸 →";
  }
  $("p6-mode").querySelectorAll("[data-p6mode]").forEach(b=>b.addEventListener("click",()=>{
    $("p6-mode").querySelectorAll("[data-p6mode]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    p6Mode=b.dataset.p6mode; p6Ses=null; startP6();
  }));
  $("p6-shuffle").addEventListener("click",()=>{ p6Ses=null; startP6(); toast("새 세트를 뽑았습니다 🔀"); });
  document.addEventListener("keydown",e=>{
    if(!$("panel-p6").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(p6Mode!=="solve"||!p6Ses||!p6Ses.sets)return;
    const opts=qsa(".opt",$("p6-body"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){const n=parseInt(e.key,10);if(n>=1&&n<=opts.length)idx=n-1;}
    if(!p6Ses.answered&&idx>=0&&idx<opts.length){e.preventDefault();opts[idx].click();return;}
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){e.preventDefault();
      if(p6Ses.answered&&$("p6-next"))$("p6-next").click();}
  });



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"p6", wide:true,
    init(){ p6Levels(); startP6(); },
    resume(){ if(p6Mode==="solve" && p6Ses && p6Ses.answered){ const n=$("p6-next"); if(n) n.click(); } }
  });

})(window.APP);
