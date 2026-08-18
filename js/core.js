/* ============================================================
   코어 — 네임스페이스 · 상수 · 유틸 · 학습 기록 · 패널 레지스트리
   ------------------------------------------------------------
   빌드 도구 없이 file:// 로도 열려야 하므로 ES 모듈을 쓸 수 없다.
   대신 파일마다

       (function (A) { "use strict";
         const esc = A.esc, $ = A.$;      // 쓰는 것만 별칭
         …
         Object.assign(A, { … });         // 이 파일이 공개하는 것
       })(window.APP);

   형태로 감싼다. 전역에 나가는 이름은 window.APP 하나뿐이고, 나머지는
   각 파일의 지역 변수로 남는다. 별칭을 쓰므로 본문에서 esc(x) 를
   A.esc(x) 로 고칠 필요가 없다 — 분할 전후로 본문이 그대로다.

   패널 레지스트리
   ----------------
   예전에는 화면 전환 함수 하나가 모든 패널의 내부 함수를 직접 불렀다.
   패널을 하나 늘리려면 그 함수, 부팅 코드, 내비 설정, HTML 네 군데를
   고쳐야 했고 그래서 패널 내부가 전부 공개돼 있었다. 이제는 각 패널이
   스스로 등록한다.

       A.panel({ id:"gram", wide:true,
                 init(){ …처음 열릴 때… },
                 resume(){ …다시 열릴 때… } });

   내비게이션은 이 레지스트리만 본다.
   ============================================================ */
