/* ============================================================
   듀오링고 영어 테스트(DET) — 2026 개편 공식 13유형
   ------------------------------------------------------------
   유형마다 제한 시간·채점 방식이 달라 렌더러가 유형 수만큼 있다.
   가장 큰 패널이지만 유형끼리 상태를 공유해(det, detMode, detLv) 쪼개기 어렵다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        esc = A.esc,
        shuffled = A.shuffled,
        LV = A.LV,
        AB = A.AB,
        WORDS = A.WORDS,
        speak = A.speak,
        stopSpeak = A.stopSpeak,
        speakBest = A.speakBest,
        ttsDownload = A.ttsDownload,
        scriptDownload = A.scriptDownload,
        beep = A.beep,
        confetti = A.confetti,
        comboBadge = A.comboBadge,
        comboPopup = A.comboPopup,
        comboSummary = A.comboSummary,
        registerCombo = A.registerCombo,
        bestCombo = A.bestCombo,
        bestLabel = A.bestLabel;

  // ---- 듀오링고 영어 테스트 (DET) ----
  // 2026 개편 기준 공식 13유형을 전부 담는다.
  //   duolingo.js(DET_DATA) = 기존 6유형 · duolingo-extra.js(DET_EXTRA) = 보강 유형
  // Read Aloud / Listen, Then Speak 는 2026년에 폐지되어 Interactive Speaking 으로 대체됐다.
  // 폐지 유형도 구버전 대비용으로 남겨 두되 '2026 폐지' 배지를 붙인다.
  const DETX = window.DET_EXTRA || {};
  const DET = Object.assign({}, window.DET_DATA || {}, {
    fillBlanks:           DETX.fillBlanks || [],
    interactiveReading:   DETX.interactiveReading || [],
    interactiveListening: DETX.interactiveListening || [],
    passageComplete:      (((window.DET_DATA||{}).passageComplete)||[]).concat(DETX.passageCompleteExtra||[])
  });
  // 주관식 모범답변 = 기존 7유형 + 2026 신설 3유형(Interactive Speaking / Writing·Speaking Sample)
  const DET_WS = ((window.DET_DATA||{}).writeSpeak||[]).concat(DETX.writeSpeakExtra||[]);

  // Read and Select 난이도 — 글자 수로 구간을 나눈다 (기초 ≤5 · 중급 6~7 · 고급 ≥8).
  // 가짜 단어도 같은 기준으로 나뉘어 있어 어느 난이도든 실단어·가짜가 함께 나온다.
  const selLv = w => w.length<=5 ? 1 : w.length<=7 ? 2 : 3;
  // 채점 후 뜻을 공개하기 위한 사전.
  // 어휘 1,421개는 words.js 에 뜻이 있고, 그 밖의 DET 전용 단어는 duolingo-extra.js 의 gloss 를 쓴다.
  const SEL_GLOSS = (function(){
    const m={};
    Object.keys(((DETX.readSelectExtra||{}).gloss)||{}).forEach(k=>{ m[k.toLowerCase()]=DETX.readSelectExtra.gloss[k]; });
    WORDS.forEach(function(w){ m[String(w.word).toLowerCase()]=(w.pos?w.pos+" ":"")+w.ko; });
    return m;
  })();
  const SEL_REAL = (function(){
    const seen={}, out=[];
    (((DET.readSelect||{}).real)||[]).concat(WORDS.map(w=>w.word)).forEach(function(w){
      const k=String(w).toLowerCase();
      if(!/^[a-z]+$/.test(k)||seen[k])return;
      seen[k]=1; out.push({w:w,real:true,level:selLv(k),gloss:SEL_GLOSS[k]||""});
    });
    return out;
  })();
  const SEL_FAKE = ((((DET.readSelect||{}).fake)||[]).concat(((DETX.readSelectExtra||{}).fake)||[]))
    .map(w=>({w:w,real:false,level:selLv(w)}));

  const DET_DESC = {
    select:"화면의 단어 중 <b>실제 존재하는 영단어</b>만 고릅니다. 실제 시험에서는 정답 개수가 공개되지 않고 단어당 5초가 주어집니다.",
    blanks:"한 문장 안에서 <b>글자가 지워진 단어</b>를 채웁니다. 실제 시험은 <b>문장당 20초</b>로, 지문형인 Read and Complete보다 훨씬 촉박합니다.",
    complete:"지문에서 <b>글자가 지워진 단어</b>를 채웁니다. 앞 글자와 문맥으로 나머지를 추론하는 c-test 형식입니다. (지문당 3분)",
    listen:"문장을 듣고 <b>그대로 받아쓰기</b>합니다. 실제 시험처럼 재생 횟수가 3회로 제한됩니다.",
    iread:"한 지문에 하위유형 <b>5종(Complete the Sentence · Complete the Passage · Highlight the Answer · Identify the Idea · Title the Passage)</b>이 6문항으로 이어지는 실제 세트 구성입니다. (세트당 7~8분)",
    passage:"지문의 빈칸에 알맞은 표현을 고릅니다. Interactive Reading의 <b>Complete the Passage</b>만 따로 반복 연습합니다.",
    ilisten:"듣고 빈칸 채우기 → 대화 응답 고르기 → <b>대화 요약</b>까지 3단계로 이어지는 실제 세트 구성입니다. (세트당 약 8분)",
    ws:"사진 묘사·읽고 쓰기·대화 요약·<b>Interactive Speaking</b>·Writing/Speaking Sample 등 <b>주관식 유형의 모범답변</b>을 유형별로 정리했습니다."
  };
  // 유형별 문제 풀 — 난이도 칩과 문항 수 배지가 모두 여기서 나온다
  const DET_POOL = {
    select:   ()=>SEL_REAL.concat(SEL_FAKE),
    blanks:   ()=>DET.fillBlanks||[],
    complete: ()=>DET.readComplete||[],
    listen:   ()=>DET.listenType||[],
    iread:    ()=>DET.interactiveReading||[],
    passage:  ()=>DET.passageComplete||[],
    ilisten:  ()=>DET.interactiveListening||[],
    ws:       ()=>DET_WS
  };
  const IR_LABEL = {sentence:"Complete the Sentence",passage:"Complete the Passage",highlight:"Highlight the Answer",idea:"Identify the Idea",title:"Title the Passage"};

  let detMode="select", detLv=0, det=null, detTimer=null;

  function clearDetTimer(){ if(detTimer){ clearInterval(detTimer); detTimer=null; } }
  function detPool(arr){ return arr.filter(x=>detLv===0||x.level===detLv); }

  // 유형 칩에 그 유형의 총 문항 수를 붙여 준다
  (function detCounts(){
    $("det-mode").querySelectorAll("[data-dm]").forEach(function(b){
      const n=(DET_POOL[b.dataset.dm]||(()=>[]))().length;
      if(n) b.innerHTML += ' <span class="tp-n">'+n+'</span>';
    });
  })();

  function buildDetLv(){
    const box=$("det-lv");
    const src=(DET_POOL[detMode]||(()=>[]))();
    box.style.display="flex";
    box.innerHTML=[[0,"전체","--accent"],[1,"기초","--lv1"],[2,"중급","--lv2"],[3,"고급","--lv3"]].map(function(d){
      const n=d[0]===0?src.length:src.filter(x=>x.level===d[0]).length;
      const dot=d[0]===0?"":'<span class="dot" style="background:var('+d[2]+')"></span>';
      return '<button class="lv-chip" data-lv="'+d[0]+'" aria-pressed="'+(detLv===d[0])+'"'+(n?'':' disabled style="opacity:.35"')+'>'+dot+d[1]+' <span style="opacity:.7">'+n+'</span></button>';
    }).join("");
    box.querySelectorAll(".lv-chip").forEach(b=>b.addEventListener("click",()=>{ detLv=parseInt(b.dataset.lv,10); buildDetLv(); startDet(); }));
  }
  $("det-mode").querySelectorAll("[data-dm]").forEach(b=>b.addEventListener("click",()=>{
    $("det-mode").querySelectorAll("[data-dm]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    detMode=b.dataset.dm; detLv=0; det=null; stopSpeak(); clearDetTimer(); buildDetLv(); startDet();
  }));

  function startDet(){
    clearDetTimer();
    $("det-desc").innerHTML=DET_DESC[detMode]||"";
    if(detMode==="select")   return renderSelect();
    if(detMode==="blanks")   return renderBlanks();
    if(detMode==="complete") return renderComplete();
    if(detMode==="listen")   return renderListen();
    if(detMode==="iread")    return renderIRead();
    if(detMode==="passage")  return renderDetPassage();
    if(detMode==="ilisten")  return renderIListen();
    if(detMode==="ws")       return renderDetWS();
  }

  // ── Read and Select ── 실제 단어만 고르기
  function renderSelect(){
    // 난이도 칩이 걸려 있으면 그 글자 수 구간에서만 뽑는다
    let reals=detPool(SEL_REAL), fakes=detPool(SEL_FAKE);
    if(fakes.length<4) fakes=SEL_FAKE;            // 안전장치 — 구간이 비면 전체에서
    if(reals.length<5) reals=SEL_REAL;
    const nReal = 4+Math.floor(Math.random()*2);              // 실제 단어 4~5개
    const items = shuffled(reals).slice(0,nReal)
      .concat(shuffled(fakes).slice(0,9-nReal));
    det={items:shuffled(items),picked:{},done:false};
    drawSelect();
  }
  function drawSelect(){
    $("det-body").innerHTML='<div class="det-card">'+
      '<div class="det-head">이 중 <b>실제로 존재하는 영어 단어</b>를 모두 고르세요. (9개 중 일부)</div>'+
      '<div class="ws-grid">'+det.items.map((it,i)=>
        '<button data-i="'+i+'" aria-pressed="'+(det.picked[i]?"true":"false")+'">'+esc(it.w)+'</button>').join('')+'</div>'+
      '<div id="det-sel-result"></div>'+
      '<div class="det-actions">'+
        '<button class="det-btn" id="det-check">채점하기</button>'+
        '<button class="det-btn sub" id="det-next">새 문제 →</button>'+
      '</div></div>';
    $("det-body").querySelectorAll(".ws-grid button").forEach(b=>b.addEventListener("click",()=>{
      if(det.done)return;
      const i=b.dataset.i; det.picked[i]=!det.picked[i];
      b.setAttribute("aria-pressed",det.picked[i]?"true":"false");
    }));
    $("det-check").addEventListener("click",gradeSelect);
    $("det-next").addEventListener("click",renderSelect);
  }
  function gradeSelect(){
    if(det.done)return; det.done=true;
    let hit=0,miss=0,missed=0;
    $("det-body").querySelectorAll(".ws-grid button").forEach((b,i)=>{
      const it=det.items[i], picked=!!det.picked[i];
      b.disabled=true; b.removeAttribute("aria-pressed");
      if(picked&&it.real){ b.classList.add("hit"); hit++; }
      else if(picked&&!it.real){ b.classList.add("miss"); miss++; }
      else if(!picked&&it.real){ b.classList.add("missed"); missed++; }
      // 채점과 함께 뜻을 공개한다 — 맞혔든 틀렸든 9개 전부 보여야 복습이 된다
      b.classList.add("graded");
      b.innerHTML='<span class="sw">'+esc(it.w)+'</span>'+
        '<span class="sg">'+(it.real ? esc(it.gloss||"실제로 쓰이는 단어") : "✕ 존재하지 않는 단어")+'</span>';
    });
    const totalReal=det.items.filter(x=>x.real).length;
    const perfect = hit===totalReal && miss===0;
    if(perfect){ beep("ok",2); confetti(40); } else beep("no");
    $("det-sel-result").innerHTML='<div class="reveal '+(perfect?"ok":"no")+'" style="margin-top:16px">'+
      '<div class="verdict">'+(perfect?'🎉 완벽합니다!':'💡 실제 단어 '+totalReal+'개 중 '+hit+'개 정답')+'</div>'+
      '<div class="rv-sub">맞게 고른 단어 '+hit+'개 · 잘못 고른 가짜 단어 '+miss+'개 · 놓친 실제 단어 '+missed+'개</div>'+
      '<div class="rv-ex" style="margin-top:8px">🟢 초록 = 정답 · 🔴 빨강(취소선) = 존재하지 않는 단어 · 🟠 주황 = 놓친 실제 단어</div>'+
    '</div>';
  }

  // ── 빈칸 입력 공통 ── {} 안 글자를 input 으로 바꾼다 (c-test / Fill in the Blanks 공용)
  function blankHTML(text,answers){
    let i=0;
    return esc(text).replace(/\{([a-zA-Z]+)\}/g,function(m,ans){
      answers.push(ans);
      const w=Math.max(34,ans.length*13);
      return '<input data-b="'+(i++)+'" maxlength="'+ans.length+'" size="'+ans.length+'" style="width:'+w+'px" autocomplete="off" spellcheck="false" />';
    });
  }
  // 빈칸 채점 — 맞으면 초록, 틀리면 정답을 옆에 붙인다
  function gradeBlankInputs(sel,answers){
    let ok=0;
    $("det-body").querySelectorAll(sel).forEach((el,k)=>{
      const ans=answers[k], val=(el.value||"").trim().toLowerCase();
      el.disabled=true;
      if(val===ans.toLowerCase()){ el.classList.add("ok"); ok++; }
      else{
        el.classList.add("no");
        const fix=document.createElement("span"); fix.className="fix"; fix.textContent=ans;
        el.parentNode.insertBefore(fix,el.nextSibling);
      }
    });
    return ok;
  }

  // ── Fill in the Blanks ── 한 문장 · 20초 제한
  function renderBlanks(){
    const pool=detPool(DET.fillBlanks||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 문장이 없습니다.</div>'; return; }
    const p=pool[Math.floor(Math.random()*pool.length)];
    const answers=[];
    const html=blankHTML(p.s,answers);
    const timed = det ? det.timed!==false : true;      // 시간제한 설정은 다음 문제로 이어진다
    det={p:p,answers:answers,done:false,timed:timed,left:20};
    $("det-body").innerHTML='<div class="det-card">'+
      '<div class="det-head">문장의 <b>빈칸 글자</b>를 채우세요 · 빈칸 '+answers.length+'개 <span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span></div>'+
      '<div class="det-timerbar"><span class="det-timer" id="fb-timer">'+(timed?'⏱ 20초':'⏱ 시간제한 꺼짐')+'</span>'+
        '<button class="det-btn sub" id="fb-toggle">'+(timed?'시간제한 끄기':'시간제한 켜기')+'</button></div>'+
      '<div class="ct-text fb-text">'+html+'</div>'+
      '<div id="det-fb-result"></div>'+
      '<div class="det-actions">'+
        '<button class="det-btn" id="det-check">채점하기</button>'+
        '<button class="det-btn sub" id="det-next">새 문장 →</button>'+
      '</div></div>';
    const ins=$("det-body").querySelectorAll(".fb-text input");
    ins.forEach((el,k)=>el.addEventListener("keydown",e=>{
      if(e.key==="Enter"){ e.preventDefault(); if(k<ins.length-1)ins[k+1].focus(); else gradeBlanks(false); }
    }));
    if(ins[0])ins[0].focus();
    $("det-check").addEventListener("click",()=>gradeBlanks(false));
    $("det-next").addEventListener("click",renderBlanks);
    $("fb-toggle").addEventListener("click",()=>{ det.timed=!det.timed; renderBlanks(); });
    // 20초 카운트다운 — sess 로 붙잡아 모드를 바꾼 뒤 남은 타이머가 오작동하지 않게 한다
    clearDetTimer();
    if(!timed)return;
    const sess=det;
    detTimer=setInterval(function(){
      if(sess!==det||sess.done){ clearDetTimer(); return; }
      sess.left--;
      const t=$("fb-timer");
      if(!t){ clearDetTimer(); return; }
      t.textContent="⏱ "+sess.left+"초";
      t.classList.toggle("hot",sess.left<=5);
      if(sess.left<=0){ clearDetTimer(); gradeBlanks(true); }
    },1000);
  }
  function gradeBlanks(timeout){
    if(!det||det.done)return; det.done=true; clearDetTimer();
    const t=$("fb-timer"); if(t){ t.textContent=timeout?"⏱ 시간 종료":"⏱ 채점 완료"; t.classList.remove("hot"); }
    const ok=gradeBlankInputs(".fb-text input",det.answers);
    const total=det.answers.length, pct=Math.round(ok/total*100);
    if(pct===100&&!timeout){ beep("ok",3); confetti(50); } else if(pct>=70) beep("ok",1); else beep("no");
    $("det-fb-result").innerHTML='<div class="reveal '+(pct>=70?"ok":"no")+'" style="margin-top:16px">'+
      '<div class="verdict">'+(timeout?'⏱ 시간 초과 — ':'')+(pct===100?'🎉 전부 정답!':ok+' / '+total+' 정답 ('+pct+'%)')+'</div>'+
      '<div class="ct-ko">💬 '+esc(det.p.ko)+'</div></div>';
  }

  // ── Read and Complete (c-test) ──
  function renderComplete(){
    const pool=detPool(DET.readComplete||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 지문이 없습니다.</div>'; return; }
    const p=pool[Math.floor(Math.random()*pool.length)];
    const answers=[];
    const html=blankHTML(p.text,answers);
    det={p:p,answers:answers,done:false};
    $("det-body").innerHTML='<div class="det-card">'+
      '<div class="det-head">빈칸에 들어갈 <b>나머지 글자</b>를 채우세요 · 빈칸 '+answers.length+'개 <span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span></div>'+
      '<div class="ct-text">'+html+'</div>'+
      '<div id="det-ct-result"></div>'+
      '<div class="det-actions">'+
        '<button class="det-btn" id="det-check">채점하기</button>'+
        '<button class="det-btn sub" id="det-next">새 지문 →</button>'+
      '</div></div>';
    const ins=$("det-body").querySelectorAll(".ct-text input");
    ins.forEach((el,k)=>el.addEventListener("keydown",e=>{
      if(e.key==="Enter"){ e.preventDefault(); if(k<ins.length-1)ins[k+1].focus(); else gradeComplete(); }
    }));
    if(ins[0])ins[0].focus();
    $("det-check").addEventListener("click",gradeComplete);
    $("det-next").addEventListener("click",renderComplete);
  }
  function gradeComplete(){
    if(det.done)return; det.done=true;
    const ok=gradeBlankInputs(".ct-text input",det.answers);
    const total=det.answers.length, pct=Math.round(ok/total*100);
    if(pct===100){ beep("ok",3); confetti(60); } else if(pct>=70) beep("ok",1); else beep("no");
    $("det-ct-result").innerHTML='<div class="reveal '+(pct>=70?"ok":"no")+'" style="margin-top:16px">'+
      '<div class="verdict">'+(pct===100?'🎉 전부 정답!':ok+' / '+total+' 정답 ('+pct+'%)')+'</div>'+
      '<div class="ct-ko">💬 '+esc(det.p.ko)+'</div></div>';
  }

  // ── Listen and Type ──
  function renderListen(){
    const pool=detPool(DET.listenType||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 문장이 없습니다.</div>'; return; }
    const s=pool[Math.floor(Math.random()*pool.length)];
    det={s:s,plays:0,done:false};
    $("det-body").innerHTML='<div class="det-card">'+
      '<div class="det-head">문장을 듣고 <b>들리는 그대로</b> 입력하세요 <span class="lv-badge '+LV[s.level].c+'">'+LV[s.level].n+'</span></div>'+
      '<div class="lt-play"><button id="lt-play">🔊 문장 듣기</button>'+
        '<button id="lt-slow" class="sub">🐢 느리게</button>'+
        '<span class="lt-left" id="lt-left">남은 재생 3회</span></div>'+
      '<textarea class="lt-input" id="lt-input" placeholder="여기에 들은 문장을 입력하세요…" spellcheck="false"></textarea>'+
      '<div id="det-lt-result"></div>'+
      '<div class="det-actions">'+
        '<button class="det-btn" id="det-check">채점하기</button>'+
        '<button class="det-btn sub" id="det-next">새 문장 →</button>'+
      '</div></div>';
    // sess 를 붙잡아 두어, 모드를 바꾼 뒤 예약 재생이 뒤늦게 실행돼도 안전하게 무시된다
    const sess=det;
    const play=rate=>{
      if(sess!==det||sess.done||sess.plays>=3)return;
      const left=$("lt-left"), pb=$("lt-play"), sb=$("lt-slow");
      if(!left||!pb)return;
      sess.plays++; speak(sess.s.s,{rate:rate});
      left.textContent="남은 재생 "+(3-sess.plays)+"회";
      if(sess.plays>=3){ pb.disabled=true; if(sb)sb.disabled=true; }
    };
    $("lt-play").addEventListener("click",()=>play(.95));
    $("lt-slow").addEventListener("click",()=>play(.62));
    $("lt-input").addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.ctrlKey)gradeListen(); });
    $("det-check").addEventListener("click",gradeListen);
    $("det-next").addEventListener("click",()=>{ stopSpeak(); renderListen(); });
    setTimeout(()=>play(.95),250);
  }
  function gradeListen(){
    if(!det||!det.s||det.done)return; det.done=true;
    stopSpeak();
    const clean = t => t.toLowerCase().replace(/[.,!?;:"']/g,"").replace(/\s+/g," ").trim();
    const gold=clean(det.s.s).split(" "), mine=clean($("lt-input").value||"").split(" ").filter(Boolean);
    // 단어 단위 비교 (순서대로 맞춘 개수)
    let gi=0, ok=0, html="";
    gold.forEach(g=>{
      if(gi<mine.length && mine[gi]===g){ ok++; html+='<span class="w-ok">'+esc(g)+'</span> '; gi++; }
      else{ html+='<span class="w-no">'+esc(g)+'</span> '; if(gi<mine.length)gi++; }
    });
    const pct=Math.round(ok/gold.length*100);
    if(pct===100){ beep("ok",3); confetti(60); } else if(pct>=70) beep("ok",1); else beep("no");
    $("det-lt-result").innerHTML='<div class="reveal '+(pct>=70?"ok":"no")+'" style="margin-top:16px">'+
      '<div class="lt-score">'+(pct===100?'🎉 완벽하게 받아썼습니다!':ok+' / '+gold.length+' 단어 일치 ('+pct+'%)')+'</div>'+
      '<div class="rv-sub">정답 문장</div>'+
      '<div class="lt-diff">'+html+'</div>'+
      '<div class="det-actions" style="margin-top:12px"><button class="det-btn sub" id="lt-replay">🔊 정답 문장 다시 듣기</button></div>'+
    '</div>';
    $("lt-replay").addEventListener("click",()=>speak(det.s.s,{rate:.9}));
  }

  // ── Interactive Reading ── 지문 1개 + 하위유형 5종이 6문항으로 이어지는 세트
  function renderIRead(){
    const pool=detPool(DET.interactiveReading||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 세트가 없습니다.</div>'; return; }
    const s=irShuffle(pool[Math.floor(Math.random()*pool.length)]);
    det={mode:"iread",set:s,qi:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.iread||0};
    drawIRead();
  }
  // 보기 순서를 매번 섞고 정답 번호를 다시 매긴다.
  // 원본 데이터가 정답 위치에 치우쳐 있어도 위치로 찍는 일이 생기지 않고, 같은 세트를 다시 풀 때도 새롭다.
  function irShuffle(set){
    return Object.assign({},set,{qs:set.qs.map(function(q){
      if(!q.opts)return q;                                  // highlight 는 보기가 없다
      const order=shuffled(q.opts.map((o,i)=>i));
      const at=i=>order.indexOf(i);
      return Object.assign({},q,{
        opts:order.map(i=>q.opts[i]),
        ans: Array.isArray(q.ans) ? q.ans.map(at).sort((a,b)=>a-b) : at(q.ans)
      });
    })});
  }
  // 지문 렌더 — 하위유형에 따라 문장을 클릭 가능하게 하거나 한 문장을 빈자리로 비운다
  function irPassage(opt){
    const s=det.set, gap=opt&&opt.gap, click=opt&&opt.click, mark=opt&&opt.mark;
    return '<div class="passage ir-passage">'+s.sents.map(function(t,i){
      if(gap===i) return '<span class="ir-gap" id="ir-gap">＿＿＿ 이 자리에 들어갈 문장을 고르세요 ＿＿＿</span> ';
      if(click)   return '<span class="ir-sent" data-s="'+i+'" role="button" tabindex="0">'+esc(t)+'</span> ';
      if(mark&&mark.indexOf(i)>=0) return '<span class="ir-sent hit">'+esc(t)+'</span> ';
      return esc(t)+' ';
    }).join('')+'</div>';
  }
  function irHead(q){
    const s=det.set;
    return '<div class="quiz-progress"><i style="width:'+Math.round(det.qi/s.qs.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">'+esc(IR_LABEL[q.t]||"")+' · '+(det.qi+1)+' / '+s.qs.length+'</span><span id="det-streak">'+comboBadge(det.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(s.topic)+'</span><span class="lv-badge '+LV[s.level].c+'">'+LV[s.level].n+'</span></div>';
  }
  function irFoot(){
    const s=det.set;
    return '<div class="quiz-foot"><span class="quiz-score">점수 <b id="det-score-n">'+det.score+'</b> / '+s.qs.length+bestLabel("iread")+'</span>'+
      '<button class="quiz-next" id="det-next-q">다음 →</button></div><div id="det-reveal"></div>';
  }
  function drawIRead(){
    const s=det.set;
    if(det.qi>=s.qs.length) return irResult();
    const q=s.qs[det.qi]; det.answered=false;
    let body="";
    if(q.t==="sentence"){
      const parts=esc(q.stem).split("----");
      body='<div class="ir-stem">'+parts[0]+'<span class="blank"></span>'+(parts[1]||"")+'</div>'+
        q.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('');
    }else if(q.t==="passage"){
      body=irPassage({gap:q.at})+
        q.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('');
    }else if(q.t==="highlight"){
      body='<div class="ir-q">'+esc(q.q)+'</div>'+irPassage({click:true});
    }else if(q.t==="idea"){
      body='<div class="ir-q">'+esc(q.q)+'</div>'+irPassage()+
        '<div class="ir-checks">'+q.opts.map((o,i)=>
          '<button class="ir-check" data-i="'+i+'" aria-pressed="false"><span class="box"></span>'+esc(o)+'</button>').join('')+'</div>'+
        '<div class="det-actions"><button class="det-btn" id="ir-submit">선택 완료</button></div>';
    }else{ // title
      body='<div class="ir-q">이 지문에 가장 알맞은 제목을 고르세요.</div>'+irPassage()+
        q.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('');
    }
    // 하위유형마다 조작 방법이 달라 안내 문구도 바꿔 준다
    const hint = q.t==="highlight" ? '답이 되는 <b>문장을 클릭</b> · <b>Enter</b> 다음'
               : q.t==="idea"      ? '해당하는 것을 <b>여러 개</b> 고른 뒤 선택 완료 · <b>Enter</b> 다음'
               : '키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음';
    $("det-body").innerHTML='<div class="quiz-card">'+irHead(q)+body+irFoot()+
      '<div class="quiz-hint">'+hint+'</div></div>';

    if(q.t==="highlight"){
      $("det-body").querySelectorAll(".ir-sent").forEach(el=>{
        const go=()=>answerIR(parseInt(el.dataset.s,10),q);
        el.addEventListener("click",go);
        el.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); go(); } });
      });
    }else if(q.t==="idea"){
      const picks={};
      $("det-body").querySelectorAll(".ir-check").forEach(b=>b.addEventListener("click",()=>{
        if(det.answered)return;
        const i=b.dataset.i; picks[i]=!picks[i];
        b.setAttribute("aria-pressed",picks[i]?"true":"false");
      }));
      $("ir-submit").addEventListener("click",()=>answerIR(Object.keys(picks).filter(k=>picks[k]).map(Number).sort(),q));
    }else{
      $("det-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerIR(parseInt(b.dataset.i,10),q)));
    }
    $("det-next-q").addEventListener("click",()=>{ det.qi++; drawIRead(); });
  }
  function answerIR(pick,q){
    if(det.answered)return; det.answered=true;
    const s=det.set;
    let correct=false, shown="";
    if(q.t==="idea"){
      const want=q.ans.slice().sort();
      correct = pick.length===want.length && pick.every((v,i)=>v===want[i]);
      $("det-body").querySelectorAll(".ir-check").forEach((b,i)=>{
        b.disabled=true; b.removeAttribute("aria-pressed");
        if(q.ans.indexOf(i)>=0) b.classList.add("hit");
        else if(pick.indexOf(i)>=0) b.classList.add("miss");
      });
      const sb=$("ir-submit"); if(sb)sb.disabled=true;
      shown='정답은 '+q.ans.map(i=>AB[i]).join(' · ')+' — 초록이 지문에 나온 내용입니다.';
    }else if(q.t==="highlight"){
      correct = pick===q.ans;
      $("det-body").querySelectorAll(".ir-sent").forEach((el,i)=>{
        el.classList.add("done");
        if(i===q.ans) el.classList.add("hit");
        else if(i===pick) el.classList.add("miss");
      });
      shown='정답 문장: “'+esc(s.sents[q.ans])+'”';
    }else{
      correct = pick===q.ans;
      const btns=$("det-body").querySelectorAll(".opt");
      btns.forEach((b,i)=>{ b.disabled=true; if(i===q.ans)b.classList.add("correct"); });
      if(!correct&&btns[pick])btns[pick].classList.add("wrong");
      if(q.t==="passage"){ const g=$("ir-gap"); if(g){ g.className="ir-sent hit"; g.textContent=q.opts[q.ans]; } }
      shown='정답은 ('+AB[q.ans]+') '+esc(q.opts[q.ans]);
    }
    let record=false;
    if(correct){
      det.score++; det.streak++; det.best=Math.max(det.best,det.streak);
      record=registerCombo(det,"iread");
      beep("ok",det.streak);
      confetti(record?110:det.streak>=5?70:det.streak>=3?45:26);
      comboPopup(det.streak,record);
      const sn=$("det-score-n"); if(sn){ sn.textContent=det.score; sn.classList.add("bump"); }
      const bi=document.querySelector("#det-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((det.qi+1)/s.qs.length*100)+"%";
    }else{ det.streak=0; det.recordShown=false; beep("no"); }
    const sbg=$("det-streak"); if(sbg)sbg.innerHTML=comboBadge(det.streak);
    $("det-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — '+shown)+
        (correct?' '+comboBadge(det.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp">'+esc(q.exp)+'</div></div>';
    const nb=$("det-next-q"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=det.qi===s.qs.length-1?"결과 보기 →":"다음 →";
  }
  function irResult(){
    const s=det.set, pct=Math.round(det.score/s.qs.length*100);
    $("det-body").innerHTML='<div class="result"><div class="big">'+det.score+' / '+s.qs.length+'</div>'+
      '<p>'+(pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"지문을 다시 읽어 봐요 📖")+' ('+pct+'%)</p>'+
      comboSummary(det,"iread")+
      '<div class="det-card" style="text-align:left;margin-top:16px">'+
        '<div class="det-head">📄 전체 지문 · '+esc(s.topic)+'</div>'+
        '<div class="passage">'+esc(s.sents.join(" "))+'</div>'+
        '<div class="ct-ko" style="margin-top:12px">💬 '+esc(s.ko)+'</div>'+
        '<div class="det-actions"><button class="det-btn sub" id="ir-listen">🔊 지문 듣기</button>'+
          '<button class="det-btn sub" id="ir-script">📄 대본 저장</button></div>'+
      '</div>'+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="det-restart">새 세트 풀기</button></div>';
    det.finished=true;
    $("ir-listen").addEventListener("click",()=>speakBest(s.sents.join(" "),{rate:.95}));
    $("ir-script").addEventListener("click",()=>scriptDownload([s.topic,"",s.sents.join(" "),"","--- 한글 ---","",s.ko].join("\n"),s.topic));
    $("det-restart").addEventListener("click",()=>{ det=null; renderIRead(); });
    if(pct>=80){ confetti(80); beep("ok",det.best); }
  }

  // ── Complete the Passage ── (Interactive Reading 하위유형 단독 반복 연습)
  function renderDetPassage(){
    const pool=detPool(DET.passageComplete||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 문항이 없습니다.</div>'; return; }
    if(!det||det.mode!=="passage"||det.finished){
      // 보기 순서도 매번 섞는다 — 위치로 찍히지 않고 같은 문항을 다시 만나도 새롭다
      const list=shuffled(pool).slice(0,Math.min(8,pool.length)).map(function(p){
        const order=shuffled(p.opts.map((o,i)=>i));
        return Object.assign({},p,{opts:order.map(i=>p.opts[i]),ans:order.indexOf(p.ans)});
      });
      det={mode:"passage",list:list,i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.det||0};
    }
    drawDetPassage();
  }
  function drawDetPassage(){
    if(det.i>=det.list.length){
      const pct=Math.round(det.score/det.list.length*100);
      $("det-body").innerHTML='<div class="result"><div class="big">'+det.score+' / '+det.list.length+'</div>'+
        '<p>'+(pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"해설을 보며 복습해요 📖")+' ('+pct+'%)</p>'+
        comboSummary(det,"det")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="det-restart">새 문제 풀기</button></div>';
      det.finished=true;
      $("det-restart").addEventListener("click",()=>{ det=null; renderDetPassage(); });
      if(pct>=80){ confetti(80); beep("ok",det.best); }
      return;
    }
    const p=det.list[det.i]; det.answered=false;
    const parts=esc(p.passage).split("----");
    $("det-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(det.i/det.list.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 것을 고르세요 · '+(det.i+1)+' / '+det.list.length+'</span><span id="det-streak">'+comboBadge(det.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(p.cat)+'</span><span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span></div>'+
      '<div class="passage" style="margin-bottom:18px">'+parts[0]+'<span class="blank" style="display:inline-block;min-width:90px;border-bottom:2.5px solid var(--accent);margin:0 4px;vertical-align:-3px"></span>'+(parts[1]||"")+'</div>'+
      p.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="det-score-n">'+det.score+'</b> / '+det.list.length+bestLabel("det")+'</span>'+
      '<button class="quiz-next" id="det-next-q">다음 →</button></div>'+
      '<div id="det-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    $("det-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerDetPassage(parseInt(b.dataset.i,10),p)));
    $("det-next-q").addEventListener("click",()=>{ det.i++; drawDetPassage(); });
  }
  function answerDetPassage(pick,p){
    if(det.answered)return; det.answered=true;
    const correct=pick===p.ans, btns=$("det-body").querySelectorAll(".opt");
    let record=false;
    if(correct){
      det.score++; det.streak++; det.best=Math.max(det.best,det.streak);
      if(bestCombo.det===undefined)bestCombo.det=0;
      record=registerCombo(det,"det");
      beep("ok",det.streak);
      confetti(record?110:det.streak>=5?70:det.streak>=3?45:26);
      comboPopup(det.streak,record);
      const sn=$("det-score-n"); sn.textContent=det.score; sn.classList.add("bump");
      const bi=document.querySelector("#det-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((det.i+1)/det.list.length*100)+"%";
    }else{ det.streak=0; det.recordShown=false; beep("no"); btns[pick].classList.add("wrong"); }
    btns.forEach((b,i)=>{ b.disabled=true; if(i===p.ans)b.classList.add("correct"); });
    const sb=$("det-streak"); if(sb)sb.innerHTML=comboBadge(det.streak);
    $("det-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[p.ans]+') '+esc(p.opts[p.ans]))+
        (correct?' '+comboBadge(det.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp">'+esc(p.exp)+'</div></div>';
    const nb=$("det-next-q"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=det.i===det.list.length-1?"결과 보기 →":"다음 →";
  }

  // ── Interactive Listening ── 듣고 채우기(2) → 응답 고르기(5) → 대화 요약(1)
  function renderIListen(){
    const pool=detPool(DET.interactiveListening||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 세트가 없습니다.</div>'; return; }
    const s=pool[Math.floor(Math.random()*pool.length)];
    // 단계 목록을 미리 펼쳐 두면 진행률과 이동 처리가 단순해진다
    const steps=s.p1.map(x=>({k:"p1",d:x})).concat(s.p2.map(x=>({k:"p2",d:x}))).concat([{k:"p3",d:s.p3}]);
    det={mode:"ilisten",set:s,steps:steps,si:0,score:0,total:s.p2.length,answered:false,streak:0,best:0,prevBest:bestCombo.ilisten||0};
    drawIL();
  }
  function ilHead(label){
    const s=det.set, n=det.steps.length;
    return '<div class="quiz-progress"><i style="width:'+Math.round(det.si/n*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">'+esc(label)+' · '+(det.si+1)+' / '+n+'</span><span id="det-streak">'+comboBadge(det.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(s.topic)+'</span><span class="lv-badge '+LV[s.level].c+'">'+LV[s.level].n+'</span></div>'+
      '<div class="il-scene">🎬 '+esc(s.scene)+'</div>';
  }
  function drawIL(){
    stopSpeak();
    const s=det.set;
    if(det.si>=det.steps.length) return;      // p3 가 마지막이라 여기까지 오지 않는다
    const st=det.steps[det.si]; det.answered=false;
    if(st.k==="p1")      return drawILComplete(st.d);
    if(st.k==="p2")      return drawILRespond(st.d);
    return drawILSummary(s.p3);
  }
  // Part 1 — Listen and Complete
  function drawILComplete(d){
    const answers=[];
    const html=blankHTML(d.text,answers);
    det.answers=answers; det.plays=0;
    $("det-body").innerHTML='<div class="quiz-card">'+ilHead("Part 1 · Listen and Complete")+
      '<div class="det-head" style="margin-top:12px">문장을 듣고 <b>빈칸의 단어</b>를 채우세요 · 빈칸 '+answers.length+'개</div>'+
      '<div class="lt-play"><button id="il-play">🔊 듣기</button><button id="il-slow" class="sub">🐢 느리게</button>'+
        '<span class="lt-left" id="il-left">남은 재생 3회</span></div>'+
      '<div class="ct-text il-text">'+html+'</div>'+
      '<div id="il-result"></div>'+
      '<div class="det-actions"><button class="det-btn" id="il-check">채점하기</button>'+
        '<button class="det-btn sub" id="il-next" style="display:none">다음 →</button></div></div>';
    const sess=det;
    const play=rate=>{
      if(sess!==det||sess.plays>=3)return;
      const left=$("il-left"), pb=$("il-play"), sb=$("il-slow");
      if(!left||!pb)return;
      sess.plays++; speak(d.say,{rate:rate});
      left.textContent="남은 재생 "+(3-sess.plays)+"회";
      if(sess.plays>=3){ pb.disabled=true; if(sb)sb.disabled=true; }
    };
    $("il-play").addEventListener("click",()=>play(.95));
    $("il-slow").addEventListener("click",()=>play(.62));
    $("il-check").addEventListener("click",function(){
      if(det.answered)return; det.answered=true;
      const ok=gradeBlankInputs(".il-text input",det.answers), total=det.answers.length;
      if(ok===total){ beep("ok",2); confetti(35); } else beep("no");
      $("il-result").innerHTML='<div class="reveal '+(ok===total?"ok":"no")+'" style="margin-top:14px">'+
        '<div class="verdict">'+(ok===total?'🎉 전부 정답!':ok+' / '+total+' 정답')+'</div>'+
        '<div class="rv-sub">들린 문장</div><div class="lt-diff">'+esc(d.say)+'</div></div>';
      $("il-check").style.display="none"; $("il-next").style.display="";
    });
    $("il-next").addEventListener("click",()=>{ det.si++; drawIL(); });
    setTimeout(()=>play(.95),250);
  }
  // Part 2 — Listen and Respond
  function drawILRespond(t){
    det.plays=0;
    $("det-body").innerHTML='<div class="quiz-card">'+ilHead("Part 2 · Listen and Respond")+
      '<div class="det-head" style="margin-top:12px">상대의 말을 듣고 <b>가장 자연스러운 응답</b>을 고르세요</div>'+
      '<div class="lt-play"><button id="il-play">🔊 듣기</button><button id="il-slow" class="sub">🐢 느리게</button>'+
        '<span class="lt-left" id="il-left">남은 재생 3회</span></div>'+
      '<div class="il-say" id="il-say">🔒 먼저 들어 보세요 — 채점 후 대사가 공개됩니다.</div>'+
      t.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">응답 점수 <b id="det-score-n">'+det.score+'</b> / '+det.total+bestLabel("ilisten")+'</span>'+
        '<button class="quiz-next" id="il-next">다음 →</button></div><div id="il-result"></div>'+
      '<div class="quiz-hint">키보드: <b>A~C</b> 또는 <b>1~3</b> · <b>Enter</b> 다음</div></div>';
    const sess=det;
    const play=rate=>{
      if(sess!==det||sess.plays>=3)return;
      const left=$("il-left"), pb=$("il-play"), sb=$("il-slow");
      if(!left||!pb)return;
      sess.plays++; speak(t.say,{rate:rate});
      left.textContent="남은 재생 "+(3-sess.plays)+"회";
      if(sess.plays>=3){ pb.disabled=true; if(sb)sb.disabled=true; }
    };
    $("il-play").addEventListener("click",()=>play(.95));
    $("il-slow").addEventListener("click",()=>play(.62));
    $("det-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerIL(parseInt(b.dataset.i,10),t)));
    $("il-next").addEventListener("click",()=>{ det.si++; drawIL(); });
    setTimeout(()=>play(.95),250);
  }
  function answerIL(pick,t){
    if(det.answered)return; det.answered=true;
    stopSpeak();
    const correct=pick===t.ans, btns=$("det-body").querySelectorAll(".opt");
    let record=false;
    if(correct){
      det.score++; det.streak++; det.best=Math.max(det.best,det.streak);
      record=registerCombo(det,"ilisten");
      beep("ok",det.streak);
      confetti(record?110:det.streak>=3?45:26);
      comboPopup(det.streak,record);
      const sn=$("det-score-n"); if(sn){ sn.textContent=det.score; sn.classList.add("bump"); }
    }else{ det.streak=0; det.recordShown=false; beep("no"); if(btns[pick])btns[pick].classList.add("wrong"); }
    btns.forEach((b,i)=>{ b.disabled=true; if(i===t.ans)b.classList.add("correct"); });
    const say=$("il-say"); if(say)say.innerHTML='🗣 '+esc(t.say);
    const sb=$("det-streak"); if(sb)sb.innerHTML=comboBadge(det.streak);
    const bi=document.querySelector("#det-body .quiz-progress > i");
    if(bi)bi.style.width=Math.round((det.si+1)/det.steps.length*100)+"%";
    $("il-result").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[t.ans]+') '+esc(t.opts[t.ans]))+
        (correct?' '+comboBadge(det.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp">'+esc(t.exp)+'</div></div>';
    const nb=$("il-next"); nb.style.visibility="visible"; nb.classList.add("on");
  }
  // Part 3 — Summarize the Conversation
  function drawILSummary(p3){
    const s=det.set;
    const kx=(p3.kx||[]).map(k=>'<div><b>'+esc(k.en)+'</b><span>'+esc(k.ko)+'</span></div>').join('');
    const script=s.p2.map(t=>"A: "+t.say+"\nB: "+t.opts[t.ans]).join("\n\n");
    $("det-body").innerHTML='<div class="quiz-card">'+ilHead("Part 3 · Summarize the Conversation")+
      '<div class="det-head" style="margin-top:12px">🎤 대화를 <b>75초 안에 요약</b>해 말해 보세요. 먼저 직접 말한 뒤 모범답변을 열어 비교하세요.</div>'+
      '<div class="det-ws-q">'+esc(p3.q)+'</div>'+
      '<div class="det-actions"><button class="det-btn" id="il-reveal">✅ 모범답변 보기</button>'+
        '<button class="det-btn sub" id="il-script">📄 대화 대본</button></div>'+
      '<div id="il-model" style="display:none">'+
        '<div class="sp-sec-title">✅ 모범답변</div><div class="ans en-text">'+esc(p3.answerEn)+'</div>'+
        '<div class="det-actions"><button class="det-btn sub" id="il-play-ans">▶ 모범답변 듣기</button>'+
          '<button class="det-btn sub" id="il-stop">■ 정지</button>'+
          '<button class="det-btn sub" id="il-ko" aria-pressed="false">🇰🇷 한글 해석</button></div>'+
        '<div class="ans ko-text" style="display:none">'+esc(p3.answerKo)+'</div>'+
        (kx?'<div class="sp-sec-title">💡 핵심 표현</div><div class="kx">'+kx+'</div>':'')+
        '<div class="sp-sec-title">🎯 고득점 팁</div><div class="tips">'+esc(p3.tips)+'</div>'+
      '</div>'+
      '<div class="result" style="margin-top:18px"><div class="big">'+det.score+' / '+det.total+'</div>'+
        '<p>Part 2 응답 정확도</p>'+comboSummary(det,"ilisten")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="det-restart">새 세트 풀기</button></div>'+
      '</div>';
    det.finished=true;
    $("il-reveal").addEventListener("click",function(){ $("il-model").style.display="block"; this.style.display="none"; });
    $("il-script").addEventListener("click",()=>scriptDownload([s.topic,s.scene,"",script,"","--- 요약 모범답변 ---","",p3.answerEn,"","--- 한글 ---","",p3.answerKo].join("\n"),s.topic));
    $("il-play-ans").addEventListener("click",e=>{ const b=e.currentTarget; b.textContent="🔊 재생 중…"; speakBest(p3.answerEn,{rate:.92,onend:()=>b.textContent="▶ 모범답변 듣기"}); });
    $("il-stop").addEventListener("click",()=>{ stopSpeak(); $("il-play-ans").textContent="▶ 모범답변 듣기"; });
    $("il-ko").addEventListener("click",e=>{ const b=e.currentTarget, on=b.getAttribute("aria-pressed")==="true";
      b.setAttribute("aria-pressed",!on); $("det-body").querySelector(".ko-text").style.display=on?"none":"block"; });
    $("det-restart").addEventListener("click",()=>{ det=null; stopSpeak(); renderIListen(); });
    if(det.score===det.total){ confetti(80); beep("ok",det.best); }
  }

  // ── Speaking · Writing 모범답변 ──
  function renderDetWS(){
    const list=detPool(DET_WS);
    const cats=[]; list.forEach(t=>{ if(cats.indexOf(t.category)<0)cats.push(t.category); });
    $("det-body").innerHTML=
      '<div class="filter-row" id="det-ws-cat">'+
        '<button data-wc="all" aria-pressed="true">전체 '+list.length+'</button>'+
        cats.map(c=>'<button data-wc="'+esc(c)+'" aria-pressed="false">'+esc(c)+' '+list.filter(t=>t.category===c).length+'</button>').join('')+
      '</div><div id="det-ws-list"></div>';
    const draw=f=>{
      const items=list.filter(t=>f==="all"||t.category===f);
      $("det-ws-list").innerHTML=items.map((t,i)=>{
        const kx=(t.kx||[]).map(k=>'<div><b>'+esc(k.en)+'</b><span>'+esc(k.ko)+'</span></div>').join('');
        return '<div class="sp-item" data-i="'+i+'">'+
          '<div class="sp-head"><div style="flex:1;min-width:0">'+
            '<div class="sp-badges"><span class="exam-badge '+(t.exam.indexOf("Speaking")>=0?"opic":"write")+'">'+esc(t.exam)+'</span>'+
              '<span class="cat-badge">'+esc(t.category)+'</span>'+
              '<span class="lv-badge '+LV[t.level].c+'">'+LV[t.level].n+'</span>'+
              '<span class="topic-badge">'+esc(t.topic)+'</span>'+
              (t.targetLevel?'<span class="lvl-badge">'+esc(t.targetLevel)+'</span>':'')+
              (t.legacy?'<span class="legacy-badge">2026 폐지 유형</span>':'')+'</div>'+
            '<div class="sp-q">'+esc(t.topic)+'</div>'+
          '</div><div class="sp-toggle">▼</div></div>'+
          '<div class="sp-body">'+
            (t.legacy?'<div class="legacy-note">⚠️ 이 유형은 2026년 개편에서 <b>Interactive Speaking</b>으로 대체되어 실제 시험에는 더 이상 출제되지 않습니다. 말하기 연습용으로만 활용하세요.</div>':'')+
            '<div class="sp-sec-title">📄 문제</div><div class="det-ws-q">'+esc(t.q)+'</div>'+
            '<div class="sp-controls">'+
              '<button data-act="play">▶ 모범답변 듣기</button><button data-act="stop">■ 정지</button>'+
              '<button data-act="dl">⬇ 음성</button><button data-act="dltxt">📄 대본</button>'+
              '<button data-act="ko" aria-pressed="false">🇰🇷 한글 해석</button></div>'+
            '<div class="sp-sec-title">✅ 모범답변</div>'+
            '<div class="ans en-text">'+esc(t.answerEn).replace(/\n/g,"<br/>")+'</div>'+
            '<div class="ans ko-text" style="display:none;margin-top:10px">'+esc(t.answerKo).replace(/\n/g,"<br/>")+'</div>'+
            (kx?'<div class="sp-sec-title">💡 핵심 표현</div><div class="kx">'+kx+'</div>':'')+
            '<div class="sp-sec-title">🎯 고득점 팁</div><div class="tips">'+esc(t.tips)+'</div>'+
          '</div></div>';
      }).join('')||'<div class="empty">문항이 없습니다.</div>';
      $("det-ws-list").querySelectorAll(".sp-item").forEach(item=>{
        const t=items[parseInt(item.dataset.i,10)];
        item.querySelector(".sp-head").addEventListener("click",()=>{ const o=item.classList.toggle("open"); if(!o)stopSpeak(); });
        item.querySelector('[data-act="play"]').addEventListener("click",e=>{ e.stopPropagation(); const b=e.currentTarget; b.textContent="🔊 재생 중…"; speakBest(t.answerEn.replace(/\[[^\]]*\]/g,""),{rate:.92,onend:()=>b.textContent="▶ 모범답변 듣기"}); });
        item.querySelector('[data-act="stop"]').addEventListener("click",e=>{ e.stopPropagation(); stopSpeak(); item.querySelector('[data-act="play"]').textContent="▶ 모범답변 듣기"; });
        item.querySelector('[data-act="dl"]').addEventListener("click",e=>{ e.stopPropagation(); ttsDownload(t.answerEn.replace(/\[[^\]]*\]/g,""),t.topic||t.category); });
        item.querySelector('[data-act="dltxt"]').addEventListener("click",e=>{ e.stopPropagation();
          scriptDownload([t.topic||"",t.q||"","",t.answerEn,"","--- 한글 ---","",t.answerKo||""].join("\n"),t.topic||t.category); });
        const kb=item.querySelector('[data-act="ko"]');
        kb.addEventListener("click",e=>{ e.stopPropagation(); const on=kb.getAttribute("aria-pressed")==="true"; kb.setAttribute("aria-pressed",!on); item.querySelector(".ko-text").style.display=on?"none":"block"; });
      });
    };
    $("det-ws-cat").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
      $("det-ws-cat").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
      draw(b.dataset.wc);
    }));
    draw("all");
  }
  // DET 4지선다 유형 키보드 (Complete the Passage · Interactive Reading · Interactive Listening)
  document.addEventListener("keydown",e=>{
    if(!$("panel-det").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(!det||["passage","iread","ilisten"].indexOf(detMode)<0)return;
    const nextBtn = $("det-next-q") || $("il-next");
    const opts=Array.prototype.slice.call($("det-body").querySelectorAll(".opt"));
    if(!det.answered&&opts.length){
      let idx=AB.indexOf(String(e.key||"").toUpperCase());
      if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
      if(idx>=0&&idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(det.answered&&nextBtn)nextBtn.click();
    }
  });


  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"det", wide:true,
    init(){ buildDetLv(); startDet(); },
    resume(){
      if(detMode==="passage" && det && det.answered){ det.i++; drawDetPassage(); }
      else if(detMode==="iread"   && det && det.answered && !det.finished){ det.qi++; drawIRead(); }
      else if(detMode==="ilisten" && det && det.answered && !det.finished){ det.si++; drawIL(); }
    }
  });

})(window.APP);
