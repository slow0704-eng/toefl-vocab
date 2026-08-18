/* ============================================================
   구문 — 학술 지문에 반복되는 고난도 문장 구조
   ------------------------------------------------------------
   구조 유형 13종 × 주제 13종. 문장 단위 문제와, 한 지문에 서로 다른
   구문 4~6개가 섞인 지문형 모드가 있다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        qsa = A.qsa,
        esc = A.esc,
        shuffled = A.shuffled,
        LV = A.LV,
        LV_DEFS = A.LV_DEFS,
        TOPIC_ORDER = A.TOPIC_ORDER,
        AB = A.AB,
        toast = A.toast,
        speak = A.speak,
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

  // ---- 구문 (문장 구조) ----
  const STRUCTS = (window.STRUCTURES || []).slice();
  const SCATS = (function(){ const s=[]; STRUCTS.forEach(x=>{ if(s.indexOf(x.cat)<0)s.push(x.cat); }); return s; })();
  const STOPICS = (function(){
    const have={}; STRUCTS.forEach(x=>{ if(x.topic)have[x.topic]=1; });
    const list=TOPIC_ORDER.filter(t=>have[t]);
    Object.keys(have).forEach(t=>{ if(list.indexOf(t)<0)list.push(t); });
    return list;
  })();
  let sLv=0, sCat="all", sTopic="all", sMode="solve", struct=null;
  // 지문형 — 한 지문에 구문 4~6개가 섞여 있고 문맥 속에서 차례로 고른다
  const SPASS = (window.STRUCT_PASSAGES || []).slice();
  const SPTOPICS = (function(){ const s=[]; SPASS.forEach(p=>{ if(s.indexOf(p.topic)<0)s.push(p.topic); }); return s; })();
  let spTopic="all", sp=null;

  /* 난이도·유형·주제 세 축을 함께 쓰므로, 칩 개수를 계산할 때는
     자기 자신의 축만 빼고 나머지 조건을 적용한다(skip). */
  function structMatch(x, skip){
    if(skip!=="lv" && sLv!==0 && x.level!==sLv) return false;
    if(skip!=="cat" && sCat!=="all" && x.cat!==sCat) return false;
    if(skip!=="topic" && sTopic!=="all" && x.topic!==sTopic) return false;
    const q=($("struct-search").value||"").trim().toLowerCase();
    if(q && !((x.pat||"").toLowerCase().includes(q) || (x.en||"").toLowerCase().includes(q) ||
              (x.ko||"").includes(q) || (x.note||"").includes(q) ||
              (x.cat||"").includes(q) || (x.topic||"").includes(q))) return false;
    return true;
  }
  function structPool(){ return STRUCTS.filter(x=>structMatch(x)); }

  function buildStructChips(){
    const forLv = STRUCTS.filter(x=>structMatch(x,"lv"));
    $("struct-lv").innerHTML = LV_DEFS.map(function(d){
      const v=d[0];
      const cnt = v===0?forLv.length:forLv.filter(x=>x.level===v).length;
      const dot = v===0?"":'<span class="dot" style="background:var('+d[2]+')"></span>';
      return '<button class="lv-chip" data-lv="'+v+'" aria-pressed="'+(sLv===v)+'"'+(cnt?'':' style="opacity:.35"')+'>'+dot+d[1]+' <span style="opacity:.7">'+cnt+'</span></button>';
    }).join("");
    const forCat = STRUCTS.filter(x=>structMatch(x,"cat"));
    $("struct-cat").innerHTML = '<button class="tp-chip" data-sc="all" aria-pressed="'+(sCat==="all")+'">🗂 전체 유형<span class="c">'+forCat.length+'</span></button>'+
      SCATS.map(function(c){
        const n=forCat.filter(x=>x.cat===c).length;
        return '<button class="tp-chip" data-sc="'+esc(c)+'" aria-pressed="'+(sCat===c)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(c)+'<span class="c">'+n+'</span></button>';
      }).join("");
    const forTp = STRUCTS.filter(x=>structMatch(x,"topic"));
    $("struct-topic").innerHTML = '<button class="tp-chip" data-st="all" aria-pressed="'+(sTopic==="all")+'">🗂 전체 주제<span class="c">'+forTp.length+'</span></button>'+
      STOPICS.map(function(t){
        const n=forTp.filter(x=>x.topic===t).length;
        return '<button class="tp-chip" data-st="'+esc(t)+'" aria-pressed="'+(sTopic===t)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(t)+'<span class="c">'+n+'</span></button>';
      }).join("");
    qsa(".lv-chip",$("struct-lv")).forEach(b=>b.addEventListener("click",()=>{ sLv=parseInt(b.dataset.lv,10); buildStructChips(); startStruct(); }));
    qsa("[data-sc]",$("struct-cat")).forEach(b=>b.addEventListener("click",()=>{ sCat=b.dataset.sc; buildStructChips(); startStruct(); }));
    qsa("[data-st]",$("struct-topic")).forEach(b=>b.addEventListener("click",()=>{ sTopic=b.dataset.st; buildStructChips(); startStruct(); }));
  }

  // 예문에서 blank 자리를 빈칸 또는 정답이 채워진 형태로 렌더
  function structSentence(x, filled){
    const i=x.en.indexOf(x.blank);
    const mid = filled ? '<span class="blank filled">'+esc(filled)+'</span>' : '<span class="blank">______</span>';
    return esc(x.en.slice(0,i))+mid+esc(x.en.slice(i+x.blank.length));
  }
  // 구조 보기 모드: 핵심부에 밑줄을 그어 어디가 그 구조인지 드러낸다
  function structHighlight(x){
    const i=x.en.indexOf(x.blank);
    return esc(x.en.slice(0,i))+'<span class="hl">'+esc(x.blank)+'</span>'+esc(x.en.slice(i+x.blank.length));
  }

  $("struct-search").addEventListener("input",()=>{ buildStructChips(); startStruct(); });
  qsa("[data-smode]",$("struct-mode")).forEach(b=>b.addEventListener("click",()=>{
    qsa("[data-smode]",$("struct-mode")).forEach(x=>x.setAttribute("aria-pressed",x===b));
    sMode=b.dataset.smode; sp=null; stopSpeak(); startStruct();
  }));
  $("struct-shuffle").addEventListener("click",()=>{
    if(sMode==="passage") sp=null;
    startStruct();
    toast(sMode==="list"?"구조 유형 순서로 정렬했습니다":"새 문제 세트를 뽑았습니다 🔀");
  });

  function startStruct(){
    // 지문형은 필터 축이 달라서(구조 유형이 지문마다 여러 개) 칩 줄을 갈아 끼운다
    const isP = sMode==="passage";
    $("struct-filters").hidden = isP;
    $("struct-pfilters").hidden = !isP;
    if(isP) return startStructPassage();
    const pool=structPool();
    $("struct-count").textContent = pool.length+"개 구문"+(sMode==="solve"&&pool.length?" 중 "+Math.min(10,pool.length)+"문항 출제":"");
    if(!pool.length){ struct=null; $("struct-body").innerHTML='<div class="empty">조건에 맞는 구문이 없습니다.<br/>유형·주제·난이도 필터를 넓혀 보세요.</div>'; return; }
    if(sMode==="list"){ struct=null; renderStructList(pool); return; }
    struct={
      list: shuffled(pool).slice(0,Math.min(10,pool.length)).map(x=>({x:x, opts:shuffled([x.blank].concat(x.opts))})),
      i:0, score:0, answered:false, streak:0, best:0, prevBest:bestCombo.struct, records:0, missed:[]
    };
    renderStruct();
  }
  function renderStruct(){
    if(!struct)return;
    if(struct.i>=struct.list.length){ renderStructResult(); return; }
    const it=struct.list[struct.i], x=it.x;
    struct.answered=false;
    const pct=Math.round(struct.i/struct.list.length*100);
    $("struct-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 것을 고르세요 · '+(struct.i+1)+' / '+struct.list.length+'</span>'+
        '<span id="struct-streak">'+comboBadge(struct.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(x.cat)+'</span>'+
        '<span class="topic-tag">'+esc(x.topic)+'</span>'+
        '<span class="lv-badge '+LV[x.level].c+'">'+LV[x.level].n+'</span></div>'+
      '<div class="st-q">'+structSentence(x)+'</div>'+
      it.opts.map((o,i)=>'<button class="opt" data-o="'+esc(o)+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="struct-score-n">'+struct.score+'</b> / '+struct.list.length+bestLabel("struct")+'</span>'+
      '<button class="quiz-next" id="struct-next">다음 →</button></div>'+
      '<div id="struct-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    qsa(".opt",$("struct-body")).forEach(b=>b.addEventListener("click",()=>answerStruct(b,it)));
    $("struct-next").addEventListener("click",()=>{ struct.i++; renderStruct(); });
  }
  function answerStruct(btn,it){
    if(struct.answered)return; struct.answered=true;
    const x=it.x, correct=btn.dataset.o===x.blank;
    let record=false;
    if(correct){
      struct.score++; struct.streak++; struct.best=Math.max(struct.best,struct.streak);
      record=registerCombo(struct,"struct");
      if(record)struct.records++;
      beep("ok",struct.streak);
      confetti(record?110:struct.streak>=10?90:struct.streak>=5?70:struct.streak>=3?45:26);
      comboPopup(struct.streak,record);
      const sn=$("struct-score-n"); sn.textContent=struct.score; sn.classList.add("bump");
      const bi=document.querySelector("#struct-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((struct.i+1)/struct.list.length*100)+"%";
    }else{
      struct.streak=0; struct.recordShown=false; beep("no");
      btn.classList.add("wrong"); struct.missed.push(x);
    }
    qsa(".opt",$("struct-body")).forEach(b=>{ b.disabled=true; if(b.dataset.o===x.blank)b.classList.add("correct"); });
    // 빈칸에 정답을 채워 구조가 완성된 모습을 그대로 보여 준다
    const qBox=$("struct-body").querySelector(".st-q");
    if(qBox)qBox.innerHTML=structSentence(x,x.blank);
    const sb=$("struct-streak"); if(sb)sb.innerHTML=comboBadge(struct.streak);
    $("struct-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 '+esc(x.blank))+
        (correct?' '+comboBadge(struct.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="st-pat">'+esc(x.pat)+'</div>'+
      '<div class="st-ko">'+esc(x.ko)+'</div>'+
      '<div class="st-note">'+esc(x.note)+'</div>'+
      '<div class="sp-controls" style="margin:12px 0 0"><button id="struct-say">🔊 예문 듣기</button></div>'+
    '</div>';
    $("struct-say").addEventListener("click",e=>{ e.stopPropagation(); speak(x.en,{rate:.88}); });
    const nb=$("struct-next"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=struct.i===struct.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderStructResult(){
    const pct=Math.round(struct.score/struct.list.length*100);
    const perfect=struct.score===struct.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"구조 설명을 다시 보며 복습해요 📖";
    const missed = struct.missed.length
      ? '<div class="missed-title">틀린 구문 '+struct.missed.length+'개</div><div class="missed">'+
        struct.missed.map(x=>'<div><b>'+esc(x.pat)+'</b><span class="p">'+esc(x.cat)+'</span></div>').join('')+'</div>'
      : '';
    $("struct-body").innerHTML='<div class="result"><div class="big">'+struct.score+' / '+struct.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(struct,"struct")+missed+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="struct-restart">새 문제 풀기 (Enter)</button></div>';
    $("struct-restart").addEventListener("click",startStruct);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",struct.best); }
  }
  // 구조 보기 모드: 구조명만 보이고 누르면 예문·해석·설명 펼침
  function renderStructList(pool){
    $("struct-body").innerHTML=pool.map((x,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(x.cat)+'</span>'+
            '<span class="topic-tag">'+esc(x.topic)+'</span>'+
            '<span class="lv-badge '+LV[x.level].c+'">'+LV[x.level].n+'</span></div>'+
          '<div class="st-pat">'+esc(x.pat)+'</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="st-en">'+structHighlight(x)+'</div>'+
          '<div class="st-ko">'+esc(x.ko)+'</div>'+
          '<div class="st-note">'+esc(x.note)+'</div>'+
          '<div class="sp-controls" style="margin:12px 0 0"><button data-say="'+esc(x.en)+'">🔊 예문 듣기</button></div>'+
        '</div>'+
      '</div>').join('');
    qsa(".sp-item",$("struct-body")).forEach(item=>{
      item.querySelector(".sp-head").addEventListener("click",()=>{ const o=item.classList.toggle("open"); if(!o)stopSpeak(); });
      const say=item.querySelector("[data-say]");
      if(say)say.addEventListener("click",e=>{ e.stopPropagation(); speak(say.dataset.say,{rate:.88}); });
    });
  }
  /* ---- 구문 지문형 ----
     낱개 문장이 아니라 한 문단을 통째로 놓고, 그 안의 빈칸을 앞에서부터
     차례로 채운다. 이미 푼 자리는 지문 안에 정답이 박힌 채로 남아
     뒤 문항을 풀 때 앞 구조를 다시 읽을 수 있게 했다. */
  // 난이도 칩은 지문형에서 숨기므로 sLv 는 적용하지 않는다.
  // (다른 모드에서 걸어 둔 난이도 때문에 보이지 않는 필터로 지문이 사라지면 안 된다)
  function spPool(){
    const q=($("struct-search").value||"").trim().toLowerCase();
    return SPASS.filter(p=>{
      if(spTopic!=="all" && p.topic!==spTopic) return false;
      if(!q) return true;
      const hay=[p.title,p.topic,p.sents.map(s=>s.en+" "+s.ko+" "+(s.pat||"")+" "+(s.cat||"")+" "+(s.note||"")).join(" ")].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }
  function spItems(p){ return p.sents.filter(s=>s.blank!==undefined); }

  function buildSpChips(){
    $("struct-ptopic").innerHTML='<button class="tp-chip" data-sp="all" aria-pressed="'+(spTopic==="all")+'">🗂 전체<span class="c">'+SPASS.length+'</span></button>'+
      SPTOPICS.map(function(t){
        const n=SPASS.filter(p=>p.topic===t).length;
        return '<button class="tp-chip" data-sp="'+esc(t)+'" aria-pressed="'+(spTopic===t)+'">'+esc(t)+'<span class="c">'+n+'</span></button>';
      }).join("");
    qsa("[data-sp]",$("struct-ptopic")).forEach(b=>b.addEventListener("click",()=>{
      spTopic=b.dataset.sp; sp=null; buildSpChips(); startStructPassage();
    }));
  }

  function startStructPassage(){
    buildSpChips();
    const pool=spPool();
    const nq=pool.reduce((s,p)=>s+spItems(p).length,0);
    $("struct-count").textContent = pool.length+"개 지문 · "+nq+"문항";
    if(!pool.length){ sp=null; $("struct-body").innerHTML='<div class="empty">조건에 맞는 지문이 없습니다.<br/>주제 필터나 검색어를 넓혀 보세요.</div>'; return; }
    if(!sp || sp.finished){
      sp={ list:shuffled(pool), pi:0, qi:0, score:0, total:0, answered:false,
           streak:0, best:0, prevBest:bestCombo.spass||0, marks:{} };
    }
    drawSpQ();
  }

  // 지문 렌더 — 이미 푼 빈칸은 정답이 박힌 채로, 현재 빈칸은 밑줄로 남긴다
  function spPassageHTML(p, revealAll){
    let n=0;
    return p.sents.map(function(s){
      if(s.blank===undefined) return esc(s.en);
      const k=n++;
      const i=s.en.indexOf(s.blank);
      const head=esc(s.en.slice(0,i)), tail=esc(s.en.slice(i+s.blank.length));
      let mid;
      if(revealAll || sp.marks[k]){
        const cls = revealAll ? "filled" : ("filled "+sp.marks[k]);
        mid='<span class="blank '+cls+'">'+esc(s.blank)+'</span>';
      }else if(k===sp.qi){
        mid='<span class="blank cur">('+(k+1)+') ______</span>';
      }else{
        mid='<span class="blank">('+(k+1)+') ______</span>';
      }
      return head+mid+tail;
    }).join(" ");
  }

  function drawSpQ(){
    const p=sp.list[sp.pi], items=spItems(p);
    if(sp.qi>=items.length) return drawSpDone();
    const it=items[sp.qi];
    if(!it._opts) it._opts=shuffled([it.blank].concat(it.opts));
    sp.answered=false;
    $("struct-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(sp.qi/items.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">지문 '+(sp.pi+1)+' / '+sp.list.length+' · 빈칸 '+(sp.qi+1)+' / '+items.length+'</span>'+
        '<span id="sp-streak">'+comboBadge(sp.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(p.topic)+'</span>'+
        '<span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span>'+
        '<span class="topic-tag">'+items.length+'문항</span></div>'+
      '<div class="st-pass">'+spPassageHTML(p,false)+'</div>'+
      '<div class="q-text" style="font-size:14.5px;font-weight:700;line-height:1.8;margin:14px 0 12px">'+
        '('+(sp.qi+1)+') 빈칸에 들어갈 알맞은 형태를 고르세요.</div>'+
      it._opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="sp-score">'+sp.score+'</b> / '+sp.total+bestLabel("spass")+'</span>'+
      '<button class="quiz-next" id="sp-next">다음 →</button></div><div id="sp-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    qsa(".opt",$("struct-body")).forEach(b=>b.addEventListener("click",()=>answerSp(parseInt(b.dataset.i,10),it)));
    $("sp-next").addEventListener("click",()=>{ sp.qi++; drawSpQ(); window.scrollTo({top:0,behavior:"smooth"}); });
  }

  function answerSp(pick,it){
    if(sp.answered)return; sp.answered=true;
    const btns=qsa(".opt",$("struct-body"));
    const ok = it._opts[pick]===it.blank;
    sp.total++; sp.marks[sp.qi]= ok?"ok":"no";
    let rec=false;
    if(ok){
      sp.score++; sp.streak++; sp.best=Math.max(sp.best,sp.streak);
      if(bestCombo.spass===undefined)bestCombo.spass=0;
      rec=registerCombo(sp,"spass");
      beep("ok",sp.streak); confetti(rec?110:sp.streak>=5?70:sp.streak>=3?45:26);
      comboPopup(sp.streak,rec);
      const s=$("sp-score"); s.textContent=sp.score; s.classList.add("bump");
    }else{ sp.streak=0; sp.recordShown=false; beep("no"); btns[pick].classList.add("wrong"); }
    btns.forEach((b,i)=>{ b.disabled=true; if(it._opts[i]===it.blank)b.classList.add("correct"); });
    const sb=$("sp-streak"); if(sb)sb.innerHTML=comboBadge(sp.streak);
    // 지문 안의 해당 빈칸을 정답으로 채워 넣어, 다음 문항을 풀 때 앞 구조가 읽히게 한다
    const box=document.querySelector("#struct-body .st-pass");
    if(box) box.innerHTML=spPassageHTML(sp.list[sp.pi],false);
    $("sp-reveal").innerHTML='<div class="reveal '+(ok?"ok":"no")+'">'+
      '<div class="verdict">'+(ok?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 '+esc(it.blank))+
        (ok?' '+comboBadge(sp.streak)+(rec?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="sp-badges" style="margin:8px 0"><span class="cat-badge">'+esc(it.cat)+'</span>'+
        '<span class="topic-tag">'+esc(it.pat)+'</span></div>'+
      '<div class="gram-exp">'+esc(it.note)+'</div>'+
      '<div class="st-ko" style="margin-top:10px">'+esc(it.ko)+'</div></div>';
    const nb=$("sp-next"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent = sp.qi===spItems(sp.list[sp.pi]).length-1 ? "지문 정리 보기 →" : "다음 →";
  }

  // 한 지문을 다 풀면 완성된 지문 · 해석 · 그 안에 나온 구문 정리를 보여 준다
  function drawSpDone(){
    const p=sp.list[sp.pi], items=spItems(p);
    const last = sp.pi===sp.list.length-1;
    $("struct-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-topline"><span class="quiz-q">지문 '+(sp.pi+1)+' / '+sp.list.length+' 완료 · '+esc(p.title)+'</span></div>'+
      '<div class="sp-controls" style="margin:4px 0 12px">'+
        '<button data-act="play">▶ 지문 듣기</button><button data-act="stop">■ 정지</button>'+
        '<button data-act="ko" aria-pressed="false">🇰🇷 해석</button></div>'+
      '<div class="st-pass">'+spPassageHTML(p,true)+'</div>'+
      '<div class="ko-text" style="display:none;margin-top:12px"><div class="st-ko">'+
        esc(p.sents.map(s=>s.ko).join(" "))+'</div></div>'+
      '<div class="sp-sec-title">🧩 이 지문에 나온 구문</div>'+
      items.map((it,k)=>'<div class="st-sum'+(sp.marks[k]==="no"?" miss":"")+'">'+
        '<div class="st-sum-n">('+(k+1)+')'+(sp.marks[k]==="no"?' <span class="miss-tag">틀림</span>':'')+'</div>'+
        '<div><div class="st-sum-pat">'+esc(it.pat)+'<span class="cat-badge" style="margin-left:7px">'+esc(it.cat)+'</span></div>'+
        '<div class="st-sum-note">'+esc(it.note)+'</div></div></div>').join('')+
      '<div class="sp-sec-title">💡 핵심 어휘</div><div class="tp-gloss">'+
        p.gloss.map(g=>'<span><b>'+esc(g.w)+'</b>'+esc(g.ko)+'</span>').join('')+'</div>'+
      '<div class="quiz-foot" style="margin-top:16px"><span class="quiz-score">누적 <b>'+sp.score+'</b> / '+sp.total+bestLabel("spass")+'</span>'+
      '<button class="quiz-next on" id="sp-next" style="visibility:visible">'+(last?"결과 보기 →":"다음 지문 →")+'</button></div>'+
      '</div>';
    const box=$("struct-body");
    box.querySelector('[data-act="play"]').addEventListener("click",e=>{
      const b=e.currentTarget; b.textContent="🔊 재생 중…";
      speakBest(p.sents.map(s=>s.en).join(" "),{rate:.9,onend:()=>b.textContent="▶ 지문 듣기"}); });
    box.querySelector('[data-act="stop"]').addEventListener("click",()=>{ stopSpeak();
      box.querySelector('[data-act="play"]').textContent="▶ 지문 듣기"; });
    const kb=box.querySelector('[data-act="ko"]');
    kb.addEventListener("click",()=>{ const on=kb.getAttribute("aria-pressed")==="true";
      kb.setAttribute("aria-pressed",!on); box.querySelector(".ko-text").style.display=on?"none":"block"; });
    $("sp-next").addEventListener("click",()=>{
      stopSpeak();
      if(last) return drawSpResult();
      sp.pi++; sp.qi=0; sp.marks={}; drawSpQ(); window.scrollTo({top:0,behavior:"smooth"});
    });
  }

  function drawSpResult(){
    const pct=sp.total?Math.round(sp.score/sp.total*100):0;
    const perfect=sp.total&&sp.score===sp.total;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"구문 정리를 다시 읽어 보세요 📖";
    sp.finished=true;
    $("struct-body").innerHTML='<div class="result"><div class="big">'+sp.score+' / '+sp.total+'</div>'+
      '<p>'+msg+' ('+pct+'%)</p>'+comboSummary(sp,"spass")+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="struct-restart">새 지문 세트 (Enter)</button></div>';
    $("struct-restart").addEventListener("click",()=>{ sp=null; startStructPassage(); });
    if(pct>=80){ confetti(perfect?140:80); beep("ok",sp.best); }
  }

  // 구문 키보드 조작 (A~D / 1~4 / Enter)
  document.addEventListener("keydown",e=>{
    if(!$("panel-struct").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("struct-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(sMode==="passage"){
      if(!sp)return;
      const nb=$("sp-next"), pOpts=qsa(".opt",$("struct-body"));
      let pi=AB.indexOf(String(e.key||"").toUpperCase());
      if(pi<0){ const n=parseInt(e.key,10); if(n>=1&&n<=pOpts.length)pi=n-1; }
      if(pOpts.length && !sp.answered && pi>=0 && pi<pOpts.length){ e.preventDefault(); pOpts[pi].click(); return; }
      // 지문 정리 화면에는 옵션이 없고 '다음 지문' 버튼만 있다
      if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
        if(nb && (sp.answered || !pOpts.length)){ e.preventDefault(); nb.click(); }
      }
      return;
    }
    if(!struct||sMode!=="solve")return;
    const opts=qsa(".opt",$("struct-body"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
    if(!struct.answered && idx>=0 && idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(struct.answered && $("struct-next")) $("struct-next").click();
    }
  });



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"struct", wide:true,
    init(){ buildStructChips(); startStruct(); },
    resume(){ if(sMode==="solve" && struct && struct.answered){ struct.i++; renderStruct(); } }
  });

})(window.APP);
