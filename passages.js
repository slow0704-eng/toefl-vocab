/* ============================================================
   지문 유형 (Passage Types)
   ------------------------------------------------------------
   같은 주제라도 글이 어떻게 짜였느냐에 따라 읽는 법과
   출제 포인트가 달라진다. 기존 리딩 탭이 "문제 유형"(추론·어휘…)과
   "주제 분야"(천문학·미국사…)를 다룬다면, 여기서는 그 아래 축인
   "글의 짜임"을 다룬다.

   group    : "학술" (전개 방식) | "실용" (문서 형식)
   signals  : 이 유형임을 알려 주는 신호 표현
   howto    : 읽는 요령
   points   : 이 유형에서 자주 나오는 출제 포인트
   examples : [{title, en, ko, map:[{part, role}]}]
              map 은 문단·문장이 각각 무슨 역할을 하는지 짚은 구조 분석
   ============================================================ */
window.PASSAGES = [

  /* ═══════════ 학술 — 전개 방식 ═══════════ */

  {type:"정의·설명",group:"학술",icon:"📘",
   desc:"낯선 개념 하나를 세워 놓고 그것이 무엇인지 풀어 나가는 글. 첫 문장에 정의가 오고 뒤로 갈수록 구체적인 설명과 예가 붙는다.",
   signals:["is defined as","refers to","is known as","that is","in other words","by definition"],
   howto:"첫 문장의 정의를 정확히 잡아 두면 나머지는 그 정의를 풀어 쓴 것이다. 정의문에서 한정하는 수식어(only, unlike, that occurs when)가 핵심이며, 오답은 대개 이 한정 조건을 빼거나 넓혀 놓는다.",
   points:["정의를 그대로 옮긴 듯하지만 한정 조건을 뺀 오답","용어 문제(vocabulary)가 정의문 근처에서 출제됨","'무엇이 아닌지'를 밝힌 문장에서 부정 사실 정보 문제"],
   examples:[
     {title:"공생(symbiosis)",
      en:"Symbiosis refers to a long-term biological interaction between two different species living in close physical association. The term does not imply that both partners benefit; it describes only the closeness and persistence of the relationship. Biologists therefore divide symbiosis into three categories. In mutualism, both species gain. In commensalism, one gains while the other is essentially unaffected. In parasitism, one gains at the other's expense. Because the boundaries between these categories shift with circumstance, a single pairing may move from one category to another as environmental conditions change.",
      ko:"공생이란 서로 다른 두 종이 물리적으로 밀접하게 붙어 살면서 맺는 장기적인 생물학적 상호작용을 가리킨다. 이 용어는 양쪽 모두가 이익을 본다는 뜻이 아니며, 관계의 밀접함과 지속성만을 기술한다. 그래서 생물학자들은 공생을 세 범주로 나눈다. 상리공생에서는 두 종 모두 이익을 얻는다. 편리공생에서는 한쪽만 이익을 얻고 다른 쪽은 사실상 영향을 받지 않는다. 기생에서는 한쪽이 다른 쪽을 희생시켜 이익을 얻는다. 이 범주들의 경계는 상황에 따라 움직이기 때문에, 같은 한 쌍이라도 환경 조건이 바뀌면 다른 범주로 옮겨 갈 수 있다.",
      map:[{part:"1문장",role:"정의 — refers to 로 개념을 세운다"},
           {part:"2문장",role:"오해 차단 — '~라는 뜻은 아니다'로 범위를 좁힌다. 부정 사실 정보 문제의 단골 자리"},
           {part:"3~6문장",role:"하위 분류 세 가지로 정의를 구체화"},
           {part:"마지막 문장",role:"단서 — 경계가 유동적이라는 한정. 추론 문제가 여기서 나온다"}]},
     {title:"수렴 진화(convergent evolution)",
      en:"Convergent evolution is the process by which unrelated lineages independently develop similar traits. The similarity arises not from shared ancestry but from shared environmental pressure. The wings of bats and the wings of birds are a standard illustration: both are adapted for powered flight, yet the underlying skeletal arrangements differ substantially. Structures of this kind are called analogous, in contrast to homologous structures, which do derive from a common ancestor. Distinguishing the two is essential, because a classification built on analogous traits would group organisms that are only superficially alike.",
      ko:"수렴 진화란 서로 계통이 다른 생물들이 독립적으로 비슷한 형질을 발달시키는 과정이다. 이 유사성은 공통 조상에서 오는 것이 아니라 같은 환경 압력에서 온다. 박쥐의 날개와 새의 날개가 대표적인 예다. 둘 다 동력 비행에 적응했지만 그 아래의 골격 구조는 상당히 다르다. 이런 구조를 상사(相似) 구조라 부르며, 공통 조상에서 유래한 상동(相同) 구조와 대비된다. 이 둘을 구분하는 일은 매우 중요한데, 상사 형질을 근거로 분류 체계를 세우면 겉만 닮은 생물들을 한 무리로 묶게 되기 때문이다.",
      map:[{part:"1문장",role:"정의 — is the process by which"},
           {part:"2문장",role:"핵심 한정 — '조상이 아니라 환경 압력' (오답이 가장 잘 비트는 지점)"},
           {part:"3문장",role:"예시로 정의를 눈에 보이게"},
           {part:"4~5문장",role:"대비 개념(상동)을 끌어와 경계를 분명히 하고 중요성으로 마무리"}]}
   ]},

  {type:"인과",group:"학술",icon:"🔗",
   desc:"원인에서 결과로, 또는 결과에서 원인으로 사슬을 따라가는 글. 원인이 여러 겹이거나 결과가 다시 원인이 되는 연쇄가 자주 나온다.",
   signals:["as a result","consequently","therefore","give rise to","stem from","account for","owing to","trigger"],
   howto:"먼저 무엇이 원인이고 무엇이 결과인지 화살표를 그리며 읽는다. 중간 고리가 생략된 채 '결국'으로 넘어가는 문장이 있으면 그 자리에 추론 문제가 붙는다. 연쇄가 길면 순서를 뒤바꾼 오답이 반드시 나온다.",
   points:["원인과 결과를 뒤집어 놓은 오답","상관관계를 인과로 단정한 오답","여러 원인 중 하나만을 유일한 원인처럼 서술한 오답"],
   examples:[
     {title:"대구 어장의 붕괴",
      en:"The collapse of the northwest Atlantic cod fishery is often attributed solely to overfishing, but the causal chain was longer. Improved trawling technology in the 1960s allowed vessels to harvest spawning aggregations that had previously been inaccessible. Because these aggregations contained the largest and most fecund individuals, their removal reduced reproductive output far more than the raw catch figures suggested. A cooling of coastal waters in the following decade further depressed survival of the remaining juveniles. Regulators, working from catch data alone, therefore underestimated the decline until the population had already passed the point of rapid recovery.",
      ko:"북서 대서양 대구 어장의 붕괴는 흔히 남획 하나로만 설명되지만 인과의 사슬은 그보다 길었다. 1960년대에 저인망 기술이 발전하면서 어선들은 그전까지 접근할 수 없던 산란 군집까지 잡을 수 있게 되었다. 이 군집에는 가장 크고 번식력이 강한 개체들이 모여 있었기 때문에, 그것들을 걷어 내자 어획량 수치가 시사하는 것보다 훨씬 크게 번식량이 줄었다. 이어진 10년간 연안 수온이 낮아지면서 남은 어린 개체들의 생존율까지 떨어졌다. 그래서 어획량 자료만 들여다보던 규제 당국은 개체군이 이미 빠른 회복이 불가능한 지점을 지나칠 때까지 그 감소를 과소평가했다.",
      map:[{part:"1문장",role:"통념 제시 후 '그러나 더 길었다'로 반전 — 글 전체의 방향 선언"},
           {part:"2~3문장",role:"원인 1(기술) → 중간 고리(번식력 큰 개체 제거) → 결과(번식량 급감)"},
           {part:"4문장",role:"원인 2(수온) 추가 — 원인이 하나가 아님을 보여 주는 자리"},
           {part:"5문장",role:"최종 결과 + 왜 대응이 늦었는지. 추론 문제가 여기서 나온다"}]},
     {title:"인쇄술과 표준 철자",
      en:"The standardization of English spelling owed less to scholarly design than to the economics of printing. Early printers set type by hand and were paid by the page, so they freely adjusted spellings to make lines justify evenly. As presses multiplied, however, the cost of resetting type for regional variants grew burdensome. Printers consequently converged on the forms used in London, simply because the London market was largest. Within two generations these commercial conveniences had hardened into rules, and spellings that had once been matters of preference came to be treated as matters of correctness.",
      ko:"영어 철자의 표준화는 학자들의 설계보다 인쇄업의 경제 논리에 힘입은 바가 컸다. 초기 인쇄공들은 활자를 손으로 조판했고 페이지 단위로 삯을 받았기 때문에, 행의 좌우를 고르게 맞추려고 철자를 자유롭게 바꿨다. 그러나 인쇄기가 늘어나면서 지역별 이형(異形)마다 활자를 다시 짜는 비용이 부담스러워졌다. 그 결과 인쇄공들은 런던에서 쓰는 형태로 수렴했는데, 이유는 단지 런던 시장이 가장 컸기 때문이다. 두 세대가 지나지 않아 이 상업적 편의는 규칙으로 굳었고, 한때 취향의 문제였던 철자는 옳고 그름의 문제로 취급되기에 이르렀다.",
      map:[{part:"1문장",role:"의외의 원인 제시 — 'A보다 B 때문' 구조"},
           {part:"2문장",role:"초기 조건(왜 자유로웠는지)"},
           {part:"3~4문장",role:"압력 발생 → consequently 로 결과. 신호어가 명시된 자리"},
           {part:"5문장",role:"장기적 귀결 — 편의가 규범으로 굳는 반전"}]}
   ]},

  {type:"비교·대조",group:"학술",icon:"⚖️",
   desc:"둘 이상을 견주어 공통점과 차이를 밝히는 글. 항목별로 번갈아 비교하거나(교차식), 한쪽을 다 설명한 뒤 다른 쪽으로 넘어간다(블록식).",
   signals:["whereas","in contrast","by comparison","unlike","similarly","both … and","on the other hand"],
   howto:"머릿속에 표를 그린다. 가로에 비교 대상, 세로에 비교 기준을 놓고 채워 나가면 문제 대부분이 표에서 바로 읽힌다. 블록식일 때는 뒤쪽 대상 설명에서 앞쪽과 대응하지 않는 항목이 있는지 확인한다.",
   points:["A의 특징을 B의 것으로 바꿔 놓은 오답","한쪽에만 해당하는 내용을 '둘 다'로 확대한 오답","표 채우기(table) 문제의 주 출제 대상"],
   examples:[
     {title:"필사본과 인쇄본",
      en:"Manuscript and print cultures differed less in speed than in the kind of error each produced. A scribe copying by hand introduced fresh mistakes with every copy, so no two manuscripts were identical; errors accumulated but remained local. A printing press, by contrast, reproduced a single setting of type hundreds of times, so a compositor's slip was multiplied uniformly across an entire edition. Manuscripts thus degraded gradually and unpredictably, whereas printed books degraded all at once and in exactly the same way. Correcting a manuscript required consulting many copies; correcting a print run required only finding the original error.",
      ko:"필사 문화와 인쇄 문화의 차이는 속도보다 각자가 만들어 내는 오류의 종류에 있었다. 손으로 베끼는 필경사는 사본마다 새로운 실수를 집어넣었기 때문에 똑같은 필사본은 하나도 없었다. 오류는 쌓이되 국지적으로 머물렀다. 반면 인쇄기는 한 번 짠 활자를 수백 번 찍어 냈으므로, 조판공의 실수 하나가 판본 전체에 똑같이 복제되었다. 그래서 필사본은 서서히 예측할 수 없는 방향으로 망가졌고, 인쇄본은 한꺼번에 똑같은 방식으로 망가졌다. 필사본을 바로잡으려면 여러 사본을 대조해야 했지만, 인쇄본을 바로잡으려면 최초의 오류 하나만 찾으면 되었다.",
      map:[{part:"1문장",role:"비교 기준 선언 — '속도가 아니라 오류의 종류'"},
           {part:"2문장",role:"대상 A(필사본)의 특성"},
           {part:"3문장",role:"by contrast 로 대상 B(인쇄본). 신호어가 뚜렷한 자리"},
           {part:"4~5문장",role:"whereas·세미콜론으로 두 항목을 나란히 정리 — 표 채우기 문제의 재료"}]},
     {title:"r 전략과 K 전략",
      en:"Ecologists distinguish two broad reproductive strategies. Species following an r-strategy produce many offspring, invest little in each, and rely on sheer numbers; they colonize disturbed habitats quickly but suffer heavy losses. K-strategists produce few offspring, invest heavily in each, and mature slowly; they compete well in stable, crowded environments but recover poorly from sudden mortality. Neither strategy is superior in the abstract. What determines success is the match between strategy and environment: the same trait that makes an r-strategist dominant after a fire makes it vulnerable once the community has stabilized.",
      ko:"생태학자들은 번식 전략을 크게 두 가지로 구분한다. r 전략을 따르는 종은 자손을 많이 낳고 각각에는 거의 투자하지 않으며 오로지 수에 기댄다. 이들은 교란된 서식지를 빠르게 점령하지만 손실도 크다. K 전략을 쓰는 종은 자손을 적게 낳고 하나하나에 크게 투자하며 성숙이 느리다. 이들은 안정되고 포화된 환경에서 경쟁력이 있지만 갑작스러운 사망에서는 잘 회복하지 못한다. 어느 전략도 그 자체로 우월하지는 않다. 성패를 가르는 것은 전략과 환경의 궁합이다. 산불 직후 r 전략 종을 우세하게 만드는 바로 그 형질이, 군집이 안정된 뒤에는 그 종을 취약하게 만든다.",
      map:[{part:"1문장",role:"비교 틀 선언"},
           {part:"2문장",role:"A의 특성 3가지 + 장단점 (블록식)"},
           {part:"3문장",role:"B의 특성 3가지 + 장단점 — A와 항목이 정확히 대응"},
           {part:"4~5문장",role:"우열 부정 후 '환경과의 궁합'으로 종합. 추론 문제의 근거"}]}
   ]},

  {type:"분류",group:"학술",icon:"🗂",
   desc:"하나의 큰 범주를 기준에 따라 갈래로 나누는 글. 무엇을 기준으로 나눴는지가 이 유형의 핵심이다.",
   signals:["fall into","be divided into","categories","types","the first … the second","classify"],
   howto:"'몇 갈래로 나뉘는가'보다 '무슨 기준으로 나눴는가'를 먼저 잡는다. 기준이 바뀌면 갈래도 달라지므로, 기준을 밝힌 문장이 지문 요약 문제의 뼈대가 된다. 갈래 이름과 설명을 짝지어 메모하며 읽는다.",
   points:["갈래를 뒤섞어 놓은 오답","분류 기준을 다른 것으로 바꿔 놓은 오답","지문 요약·표 채우기 문제와 직결"],
   examples:[
     {title:"화산의 세 유형",
      en:"Volcanoes are conventionally grouped by the shape their eruptions produce, which in turn reflects the viscosity of the magma. Shield volcanoes form where thin, fast-flowing lava spreads over wide areas, building gentle slopes that may extend for tens of kilometers. Stratovolcanoes arise where thicker magma alternates between lava flows and explosive ash, stacking steep, layered cones. Cinder cones, the smallest of the three, form when gas-rich fragments are thrown from a single vent and settle into a simple pile. Because viscosity depends chiefly on silica content, the same classification could be recast in chemical rather than geometric terms.",
      ko:"화산은 관례적으로 분출이 만들어 내는 형태에 따라 분류되며, 그 형태는 다시 마그마의 점성을 반영한다. 순상 화산은 묽고 빠르게 흐르는 용암이 넓은 지역으로 퍼지면서 형성되어, 수십 킬로미터까지 뻗는 완만한 사면을 이룬다. 성층 화산은 점성이 높은 마그마가 용암 분출과 폭발적 화산재 분출을 번갈아 일으키는 곳에서 생겨, 가파른 층상 원뿔을 쌓아 올린다. 셋 중 가장 작은 분석구는 가스가 많은 파편이 하나의 분화구에서 뿜어져 나와 단순한 더미로 쌓일 때 만들어진다. 점성은 주로 규소 함량에 좌우되므로, 이 분류는 기하학적 기준 대신 화학적 기준으로 다시 세울 수도 있다.",
      map:[{part:"1문장",role:"분류 기준 명시 — 'shape, 그리고 그 배후의 점성'. 가장 중요한 문장"},
           {part:"2~4문장",role:"갈래 1·2·3을 같은 틀(형성 조건 → 결과 형태)로 서술"},
           {part:"5문장",role:"기준을 바꾸면 분류도 달라진다는 단서 — 추론 문제 자리"}]},
     {title:"기억의 갈래",
      en:"Psychologists divide long-term memory according to whether its contents can be brought consciously to mind. Declarative memory can be stated: it includes episodic memory for personal events and semantic memory for general facts. Non-declarative memory cannot be readily verbalized and is demonstrated through performance rather than report; procedural memory for skills belongs here, as does conditioned response. The distinction is supported by dissociation: patients with damage to the hippocampus may lose the ability to form new declarative memories while continuing to acquire motor skills they cannot recall practicing.",
      ko:"심리학자들은 장기 기억을 그 내용을 의식적으로 떠올릴 수 있는지에 따라 나눈다. 서술 기억은 말로 진술할 수 있는 기억으로, 개인적 사건에 대한 일화 기억과 일반적 사실에 대한 의미 기억을 포함한다. 비서술 기억은 쉽게 언어화되지 않으며 보고가 아니라 수행을 통해 드러난다. 기술에 관한 절차 기억이 여기에 속하고 조건 반응도 마찬가지다. 이 구분은 해리 현상으로 뒷받침된다. 해마가 손상된 환자는 새로운 서술 기억을 형성하는 능력을 잃으면서도, 연습한 기억조차 없는 운동 기술은 계속 습득해 나가기도 한다.",
      map:[{part:"1문장",role:"분류 기준 — '의식적으로 떠올릴 수 있는가'"},
           {part:"2문장",role:"갈래 1 + 그 하위 갈래 둘 (2단 분류)"},
           {part:"3문장",role:"갈래 2 + 하위 항목"},
           {part:"4문장",role:"분류의 근거(해리 사례) — 왜 이 기준이 타당한지"}]}
   ]},

  {type:"과정·절차",group:"학술",icon:"🔄",
   desc:"단계가 순서대로 이어지는 글. 자연 현상의 진행이나 실험·제작의 절차를 다룬다.",
   signals:["first","then","subsequently","once","at this stage","finally","until"],
   howto:"단계에 번호를 매기며 읽고, 각 단계가 다음 단계의 조건이 되는지 확인한다. 순서를 바꿔 놓거나 단계를 하나 빼놓은 오답이 흔하다. '이 단계가 끝나야 다음이 시작된다'는 조건 표현(once, until)에 표시해 둔다.",
   points:["단계 순서를 뒤바꾼 오답","동시에 일어나는 일을 순차적인 것처럼 서술한 오답","특정 단계의 역할을 묻는 사실 정보 문제"],
   examples:[
     {title:"별의 죽음",
      en:"When a massive star exhausts the hydrogen in its core, the process that follows unfolds in a fixed order. Fusion first shifts outward to a shell surrounding the core, and the star's outer layers swell enormously. The core, no longer supported by radiation pressure, contracts until temperatures are high enough to fuse helium into carbon. This cycle repeats with successively heavier elements, each stage shorter than the last. Once the core is iron, however, fusion consumes energy rather than releasing it. Support vanishes within seconds, the core collapses, and the rebounding shock wave blows the outer layers into space.",
      ko:"질량이 큰 별이 중심핵의 수소를 다 쓰면 뒤따르는 과정은 정해진 순서로 진행된다. 먼저 핵융합이 중심핵을 둘러싼 껍질층으로 옮겨 가고, 별의 바깥층은 엄청나게 부풀어 오른다. 복사압의 지지를 잃은 중심핵은 헬륨을 탄소로 융합시킬 만큼 온도가 높아질 때까지 수축한다. 이 순환은 점점 더 무거운 원소로 반복되며, 각 단계는 앞 단계보다 짧다. 그러나 중심핵이 철이 되고 나면 핵융합은 에너지를 내놓는 대신 소모한다. 지지력은 몇 초 만에 사라지고 중심핵이 붕괴하며, 되튀어 나온 충격파가 바깥층을 우주 공간으로 날려 버린다.",
      map:[{part:"1문장",role:"시작 조건 + '정해진 순서'라는 예고"},
           {part:"2~3문장",role:"단계 1·2 — first, until 로 순서와 조건 표시"},
           {part:"4문장",role:"반복 구조 + 가속(각 단계가 더 짧아짐)"},
           {part:"5~6문장",role:"임계점(철) → 급격한 종결. Once 가 전환의 신호"}]},
     {title:"방사성 탄소 연대 측정",
      en:"Radiocarbon dating proceeds through several stages, each of which can introduce error. The sample is first cleaned to remove younger carbon absorbed from soil or handling, a step that often removes most of the material. It is then converted to a gas or graphite target and measured, either by counting decays or, more commonly now, by accelerator mass spectrometry. The raw result is a radiocarbon age, which is not yet a calendar age. Because atmospheric carbon-14 has fluctuated, the figure must finally be calibrated against tree-ring records, a step that can widen a tight measurement into a range of two centuries.",
      ko:"방사성 탄소 연대 측정은 여러 단계를 거치는데, 각 단계마다 오차가 끼어들 수 있다. 시료는 먼저 세척하여 토양이나 취급 과정에서 흡수된 더 젊은 탄소를 제거하는데, 이 단계에서 시료 대부분이 사라지는 일이 흔하다. 그다음 시료를 기체나 흑연 표적으로 변환해 측정하는데, 붕괴 수를 세거나 요즘은 더 흔하게 가속기 질량분석법을 쓴다. 이렇게 나온 원자료는 방사성 탄소 연대이지 아직 달력 연대가 아니다. 대기 중 탄소-14 농도가 변동해 왔기 때문에, 이 수치는 마지막으로 나이테 기록에 맞춰 보정해야 하며, 이 단계에서 정밀했던 측정값이 2세기 폭의 구간으로 넓어지기도 한다.",
      map:[{part:"1문장",role:"절차 예고 + '각 단계에 오차'라는 관점 제시"},
           {part:"2~3문장",role:"단계 1(세척) → 단계 2(변환·측정). first, then 신호"},
           {part:"4문장",role:"중간 산물이 최종 답이 아님을 못박음 — 오답 유도 지점"},
           {part:"5문장",role:"단계 3(보정) + 대가(정밀도 손실). finally 신호"}]}
   ]},

  {type:"문제·해결",group:"학술",icon:"🛠",
   desc:"어떤 문제 상황을 제시하고 해결책과 그 한계를 따지는 글. 해결책이 새 문제를 낳는 전개가 흔하다.",
   signals:["the difficulty is","to address this","one solution","however, this approach","at the cost of"],
   howto:"문제 → 해결책 → 남은 한계의 세 덩어리로 나눠 읽는다. 대부분의 학술 지문은 해결책을 온전히 긍정하지 않으므로, 해결책 뒤에 오는 however 문장이 필자의 진짜 입장이다.",
   points:["해결책의 한계를 무시하고 '문제가 해결되었다'고 단정한 오답","필자 태도를 묻는 수사적 의도 문제","제안된 해결책이 여럿일 때 이를 뒤섞는 오답"],
   examples:[
     {title:"도시의 열섬",
      en:"Dense cities absorb and re-radiate heat, and summer nights in an urban core can remain several degrees warmer than the surrounding countryside. The obvious remedy is to increase reflectivity, and painting roofs white does measurably lower surface temperatures. The benefit, however, is not evenly distributed: reflected radiation warms the air at street level even as it cools the roof above. Planting trees addresses both problems at once, since shade reduces absorption while transpiration cools the air directly. Trees, on the other hand, require water and decades of growth, which is precisely what the neighborhoods most affected by heat tend to lack.",
      ko:"밀집된 도시는 열을 흡수했다가 다시 내뿜기 때문에, 여름밤 도심은 주변 시골보다 몇 도씩 더 따뜻하게 유지될 수 있다. 가장 뻔한 해법은 반사율을 높이는 것이고, 지붕을 흰색으로 칠하면 표면 온도가 실제로 낮아진다. 그러나 그 이득이 고르게 돌아가지는 않는다. 반사된 복사열은 위쪽 지붕을 식히는 동시에 거리 높이의 공기를 데우기 때문이다. 나무를 심으면 두 문제를 한꺼번에 다룰 수 있는데, 그늘이 흡수를 줄이는 한편 증산 작용이 공기를 직접 식혀 주기 때문이다. 반면 나무에는 물과 수십 년의 성장 기간이 필요한데, 이는 폭염 피해가 가장 큰 동네일수록 갖추기 어려운 조건이다.",
      map:[{part:"1문장",role:"문제 제시(열섬) + 규모 수치"},
           {part:"2문장",role:"해결책 1과 그 효과"},
           {part:"3문장",role:"however — 해결책 1의 부작용. 필자의 진짜 입장이 드러나는 자리"},
           {part:"4~5문장",role:"해결책 2와 그 한계. 마지막 문장이 문제의 사회적 층위를 드러낸다"}]},
     {title:"항생제 내성",
      en:"Bacterial resistance spreads faster than new antibiotics can be developed, and the shortfall is economic as much as scientific. A drug taken for ten days generates little revenue compared with one taken daily for life, so pharmaceutical firms have steadily withdrawn from the field. Public subsidies for research address the supply side but do nothing to slow the demand that drives resistance. Restricting prescriptions slows resistance but requires diagnostic tools that many clinics lack. The most promising proposals therefore pair the two: guaranteed purchase agreements that reward development, coupled with stewardship rules that keep the resulting drugs in reserve.",
      ko:"세균의 내성은 새 항생제가 개발되는 속도보다 빠르게 퍼지는데, 이 격차는 과학의 문제인 만큼이나 경제의 문제이기도 하다. 열흘간 복용하는 약은 평생 매일 먹는 약에 비해 수익이 적기 때문에, 제약사들은 이 분야에서 꾸준히 발을 뺐다. 연구에 공적 보조금을 주는 방식은 공급 측면을 다루지만, 내성을 부추기는 수요를 늦추는 데는 아무 역할을 하지 못한다. 처방을 제한하면 내성은 늦출 수 있지만 많은 병원에 없는 진단 장비가 필요하다. 그래서 가장 유망한 제안은 둘을 묶는 것이다. 개발에 보상을 주는 구매 보장 계약과, 그렇게 나온 약을 예비로 아껴 두게 하는 관리 규정을 함께 두는 것이다.",
      map:[{part:"1문장",role:"문제 + 문제의 성격 재정의('과학이 아니라 경제이기도')"},
           {part:"2문장",role:"원인 규명 — 왜 공급이 끊겼는가"},
           {part:"3~4문장",role:"해결책 1과 2를 각각 제시하고 각각의 결함을 바로 지적"},
           {part:"5문장",role:"결합형 해결책으로 종합. 지문 요약 문제의 핵심 문장"}]}
   ]},

  {type:"연대기·발전사",group:"학술",icon:"📜",
   desc:"시간 순서를 따라 변화를 서술하는 글. 연도·세기 표현이 뼈대가 되고, 시기마다 무엇이 달라졌는지가 초점이다.",
   signals:["by the 1850s","within a generation","it was not until","thereafter","in the decades that followed"],
   howto:"연표를 그리며 읽되 연도 자체보다 '무엇이 언제 바뀌었나'를 잡는다. it was not until ~ that 구문은 '그전에는 없었다'는 뜻이므로 부정 사실 정보 문제로 잘 나온다.",
   points:["시기를 뒤바꾼 오답","한 시기의 특징을 다른 시기로 옮긴 오답","it was not until 구문을 이용한 부정 사실 정보 문제"],
   examples:[
     {title:"운하에서 철도로",
      en:"Canal building dominated American transport investment through the 1830s, and the Erie Canal's success prompted a decade of imitation across the eastern states. Railroads at first appeared merely supplementary, useful for linking mines to the nearest waterway. It was not until the 1850s that rail mileage surpassed canal mileage, and even then the shift owed as much to winter reliability as to speed: canals froze, while trains did not. In the decades that followed, canal companies that had once financed railroads as feeders found themselves absorbed by them. By 1880 most eastern canals carried only bulk goods for which slowness cost little.",
      ko:"1830년대까지 미국의 운송 투자에서는 운하 건설이 지배적이었고, 이리 운하의 성공은 동부 여러 주에 10년간 모방 열풍을 불러왔다. 철도는 처음에 광산을 가장 가까운 수로에 잇는 정도로만 쓸모 있는 보조 수단으로 보였다. 철도 연장이 운하 연장을 넘어선 것은 1850년대에 이르러서였는데, 그때조차 이 전환은 속도만큼이나 겨울철 신뢰성 덕분이었다. 운하는 얼었지만 기차는 얼지 않았다. 뒤이은 수십 년간, 한때 철도를 지선(支線)으로 여겨 자금을 대던 운하 회사들은 도리어 철도에 흡수되었다. 1880년에 이르자 동부의 운하 대부분은 느려도 손해가 크지 않은 대량 화물만 실어 날랐다.",
      map:[{part:"1문장",role:"시기 1(~1830년대) — 운하 우위"},
           {part:"2문장",role:"경쟁자의 초기 위상 — '보조적'"},
           {part:"3문장",role:"전환점(1850년대). It was not until ~ that 구문 = 그전에는 아니었다"},
           {part:"4~5문장",role:"시기 3·4 — 관계 역전과 최종 상태. 시기 뒤섞기 오답을 조심할 구간"}]},
     {title:"천문 관측의 정밀도",
      en:"For most of recorded history, positional astronomy advanced by refining the naked eye rather than replacing it. Ptolemaic tables, compiled in the second century, remained serviceable for well over a thousand years. Tycho Brahe's instruments, built in the 1570s, pushed unaided observation to roughly one arcminute — about the limit of human vision — and it was this precision, not the telescope, that allowed Kepler to detect the ellipticity of Mars's orbit. The telescope, introduced shortly afterward, initially improved brightness far more than position. Only with the micrometer eyepiece, developed later in the seventeenth century, did instruments begin to surpass the eye in measuring angles.",
      ko:"기록된 역사의 대부분 동안 위치 천문학은 육안을 대체하기보다 육안을 갈고닦는 방식으로 발전했다. 2세기에 편찬된 프톨레마이오스의 표는 천 년이 훨씬 넘도록 쓸 만했다. 1570년대에 제작된 튀코 브라헤의 기구들은 맨눈 관측을 약 1각분, 즉 인간 시력의 한계 부근까지 밀어붙였고, 케플러가 화성 궤도의 타원성을 알아낸 것은 망원경이 아니라 바로 이 정밀도 덕분이었다. 얼마 뒤 등장한 망원경은 처음에는 위치보다 밝기를 훨씬 크게 개선했다. 기구가 각도 측정에서 눈을 앞지르기 시작한 것은 17세기 후반에 개발된 마이크로미터 접안경에 이르러서였다.",
      map:[{part:"1문장",role:"전체 흐름 요약 — '대체가 아니라 정교화'"},
           {part:"2~3문장",role:"시기 1(2세기)·시기 2(1570년대) + 통념 뒤집기(망원경이 아니라 정밀도)"},
           {part:"4문장",role:"시기 3 — 망원경의 한계. 여기서 '망원경 덕분'이라는 오답이 나온다"},
           {part:"5문장",role:"시기 4(17세기 후반). Only with ~ did 도치 = 그전에는 아니었다"}]}
   ]},

  {type:"논증·반박",group:"학술",icon:"🧠",
   desc:"어떤 주장을 세우고 근거를 대거나, 기존 견해를 반박하며 대안을 내놓는 글. 필자의 입장이 뚜렷하다.",
   signals:["it has long been assumed","proponents argue","critics counter","this view overlooks","the evidence suggests otherwise"],
   howto:"'누구의 주장인가'를 문장마다 표시하며 읽는다. 통념·타인의 주장과 필자 자신의 주장이 섞여 있으므로, 이를 혼동하면 수사적 의도 문제를 통째로 놓친다. however·yet 뒤가 대개 필자의 입장이다.",
   points:["필자의 견해와 필자가 반박하는 견해를 뒤바꾼 오답","근거로 든 사실을 주장으로 격상한 오답","수사적 의도(Why does the author mention …?) 문제의 주 무대"],
   examples:[
     {title:"거석 유적의 목적",
      en:"It has long been assumed that megalithic monuments were primarily astronomical instruments, aligned to mark solstices for agricultural timing. Proponents point to sightlines that do coincide with solar events. Critics counter that with enough stones and enough celestial targets, some alignments will occur by chance, and that the claimed precision often exceeds what the builders could have measured. The stronger objection, however, is functional: societies that could track seasons from vegetation and animal behavior had little need for stone calendars. What the monuments demonstrably required was coordinated labor over generations, which suggests their primary work may have been social rather than calendrical.",
      ko:"거석 기념물이 주로 천문 관측 기구였으며 농사 시기를 알기 위해 지점(至點)에 맞춰 배치되었다는 견해가 오랫동안 통용되어 왔다. 이를 지지하는 이들은 실제로 태양 현상과 일치하는 시선축(視線軸)을 근거로 든다. 비판자들은 돌이 충분히 많고 천체 표적도 충분히 많으면 일부 정렬은 우연히 생기기 마련이며, 주장되는 정밀도가 건설자들이 측정할 수 있었던 수준을 넘어서는 경우가 많다고 반박한다. 그러나 더 강한 반론은 기능에 관한 것이다. 식생과 동물 행동으로 계절을 읽을 수 있던 사회에는 돌로 만든 달력이 별로 필요하지 않았다. 그 기념물들이 확실히 요구한 것은 여러 세대에 걸친 조직된 노동이었고, 이는 그것들의 일차적 기능이 역법이 아니라 사회적인 것이었을 가능성을 시사한다.",
      map:[{part:"1문장",role:"통념 — It has long been assumed (필자 주장이 아님에 주의)"},
           {part:"2문장",role:"통념 측 근거 (Proponents)"},
           {part:"3문장",role:"반론 1 (Critics) — 아직 필자 목소리가 아니다"},
           {part:"4~5문장",role:"however 이후가 필자의 입장. '더 강한 반론'이라는 평가어가 화자 전환 신호"}]},
     {title:"언어와 사고",
      en:"Strong versions of linguistic relativity — the claim that language determines what speakers can think — have been largely abandoned. The evidence that undermined them is straightforward: speakers routinely form concepts their language has no word for, and they borrow or coin terms when a concept becomes useful. Yet the collapse of the strong claim does not vindicate the opposite extreme. Careful experiments show that language shapes what speakers attend to by default, particularly in tasks performed quickly. The reasonable position, then, is neither determination nor irrelevance but bias: language makes certain distinctions cheap to make and others expensive.",
      ko:"언어가 화자가 사고할 수 있는 것을 결정한다는 강한 형태의 언어 상대성 가설은 대체로 폐기되었다. 그것을 무너뜨린 증거는 단순하다. 화자들은 자기 언어에 단어가 없는 개념도 아무렇지 않게 형성하며, 어떤 개념이 유용해지면 말을 빌려 오거나 새로 만들어 낸다. 그러나 강한 주장이 무너졌다고 해서 정반대 극단이 옳다고 입증되는 것은 아니다. 정교한 실험들은 언어가 화자가 기본적으로 무엇에 주의를 기울이는지를, 특히 빠르게 수행하는 과제에서 형성한다는 점을 보여 준다. 그러므로 타당한 입장은 결정도 무관함도 아닌 편향이다. 언어는 어떤 구분은 싸게, 다른 구분은 비싸게 만든다.",
      map:[{part:"1문장",role:"반박 대상 제시 + 이미 폐기되었다는 판정"},
           {part:"2문장",role:"반박의 근거"},
           {part:"3문장",role:"Yet — 방향 전환. 반대 극단도 경계한다는 이중 반박"},
           {part:"4~5문장",role:"절충된 필자 입장. '~도 ~도 아닌 X'가 결론 문장의 전형"}]}
   ]},

  {type:"가설·검증",group:"학술",icon:"🔬",
   desc:"현상을 설명할 가설을 세우고 실험·관찰로 확인하는 글. 방법과 한계가 반드시 함께 서술된다.",
   signals:["to test this","the researchers predicted","if … then","controlled for","the results indicate","a limitation"],
   howto:"가설 → 예측 → 방법 → 결과 → 한계의 다섯 칸을 채우며 읽는다. 결과 문장의 조심스러운 표현(suggests, is consistent with)을 단정(proves)으로 바꾼 오답이 가장 흔하다.",
   points:["'시사한다'를 '입증했다'로 격상한 오답","통제 변수와 실험 변수를 뒤바꾼 오답","연구의 한계를 묻는 추론 문제"],
   examples:[
     {title:"새의 자기(磁氣) 감각",
      en:"To test whether migratory birds navigate by the Earth's magnetic field, researchers housed robins in cages surrounded by artificial coils. If the birds relied on magnetism, reversing the field should reverse their preferred orientation. It did. The result was initially taken as decisive, but a later objection noted that the coils also produced faint radio-frequency noise, and birds exposed to that noise alone became disoriented as well. Subsequent designs shielded the noise while varying the field independently, and the orientation effect persisted. The evidence is now considered strong, though the receptor responsible has still not been identified with certainty.",
      ko:"철새가 지구 자기장으로 방향을 잡는지 확인하기 위해 연구자들은 울새를 인공 코일로 둘러싼 새장에 넣었다. 새들이 자기에 의존한다면 자기장을 뒤집을 때 선호하는 방향도 뒤집혀야 했다. 실제로 그랬다. 이 결과는 처음에 결정적인 것으로 받아들여졌지만, 훗날 코일이 미약한 무선 주파수 잡음도 함께 만들어 냈으며 그 잡음에만 노출된 새들 역시 방향 감각을 잃었다는 반론이 제기되었다. 이후의 실험 설계는 잡음을 차단한 채 자기장만 따로 변화시켰고, 방향 정위 효과는 그대로 남았다. 이제 이 증거는 강력한 것으로 평가되지만, 그 역할을 하는 수용기가 무엇인지는 여전히 확실하게 밝혀지지 않았다.",
      map:[{part:"1~2문장",role:"가설과 예측 — If … should … 구조"},
           {part:"3문장",role:"1차 결과"},
           {part:"4문장",role:"교란 변수 발견 — 결과를 흔드는 반론"},
           {part:"5~6문장",role:"변수를 분리한 재검증 + 남은 한계. 마지막 절이 추론 문제의 근거"}]},
     {title:"휴면 씨앗의 수명",
      en:"A botanist buried bottles of seed in 1879 to determine how long buried seeds remain viable, intending that successors would exhume one bottle every five years. The interval was later lengthened to twenty, which is why the experiment continues today. Germination rates have declined unevenly rather than smoothly: some species failed entirely within decades, while moth mullein still sprouted after well over a century. Because the bottles were buried at a single site, however, the results describe the interaction of these seeds with one soil and one climate, and they cannot be generalized to storage conditions elsewhere.",
      ko:"한 식물학자가 1879년에 씨앗을 담은 병들을 땅에 묻었다. 묻힌 씨앗이 얼마나 오래 발아력을 유지하는지 알아보기 위해서였고, 후임자들이 5년마다 병 하나씩을 파내도록 할 작정이었다. 이 간격은 나중에 20년으로 늘어났고, 그래서 이 실험은 오늘날까지 이어지고 있다. 발아율은 매끄럽게가 아니라 들쭉날쭉하게 떨어졌다. 어떤 종은 수십 년 만에 완전히 실패한 반면, 나도개미자리는 한 세기가 훌쩍 넘은 뒤에도 싹을 틔웠다. 그러나 병들이 한 장소에만 묻혔기 때문에, 그 결과는 이 씨앗들이 하나의 토양·하나의 기후와 맺은 상호작용을 기술할 뿐이며 다른 저장 조건으로 일반화할 수는 없다.",
      map:[{part:"1~2문장",role:"연구 목적과 설계, 그리고 설계 변경"},
           {part:"3문장",role:"결과 — '고르게가 아니라 들쭉날쭉' 이라는 관찰의 성격"},
           {part:"4문장",role:"종별 대비로 결과 구체화"},
           {part:"5문장",role:"Because … however 로 한계 명시. 일반화 오답을 막는 자리"}]}
   ]},

  {type:"사례·예시",group:"학술",icon:"💡",
   desc:"일반적인 원리를 먼저 말하고 구체적 사례로 뒷받침하는 글. 사례가 길어도 결국 앞 문장의 원리를 위해 존재한다.",
   signals:["for instance","a case in point","consider","illustrates","such as","to take one example"],
   howto:"사례에 빠지지 말고 그 사례가 무엇을 보여 주려는지를 계속 되묻는다. 수사적 의도 문제는 거의 항상 '왜 이 사례를 들었는가'를 묻는다. 사례가 둘 이상이면 각각이 원리의 다른 면을 보여 주는지 확인한다.",
   points:["사례의 세부 사실을 지문의 주제로 착각하게 만드는 오답","'왜 필자가 X를 언급했는가' 수사적 의도 문제","사례 하나를 전체 원리로 일반화한 오답"],
   examples:[
     {title:"기술 도입의 시차",
      en:"New technologies rarely deliver their gains at the moment of adoption; the surrounding practices must be rebuilt first. Consider the electric motor. Factories that simply replaced a steam engine with a large electric one saw modest savings, because the building still had to be organized around a single central drive shaft. Only when engineers began installing small motors on individual machines could floors be laid out by the logic of the work rather than the geometry of the belts. That reorganization took roughly forty years, and the productivity gains historians attribute to electrification appear almost entirely in the later period.",
      ko:"새로운 기술이 도입되는 그 순간에 이득을 내놓는 일은 드물다. 그 주변의 관행이 먼저 다시 짜여야 한다. 전기 모터를 생각해 보자. 증기기관을 큰 전기 모터로 바꾸기만 한 공장들은 절감 효과가 미미했는데, 건물이 여전히 하나의 중앙 구동축을 중심으로 배치되어야 했기 때문이다. 기술자들이 개별 기계마다 작은 모터를 달기 시작하고 나서야 비로소 작업장을 벨트의 기하학이 아니라 작업의 논리에 따라 배치할 수 있었다. 그 재편에는 대략 40년이 걸렸고, 역사가들이 전기화 덕분이라고 보는 생산성 향상은 거의 전부 그 후반기에 나타난다.",
      map:[{part:"1문장",role:"원리 선언 — 이 지문의 주제문"},
           {part:"2문장",role:"Consider 로 사례 진입 신호"},
           {part:"3~4문장",role:"사례의 전개(실패 → 성공)로 원리를 입증"},
           {part:"5문장",role:"사례를 수치로 닫으며 원리로 회귀. '전기 모터'가 주제가 아님에 주의"}]},
     {title:"보전 정책의 역효과",
      en:"Rules designed to protect a resource can create incentives to destroy it before the rules take effect. A case in point is the preemptive clearing of habitat that has repeatedly followed the announcement of endangered-species listings. Landowners who expect future restrictions on land containing a protected species have reason to remove the habitat while removal is still lawful. Surveys of timber tracts in the southeastern United States found exactly this pattern around one woodpecker listing, with harvest rates rising on parcels nearest known colonies. The lesson is not that protection fails, but that announcing a restriction is itself an event that changes behavior.",
      ko:"자원을 보호하려고 만든 규칙이 도리어 규칙이 발효되기 전에 그 자원을 없애도록 유인을 만들 수 있다. 멸종위기종 지정 발표 뒤에 반복적으로 나타난 선제적 서식지 제거가 그 사례다. 보호종이 사는 땅에 앞으로 규제가 걸릴 것으로 예상하는 지주는 아직 합법일 때 서식지를 없앨 이유가 생긴다. 미국 남동부 임야를 조사한 결과 어느 딱따구리 지정을 둘러싸고 정확히 이런 양상이 나타났으며, 알려진 군집에 가까운 필지일수록 벌채율이 높아졌다. 여기서 얻을 교훈은 보호가 실패한다는 것이 아니라, 규제를 예고하는 행위 자체가 행동을 바꾸는 하나의 사건이라는 점이다.",
      map:[{part:"1문장",role:"원리(역효과) 선언"},
           {part:"2문장",role:"A case in point — 사례 진입"},
           {part:"3문장",role:"사례의 메커니즘 설명(왜 그런 유인이 생기는가)"},
           {part:"4문장",role:"실증 자료로 사례 뒷받침"},
           {part:"5문장",role:"'~가 아니라 ~이다'로 교훈 정리 — 잘못된 요약 오답을 막는 문장"}]}
   ]},

];
