/* ============================================================
   OPIc — 주제 63개 × 질문 유형 12가지
   ------------------------------------------------------------
   주제 축(설문·돌발·롤플레이)과 유형 축은 서로 직각이다. 같은 문항이
   '카페 가기'이면서 '기억에 남는 경험'일 수 있어 둘 다 태깅해 두고,
   그룹에 따라 어느 축으로 자를지만 바꾼다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        qsa = A.qsa,
        esc = A.esc,
        TOPICS = A.TOPICS,
        spItemMarkup = A.spItemMarkup,
        spBind = A.spBind;

  // ---- OPIc 패널 (유형 12 · 설문 25 · 돌발 20 · 롤플레이 6 = 63) ----
  // 주제 축(설문·돌발·롤플레이)과 유형 축(질문 방식 12가지)은 서로 직각이다.
  // 같은 문항이 '카페 가기'이면서 동시에 '기억에 남는 경험'일 수 있으므로
  // 문항마다 두 축을 다 붙여 두고, 그룹에 따라 어느 축으로 자를지만 바꾼다.
  const ONAV = window.OPIC_NAV || {groups:[],types:[]};
  const OPIC_CFG = {HEAD_TOPIC:false, PASSAGE_TITLE:"", PLAY:"원어민 음성", KO_LABEL:"한글 번역", ANS_TITLE:"🗣 예시 답변"};
  const OPIC_PAGE = 30;
  const OPIC_POOL = TOPICS.filter(t=>t.exam==="OPIc").map(t=>{
    const g = window.opicTag ? window.opicTag(t) : {};
    return Object.assign({}, t, {_g:g.unitGroup||null, _u:g.unit||null, _t:g.type||null});
  });
  let oGroup="type", oUnit="all", oShown=OPIC_PAGE;

  function oGroupDef(){ return (ONAV.groups||[]).filter(g=>g.id===oGroup)[0] || (ONAV.groups||[])[0]; }
  function oAxisItems(g){ return g.axis==="type" ? (ONAV.types||[]) : (g.items||[]); }
  function oInPool(g,t){ return g.axis==="type" ? true : t._g===g.id; }
  function oKey(g,t){ return g.axis==="type" ? t._t : t._u; }

  function setOpicGroup(id){ if(oGroup!==id){ oGroup=id; oUnit="all"; oShown=OPIC_PAGE; } }

  function buildOpicChips(){
    const g=oGroupDef(), items=oAxisItems(g);
    const pool=OPIC_POOL.filter(t=>oInPool(g,t));
    const n=k=>pool.filter(t=>oKey(g,t)===k).length;
    const etc=pool.filter(t=>!oKey(g,t)).length;
    $("opic-unit-title").textContent = g.axis==="type" ? "질문 유형 12" : g.name+" "+items.length;
    let last=null, html='<button class="tp-chip" data-ou="all" aria-pressed="'+(oUnit==="all")+'">전체 <span class="c">'+pool.length+'</span></button>';
    items.forEach(u=>{
      if(u.group && u.group!==last){ last=u.group; html+='<span class="tp-sep">'+esc(u.group)+'</span>'; }
      const c=n(u.id);
      html+='<button class="tp-chip'+(c?'':' zero')+'" data-ou="'+u.id+'" aria-pressed="'+(oUnit===u.id)+'" title="'+esc(u.no+' '+u.name)+'">'+
            (u.icon?u.icon+' ':'')+esc(u.no.replace("UNIT ","").replace("유형 ",""))+'. '+esc(u.name)+' <span class="c">'+c+'</span></button>';
    });
    if(etc) html+='<button class="tp-chip" data-ou="etc" aria-pressed="'+(oUnit==="etc")+'">📦 기타 <span class="c">'+etc+'</span></button>';
    $("opic-units").innerHTML=html;
    qsa("[data-ou]",$("opic-units")).forEach(b=>b.addEventListener("click",()=>{
      oUnit=b.dataset.ou; oShown=OPIC_PAGE; buildOpicChips(); renderOpic();
    }));
  }

  function opicGuide(){
    const g=oGroupDef();
    if(oUnit==="all"||oUnit==="etc") return "";
    const u=oAxisItems(g).filter(x=>x.id===oUnit)[0];
    if(!u) return "";
    const frame=(u.frame||[]).map(f=>'<li>'+esc(f)+'</li>').join('');
    if(!u.desc && !frame) return "";
    return '<div class="opic-guide">'+
      '<div class="og-title">'+(u.icon?u.icon+' ':'')+esc(u.no)+' '+esc(u.name)+'</div>'+
      (u.desc?'<div class="og-desc">'+esc(u.desc)+'</div>':'')+
      (frame?'<div class="og-frame-title">답변 뼈대 — 주제만 갈아 끼우면 된다</div><ol class="og-frame">'+frame+'</ol>':'')+
    '</div>';
  }

  function renderOpic(resetPage){
    if(resetPage!==false) oShown=OPIC_PAGE;
    const g=oGroupDef();
    $("opic-intro").innerHTML='<b>'+g.icon+' '+esc(g.name)+'</b> · '+esc(g.sub)+
      ' — 아래 칩으로 좁혀 보세요. 문항마다 <b>주제</b>와 <b>질문 유형</b>이 함께 표시됩니다.';
    $("opic-guide").innerHTML=opicGuide();
    const q=($("opic-search").value||"").trim().toLowerCase();
    const list=OPIC_POOL.filter(t=>{
      if(!oInPool(g,t))return false;
      if(oUnit==="etc"){ if(oKey(g,t))return false; }
      else if(oUnit!=="all" && oKey(g,t)!==oUnit) return false;
      if(q&&!((t.question||"").toLowerCase().includes(q)||(t.topic||"").toLowerCase().includes(q)||
              (t.answerEn||"").toLowerCase().includes(q)||(t.answerKo||"").includes(q)))return false;
      return true;
    });
    $("opic-count").textContent=list.length+"개 문항";
    const box=$("opic-list");
    if(!list.length){
      box.innerHTML='<div class="empty">이 분류에는 아직 수록된 문항이 없습니다.<br/>다른 칩을 골라 보세요.</div>';
      return;
    }
    const slice=list.slice(0,oShown);
    const TY=ONAV.types||[];
    box.innerHTML=slice.map((t,i)=>{
      const ty=TY.filter(x=>x.id===t._t)[0];
      return spItemMarkup(t,i,OPIC_CFG).replace('<div class="sp-toggle">',
        (ty?'<span class="type-badge">'+ty.icon+' '+esc(ty.name.replace(/ —.*$/,""))+'</span>':'')+'<div class="sp-toggle">');
    }).join('')+
      (list.length>oShown?'<button class="more-btn" id="opic-more">더 보기 · '+(list.length-oShown)+'개 남음</button>':'');
    spBind(box,slice,OPIC_CFG,"opic-more",()=>{ oShown+=OPIC_PAGE; renderOpic(false); });
  }
  $("opic-search").addEventListener("input",()=>renderOpic());



  /* ── 패널 등록 ──────────────────────────────────────────── */
  // 최상위 OPIc 메뉴의 하위 탭이 그룹을 바꿀 때 쓴다
  A.setOpicGroup = setOpicGroup;

  A.panel({ id:"opic", wide:true,
    init(){ buildOpicChips(); renderOpic(); },
    resume(){ buildOpicChips(); renderOpic(); }
  });

})(window.APP);
