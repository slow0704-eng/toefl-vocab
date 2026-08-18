/* ============================================================
   시험 정보 — 6개 시험 비교표
   ------------------------------------------------------------
   문제 수·시간·과목·유형·점수를 한 화면에서 견준다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        esc = A.esc;

  // ---- 시험 정보 ----
  const EXAMS = window.EXAM_INFO || [];
  let infoId = EXAMS.length ? EXAMS[0].id : null;
  function renderInfo(){
    if(!EXAMS.length){ $("info-body").innerHTML='<div class="empty">exams.js 를 불러오지 못했습니다.</div>'; return; }
    $("info-tabs").innerHTML=EXAMS.map(e=>
      '<button class="tp-chip" data-ex="'+e.id+'" aria-pressed="'+(infoId===e.id)+'">'+e.icon+' '+esc(e.name)+'</button>').join('')+
      '<button class="tp-chip" data-ex="__all" aria-pressed="'+(infoId==="__all")+'">📊 한눈에 비교</button>';
    $("info-tabs").querySelectorAll("[data-ex]").forEach(b=>b.addEventListener("click",()=>{ infoId=b.dataset.ex; renderInfo(); }));
    if(infoId==="__all"){ renderCompare(); return; }
    const e=EXAMS.filter(x=>x.id===infoId)[0]||EXAMS[0];
    $("info-body").innerHTML=
      '<div class="ex-hero" style="background:linear-gradient(135deg,'+e.color+','+e.color+'cc)">'+
        '<h2>'+e.icon+' '+esc(e.name)+'</h2><div class="full">'+esc(e.full)+'</div>'+
        '<div class="ex-meta">'+
          '<div><span>총 시험 시간</span><b>'+esc(e.total)+'</b></div>'+
          '<div><span>점수 체계</span><b>'+esc(e.score)+'</b></div>'+
          '<div><span>성적 유효기간</span><b>'+esc(e.validity)+'</b></div>'+
          '<div><span>응시 방식</span><b>'+esc(e.format)+'</b></div>'+
        '</div></div>'+
      '<div class="ex-block"><h3>🎯 주요 용도</h3><ul class="ex-list"><li>'+esc(e.purpose)+'</li></ul></div>'+
      '<div class="ex-block"><h3>📋 구성 · 문제 수 · 시간</h3>'+
        '<table class="ex-sec"><thead><tr><th>영역</th><th>문항</th><th>시간</th><th>내용</th></tr></thead><tbody>'+
        e.sections.map(s=>'<tr><td>'+esc(s.name)+'</td><td class="num">'+esc(s.q)+'</td><td class="time">'+esc(s.time)+'</td><td>'+esc(s.detail||"")+'</td></tr>').join('')+
        '</tbody></table></div>'+
      '<div class="ex-block"><h3>🧩 출제 유형</h3><ul class="ex-list">'+e.types.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div>'+
      '<div class="ex-block"><h3>💡 알아두면 좋은 점</h3><ul class="ex-list tip">'+e.tips.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div>';
  }
  function renderCompare(){
    const rows=[
      ["시험", e=>e.icon+" "+e.name],
      ["주요 용도", e=>e.purpose],
      ["총 시간", e=>e.total],
      ["문항 수", e=>e.sections.map(s=>s.q).filter(q=>q!=="—").join(" + ")],
      ["영역", e=>e.sections.map(s=>s.name).join(" · ")],
      ["점수", e=>e.score],
      ["유효기간", e=>e.validity],
      ["응시 방식", e=>e.format]
    ];
    $("info-body").innerHTML='<div class="ex-table-wrap"><table class="ex-compare"><tbody>'+
      rows.map(r=>'<tr><td>'+r[0]+'</td>'+EXAMS.map(e=>'<td>'+esc(r[1](e))+'</td>').join('')+'</tr>').join('')+
      '</tbody></table></div>'+
      '<div class="det-desc" style="margin-top:12px">※ 가로로 스크롤하면 6개 시험을 모두 비교할 수 있습니다.</div>';
  }



  /* ── 패널 등록 ──────────────────────────────────────────── */
  A.panel({ id:"info", wide:true, init(){ renderInfo(); } });

})(window.APP);
