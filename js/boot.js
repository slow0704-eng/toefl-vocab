/* ============================================================
   부팅
   ------------------------------------------------------------
   데이터 파일과 기능 파일이 모두 실린 뒤 마지막에 실행된다.
   여기서 하는 일은 두 가지뿐이다 — 데이터가 실렸는지 확인하고,
   각 파일이 A.onBoot() 로 걸어 둔 초기화를 순서대로 부르는 것.

   예전에는 이 자리에서 buildGramChips(), buildStructChips(),
   syncBrowseView() 처럼 각 패널의 내부 함수를 직접 불렀다. 그래서
   패널을 하나 늘릴 때마다 여기도 같이 고쳐야 했다. 지금은 패널이
   자기 init 을 레지스트리에 등록하고, 그 패널이 처음 열릴 때 불린다.
   ============================================================ */
(function (A) {
  "use strict";

  if(!A.WORDS.length){
    document.querySelector("main").innerHTML =
      '<div class="empty" style="margin-top:40px">words.js 를 불러오지 못했습니다.</div>';
    return;
  }

  A.updateProgress();
  A._runBoot();

})(window.APP);
