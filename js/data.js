/* ============================================================
   데이터 레지스트리
   ------------------------------------------------------------
   데이터 파일(words.js, topics-*.js, speaking-*.js …)은 각자
   window.<이름> 에 배열을 싣고 끝난다. 그것을 여기서 이름 규칙으로
   모아 하나의 풀로 만든다.

   왜 규칙으로 모으는가
   --------------------
   예전에는 앱 코드가 파일 이름을 하나하나 알고 있었다.

       (window.TOPIC_READING||[])
         .concat(window.TOPIC_READING_EXTRA||[])
         .concat(window.TOPIC_READING_POTTER||[])
         .concat(window.TOPIC_READING_TOLKIEN2||[])

   지문 파일을 하나 추가할 때마다 이 줄과 푸터 집계, index.html 세 군데를
   고쳐야 했고, 실제로 한 군데를 빠뜨려 지문이 안 보이는 일이 있었다.
   이제는 이름 규칙만 지키면 앱 코드를 건드릴 필요가 없다.

       window.TOPIC_READING_*   → 관심주제 지문
       window.SPEAKING_TOPICS_* → 스피킹·라이팅·리딩 문항
       window.PART7_EXTRA       → Part 7 멀티지문 세트

   window 의 키 순서는 스크립트 로드 순서와 같으므로, 모으는 순서도
   index.html 에 적힌 순서 그대로다.
   ============================================================ */
(function (A) {
  "use strict";

  /** 이름이 규칙에 맞는 전역 배열을 로드 순서대로 이어 붙인다 */
  function collect(re){
    const out = [];
    Object.keys(window).forEach(k=>{
      if(re.test(k) && Array.isArray(window[k])) out.push.apply(out, window[k]);
    });
    return out;
  }
  const arr = name => Array.isArray(window[name]) ? window[name] : [];

  /* ── 어휘 ────────────────────────────────────────────────── */
  const WORDS = (window.TOEFL_WORDS || []).slice();
  // 실제로 단어가 붙어 있는 주제만, 정해진 순서대로
  const WORD_TOPICS = (function(){
    const have = {}; WORDS.forEach(w=>{ if(w.topic) have[w.topic]=1; });
    const list = A.TOPIC_ORDER.filter(t=>have[t]);
    Object.keys(have).forEach(t=>{ if(list.indexOf(t)<0) list.push(t); });
    return list;
  })();

  /* ── 스피킹·라이팅·리딩 문항 ─────────────────────────────── */
  const TOPICS = collect(/^SPEAKING_TOPICS(_|$)/);

  /* ── 관심주제 리딩 풀 ────────────────────────────────────
     단일 지문(관심주제 + Part 7 전반부) + 멀티 지문 세트를 한 배열로.
     멀티 세트는 문서 여러 개를 이어 붙여 passage/ko 를 만들어 둔다.
     검색과 음성 재생이 단일 지문과 같은 필드를 쓰기 때문이다. */
  const TR = (function(){
    const list = collect(/^TOPIC_READING(_|$)/).concat(arr('PART7_SINGLE'));
    arr('PART7').concat(arr('PART7_EXTRA')).forEach(function(s){
      list.push(Object.assign({}, s, {
        passage: s.docs.map(d=>"["+d.label+"]\n\n"+d.en).join("\n\n\n"),
        ko:      s.docs.map(d=>"["+d.label+"]\n\n"+d.ko).join("\n\n\n")
      }));
    });
    return list;
  })();

  /* ── 푸터·홈 화면이 쓰는 집계 ────────────────────────────
     세는 규칙이 한 군데에만 있도록 모아 둔다. */
  function stats(){
    const d = window.DET_DATA || {}, dx = window.DET_EXTRA || {};
    // Interactive Reading/Listening 은 세트가 아니라 실제 문항 수로 센다
    const irQ = (dx.interactiveReading||[]).reduce((n,s)=>n+s.qs.length,0);
    const ilQ = (dx.interactiveListening||[]).reduce((n,s)=>n+s.p1.length+s.p2.length+1,0);
    const p7sets = arr('PART7').concat(arr('PART7_EXTRA'), arr('PART7_SINGLE'));
    return {
      words:    WORDS.length,
      speaking: TOPICS.length,
      gram:     arr('GRAMMAR_QUESTIONS').length,
      struct:   arr('STRUCTURES').length,
      slang:    arr('SLANG').length,
      p6:       arr('PART6').reduce((n,p)=>n+p.qs.length,0),
      p7:       p7sets.reduce((n,p)=>n+p.qs.length,0),
      det:      (d.readComplete||[]).length + (d.listenType||[]).length +
                (d.passageComplete||[]).length + (d.writeSpeak||[]).length +
                (d.readSelect ? d.readSelect.fake.length : 0) +
                (dx.fillBlanks||[]).length + irQ + ilQ +
                (dx.writeSpeakExtra||[]).length +
                ((dx.readSelectExtra||{}).fake||[]).length,
      reading:  TR.length,
      readingQ: TR.reduce((n,p)=>n+(p.qs?p.qs.length:0),0),
      opic:     TOPICS.filter(t=>t.exam==="OPIc").length,
      ptype:    arr('PASSAGES').length,
      // 홈 화면 시험 카드용
      toeflRead:  TOPICS.filter(t=>t.exam==="TOEFL Reading").length,
      toeflSpeak: TOPICS.filter(t=>t.exam==="TOEFL"||t.exam==="TOEFL Writing").length,
      toeicSpeak: TOPICS.filter(t=>t.exam==="TOEIC").length
    };
  }

  Object.assign(A, { WORDS, WORD_TOPICS, TOPICS, TR, stats });

})(window.APP);
