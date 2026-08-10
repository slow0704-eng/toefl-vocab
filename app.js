"use strict";
/* ============================================================
   영어시험 올인원 — 앱 로직
   ------------------------------------------------------------
   words.js / speaking.js / grammar.js / duolingo.js / exams.js 가
   전역(window.*)에 데이터를 실은 뒤 실행된다. 빌드 도구 없이
   file:// 로도 열려야 하므로 ES 모듈이 아닌 단일 IIFE 로 유지한다.
   ============================================================ */
(function(){
  const WORDS = (window.TOEFL_WORDS || []).slice();
  const TOPICS = (window.SPEAKING_TOPICS || []).concat(window.SPEAKING_TOPICS_EXTRA || []);
  const LS_KEY = "toefl-vocab-progress-v1";
  const THEME_KEY = "toefl-vocab-theme";
  const FS_KEY = "toefl-vocab-fontsize";
  const LV = {1:{n:"기초",c:"l1"},2:{n:"중급",c:"l2"},3:{n:"고급",c:"l3"},4:{n:"최고급",c:"l4"}};
  const LV_DEFS = [[0,"전체","--accent"],[1,"기초","--lv1"],[2,"중급","--lv2"],[3,"고급","--lv3"],[4,"최고급","--lv4"]];
  const TOPIC_ORDER = ["학문·연구","자연·환경","생물·의학","과학·기술","사회·정치","경제·경영","역사·문화","예술·문학","심리·감정","언어·논증","변화·수량","성질·상태","행동·관계"];
  const WORD_TOPICS = (function(){
    const have = {}; WORDS.forEach(w=>{ if(w.topic) have[w.topic]=1; });
    const list = TOPIC_ORDER.filter(t=>have[t]);
    Object.keys(have).forEach(t=>{ if(list.indexOf(t)<0) list.push(t); });
    return list;
  })();
  const EXAM_CLS = {"OPIc":"opic","TOEFL":"toefl","TOEIC":"toeic","TOEFL Writing":"write","TOEFL Reading":"read"};
  const EXAM_NAME = {"OPIc":"OPIc","TOEFL":"TOEFL Speaking","TOEIC":"TOEIC Speaking","TOEFL Writing":"TOEFL Writing","TOEFL Reading":"TOEFL Reading"};

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

  // ---- 진행률 ----
  function updateProgress(){
    const total=WORDS.length, known=WORDS.filter(w=>isKnown(w.word)).length;
    $("known-count").textContent=known; $("total-count").textContent=total;
    $("foot-total").textContent=total; $("foot-speak").textContent=TOPICS.length;
    $("foot-gram").textContent=(window.GRAMMAR_QUESTIONS||[]).length;
    $("foot-struct").textContent=(window.STRUCTURES||[]).length;
    $("foot-slang").textContent=(window.SLANG||[]).length;
    const d=window.DET_DATA||{};
    $("foot-det").textContent=((d.readComplete||[]).length+(d.listenType||[]).length+
      (d.passageComplete||[]).length+(d.writeSpeak||[]).length+(d.readSelect?d.readSelect.fake.length:0));
    const pct=total?Math.round(known/total*100):0;
    $("pct").textContent=pct+"%"; $("bar-fill").style.width=pct+"%";
  }

  // ---- 발음 ----
  function speak(text,opts){
    try{ window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="en-US"; u.rate=(opts&&opts.rate)||.9; if(opts&&opts.onend)u.onend=opts.onend; window.speechSynthesis.speak(u); }catch(e){}
  }
  // stopSpeak 은 아래 음성 모듈에서 정의한다 (브라우저 음성 + Piper 오디오 둘 다 정지)

  // ---- 고품질 음성 (Piper TTS · 브라우저에서 100% 로컬 실행) ----
  // 브라우저 내장 speechSynthesis 는 OS가 직접 소리를 내므로 파일로 저장할 수 없다.
  // Piper(오픈소스 VITS) 를 onnxruntime-web 으로 브라우저에서 돌리면 WAV 를 직접 얻어
  // 재생과 다운로드가 모두 가능해진다. 모델은 최초 1회만 받고 이후 브라우저에 캐시된다.
  const TTS_KEY="tts-voice-config";
  const TTS_CDN="https://cdn.jsdelivr.net/npm/@diffusionstudio/vits-web@1.0.3/+esm";
  const TTS_VOICES=[
    {id:"en_US-hfc_female-medium", label:"미국 · 여성 (표준)",   tag:"US"},
    {id:"en_US-hfc_male-medium",   label:"미국 · 남성 (표준)",   tag:"US"},
    {id:"en_US-amy-medium",        label:"미국 · 여성 (부드러움)", tag:"US"},
    {id:"en_US-ryan-medium",       label:"미국 · 남성 (또렷함)",  tag:"US"},
    {id:"en_US-lessac-medium",     label:"미국 · 여성 (뉴스톤)",  tag:"US"},
    {id:"en_GB-jenny_dioco-medium",label:"영국 · 여성",          tag:"GB"},
    {id:"en_GB-alan-medium",       label:"영국 · 남성",          tag:"GB"},
    {id:"en_GB-northern_english_male-medium", label:"영국 · 남성 (북부 억양)", tag:"GB"}
  ];
  let ttsCfg=(function(){
    const v=ls.getJSON(TTS_KEY,null);
    return (v&&typeof v==="object")?v:{ engine:"browser", voice:"en_US-hfc_female-medium", rate:1 };
  })();
  const saveTtsCfg=()=>ls.setJSON(TTS_KEY,ttsCfg);
  let piperMod=null, piperLoading=null, ttsAudio=null, ttsBusy=false;

  const piperOn = ()=>ttsCfg.engine==="piper";
  function loadPiper(){
    if(piperMod)return Promise.resolve(piperMod);
    if(piperLoading)return piperLoading;
    piperLoading=import(TTS_CDN).then(function(m){ piperMod=m; return m; })
      .catch(function(e){ piperLoading=null; throw new Error("음성 엔진을 불러오지 못했습니다 (네트워크 확인): "+(e&&e.message||e)); });
    return piperLoading;
  }
  // 긴 지문은 문장 단위로 잘라 이어 붙인다 (한 번에 넣으면 느리고 실패하기 쉬움)
  function splitSentences(text,max){
    const clean=String(text).replace(/\s+/g," ").trim();
    const parts=clean.match(/[^.!?]+[.!?]*/g)||[clean];
    const out=[]; let cur="";
    parts.forEach(function(p){
      p=p.trim(); if(!p)return;
      if((cur+" "+p).trim().length>(max||220)){ if(cur)out.push(cur.trim()); cur=p; }
      else cur=(cur+" "+p).trim();
    });
    if(cur)out.push(cur.trim());
    return out;
  }
  // 여러 WAV 를 하나로 합친다 (헤더는 첫 파일 것을 쓰고 데이터 길이만 갱신)
  async function mergeWav(blobs){
    if(blobs.length===1)return blobs[0];
    const bufs=[]; for(const b of blobs) bufs.push(new Uint8Array(await b.arrayBuffer()));
    const HDR=44;
    const bodyLen=bufs.reduce((s,b)=>s+(b.length-HDR),0);
    const out=new Uint8Array(HDR+bodyLen);
    out.set(bufs[0].slice(0,HDR),0);
    let off=HDR;
    bufs.forEach(function(b){ out.set(b.slice(HDR),off); off+=b.length-HDR; });
    const dv=new DataView(out.buffer);
    dv.setUint32(4, 36+bodyLen, true);   // RIFF chunk size
    dv.setUint32(40, bodyLen, true);     // data chunk size
    return new Blob([out],{type:"audio/wav"});
  }
  // 텍스트 → WAV Blob
  async function piperSynth(text,onProgress){
    const m=await loadPiper();
    const chunks=splitSentences(text,220);
    const blobs=[];
    for(let i=0;i<chunks.length;i++){
      if(onProgress)onProgress(i,chunks.length);
      blobs.push(await m.predict({ text:chunks[i], voiceId:ttsCfg.voice }));
    }
    return mergeWav(blobs);
  }
  function voiceLabel(id){ const v=TTS_VOICES.filter(v=>v.id===id)[0]; return v?v.label:id; }

  // ---- 재생 · 다운로드 공용 ----
  function stopSpeak(){
    try{ window.speechSynthesis.cancel(); }catch(e){}
    try{ if(ttsAudio){ ttsAudio.pause(); ttsAudio.currentTime=0; ttsAudio=null; } }catch(e){}
  }
  // 설정에 따라 브라우저 음성 또는 Piper 로 재생
  function speakBest(text,opts){
    if(!piperOn()){ speak(text,opts); return; }
    stopSpeak();
    if(ttsBusy){ toast("이전 음성을 만드는 중입니다"); return; }
    ttsBusy=true;
    const first=!ttsReadyOnce;
    if(first) toast("고품질 음성 준비 중… (최초 1회 모델 내려받기)");
    piperSynth(text).then(function(blob){
      ttsReadyOnce=true; ttsBusy=false;
      const url=URL.createObjectURL(blob);
      ttsAudio=new Audio(url);
      ttsAudio.playbackRate=ttsCfg.rate||1;
      const done=function(){ URL.revokeObjectURL(url); if(opts&&opts.onend)opts.onend(); };
      ttsAudio.onended=done; ttsAudio.onerror=done;
      ttsAudio.play();
    }).catch(function(e){
      ttsBusy=false; toast("고품질 음성 실패 — 브라우저 음성으로 재생합니다");
      speak(text,opts);
    });
  }
  let ttsReadyOnce=false;
  // WAV 파일로 저장 (Piper 전용 — 브라우저 음성은 원리상 저장 불가)
  function ttsDownload(text,name){
    if(!piperOn()){ openTtsSettings(true); return; }
    if(ttsBusy){ toast("이전 음성을 만드는 중입니다"); return; }
    ttsBusy=true;
    const n=splitSentences(text,220).length;
    toast(ttsReadyOnce?("음성 생성 중… ("+n+"개 구간)"):"최초 1회 모델을 내려받는 중입니다…");
    piperSynth(text,function(i,total){ if(total>3&&i>0&&i%3===0)toast("음성 생성 중… "+i+"/"+total); })
      .then(function(blob){
        ttsReadyOnce=true; ttsBusy=false;
        const url=URL.createObjectURL(blob), a=document.createElement("a");
        a.href=url; a.download=(name||"audio").replace(/[\\/:*?"<>|]/g,"").trim().slice(0,60)+".wav";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function(){ URL.revokeObjectURL(url); },1500);
        toast("음성 파일을 저장했습니다 ⬇ "+Math.round(blob.size/1024)+"KB");
      }).catch(function(e){
        ttsBusy=false; alert("음성 생성 실패\n\n"+(e&&e.message||e));
      });
  }
  // 텍스트 대본(.txt) 저장 — 엔진과 무관하게 항상 동작
  function scriptDownload(text,name){
    const blob=new Blob([String.fromCharCode(0xFEFF)+text],{type:"text/plain;charset=utf-8;"});
    const url=URL.createObjectURL(blob), a=document.createElement("a");
    a.href=url; a.download=(name||"script").replace(/[\\/:*?"<>|]/g,"").trim().slice(0,60)+".txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); },1500);
    toast("대본을 저장했습니다 ⬇");
  }

  // ---- 음성 설정 화면 ----
  function openTtsSettings(fromDownload){
    $("tts-modal").classList.add("on");
    const body=$("tts-body");
    function draw(stored){
      body.innerHTML=
        (fromDownload?'<div class="tts-warn">⚠️ 음성 파일로 저장하려면 <b>고품질 음성(Piper)</b>을 켜야 합니다. 브라우저 기본 음성은 OS가 직접 소리를 내는 방식이라 파일로 뽑아낼 수 없습니다.</div>':'')+
        '<div class="tts-engines">'+
          '<label class="tts-eng'+(!piperOn()?" on":"")+'"><input type="radio" name="tts-eng" value="browser"'+(!piperOn()?" checked":"")+' />'+
            '<b>🔈 브라우저 기본</b><span>즉시 재생 · 내려받기 없음<br/><i>음성 파일 저장 불가</i></span></label>'+
          '<label class="tts-eng'+(piperOn()?" on":"")+'"><input type="radio" name="tts-eng" value="piper"'+(piperOn()?" checked":"")+' />'+
            '<b>🎧 고품질 (Piper)</b><span>오픈소스 · 100% 브라우저에서 실행<br/><i>WAV 파일로 저장 가능</i></span></label>'+
        '</div>'+
        '<div id="tts-piper-opts" style="display:'+(piperOn()?"block":"none")+'">'+
          '<label class="tts-f"><span>음성 선택</span><select id="tts-voice">'+
            TTS_VOICES.map(v=>'<option value="'+v.id+'"'+(ttsCfg.voice===v.id?" selected":"")+'>'+esc(v.label)+
              ((stored||[]).indexOf(v.id)>=0?"  ✓ 받음":"")+'</option>').join('')+
          '</select></label>'+
          '<label class="tts-f"><span>재생 속도 <small id="tts-rate-v">'+(ttsCfg.rate||1)+'×</small></span>'+
            '<input id="tts-rate" type="range" min="0.6" max="1.4" step="0.05" value="'+(ttsCfg.rate||1)+'" /></label>'+
          '<div class="tts-note">최초 재생 시 선택한 음성 모델(약 60MB)을 한 번 내려받고, 이후에는 브라우저에 저장되어 <b>오프라인에서도</b> 동작합니다. '+
            (stored&&stored.length?('현재 받아 둔 음성: <b>'+stored.map(voiceLabel).join(", ")+'</b>'):'아직 받아 둔 음성이 없습니다.')+'</div>'+
          '<div class="tts-actions"><button class="btn" id="tts-test">🔊 이 음성으로 들어보기</button>'+
            (stored&&stored.length?'<button class="btn" id="tts-clear">🗑 받은 음성 삭제</button>':'')+'</div>'+
          '<div id="tts-result"></div>'+
        '</div>'+
        '<div class="tts-note" style="margin-top:14px">🔐 모든 처리는 <b>이 브라우저 안에서</b> 일어납니다. 텍스트가 서버로 전송되지 않습니다. '+
          '엔진은 오픈소스 <b>Piper</b>(rhasspy/piper)이며 모델은 Hugging Face에서 내려받습니다.</div>';

      qsa('input[name="tts-eng"]',body).forEach(r=>r.addEventListener("change",function(){
        ttsCfg.engine=this.value; saveTtsCfg();
        $("tts-piper-opts").style.display=piperOn()?"block":"none";
        qsa('.tts-eng',body).forEach(l=>l.classList.toggle("on",l.querySelector("input").checked));
      }));
      const vsel=$("tts-voice");
      if(vsel)vsel.addEventListener("change",function(){ ttsCfg.voice=this.value; saveTtsCfg(); ttsReadyOnce=false; });
      const rate=$("tts-rate");
      if(rate)rate.addEventListener("input",function(){ ttsCfg.rate=parseFloat(this.value); $("tts-rate-v").textContent=ttsCfg.rate+"×"; saveTtsCfg(); });
      const test=$("tts-test");
      if(test)test.addEventListener("click",function(){
        $("tts-result").innerHTML='<div class="tts-note">음성을 만드는 중… 최초 1회는 모델을 받느라 시간이 걸립니다.</div>';
        piperSynth("Total Football was not about abandoning positions, but about making them provisional.")
          .then(function(blob){
            ttsReadyOnce=true;
            const url=URL.createObjectURL(blob);
            $("tts-result").innerHTML='<div class="tts-ok">✅ 준비 완료 · '+Math.round(blob.size/1024)+'KB</div>'+
              '<audio controls autoplay src="'+url+'" style="width:100%;margin-top:8px"></audio>';
            refresh();
          }).catch(function(e){ $("tts-result").innerHTML='<div class="tts-warn">❌ 실패<br/>'+esc(String(e&&e.message||e))+'</div>'; });
      });
      const clr=$("tts-clear");
      if(clr)clr.addEventListener("click",function(){
        loadPiper().then(m=>m.flush()).then(function(){ ttsReadyOnce=false; toast("받아 둔 음성을 삭제했습니다"); refresh(); })
          .catch(function(e){ toast("삭제 실패"); });
      });
    }
    function refresh(){
      if(!piperOn()){ draw([]); return; }
      loadPiper().then(m=>m.stored()).then(draw).catch(function(){ draw([]); });
    }
    refresh();
  }
  $("tts-btn").addEventListener("click",function(){ openTtsSettings(false); });
  $("tts-close").addEventListener("click",function(){ $("tts-modal").classList.remove("on"); });
  $("tts-modal").addEventListener("click",function(e){ if(e.target===$("tts-modal"))$("tts-modal").classList.remove("on"); });

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

  // ---- 플래시카드 ----
  let order=[], idx=0, flipped=false;
  const card=$("card");
  const flashF = makeWordFilter("flash", ()=>{ rebuildOrder(); renderCard(); });
  function rebuildOrder(){ order = WORDS.map((_,i)=>i).filter(i=>flashF.match(WORDS[i])); idx=0; }
  const cur=()=>WORDS[order[idx]];
  function renderCard(){
    flipped=false; card.classList.remove("flipped");
    if(!order.length){
      $("fc-word").textContent="(해당 단어 없음)"; $("fc-pos").textContent="—";
      $("fc-lv").textContent="—"; $("fc-lv").className="lv-badge"; $("fc-topic").textContent="—";
      $("fc-ko").textContent="—"; $("fc-en").textContent=""; $("fc-ex").innerHTML="";
      $("fc-index").textContent="0 / 0";
      $("prev-btn").disabled=true; $("next-btn").disabled=true;
      return;
    }
    const w=cur(); if(!w) return;
    $("fc-pos").textContent=w.pos;
    const lb=$("fc-lv"); lb.textContent=LV[w.level].n; lb.className="lv-badge "+LV[w.level].c;
    $("fc-topic").textContent=w.topic||"—";
    $("fc-word").textContent=w.word;
    $("fc-ko").textContent=w.ko; $("fc-en").textContent=w.en;
    $("fc-ex").innerHTML="“"+boldWord(w.ex,w.word)+"”";
    $("fc-index").textContent=(idx+1)+" / "+order.length;
    const s=$("star-btn"); s.textContent=isStar(w.word)?"★":"☆"; s.classList.toggle("on",isStar(w.word));
    $("btn-known").innerHTML=isKnown(w.word)?"✓ 외움 (해제)":"✓ 외웠어요";
    $("prev-btn").disabled=idx===0; $("next-btn").disabled=idx===order.length-1;
  }
  function flip(){ flipped=!flipped; card.classList.toggle("flipped",flipped); }
  function go(d){ const n=idx+d; if(n<0||n>=order.length)return; idx=n; renderCard(); }
  card.addEventListener("click",e=>{ if(!order.length)return; if(e.target.closest(".star-btn")||e.target.closest(".speak"))return; flip(); });
  $("star-btn").addEventListener("click",()=>{ if(!order.length)return; toggleFlag(store.star,cur().word); renderCard(); });
  $("fc-speak-f").addEventListener("click",()=>{ if(order.length)speak(cur().word); });
  $("fc-speak-b").addEventListener("click",()=>{ if(order.length)speak(cur().word); });
  $("prev-btn").addEventListener("click",()=>go(-1));
  $("next-btn").addEventListener("click",()=>go(1));
  $("btn-known").addEventListener("click",()=>{ if(!order.length)return; const on=toggleFlag(store.known,cur().word); updateProgress(); renderCard(); if(on&&idx<order.length-1)setTimeout(()=>go(1),180); });
  $("btn-again").addEventListener("click",()=>{ if(!order.length)return; const w=cur().word; delete store.known[w]; save(); updateProgress(); renderCard(); if(idx<order.length-1)setTimeout(()=>go(1),120); });

  function shuffle(){ shuffleInPlace(order); idx=0; renderCard(); }
  $("shuffle-btn").addEventListener("click",()=>{ shuffle(); toast("순서를 섞었습니다 🔀"); });

  // ---- 탭 ----
  document.querySelectorAll('.tabs button').forEach(b=>{
    b.addEventListener("click",()=>{
      document.querySelectorAll('.tabs button').forEach(x=>x.setAttribute("aria-selected",x===b));
      document.querySelectorAll('.panel').forEach(p=>p.classList.remove("active"));
      $("panel-"+b.dataset.tab).classList.add("active");
      const tab=b.dataset.tab;
      document.body.classList.toggle("speaking-mode", tab==="speak"||tab==="write"||tab==="read"||tab==="gram"||tab==="struct"||tab==="slang"||tab==="det"||tab==="info"||tab==="topic"||tab==="ptype");
      stopSpeak();
      // 탭을 다시 열 때 이미 채점된 화면이 남아 있으면 다음 문제로 넘긴다
      // (진행 중인 세션과 콤보는 유지 — 잠깐 다른 탭을 봤다고 초기화되지 않게)
      if(tab==="quiz"){
        if(!quiz || !$("quiz-body").innerHTML) startQuiz();
        else if(quiz.answered){ quiz.i++; renderQuiz(); }
      }
      if(tab==="browse") renderBrowse();
      if(tab==="gram"){
        if(!$("gram-body").innerHTML) startGram();
        else if(gMode==="solve" && gram && gram.answered){ gram.i++; renderGram(); }
      }
      if(tab==="struct"){
        if(!$("struct-body").innerHTML) startStruct();
        else if(sMode==="solve" && struct && struct.answered){ struct.i++; renderStruct(); }
      }
      if(tab==="slang"){
        if(!$("slang-body").innerHTML) startSlang();
        else if(slMode==="quiz" && slang && slang.answered){ slang.i++; renderSlang(); }
      }
      if(tab==="det"){
        if(!$("det-body").innerHTML){ buildDetLv(); startDet(); }
        else if(detMode==="passage" && det && det.answered){ det.i++; drawDetPassage(); }
      }
      if(tab==="topic"){
        if(!$("topic-body").innerHTML){ buildTopicChips(); renderTopic(); }
        else if(tMode==="solve" && tSes && tSes.answered){ tSes.i++; drawTopicQ(); }
      }
      if(tab==="ptype"){
        if(!$("ptype-body").innerHTML){ buildPtypeChips(); renderPtype(); }
        else if(pMode==="quiz" && pSes && pSes.answered){ pSes.i++; drawPtypeQ(); }
      }
      if(tab==="info" && !$("info-body").innerHTML) renderInfo();
      if(tab==="speak") renderSpeak();
      if(tab==="write") renderWrite();
      if(tab==="read") renderRead();
    });
  });

  // ---- 퀴즈 ----
  // w2k=단어→뜻, k2w=뜻→단어, blank=빈칸 채우기, mix=혼합
  const DIR_KEY="toefl-vocab-quiz-dir", COUNT_KEY="toefl-vocab-quiz-count";
  const DIRS=["w2k","k2w","blank","mix"];
  const COUNTS=[10,20,30,50,0];           // 0 = 전체
  let quiz=null;
  let quizDir = DIRS.indexOf(ls.get(DIR_KEY,"w2k"))>=0 ? ls.get(DIR_KEY,"w2k") : "w2k";
  let quizCount = (function(){ const n=parseInt(ls.get(COUNT_KEY,"10"),10); return COUNTS.indexOf(n)>=0 ? n : 10; })();
  const SOUND_KEY="toefl-vocab-quiz-sound";
  let soundOn = ls.get(SOUND_KEY,"on")!=="off";
  const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const quizF = makeWordFilter("quiz", ()=>startQuiz());
  function quizPool(){ return WORDS.filter(w=>quizF.match(w)); }
  $("quiz-dir").querySelectorAll("[data-dir]").forEach(b=>{
    b.setAttribute("aria-pressed", b.dataset.dir===quizDir);
    b.addEventListener("click",()=>{
      $("quiz-dir").querySelectorAll("[data-dir]").forEach(x=>x.setAttribute("aria-pressed",x===b));
      quizDir=b.dataset.dir; ls.set(DIR_KEY,quizDir); startQuiz();
    });
  });
  // 문항 수 칩 — 현재 필터로 뽑히는 단어 수보다 큰 선택지는 숨긴다
  function buildCountChips(){
    const n=quizPool().length;
    const items=COUNTS.filter(c=>c===0||c<=n);
    if(items.indexOf(quizCount)<0) quizCount=0;
    $("quiz-count").innerHTML=items.map(c=>
      '<button data-qc="'+c+'" aria-pressed="'+(c===quizCount)+'">'+(c===0?"전체 "+n:c+"문항")+'</button>').join("");
    $("quiz-count").querySelectorAll("[data-qc]").forEach(b=>b.addEventListener("click",()=>{
      quizCount=parseInt(b.dataset.qc,10); ls.set(COUNT_KEY,quizCount); startQuiz();
    }));
  }
  $("quiz-sound").addEventListener("click",()=>{
    soundOn=!soundOn;
    $("quiz-sound").setAttribute("aria-pressed",soundOn);
    $("quiz-sound").textContent=soundOn?"🔊 효과음":"🔇 효과음";
    ls.set(SOUND_KEY,soundOn?"on":"off");
    if(soundOn)beep("ok");
  });

  // ---- 콤보 (연속 정답) — 어휘 퀴즈·문법 공용 ----
  const COMBO_KEY="toefl-vocab-best-combo";
  let bestCombo=(function(){ const v=ls.getJSON(COMBO_KEY,null); return (v&&typeof v==="object")?{quiz:v.quiz||0,gram:v.gram||0,det:v.det||0,struct:v.struct||0,slang:v.slang||0,topic:v.topic||0,ptype:v.ptype||0}:{quiz:0,gram:0,det:0,struct:0,slang:0,topic:0,ptype:0}; })();
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
  function withDistractors(answer, prefer, keyOf){
    const takenWord={}, takenLabel={};
    takenWord[answer.word]=1; takenLabel[keyOf(answer)]=1;
    const out=[answer];
    const drain=list=>{
      for(let i=0;i<list.length&&out.length<4;i++){
        const w=list[i], label=keyOf(w);
        if(takenWord[w.word]||takenLabel[label])continue;
        takenWord[w.word]=1; takenLabel[label]=1;
        out.push(w);
      }
    };
    drain(shuffled(WORDS.filter(prefer)));
    drain(shuffled(WORDS));
    return shuffleInPlace(out);
  }
  /** 예문 안에 표제어가 실제로 등장해야 빈칸 문제를 만들 수 있다. */
  const blankable = w => !!findInflection(w.word,w.ex);
  /* 예문에서 표제어(굴절형 포함)를 빈칸으로 바꾼다.
     form 은 예문에 실제로 쓰인 형태라서, 정답 공개 때 "modified" 처럼 그대로 채워 넣을 수 있다. */
  function blankSentence(w){
    const m=findInflection(w.word,w.ex);
    if(!m)return null;
    return {
      html: esc(w.ex.slice(0,m.index))+'<span class="blank">______</span>'+esc(w.ex.slice(m.index+m.text.length)),
      form: m.text
    };
  }
  function buildQuestion(w, dir){
    if(dir==="blank"){
      const b=blankSentence(w);
      if(b) return {w:w, dir:"blank", sentence:b.html, form:b.form,
                    opts:withDistractors(w, x=>x.pos===w.pos, x=>x.word)};
      dir="w2k";   // 예문에 표제어가 없으면 뜻 문제로 대체한다
    }
    return dir==="k2w"
      ? {w:w, dir:"k2w", opts:withDistractors(w, x=>x.level===w.level, x=>x.word)}
      : {w:w, dir:"w2k", opts:withDistractors(w, x=>x.level===w.level, x=>x.ko)};
  }
  function startQuiz(){
    buildCountChips();
    const p=quizPool();
    const n = quizCount===0 ? p.length : Math.min(quizCount,p.length);
    let source=shuffled(p).slice(0,n);
    // "빈칸" 전용 모드는 예문에 표제어가 있는 단어만 골라 문제 품질을 지킨다
    if(quizDir==="blank"){
      const ok=shuffled(p.filter(blankable)).slice(0,n);
      if(ok.length)source=ok;
    }
    const list=source.map(w=>buildQuestion(w, quizDir==="mix"?["w2k","k2w","blank"][Math.floor(Math.random()*3)]:quizDir));
    quiz={list:list,i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.quiz,records:0,missed:[]};
    renderQuiz();
  }
  function streakHTML(){ return quiz ? comboBadge(quiz.streak) : ''; }
  function renderQuiz(){
    if(!quiz)return;
    if(!quiz.list.length){ $("quiz-body").innerHTML='<div class="empty">이 조건에 해당하는 단어가 없습니다.<br/>난이도·주제 필터를 넓혀 보세요.</div>'; return; }
    if(quiz.i>=quiz.list.length){ renderQuizResult(); return; }
    const item=quiz.list[quiz.i], q=item.w, dir=item.dir;
    const opts=item.opts;
    quiz.answered=false;
    const pct=Math.round(quiz.i/quiz.list.length*100);
    const streakBadge = '<span id="quiz-streak">'+streakHTML()+'</span>';
    const lvBadge = '<span class="lv-badge '+LV[q.level].c+'">'+LV[q.level].n+'</span>';
    const topline = t => '<div class="quiz-topline"><span class="quiz-q">'+t+' · '+(quiz.i+1)+' / '+quiz.list.length+'</span>'+streakBadge+'</div>';
    let head;
    if(dir==="blank"){
      head = topline("빈칸에 알맞은 단어를 고르세요")+
        '<div class="quiz-sentence">'+item.sentence+'</div>'+
        '<div class="quiz-blank-meta"><b>'+esc(q.pos)+'</b> · '+lvBadge+(q.topic?' · <span class="topic-tag">'+esc(q.topic)+'</span>':'')+'</div>';
    }else if(dir==="k2w"){
      head = topline("다음 뜻을 가진 단어를 고르세요")+
        '<div class="quiz-word" style="font-size:27px">'+esc(q.ko)+'</div>'+
        '<div class="quiz-pos">'+esc(q.pos)+' · '+esc(q.en)+' · '+lvBadge+'</div>';
    }else{
      head = topline("다음 단어의 뜻을 고르세요")+
        '<div class="quiz-word">'+esc(q.word)+' <button class="speak" style="vertical-align:middle;margin-left:6px" id="quiz-speak">🔊</button></div>'+
        '<div class="quiz-pos">'+esc(q.pos)+' · '+lvBadge+(q.topic?' · <span class="topic-tag">'+esc(q.topic)+'</span>':'')+'</div>';
    }
    // 빈칸 유형은 보기가 단어라, 한글 뜻을 채점 후에만 덧붙여 보여준다
    const optLabel = o => dir==="w2k" ? esc(o.ko)
      : esc(o.word)+(dir==="blank"?'<span class="ko-gloss">'+esc(o.ko)+'</span>':'');
    // 다음 버튼(quiz-foot)은 보기 바로 아래 고정, 해설은 그 아래에 펼쳐진다
    $("quiz-body").innerHTML='<div class="quiz-card" id="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+head+
      opts.map((o,i)=>'<button class="opt" data-w="'+esc(o.word)+'"><span class="key">'+(i+1)+'</span>'+optLabel(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="quiz-score-n">'+quiz.score+'</b> / '+quiz.list.length+bestLabel("quiz")+'</span>'+
      '<button class="quiz-next" id="quiz-next">다음 →</button></div>'+
      '<div id="quiz-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    if(dir==="w2k") $("quiz-speak").addEventListener("click",e=>{ e.stopPropagation(); speak(q.word); });
    $("quiz-body").querySelectorAll(".opt").forEach(o=>o.addEventListener("click",()=>answer(o,q)));
    $("quiz-next").addEventListener("click",()=>{ quiz.i++; renderQuiz(); });
  }
  function answer(btn,q){
    if(quiz.answered)return; quiz.answered=true;
    const correct=btn.dataset.w===q.word;
    let record=false;
    if(correct){
      quiz.score++; quiz.streak++; quiz.best=Math.max(quiz.best,quiz.streak);
      btn.classList.add("correct");
      store.known[q.word]=true; save(); updateProgress();
      record=registerCombo(quiz,"quiz");
      if(record)quiz.records++;
      beep("ok",quiz.streak);
      confetti(record?110:quiz.streak>=10?90:quiz.streak>=5?70:quiz.streak>=3?45:26);
      comboPopup(quiz.streak,record);
      const sn=$("quiz-score-n"); sn.textContent=quiz.score; sn.classList.add("bump");
      // 진행바를 정답 직후 한 칸 채워 성취감을 준다
      const barI=document.querySelector(".quiz-progress > i");
      if(barI)barI.style.width=Math.round((quiz.i+1)/quiz.list.length*100)+"%";
    }else{
      quiz.streak=0; quiz.recordShown=false;   // 연속이 끊기면 다음 연속에서 다시 신기록 도전
      btn.classList.add("wrong");
      beep("no");
      quiz.missed.push(q);
    }
    $("quiz-body").querySelectorAll(".opt").forEach(o=>{ o.disabled=true; if(o.dataset.w===q.word)o.classList.add("correct"); });
    // 정답 공개: 보기의 한글 뜻을 드러내고, 빈칸에는 예문에 쓰인 실제 형태를 채운다
    const card=$("quiz-card"); if(card)card.classList.add("revealed");
    const blank=$("quiz-body").querySelector(".quiz-sentence .blank");
    if(blank){ blank.textContent=quiz.list[quiz.i].form||q.word; blank.classList.add("filled"); }
    // 상단 연속 배지도 이번 채점 결과로 즉시 갱신 (해설의 배지와 숫자가 어긋나지 않게)
    const sb=$("quiz-streak"); if(sb) sb.innerHTML=streakHTML();
    // 정답 해설: 판정 + 단어·뜻·예문 (다음 버튼 아래에 표시)
    const streakLine = correct ? ' '+comboBadge(quiz.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':'') : '';
    $("quiz-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은')+streakLine+'</div>'+
      '<div class="rv-word">'+esc(q.word)+' <button class="speak" id="quiz-speak2" style="vertical-align:middle;margin-left:4px;padding:4px 10px">🔊</button></div>'+
      '<div class="rv-sub">'+esc(q.ko)+' · '+esc(q.en)+'</div>'+
      '<div class="rv-ex">“'+boldWord(q.ex,q.word)+'”</div>'+
    '</div>';
    $("quiz-speak2").addEventListener("click",e=>{ e.stopPropagation(); speak(q.word); });
    const nb=$("quiz-next");
    nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=quiz.i===quiz.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderQuizResult(){
    const pct=Math.round(quiz.score/quiz.list.length*100);
    const perfect=quiz.score===quiz.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"복습이 필요해요 📖";
    // 틀린 단어는 결과 화면에서 바로 복습할 수 있게 모아 보여준다
    const missed = quiz.missed.length
      ? '<div class="missed-title">틀린 단어 '+quiz.missed.length+'개</div><div class="missed">'+
        quiz.missed.map(w=>'<div><b>'+esc(w.word)+'</b><span class="p">'+esc(w.pos)+'</span> — '+esc(w.ko)+'</div>').join('')+'</div>'
      : '';
    $("quiz-body").innerHTML='<div class="result"><div class="big">'+quiz.score+' / '+quiz.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(quiz,"quiz")+missed+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="quiz-restart">다시 풀기 (Enter)</button></div>';
    $("quiz-restart").addEventListener("click",startQuiz);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",quiz.best); }
  }
  // ---- 퀴즈 키보드 조작 ----
  document.addEventListener("keydown",e=>{
    if(!$("panel-quiz").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("quiz-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(!quiz||!quiz.list.length)return;
    const opts=Array.prototype.slice.call($("quiz-body").querySelectorAll(".opt"));
    const n=parseInt(e.key,10);
    if(!quiz.answered && n>=1 && n<=opts.length){ e.preventDefault(); opts[n-1].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      const nb=$("quiz-next");
      if(quiz.answered && nb) nb.click();
    }
  });

  // ---- 단어장 ----
  const VIEW_KEY="toefl-vocab-browse-view";
  let browseFilter="all";
  let selected={}, selectMode=false, blankMode=false;
  const browseF = makeWordFilter("browse", ()=>renderBrowse());
  let browseView = ls.get(VIEW_KEY,"card")==="list" ? "list" : "card";
  $("browse-search").addEventListener("input",()=>renderBrowse());
  $("browse-filter").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
    $("browse-filter").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
    browseFilter=b.dataset.filter; renderBrowse();
  }));
  $("browse-view").querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>{
    $("browse-view").querySelectorAll("[data-view]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    browseView=b.dataset.view; ls.set(VIEW_KEY,browseView);
    renderBrowse();
  }));
  $("browse-hide").addEventListener("click",()=>{
    const on=$("browse-hide").getAttribute("aria-pressed")==="true";
    $("browse-hide").setAttribute("aria-pressed",!on);
    $("browse-hide").textContent = on ? "🙈 뜻 가리기" : "👁 뜻 보이기";
    document.body.classList.toggle("hide-ko",!on);
    renderBrowse(false);
  });
  function syncBrowseView(){
    $("browse-view").querySelectorAll("[data-view]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.view===browseView));
  }
  // 현재 필터 조건에 맞는 단어 목록
  function browseList(){
    const q=($("browse-search").value||"").trim().toLowerCase();
    return WORDS.filter(w=>{
      if(!browseF.match(w))return false;
      if(browseFilter==="known"&&!isKnown(w.word))return false;
      if(browseFilter==="unknown"&&isKnown(w.word))return false;
      if(browseFilter==="star"&&!isStar(w.word))return false;
      if(q&&!(w.word.toLowerCase().includes(q)||w.ko.includes(q)||w.en.toLowerCase().includes(q)||(w.topic||"").includes(q)))return false;
      return true;
    });
  }
  // 1,400단어를 한 번에 그리면 느려서 PAGE 개씩 "더 보기"로 나눠 그린다
  const BROWSE_PAGE=150;
  let browseShown=BROWSE_PAGE;

  const flagButtons = w =>
    '<button class="star '+(isStar(w.word)?"on":"")+'" data-star="'+esc(w.word)+'" aria-label="즐겨찾기">'+(isStar(w.word)?"★":"☆")+'</button>'+
    '<button class="known '+(isKnown(w.word)?"on":"")+'" data-known="'+esc(w.word)+'" aria-label="외움 표시">✓</button>'+
    '<button data-speak="'+esc(w.word)+'" aria-label="발음 듣기">🔊</button>';

  function browseCardMarkup(list){
    return list.map(w=>
      '<div class="w-item">'+
        '<input type="checkbox" class="sel" data-sel="'+esc(w.word)+'"'+(selected[w.word]?" checked":"")+' aria-label="선택" />'+
        '<div class="main">'+
        '<div class="top"><span class="w">'+esc(w.word)+'</span><span class="p">'+esc(w.pos)+'</span>'+
        '<span class="lv-badge '+LV[w.level].c+'">'+LV[w.level].n+'</span>'+
        (w.topic?'<span class="topic-tag">'+esc(w.topic)+'</span>':'')+
        (isKnown(w.word)?'<span class="badge-known">외움</span>':'')+'</div>'+
        '<div class="k">'+esc(w.ko)+'</div><div class="e">'+esc(w.en)+'</div>'+
        '<div class="e">“'+boldWord(w.ex,w.word)+'”</div></div>'+
        '<div class="flags">'+flagButtons(w)+'</div>'+
      '</div>').join('');
  }
  // 목록형: 한 줄에 단어–뜻, 행을 누르면 영영뜻·예문 펼침
  function browseListMarkup(list){
    return '<div class="w-list">'+list.map((w,i)=>
      '<div class="w-row'+(isKnown(w.word)?" known":"")+'" data-i="'+i+'">'+
        '<input type="checkbox" class="sel" data-sel="'+esc(w.word)+'"'+(selected[w.word]?" checked":"")+' aria-label="선택" />'+
        '<span class="dot '+LV[w.level].c+'" title="'+LV[w.level].n+'"></span>'+
        '<span class="w">'+esc(w.word)+'<span class="p">'+esc(w.pos)+'</span></span>'+
        '<span class="k">'+esc(w.ko)+'</span>'+
        '<span class="acts">'+flagButtons(w)+'</span>'+
      '</div>'+
      '<div class="w-detail" data-d="'+i+'" style="display:none">'+
        '<div class="e">'+esc(w.en)+'</div><div class="e">“'+boldWord(w.ex,w.word)+'”</div>'+
        (w.topic?'<div><span class="topic-tag">'+esc(w.topic)+'</span></div>':'')+
      '</div>').join('')+'</div>';
  }

  /** 카드형에서 "외움" 배지만 붙였다 뗀다 — 목록 전체를 다시 그리지 않기 위해. */
  function syncKnownBadge(item,on){
    const top=item.querySelector(".top"); if(!top)return;
    const badge=top.querySelector(".badge-known");
    if(on&&!badge){ const s=document.createElement("span"); s.className="badge-known"; s.textContent="외움"; top.appendChild(s); }
    else if(!on&&badge){ badge.parentNode.removeChild(badge); }
  }

  function bindBrowse(box){
    // 플래그는 목록 전체를 다시 그리지 않고 해당 요소만 갱신한다.
    // 단, 지금 보고 있는 필터에서 그 단어가 빠져야 하는 경우엔 다시 그린다.
    qsa("[data-star]",box).forEach(b=>b.addEventListener("click",e=>{
      e.stopPropagation();
      const on=toggleFlag(store.star,b.dataset.star);
      b.classList.toggle("on",on); b.textContent=on?"★":"☆";
      if(browseFilter==="star"&&!on) renderBrowse(false);
    }));
    qsa("[data-known]",box).forEach(b=>b.addEventListener("click",e=>{
      e.stopPropagation();
      const on=toggleFlag(store.known,b.dataset.known);
      b.classList.toggle("on",on);
      const row=b.closest(".w-row"); if(row)row.classList.toggle("known",on);
      const item=b.closest(".w-item"); if(item)syncKnownBadge(item,on);
      updateProgress();
      if(browseFilter==="known"||browseFilter==="unknown") renderBrowse(false);
    }));
    qsa("[data-speak]",box).forEach(b=>b.addEventListener("click",e=>{ e.stopPropagation(); speak(b.dataset.speak); }));
    qsa(".w-row",box).forEach(row=>row.addEventListener("click",e=>{
      if(e.target.closest("button")||e.target.closest("input"))return;
      row.querySelector(".k").classList.add("show");
      const d=box.querySelector('[data-d="'+row.dataset.i+'"]');
      if(d) d.style.display = d.style.display==="none" ? "block" : "none";
    }));
    qsa(".w-item .k",box).forEach(k=>k.addEventListener("click",()=>k.classList.add("show")));
    const more=$("browse-more");
    if(more) more.addEventListener("click",()=>{ browseShown+=BROWSE_PAGE; renderBrowse(false); });
  }

  /** @param {boolean} [resetPage=true] false 면 "더 보기"로 펼친 범위를 유지한다. */
  function renderBrowse(resetPage){
    if(resetPage!==false) browseShown=BROWSE_PAGE;
    const list=browseList();
    $("browse-count").textContent=list.length+"개 단어";
    updateExportScope(list);
    const box=$("browse-list");
    if(!list.length){ box.innerHTML='<div class="empty">해당하는 단어가 없습니다.</div>'; return; }
    const slice=list.slice(0,browseShown);
    box.innerHTML=(browseView==="list"?browseListMarkup(slice):browseCardMarkup(slice))+
      (list.length>browseShown
        ? '<button class="more-btn" id="browse-more">더 보기 · '+(list.length-browseShown)+'개 남음</button>'
        : '');
    bindBrowse(box);
    bindSelectBoxes(box);
  }

  // ---- 선택 & 내보내기 (인쇄·PDF / 엑셀 CSV) ----
  function selectedWords(){ return Object.keys(selected).filter(w=>selected[w]); }
  function bindSelectBoxes(box){
    box.querySelectorAll("[data-sel]").forEach(c=>c.addEventListener("change",()=>{
      const w=c.dataset.sel;
      if(c.checked) selected[w]=true; else delete selected[w];
      updateExportScope();
    }));
  }
  // 내보내기 대상: 선택한 단어가 있으면 그것만, 없으면 현재 필터 결과 전체
  function exportTarget(){
    const sel=selectedWords();
    if(sel.length){ const s={}; sel.forEach(w=>s[w]=1); return WORDS.filter(w=>s[w.word]); }
    return browseList();
  }
  function exportDesc(){
    const sel=selectedWords();
    if(sel.length) return "직접 선택한 단어";
    const p=[browseF.desc()];
    const fname={unknown:"안 외운 것",known:"외운 것",star:"즐겨찾기"}[browseFilter];
    if(fname)p.push(fname);
    const q=($("browse-search").value||"").trim(); if(q)p.push('검색 "'+q+'"');
    return p.join(" · ");
  }
  function updateExportScope(list){
    const n=selectedWords().length;
    $("export-scope").textContent = n ? ("선택 "+n+"개 내보내기") : ("현재 목록 "+(list||browseList()).length+"개 내보내기");
  }
  function stamp(){ const d=new Date(), p=n=>String(n).padStart(2,"0"); return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate()); }

  function downloadCSV(){
    const list=exportTarget();
    if(!list.length){ toast("내보낼 단어가 없습니다"); return; }
    const head=["No","Word","POS","뜻","영영뜻","예문","난이도","주제","외움","즐겨찾기"];
    const rows=list.map((w,i)=>[i+1,w.word,w.pos,w.ko,w.en,w.ex,LV[w.level].n,w.topic||"",isKnown(w.word)?"O":"",isStar(w.word)?"O":""]);
    const cell=v=>'"'+String(v).replace(/"/g,'""')+'"';
    // 엑셀에서 한글이 깨지지 않도록 BOM 포함
    const BOM=String.fromCharCode(0xFEFF);
    const csv=BOM+[head].concat(rows).map(r=>r.map(cell).join(",")).join("\r\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download="vocab_"+stamp()+"_"+list.length+".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    toast(list.length+"개 단어를 CSV로 저장했습니다 📊");
  }

  function printList(){
    const list=exportTarget();
    if(!list.length){ toast("인쇄할 단어가 없습니다"); return; }
    const rows=list.map((w,i)=>
      '<tr>'+
        '<td class="c-no">'+(i+1)+'</td>'+
        '<td class="c-w">'+esc(w.word)+'</td>'+
        '<td class="c-p">'+esc(w.pos)+'</td>'+
        '<td class="c-lv">'+LV[w.level].n+'<br/><span style="color:#777">'+esc(w.topic||"")+'</span></td>'+
        '<td class="c-ko">'+(blankMode?'<div class="c-blank"></div>':'<b>'+esc(w.ko)+'</b><div class="ex">'+esc(w.en)+'</div>')+'</td>'+
        '<td>'+esc(w.ex)+'</td>'+
      '</tr>').join('');
    $("print-area").innerHTML=
      '<h1>📖 나의 단어장'+(blankMode?' · 시험지형':'')+'</h1>'+
      '<div class="meta">'+esc(exportDesc())+' · 총 '+list.length+'개 · '+stamp()+'</div>'+
      '<table><thead><tr>'+
        '<th class="c-no">#</th><th class="c-w">Word</th><th class="c-p">품사</th>'+
        '<th class="c-lv">난이도·주제</th><th class="c-ko">'+(blankMode?'뜻 쓰기':'뜻 / 영영뜻')+'</th><th>예문</th>'+
      '</tr></thead><tbody>'+rows+'</tbody></table>';
    setTimeout(()=>window.print(),60);
  }

  $("btn-select").addEventListener("click",()=>{
    selectMode=!selectMode;
    $("btn-select").setAttribute("aria-pressed",selectMode);
    document.body.classList.toggle("select-mode",selectMode);
    toast(selectMode?"단어 왼쪽 체크박스로 선택하세요 ☑":"선택 모드를 껐습니다");
  });
  $("btn-select-all").addEventListener("click",()=>{
    browseList().forEach(w=>selected[w.word]=true);
    if(!selectMode){ selectMode=true; $("btn-select").setAttribute("aria-pressed",true); document.body.classList.add("select-mode"); }
    renderBrowse(false); toast(selectedWords().length+"개 선택됨");
  });
  $("btn-select-none").addEventListener("click",()=>{ selected={}; renderBrowse(false); toast("선택을 모두 해제했습니다"); });
  $("btn-blank").addEventListener("click",()=>{
    blankMode=!blankMode;
    $("btn-blank").setAttribute("aria-pressed",blankMode);
    toast(blankMode?"뜻을 빈칸으로 인쇄합니다 ✍️":"뜻을 함께 인쇄합니다");
  });
  $("btn-print").addEventListener("click",printList);
  $("btn-csv").addEventListener("click",downloadCSV);

  // ---- 문법 (토익 Part 5 형식) ----
  const GRAM = (window.GRAMMAR_QUESTIONS || []).slice();
  const GCATS = (function(){ const s=[]; GRAM.forEach(g=>{ if(s.indexOf(g.cat)<0)s.push(g.cat); }); return s; })();
  const AB = ["A","B","C","D"];
  let gLv=0, gCat="all", gMode="solve", gram=null;

  function gramPool(){
    const q=($("gram-search").value||"").trim().toLowerCase();
    return GRAM.filter(g=>{
      if(gLv!==0 && g.level!==gLv)return false;
      if(gCat!=="all" && g.cat!==gCat)return false;
      if(q && !((g.q||"").toLowerCase().includes(q)||(g.ko||"").includes(q)||(g.exp||"").includes(q)||
                (g.cat||"").includes(q)||(g.sub||"").includes(q)||(g.opts||[]).join(" ").toLowerCase().includes(q)))return false;
      return true;
    });
  }
  // 빈칸(----)을 밑줄 또는 정답이 채워진 형태로 렌더
  function gramSentence(g, filled, cls){
    const parts = esc(g.q).split("----");
    const mid = filled ? '<span class="filled">'+esc(filled)+'</span>' : '<span class="blank"></span>';
    return '<div class="'+(cls||"gram-q")+'">'+parts[0]+mid+(parts[1]||"")+'</div>';
  }
  function buildGramChips(){
    const inCat = GRAM.filter(g=>gCat==="all"||g.cat===gCat);
    $("gram-lv").innerHTML = [[0,"전체","--accent"],[1,"기초","--lv1"],[2,"중급","--lv2"],[3,"고급","--lv3"]].map(function(d){
      const cnt = d[0]===0?inCat.length:inCat.filter(g=>g.level===d[0]).length;
      const dot = d[0]===0?"":'<span class="dot" style="background:var('+d[2]+')"></span>';
      return '<button class="lv-chip" data-lv="'+d[0]+'" aria-pressed="'+(gLv===d[0])+'">'+dot+d[1]+' <span style="opacity:.7">'+cnt+'</span></button>';
    }).join("");
    const inLv = GRAM.filter(g=>gLv===0||g.level===gLv);
    $("gram-cat").innerHTML = '<button class="tp-chip" data-gc="all" aria-pressed="'+(gCat==="all")+'">🗂 전체 유형<span class="c">'+inLv.length+'</span></button>'+
      GCATS.map(function(c){
        const n=inLv.filter(g=>g.cat===c).length;
        return '<button class="tp-chip" data-gc="'+esc(c)+'" aria-pressed="'+(gCat===c)+'">'+esc(c)+'<span class="c">'+n+'</span></button>';
      }).join("");
    $("gram-lv").querySelectorAll(".lv-chip").forEach(b=>b.addEventListener("click",()=>{ gLv=parseInt(b.dataset.lv,10); buildGramChips(); startGram(); }));
    $("gram-cat").querySelectorAll(".tp-chip").forEach(b=>b.addEventListener("click",()=>{ gCat=b.dataset.gc; buildGramChips(); startGram(); }));
  }
  $("gram-search").addEventListener("input",()=>{ buildGramChips(); startGram(); });
  $("gram-mode").querySelectorAll("[data-gmode]").forEach(b=>b.addEventListener("click",()=>{
    $("gram-mode").querySelectorAll("[data-gmode]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    gMode=b.dataset.gmode; startGram();
  }));
  $("gram-shuffle").addEventListener("click",()=>{ startGram(); toast(gMode==="solve"?"새 문제 세트를 뽑았습니다 🔀":"순서를 섞었습니다 🔀"); });

  function startGram(){
    const pool=gramPool();
    $("gram-count").textContent = pool.length+"문항"+(gMode==="solve"&&pool.length?" 중 10문항 출제":"");
    if(!pool.length){ gram=null; $("gram-body").innerHTML='<div class="empty">조건에 맞는 문제가 없습니다.<br/>유형·난이도 필터를 넓혀 보세요.</div>'; return; }
    if(gMode==="list"){ gram=null; renderGramList(pool); return; }
    gram={list:shuffled(pool).slice(0,Math.min(10,pool.length)),i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.gram,records:0};
    renderGram();
  }
  function renderGram(){
    if(!gram)return;
    if(gram.i>=gram.list.length){ renderGramResult(); return; }
    const g=gram.list[gram.i];
    gram.answered=false;
    const pct=Math.round(gram.i/gram.list.length*100);
    $("gram-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 것을 고르세요 · '+(gram.i+1)+' / '+gram.list.length+'</span>'+
        '<span id="gram-streak">'+gramStreakHTML()+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(g.cat)+'</span>'+
        (g.sub?'<span class="topic-tag">'+esc(g.sub)+'</span>':'')+
        '<span class="lv-badge '+LV[g.level].c+'">'+LV[g.level].n+'</span></div>'+
      gramSentence(g)+
      g.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="gram-score-n">'+gram.score+'</b> / '+gram.list.length+bestLabel("gram")+'</span>'+
      '<button class="quiz-next" id="gram-next">다음 →</button></div>'+
      '<div id="gram-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    $("gram-body").querySelectorAll(".opt").forEach(o=>o.addEventListener("click",()=>answerGram(parseInt(o.dataset.i,10),g)));
    $("gram-next").addEventListener("click",()=>{ gram.i++; renderGram(); });
  }
  function gramStreakHTML(){ return gram ? comboBadge(gram.streak) : ''; }
  function answerGram(pick,g){
    if(gram.answered)return; gram.answered=true;
    const correct = pick===g.ans;
    const btns=$("gram-body").querySelectorAll(".opt");
    let record=false;
    if(correct){
      gram.score++; gram.streak++; gram.best=Math.max(gram.best,gram.streak);
      record=registerCombo(gram,"gram");
      if(record)gram.records++;
      beep("ok",gram.streak);
      confetti(record?110:gram.streak>=10?90:gram.streak>=5?70:gram.streak>=3?45:26);
      comboPopup(gram.streak,record);
      const sn=$("gram-score-n"); sn.textContent=gram.score; sn.classList.add("bump");
      const bi=document.querySelector("#gram-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((gram.i+1)/gram.list.length*100)+"%";
    }else{ gram.streak=0; gram.recordShown=false; beep("no"); btns[pick].classList.add("wrong"); }
    btns.forEach((b,i)=>{ b.disabled=true; if(i===g.ans)b.classList.add("correct"); });
    const sb=$("gram-streak"); if(sb)sb.innerHTML=gramStreakHTML();
    $("gram-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[g.ans]+')')+
        (correct?' '+comboBadge(gram.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      gramSentence(g,g.opts[g.ans],"gram-list-q")+
      '<div class="gram-ko">'+esc(g.ko)+'</div>'+
      '<div class="gram-exp">'+esc(g.exp)+'</div>'+
    '</div>';
    const nb=$("gram-next"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=gram.i===gram.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderGramResult(){
    const pct=Math.round(gram.score/gram.list.length*100);
    const perfect=gram.score===gram.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"해설을 다시 보며 복습해요 📖";
    $("gram-body").innerHTML='<div class="result"><div class="big">'+gram.score+' / '+gram.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(gram,"gram")+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="gram-restart">새 문제 풀기 (Enter)</button></div>';
    $("gram-restart").addEventListener("click",startGram);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",gram.best); }
  }
  // 문제 보기 모드: 제목만 보이고 누르면 정답·해석·해설 펼침
  function renderGramList(pool){
    $("gram-body").innerHTML=pool.map((g,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(g.cat)+'</span>'+
            (g.sub?'<span class="topic-tag">'+esc(g.sub)+'</span>':'')+
            '<span class="lv-badge '+LV[g.level].c+'">'+LV[g.level].n+'</span></div>'+
          gramSentence(g,null,"gram-list-q")+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="gram-ans">정답 ('+AB[g.ans]+') '+esc(g.opts[g.ans])+'</div>'+
          '<div class="gram-opts">'+g.opts.map((o,k)=>'<span class="'+(k===g.ans?"ok":"")+'">('+AB[k]+') '+esc(o)+'</span>').join('')+'</div>'+
          gramSentence(g,g.opts[g.ans],"gram-list-q")+
          '<div class="gram-ko">'+esc(g.ko)+'</div>'+
          '<div class="gram-exp">'+esc(g.exp)+'</div>'+
        '</div>'+
      '</div>').join('');
    $("gram-body").querySelectorAll(".sp-item").forEach(item=>{
      item.querySelector(".sp-head").addEventListener("click",()=>item.classList.toggle("open"));
    });
  }
  // 문법 키보드 조작 (A~D / 1~4 / Enter)
  document.addEventListener("keydown",e=>{
    if(!$("panel-gram").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("gram-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(!gram||gMode!=="solve")return;
    const opts=Array.prototype.slice.call($("gram-body").querySelectorAll(".opt"));
    if(!opts.length)return;
    const k=String(e.key||"").toUpperCase();
    let idx=AB.indexOf(k);
    if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
    if(!gram.answered && idx>=0 && idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(gram.answered && $("gram-next")) $("gram-next").click();
    }
  });

  // ---- 구문 (문장 구조) ----
  const STRUCTS = (window.STRUCTURES || []).slice();
  const SCATS = (function(){ const s=[]; STRUCTS.forEach(x=>{ if(s.indexOf(x.cat)<0)s.push(x.cat); }); return s; })();
  const STOPICS = (function(){
    const have={}; STRUCTS.forEach(x=>{ if(x.topic)have[x.topic]=1; });
    const list=TOPIC_ORDER.filter(t=>have[t]);
    Object.keys(have).forEach(t=>{ if(list.indexOf(t)<0)list.push(t); });
    return list;
  })();
  let sLv=0, sCat="all", sTopic="all", sMode="solve", struct=null;

  /* 난이도·유형·주제 세 축을 함께 쓰므로, 칩 개수를 계산할 때는
     자기 자신의 축만 빼고 나머지 조건을 적용한다(skip). */
  function structMatch(x, skip){
    if(skip!=="lv" && sLv!==0 && x.level!==sLv) return false;
    if(skip!=="cat" && sCat!=="all" && x.cat!==sCat) return false;
    if(skip!=="topic" && sTopic!=="all" && x.topic!==sTopic) return false;
    const q=($("struct-search").value||"").trim().toLowerCase();
    if(q && !((x.pat||"").toLowerCase().includes(q) || (x.en||"").toLowerCase().includes(q) ||
              (x.ko||"").includes(q) || (x.note||"").includes(q) ||
              (x.cat||"").includes(q) || (x.topic||"").includes(q))) return false;
    return true;
  }
  function structPool(){ return STRUCTS.filter(x=>structMatch(x)); }

  function buildStructChips(){
    const forLv = STRUCTS.filter(x=>structMatch(x,"lv"));
    $("struct-lv").innerHTML = LV_DEFS.map(function(d){
      const v=d[0];
      const cnt = v===0?forLv.length:forLv.filter(x=>x.level===v).length;
      const dot = v===0?"":'<span class="dot" style="background:var('+d[2]+')"></span>';
      return '<button class="lv-chip" data-lv="'+v+'" aria-pressed="'+(sLv===v)+'"'+(cnt?'':' style="opacity:.35"')+'>'+dot+d[1]+' <span style="opacity:.7">'+cnt+'</span></button>';
    }).join("");
    const forCat = STRUCTS.filter(x=>structMatch(x,"cat"));
    $("struct-cat").innerHTML = '<button class="tp-chip" data-sc="all" aria-pressed="'+(sCat==="all")+'">🗂 전체 유형<span class="c">'+forCat.length+'</span></button>'+
      SCATS.map(function(c){
        const n=forCat.filter(x=>x.cat===c).length;
        return '<button class="tp-chip" data-sc="'+esc(c)+'" aria-pressed="'+(sCat===c)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(c)+'<span class="c">'+n+'</span></button>';
      }).join("");
    const forTp = STRUCTS.filter(x=>structMatch(x,"topic"));
    $("struct-topic").innerHTML = '<button class="tp-chip" data-st="all" aria-pressed="'+(sTopic==="all")+'">🗂 전체 주제<span class="c">'+forTp.length+'</span></button>'+
      STOPICS.map(function(t){
        const n=forTp.filter(x=>x.topic===t).length;
        return '<button class="tp-chip" data-st="'+esc(t)+'" aria-pressed="'+(sTopic===t)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(t)+'<span class="c">'+n+'</span></button>';
      }).join("");
    qsa(".lv-chip",$("struct-lv")).forEach(b=>b.addEventListener("click",()=>{ sLv=parseInt(b.dataset.lv,10); buildStructChips(); startStruct(); }));
    qsa("[data-sc]",$("struct-cat")).forEach(b=>b.addEventListener("click",()=>{ sCat=b.dataset.sc; buildStructChips(); startStruct(); }));
    qsa("[data-st]",$("struct-topic")).forEach(b=>b.addEventListener("click",()=>{ sTopic=b.dataset.st; buildStructChips(); startStruct(); }));
  }

  // 예문에서 blank 자리를 빈칸 또는 정답이 채워진 형태로 렌더
  function structSentence(x, filled){
    const i=x.en.indexOf(x.blank);
    const mid = filled ? '<span class="blank filled">'+esc(filled)+'</span>' : '<span class="blank">______</span>';
    return esc(x.en.slice(0,i))+mid+esc(x.en.slice(i+x.blank.length));
  }
  // 구조 보기 모드: 핵심부에 밑줄을 그어 어디가 그 구조인지 드러낸다
  function structHighlight(x){
    const i=x.en.indexOf(x.blank);
    return esc(x.en.slice(0,i))+'<span class="hl">'+esc(x.blank)+'</span>'+esc(x.en.slice(i+x.blank.length));
  }

  $("struct-search").addEventListener("input",()=>{ buildStructChips(); startStruct(); });
  qsa("[data-smode]",$("struct-mode")).forEach(b=>b.addEventListener("click",()=>{
    qsa("[data-smode]",$("struct-mode")).forEach(x=>x.setAttribute("aria-pressed",x===b));
    sMode=b.dataset.smode; startStruct();
  }));
  $("struct-shuffle").addEventListener("click",()=>{
    startStruct();
    toast(sMode==="solve"?"새 문제 세트를 뽑았습니다 🔀":"구조 유형 순서로 정렬했습니다");
  });

  function startStruct(){
    const pool=structPool();
    $("struct-count").textContent = pool.length+"개 구문"+(sMode==="solve"&&pool.length?" 중 "+Math.min(10,pool.length)+"문항 출제":"");
    if(!pool.length){ struct=null; $("struct-body").innerHTML='<div class="empty">조건에 맞는 구문이 없습니다.<br/>유형·주제·난이도 필터를 넓혀 보세요.</div>'; return; }
    if(sMode==="list"){ struct=null; renderStructList(pool); return; }
    struct={
      list: shuffled(pool).slice(0,Math.min(10,pool.length)).map(x=>({x:x, opts:shuffled([x.blank].concat(x.opts))})),
      i:0, score:0, answered:false, streak:0, best:0, prevBest:bestCombo.struct, records:0, missed:[]
    };
    renderStruct();
  }
  function renderStruct(){
    if(!struct)return;
    if(struct.i>=struct.list.length){ renderStructResult(); return; }
    const it=struct.list[struct.i], x=it.x;
    struct.answered=false;
    const pct=Math.round(struct.i/struct.list.length*100);
    $("struct-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 것을 고르세요 · '+(struct.i+1)+' / '+struct.list.length+'</span>'+
        '<span id="struct-streak">'+comboBadge(struct.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(x.cat)+'</span>'+
        '<span class="topic-tag">'+esc(x.topic)+'</span>'+
        '<span class="lv-badge '+LV[x.level].c+'">'+LV[x.level].n+'</span></div>'+
      '<div class="st-q">'+structSentence(x)+'</div>'+
      it.opts.map((o,i)=>'<button class="opt" data-o="'+esc(o)+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="struct-score-n">'+struct.score+'</b> / '+struct.list.length+bestLabel("struct")+'</span>'+
      '<button class="quiz-next" id="struct-next">다음 →</button></div>'+
      '<div id="struct-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    qsa(".opt",$("struct-body")).forEach(b=>b.addEventListener("click",()=>answerStruct(b,it)));
    $("struct-next").addEventListener("click",()=>{ struct.i++; renderStruct(); });
  }
  function answerStruct(btn,it){
    if(struct.answered)return; struct.answered=true;
    const x=it.x, correct=btn.dataset.o===x.blank;
    let record=false;
    if(correct){
      struct.score++; struct.streak++; struct.best=Math.max(struct.best,struct.streak);
      record=registerCombo(struct,"struct");
      if(record)struct.records++;
      beep("ok",struct.streak);
      confetti(record?110:struct.streak>=10?90:struct.streak>=5?70:struct.streak>=3?45:26);
      comboPopup(struct.streak,record);
      const sn=$("struct-score-n"); sn.textContent=struct.score; sn.classList.add("bump");
      const bi=document.querySelector("#struct-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((struct.i+1)/struct.list.length*100)+"%";
    }else{
      struct.streak=0; struct.recordShown=false; beep("no");
      btn.classList.add("wrong"); struct.missed.push(x);
    }
    qsa(".opt",$("struct-body")).forEach(b=>{ b.disabled=true; if(b.dataset.o===x.blank)b.classList.add("correct"); });
    // 빈칸에 정답을 채워 구조가 완성된 모습을 그대로 보여 준다
    const qBox=$("struct-body").querySelector(".st-q");
    if(qBox)qBox.innerHTML=structSentence(x,x.blank);
    const sb=$("struct-streak"); if(sb)sb.innerHTML=comboBadge(struct.streak);
    $("struct-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 '+esc(x.blank))+
        (correct?' '+comboBadge(struct.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="st-pat">'+esc(x.pat)+'</div>'+
      '<div class="st-ko">'+esc(x.ko)+'</div>'+
      '<div class="st-note">'+esc(x.note)+'</div>'+
      '<div class="sp-controls" style="margin:12px 0 0"><button id="struct-say">🔊 예문 듣기</button></div>'+
    '</div>';
    $("struct-say").addEventListener("click",e=>{ e.stopPropagation(); speak(x.en,{rate:.88}); });
    const nb=$("struct-next"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=struct.i===struct.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderStructResult(){
    const pct=Math.round(struct.score/struct.list.length*100);
    const perfect=struct.score===struct.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"구조 설명을 다시 보며 복습해요 📖";
    const missed = struct.missed.length
      ? '<div class="missed-title">틀린 구문 '+struct.missed.length+'개</div><div class="missed">'+
        struct.missed.map(x=>'<div><b>'+esc(x.pat)+'</b><span class="p">'+esc(x.cat)+'</span></div>').join('')+'</div>'
      : '';
    $("struct-body").innerHTML='<div class="result"><div class="big">'+struct.score+' / '+struct.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(struct,"struct")+missed+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="struct-restart">새 문제 풀기 (Enter)</button></div>';
    $("struct-restart").addEventListener("click",startStruct);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",struct.best); }
  }
  // 구조 보기 모드: 구조명만 보이고 누르면 예문·해석·설명 펼침
  function renderStructList(pool){
    $("struct-body").innerHTML=pool.map((x,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(x.cat)+'</span>'+
            '<span class="topic-tag">'+esc(x.topic)+'</span>'+
            '<span class="lv-badge '+LV[x.level].c+'">'+LV[x.level].n+'</span></div>'+
          '<div class="st-pat">'+esc(x.pat)+'</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="st-en">'+structHighlight(x)+'</div>'+
          '<div class="st-ko">'+esc(x.ko)+'</div>'+
          '<div class="st-note">'+esc(x.note)+'</div>'+
          '<div class="sp-controls" style="margin:12px 0 0"><button data-say="'+esc(x.en)+'">🔊 예문 듣기</button></div>'+
        '</div>'+
      '</div>').join('');
    qsa(".sp-item",$("struct-body")).forEach(item=>{
      item.querySelector(".sp-head").addEventListener("click",()=>{ const o=item.classList.toggle("open"); if(!o)stopSpeak(); });
      const say=item.querySelector("[data-say]");
      if(say)say.addEventListener("click",e=>{ e.stopPropagation(); speak(say.dataset.say,{rate:.88}); });
    });
  }
  // 구문 키보드 조작 (A~D / 1~4 / Enter)
  document.addEventListener("keydown",e=>{
    if(!$("panel-struct").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("struct-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(!struct||sMode!=="solve")return;
    const opts=qsa(".opt",$("struct-body"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
    if(!struct.answered && idx>=0 && idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(struct.answered && $("struct-next")) $("struct-next").click();
    }
  });

  // ---- 장르·슬랭 (SF·판타지 / 힙합 / 스트리트) ----
  const SLANG = (window.SLANG || []).slice();
  const SL_DOMAINS = (function(){ const d=[]; SLANG.forEach(x=>{ if(d.indexOf(x.domain)<0)d.push(x.domain); }); return d; })();
  // 사용 등급 — 이 탭의 핵심. 어디까지 써도 되는지를 색으로 구분한다.
  const REG = {1:{n:"어디서나",c:"r1",i:"🟢"},2:{n:"친한 사이",c:"r2",i:"🟡"},3:{n:"이해만",c:"r3",i:"🔴"}};
  let slDomain="all", slCat="all", slReg=0, slMode="list", slang=null;

  function slangMatch(x, skip){
    if(skip!=="domain" && slDomain!=="all" && x.domain!==slDomain) return false;
    if(skip!=="cat" && slCat!=="all" && x.cat!==slCat) return false;
    if(skip!=="reg" && slReg!==0 && x.reg!==slReg) return false;
    const q=($("slang-search").value||"").trim().toLowerCase();
    if(q && !((x.term||"").toLowerCase().includes(q) || (x.ko||"").includes(q) ||
              (x.en||"").toLowerCase().includes(q) || (x.ex||"").toLowerCase().includes(q) ||
              (x.exKo||"").includes(q) || (x.note||"").includes(q) ||
              (x.cat||"").includes(q) || (x.domain||"").includes(q))) return false;
    return true;
  }
  function slangPool(){ return SLANG.filter(x=>slangMatch(x)); }
  // 분류 칩은 현재 고른 영역 안의 것만 보여 준다 (영역마다 분류 체계가 다르다)
  function slangCats(){
    const src=SLANG.filter(x=>slDomain==="all"||x.domain===slDomain);
    const out=[]; src.forEach(x=>{ if(out.indexOf(x.cat)<0)out.push(x.cat); });
    return out;
  }

  function buildSlangChips(){
    const forDom = SLANG.filter(x=>slangMatch(x,"domain"));
    $("slang-domain").innerHTML='<button class="tp-chip" data-sd="all" aria-pressed="'+(slDomain==="all")+'">🗂 전체<span class="c">'+forDom.length+'</span></button>'+
      SL_DOMAINS.map(function(d){
        const n=forDom.filter(x=>x.domain===d).length;
        return '<button class="tp-chip" data-sd="'+esc(d)+'" aria-pressed="'+(slDomain===d)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(d)+'<span class="c">'+n+'</span></button>';
      }).join("");
    const forCat = SLANG.filter(x=>slangMatch(x,"cat"));
    $("slang-cat").innerHTML='<button class="tp-chip" data-slc="all" aria-pressed="'+(slCat==="all")+'">🗂 전체 분류<span class="c">'+forCat.length+'</span></button>'+
      slangCats().map(function(c){
        const n=forCat.filter(x=>x.cat===c).length;
        return '<button class="tp-chip" data-slc="'+esc(c)+'" aria-pressed="'+(slCat===c)+'"'+(n?'':' style="opacity:.35"')+'>'+esc(c)+'<span class="c">'+n+'</span></button>';
      }).join("");
    const forReg = SLANG.filter(x=>slangMatch(x,"reg"));
    $("slang-reg").innerHTML='<button data-slr="0" aria-pressed="'+(slReg===0)+'">전체 '+forReg.length+'</button>'+
      [1,2,3].map(function(r){
        const n=forReg.filter(x=>x.reg===r).length;
        return '<button data-slr="'+r+'" aria-pressed="'+(slReg===r)+'"'+(n?'':' style="opacity:.35"')+'>'+REG[r].i+' '+REG[r].n+' '+n+'</button>';
      }).join("");
    qsa("[data-sd]",$("slang-domain")).forEach(b=>b.addEventListener("click",()=>{ slDomain=b.dataset.sd; slCat="all"; buildSlangChips(); startSlang(); }));
    qsa("[data-slc]",$("slang-cat")).forEach(b=>b.addEventListener("click",()=>{ slCat=b.dataset.slc; buildSlangChips(); startSlang(); }));
    qsa("[data-slr]",$("slang-reg")).forEach(b=>b.addEventListener("click",()=>{ slReg=parseInt(b.dataset.slr,10); buildSlangChips(); startSlang(); }));
  }
  const regBadge = r => '<span class="reg-badge '+REG[r].c+'">'+REG[r].i+' '+REG[r].n+'</span>';
  // 예문에서 표제어가 쓰인 자리를 강조하거나 빈칸으로 가린다
  function slangEx(x, mode, filled){
    const i=x.ex.indexOf(x.blank);
    const mid = mode==="blank"
      ? (filled ? '<span class="blank filled">'+esc(filled)+'</span>' : '<span class="blank">______</span>')
      : '<span class="hl">'+esc(x.blank)+'</span>';
    return esc(x.ex.slice(0,i))+mid+esc(x.ex.slice(i+x.blank.length));
  }

  $("slang-search").addEventListener("input",()=>{ buildSlangChips(); startSlang(); });
  qsa("[data-slmode]",$("slang-mode")).forEach(b=>b.addEventListener("click",()=>{
    qsa("[data-slmode]",$("slang-mode")).forEach(x=>x.setAttribute("aria-pressed",x===b));
    slMode=b.dataset.slmode; startSlang();
  }));
  $("slang-shuffle").addEventListener("click",()=>{
    startSlang();
    toast(slMode==="quiz"?"새 문제 세트를 뽑았습니다 🔀":"영역 순서로 정렬했습니다");
  });

  function startSlang(){
    const pool=slangPool();
    $("slang-count").textContent = pool.length+"개"+(slMode==="quiz"&&pool.length?" 중 "+Math.min(10,pool.length)+"문항 출제":"");
    if(!pool.length){ slang=null; $("slang-body").innerHTML='<div class="empty">조건에 맞는 표현이 없습니다.<br/>영역·분류·등급 필터를 넓혀 보세요.</div>'; return; }
    if(slMode==="list"){ slang=null; renderSlangList(pool); return; }
    // 문제 유형: 예문 빈칸 / 뜻 고르기를 섞어 낸다
    slang={
      list: shuffled(pool).slice(0,Math.min(10,pool.length)).map(x=>{
        const kind = Math.random()<.5 ? "blank" : "meaning";
        return {x:x, kind:kind, opts:slangOpts(x,kind)};
      }),
      i:0, score:0, answered:false, streak:0, best:0, prevBest:bestCombo.slang, records:0, missed:[]
    };
    renderSlang();
  }
  /* 오답 보기는 같은 영역에서 먼저 뽑는다 — SF 단어 사이에 스트리트 슬랭이 섞이면
     내용을 몰라도 눈치로 걸러낼 수 있어 문제가 헐거워진다. */
  function slangOpts(x,kind){
    const key = kind==="blank" ? (w=>w.blank) : (w=>w.ko);
    const taken={}; taken[key(x)]=1;
    const out=[x];
    const drain=list=>{
      for(let i=0;i<list.length&&out.length<4;i++){
        const w=list[i]; if(w.term===x.term||taken[key(w)])continue;
        taken[key(w)]=1; out.push(w);
      }
    };
    drain(shuffled(SLANG.filter(w=>w.domain===x.domain)));
    drain(shuffled(SLANG));
    return shuffleInPlace(out);
  }
  function renderSlang(){
    if(!slang)return;
    if(slang.i>=slang.list.length){ renderSlangResult(); return; }
    const it=slang.list[slang.i], x=it.x;
    slang.answered=false;
    const pct=Math.round(slang.i/slang.list.length*100);
    const head = it.kind==="blank"
      ? '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 표현을 고르세요 · '+(slang.i+1)+' / '+slang.list.length+'</span>'+
        '<span id="slang-streak">'+comboBadge(slang.streak)+'</span></div>'+
        '<div class="sl-q">'+slangEx(x,"blank")+'</div>'
      : '<div class="quiz-topline"><span class="quiz-q">다음 표현의 뜻을 고르세요 · '+(slang.i+1)+' / '+slang.list.length+'</span>'+
        '<span id="slang-streak">'+comboBadge(slang.streak)+'</span></div>'+
        '<div class="quiz-word">'+esc(x.term)+' <button class="speak" style="vertical-align:middle;margin-left:6px" id="slang-speak">🔊</button></div>'+
        '<div class="quiz-pos">'+esc(x.pos)+'</div>';
    const label = o => it.kind==="blank" ? esc(o.blank) : esc(o.ko);
    $("slang-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+pct+'%"></i></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(x.domain)+'</span>'+
        '<span class="topic-tag">'+esc(x.cat)+'</span></div>'+
      head+
      it.opts.map((o,i)=>'<button class="opt" data-t="'+esc(o.term)+'"><span class="key ab">'+AB[i]+'</span>'+label(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="slang-score-n">'+slang.score+'</b> / '+slang.list.length+bestLabel("slang")+'</span>'+
      '<button class="quiz-next" id="slang-next">다음 →</button></div>'+
      '<div id="slang-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> 답 고르기 · <b>Enter</b> 다음 문제</div>'+
    '</div>';
    if(it.kind==="meaning") $("slang-speak").addEventListener("click",e=>{ e.stopPropagation(); speak(x.term); });
    qsa(".opt",$("slang-body")).forEach(b=>b.addEventListener("click",()=>answerSlang(b,it)));
    $("slang-next").addEventListener("click",()=>{ slang.i++; renderSlang(); });
  }
  function answerSlang(btn,it){
    if(slang.answered)return; slang.answered=true;
    const x=it.x, correct=btn.dataset.t===x.term;
    let record=false;
    if(correct){
      slang.score++; slang.streak++; slang.best=Math.max(slang.best,slang.streak);
      record=registerCombo(slang,"slang");
      if(record)slang.records++;
      beep("ok",slang.streak);
      confetti(record?110:slang.streak>=10?90:slang.streak>=5?70:slang.streak>=3?45:26);
      comboPopup(slang.streak,record);
      const sn=$("slang-score-n"); sn.textContent=slang.score; sn.classList.add("bump");
      const bi=document.querySelector("#slang-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((slang.i+1)/slang.list.length*100)+"%";
    }else{
      slang.streak=0; slang.recordShown=false; beep("no");
      btn.classList.add("wrong"); slang.missed.push(x);
    }
    qsa(".opt",$("slang-body")).forEach(b=>{ b.disabled=true; if(b.dataset.t===x.term)b.classList.add("correct"); });
    const qBox=$("slang-body").querySelector(".sl-q");
    if(qBox)qBox.innerHTML=slangEx(x,"blank",x.blank);
    const sb=$("slang-streak"); if(sb)sb.innerHTML=comboBadge(slang.streak);
    // 해설에서 사용 등급을 반드시 보여 준다 — 뜻만 알고 아무 데서나 쓰면 곤란해지는 말들이다
    $("slang-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 '+esc(it.kind==="blank"?x.blank:x.ko))+
        (correct?' '+comboBadge(slang.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="sl-term">'+esc(x.term)+'<span class="p">'+esc(x.pos)+'</span> '+regBadge(x.reg)+'</div>'+
      '<div class="sl-ko">'+esc(x.ko)+'</div>'+
      '<div class="sl-en">'+esc(x.en)+'</div>'+
      '<div class="sl-ex">'+slangEx(x,"hl")+'</div>'+
      '<div class="sl-exko">'+esc(x.exKo)+'</div>'+
      '<div class="sl-note'+(x.reg===3?' warn':'')+'">'+esc(x.note)+'</div>'+
    '</div>';
    const nb=$("slang-next"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=slang.i===slang.list.length-1?"결과 보기 →":"다음 →";
  }
  function renderSlangResult(){
    const pct=Math.round(slang.score/slang.list.length*100);
    const perfect=slang.score===slang.list.length;
    const msg=perfect?"완벽해요! 만점입니다 🏆":pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"보기 모드에서 다시 훑어봐요 📖";
    const missed = slang.missed.length
      ? '<div class="missed-title">틀린 표현 '+slang.missed.length+'개</div><div class="missed">'+
        slang.missed.map(x=>'<div><b>'+esc(x.term)+'</b><span class="p">'+esc(x.domain)+'</span> — '+esc(x.ko)+'</div>').join('')+'</div>'
      : '';
    $("slang-body").innerHTML='<div class="result"><div class="big">'+slang.score+' / '+slang.list.length+'</div><p>'+msg+' ('+pct+'%)</p>'+
      comboSummary(slang,"slang")+missed+
      '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="slang-restart">새 문제 풀기 (Enter)</button></div>';
    $("slang-restart").addEventListener("click",startSlang);
    if(pct>=80){ confetti(perfect?140:80); beep("ok",slang.best); }
  }
  // 보기 모드: 표제어와 등급만 접힌 채로 보이고, 누르면 예문·해석·사용법이 펼쳐진다
  function renderSlangList(pool){
    $("slang-body").innerHTML=pool.map((x,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(x.domain)+'</span>'+
            '<span class="topic-tag">'+esc(x.cat)+'</span>'+regBadge(x.reg)+'</div>'+
          '<div class="sl-term">'+esc(x.term)+'<span class="p">'+esc(x.pos)+'</span></div>'+
          '<div class="sl-ko">'+esc(x.ko)+'</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="sl-en">'+esc(x.en)+'</div>'+
          '<div class="sl-ex">'+slangEx(x,"hl")+'</div>'+
          '<div class="sl-exko">'+esc(x.exKo)+'</div>'+
          '<div class="sl-note'+(x.reg===3?' warn':'')+'">'+esc(x.note)+'</div>'+
          '<div class="sp-controls" style="margin:12px 0 0"><button data-say="'+esc(x.ex)+'">🔊 예문 듣기</button></div>'+
        '</div>'+
      '</div>').join('');
    qsa(".sp-item",$("slang-body")).forEach(item=>{
      item.querySelector(".sp-head").addEventListener("click",()=>{ const o=item.classList.toggle("open"); if(!o)stopSpeak(); });
      const say=item.querySelector("[data-say]");
      if(say)say.addEventListener("click",e=>{ e.stopPropagation(); speak(say.dataset.say,{rate:.9}); });
    });
  }
  // 장르·슬랭 키보드 조작
  document.addEventListener("keydown",e=>{
    if(!$("panel-slang").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    const restart=$("slang-restart");
    if(restart){ if(e.code==="Enter"||e.code==="Space"){ e.preventDefault(); restart.click(); } return; }
    if(!slang||slMode!=="quiz")return;
    const opts=qsa(".opt",$("slang-body"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
    if(!slang.answered && idx>=0 && idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(slang.answered && $("slang-next")) $("slang-next").click();
    }
  });

  // ---- 듀오링고 영어 테스트 (DET) ----
  const DET = window.DET_DATA || {};
  const DET_DESC = {
    select:"화면의 단어 중 <b>실제 존재하는 영단어</b>만 고릅니다. 실제 시험에서는 9개 중 정답 개수가 공개되지 않습니다.",
    complete:"지문에서 <b>글자가 지워진 단어</b>를 채웁니다. 앞 글자와 문맥으로 나머지를 추론하는 c-test 형식입니다.",
    listen:"문장을 듣고 <b>그대로 받아쓰기</b>합니다. 실제 시험처럼 재생 횟수가 3회로 제한됩니다.",
    passage:"지문의 빈칸에 알맞은 표현을 고릅니다. Interactive Reading의 <b>Complete the Passage</b> 유형입니다.",
    ws:"사진 묘사·읽고 쓰기·듣고 말하기·대화 요약 등 <b>주관식 유형의 모범답변</b>을 유형별로 정리했습니다."
  };
  let detMode="select", detLv=0, det=null;

  function detPool(arr){ return arr.filter(x=>detLv===0||x.level===detLv); }
  function buildDetLv(){
    const box=$("det-lv");
    if(detMode==="select"||detMode==="ws"){ box.innerHTML=""; box.style.display="none"; return; }
    box.style.display="flex";
    const src = detMode==="complete"?DET.readComplete : detMode==="listen"?DET.listenType : DET.passageComplete;
    box.innerHTML=[[0,"전체","--accent"],[1,"기초","--lv1"],[2,"중급","--lv2"],[3,"고급","--lv3"]].map(function(d){
      const n=d[0]===0?src.length:src.filter(x=>x.level===d[0]).length;
      const dot=d[0]===0?"":'<span class="dot" style="background:var('+d[2]+')"></span>';
      return '<button class="lv-chip" data-lv="'+d[0]+'" aria-pressed="'+(detLv===d[0])+'"'+(n?'':' disabled style="opacity:.35"')+'>'+dot+d[1]+' <span style="opacity:.7">'+n+'</span></button>';
    }).join("");
    box.querySelectorAll(".lv-chip").forEach(b=>b.addEventListener("click",()=>{ detLv=parseInt(b.dataset.lv,10); buildDetLv(); startDet(); }));
  }
  $("det-mode").querySelectorAll("[data-dm]").forEach(b=>b.addEventListener("click",()=>{
    $("det-mode").querySelectorAll("[data-dm]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    detMode=b.dataset.dm; detLv=0; stopSpeak(); buildDetLv(); startDet();
  }));

  function startDet(){
    $("det-desc").innerHTML=DET_DESC[detMode]||"";
    if(detMode==="select")   return renderSelect();
    if(detMode==="complete") return renderComplete();
    if(detMode==="listen")   return renderListen();
    if(detMode==="passage")  return renderDetPassage();
    if(detMode==="ws")       return renderDetWS();
  }

  // ── Read and Select ── 실제 단어만 고르기
  function renderSelect(){
    const realPool = (DET.readSelect.real||[]).concat(WORDS.map(w=>w.word));
    const nReal = 4+Math.floor(Math.random()*2);              // 실제 단어 4~5개
    const items = shuffled(realPool).slice(0,nReal).map(w=>({w:w,real:true}))
      .concat(shuffled(DET.readSelect.fake||[]).slice(0,9-nReal).map(w=>({w:w,real:false})));
    det={items:shuffled(items),picked:{},done:false};
    drawSelect();
  }
  function drawSelect(){
    $("det-body").innerHTML='<div class="det-card">'+
      '<div class="det-head">이 중 <b>실제로 존재하는 영어 단어</b>를 모두 고르세요. (9개 중 일부)</div>'+
      '<div class="ws-grid">'+det.items.map((it,i)=>
        '<button data-i="'+i+'" aria-pressed="'+(det.picked[i]?"true":"false")+'">'+esc(it.w)+'</button>').join('')+'</div>'+
      '<div id="det-sel-result"></div>'+
      '<div class="det-actions">'+
        '<button class="det-btn" id="det-check">채점하기</button>'+
        '<button class="det-btn sub" id="det-next">새 문제 →</button>'+
      '</div></div>';
    $("det-body").querySelectorAll(".ws-grid button").forEach(b=>b.addEventListener("click",()=>{
      if(det.done)return;
      const i=b.dataset.i; det.picked[i]=!det.picked[i];
      b.setAttribute("aria-pressed",det.picked[i]?"true":"false");
    }));
    $("det-check").addEventListener("click",gradeSelect);
    $("det-next").addEventListener("click",renderSelect);
  }
  function gradeSelect(){
    if(det.done)return; det.done=true;
    let hit=0,miss=0,missed=0;
    $("det-body").querySelectorAll(".ws-grid button").forEach((b,i)=>{
      const it=det.items[i], picked=!!det.picked[i];
      b.disabled=true; b.removeAttribute("aria-pressed");
      if(picked&&it.real){ b.classList.add("hit"); hit++; }
      else if(picked&&!it.real){ b.classList.add("miss"); miss++; }
      else if(!picked&&it.real){ b.classList.add("missed"); missed++; }
    });
    const totalReal=det.items.filter(x=>x.real).length;
    const perfect = hit===totalReal && miss===0;
    if(perfect){ beep("ok",2); confetti(40); } else beep("no");
    $("det-sel-result").innerHTML='<div class="reveal '+(perfect?"ok":"no")+'" style="margin-top:16px">'+
      '<div class="verdict">'+(perfect?'🎉 완벽합니다!':'💡 실제 단어 '+totalReal+'개 중 '+hit+'개 정답')+'</div>'+
      '<div class="rv-sub">맞게 고른 단어 '+hit+'개 · 잘못 고른 가짜 단어 '+miss+'개 · 놓친 실제 단어 '+missed+'개</div>'+
      '<div class="rv-ex" style="margin-top:8px">🟢 초록 = 정답 · 🔴 빨강(취소선) = 존재하지 않는 단어 · 🟠 주황 = 놓친 실제 단어</div>'+
    '</div>';
  }

  // ── Read and Complete (c-test) ──
  function renderComplete(){
    const pool=detPool(DET.readComplete||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 지문이 없습니다.</div>'; return; }
    const p=pool[Math.floor(Math.random()*pool.length)];
    const answers=[];
    let i=0;
    const html=esc(p.text).replace(/\{([a-zA-Z]+)\}/g,function(m,ans){
      answers.push(ans);
      const w=Math.max(34,ans.length*13);
      return '<input data-b="'+(i++)+'" maxlength="'+ans.length+'" size="'+ans.length+'" style="width:'+w+'px" autocomplete="off" spellcheck="false" />';
    });
    det={p:p,answers:answers,done:false};
    $("det-body").innerHTML='<div class="det-card">'+
      '<div class="det-head">빈칸에 들어갈 <b>나머지 글자</b>를 채우세요 · 빈칸 '+answers.length+'개 <span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span></div>'+
      '<div class="ct-text">'+html+'</div>'+
      '<div id="det-ct-result"></div>'+
      '<div class="det-actions">'+
        '<button class="det-btn" id="det-check">채점하기</button>'+
        '<button class="det-btn sub" id="det-next">새 지문 →</button>'+
      '</div></div>';
    const ins=$("det-body").querySelectorAll(".ct-text input");
    ins.forEach((el,k)=>el.addEventListener("keydown",e=>{
      if(e.key==="Enter"){ e.preventDefault(); if(k<ins.length-1)ins[k+1].focus(); else gradeComplete(); }
    }));
    if(ins[0])ins[0].focus();
    $("det-check").addEventListener("click",gradeComplete);
    $("det-next").addEventListener("click",renderComplete);
  }
  function gradeComplete(){
    if(det.done)return; det.done=true;
    let ok=0;
    $("det-body").querySelectorAll(".ct-text input").forEach((el,k)=>{
      const ans=det.answers[k], val=(el.value||"").trim().toLowerCase();
      el.disabled=true;
      if(val===ans.toLowerCase()){ el.classList.add("ok"); ok++; }
      else{
        el.classList.add("no");
        const fix=document.createElement("span"); fix.className="fix"; fix.textContent=ans;
        el.parentNode.insertBefore(fix,el.nextSibling);
      }
    });
    const total=det.answers.length, pct=Math.round(ok/total*100);
    if(pct===100){ beep("ok",3); confetti(60); } else if(pct>=70) beep("ok",1); else beep("no");
    $("det-ct-result").innerHTML='<div class="reveal '+(pct>=70?"ok":"no")+'" style="margin-top:16px">'+
      '<div class="verdict">'+(pct===100?'🎉 전부 정답!':ok+' / '+total+' 정답 ('+pct+'%)')+'</div>'+
      '<div class="ct-ko">💬 '+esc(det.p.ko)+'</div></div>';
  }

  // ── Listen and Type ──
  function renderListen(){
    const pool=detPool(DET.listenType||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 문장이 없습니다.</div>'; return; }
    const s=pool[Math.floor(Math.random()*pool.length)];
    det={s:s,plays:0,done:false};
    $("det-body").innerHTML='<div class="det-card">'+
      '<div class="det-head">문장을 듣고 <b>들리는 그대로</b> 입력하세요 <span class="lv-badge '+LV[s.level].c+'">'+LV[s.level].n+'</span></div>'+
      '<div class="lt-play"><button id="lt-play">🔊 문장 듣기</button>'+
        '<button id="lt-slow" class="sub">🐢 느리게</button>'+
        '<span class="lt-left" id="lt-left">남은 재생 3회</span></div>'+
      '<textarea class="lt-input" id="lt-input" placeholder="여기에 들은 문장을 입력하세요…" spellcheck="false"></textarea>'+
      '<div id="det-lt-result"></div>'+
      '<div class="det-actions">'+
        '<button class="det-btn" id="det-check">채점하기</button>'+
        '<button class="det-btn sub" id="det-next">새 문장 →</button>'+
      '</div></div>';
    // sess 를 붙잡아 두어, 모드를 바꾼 뒤 예약 재생이 뒤늦게 실행돼도 안전하게 무시된다
    const sess=det;
    const play=rate=>{
      if(sess!==det||sess.done||sess.plays>=3)return;
      const left=$("lt-left"), pb=$("lt-play"), sb=$("lt-slow");
      if(!left||!pb)return;
      sess.plays++; speak(sess.s.s,{rate:rate});
      left.textContent="남은 재생 "+(3-sess.plays)+"회";
      if(sess.plays>=3){ pb.disabled=true; if(sb)sb.disabled=true; }
    };
    $("lt-play").addEventListener("click",()=>play(.95));
    $("lt-slow").addEventListener("click",()=>play(.62));
    $("lt-input").addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.ctrlKey)gradeListen(); });
    $("det-check").addEventListener("click",gradeListen);
    $("det-next").addEventListener("click",()=>{ stopSpeak(); renderListen(); });
    setTimeout(()=>play(.95),250);
  }
  function gradeListen(){
    if(!det||!det.s||det.done)return; det.done=true;
    stopSpeak();
    const clean = t => t.toLowerCase().replace(/[.,!?;:"']/g,"").replace(/\s+/g," ").trim();
    const gold=clean(det.s.s).split(" "), mine=clean($("lt-input").value||"").split(" ").filter(Boolean);
    // 단어 단위 비교 (순서대로 맞춘 개수)
    let gi=0, ok=0, html="";
    gold.forEach(g=>{
      if(gi<mine.length && mine[gi]===g){ ok++; html+='<span class="w-ok">'+esc(g)+'</span> '; gi++; }
      else{ html+='<span class="w-no">'+esc(g)+'</span> '; if(gi<mine.length)gi++; }
    });
    const pct=Math.round(ok/gold.length*100);
    if(pct===100){ beep("ok",3); confetti(60); } else if(pct>=70) beep("ok",1); else beep("no");
    $("det-lt-result").innerHTML='<div class="reveal '+(pct>=70?"ok":"no")+'" style="margin-top:16px">'+
      '<div class="lt-score">'+(pct===100?'🎉 완벽하게 받아썼습니다!':ok+' / '+gold.length+' 단어 일치 ('+pct+'%)')+'</div>'+
      '<div class="rv-sub">정답 문장</div>'+
      '<div class="lt-diff">'+html+'</div>'+
      '<div class="det-actions" style="margin-top:12px"><button class="det-btn sub" id="lt-replay">🔊 정답 문장 다시 듣기</button></div>'+
    '</div>';
    $("lt-replay").addEventListener("click",()=>speak(det.s.s,{rate:.9}));
  }

  // ── Complete the Passage ──
  function renderDetPassage(){
    const pool=detPool(DET.passageComplete||[]);
    if(!pool.length){ $("det-body").innerHTML='<div class="empty">해당 난이도의 문항이 없습니다.</div>'; return; }
    if(!det||det.mode!=="passage"||det.finished){ det={mode:"passage",list:shuffled(pool).slice(0,Math.min(8,pool.length)),i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.det||0}; }
    drawDetPassage();
  }
  function drawDetPassage(){
    if(det.i>=det.list.length){
      const pct=Math.round(det.score/det.list.length*100);
      $("det-body").innerHTML='<div class="result"><div class="big">'+det.score+' / '+det.list.length+'</div>'+
        '<p>'+(pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"해설을 보며 복습해요 📖")+' ('+pct+'%)</p>'+
        comboSummary(det,"det")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="det-restart">새 문제 풀기</button></div>';
      det.finished=true;
      $("det-restart").addEventListener("click",()=>{ det=null; renderDetPassage(); });
      if(pct>=80){ confetti(80); beep("ok",det.best); }
      return;
    }
    const p=det.list[det.i]; det.answered=false;
    const parts=esc(p.passage).split("----");
    $("det-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(det.i/det.list.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">빈칸에 알맞은 것을 고르세요 · '+(det.i+1)+' / '+det.list.length+'</span><span id="det-streak">'+comboBadge(det.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px"><span class="cat-badge">'+esc(p.cat)+'</span><span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span></div>'+
      '<div class="passage" style="margin-bottom:18px">'+parts[0]+'<span class="blank" style="display:inline-block;min-width:90px;border-bottom:2.5px solid var(--accent);margin:0 4px;vertical-align:-3px"></span>'+(parts[1]||"")+'</div>'+
      p.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="det-score-n">'+det.score+'</b> / '+det.list.length+bestLabel("det")+'</span>'+
      '<button class="quiz-next" id="det-next-q">다음 →</button></div>'+
      '<div id="det-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    $("det-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerDetPassage(parseInt(b.dataset.i,10),p)));
    $("det-next-q").addEventListener("click",()=>{ det.i++; drawDetPassage(); });
  }
  function answerDetPassage(pick,p){
    if(det.answered)return; det.answered=true;
    const correct=pick===p.ans, btns=$("det-body").querySelectorAll(".opt");
    let record=false;
    if(correct){
      det.score++; det.streak++; det.best=Math.max(det.best,det.streak);
      if(bestCombo.det===undefined)bestCombo.det=0;
      record=registerCombo(det,"det");
      beep("ok",det.streak);
      confetti(record?110:det.streak>=5?70:det.streak>=3?45:26);
      comboPopup(det.streak,record);
      const sn=$("det-score-n"); sn.textContent=det.score; sn.classList.add("bump");
      const bi=document.querySelector("#det-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((det.i+1)/det.list.length*100)+"%";
    }else{ det.streak=0; det.recordShown=false; beep("no"); btns[pick].classList.add("wrong"); }
    btns.forEach((b,i)=>{ b.disabled=true; if(i===p.ans)b.classList.add("correct"); });
    const sb=$("det-streak"); if(sb)sb.innerHTML=comboBadge(det.streak);
    $("det-reveal").innerHTML='<div class="reveal '+(correct?"ok":"no")+'">'+
      '<div class="verdict">'+(correct?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[p.ans]+') '+esc(p.opts[p.ans]))+
        (correct?' '+comboBadge(det.streak)+(record?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp">'+esc(p.exp)+'</div></div>';
    const nb=$("det-next-q"); nb.style.visibility="visible"; nb.classList.add("on");
    nb.textContent=det.i===det.list.length-1?"결과 보기 →":"다음 →";
  }

  // ── Speaking · Writing 모범답변 ──
  function renderDetWS(){
    const list=DET.writeSpeak||[];
    const cats=[]; list.forEach(t=>{ if(cats.indexOf(t.category)<0)cats.push(t.category); });
    $("det-body").innerHTML=
      '<div class="filter-row" id="det-ws-cat">'+
        '<button data-wc="all" aria-pressed="true">전체 '+list.length+'</button>'+
        cats.map(c=>'<button data-wc="'+esc(c)+'" aria-pressed="false">'+esc(c)+' '+list.filter(t=>t.category===c).length+'</button>').join('')+
      '</div><div id="det-ws-list"></div>';
    const draw=f=>{
      const items=list.filter(t=>f==="all"||t.category===f);
      $("det-ws-list").innerHTML=items.map((t,i)=>{
        const kx=(t.kx||[]).map(k=>'<div><b>'+esc(k.en)+'</b><span>'+esc(k.ko)+'</span></div>').join('');
        return '<div class="sp-item" data-i="'+i+'">'+
          '<div class="sp-head"><div style="flex:1;min-width:0">'+
            '<div class="sp-badges"><span class="exam-badge '+(t.exam.indexOf("Speaking")>=0?"opic":"write")+'">'+esc(t.exam)+'</span>'+
              '<span class="cat-badge">'+esc(t.category)+'</span>'+
              '<span class="topic-badge">'+esc(t.topic)+'</span>'+
              (t.targetLevel?'<span class="lvl-badge">'+esc(t.targetLevel)+'</span>':'')+'</div>'+
            '<div class="sp-q">'+esc(t.topic)+'</div>'+
          '</div><div class="sp-toggle">▼</div></div>'+
          '<div class="sp-body">'+
            '<div class="sp-sec-title">📄 문제</div><div class="det-ws-q">'+esc(t.q)+'</div>'+
            '<div class="sp-controls">'+
              '<button data-act="play">▶ 모범답변 듣기</button><button data-act="stop">■ 정지</button>'+
              '<button data-act="dl">⬇ 음성</button><button data-act="dltxt">📄 대본</button>'+
              '<button data-act="ko" aria-pressed="false">🇰🇷 한글 해석</button></div>'+
            '<div class="sp-sec-title">✅ 모범답변</div>'+
            '<div class="ans en-text">'+esc(t.answerEn).replace(/\n/g,"<br/>")+'</div>'+
            '<div class="ans ko-text" style="display:none;margin-top:10px">'+esc(t.answerKo).replace(/\n/g,"<br/>")+'</div>'+
            (kx?'<div class="sp-sec-title">💡 핵심 표현</div><div class="kx">'+kx+'</div>':'')+
            '<div class="sp-sec-title">🎯 고득점 팁</div><div class="tips">'+esc(t.tips)+'</div>'+
          '</div></div>';
      }).join('')||'<div class="empty">문항이 없습니다.</div>';
      $("det-ws-list").querySelectorAll(".sp-item").forEach(item=>{
        const t=items[parseInt(item.dataset.i,10)];
        item.querySelector(".sp-head").addEventListener("click",()=>{ const o=item.classList.toggle("open"); if(!o)stopSpeak(); });
        item.querySelector('[data-act="play"]').addEventListener("click",e=>{ e.stopPropagation(); const b=e.currentTarget; b.textContent="🔊 재생 중…"; speakBest(t.answerEn.replace(/\[[^\]]*\]/g,""),{rate:.92,onend:()=>b.textContent="▶ 모범답변 듣기"}); });
        item.querySelector('[data-act="stop"]').addEventListener("click",e=>{ e.stopPropagation(); stopSpeak(); item.querySelector('[data-act="play"]').textContent="▶ 모범답변 듣기"; });
        item.querySelector('[data-act="dl"]').addEventListener("click",e=>{ e.stopPropagation(); ttsDownload(t.answerEn.replace(/\[[^\]]*\]/g,""),t.topic||t.category); });
        item.querySelector('[data-act="dltxt"]').addEventListener("click",e=>{ e.stopPropagation();
          scriptDownload([t.topic||"",t.q||"","",t.answerEn,"","--- 한글 ---","",t.answerKo||""].join("\n"),t.topic||t.category); });
        const kb=item.querySelector('[data-act="ko"]');
        kb.addEventListener("click",e=>{ e.stopPropagation(); const on=kb.getAttribute("aria-pressed")==="true"; kb.setAttribute("aria-pressed",!on); item.querySelector(".ko-text").style.display=on?"none":"block"; });
      });
    };
    $("det-ws-cat").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
      $("det-ws-cat").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b));
      draw(b.dataset.wc);
    }));
    draw("all");
  }
  // DET 지문완성 키보드
  document.addEventListener("keydown",e=>{
    if(!$("panel-det").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(detMode!=="passage"||!det||!det.list)return;
    const opts=Array.prototype.slice.call($("det-body").querySelectorAll(".opt"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){ const n=parseInt(e.key,10); if(n>=1&&n<=opts.length)idx=n-1; }
    if(!det.answered&&idx>=0&&idx<opts.length){ e.preventDefault(); opts[idx].click(); return; }
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){
      e.preventDefault();
      if(det.answered&&$("det-next-q"))$("det-next-q").click();
    }
  });

  // ---- 관심주제 리딩 (축구 · 영화) ----
  // TOEIC Part 7 멀티 지문(docs 배열)은 단일 지문 구조로 정규화해서 넣는다.
  // 그래야 검색·듣기·대본 저장·문제 풀기 코드를 그대로 쓸 수 있다.
  const TR = (function(){
    const list = (window.TOPIC_READING||[]).concat(window.TOPIC_READING_EXTRA||[]);
    (window.PART7||[]).forEach(function(s){
      list.push(Object.assign({},s,{
        passage: s.docs.map(d=>"["+d.label+"]\n\n"+d.en).join("\n\n\n"),
        ko:      s.docs.map(d=>"["+d.label+"]\n\n"+d.ko).join("\n\n\n")
      }));
    });
    return list;
  })();
  const TCATS = (function(){ const s=[]; TR.forEach(p=>{ if(s.indexOf(p.series)<0)s.push(p.series); }); return s; })();
  let tCat="all", tExam="all", tMode="read", tSes=null;

  // Part 7 세트는 영어 본문만 이어 붙여 읽어 준다 (지문 라벨은 한글이라 제외)
  function tEnglish(p){ return p.docs ? p.docs.map(d=>d.en).join("\n\n") : p.passage; }
  function tWords(p){ return tEnglish(p).split(/\s+/).length; }
  function tExamBadge(p){
    const cls = p.exam==="TOEFL" ? "toefl" : "toeic";
    return '<span class="exam-badge '+cls+'">'+(p.part7?"TOEIC Part 7":p.exam)+'</span>';
  }

  function topicList(){
    const q=($("topic-search").value||"").trim().toLowerCase();
    return TR.filter(p=>{
      if(tCat!=="all"&&p.series!==tCat)return false;
      if(tExam==="P7"){ if(!p.part7)return false; }
      else if(tExam!=="all"&&p.exam!==tExam)return false;
      if(q&&!((p.title+" "+p.topic+" "+p.passage+" "+p.ko+" "+p.type+" "+p.series).toLowerCase().includes(q)
             &&true))return false;
      return true;
    });
  }
  function buildTopicChips(){
    $("topic-cat").innerHTML='<button class="tp-chip" data-tc="all" aria-pressed="'+(tCat==="all")+'">🗂 전체<span class="c">'+TR.length+'</span></button>'+
      TCATS.map(c=>{const n=TR.filter(p=>p.series===c).length;
        return '<button class="tp-chip" data-tc="'+esc(c)+'" aria-pressed="'+(tCat===c)+'">'+esc(c)+'<span class="c">'+n+'</span></button>';}).join("");
    $("topic-cat").querySelectorAll("[data-tc]").forEach(b=>b.addEventListener("click",()=>{tCat=b.dataset.tc;buildTopicChips();renderTopic();}));
  }
  $("topic-search").addEventListener("input",renderTopic);
  $("topic-exam").querySelectorAll("[data-tex]").forEach(b=>b.addEventListener("click",()=>{
    $("topic-exam").querySelectorAll("[data-tex]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    tExam=b.dataset.tex;renderTopic();}));
  $("topic-exam").querySelectorAll("[data-tmode]").forEach(b=>b.addEventListener("click",()=>{
    $("topic-exam").querySelectorAll("[data-tmode]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    tMode=b.dataset.tmode;tSes=null;stopSpeak();renderTopic();}));

  // 지문 본문 — Part 7 세트는 문서마다 라벨을 달아 따로 보여 준다
  function tPassageHTML(p){
    if(!p.docs) return '<div class="sp-sec-title">📄 지문</div>'+
      '<div class="tp-passage'+(p.exam==="TOEIC"?" mono":"")+'">'+esc(p.passage)+'</div>';
    return p.docs.map(d=>'<div class="sp-sec-title">📄 '+esc(d.label)+'</div>'+
      '<div class="tp-passage mono">'+esc(d.en)+'</div>').join('');
  }
  function tKoHTML(p){
    if(!p.docs) return '<div class="tp-ko">'+esc(p.ko)+'</div>';
    return p.docs.map((d,i)=>'<div class="sp-sec-title"'+(i?' style="margin-top:14px"':'')+'>'+esc(d.label)+'</div>'+
      '<div class="tp-ko">'+esc(d.ko)+'</div>').join('');
  }
  function linkTag(q){ return q.link?'<span class="link-tag">🔗 연계</span>':''; }

  function renderTopic(){
    const list=topicList();
    const nDoc=list.reduce((s,p)=>s+(p.docs?p.docs.length:1),0);
    $("topic-count").textContent=list.length+"세트 · 지문 "+nDoc+"개 · "+list.reduce((s,p)=>s+p.qs.length,0)+"문항";
    if(!list.length){ $("topic-body").innerHTML='<div class="empty">해당하는 지문이 없습니다.</div>'; return; }
    if(tMode==="solve") return renderTopicSolve(list);
    // 읽기 모드: 제목만 보이고 펼치면 지문 → 해석 → 어휘 → 문제·해설
    $("topic-body").innerHTML=list.map((p,i)=>{
      return '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges">'+tExamBadge(p)+
            '<span class="cat-badge">'+esc(p.type)+'</span>'+
            '<span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span>'+
            '<span class="topic-tag">'+p.qs.length+'문항</span></div>'+
          '<div class="tp-title">'+esc(p.title)+'</div>'+
          '<div class="tp-sub">'+esc(p.topic)+' · '+(p.docs?'지문 '+p.docs.length+'개 · ':'')+tWords(p)+' words</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="sp-controls">'+
            '<button data-act="play">▶ 지문 듣기</button><button data-act="stop">■ 정지</button>'+
            '<button data-act="ko" aria-pressed="false">🇰🇷 한글 해석</button>'+
            '<button data-act="dlaudio">⬇ 음성 파일</button><button data-act="dl">📄 대본</button></div>'+
          tPassageHTML(p)+
          '<div class="ko-text" style="display:none;margin-top:12px"><div class="sp-sec-title">🇰🇷 해석</div>'+tKoHTML(p)+'</div>'+
          '<div class="sp-sec-title">💡 핵심 어휘</div><div class="tp-gloss">'+
            p.gloss.map(g=>'<span><b>'+esc(g.w)+'</b>'+esc(g.ko)+'</span>').join('')+'</div>'+
          '<div class="sp-sec-title">❓ 문제 · 해설</div>'+
          p.qs.map((q,k)=>'<div class="tp-qbox"><div class="tp-qn">Q'+(k+1)+linkTag(q)+'</div>'+
            '<div class="q-text" style="font-size:14.5px;font-weight:700;line-height:1.8;white-space:pre-wrap;margin-bottom:10px">'+esc(q.q)+'</div>'+
            '<div class="gram-opts">'+q.opts.map((o,j)=>'<span class="'+(j===q.ans?"ok":"")+'">('+AB[j]+') '+esc(o)+'</span>').join('')+'</div>'+
            '<div class="gram-exp">정답 ('+AB[q.ans]+') · '+esc(q.exp)+'</div></div>').join('')+
        '</div></div>';
    }).join('');
    $("topic-body").querySelectorAll(".sp-item").forEach(item=>{
      const p=list[parseInt(item.dataset.i,10)];
      item.querySelector(".sp-head").addEventListener("click",()=>{const o=item.classList.toggle("open");if(!o)stopSpeak();});
      item.querySelector('[data-act="play"]').addEventListener("click",e=>{e.stopPropagation();
        const b=e.currentTarget;b.textContent="🔊 재생 중…";
        speakBest(tEnglish(p),{rate:.92,onend:()=>b.textContent="▶ 지문 듣기"});});
      item.querySelector('[data-act="stop"]').addEventListener("click",e=>{e.stopPropagation();stopSpeak();
        item.querySelector('[data-act="play"]').textContent="▶ 지문 듣기";});
      const kb=item.querySelector('[data-act="ko"]');
      kb.addEventListener("click",e=>{e.stopPropagation();const on=kb.getAttribute("aria-pressed")==="true";
        kb.setAttribute("aria-pressed",!on);item.querySelector(".ko-text").style.display=on?"none":"block";});
      item.querySelector('[data-act="dl"]').addEventListener("click",e=>{e.stopPropagation();downloadScript(p);});
      item.querySelector('[data-act="dlaudio"]').addEventListener("click",e=>{e.stopPropagation();ttsDownload(tEnglish(p),p.title);});
    });
  }
  // 음성 대본(.txt) 저장 — 외부 TTS 도구에 그대로 넣어 쓸 수 있는 형식
  function downloadScript(p){
    const head=(p.part7?"TOEIC Part 7":p.exam)+" · "+p.type+" · "+p.topic;
    const txt=[p.title,"("+head+")","",p.passage,"","--- 한글 해석 ---","",p.ko].join("\n");
    const blob=new Blob([String.fromCharCode(0xFEFF)+txt],{type:"text/plain;charset=utf-8;"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=p.title.replace(/[^\w가-힣 -]/g,"").slice(0,50)+".txt";
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    toast("음성 대본을 저장했습니다 ⬇");
  }

  // 문제 풀기 모드
  function renderTopicSolve(list){
    const qs=[];
    list.forEach(p=>p.qs.forEach((q,k)=>qs.push(Object.assign({},q,{p:p,no:k+1}))));
    if(!tSes||tSes.finished){ tSes={list:shuffled(qs).slice(0,Math.min(8,qs.length)),i:0,score:0,answered:false,streak:0,best:0,prevBest:bestCombo.topic||0}; }
    drawTopicQ();
  }
  function drawTopicQ(){
    if(tSes.i>=tSes.list.length){
      const pct=Math.round(tSes.score/tSes.list.length*100);
      $("topic-body").innerHTML='<div class="result"><div class="big">'+tSes.score+' / '+tSes.list.length+'</div>'+
        '<p>'+(pct>=80?"훌륭해요! 🎉":pct>=50?"좋아요, 조금만 더! 💪":"지문을 다시 읽어 보세요 📖")+' ('+pct+'%)</p>'+
        comboSummary(tSes,"topic")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="tp-restart">새 문제 풀기</button></div>';
      tSes.finished=true;
      $("tp-restart").addEventListener("click",()=>{tSes=null;renderTopic();});
      if(pct>=80){confetti(80);beep("ok",tSes.best);}
      return;
    }
    const it=tSes.list[tSes.i],p=it.p; tSes.answered=false;
    $("topic-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(tSes.i/tSes.list.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">'+(tSes.i+1)+' / '+tSes.list.length+' · '+esc(p.title)+'</span><span id="tp-streak">'+comboBadge(tSes.streak)+'</span></div>'+
      '<div class="sp-badges" style="margin-bottom:10px">'+tExamBadge(p)+
        '<span class="cat-badge">'+esc(p.type)+'</span><span class="lv-badge '+LV[p.level].c+'">'+LV[p.level].n+'</span></div>'+
      (p.docs
        ? '<div class="tp-docs">'+p.docs.map(d=>'<div class="tp-doclabel">'+esc(d.label)+'</div>'+
            '<div class="tp-passage mono">'+esc(d.en)+'</div>').join('')+'</div>'
        : '<div class="tp-passage'+(p.exam==="TOEIC"?" mono":"")+'" style="max-height:320px;overflow-y:auto;margin-bottom:16px">'+esc(p.passage)+'</div>')+
      '<div class="q-text" style="font-size:15px;font-weight:700;line-height:1.8;white-space:pre-wrap;margin-bottom:14px">'+linkTag(it)+esc(it.q)+'</div>'+
      it.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="tp-score">'+tSes.score+'</b> / '+tSes.list.length+bestLabel("topic")+'</span>'+
      '<button class="quiz-next" id="tp-next">다음 →</button></div><div id="tp-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    $("topic-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerTopic(parseInt(b.dataset.i,10),it)));
    $("tp-next").addEventListener("click",()=>{tSes.i++;drawTopicQ();window.scrollTo({top:0,behavior:"smooth"});});
  }
  function answerTopic(pick,it){
    if(tSes.answered)return; tSes.answered=true;
    const ok=pick===it.ans,btns=$("topic-body").querySelectorAll(".opt");
    let rec=false;
    if(ok){
      tSes.score++;tSes.streak++;tSes.best=Math.max(tSes.best,tSes.streak);
      if(bestCombo.topic===undefined)bestCombo.topic=0;
      rec=registerCombo(tSes,"topic");
      beep("ok",tSes.streak);confetti(rec?110:tSes.streak>=5?70:tSes.streak>=3?45:26);
      comboPopup(tSes.streak,rec);
      const s=$("tp-score");s.textContent=tSes.score;s.classList.add("bump");
      const bi=document.querySelector("#topic-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((tSes.i+1)/tSes.list.length*100)+"%";
    }else{tSes.streak=0;tSes.recordShown=false;beep("no");btns[pick].classList.add("wrong");}
    btns.forEach((b,i)=>{b.disabled=true;if(i===it.ans)b.classList.add("correct");});
    const sb=$("tp-streak");if(sb)sb.innerHTML=comboBadge(tSes.streak);
    $("tp-reveal").innerHTML='<div class="reveal '+(ok?"ok":"no")+'">'+
      '<div class="verdict">'+(ok?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[it.ans]+')')+
        (ok?' '+comboBadge(tSes.streak)+(rec?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp">'+esc(it.exp)+'</div></div>';
    const nb=$("tp-next");nb.style.visibility="visible";nb.classList.add("on");
    nb.textContent=tSes.i===tSes.list.length-1?"결과 보기 →":"다음 →";
  }
  document.addEventListener("keydown",e=>{
    if(!$("panel-topic").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(tMode!=="solve"||!tSes||!tSes.list)return;
    const opts=Array.prototype.slice.call($("topic-body").querySelectorAll(".opt"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){const n=parseInt(e.key,10);if(n>=1&&n<=opts.length)idx=n-1;}
    if(!tSes.answered&&idx>=0&&idx<opts.length){e.preventDefault();opts[idx].click();return;}
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){e.preventDefault();
      if(tSes.answered&&$("tp-next"))$("tp-next").click();}
  });

  // ---- 지문 유형 (글의 짜임) ----
  // 리딩 탭이 "문제 유형"과 "주제 분야"를 다룬다면 여기서는 그 아래 축인 "전개 방식"을 다룬다.
  const PT = window.PASSAGES || [];
  const PGROUPS = (function(){ const s=[]; PT.forEach(x=>{ if(s.indexOf(x.group)<0)s.push(x.group); }); return s; })();
  let pGroup="all", pMode="learn", pSes=null;

  function ptypeList(){
    const q=($("ptype-search").value||"").trim().toLowerCase();
    return PT.filter(x=>{
      if(pGroup!=="all"&&x.group!==pGroup)return false;
      if(!q)return true;
      const hay=[x.type,x.desc,x.howto,x.group,x.signals.join(" "),x.points.join(" "),
                 x.examples.map(e=>e.title+" "+e.en+" "+e.ko).join(" ")].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }
  function buildPtypeChips(){
    $("ptype-group").innerHTML='<button class="tp-chip" data-pg="all" aria-pressed="'+(pGroup==="all")+'">🗂 전체<span class="c">'+PT.length+'</span></button>'+
      PGROUPS.map(g=>{const n=PT.filter(x=>x.group===g).length;
        return '<button class="tp-chip" data-pg="'+esc(g)+'" aria-pressed="'+(pGroup===g)+'">'+esc(g)+'<span class="c">'+n+'</span></button>';}).join('');
    $("ptype-group").querySelectorAll("[data-pg]").forEach(b=>b.addEventListener("click",()=>{
      pGroup=b.dataset.pg; pSes=null; buildPtypeChips(); renderPtype(); }));
  }
  $("ptype-search").addEventListener("input",()=>{ if(pMode==="learn")renderPtype(); });
  $("ptype-mode").querySelectorAll("[data-pmode]").forEach(b=>b.addEventListener("click",()=>{
    $("ptype-mode").querySelectorAll("[data-pmode]").forEach(x=>x.setAttribute("aria-pressed",x===b));
    pMode=b.dataset.pmode; pSes=null; stopSpeak(); renderPtype(); }));
  $("ptype-shuffle").addEventListener("click",()=>{ pSes=null; renderPtype(); });

  function renderPtype(){
    const list=ptypeList();
    const nEx=list.reduce((s,x)=>s+x.examples.length,0);
    $("ptype-count").textContent=list.length+"개 유형 · 예문 "+nEx+"개";
    if(!PT.length){ $("ptype-body").innerHTML='<div class="empty">passages.js 를 불러오지 못했습니다.</div>'; return; }
    if(!list.length){ $("ptype-body").innerHTML='<div class="empty">해당하는 유형이 없습니다.</div>'; return; }
    if(pMode==="quiz") return renderPtypeQuiz(list);
    $("ptype-body").innerHTML=list.map((x,i)=>
      '<div class="sp-item" data-i="'+i+'">'+
        '<div class="sp-head"><div style="flex:1;min-width:0">'+
          '<div class="sp-badges"><span class="cat-badge">'+esc(x.group)+'</span>'+
            '<span class="topic-tag">예문 '+x.examples.length+'개</span></div>'+
          '<div class="tp-title">'+x.icon+' '+esc(x.type)+'</div>'+
          '<div class="tp-sub">'+esc(x.desc)+'</div>'+
        '</div><div class="sp-toggle">▼</div></div>'+
        '<div class="sp-body">'+
          '<div class="sp-sec-title">🚩 신호 표현</div>'+
          '<div class="tp-gloss">'+x.signals.map(s=>'<span><b>'+esc(s)+'</b></span>').join('')+'</div>'+
          '<div class="sp-sec-title">🧭 읽는 요령</div><div class="pt-note">'+esc(x.howto)+'</div>'+
          '<div class="sp-sec-title">🎯 출제 포인트</div>'+
          '<ul class="pt-points">'+x.points.map(p=>'<li>'+esc(p)+'</li>').join('')+'</ul>'+
          x.examples.map((e,k)=>
            '<div class="tp-qbox" data-ex="'+k+'">'+
              '<div class="tp-qn">예문 '+(k+1)+' · '+esc(e.title)+'</div>'+
              '<div class="sp-controls" style="margin:0 0 10px">'+
                '<button data-act="play">▶ 듣기</button><button data-act="stop">■ 정지</button>'+
                '<button data-act="ko" aria-pressed="false">🇰🇷 해석</button></div>'+
              '<div class="tp-passage">'+esc(e.en)+'</div>'+
              '<div class="ko-text" style="display:none;margin-top:10px"><div class="tp-ko">'+esc(e.ko)+'</div></div>'+
              '<div class="sp-sec-title">🧩 구조 분석</div>'+
              '<div class="pt-map">'+e.map.map(m=>'<div class="pt-map-row"><span class="pt-part">'+esc(m.part)+'</span>'+
                '<span class="pt-role">'+esc(m.role)+'</span></div>').join('')+'</div>'+
            '</div>').join('')+
        '</div></div>').join('');
    $("ptype-body").querySelectorAll(".sp-item").forEach(item=>{
      const x=list[parseInt(item.dataset.i,10)];
      item.querySelector(".sp-head").addEventListener("click",()=>{const o=item.classList.toggle("open");if(!o)stopSpeak();});
      item.querySelectorAll("[data-ex]").forEach(box=>{
        const e=x.examples[parseInt(box.dataset.ex,10)];
        box.querySelector('[data-act="play"]').addEventListener("click",ev=>{ev.stopPropagation();
          const b=ev.currentTarget;b.textContent="🔊 재생 중…";
          speakBest(e.en,{rate:.92,onend:()=>b.textContent="▶ 듣기"});});
        box.querySelector('[data-act="stop"]').addEventListener("click",ev=>{ev.stopPropagation();stopSpeak();
          box.querySelector('[data-act="play"]').textContent="▶ 듣기";});
        const kb=box.querySelector('[data-act="ko"]');
        kb.addEventListener("click",ev=>{ev.stopPropagation();const on=kb.getAttribute("aria-pressed")==="true";
          kb.setAttribute("aria-pressed",!on);box.querySelector(".ko-text").style.display=on?"none":"block";});
      });
    });
  }

  // 유형 맞히기 — 예문을 읽고 어떤 전개 방식인지 고른다
  function renderPtypeQuiz(list){
    if(list.length<2){ $("ptype-body").innerHTML='<div class="empty">유형이 2개 이상이어야 퀴즈를 낼 수 있습니다.</div>'; return; }
    if(!pSes||pSes.finished){
      const pool=[];
      list.forEach(x=>x.examples.forEach(e=>pool.push({ex:e,type:x})));
      pSes={list:shuffled(pool).slice(0,Math.min(8,pool.length)),i:0,score:0,answered:false,
            streak:0,best:0,prevBest:bestCombo.ptype||0,pool:list};
    }
    drawPtypeQ();
  }
  function drawPtypeQ(){
    if(pSes.i>=pSes.list.length){
      const pct=Math.round(pSes.score/pSes.list.length*100);
      $("ptype-body").innerHTML='<div class="result"><div class="big">'+pSes.score+' / '+pSes.list.length+'</div>'+
        '<p>'+(pct>=80?"글의 짜임이 보이기 시작했네요! 🎉":pct>=50?"좋아요, 신호 표현을 다시 훑어보세요 💪":"유형 익히기로 돌아가 볼까요 📖")+' ('+pct+'%)</p>'+
        comboSummary(pSes,"ptype")+
        '<button class="btn good" style="max-width:220px;margin:14px auto 0" id="pt2-restart">새 문제 풀기</button></div>';
      pSes.finished=true;
      $("pt2-restart").addEventListener("click",()=>{pSes=null;renderPtype();});
      if(pct>=80){confetti(80);beep("ok",pSes.best);}
      return;
    }
    const it=pSes.list[pSes.i]; pSes.answered=false;
    // 보기: 정답 유형 + 같은 목록에서 뽑은 오답 3개
    if(!it.opts){
      const wrong=shuffled(pSes.pool.filter(x=>x.type!==it.type.type)).slice(0,3);
      const opts=shuffled([it.type].concat(wrong));
      it.opts=opts.map(o=>o.icon+" "+o.type);
      it.ans=opts.indexOf(it.type);
    }
    $("ptype-body").innerHTML='<div class="quiz-card">'+
      '<div class="quiz-progress"><i style="width:'+Math.round(pSes.i/pSes.list.length*100)+'%"></i></div>'+
      '<div class="quiz-topline"><span class="quiz-q">'+(pSes.i+1)+' / '+pSes.list.length+'</span>'+
        '<span id="pt2-streak">'+comboBadge(pSes.streak)+'</span></div>'+
      '<div class="tp-passage" style="max-height:300px;overflow-y:auto;margin-bottom:16px">'+esc(it.ex.en)+'</div>'+
      '<div class="q-text" style="font-size:15px;font-weight:700;line-height:1.8;margin-bottom:14px">이 글은 어떤 방식으로 전개되고 있나요?</div>'+
      it.opts.map((o,i)=>'<button class="opt" data-i="'+i+'"><span class="key ab">'+AB[i]+'</span>'+esc(o)+'</button>').join('')+
      '<div class="quiz-foot"><span class="quiz-score">점수 <b id="pt2-score">'+pSes.score+'</b> / '+pSes.list.length+bestLabel("ptype")+'</span>'+
      '<button class="quiz-next" id="pt2-next">다음 →</button></div><div id="pt2-reveal"></div>'+
      '<div class="quiz-hint">키보드: <b>A~D</b> 또는 <b>1~4</b> · <b>Enter</b> 다음</div></div>';
    $("ptype-body").querySelectorAll(".opt").forEach(b=>b.addEventListener("click",()=>answerPtype(parseInt(b.dataset.i,10),it)));
    $("pt2-next").addEventListener("click",()=>{pSes.i++;drawPtypeQ();window.scrollTo({top:0,behavior:"smooth"});});
  }
  function answerPtype(pick,it){
    if(pSes.answered)return; pSes.answered=true;
    const ok=pick===it.ans,btns=$("ptype-body").querySelectorAll(".opt");
    let rec=false;
    if(ok){
      pSes.score++;pSes.streak++;pSes.best=Math.max(pSes.best,pSes.streak);
      if(bestCombo.ptype===undefined)bestCombo.ptype=0;
      rec=registerCombo(pSes,"ptype");
      beep("ok",pSes.streak);confetti(rec?110:pSes.streak>=5?70:pSes.streak>=3?45:26);
      comboPopup(pSes.streak,rec);
      const s=$("pt2-score");s.textContent=pSes.score;s.classList.add("bump");
      const bi=document.querySelector("#ptype-body .quiz-progress > i");
      if(bi)bi.style.width=Math.round((pSes.i+1)/pSes.list.length*100)+"%";
    }else{pSes.streak=0;pSes.recordShown=false;beep("no");btns[pick].classList.add("wrong");}
    btns.forEach((b,i)=>{b.disabled=true;if(i===it.ans)b.classList.add("correct");});
    const sb=$("pt2-streak");if(sb)sb.innerHTML=comboBadge(pSes.streak);
    $("pt2-reveal").innerHTML='<div class="reveal '+(ok?"ok":"no")+'">'+
      '<div class="verdict">'+(ok?'🎉 정답! <span class="plus">+1</span>':'💡 아쉬워요 — 정답은 ('+AB[it.ans]+') '+esc(it.type.type))+
        (ok?' '+comboBadge(pSes.streak)+(rec?' <span class="rec-tag">🏆 신기록</span>':''):'')+'</div>'+
      '<div class="gram-exp"><b>'+esc(it.ex.title)+'</b> · '+esc(it.type.howto)+'</div>'+
      '<div class="pt-map" style="margin-top:10px">'+it.ex.map.map(m=>'<div class="pt-map-row">'+
        '<span class="pt-part">'+esc(m.part)+'</span><span class="pt-role">'+esc(m.role)+'</span></div>').join('')+'</div>'+
      '</div>';
    const nb=$("pt2-next");nb.style.visibility="visible";nb.classList.add("on");
    nb.textContent=pSes.i===pSes.list.length-1?"결과 보기 →":"다음 →";
  }
  document.addEventListener("keydown",e=>{
    if(!$("panel-ptype").classList.contains("active"))return;
    if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;
    if(e.ctrlKey||e.altKey||e.metaKey)return;
    if(pMode!=="quiz"||!pSes||!pSes.list)return;
    const opts=Array.prototype.slice.call($("ptype-body").querySelectorAll(".opt"));
    if(!opts.length)return;
    let idx=AB.indexOf(String(e.key||"").toUpperCase());
    if(idx<0){const n=parseInt(e.key,10);if(n>=1&&n<=opts.length)idx=n-1;}
    if(!pSes.answered&&idx>=0&&idx<opts.length){e.preventDefault();opts[idx].click();return;}
    if(e.code==="Enter"||e.code==="Space"||e.code==="ArrowRight"){e.preventDefault();
      if(pSes.answered&&$("pt2-next"))$("pt2-next").click();}
  });

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
    function itemMarkup(t,i){
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
            '<div class="sp-q">'+(HEAD_TOPIC?esc(t.topic):esc(t.question).replace(/\n/g,"<br/>"))+'</div>'+
          '</div>'+
          '<div class="sp-toggle">▼</div>'+
        '</div>'+
        '<div class="sp-body">'+
          (HEAD_TOPIC?'<div class="sp-sec-title">'+PASSAGE_TITLE+'</div><div class="passage">'+esc(t.question).replace(/\n/g,"<br/>")+'</div>':'')+
          '<div class="sp-controls">'+
            '<button data-act="play">▶ '+PLAY+'</button>'+
            '<button data-act="dl">⬇ 음성</button><button data-act="dltxt">📄 대본</button>'+
            '<button data-act="stop">■ 정지</button>'+
            '<button data-act="ko" aria-pressed="false">🇰🇷 '+KO_LABEL+'</button>'+
          '</div>'+
          (ANS_TITLE?'<div class="sp-sec-title">'+ANS_TITLE+'</div>':'')+
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
    function resetPlayLabels(box){
      qsa('[data-act="play"]',box).forEach(b=>{ b.textContent="▶ "+PLAY; });
    }
    function bind(box,slice){
      qsa(".sp-item",box).forEach(item=>{
        const t=slice[parseInt(item.dataset.i,10)];
        item.querySelector(".sp-head").addEventListener("click",()=>{ const open=item.classList.toggle("open"); if(!open){ stopSpeak(); resetPlayLabels(box); } });
        const playBtn=item.querySelector('[data-act="play"]');
        playBtn.addEventListener("click",e=>{
          e.stopPropagation();
          resetPlayLabels(box);
          playBtn.textContent="🔊 재생 중…";
          speakBest(t.answerEn,{rate:.92,onend:()=>{ playBtn.textContent="▶ "+PLAY; }});
        });
        item.querySelector('[data-act="stop"]').addEventListener("click",e=>{ e.stopPropagation(); stopSpeak(); resetPlayLabels(box); });
        const dlName=(t.topic||t.category||"answer");
        item.querySelector('[data-act="dl"]').addEventListener("click",e=>{ e.stopPropagation(); ttsDownload(t.answerEn,dlName); });
        item.querySelector('[data-act="dltxt"]').addEventListener("click",e=>{ e.stopPropagation();
          scriptDownload([t.topic||"",t.question||"","",t.answerEn,"","--- 한글 ---","",t.answerKo||""].join("\n"),dlName); });
        const koBtn=item.querySelector('[data-act="ko"]');
        koBtn.addEventListener("click",e=>{ e.stopPropagation(); const on=koBtn.getAttribute("aria-pressed")==="true"; koBtn.setAttribute("aria-pressed",!on); item.querySelector(".ko-text").style.display=on?"none":"block"; });
      });
      const more=$(prefix+"-more");
      if(more) more.addEventListener("click",()=>{ shown+=EXAM_PAGE; render(false); });
    }
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
    buildLevels(); buildCats(); buildTopics();
    return render;
  }

  const renderSpeak = makeExamPanel("speak",["OPIc","TOEIC","TOEFL"]);
  const renderWrite  = makeExamPanel("write",["TOEFL Writing"],{playLabel:"에세이 낭독",ansTitle:"📝 모범 답안",headTopic:true,passageTitle:"📄 문제 (지문·강의·토론)"});
  const renderRead   = makeExamPanel("read",["TOEFL Reading"],{playLabel:"영어 해설 듣기",koLabel:"한글 해설",ansTitle:"✅ 정답·풀이",levelAllLabel:"전체 문제 유형",headTopic:true,passageTitle:"📄 지문·문제"});

  // ---- 초기화 ----
  $("reset-btn").addEventListener("click",()=>{ if(confirm("모든 학습 기록(외움/즐겨찾기)을 지울까요?")){ store={known:{},star:{}}; save(); updateProgress(); renderCard(); if($("panel-browse").classList.contains("active"))renderBrowse(); toast("학습 기록을 초기화했습니다"); } });

  // ---- 키보드 ----
  document.addEventListener("keydown",e=>{
    if(!$("panel-flash").classList.contains("active"))return;
    if(e.target.tagName==="INPUT")return;
    if(!order.length)return;
    if(e.code==="Space"){ e.preventDefault(); flip(); }
    else if(e.code==="ArrowLeft")go(-1);
    else if(e.code==="ArrowRight")go(1);
    else if(e.code==="Enter"){ const w=cur().word; store.known[w]=true; save(); updateProgress(); renderCard(); if(idx<order.length-1)setTimeout(()=>go(1),150); }
  });

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

  // ---- 탭바 (모바일: 탭이 12개라 가로 스크롤) ----
  // 선택한 탭을 항상 화면 안으로 끌어오고, 양옆에 더 있다는 것을 페이드로 알려 준다.
  (function(){
    const wrap=document.querySelector(".tab-wrap"), bar=document.querySelector(".tabs");
    if(!wrap||!bar)return;
    function marks(){
      const max=bar.scrollWidth-bar.clientWidth;
      wrap.classList.toggle("more-l", bar.scrollLeft>4);
      wrap.classList.toggle("more-r", bar.scrollLeft<max-4);
    }
    function reveal(btn){
      if(!btn)return;
      const b=btn.getBoundingClientRect(), r=bar.getBoundingClientRect();
      if(b.left<r.left+8) bar.scrollLeft += b.left-r.left-16;
      else if(b.right>r.right-8) bar.scrollLeft += b.right-r.right+16;
    }
    bar.addEventListener("scroll",marks,{passive:true});
    window.addEventListener("resize",marks);
    qsa(".tabs button",bar).forEach(b=>b.addEventListener("click",()=>setTimeout(()=>reveal(b),0)));
    marks(); reveal(bar.querySelector('[aria-selected="true"]'));
  })();

  // ---- 시작 ----
  if(!WORDS.length){ document.querySelector("main").innerHTML='<div class="empty" style="margin-top:40px">words.js 를 불러오지 못했습니다.</div>'; return; }
  $("quiz-sound").setAttribute("aria-pressed",soundOn);
  $("quiz-sound").textContent=soundOn?"🔊 효과음":"🔇 효과음";
  buildGramChips();
  buildStructChips();
  buildSlangChips();
  syncBrowseView();
  updateProgress();
  rebuildOrder();
  renderCard();
})();
