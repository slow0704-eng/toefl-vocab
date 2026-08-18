/* ============================================================
   홈 — 시험 고르기 화면
   ------------------------------------------------------------
   예전에는 앱을 열면 곧바로 플래시카드가 떴다. 무엇이 들어 있는지,
   내가 준비하는 시험은 어디로 가야 하는지가 화면에 없었다.
   홈은 그 두 가지만 답한다.

     ① 지금 어디까지 했는가   — 외운 단어, 최고 콤보, 이어서 할 곳
     ② 무엇이 얼마나 있는가   — 시험별 카드 (exams.js 의 공식 정보 +
                                이 앱에 실제로 수록된 문항 수)

   시험 카드의 왼쪽은 exams.js 에서 온 실제 시험 정보(시간·문항·점수)이고
   오른쪽은 이 앱의 수록량이다. 둘을 나란히 두면 "이 시험을 준비하려면
   무엇을 얼마나 풀 수 있는가"가 한눈에 잡힌다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$, esc = A.esc, ls = A.ls, isKnown = A.isKnown;

  const LAST_KEY = "eng-nav-tab";     // nav.js 가 저장하는 마지막 위치

  /* 시험 카드 정의 — exams.js 의 id 와 내비게이션 항목을 잇는다.
     content 는 "이 앱에 실제로 실려 있는 것"을 stats() 에서 뽑아 쓴다. */
  const CARDS = [
    {exam:"toefl", ex:"toefl", icon:"🎓", name:"TOEFL",
     blurb:"학술 지문과 통합형 과제. 리딩은 문제 유형과 글의 짜임을 따로 훈련한다.",
     content: s => [["리딩 지문", s.toeflRead], ["지문 유형", s.ptype], ["스피킹·라이팅", s.toeflSpeak]],
     go:[["📖 리딩","toefl-read"],["📐 지문 유형","toefl-ptype"],["🎤 스피킹","toefl-speak"],["✍️ 라이팅","toefl-write"]]},

    {exam:"toeic", ex:"toeic", icon:"💼", name:"TOEIC",
     blurb:"Part 5는 단문 문법, Part 6는 지문 속 빈칸, Part 7은 독해. 성격이 완전히 다르다.",
     content: s => [["Part 5 문항", s.gram], ["Part 6 문항", s.p6], ["Part 7 문항", s.p7]],
     go:[["📝 Part 5","toeic-gram"],["📄 Part 6","toeic-p6"],["🗂 Part 7","toeic-p7"],["🎤 스피킹","toeic-speak"]]},

    {exam:"det", ex:"det", icon:"🦉", name:"듀오링고 (DET)",
     blurb:"2026 개편 기준 공식 13유형. 유형마다 제한 시간과 채점 방식이 다르다.",
     content: s => [["전체 문항", s.det], ["유형", "13종"], ["말하기·쓰기", "10유형"]],
     go:[["🔤 Read and Select","det-select"],["✍️ Fill in the Blanks","det-blanks"],["🎧 Listen and Type","det-listen"]]},

    {exam:"opic", ex:"opic", icon:"🗣", name:"OPIc",
     blurb:"주제 63개(설문 25 · 돌발 20 · 롤플레이 6)와 질문 유형 12가지를 따로 훈련한다.",
     content: s => [["수록 문항", s.opic], ["주제 분류", "63개"], ["질문 유형", "12가지"]],
     go:[["🎯 유형 공략","opic-type"],["📋 설문 주제","opic-survey"],["⚡ 돌발 주제","opic-surprise"],["🎭 롤플레이","opic-roleplay"]]}
  ];

  /* 공통·관심주제는 시험이 아니라 재료라서 카드 모양을 달리한다 */
  const SIDE = [
    {ex:"common", icon:"📚", name:"공통 어휘·구문",
     blurb:"어느 시험을 준비하든 여기가 기본기다.",
     content: s => [["어휘", s.words], ["구문", s.struct], ["장르·슬랭", s.slang]],
     go:[["🃏 카드","flash"],["✍️ 퀴즈","quiz"],["📚 단어장","browse"],["🧩 구문","struct"]]},
    {ex:"topic", icon:"⚽", name:"관심주제 리딩",
     blurb:"익숙한 소재로 읽되 문장 수준과 문제 유형은 실제 시험 그대로.",
     content: s => [["지문", s.reading], ["문항", s.readingQ], ["소재", "5갈래"]],
     go:[["⚽ 스포츠","topic-sport"],["📚 문학·판타지","topic-fantasy"],["🎬 영화·SF","topic-film"],["💻 기술·IT","topic-tech"]]}
  ];

  function num(v){ return typeof v==="number" ? v.toLocaleString() : esc(String(v)); }

  function statBits(rows){
    return '<div class="hm-stats">' + rows.map(r =>
      '<div><b>'+num(r[1])+'</b><span>'+esc(r[0])+'</span></div>').join('') + '</div>';
  }
  function goBits(go){
    return '<div class="hm-go">' + go.map(g =>
      '<button data-go="'+esc(g[1])+'">'+esc(g[0])+'</button>').join('') + '</div>';
  }

  /** exams.js 에서 그 시험의 공식 정보를 한 줄로 뽑는다 */
  function official(id){
    const e = (window.EXAM_INFO||[]).filter(x=>x.id===id)[0];
    if(!e) return "";
    return '<div class="hm-official">'+
      '<span title="총 시간">⏱ '+esc(e.total)+'</span>'+
      '<span title="점수">🎯 '+esc(e.score)+'</span>'+
      '<span title="유효기간">📅 '+esc(e.validity)+'</span>'+
    '</div>';
  }

  function card(c, s, big){
    return '<article class="hm-card'+(big?" big":"")+'" data-ex="'+esc(c.ex)+'">'+
      '<header><span class="hm-ic">'+c.icon+'</span>'+
        '<div><h3>'+esc(c.name)+'</h3>'+
        (c.exam?official(c.exam):'')+'</div></header>'+
      '<p class="hm-blurb">'+esc(c.blurb)+'</p>'+
      statBits(c.content(s))+
      goBits(c.go)+
    '</article>';
  }

  function render(){
    const s = A.stats();
    const known = A.WORDS.filter(w=>isKnown(w.word)).length;
    const pct = s.words ? Math.round(known/s.words*100) : 0;
    const best = A.bestCombo || {};
    const bestN = Math.max.apply(null, [0].concat(Object.keys(best).map(k=>best[k]||0)));

    // 마지막으로 보던 곳이 홈이면 되돌아갈 데가 없다
    const last = ls.get(LAST_KEY, null);
    const resume = (last && last !== "home") ? last : null;
    const total = s.gram + s.p6 + s.p7 + s.det + s.readingQ + s.speaking + s.struct + s.slang;

    $("home-body").innerHTML =
      '<section class="hm-hero">'+
        '<h2>무슨 시험을 준비하세요?</h2>'+
        '<p>시험을 고르면 그 시험의 파트·유형만 보입니다. 어휘와 구문은 <b>공통</b>에 있습니다.</p>'+
        '<div class="hm-hero-stats">'+
          '<div><b>'+num(known)+'</b><span>외운 단어 · '+pct+'%</span></div>'+
          '<div><b>'+num(bestN)+'</b><span>최고 연속 정답</span></div>'+
          '<div><b>'+num(total)+'</b><span>수록 문항</span></div>'+
        '</div>'+
        (resume ? '<button class="hm-resume" id="hm-resume">↩ 마지막에 보던 곳으로</button>' : '')+
      '</section>'+
      '<div class="hm-grid">' + CARDS.map(c=>card(c,s,true)).join('') + '</div>'+
      '<div class="hm-grid side">' + SIDE.map(c=>card(c,s,false)).join('') + '</div>'+
      '<section class="hm-foot">'+
        '<b>ℹ️ 시험을 아직 못 정했다면</b> — 여섯 시험의 문항 수·시간·점수·유효기간을 한 표에서 견줄 수 있습니다.'+
        '<button data-go="info">📊 시험 한눈에 비교</button>'+
      '</section>';

    A.qsa("[data-go]", $("home-body")).forEach(b=>
      b.addEventListener("click", ()=>A.goTab(b.dataset.go)));
    const rb = $("hm-resume");
    if(rb) rb.addEventListener("click", ()=>A.goTab(resume));
  }

  A.panel({ id:"home", wide:true, init:render, resume:render });

})(window.APP);
