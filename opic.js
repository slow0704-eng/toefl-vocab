/* ============================================================
   OPIc 상세 분류 — 유형 12 + 설문 25 + 돌발 20 + 롤플레이 6 = 63
   ------------------------------------------------------------
   OPIc 은 "주제(무엇에 대해)" 와 "유형(어떤 식으로 답하라)" 이
   서로 다른 축이다. 같은 '영화 관람' 주제라도 묘사·경험·비교로
   물어보는 방식이 달라지고, 답변 뼈대도 통째로 달라진다.
   그래서 두 축을 각각 칩으로 두고, 문항마다 양쪽을 다 붙인다.

   window.OPIC_NAV  : 분류 정의(그룹 → 항목)
   window.opicTag(t): SPEAKING_TOPICS 의 OPIc 문항 하나를 받아
                      {unit, unitGroup, type} 을 돌려준다.
   ============================================================ */
(function(){

  /* ── ① 유형 공략 12 ───────────────────────────────────────
     각 유형에 답변 뼈대(frame)를 붙였다. 주제가 무엇이든
     이 뼈대만 갈아 끼우면 문장이 나오도록 만든 것이다. */
  const TYPES = [
    {id:"t01", no:"유형 01", name:"자기소개하기", icon:"🙋",
     desc:"모든 시험의 첫 문항. 사실 나열이 아니라 성격 → 일/학업 → 취미 → 마무리 한 줄로 엮는다.",
     frame:["Let me introduce myself. My name is ___ and I'm in my ___.",
            "I'd say I'm a pretty ___ person, but ___ when it comes to ___.",
            "I currently ___, and I've been doing that for about ___.",
            "Outside of that, I'm the kind of person who ___.",
            "So yeah, that's me in a nutshell."],
     kw:["자기소개","tell me about yourself","introduce yourself","about your life"]},

    {id:"t02", no:"유형 02", name:"대상 설명하기(1) — 인물", icon:"👤",
     desc:"사람 묘사. 외모 → 성격 → 나와의 관계·에피소드 순서가 가장 안전하다.",
     frame:["___ is probably the person I'd talk about.",
            "In terms of looks, ___.",
            "Personality-wise, ___ is the type of person who ___.",
            "What I like most about ___ is that ___.",
            "That's pretty much what ___ is like."],
     kw:["인물","가족","친구","describe a person","family member","your friend","best friend","person you"]},

    {id:"t03", no:"유형 03", name:"대상 설명하기(2) — 장소", icon:"📍",
     desc:"장소 묘사. 위치 → 전체 인상 → 세부(들어가면 무엇이 보이는지) → 분위기 순으로 시선을 옮긴다.",
     frame:["It's located ___, about ___ minutes from ___.",
            "The first thing you notice when you walk in is ___.",
            "On the left/right there's ___, and next to it ___.",
            "The whole place has a very ___ feel to it.",
            "That's basically what it looks like."],
     kw:["모습과","모습 묘사","장소","describe the place","where you live","your house","your home","your neighborhood","describe a place","what does it look like"]},

    {id:"t04", no:"유형 04", name:"대상 설명하기(3) — 사물", icon:"📦",
     desc:"사물 묘사. 무엇인지 → 생김새 → 어떻게 쓰는지 → 왜 아끼는지.",
     frame:["The one I use the most is ___.",
            "It's about ___ in size, and it's ___ in color.",
            "I mainly use it for ___.",
            "What makes it special is ___."],
     kw:["묘사","describe the object","your favorite thing","device you","your phone","instrument you"]},

    {id:"t05", no:"유형 05", name:"두 가지 대상 비교하기", icon:"⚖️",
     desc:"비교. 공통점 한 문장 → 차이 두세 개 → 나는 어느 쪽인지로 닫는다. 비교급·대조 연결어가 점수 포인트.",
     frame:["Well, they do have a few things in common. Both ___.",
            "That said, the biggest difference is that ___, whereas ___.",
            "Another difference is ___.",
            "If I had to pick, I'd go with ___ because ___."],
     kw:["비교","compare","difference between","differences between","how are they different"]},

    {id:"t06", no:"유형 06", name:"습관·경향에 대해 말하기", icon:"🔁",
     desc:"평소 루틴. 빈도 표현 → 전형적인 하루/한 번 → 예외 상황까지 붙이면 길이가 산다.",
     frame:["I'd say I ___ about ___ times a week.",
            "A typical one goes like this: I usually start by ___.",
            "After that, I ___.",
            "Although, if I'm busy, I sometimes ___ instead."],
     kw:["습관","방식 설명","how often","typically","routine","typical day","normally do","habit"]},

    {id:"t07", no:"유형 07", name:"기억에 남는 경험 말하기", icon:"⭐",
     desc:"에피소드. 언제·어디 → 무슨 일이 → 그때 감정 → 그래서 지금 어떤 의미인지. 과거시제 유지가 관건.",
     frame:["Okay, so this happened about ___ ago.",
            "I was ___ when, out of nowhere, ___.",
            "At first I was ___, but then ___.",
            "In the end, ___.",
            "That's why it still sticks with me."],
     kw:["경험","기억에 남는","memorable","unforgettable","tell me about a time","experience you had","something that happened"]},

    {id:"t08", no:"유형 08", name:"시간 순서대로 설명하기", icon:"⏱",
     desc:"절차·순서. 처음-그다음-마지막 연결어를 또렷하게. 문장이 짧아도 순서만 살아 있으면 잘 들린다.",
     frame:["The first thing I do is ___.",
            "After that, I ___.",
            "Once that's done, ___.",
            "And finally, ___."],
     kw:["순서","과정","from beginning to end","from start to finish","step by step","what do you do first","the whole process"]},

    {id:"t09", no:"유형 09", name:"시작한 계기와 변화 말하기", icon:"🌱",
     desc:"계기 + 변화. '예전엔 ~했는데 지금은 ~하다' 대조가 핵심. used to / back then 을 쓴다.",
     frame:["I first got into it back when ___.",
            "Honestly, at the beginning I was ___.",
            "Back then, I used to ___, but these days ___.",
            "So it's changed quite a bit over the years."],
     kw:["변화","계기","시작하게","how did you start","when did you first","got interested","has changed","compared to the past"]},

    {id:"t10", no:"유형 10", name:"문제 해결 경험 말하기", icon:"🛠",
     desc:"문제 → 시도 → 결과 → 교훈. 롤플레이 문제 해결과 뼈대가 같아서 같이 외워 두면 이득이다.",
     frame:["So there was this one time when ___ went wrong.",
            "The problem was that ___.",
            "What I did first was ___, but that didn't really work.",
            "In the end, I managed to ___.",
            "Looking back, I learned that ___."],
     kw:["문제 해결","문제와 해결","went wrong","how did you solve","issue you had"]},

    {id:"t11", no:"유형 11", name:"규칙·방법 설명하기", icon:"📋",
     desc:"방법·규칙 설명. 상대가 처음 듣는다고 가정하고 정의 → 규칙 → 주의점을 준다.",
     frame:["Basically, the way it works is ___.",
            "The main rule is that ___.",
            "You also have to ___, otherwise ___.",
            "It sounds complicated, but you get used to it."],
     kw:["방법 설명","이용 방법","규칙","explain how","how it works","the rules"]},

    {id:"t12", no:"유형 12", name:"이슈 설명하고 나의 의견 말하기", icon:"💬",
     desc:"고난도(IH–AL 결정 문항). 현상 → 원인 → 양쪽 입장 → 내 의견. 추상 어휘와 양보 구문을 써야 한다.",
     frame:["This has actually become a pretty big issue lately.",
            "The main reason is that ___.",
            "Some people argue that ___, while others feel ___.",
            "Personally, I think ___, mainly because ___."],
     kw:["문제점","이슈","의견","what do you think","your opinion","people say","concerns","problems people","in your country"]}
  ];

  /* ── ② 설문 주제 25 ─────────────────────────────────────── */
  const SURVEY = [
    {id:"s01", no:"UNIT 01", name:"학교",              group:"학생",     kw:["학교","캠퍼스","school","campus","university","college"]},
    {id:"s02", no:"UNIT 02", name:"수업",              group:"학생",     kw:["수업","강의","class","lecture","professor","course"]},
    {id:"s03", no:"UNIT 03", name:"직장",              group:"직장인",   kw:["직장","회사","office","company","workplace","coworker"]},
    {id:"s04", no:"UNIT 04", name:"업무",              group:"직장인",   kw:["업무","맡은 일","job task","your workload","tasks at work"]},
    {id:"s05", no:"UNIT 05", name:"사는 곳",           group:"거주지",   kw:["집 묘사","사는 곳","우리 집","house","apartment","where you live","your home"]},
    {id:"s06", no:"UNIT 06", name:"동네 및 이웃",      group:"거주지",   kw:["동네","이웃","neighborhood","neighbor"]},
    {id:"s07", no:"UNIT 07", name:"영화 관람",         group:"여가 활동", kw:["영화","movie","film","cinema"]},
    {id:"s08", no:"UNIT 08", name:"공원 가기",         group:"여가 활동", kw:["공원","park"]},
    {id:"s09", no:"UNIT 09", name:"해변·캠핑 가기",    group:"여가 활동", kw:["해변","캠핑","beach","camping"]},
    {id:"s10", no:"UNIT 10", name:"스포츠 관람",       group:"여가 활동", kw:["스포츠 관람","경기 관람","watching sports","game at the stadium","stadium"]},
    {id:"s11", no:"UNIT 11", name:"쇼핑하기",          group:"여가 활동", kw:["쇼핑","shopping","mall","store you"]},
    {id:"s12", no:"UNIT 12", name:"TV·리얼리티 쇼 시청하기", group:"여가 활동", kw:["tv","리얼리티","reality show","television","드라마"]},
    {id:"s13", no:"UNIT 13", name:"카페·커피전문점 가기",   group:"여가 활동", kw:["카페","커피","cafe","coffee"]},
    {id:"s14", no:"UNIT 14", name:"SNS에 글 올리기",   group:"여가 활동", kw:["sns","소셜","social media","instagram","post online"]},
    {id:"s15", no:"UNIT 15", name:"음악 감상하기",     group:"취미나 관심사", kw:["음악","노래","music","song","sing"]},
    {id:"s16", no:"UNIT 16", name:"악기 연주하기",     group:"취미나 관심사", kw:["악기","연주","instrument","guitar","piano"]},
    {id:"s17", no:"UNIT 17", name:"요리하기",          group:"취미나 관심사", kw:["요리","cook","recipe","kitchen"]},
    {id:"s18", no:"UNIT 18", name:"독서",              group:"취미나 관심사", kw:["독서","책","read","book"]},
    {id:"s19", no:"UNIT 19", name:"농구·야구·축구",    group:"운동",     kw:["농구","야구","축구","basketball","baseball","soccer","football"]},
    {id:"s20", no:"UNIT 20", name:"요가·헬스",         group:"운동",     kw:["요가","필라테스","헬스","웨이트","운동 전반","yoga","pilates","gym","workout","weight"]},
    {id:"s21", no:"UNIT 21", name:"수영",              group:"운동",     kw:["수영","swim","pool"]},
    {id:"s22", no:"UNIT 22", name:"자전거",            group:"운동",     kw:["자전거","bike","cycling","bicycle"]},
    {id:"s23", no:"UNIT 23", name:"국내·해외여행",     group:"휴가나 출장", kw:["국내 여행","해외 여행","여행","travel","trip abroad","vacation you took"]},
    {id:"s24", no:"UNIT 24", name:"국내·해외 출장",    group:"휴가나 출장", kw:["출장","business trip"]},
    {id:"s25", no:"UNIT 25", name:"집에서 보내는 휴가", group:"휴가나 출장", kw:["집에서 보내는 휴가","휴가 보내는","staycation","vacation at home","time off at home"]}
  ];

  /* ── ③ 돌발 주제 20 ─────────────────────────────────────── */
  const SURPRISE = [
    {id:"x01", no:"UNIT 01", name:"집안일 거들기",   kw:["집안일","가사","가족 역할","chores","housework","household resp"]},
    {id:"x02", no:"UNIT 02", name:"외식·음식",       kw:["외식","음식점","식당","restaurant","eating out","food"]},
    {id:"x03", no:"UNIT 03", name:"인터넷 서핑",     kw:["인터넷","internet","surfing","online","website"]},
    {id:"x04", no:"UNIT 04", name:"명절",            kw:["명절","기념일","holiday","chuseok","new year","celebration"]},
    {id:"x05", no:"UNIT 05", name:"교통수단",        kw:["교통","지하철","버스","transportation","subway","bus","commut"]},
    {id:"x06", no:"UNIT 06", name:"프로젝트",        kw:["프로젝트","project","assignment"]},
    {id:"x07", no:"UNIT 07", name:"날씨·계절",       kw:["날씨","계절","weather","season","climate"]},
    {id:"x08", no:"UNIT 08", name:"도서관",          kw:["도서관","library"]},
    {id:"x09", no:"UNIT 09", name:"산업",            kw:["산업","industry","business in your country"]},
    {id:"x10", no:"UNIT 10", name:"가구·가전",       kw:["가구","가전","furniture","appliance","electronic device at home"]},
    {id:"x11", no:"UNIT 11", name:"약속",            kw:["약속","appointment","plans with friends","meet up"]},
    {id:"x12", no:"UNIT 12", name:"은행",            kw:["은행","bank","atm","account"]},
    {id:"x13", no:"UNIT 13", name:"지역 축제",       kw:["축제","festival"]},
    {id:"x14", no:"UNIT 14", name:"지형·야외 활동",  kw:["지형","산","강","야외","geography","mountain","river","outdoor"]},
    {id:"x15", no:"UNIT 15", name:"패션",            kw:["패션","옷","fashion","clothes","wear"]},
    {id:"x16", no:"UNIT 16", name:"전화통화",        kw:["전화","통화","phone call","on the phone"]},
    {id:"x17", no:"UNIT 17", name:"호텔",            kw:["호텔","hotel","check-in"]},
    {id:"x18", no:"UNIT 18", name:"기술",            kw:["기술","technology","smartphone","gadget"]},
    {id:"x19", no:"UNIT 19", name:"건강·병원",       kw:["건강","병원","health","hospital","doctor","clinic"]},
    {id:"x20", no:"UNIT 20", name:"재활용",          kw:["재활용","분리수거","recycl","garbage","waste"]}
  ];

  /* ── ④ 롤플레이 6 ───────────────────────────────────────── */
  const ROLEPLAY = [
    {id:"r01", no:"UNIT 01", name:"면접관에게 질문하기",
     desc:"Ava(면접관)에게 거꾸로 3~4개 질문. 의문문 어순만 정확하면 쉬운 점수.",
     kw:["면접관","ask me three","ask me some questions","questions to me","ask ava"]},
    {id:"r02", no:"UNIT 02", name:"주어진 상황에서 직접 질문하기",
     desc:"매장·센터에 찾아가 직접 묻는 상황. 가격·시간·조건 3종 질문을 준비한다.",
     kw:["회원 등록","등록 문의","질문하기","직접 질문","ask three questions about"]},
    {id:"r03", no:"UNIT 03", name:"주어진 상황에서 전화로 질문하기",
     desc:"전화 문의. 인사 → 용건 → 질문 3개 → 감사 인사까지 통화 흐름을 지킨다.",
     kw:["전화로 질문","숙소 문의","예약 문의","여행사","전화 문의","문의","call the","calling to ask"]},
    {id:"r04", no:"UNIT 04", name:"상황 설명하고 대안 제시하기",
     desc:"문제가 생겼다고 알리고 두 가지 대안을 준다. 'Either ~ or ~' 구조가 핵심.",
     kw:["문제 해결","대안","분실","고장","broke","doesn't work","alternative","two options"]},
    {id:"r05", no:"UNIT 05", name:"상황 설명하고 부탁하기",
     desc:"사정을 말하고 부탁. 완곡한 요청 표현(I was wondering if…)을 반드시 넣는다.",
     kw:["부탁","변경 전화","약속 변경","favor","ask for help","wondering if you could"]},
    {id:"r06", no:"UNIT 06", name:"상황 설명하고 예매·약속하기",
     desc:"예약·예매 진행. 날짜·인원·시간 정보를 주고받는 실무 대화.",
     kw:["예매 문의","예매","예약 및","진료 예약","예약","reserve","reservation","make an appointment"]}
  ];

  const GROUPS = [
    {id:"type",     icon:"🎯", name:"유형 공략",   sub:"질문 방식 12가지",   items:TYPES,    axis:"type"},
    {id:"survey",   icon:"📋", name:"설문 주제",   sub:"자기가 고른 25개",   items:SURVEY,   axis:"unit"},
    {id:"surprise", icon:"⚡", name:"돌발 주제",   sub:"고르지 않아도 나온다 · 20개", items:SURPRISE, axis:"unit"},
    {id:"roleplay", icon:"🎭", name:"롤플레이",    sub:"11~13번 문항 · 6가지", items:ROLEPLAY, axis:"unit"}
  ];

  /* ── 문항 → 분류 태깅 ─────────────────────────────────────
     주제 칩은 먼저 topic(한글, 사람이 붙인 이름)만 보고 고른다.
     영어 질문문까지 한꺼번에 훑으면 "problem" 같은 흔한 단어가
     엉뚱한 유닛을 잡아채기 때문이다. topic 으로 못 찾을 때만
     category+question 까지 넓혀서 다시 본다. */
  const low = v => (v||"").toLowerCase();
  function pick(list,h){
    if(!h) return null;
    let best=null, bestLen=0;
    list.forEach(u=>{
      (u.kw||[]).forEach(k=>{
        if(h.indexOf(low(k))>=0 && k.length>bestLen){ best=u; bestLen=k.length; }
      });
    });
    return best;
  }
  /* 주제 칩 고르기는 두 표(설문·돌발)를 같은 단계에서 나란히 비교해야 한다.
     한쪽 표만 먼저 질문문까지 훑어 보면, 다른 표가 topic 으로 정확히 잡을
     항목을 흔한 영어 단어 하나로 가로채 간다. */
  function stage1(list,t){ return pick(list, low(t.topic)); }
  function stage2(list,t){ return pick(list, low(t.category)+" "+low(t.question)); }
  function pick2(list,t){ return stage1(list,t) || stage2(list,t); }
  function pickUnit(t,isSP){
    const first=isSP?SURPRISE:SURVEY, second=isSP?SURVEY:SURPRISE;
    const fid=isSP?"surprise":"survey", sid=isSP?"survey":"surprise";
    let u=stage1(first,t);   if(u) return {unit:u, group:fid};
    u=stage1(second,t);      if(u) return {unit:u, group:sid};
    u=stage2(first,t);       if(u) return {unit:u, group:fid};
    u=stage2(second,t);      if(u) return {unit:u, group:sid};
    return {unit:null, group:fid};
  }

  /* 유형은 "가장 긴 키워드"로 고르면 안 된다. 한 질문 안에 묘사·경험·
     문제가 겹쳐 나오므로, 강한 신호부터 차례로 보고 먼저 걸리는 것을
     쓴다. ko 는 한글 주제명, en 은 영어 질문문에 대는 자다. */
  const TYPE_RULES = [
    {id:"t01", ko:/자기소개/,                     en:/tell me about yourself|introduce yourself/},
    {id:"t10", ko:/문제 해결|문제와 해결|해결$/,  en:/problem|went wrong|injured|trouble|didn't work|broke down|kept you from/},
    {id:"t05", ko:/비교/,                         en:/compare|difference between|differences between|how are they different/},
    {id:"t09", ko:/변화|계기|시작하게|처음/,      en:/how has .{0,40}changed|how did you (start|get into|first)|very first|for the first time|used to be|compared to (the past|when)/},
    {id:"t12", ko:/문제점|이슈|의견|사회/,        en:/what do you think|your opinion|people (say|complain|feel)|problems people|concerns (about|people)|in your country/},
    {id:"t07", ko:/경험|기억에 남는|일화/,        en:/memorable|never forget|stuck with|stand out|why do you (still )?remember|tell me about a time|that happened|unexpected/},
    {id:"t08", ko:/순서|과정|절차/,               en:/step by step|from start to finish|beginning to end|the whole process|what do you do first/},
    {id:"t11", ko:/방법|규칙|방식 설명/,          en:/explain how|how it works|the rules|how do you (usually )?(prepare|make|do)/},
    {id:"t02", ko:/인물|가족|친구|이웃 사람/,     en:/describe (a |the |your )?(person|friend|family member)|who (is|are) (the|your)|person you/},
    {id:"t03", ko:/묘사|모습|장소|어디/,          en:/describe (a |the |your )?(place|park|cafe|coffee|restaurant|gym|studio|city|neighborhood|house|home|library|hotel|bank)|what (is|does) .{0,30}look like|where is it|what is the .{0,20}like/},
    {id:"t04", ko:/사물|장비|기기/,               en:/what equipment|describe (your|the) (bike|bicycle|instrument|phone|camera|gear)|your favorite (thing|item)/},
    {id:"t06", ko:/습관|경향|일과|평소/,          en:/what kind of|how often|usually|typically|typical|regularly|on a normal/}
  ];
  function pickType(t){
    const ko=t.topic||"", en=low(t.question)+" "+low(t.category);
    for(let i=0;i<TYPE_RULES.length;i++) if(TYPE_RULES[i].ko.test(ko)) return TYPE_RULES[i].id;
    for(let i=0;i<TYPE_RULES.length;i++) if(TYPE_RULES[i].en.test(en)) return TYPE_RULES[i].id;
    return null;
  }

  /** OPIc 문항 하나에 {unitGroup, unit, type} 을 붙인다. */
  function opicTag(t){
    const cat=t.category||"";
    const isRP=cat.indexOf("롤플레이")>=0;
    const isSP=cat.indexOf("돌발")>=0;

    let unitGroup, unit;
    if(isRP){
      unitGroup="roleplay"; unit=pick2(ROLEPLAY,t);
    }else{
      // 돌발로 분류된 문항은 돌발표를, 나머지는 설문표를 우선한다
      const r=pickUnit(t,isSP);
      unit=r.unit; unitGroup=r.group;
    }

    // 롤플레이는 유형 신호가 없으면 '규칙·방법 설명', 그 외에는 '습관·경향'
    const type = pickType(t) || (isRP?"t11":"t06");
    return {unitGroup:unitGroup, unit:unit?unit.id:null, type:type};
  }

  window.OPIC_NAV = {groups:GROUPS, types:TYPES, survey:SURVEY, surprise:SURPRISE, roleplay:ROLEPLAY};
  window.opicTag = opicTag;
})();
