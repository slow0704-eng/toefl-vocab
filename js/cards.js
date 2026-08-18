/* ============================================================
   문항 카드 (스피킹·라이팅·리딩·OPIc 공용)
   ------------------------------------------------------------
   접었다 펴는 카드 하나에 질문·답변·번역·핵심표현·팁과 재생 버튼이 들어간다.
   네 패널이 같은 마크업을 쓰되 라벨만 달라서, 설정 객체 C 를 받아 처리한다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        qsa = A.qsa,
        esc = A.esc,
        EXAM_CLS = A.EXAM_CLS,
        EXAM_NAME = A.EXAM_NAME,
        stopSpeak = A.stopSpeak,
        speakBest = A.speakBest,
        ttsDownload = A.ttsDownload,
        scriptDownload = A.scriptDownload;

  // ---- 문항 카드 (스피킹·라이팅·리딩·OPIc 공용) ----
  function spItemMarkup(t,i,C){
    const examCls=EXAM_CLS[t.exam]||"opic";
    const examName=EXAM_NAME[t.exam]||t.exam;
    const kx=(t.keyExpressions||[]).map(k=>'<div><b>'+esc(k.en)+'</b><span>'+esc(k.ko)+'</span></div>').join('');
    return '<div class="sp-item" data-i="'+i+'">'+
      '<div class="sp-head">'+
        '<div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="exam-badge '+examCls+'">'+esc(examName)+'</span>'+
            (t.category?'<span class="cat-badge">'+esc(t.category)+'</span>':'')+
            (t.topic?'<span class="topic-badge">'+esc(t.topic)+'</span>':'')+
            (t.targetLevel?'<span class="lvl-badge">'+esc(t.targetLevel)+'</span>':'')+'</div>'+
          '<div class="sp-q">'+(C.HEAD_TOPIC?esc(t.topic):esc(t.question).replace(/\n/g,"<br/>"))+'</div>'+
        '</div>'+
        '<div class="sp-toggle">▼</div>'+
      '</div>'+
      '<div class="sp-body">'+
        (C.HEAD_TOPIC?'<div class="sp-sec-title">'+C.PASSAGE_TITLE+'</div><div class="passage">'+esc(t.question).replace(/\n/g,"<br/>")+'</div>':'')+
        '<div class="sp-controls">'+
          '<button data-act="play">▶ '+C.PLAY+'</button>'+
          '<button data-act="dl">⬇ 음성</button><button data-act="dltxt">📄 대본</button>'+
          '<button data-act="stop">■ 정지</button>'+
          '<button data-act="ko" aria-pressed="false">🇰🇷 '+C.KO_LABEL+'</button>'+
        '</div>'+
        (C.ANS_TITLE?'<div class="sp-sec-title">'+C.ANS_TITLE+'</div>':'')+
        '<div class="ans en-text">'+esc(t.answerEn).replace(/\n/g,"<br/>")+'</div>'+
        '<div class="ans ko-text" style="display:none;margin-top:10px">'+esc(t.answerKo).replace(/\n/g,"<br/>")+'</div>'+
        (kx?'<div class="sp-sec-title">💡 핵심 표현</div><div class="kx">'+kx+'</div>':'')+
        (t.tips?'<div class="sp-sec-title">🎯 고득점 팁</div><div class="tips">'+esc(t.tips)+'</div>':'')+
      '</div>'+
    '</div>';
  }
  /* 재생 중 다른 항목을 누르면 speak() 가 이전 발화를 취소하는데,
     취소된 발화의 onend 는 브라우저마다 오지 않아 이전 버튼이
     "재생 중…" 에 멈춰 있었다. 새로 재생하기 전에 전부 되돌린다. */
  function spResetPlay(box,C){ qsa('[data-act="play"]',box).forEach(b=>{ b.textContent="▶ "+C.PLAY; }); }

  function spBind(box,slice,C,moreId,onMore){
    qsa(".sp-item",box).forEach(item=>{
      const t=slice[parseInt(item.dataset.i,10)];
      item.querySelector(".sp-head").addEventListener("click",()=>{ const open=item.classList.toggle("open"); if(!open){ stopSpeak(); spResetPlay(box,C); } });
      const playBtn=item.querySelector('[data-act="play"]');
      playBtn.addEventListener("click",e=>{
        e.stopPropagation();
        spResetPlay(box,C);
        playBtn.textContent="🔊 재생 중…";
        speakBest(t.answerEn,{rate:.92,onend:()=>{ playBtn.textContent="▶ "+C.PLAY; }});
      });
      item.querySelector('[data-act="stop"]').addEventListener("click",e=>{ e.stopPropagation(); stopSpeak(); spResetPlay(box,C); });
      const dlName=(t.topic||t.category||"answer");
      item.querySelector('[data-act="dl"]').addEventListener("click",e=>{ e.stopPropagation(); ttsDownload(t.answerEn,dlName); });
      item.querySelector('[data-act="dltxt"]').addEventListener("click",e=>{ e.stopPropagation();
        scriptDownload([t.topic||"",t.question||"","",t.answerEn,"","--- 한글 ---","",t.answerKo||""].join("\n"),dlName); });
      const koBtn=item.querySelector('[data-act="ko"]');
      koBtn.addEventListener("click",e=>{ e.stopPropagation(); const on=koBtn.getAttribute("aria-pressed")==="true"; koBtn.setAttribute("aria-pressed",!on); item.querySelector(".ko-text").style.display=on?"none":"block"; });
    });
    const more=moreId&&$(moreId);
    if(more&&onMore) more.addEventListener("click",onMore);
  }


  Object.assign(A, {
    spItemMarkup, spBind
  });

})(window.APP);
