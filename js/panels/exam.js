/* ============================================================
   스피킹 · 라이팅 · 리딩 (공용 패널 생성기)
   ------------------------------------------------------------
   세 화면이 같은 구조라 makeExamPanel 하나로 만든다. 다루는 시험 목록과
   라벨만 다르다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        esc = A.esc,
        TOPICS = A.TOPICS,
        spItemMarkup = A.spItemMarkup,
        spBind = A.spBind;

  // ---- 스피킹 · 라이팅 · 리딩 (공용 패널) ----
  // prefix: DOM id 접두사, exams: 이 패널이 다루는 시험 목록, playLabel: 음성 버튼 문구
  function makeExamPanel(prefix, exams, opt){
    opt = opt || {};
    const POOL = TOPICS.filter(t=>exams.indexOf(t.exam)>=0);
    const EXAM_PAGE = 40;              // 리딩 200문항을 한 번에 그리지 않는다
    let shown = EXAM_PAGE;
    let fExam="all", fCat="all", fTopic="all", fLevel="all";
    const byExam = t => fExam==="all"||t.exam===fExam;
    const examBox = $(prefix+"-exam");
    const levelBox = $(prefix+"-level");

    $(prefix+"-search").addEventListener("input",()=>render());
    if(exams.length>1 && examBox){
      examBox.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
        examBox.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
        fExam=b.dataset.exam; fCat="all"; fTopic="all"; buildCats(); buildTopics(); render();
      }));
    }

    function buildLevels(){
      if(!levelBox)return;
      const lvs=Array.from(new Set(POOL.map(t=>t.targetLevel).filter(Boolean)));
      levelBox.innerHTML='<button data-lvf="all" aria-pressed="true">'+(opt.levelAllLabel||"전체 유형")+'</button>'+
        lvs.map(c=>'<button data-lvf="'+esc(c)+'" aria-pressed="false">'+esc(c)+'</button>').join('');
      levelBox.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
        levelBox.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
        fLevel=b.dataset.lvf; render();
      }));
    }
    function buildCats(){
      const cats=Array.from(new Set(POOL.filter(byExam).map(t=>t.category).filter(Boolean)));
      $(prefix+"-cat").innerHTML='<button data-cat="all" aria-pressed="true">전체 분류</button>'+
        cats.map(c=>'<button data-cat="'+esc(c)+'" aria-pressed="false">'+esc(c)+'</button>').join('');
      $(prefix+"-cat").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
        $(prefix+"-cat").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
        fCat=b.dataset.cat; fTopic="all"; buildTopics(); render();
      }));
    }
    function buildTopics(){
      const box=$(prefix+"-topic");
      const tops=fCat==="all"?[]:Array.from(new Set(POOL.filter(t=>byExam(t)&&t.category===fCat).map(t=>t.topic).filter(Boolean)));
      if(tops.length<2){ box.innerHTML=""; box.style.display="none"; return; }
      box.style.display="flex";
      box.innerHTML='<button data-top="all" aria-pressed="true">전체 상세주제</button>'+
        tops.map(c=>'<button data-top="'+esc(c)+'" aria-pressed="false">'+esc(c)+'</button>').join('');
      box.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
        box.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
        fTopic=b.dataset.top; render();
      }));
    }
    function itemMarkup(t,i){ return spItemMarkup(t,i,CFG); }

    function bind(box,slice){ spBind(box,slice,CFG,prefix+"-more",()=>{ shown+=EXAM_PAGE; render(false); }); }

    /** @param {boolean} [resetPage=true] false 면 "더 보기"로 펼친 범위를 유지한다. */
    function render(resetPage){
      if(resetPage!==false) shown=EXAM_PAGE;
      const q=($(prefix+"-search").value||"").trim().toLowerCase();
      const list=POOL.filter(t=>{
        if(!byExam(t))return false;
        if(fCat!=="all"&&t.category!==fCat)return false;
        if(fTopic!=="all"&&t.topic!==fTopic)return false;
        if(fLevel!=="all"&&t.targetLevel!==fLevel)return false;
        if(q&&!((t.question||"").toLowerCase().includes(q)||(t.category||"").toLowerCase().includes(q)||(t.topic||"").toLowerCase().includes(q)||(t.answerEn||"").toLowerCase().includes(q)||(t.answerKo||"").includes(q)))return false;
        return true;
      });
      $(prefix+"-count").textContent=list.length+"개 문항";
      const box=$(prefix+"-list");
      if(!list.length){ box.innerHTML='<div class="empty">해당하는 주제가 없습니다.</div>'; return; }
      const slice=list.slice(0,shown);
      box.innerHTML=slice.map(itemMarkup).join('')+
        (list.length>shown
          ? '<button class="more-btn" id="'+prefix+'-more">더 보기 · '+(list.length-shown)+'개 남음</button>'
          : '');
      bind(box,slice);
    }

    const HEAD_TOPIC = !!opt.headTopic;
    const PASSAGE_TITLE = opt.passageTitle || "📄 지문·문제";
    const PLAY = opt.playLabel || "원어민 음성";
    const KO_LABEL = opt.koLabel || "한글 번역";
    const ANS_TITLE = opt.ansTitle || "";
    const CFG = {HEAD_TOPIC:HEAD_TOPIC, PASSAGE_TITLE:PASSAGE_TITLE, PLAY:PLAY, KO_LABEL:KO_LABEL, ANS_TITLE:ANS_TITLE};
    buildLevels(); buildCats(); buildTopics();
    return render;
  }

  const renderSpeak = makeExamPanel("speak",["OPIc","TOEIC","TOEFL"]);
  const renderWrite  = makeExamPanel("write",["TOEFL Writing"],{playLabel:"에세이 낭독",ansTitle:"📝 모범 답안",headTopic:true,passageTitle:"📄 문제 (지문·강의·토론)"});
  const renderRead   = makeExamPanel("read",["TOEFL Reading"],{playLabel:"영어 해설 듣기",koLabel:"한글 해설",ansTitle:"✅ 정답·풀이",levelAllLabel:"전체 문제 유형",headTopic:true,passageTitle:"📄 지문·문제"});



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"speak", wide:true, init(){ renderSpeak(); }, resume(){ renderSpeak(); } });
  A.panel({ id:"write", wide:true, init(){ renderWrite(); }, resume(){ renderWrite(); } });
  A.panel({ id:"read",  wide:true, init(){ renderRead();  }, resume(){ renderRead();  } });

})(window.APP);
