/* ============================================================
   콤보 · 효과음 · 색종이
   ------------------------------------------------------------
   퀴즈·문법·구문·슬랭·DET·관심주제·Part 6·지문유형이 전부 같은 콤보
   규칙을 쓴다. 패널마다 mode 문자열만 다르고 나머지는 공통이다.
   효과음은 음원 파일 없이 WebAudio 로 즉석 생성한다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        ls = A.ls;

  /* 효과음 on/off 와 "모션 줄이기" 설정은 효과를 내는 쪽이 갖는다.
     예전에는 퀴즈 패널이 들고 있어서, 콤보 코드가 퀴즈 내부 변수를
     들여다봐야 했다. 토글 버튼은 퀴즈 화면에 있지만 상태는 여기 있다. */
  const SOUND_KEY="toefl-vocab-quiz-sound";
  let soundOn = ls.get(SOUND_KEY,"on")!=="off";
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSoundOn = () => soundOn;
  /** 효과음을 켜고 끈다. 새 상태를 돌려준다. */
  function toggleSound(){
    soundOn=!soundOn; ls.set(SOUND_KEY,soundOn?"on":"off");
    if(soundOn)beep("ok");
    return soundOn;
  }

  // ---- 콤보 (연속 정답) — 어휘 퀴즈·문법 공용 ----
  const COMBO_KEY="toefl-vocab-best-combo";
  let bestCombo=(function(){ const v=ls.getJSON(COMBO_KEY,null); return (v&&typeof v==="object")?{quiz:v.quiz||0,gram:v.gram||0,det:v.det||0,iread:v.iread||0,ilisten:v.ilisten||0,struct:v.struct||0,slang:v.slang||0,topic:v.topic||0,ptype:v.ptype||0,spass:v.spass||0}:{quiz:0,gram:0,det:0,iread:0,ilisten:0,struct:0,slang:0,topic:0,ptype:0,spass:0}; })();
  function saveBestCombo(){ ls.setJSON(COMBO_KEY,bestCombo); }
  // 연속 정답 수에 따라 등급이 올라간다
  const COMBO_TIERS=[
    {min:15,icon:"👑",name:"전설",cls:"t5"},
    {min:10,icon:"🌟",name:"압도적",cls:"t4"},
    {min:7, icon:"💎",name:"완벽 모드",cls:"t3"},
    {min:5, icon:"⚡",name:"무서운 기세",cls:"t2"},
    {min:3, icon:"🔥",name:"불붙었다",cls:"t1"},
    {min:2, icon:"🔥",name:"",cls:"t0"}
  ];
  function comboTier(n){ for(let i=0;i<COMBO_TIERS.length;i++){ if(n>=COMBO_TIERS[i].min)return COMBO_TIERS[i]; } return null; }
  function comboBadge(n){
    const t=comboTier(n); if(!t)return "";
    return '<span class="streak '+t.cls+'">'+t.icon+' '+n+'연속'+(t.name?' · '+t.name:'')+'</span>';
  }
  // 3·5·7·10연속과 그 이후 5의 배수, 그리고 신기록에서 화면 중앙 팝업
  function comboPopup(n,record){
    if(reduceMotion)return;
    const milestone = n>=3 && (n<10 ? (n===3||n===5||n===7) : n%5===0);
    if(!milestone && !record)return;
    const t=comboTier(n)||COMBO_TIERS[COMBO_TIERS.length-1];
    const old=document.querySelector(".combo-pop"); if(old&&old.parentNode)old.parentNode.removeChild(old); // 빠르게 연달아 맞혀도 겹치지 않게
    const el=document.createElement("div");
    el.className="combo-pop";
    el.innerHTML='<div class="n">'+t.icon+' '+n+' COMBO</div>'+
      (record?'<div class="rec">🏆 신기록!</div>':'')+
      (t.name?'<div class="t">'+t.name+'!</div>':'');
    document.body.appendChild(el);
    setTimeout(()=>{ if(el.parentNode)el.parentNode.removeChild(el); },1400);
  }
  // 정답 처리 공용: 콤보 갱신 → 신기록 여부 반환
  // 신기록 축하는 한 연속(streak)당 한 번만 — 매 문제마다 뜨면 감흥이 없다
  function registerCombo(sess,mode){
    const s=sess.streak;
    if(s===1) sess.streakBase=bestCombo[mode];   // 이번 연속이 넘어야 할 기준 기록
    let record=false;
    if(s>=3 && s>(sess.streakBase||0) && !sess.recordShown){ record=true; sess.recordShown=true; }
    if(s>bestCombo[mode]){ bestCombo[mode]=s; saveBestCombo(); }
    return record;
  }
  function bestLabel(mode){ return bestCombo[mode]>=2 ? ' <span class="best-combo">· 최고 🔥'+bestCombo[mode]+'</span>' : ''; }
  // 결과 화면의 콤보 요약 — 개인 기록과 비교해 다음 도전 목표를 보여준다
  function comboSummary(s,mode){
    if(!s)return "";
    const newRec = s.best>=3 && s.best>s.prevBest;
    const need = bestCombo[mode]+1-s.best;
    return '<div class="combo-sum">'+
      '<div class="cs-row"><span>이번 판 최고 콤보</span>'+(s.best>=2?comboBadge(s.best):'<b>🔥 '+s.best+'연속</b>')+'</div>'+
      '<div class="cs-row"><span>개인 최고 기록</span><b>🏆 '+bestCombo[mode]+'연속</b></div>'+
      (newRec?'<div class="cs-new">🎊 신기록 달성!</div>'
             :(need>0&&need<=5?'<div class="cs-hint">기록 경신까지 '+need+'연속 남았어요!</div>':''))+
    '</div>';
  }

  // 정답/오답 효과음 (WebAudio — 외부 파일 없이 즉석 생성)
  let audioCtx=null;
  function beep(kind,combo){
    if(!soundOn)return;
    try{
      const AC=window.AudioContext||window.webkitAudioContext; if(!AC)return;
      audioCtx=audioCtx||new AC();
      if(audioCtx.state==="suspended")audioCtx.resume();
      // 콤보가 쌓일수록 반음씩 높아져 상승감을 준다 (최대 1옥타브)
      const m=Math.pow(2,Math.min(12,Math.max(0,(combo||1)-1))/12);
      const notes = kind==="ok" ? [[784*m,0,.10],[1175*m,.08,.20]] : [[233,0,.14],[175,.10,.20]];
      notes.forEach(n=>{
        const o=audioCtx.createOscillator(), g=audioCtx.createGain();
        o.type = kind==="ok" ? "triangle" : "sawtooth";
        o.frequency.value=n[0];
        const t0=audioCtx.currentTime+n[1];
        g.gain.setValueAtTime(.0001,t0);
        g.gain.exponentialRampToValueAtTime(kind==="ok"?.16:.10,t0+.015);
        g.gain.exponentialRampToValueAtTime(.0001,t0+n[2]);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t0); o.stop(t0+n[2]+.03);
      });
    }catch(e){}
  }
  // 색종이 (DOM 파티클 — 라이브러리 없이)
  function confetti(count){
    if(reduceMotion)return;
    let box=$("confetti");
    if(!box){ box=document.createElement("div"); box.id="confetti"; document.body.appendChild(box); }
    const colors=["#4f46e5","#7c3aed","#16a34a","#f59e0b","#ec4899","#06b6d4"];
    for(let i=0;i<count;i++){
      const d=document.createElement("i");
      d.style.left=(50+(Math.random()*36-18))+"%";
      d.style.top="38%";
      d.style.background=colors[i%colors.length];
      d.style.setProperty("--dx",((Math.random()*2-1)*300)+"px");
      d.style.setProperty("--dy",(220+Math.random()*320)+"px");
      d.style.setProperty("--rot",((Math.random()*900-450))+"deg");
      d.style.animationDuration=(.9+Math.random()*.7)+"s";
      d.style.animationDelay=(Math.random()*.14)+"s";
      box.appendChild(d);
      setTimeout(()=>{ if(d.parentNode)d.parentNode.removeChild(d); },2000);
    }
  }
  /* 정답 + 오답 3개를 섞어 돌려준다.
     prefer 로 비슷한 후보(같은 난이도·같은 품사)를 먼저 채워 문제를 어렵게 만들고,
     모자라면 전체에서 보충한다. keyOf 로 화면에 보이는 문구가 겹치지 않게 막는다. */

  Object.assign(A, {
    isSoundOn, toggleSound, beep, confetti, comboBadge, comboPopup, comboSummary, registerCombo, bestCombo, bestLabel
  });

})(window.APP);
