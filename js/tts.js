/* ============================================================
   음성 — 브라우저 TTS + Piper(브라우저에서 도는 로컬 신경망 음성)
   ------------------------------------------------------------
   speak()     : 단어·짧은 문장. 브라우저 기본 음성.
   speakBest() : 긴 지문. Piper 가 켜져 있으면 Piper, 아니면 기본 음성.
   두 경로가 같은 stopSpeak() 로 멎어야 해서 한 파일에 둔다.
   ============================================================ */
(function (A) {
  "use strict";

  const $ = A.$,
        qsa = A.qsa,
        esc = A.esc,
        ls = A.ls,
        toast = A.toast;

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


  Object.assign(A, {
    speak, stopSpeak, speakBest, ttsDownload, scriptDownload, openTtsSettings
  });

})(window.APP);
