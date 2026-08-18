/* ============================================================
   관심주제 리딩 — 축구·영화·문학·기술 소재의 실전 지문
   ------------------------------------------------------------
   익숙한 소재로 읽되 문장 수준과 문제 유형은 실제 시험 그대로다.
   TOEIC Part 7 멀티지문 세트도 같은 풀에서 함께 다룬다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        TR = A.TR,
        esc = A.esc,
        shuffled = A.shuffled,
        LV = A.LV,
        AB = A.AB,
        toast = A.toast,
        stopSpeak = A.stopSpeak,
        speakBest = A.speakBest,
        ttsDownload = A.ttsDownload,
        beep = A.beep,
        confetti = A.confetti,
        comboBadge = A.comboBadge,
        comboPopup = A.comboPopup,
        comboSummary = A.comboSummary,
        registerCombo = A.registerCombo,
        bestCombo = A.bestCombo,
        bestLabel = A.bestLabel;

  // 지문 풀은 data.js 가 이름 규칙으로 모아 둔다 (TOPIC_READING_* + Part 7).
  const TCATS = (function(){ const s=[]; TR.forEach(p=>{ if(s.indexOf(p.series)<0)s.push(p.series); }); return s; })();

  /* 소재 그룹 — 최상위 '관심주제' 메뉴의 하위 탭이 이 단위다.
     시리즈가 11개라 탭으로 늘어놓으면 너무 길고, 그렇다고 한 화면에 다
     쏟으면 고르기 어렵다. 성격이 비슷한 것끼리 묶어 두 단계로 좁힌다.
     비즈니스 실무(Part 7 실무 지문)는 관심주제가 아니라 TOEIC 자료라
     어느 그룹에도 넣지 않는다 — TOEIC → Part 7 독해에서 보게 된다. */
  const TGROUPS = [
    {id:"sport",   icon:"⚽",  name:"스포츠",     series:["⚽ 축구"]},
    {id:"fantasy", icon:"📚",  name:"문학·판타지", series:["⚡ 해리 포터","💍 반지의 제왕"]},
    {id:"film",    icon:"🎬",  name:"영화·SF",    series:["🕶 매트릭스","🎬 영화 일반","🦖 쥬라기 공원"]},
    {id:"anime",   icon:"🍥",  name:"애니메이션",  series:["👒 원피스","🍥 나루토"]},
    {id:"tech",    icon:"💻",  name:"기술·IT",    series:["🌱 스프링·백엔드","⚙️ 소프트웨어 공학","🤖 인공지능"]}
  ];
  const tGroupOf = id => TGROUPS.filter(g=>g.id===id)[0] || null;

  let tCat="all", tExam="all", tMode="read", tSes=null;
  let tGroup=null;      // null 이면 그룹 제한 없음 (TOEIC → Part 7 경로)
  let tGroupChanged=false;

  /** 최상위 '관심주제' 메뉴가 그룹을 지정할 때 부른다 */
  function setTopicGroup(id){
    if(tGroup===id) return;
    tGroup=id; tCat="all"; tSes=null;
    const g=tGroupOf(id);
    const box=$("topic-exam");
    if(box){
      // 그룹으로 들어오면 시험 필터는 전체로 되돌린다
      box.querySelectorAll("[data-tex]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.tex==="all"));
      tExam="all";
    }
    const note=$("topic-note");
    if(note) note.textContent = g ? g.icon+" "+g.name+" — "+g.series.join(" · ") : "";
  }
  /** 그룹이 걸려 있으면 그 그룹의 시리즈만 본다 */
  function inGroup(p){
    const g=tGroupOf(tGroup);
    return !g || g.series.indexOf(p.series)>=0;
  }

  // Part 7 세트는 영어 본문만 이어 붙여 읽어 준다 (지문 라벨은 한글이라 제외)
  function tEnglish(p){ return p.docs ? p.docs.map(d=>d.en).join("\n\n") : p.passage; }
  function tWords(p){ return tEnglish(p).split(/\s+/).length; }
  function tExamBadge(p){
    const cls = p.exam==="TOEFL" ? "toefl" : "toeic";
    return '<span class="exam-badge '+cls+'">'+(p.part7?"TOEIC Part 7":p.exam)+'</span>';
  }

  function topicList(){
    const q=($("topic-search").value||"").trim().toLowerCase();
    return TR.filter(p=>{
      if(!inGroup(p))return false;
      if(tCat!=="all"&&p.series!==tCat)return false;
      if(tExam==="P7"){ if(!p.part7)return false; }
      else if(tExam!=="all"&&p.exam!==tExam)return false;
      if(q&&!((p.title+" "+p.topic+" "+p.passage+" "+p.ko+" "+p.type+" "+p.series).toLowerCase().includes(q)
             &&true))return false;
      return true;
    });
  }
  function buildTopicChips(){
    const pool=TR.filter(inGroup);
    const g=tGroupOf(tGroup);
    const cats=g ? g.series.filter(c=>pool.some(p=>p.series===c)) : TCATS;
    // 그룹 안에 시리즈가 하나뿐이면 칩 줄이 의미가 없다
    if(g && cats.length<2){ $("topic-cat").innerHTML=""; return; }
    $("topic-cat").innerHTML='<button class="tp-chip" data-tc="all" aria-pressed="'+(tCat==="all")+'">🗂 전체<span class="c">'+pool.length+'</span></button>'+
      cats.map(c=>{const n=pool.filter(p=>p.series===c).length;
        return '<button class="tp-chip" data-tc="'+esc(c)+'" aria-pressed="'+(tCat===c)+'">'+esc(c)+'<span class="c">'+n+'</span></button>';}).join("");
    $("topic-cat").querySelectorAll("[data-tc]").forEach(b=>b.addEventListener("click",()=>{tCat=b.dataset.tc;buildTopicChips();renderTopic();}));
  }
  $("topic-search").addEventListener("input",renderTopic);
  $("topic-exam").querySelectorAll("[data-tex]").forEach(b=>b.addEventListener("click",()=>{
    $("topic-exam").querySelectorAll("[data-tex]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    tExam=b.dataset.tex;renderTopic();}));
  $("topic-exam").querySelectorAll("[data-tmode]").forEach(b=>b.addEventListener("click",()=>{
    $("topic-exam").querySelectorAll("[data-tmode]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    tMode=b.dataset.tmode;tSes=null;stopSpeak();renderTopic();}));

  // 지문 본문 — Part 7 세트는 문서마다 라벨을 달아 따로 보여 준다
  function tPassageHTML(p){
    if(!p.docs) return '<div class="sp-sec-title">📄 지문</div>'+
      '<div class="tp-passage'+(p.exam==="TOEIC"?" mono":"")+'">'+esc(p.passage)+'</div>';
    return p.docs.map(d=>'<div class="sp-sec-title">📄 '+esc(d.label)+'</div>'+
      '<div class="tp-passage mono">'+esc(d.en)+'</div>').join('');
  }
  function tKoHTML(p){
    if(!p.docs) return '<div class="tp-ko">'+esc(p.ko)+'</div>';
    return p.docs.map((d,i)=>'<div class="sp-sec-title"'+(i?' style="margin-top:14px"':'')+'>'+esc(d.label)+'</div>'+
      '<div class="tp-ko">'+esc(d.ko)+'</div>').join('');
  }
  function linkTag(q){ return q.link?'<span class="link-tag">🔗 연계</span>':''; }

  function renderTopic(){
    const list=topicList();
    const nDoc=list.reduce((s,p)=>s+(p.docs?p.docs.length:1),0);
    $("topic-count").textContent=list.length+"세트 · 지문 "+nDoc+"개 · "+list.reduce((s,p)=>s+p.qs.length,0)+"문항";
    if(!list.length){ $("topic-body").innerHTML='<div class="empty">해당하는 지문이 없습니다.</div>'; return; }
    if(tMode==="solve") return renderTopicSolve(list);
    // 읽기 모드: 제목만 보이고 펼치면 지문 → 해석 → 어휘 → 문제·해설
    $("topic-body").innerHTML=list.map((p,i)=>{
      return '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges">'+tExamBadge(p)+
            '<span class="cat-badge">'+esc(p.type)+'</span>'+
            '<span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span>'+
            '<span class="topic-tag">'+p.qs.length+'문항</span></div>'+
          '<div class="tp-title">'+esc(p.title)+'</div>'+
          '<div class="tp-sub">'+esc(p.topic)+' · '+(p.docs?'지문 '+p.docs.length+'개 · ':'')+tWords(p)+' words</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="sp-controls">'+
            '<button data-act="play">▶ 지문 듣기</button><button data-act="stop">■ 정지</button>'+
            '<button data-act="ko" aria-pressed="false">🇰🇷 한글 해석</button>'+
            '<button data-act="dlaudio">⬇ 음성 파일</button><button data-act="dl">📄 대본</button></div>'+
          tPassageHTML(p)+
          '<div class="ko-text" style="display:none;margin-top:12px"><div class="sp-sec-title">🇰🇷 해석</div>'+tKoHTML(p)+'</div>'+
          '<div class="sp-sec-title">💡 핵심 어휘</div><div class="tp-gloss">'+
            p.gloss.map(g=>'<span><b>'+esc(g.w)+'</b>'+esc(g.ko)+'</span>').join('')+'</div>'+
          '<div class="sp-sec-title">❓ 문제 · 해설</div>'+
          p.qs.map((q,k)=>'<div class="tp-qbox"><div class="tp-qn">Q'+(k+1)+linkTag(q)+'</div>'+
            '<div class="q-text" style="font-size:14.5px;font-weight:700;line-height:1.8;white-space:pre-wrap;margin-bottom:10px">'+esc(q.q)+'</div>'+
            '<div class="gram-opts">'+q.opts.map((o,j)=>'<span class="'+(j===q.ans?"ok":"")+'">('+AB[j]+') '+esc(o)+'</span>').join('')+'</div>'+
            '<div class="gram-exp">정답 ('+AB[q.ans]+') · '+esc(q.exp)+'</div></div>').join('')+
        '</div></div>';
    }).join('');
    $("topic-body").querySelectorAll(".sp-item").forEach(item=>{
      const p=list[parseInt(item.dataset.i,10)];
      item.querySelector(".sp-head").addEventListener("click",()=>{const o=item.classList.toggle("open");if(!o)stopSpeak();});
      item.querySelector('[data-act="play"]').addEventListener("click",e=>{e.stopPropagation();
        const b=e.currentTarget;b.textContent="🔊 재생 중…";
        speakBest(tEnglish(p),{rate:.92,onend:()=>b.textContent="▶ 지문 듣기"});});
      item.querySelector('[data-act="stop"]').addEventListener("click",e=>{e.stopPropagation();stopSpeak();
        item.querySelector('[data-act="play"]').textContent="▶ 지문 듣기";});
      const kb=item.querySelector('[data-act="ko"]');
      kb.addEventListener("click",e=>{e.stopPropagation();const on=kb.getAttribute("aria-pressed")==="true";
        kb.setAttribute("aria-pressed",!on);item.querySelector(".ko-text").style.display=on?"none":"block";});
      item.querySelector('[data-act="dl"]').addEventListener("click",e=>{e.stopPropagation();downloadScript(p);});
      item.querySelector('[data-act="dlaudio"]').addEventListener("click",e=>{e.stopPropagation();ttsDownload(tEnglish(p),p.title);});
    });
  }
  // 음성 대본(.txt) 저장 — 외부 TTS 도구에 그대로 넣어 쓸 수 있는 형식
  function downloadScript(p){
    const head=(p.part7?"TOEIC Part 7":p.exam)+" · "+p.type+" · "+p.topic;
    const txt=[p.title,"("+head+")","",p.passage,"","--- 한글 해석 ---","",p.ko].join("\n");
    const blob=new Blob([String.fromCharCode(0xFEFF)+txt],{type:"text/plain;charset=utf-8;"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=p.title.replace(/[^\w가-힣 -]/g,"").slice(0,50)+".txt";
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    toast("음성 대본을 저장했습니다 ⬇");
  }

  // 문제 풀기 모드
  function renderTopicSolve(list){
    const qs=[];
    list.forEach(p=>p.qs.forEach((q,k)=>qs.push(Object.assign({},q,{p:p,no:k+1}))));
    if(!tSes||tSes.finished){ tSes={list:shuffled(qs).slice(0,Math.min(8,qs.length)),i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.topic||0}; }
    drawTopicQ();
  }
  function drawTopicQ(){
    if(tSes.i>=tSes.list.length){
      const pct=Math.round(tSes.score/tSes.list.length*100);
      $("topic-body").innerHTML='<div class="result"><div class="big">'+tSes.score+' / '+tSes.list.length+'</div>'+
        '<p>'+(pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"지문을 다시 읽어 보세요 📖")+' ('+pct+'%)</p>'+
        comboSummary(tSes,"topic")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="tp-restart">새 문제 풀기</button></div>';
      tSes.finished=true;
      $("tp-restart").addEventListener("click",()=>{tSes=null;renderTopic();});
      if(pct>=80){confetti(80);beep("ok",tSes.best);}
      return;
    }
    const it=tSes.list[tSes.i],p=it.p; tSes.answered=false;
    $("topic-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(tSes.i/tSes.list.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">'+(tSes.i+1)+' / '+tSes.list.length+' · '+esc(p.title)+'</span><span id="tp-streak">'+comboBadge(tSes.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px">'+tExamBadge(p)+
        '<span class="cat-badge">'+esc(p.type)+'</span><span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span></div>'+
      (p.docs
        ? '<div class="tp-docs">'+p.docs.map(d=>'<div class="tp-doclabel">'+esc(d.label)+'</div>'+
            '<div class="tp-passage mono">'+esc(d.en)+'</div>').join('')+'</div>'
        : '<div class="tp-passage'+(p.exam==="TOEIC"?" mono":"")+'" style="max-height:320px;overflow-y:auto;margin-bottom:16px">'+esc(p.passage)+'</div>')+
      '<div class="q-text" style="font-size:15px;font-weight:700;line-height:1.8;white-space:pre-wrap;margin-bottom:14px">'+linkTag(it)+esc(it.q)+'</div>'+
      it.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="tp-score">'+tSes.score+'</b> / '+tSes.list.length+bestLabel("topic")+'</span>'+
      '<button class="quiz-next" id="tp-next">다음 →</button></div><div id="tp-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    $("topic-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerTopic(parseInt(b.dataset.i,10),it)));
    $("tp-next").addEventListener("click",()=>{tSes.i++;drawTopicQ();window.scrollTo({top:0,behavior:"smooth"});});
  }
  function answerTopic(pick,it){
    if(tSes.answered)return; tSes.answered=true;
    const ok=pick===it.ans,btns=$("topic-body").querySelectorAll(".opt");
    let rec=false;
    if(ok){
      tSes.score++;tSes.streak++;tSes.best=Math.max(tSes.best,tSes.streak);
      if(bestCombo.topic===undefined)bestCombo.topic=0;
      rec=registerCombo(tSes,"topic");
      beep("ok",tSes.streak);confetti(rec?110:tSes.streak>=5?70:tSes.streak>=3?45:26);
      comboPopup(tSes.streak,rec);
      const s=$("tp-score");s.textContent=tSes.score;s.classList.add("bump");
      const bi=document.querySelector("#topic-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((tSes.i+1)/tSes.list.length*100)+"%";
    }else{tSes.streak=0;tSes.recordShown=false;beep("no");btns[pick].classList.add("wrong");}
    btns.forEach((b,i)=>{b.disabled=true;if(i===it.ans)b.classList.add("correct");});
    const sb=$("tp-streak");if(sb)sb.innerHTML=comboBadge(tSes.streak);
    $("tp-reveal").innerHTML='<div class="reveal '+(ok?"ok":"no")+'">'+
      '<div class="verdict">'+(ok?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[it.ans]+')')+
        (ok?' '+comboBadge(tSes.streak)+(rec?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp">'+esc(it.exp)+'</div></div>';
    const nb=$("tp-next");nb.style.visibility="visible";nb.classList.add("on");
    nb.textContent=tSes.i===tSes.list.length-1?"결과 보기 →":"다음 →";
  }
  document.addEventListener("keydown",e=>{
    if(!$("panel-topic").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(tMode!=="solve"||!tSes||!tSes.list)return;
    const opts=Array.prototype.slice.call($("topic-body").querySelectorAll(".opt"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){const n=parseInt(e.key,10);if(n>=1&&n<=opts.length)idx=n-1;}
    if(!tSes.answered&&idx>=0&&idx<opts.length){e.preventDefault();opts[idx].click();return;}
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){e.preventDefault();
      if(tSes.answered&&$("tp-next"))$("tp-next").click();}
  });



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"topic", wide:true,
    init(){ buildTopicChips(); renderTopic(); },
    // 최상위 '관심주제' 메뉴에서 오면 그룹이 바뀌어 있으므로 항상 다시 그린다.
    // 시험 하위(Part 7)에서 오면 그룹이 그대로라 진행 중인 문제만 넘긴다.
    resume(){
      if(tGroupChanged){ tGroupChanged=false; buildTopicChips(); renderTopic(); return; }
      if(tMode==="solve" && tSes && tSes.answered){ tSes.i++; drawTopicQ(); }
    }
  });

  A.topicGroups = TGROUPS;
  A.setTopicGroup = function(id){ setTopicGroup(id); tGroupChanged=true; };

})(window.APP);
