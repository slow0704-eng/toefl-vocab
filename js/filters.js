/* ============================================================
   난이도 × 주제 교차 필터 (패널별 독립 상태)
   ------------------------------------------------------------
   카드·퀴즈·단어장이 각자 자기 필터를 갖는다. 한쪽을 고르면 반대쪽 칩의
   개수가 다시 계산돼야 해서 두 축을 한 객체로 묶어 둔다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        esc = A.esc,
        LV = A.LV,
        LV_DEFS = A.LV_DEFS,
        WORD_TOPICS = A.WORD_TOPICS,
        WORDS = A.WORDS;

  // ---- 난이도 + 주제 필터 (패널별 독립 상태) ----
  // prefix-lv / prefix-topic 두 칩 줄을 만들고, 서로의 선택을 반영해 개수를 다시 계산한다.
  function makeWordFilter(prefix, onChange){
    const lvBox=$(prefix+"-lv"), tpBox=$(prefix+"-topic");
    const st={lv:0, topic:"all"};
    function match(w){ return (st.lv===0||w.level===st.lv)&&(st.topic==="all"||w.topic===st.topic); }
    function build(){
      const inTopic = WORDS.filter(w=>st.topic==="all"||w.topic===st.topic);
      lvBox.innerHTML = LV_DEFS.map(function(d){
        const v=d[0], label=d[1], col=d[2];
        const cnt = v===0?inTopic.length:inTopic.filter(w=>w.level===v).length;
        const dot = v===0?"":'<span class="dot" style="background:var('+col+')"></span>';
        return '<button class="lv-chip" data-lv="'+v+'" aria-pressed="'+(st.lv===v)+'">'+dot+label+' <span style="opacity:.7">'+cnt+'</span></button>';
      }).join("");
      if(tpBox){
        const inLv = WORDS.filter(w=>st.lv===0||w.level===st.lv);
        tpBox.innerHTML = '<button class="tp-chip" data-tp="all" aria-pressed="'+(st.topic==="all")+'">🗂 전체 주제<span class="c">'+inLv.length+'</span></button>'+
          WORD_TOPICS.map(function(t){
            const c=inLv.filter(w=>w.topic===t).length;
            return '<button class="tp-chip" data-tp="'+esc(t)+'" aria-pressed="'+(st.topic===t)+'"'+(c?'':' style="opacity:.35"')+'>'+esc(t)+'<span class="c">'+c+'</span></button>';
          }).join("");
        tpBox.querySelectorAll(".tp-chip").forEach(b=>b.addEventListener("click",()=>{ st.topic=b.dataset.tp; build(); onChange(); }));
      }
      lvBox.querySelectorAll(".lv-chip").forEach(b=>b.addEventListener("click",()=>{ st.lv=parseInt(b.dataset.lv,10); build(); onChange(); }));
    }
    build();
    return {match:match, state:st, build:build,
      desc:function(){ return (st.lv===0?"전체 난이도":LV[st.lv].n)+" · "+(st.topic==="all"?"전체 주제":st.topic); }};
  }


  Object.assign(A, {
    makeWordFilter
  });

})(window.APP);
