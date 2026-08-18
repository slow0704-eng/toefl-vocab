/* ============================================================
   내비게이션 — 2단 (시험 → 파트·유형)
   ------------------------------------------------------------
   1단은 "무엇을 준비하는가", 2단은 "그 안의 어느 파트·유형인가".

   2단 항목은 대부분 기존 패널을 그대로 열되, 열기 전에 패널 안의
   필터를 미리 눌러 둔다(pre). 예를 들어 TOEIC → Part 7 은 멀티지문
   필터가 켜진 채로, 관심주제 → 문학·판타지 는 해리 포터와 반지의 제왕만
   보이는 상태로 열린다.

   메뉴를 하나 늘릴 때 고칠 곳은 아래 NAV 배열 한 군데다. 패널 자체는
   core.js 의 레지스트리(A.panel)에 스스로 등록하므로 여기서는 id 만
   가리키면 된다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$, qsa = A.qsa, esc = A.esc, ls = A.ls, openPanel = A.openPanel;

  /** 패널 안의 칩을 미리 눌러 둔다. 이미 눌려 있으면 건드리지 않는다
      (다시 누르면 진행 중이던 세션이 초기화되는 패널이 있다). */
  function chip(boxId, sel){
    const box=$(boxId); if(!box)return;
    const b=box.querySelector(sel);
    if(b && b.getAttribute("aria-pressed")!=="true") b.click();
  }

  /* 듀오링고 8유형과 OPIc 4그룹, 관심주제 5갈래는 각 패널이 가진 정의에서
     그대로 가져온다. 유형이 늘면 패널만 고치면 메뉴가 따라온다. */
  function detTabs(){
    const box=$("det-mode"); if(!box) return [];
    return qsa("[data-dm]", box).map(b=>({
      id:"det-"+b.dataset.dm, label:b.innerHTML, panel:"det",
      pre:()=>chip("det-mode",'[data-dm="'+b.dataset.dm+'"]')
    }));
  }
  function opicTabs(){
    return ((window.OPIC_NAV||{}).groups||[]).map(g=>({
      id:"opic-"+g.id,
      label:g.icon+" "+g.name+' <span class="tp-n">'+
            (g.axis==="type" ? ((window.OPIC_NAV||{}).types||[]).length : (g.items||[]).length)+'</span>',
      panel:"opic", pre:()=>A.setOpicGroup(g.id)
    }));
  }
  function topicTabs(){
    return (A.topicGroups||[]).map(g=>({
      id:"topic-"+g.id, label:g.icon+" "+g.name, panel:"topic",
      pre:()=>A.setTopicGroup(g.id)
    }));
  }

  /* ── 메뉴 정의 ──────────────────────────────────────────── */
  const NAV = [
    {id:"home", icon:"🏠", name:"홈", hideCount:true,
     note:"",
     tabs:[{id:"home", label:"🏠 홈", panel:"home"}]},

    {id:"common", icon:"📚", name:"공통",
     note:"시험을 가리지 않고 쓰이는 어휘·구문. 어느 시험을 준비하든 여기가 기본기입니다.",
     tabs:[
       {id:"flash",  label:"🃏 카드",      panel:"flash"},
       {id:"quiz",   label:"✍️ 퀴즈",      panel:"quiz"},
       {id:"browse", label:"📚 단어장",    panel:"browse"},
       {id:"struct", label:"🧩 구문",      panel:"struct"},
       {id:"slang",  label:"🎬 장르·슬랭", panel:"slang"}
     ]},

    {id:"toefl", icon:"🎓", name:"TOEFL",
     note:"학술 지문·통합형 과제. 리딩은 문제 유형과 글의 짜임을 따로 훈련하는 편이 빠릅니다.",
     tabs:[
       {id:"toefl-read",  label:"📖 리딩",      panel:"read"},
       {id:"toefl-ptype", label:"📐 지문 유형", panel:"ptype"},
       {id:"toefl-speak", label:"🎤 스피킹",    panel:"speak", pre:()=>chip("speak-exam",'[data-exam="TOEFL"]')},
       {id:"toefl-write", label:"✍️ 라이팅",    panel:"write"}
     ]},

    {id:"toeic", icon:"💼", name:"TOEIC",
     note:"실무 영어. Part 5는 단문 문법, Part 6는 지문 속 빈칸, Part 7은 독해로 성격이 완전히 다릅니다.",
     tabs:[
       {id:"toeic-gram",  label:"📝 Part 5 문법",   panel:"gram"},
       {id:"toeic-p6",    label:"📄 Part 6 장문빈칸", panel:"p6"},
       {id:"toeic-p7",    label:"🗂 Part 7 독해",    panel:"topic", pre:()=>{ A.setTopicGroup(null); chip("topic-exam",'[data-tex="P7"]'); }},
       {id:"toeic-speak", label:"🎤 토익스피킹",     panel:"speak", pre:()=>chip("speak-exam",'[data-exam="TOEIC"]')}
     ]},

    {id:"det", icon:"🦉", name:"듀오링고",
     note:"2026 개편 기준 공식 13유형. 유형마다 제한 시간과 채점 기준이 다릅니다.",
     tabs:detTabs},

    {id:"opic", icon:"🗣", name:"OPIc",
     note:"주제 63개(설문 25 · 돌발 20 · 롤플레이 6)와 질문 유형 12가지를 따로 훈련합니다.",
     tabs:opicTabs},

    {id:"topic", icon:"⚽", name:"관심주제",
     note:"익숙한 소재로 읽되 문장 수준과 문제 유형은 실제 TOEFL·TOEIC 그대로입니다.",
     tabs:topicTabs},

    {id:"info", icon:"ℹ️", name:"시험정보",
     note:"주요 시험의 문항 수·시간·점수를 한 표에서 비교합니다.",
     tabs:[{id:"info", label:"📊 시험 한눈에 비교", panel:"info"}]}
  ];

  // tabs 가 함수인 항목은 데이터가 다 실린 뒤 한 번만 펼친다
  function tabsOf(ex){
    if(typeof ex.tabs === "function") ex.tabs = ex.tabs();
    return ex.tabs;
  }

  const EXAM_KEY="eng-nav-exam", TAB_KEY="eng-nav-tab";
  let navExam=NAV[0], navTab=NAV[0].tabs[0];

  function find(exId, tabId){
    const ex = NAV.filter(e=>e.id===exId)[0] || NAV[0];
    const tabs = tabsOf(ex);
    return { ex, tab: tabs.filter(t=>t.id===tabId)[0] || tabs[0] };
  }

  /* ── 그리기 ─────────────────────────────────────────────── */
  function renderExamBar(){
    $("exam-tabs").innerHTML = NAV.map(e=>{
      const n = tabsOf(e).length;
      return '<button role="tab" data-ex="'+e.id+'" aria-selected="'+(e.id===navExam.id)+'">'+
        '<span class="ex-ic">'+e.icon+'</span>'+esc(e.name)+
        (e.hideCount||n<2 ? '' : '<span class="ex-n">'+n+'</span>')+'</button>';
    }).join('');
    qsa("[data-ex]", $("exam-tabs")).forEach(b=>
      b.addEventListener("click", ()=>go(b.dataset.ex, null)));
  }
  function renderSubBar(){
    const tabs = tabsOf(navExam);
    document.querySelector(".tab-wrap").style.display = tabs.length<2 ? "none" : "";
    $("sub-tabs").innerHTML = tabs.map(t=>
      '<button role="tab" data-sub="'+t.id+'" aria-selected="'+(t.id===navTab.id)+'">'+t.label+'</button>').join('');
    qsa("[data-sub]", $("sub-tabs")).forEach(b=>
      b.addEventListener("click", ()=>go(navExam.id, b.dataset.sub)));
    $("nav-note").textContent = navExam.note||"";
  }

  /** 시험/하위탭 이동. tabId 가 없으면 그 시험의 첫 탭을 연다. */
  function go(exId, tabId){
    const f = find(exId, tabId);
    navExam=f.ex; navTab=f.tab;
    ls.set(EXAM_KEY, navExam.id); ls.set(TAB_KEY, navTab.id);
    renderExamBar(); renderSubBar();
    if(navTab.pre) navTab.pre();
    openPanel(navTab.panel);
    reveal();
  }

  /** 하위탭 id 하나만 알 때 (홈 화면의 바로가기 버튼) */
  function goTab(tabId){
    for(const ex of NAV){
      if(tabsOf(ex).some(t=>t.id===tabId)) return go(ex.id, tabId);
    }
    go("home", null);
  }

  /* ── 모바일: 넘치는 탭 처리 ─────────────────────────────── */
  function mark(wrap, bar){
    if(!wrap||!bar)return;
    const max=bar.scrollWidth-bar.clientWidth;
    wrap.classList.toggle("more-l", bar.scrollLeft>4);
    wrap.classList.toggle("more-r", bar.scrollLeft<max-4);
  }
  function bring(bar, btn){
    if(!bar||!btn)return;
    const b=btn.getBoundingClientRect(), r=bar.getBoundingClientRect();
    if(b.left<r.left+8) bar.scrollLeft += b.left-r.left-16;
    else if(b.right>r.right-8) bar.scrollLeft += b.right-r.right+16;
  }
  function pairs(){
    return [[document.querySelector(".tab-wrap"), $("sub-tabs")],
            [document.querySelector(".exam-wrap"), $("exam-tabs")]];
  }
  function reveal(){
    setTimeout(()=>pairs().forEach(([w,b])=>{
      mark(w,b); bring(b, b && b.querySelector('[aria-selected="true"]'));
    }), 0);
  }

  A.onBoot(function(){
    pairs().forEach(([w,b])=>{ if(b) b.addEventListener("scroll", ()=>mark(w,b), {passive:true}); });
    window.addEventListener("resize", ()=>pairs().forEach(([w,b])=>mark(w,b)));
    // 듀오링고 유형 칩은 2단 탭으로 올라갔으니 패널 안에서는 감춘다
    const dm=$("det-mode"); if(dm) dm.hidden=true;
    go(ls.get(EXAM_KEY,"home"), ls.get(TAB_KEY,null));
  });

  Object.assign(A, { go, goTab });

})(window.APP);