window.APP = window.APP || {};
(function (A) {
  "use strict";

  const LS_KEY = "toefl-vocab-progress-v1";
  const THEME_KEY = "toefl-vocab-theme";
  const FS_KEY = "toefl-vocab-fontsize";
  const LV = {1:{n:"기초",c:"l1"},2:{n:"중급",c:"l2"},3:{n:"고급",c:"l3"},4:{n:"최고급",c:"l4"}};
  const LV_DEFS = [[0,"전체","--accent"],[1,"기초","--lv1"],[2,"중급","--lv2"],[3,"고급","--lv3"],[4,"최고급","--lv4"]];
  const TOPIC_ORDER = ["학문·연구","자연·환경","생물·의학","과학·기술","사회·정치","경제·경영","역사·문화","예술·문학","심리·감정","언어·논증","변화·수량","성질·상태","행동·관계"];

  const EXAM_CLS = {"OPIc":"opic","TOEFL":"toefl","TOEIC":"toeic","TOEFL Writing":"write","TOEFL Reading":"read"};
  const EXAM_NAME = {"OPIc":"OPIc","TOEFL":"TOEFL Speaking","TOEIC":"TOEIC Speaking","TOEFL Writing":"TOEFL Writing","TOEFL Reading":"TOEFL Reading"};

  const AB = ["A","B","C","D"];

  // ---- 유틸 ----
  const $ = id => document.getElementById(id);
  const qsa = (sel,root) => Array.prototype.slice.call((root||document).querySelectorAll(sel));
  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function escapeReg(s){ return String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }

  // localStorage 는 사파리 프라이빗 모드 등에서 던질 수 있어 전부 감싼다.
  const ls = {
    get(k,d){ try{ const v=localStorage.getItem(k); return v===null?d:v; }catch(e){ return d; } },
    set(k,v){ try{ localStorage.setItem(k,String(v)); }catch(e){} },
    getJSON(k,d){ try{ return JSON.parse(localStorage.getItem(k)) || d; }catch(e){ return d; } },
    setJSON(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }
  };

  // 셔플은 카드 순서·퀴즈 출제·보기 뽑기 등 여러 곳에서 쓰인다.
  function shuffleInPlace(a){
    for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
    return a;
  }
  const shuffled = a => shuffleInPlace(a.slice());

  /* 철자가 바뀌는 굴절형을 잡기 위한 어간.
       modify  → modifi (modified / modifies)
       compile → compil (compiling / compiled)
     규칙이 없으면 null. */
  function inflectionStem(word){
    if(/y$/i.test(word)) return escapeReg(word.slice(0,-1))+"i";
    if(/e$/i.test(word)) return escapeReg(word.slice(0,-1));
    return null;
  }
  /* 예문에서 표제어가 나타난 위치를 찾는다.
     원형이 그대로 있으면 그것을 먼저 쓴다 — 어간까지 넓히면
     cite 가 city 를 잡는 식의 오탐이 생긴다. */
  function findInflection(word,text){
    if(!text) return null;
    let m = new RegExp("\\b"+escapeReg(word)+"\\w*","i").exec(text);
    if(m) return {index:m.index, text:m[0]};
    const stem = inflectionStem(word);
    if(!stem) return null;
    m = new RegExp("\\b"+stem+"\\w+","i").exec(text);
    return m ? {index:m.index, text:m[0]} : null;
  }
  function boldWord(text, word){
    const safe = esc(text);
    const wrap = re => safe.replace(re,"<b>$1</b>");
    const strict = wrap(new RegExp("(\\b"+escapeReg(word)+"\\w*)","ig"));
    if(strict !== safe) return strict;
    const stem = inflectionStem(word);
    return stem ? wrap(new RegExp("(\\b"+stem+"\\w+)","ig")) : safe;
  }


  // ---- 학습 기록 ----
  let store = load();
  function load(){ const s=ls.getJSON(LS_KEY,{}); if(!s.known)s.known={}; if(!s.star)s.star={}; return s; }
  function save(){ ls.setJSON(LS_KEY,store); }
  const isKnown = w => !!store.known[w];
  const isStar = w => !!store.star[w];
  /** 플래그를 뒤집고 최종 상태를 돌려준다. 꺼진 키는 지워서 저장 용량을 아낀다. */
  function toggleFlag(map,key){
    if(map[key]) delete map[key]; else map[key]=true;
    save();
    return !!map[key];
  }



  /* ── 학습 기록 초기화 ─────────────────────────────────────
     store 를 통째로 갈아 끼우면 다른 파일이 별칭으로 들고 있던 참조가
     끊긴다. 속성만 비운다. */
  function resetStore(){
    Object.keys(store.known).forEach(k=>delete store.known[k]);
    Object.keys(store.star).forEach(k=>delete store.star[k]);
    save();
  }

  /* ── 패널 레지스트리 ─────────────────────────────────────── */
  const panels = {};
  /** @param {{id:string, wide?:boolean, init?:Function, resume?:Function}} def */
  function panel(def){ panels[def.id]=def; }

  /** 화면을 그 패널로 바꾼다. 처음 열리면 init, 이후에는 resume. */
  function openPanel(id){
    qsa(".panel").forEach(p=>p.classList.remove("active"));
    const el=$("panel-"+id);
    if(!el)return;
    el.classList.add("active");
    const def=panels[id]||{};
    // 넓은 패널에서는 상단 진행바와 섞기 버튼을 감춘다
    document.body.classList.toggle("speaking-mode", !!def.wide);
    if(A.stopSpeak) A.stopSpeak();
    if(!def._started){ def._started=true; if(def.init) def.init(); }
    else if(def.resume) def.resume();
  }

  /* 부팅·초기화 훅 — boot.js 가 마지막에 순서대로 부른다 */
  const bootFns=[], resetFns=[];
  const onBoot  = fn => bootFns.push(fn);
  const onReset = fn => resetFns.push(fn);
  A._runBoot  = () => bootFns.forEach(f=>f());
  A._runReset = () => resetFns.forEach(f=>f());



  // ---- 진행률 · 푸터 ----
  function updateProgress(){
    const s = A.stats();
    const total = s.words, known = A.WORDS.filter(w=>isKnown(w.word)).length;
    $("known-count").textContent=known; $("total-count").textContent=total;
    const pct = total?Math.round(known/total*100):0;
    $("pct").textContent=pct+"%"; $("bar-fill").style.width=pct+"%";
    const set=(id,v)=>{ const el=$(id); if(el) el.textContent=v; };
    set("foot-total",s.words);   set("foot-speak",s.speaking);
    set("foot-gram",s.gram);     set("foot-p6",s.p6);   set("foot-p7",s.p7);
    set("foot-struct",s.struct); set("foot-slang",s.slang); set("foot-det",s.det);
  }


  // ---- 토스트 ----
  let toastTimer;
  function toast(msg){ let t=$("toast"); if(!t){ t=document.createElement("div"); t.id="toast"; t.style.cssText="position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:var(--text);color:var(--bg);padding:10px 20px;border-radius:99px;font-size:13px;font-weight:600;z-index:99;box-shadow:var(--shadow);transition:.3s;opacity:0"; document.body.appendChild(t); } t.textContent=msg; t.style.opacity="1"; clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.style.opacity="0",1600); }


  // ---- 테마 ----
  (function(){
    const btn=$("theme-btn");
    const prefersDark = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
    const apply=t=>{ document.documentElement.setAttribute("data-theme",t); btn.textContent=t==="dark"?"☀️":"🌙"; };
    apply(ls.get(THEME_KEY, prefersDark?"dark":"light"));
    btn.addEventListener("click",()=>{
      const c=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";
      ls.set(THEME_KEY,c); apply(c);
    });
  })();


  // ---- 글자 크기 ----
  // 본문(main·footer)에만 zoom 배율을 걸어 읽는 영역 전체를 함께 키운다.
  // px 기반 스타일이 수백 군데라 rem 으로 바꾸는 대신 배율 한 번으로 처리한다.
  // 헤더는 배율에서 빼 두었다 — 조절 버튼까지 같이 움직이면 쓰기 불편해서다.
  (function(){
    const STEPS=[{v:.85,n:"작게"},{v:1,n:"기본"},{v:1.15,n:"크게"},{v:1.3,n:"더크게"},{v:1.5,n:"최대"}];
    const DEF=1;
    let i = (function(){
      const n=parseInt(ls.get(FS_KEY,String(DEF)),10);
      return (n>=0&&n<STEPS.length)?n:DEF;
    })();

    const pop=$("fs-pop"), btn=$("fs-btn");
    $("fs-steps").innerHTML=STEPS.map((s,k)=>
      '<button data-fs="'+k+'" title="'+esc(s.n)+' · '+Math.round(s.v*100)+'%">'+esc(s.n)+'</button>').join('');

    function apply(announce){
      const s=STEPS[i];
      document.documentElement.style.setProperty("--fs",String(s.v));
      $("fs-now").textContent=Math.round(s.v*100)+"%";
      $("fs-minus").disabled = i===0;
      $("fs-plus").disabled  = i===STEPS.length-1;
      qsa("[data-fs]",$("fs-steps")).forEach(b=>b.setAttribute("aria-pressed", String(parseInt(b.dataset.fs,10)===i)));
      ls.set(FS_KEY,String(i));
      if(announce) toast("글자 크기 "+s.n+" · "+Math.round(s.v*100)+"%");
    }
    function step(d){
      const next=Math.min(STEPS.length-1,Math.max(0,i+d));
      if(next===i)return;
      i=next; apply(true);
    }
    function openPop(on){
      pop.classList.toggle("on",on);
      btn.setAttribute("aria-expanded",String(on));
    }

    btn.addEventListener("click",e=>{ e.stopPropagation(); openPop(!pop.classList.contains("on")); });
    pop.addEventListener("click",e=>e.stopPropagation());
    document.addEventListener("click",()=>openPop(false));
    document.addEventListener("keydown",e=>{
      if(e.key==="Escape"&&pop.classList.contains("on")){ openPop(false); btn.focus(); return; }
      // Ctrl+← / Ctrl+→ 는 브라우저 기본 확대(Ctrl +/-)와 겹치지 않는 조합
      if(!e.ctrlKey||e.altKey||e.metaKey)return;
      if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
      if(e.key==="ArrowLeft"){ e.preventDefault(); step(-1); }
      else if(e.key==="ArrowRight"){ e.preventDefault(); step(1); }
    });
    $("fs-minus").addEventListener("click",()=>step(-1));
    $("fs-plus").addEventListener("click",()=>step(1));
    $("fs-reset").addEventListener("click",()=>{ if(i!==DEF){ i=DEF; apply(true); } });
    qsa("[data-fs]",$("fs-steps")).forEach(b=>b.addEventListener("click",()=>{
      const k=parseInt(b.dataset.fs,10); if(k!==i){ i=k; apply(true); }
    }));

    apply(false);
    if(!(window.CSS&&CSS.supports&&CSS.supports("zoom","1.5"))) $("fs-hint").textContent="이 브라우저는 글자 크기 조절을 지원하지 않습니다.";
  })();


  Object.assign(A, {
    LV, LV_DEFS, TOPIC_ORDER, EXAM_CLS, EXAM_NAME, AB, $, qsa, esc, escapeReg, ls, shuffleInPlace, shuffled, boldWord, findInflection, store, save, isKnown, isStar, toggleFlag, resetStore, updateProgress, toast, panels, panel, openPanel, onBoot, onReset
  });

})(window.APP);
