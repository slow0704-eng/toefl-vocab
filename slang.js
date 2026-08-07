/* ============================================================
   장르·슬랭 — SF·판타지 / 힙합 / 스트리트 구어
   ------------------------------------------------------------
   domain : "SF·판타지" | "힙합" | "스트리트"
   cat    : 영역별 세부 분류
   reg    : 사용 등급 — 이 앱에서 가장 중요한 필드
            1 = 어디서나 (직장·시험·처음 만난 사람에게도 무난)
            2 = 친한 사이에서만 (또래·친구끼리. 격식 자리에서는 쓰지 말 것)
            3 = 이해만 (뜻은 알아 두되 직접 쓰지 말 것 —
                흑인 공동체 내부 표현이거나, 비원어민이 쓰면
                흉내 내는 것처럼 들려 무례해지기 쉬운 말)
   ex/exKo : 예문과 해석      blank : ex 안에서 빈칸으로 가릴 부분
   note   : 쓰는 법·주의점

   ※ 인종적 멸칭(특히 n-word)은 등급을 매길 대상이 아니라서
     애초에 수록하지 않았다. 가사에 나오더라도 비흑인은 인용·따라
     부르기를 포함해 어떤 경우에도 입에 담지 않는 것이 원칙이다.
   ============================================================ */
window.SLANG = [

  /* ═══════════ SF·판타지 ═══════════ */

  /* ── 세계관·배경 ── */
  {term:"dystopian",pos:"adj.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"디스토피아적인, 암울한 미래의",ko2:"",en:"describing an imagined society that is frightening or oppressive",
   ex:"The novel paints a dystopian future where water is rationed by the state.",
   exKo:"그 소설은 국가가 물을 배급하는 암울한 미래를 그린다.",blank:"dystopian",
   note:"명사는 dystopia. 반대말 utopia(이상향)와 짝으로 외우면 좋다. 시사·서평에서도 그대로 쓰인다."},

  {term:"post-apocalyptic",pos:"adj.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"종말 이후의",en:"set after a catastrophe that has destroyed civilization",
   ex:"Most of the game takes place in a post-apocalyptic wasteland.",
   exKo:"게임 대부분은 종말 이후의 황무지에서 진행된다.",blank:"post-apocalyptic",
   note:"apocalypse(종말)에서 나온 말. post-는 '~이후'라는 접두사라 pre-apocalyptic도 만들어 쓸 수 있다."},

  {term:"wasteland",pos:"n.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"황무지, 불모지",en:"an empty, ruined area where little can live",
   ex:"Nothing grew in the wasteland beyond the eastern wall.",
   exKo:"동쪽 성벽 너머 황무지에서는 아무것도 자라지 않았다.",blank:"wasteland",
   note:"비유로도 흔하다. a cultural wasteland는 '문화의 불모지'."},

  {term:"realm",pos:"n.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"왕국, 영역, 차원",en:"a kingdom, or a distinct world or domain",
   ex:"A portal opened between the mortal realm and the world of the dead.",
   exKo:"인간계와 사자의 세계 사이에 관문이 열렸다.",blank:"realm",
   note:"판타지에서는 '세계·차원', 일반 글에서는 '분야'(the realm of politics)로 쓰인다."},

  {term:"terraform",pos:"v.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"행성을 사람이 살 수 있게 개조하다",en:"to transform a planet so humans can live on it",
   ex:"It took three centuries to terraform the northern hemisphere.",
   exKo:"북반구를 개조하는 데 3세기가 걸렸다.",blank:"terraform",
   note:"terra(땅)+form(만들다). 명사는 terraforming."},

  {term:"colony",pos:"n.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"식민지, 개척지",en:"a settlement established in a new territory",
   ex:"The mining colony lost contact with Earth for eleven years.",
   exKo:"그 채굴 개척지는 11년간 지구와 연락이 끊겼다.",blank:"mining colony",
   note:"역사·생물(개미 군집)에서도 그대로 쓰는 기본 단어다."},

  {term:"outpost",pos:"n.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"전초기지, 변방 주둔지",en:"a small base far from the main settlement",
   ex:"The last outpost before the border had six people and one reactor.",
   exKo:"국경 앞 마지막 전초기지에는 여섯 명과 원자로 하나가 있었다.",blank:"outpost",
   note:"군사·탐험 맥락에서 흔하다. the last outpost of ~는 '~의 마지막 보루'라는 비유로도 쓴다."},

  {term:"lore",pos:"n.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"설정, 전승",en:"the accumulated background story of a fictional world",
   ex:"Half the fun is digging through the lore hidden in item descriptions.",
   exKo:"재미의 절반은 아이템 설명에 숨은 설정을 파는 데 있다.",blank:"lore",
   note:"게임·팬덤에서 매우 자주 쓴다. folklore(민간 전승)의 lore와 같은 뿌리."},

  {term:"worldbuilding",pos:"n.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"세계관 구축",en:"the craft of inventing a coherent fictional world",
   ex:"The plot drags, but the worldbuilding is extraordinary.",
   exKo:"전개는 늘어지지만 세계관 구축은 대단하다.",blank:"worldbuilding",
   note:"창작·리뷰에서 표준 용어. 붙여 쓰거나 world-building으로 쓴다."},

  {term:"canon",pos:"n.",domain:"SF·판타지",cat:"세계관·배경",reg:1,
   ko:"공식 설정",en:"the officially accepted material of a fictional universe",
   ex:"That spin-off was fun, but it is not canon.",
   exKo:"그 스핀오프는 재미있었지만 공식 설정은 아니다.",blank:"not canon",
   note:"팬덤 필수어. 반대는 non-canon·fanon. 형용사 canonical도 쓴다."},

  /* ── 존재·종족 ── */
  {term:"sentient",pos:"adj.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"지각이 있는, 의식이 있는",en:"able to perceive and feel",
   ex:"The crew argued over whether the ship's computer had become sentient.",
   exKo:"승무원들은 함선 컴퓨터가 의식을 갖게 되었는지를 두고 다퉜다.",blank:"sentient",
   note:"AI 윤리 논의에서 실제로 쓰이는 단어다. 명사는 sentience."},

  {term:"android",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"인간형 로봇",en:"a robot built to look human",
   ex:"You could not tell the android from the passengers.",
   exKo:"그 인간형 로봇과 승객들을 구분할 수 없었다.",blank:"android",
   note:"robot은 형태 무관, android는 사람 모양, cyborg는 개조 인간으로 구분된다."},

  {term:"cyborg",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"사이보그, 기계 개조 인간",en:"a being that is part organic, part machine",
   ex:"After the accident he was rebuilt as a cyborg.",
   exKo:"사고 후 그는 사이보그로 재건되었다.",blank:"cyborg",
   note:"cybernetic organism의 줄임말이다."},

  {term:"mortal",pos:"adj./n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"죽을 운명의; 인간",en:"subject to death; a human being (as opposed to a god)",
   ex:"No mortal had ever crossed the bridge and returned.",
   exKo:"그 다리를 건너 돌아온 인간은 없었다.",blank:"mortal",
   note:"반대말 immortal(불멸의). 신화·판타지에서 신과 인간을 가르는 기본 단어다."},

  {term:"deity",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"신, 신격",en:"a god or goddess",
   ex:"Each city worshipped a different deity of the harvest.",
   exKo:"각 도시는 서로 다른 수확의 신을 섬겼다.",blank:"deity",
   note:"god보다 격식 있는 말. 종교학·신화학 글에서도 그대로 쓴다."},

  {term:"oracle",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"신탁, 예언자",en:"a person or source that reveals divine knowledge",
   ex:"The oracle spoke in riddles that no one could untangle.",
   exKo:"그 예언자는 아무도 풀 수 없는 수수께끼로 말했다.",blank:"oracle",
   note:"고대 그리스 델포이 신탁에서 온 말. 지금도 '권위 있는 정보원'이라는 비유로 쓴다."},

  {term:"tyrant",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"폭군",en:"a cruel ruler with absolute power",
   ex:"The rebellion began the winter the tyrant raised the grain tax.",
   exKo:"반란은 폭군이 곡물세를 올린 그해 겨울에 시작되었다.",blank:"tyrant",
   note:"형용사 tyrannical, 명사 tyranny(폭정). 정치 기사에서도 흔하다."},

  {term:"heir",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"후계자, 상속자",en:"a person who will inherit a title or property",
   ex:"The rightful heir had been hidden in a farming village for sixteen years.",
   exKo:"정당한 후계자는 16년간 농촌 마을에 숨겨져 있었다.",blank:"rightful heir",
   note:"h를 발음하지 않아 /에어/처럼 읽는다. 법률 용어로도 그대로 쓴다."},

  {term:"bloodline",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"혈통",en:"a line of descent, especially a notable one",
   ex:"Only someone of her bloodline could open the vault.",
   exKo:"그의 혈통을 이은 사람만이 그 금고를 열 수 있었다.",blank:"bloodline",
   note:"판타지의 단골 설정어. 경마·축산에서도 '혈통'이라는 뜻으로 쓴다."},

  {term:"mutation",pos:"n.",domain:"SF·판타지",cat:"존재·종족",reg:1,
   ko:"돌연변이",en:"a change in genetic structure",
   ex:"The mutation gave them resistance to the toxin.",
   exKo:"그 돌연변이 덕분에 그들은 독소에 저항력을 갖게 되었다.",blank:"mutation",
   note:"생물학 정식 용어이기도 하다. 사람을 가리킬 때는 mutant."},

  /* ── 마법·능력 ── */
  {term:"wield",pos:"v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"휘두르다, 행사하다",en:"to hold and use a weapon or power",
   ex:"Only the heir could wield the blade without being burned.",
   exKo:"오직 후계자만이 화상을 입지 않고 그 검을 휘두를 수 있었다.",blank:"wield",
   note:"무기뿐 아니라 wield influence/power(영향력을 행사하다)처럼 추상적으로도 쓴다."},

  {term:"summon",pos:"v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"소환하다",en:"to call forth a being or force",
   ex:"It takes three mages to summon anything larger than a hound.",
   exKo:"사냥개보다 큰 것을 소환하려면 마법사 셋이 필요하다.",blank:"summon",
   note:"현실에서는 '호출하다'(be summoned to court, 법정 출두 명령)로 쓴다."},

  {term:"conjure",pos:"v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"마법으로 만들어 내다",en:"to make something appear as if by magic",
   ex:"She could conjure light but never fire.",
   exKo:"그는 빛은 만들어 낼 수 있었지만 불은 끝내 못 했다.",blank:"conjure",
   note:"conjure up a memory(기억을 떠올리다)처럼 비유로도 자주 쓴다."},

  {term:"incantation",pos:"n.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"주문",en:"words chanted to work magic",
   ex:"The incantation had to be spoken without a single pause.",
   exKo:"그 주문은 한 번도 끊지 않고 외워야 했다.",blank:"incantation",
   note:"chant(읊다)와 어울려 쓰인다. 짧은 주문은 spell이라고도 한다."},

  {term:"enchanted",pos:"adj.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"마법이 걸린",en:"placed under a magic spell",
   ex:"The enchanted rope tightened whenever someone lied.",
   exKo:"그 마법 밧줄은 누군가 거짓말할 때마다 조여들었다.",blank:"enchanted rope",
   note:"동사 enchant는 일상에서 '매료시키다'(I was enchanted by the music)로도 쓴다."},

  {term:"banish",pos:"v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"추방하다, 쫓아내다",en:"to send away permanently, often by decree or magic",
   ex:"The council voted to banish him beyond the northern pass.",
   exKo:"의회는 그를 북쪽 고개 너머로 추방하기로 결정했다.",blank:"banish",
   note:"명사는 banishment. exile(망명·유배)과 비슷하지만 banish가 더 강제적이다."},

  {term:"vanquish",pos:"v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"완전히 무찌르다",en:"to defeat thoroughly",
   ex:"No army had vanquished the fortress in four hundred years.",
   exKo:"400년간 어떤 군대도 그 요새를 함락하지 못했다.",blank:"vanquished",
   note:"defeat보다 문어적이고 극적이다. 일상 대화에서는 거의 쓰지 않는다."},

  {term:"curse",pos:"n./v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"저주; 저주하다",en:"a spell intended to harm; to place such a spell",
   ex:"The curse passed to whoever spoke the family name aloud.",
   exKo:"그 저주는 가문의 이름을 소리 내어 말하는 사람에게 옮겨 갔다.",blank:"curse",
   note:"일상에서 curse는 '욕하다'라는 뜻도 된다(curse words = 욕설)."},

  {term:"ascend",pos:"v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"오르다, 승천하다",en:"to rise, especially to a higher state or rank",
   ex:"Those who complete the trial ascend to a form without a body.",
   exKo:"시련을 마친 자는 육체 없는 존재로 승천한다.",blank:"ascend",
   note:"ascend the throne(왕위에 오르다)로도 쓴다. 반대는 descend."},

  {term:"forge",pos:"v.",domain:"SF·판타지",cat:"마법·능력",reg:1,
   ko:"벼려 만들다",en:"to shape metal by heating and hammering",
   ex:"The sword was forged from a fragment of a fallen star.",
   exKo:"그 검은 떨어진 별의 파편으로 벼려졌다.",blank:"forged",
   note:"forge an alliance(동맹을 맺다)처럼 비유로도 쓴다. '위조하다'라는 뜻도 있다."},

  /* ── 기술·장치 ── */
  {term:"warp",pos:"v./n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"공간을 접어 이동하다; 워프",en:"to travel by bending space; such a jump",
   ex:"We can warp to the outer ring in under a minute.",
   exKo:"우리는 1분 안에 외곽 고리까지 워프할 수 있다.",blank:"warp",
   note:"원래 뜻은 '휘다·뒤틀리다'. warped(뒤틀린)는 일상에서도 쓴다."},

  {term:"wormhole",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"웜홀",en:"a hypothetical tunnel connecting distant points in spacetime",
   ex:"The wormhole stayed open for exactly nine seconds.",
   exKo:"그 웜홀은 정확히 9초 동안 열려 있었다.",blank:"wormhole",
   note:"실제 물리학 용어이기도 하다."},

  {term:"hyperspace",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"초공간",en:"a theoretical space allowing faster-than-light travel",
   ex:"Anything left outside the hull is lost in hyperspace.",
   exKo:"선체 밖에 남겨진 것은 무엇이든 초공간에서 사라진다.",blank:"hyperspace",
   note:"hyper-(초과)+space. FTL(faster-than-light)과 함께 자주 등장한다."},

  {term:"singularity",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"특이점",en:"the point at which AI surpasses human intelligence; a point of infinite density",
   ex:"Half the book is about what happens the year after the singularity.",
   exKo:"책의 절반은 특이점 이듬해에 벌어지는 일을 다룬다.",blank:"singularity",
   note:"AI 담론에서 실제로 쓰이는 말이라 기술 기사에서도 만난다."},

  {term:"portal",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"관문, 차원문",en:"a doorway between places or worlds",
   ex:"A portal to the archive opens only at the solstice.",
   exKo:"기록실로 통하는 관문은 지점(至點)에만 열린다.",blank:"portal",
   note:"웹 용어 portal(포털 사이트)과 같은 단어다."},

  {term:"artifact",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"유물, 고대 물건",en:"an object made by humans, especially one of historical interest",
   ex:"The artifact hummed whenever it was brought near water.",
   exKo:"그 유물은 물 가까이 가져가면 웅웅거렸다.",blank:"artifact",
   note:"고고학 정식 용어. 영국식 철자는 artefact."},

  {term:"relic",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"유물, 잔재",en:"something surviving from the past",
   ex:"The throne was a relic of an empire no one remembered.",
   exKo:"그 왕좌는 아무도 기억하지 못하는 제국의 잔재였다.",blank:"relic",
   note:"a relic of the past처럼 '시대에 뒤진 것'이라는 비유로도 쓴다."},

  {term:"rune",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"룬 문자, 마법 문양",en:"a letter of an ancient alphabet, often used as a magic symbol",
   ex:"Runes were carved into every beam of the hall.",
   exKo:"홀의 모든 들보에 룬 문자가 새겨져 있었다.",blank:"Runes",
   note:"실제 고대 게르만 문자 체계에서 왔다."},

  {term:"elixir",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"영약, 묘약",en:"a magical liquid that cures or grants power",
   ex:"One drop of the elixir bought him another century.",
   exKo:"그 영약 한 방울이 그에게 한 세기를 더 벌어 주었다.",blank:"elixir",
   note:"the elixir of life(불로장생약). 연금술(alchemy) 어휘군에 속한다."},

  {term:"alchemy",pos:"n.",domain:"SF·판타지",cat:"기술·장치",reg:1,
   ko:"연금술",en:"the medieval art of transforming matter, especially into gold",
   ex:"What they called alchemy we would now call bad chemistry.",
   exKo:"그들이 연금술이라 부른 것을 지금 우리는 서툰 화학이라 부를 것이다.",blank:"alchemy",
   note:"비유로 '마법 같은 변화'(a kind of alchemy)를 뜻하기도 한다."},

  /* ── 서사·전개 ── */
  {term:"prophecy",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"예언",en:"a prediction of what will happen, especially a divine one",
   ex:"The prophecy named a child born under a dark moon.",
   exKo:"그 예언은 그믐달 아래 태어난 아이를 지목했다.",blank:"prophecy",
   note:"동사는 prophesy(철자·발음이 다르다). self-fulfilling prophecy(자기실현적 예언)는 사회학 용어."},

  {term:"quest",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"모험, 탐색",en:"a long search or journey with a purpose",
   ex:"The quest was supposed to take a season; it took nine years.",
   exKo:"그 여정은 한 계절이면 될 줄 알았지만 9년이 걸렸다.",blank:"quest",
   note:"게임의 '퀘스트'가 여기서 왔다. in quest of(~을 찾아)는 격식 표현."},

  {term:"foreshadow",pos:"v.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"복선을 깔다, 예고하다",en:"to hint at something that will happen later",
   ex:"The cracked mirror in chapter two foreshadows the ending.",
   exKo:"2장의 깨진 거울이 결말의 복선이다.",blank:"foreshadows",
   note:"문학 비평 표준 용어. 명사는 foreshadowing."},

  {term:"plot twist",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"반전",en:"an unexpected turn in a story",
   ex:"The plot twist lands because the clues were there all along.",
   exKo:"단서가 내내 깔려 있었기에 그 반전이 먹힌다.",blank:"plot twist",
   note:"일상 농담으로도 쓴다. Plot twist: it was my own umbrella.(반전: 내 우산이었다.)"},

  {term:"redemption arc",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"구원 서사, 갱생 전개",en:"a storyline in which a flawed character earns forgiveness",
   ex:"His redemption arc takes three seasons and never feels cheap.",
   exKo:"그의 갱생 전개는 세 시즌에 걸쳐 진행되는데 한 번도 값싸게 느껴지지 않는다.",blank:"redemption arc",
   note:"arc는 '이야기 곡선'. character arc(인물 변화)도 함께 쓰인다."},

  {term:"protagonist",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"주인공",en:"the main character of a story",
   ex:"The protagonist is not especially likable, which is the point.",
   exKo:"주인공은 딱히 호감형이 아닌데, 그게 핵심이다.",blank:"protagonist",
   note:"반대는 antagonist(적대자). hero보다 중립적인 비평 용어다."},

  {term:"uprising",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"봉기",en:"a revolt against a government or ruler",
   ex:"The uprising started with a strike at the water plant.",
   exKo:"그 봉기는 정수장 파업에서 시작되었다.",blank:"uprising",
   note:"rebellion·revolt와 비슷하다. 뉴스에서도 그대로 쓴다."},

  {term:"betrayal",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"배신",en:"the act of being disloyal to someone who trusted you",
   ex:"The betrayal is worse because she warned him twice.",
   exKo:"그가 두 번이나 경고했기에 그 배신은 더 뼈아프다.",blank:"betrayal",
   note:"동사는 betray. 일상 대화에서도 흔히 쓰는 기본 단어다."},

  {term:"usurp",pos:"v.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"찬탈하다",en:"to seize power or a position wrongfully",
   ex:"He usurped the throne while his brother was at the border.",
   exKo:"그는 형이 국경에 나가 있는 동안 왕위를 찬탈했다.",blank:"usurped",
   note:"명사는 usurper(찬탈자). 문어체라 격식 있는 글에 어울린다."},

  {term:"chosen one",pos:"n.",domain:"SF·판타지",cat:"서사·전개",reg:1,
   ko:"선택받은 자",en:"the single person destined to fulfill a prophecy",
   ex:"The story works because nobody believes he is the chosen one.",
   exKo:"아무도 그를 선택받은 자로 믿지 않기에 그 이야기가 산다.",blank:"chosen one",
   note:"클리셰를 가리키는 말로도 쓴다. the Chosen One 트로프(trope)."},

  /* ═══════════ 힙합 ═══════════ */

  /* ── 랩 기술 ── */
  {term:"bars",pos:"n.",domain:"힙합",cat:"랩 기술",reg:2,
   ko:"랩 가사, 실력 있는 벌스",en:"rap lyrics; lines of rap, especially skillful ones",
   ex:"He only had sixteen bars but he took the whole song.",
   exKo:"16마디밖에 없었는데 곡 전체를 가져갔다.",blank:"bars",
   note:"원래 음악의 '마디'. He's got bars.는 '랩 잘한다'는 최고의 칭찬이다."},

  {term:"flow",pos:"n.",domain:"힙합",cat:"랩 기술",reg:2,
   ko:"플로우, 박자 타는 방식",en:"the rhythm and cadence of a rapper's delivery",
   ex:"Same beat, but her flow makes it sound twice as fast.",
   exKo:"같은 비트인데 그의 플로우가 두 배는 빠르게 들리게 만든다.",blank:"flow",
   note:"힙합 비평의 핵심어. switch flows(플로우를 바꾸다)처럼 쓴다."},

  {term:"freestyle",pos:"n./v.",domain:"힙합",cat:"랩 기술",reg:2,
   ko:"즉흥 랩; 즉흥으로 랩하다",en:"improvised rap; to rap without written lyrics",
   ex:"He freestyled for eight minutes without repeating a line.",
   exKo:"그는 8분 동안 같은 구절 없이 즉흥 랩을 했다.",blank:"freestyled",
   note:"off the dome(머리에서 바로)이라는 표현과 짝을 이룬다."},

  {term:"cypher",pos:"n.",domain:"힙합",cat:"랩 기술",reg:2,
   ko:"싸이퍼 (둘러서서 돌아가며 하는 랩)",en:"a circle of rappers taking turns freestyling",
   ex:"The cypher went around three times before anyone dropped out.",
   exKo:"아무도 빠지지 않고 싸이퍼가 세 바퀴를 돌았다.",blank:"cypher",
   note:"cipher로도 쓴다. 실력을 겨루기보다 함께 즐기는 자리에 가깝다."},

  {term:"punchline",pos:"n.",domain:"힙합",cat:"랩 기술",reg:2,
   ko:"펀치라인 (한 방 있는 구절)",en:"the clever, hard-hitting line of a verse",
   ex:"The whole verse builds up to one punchline.",
   exKo:"벌스 전체가 펀치라인 하나를 위해 쌓아 올린다.",blank:"punchline",
   note:"원래는 농담의 '결정적 한마디'. 코미디·프레젠테이션에서도 쓴다."},

  {term:"wordplay",pos:"n.",domain:"힙합",cat:"랩 기술",reg:1,
   ko:"말장난, 언어유희",en:"clever use of the multiple meanings or sounds of words",
   ex:"His wordplay is dense enough that you catch new things on the fifth listen.",
   exKo:"그의 언어유희는 촘촘해서 다섯 번째 들을 때도 새로 잡히는 게 있다.",blank:"wordplay",
   note:"문학 비평에서도 그대로 쓰는 일반 단어라 어디서든 안전하다."},

  {term:"double entendre",pos:"n.",domain:"힙합",cat:"랩 기술",reg:1,
   ko:"중의적 표현",en:"a phrase with two meanings, one usually hidden",
   ex:"That line is a double entendre — it works as both a threat and a compliment.",
   exKo:"그 구절은 중의적이다. 위협으로도 칭찬으로도 읽힌다.",blank:"double entendre",
   note:"프랑스어에서 온 말이라 발음이 /더블 안탄드러/에 가깝다."},

  {term:"verse",pos:"n.",domain:"힙합",cat:"랩 기술",reg:1,
   ko:"벌스 (곡의 절)",en:"a section of a song between choruses",
   ex:"Her verse is the only reason the track charted.",
   exKo:"그 곡이 차트에 든 건 오로지 그의 벌스 덕분이다.",blank:"verse",
   note:"음악 일반 용어. 구성은 보통 verse–hook–verse–hook 순서다."},

  {term:"hook",pos:"n.",domain:"힙합",cat:"랩 기술",reg:1,
   ko:"후렴, 훅",en:"the catchy repeated part of a song",
   ex:"Nobody remembers the verses, but everybody sings the hook.",
   exKo:"벌스는 아무도 기억 못 해도 훅은 다들 따라 부른다.",blank:"hook",
   note:"chorus와 거의 같은 뜻으로 쓰인다. '사람을 낚는 것'이라는 원뜻에서 왔다."},

  {term:"ad-lib",pos:"n.",domain:"힙합",cat:"랩 기술",reg:1,
   ko:"애드립 (뒤에 깔리는 추임새)",en:"a short improvised vocal layered behind the main line",
   ex:"The ad-libs are half the personality of the track.",
   exKo:"그 곡의 개성 절반은 애드립에서 나온다.",blank:"ad-libs",
   note:"라틴어 ad libitum(마음대로)에서 왔다. 동사로도 쓴다(ad-lib a speech)."},

  /* ── 음악 제작 ── */
  {term:"beat",pos:"n.",domain:"힙합",cat:"음악 제작",reg:1,
   ko:"비트, 반주",en:"the instrumental track a rapper performs over",
   ex:"He sat on that beat for two years before writing to it.",
   exKo:"그는 그 비트를 2년이나 묵혀 두고서야 가사를 붙였다.",blank:"beat",
   note:"on the beat(박자에 맞춰), off beat(박자를 벗어나)로도 쓴다."},

  {term:"sample",pos:"v./n.",domain:"힙합",cat:"음악 제작",reg:1,
   ko:"샘플링하다; 샘플",en:"to reuse a portion of an existing recording in a new track",
   ex:"The chorus samples a 1972 soul record.",
   exKo:"그 후렴은 1972년 소울 음반을 샘플링한 것이다.",blank:"samples",
   note:"저작권 문제로 clear a sample(샘플 사용 허가를 받다)이라는 표현이 함께 쓰인다."},

  {term:"producer",pos:"n.",domain:"힙합",cat:"음악 제작",reg:1,
   ko:"프로듀서 (비트를 만드는 사람)",en:"the person who creates the instrumental and shapes the record",
   ex:"In hip-hop the producer often matters as much as the rapper.",
   exKo:"힙합에서는 프로듀서가 래퍼만큼 중요한 경우가 많다.",blank:"producer",
   note:"영화·방송의 '제작자'와 역할이 다르다. 힙합에서는 곡을 직접 만드는 사람이다."},

  {term:"mixtape",pos:"n.",domain:"힙합",cat:"음악 제작",reg:1,
   ko:"믹스테이프 (비정규 음반)",en:"a free or informal release, often used to build a following",
   ex:"That mixtape got him signed six months later.",
   exKo:"그 믹스테이프 덕분에 반년 뒤 계약을 따냈다.",blank:"mixtape",
   note:"원래는 카세트에 직접 녹음한 모음집. 지금은 정규 앨범이 아닌 발매물을 뜻한다."},

  {term:"feature",pos:"n./v.",domain:"힙합",cat:"음악 제작",reg:1,
   ko:"피처링; 피처링하다",en:"a guest appearance on another artist's track",
   ex:"The album has one feature and it is on the last song.",
   exKo:"그 앨범에는 피처링이 딱 하나 있는데 마지막 곡에 있다.",blank:"feature",
   note:"표기는 feat. 또는 ft. 한국어 '피처링'은 영어로 그냥 feature다."},

  {term:"drop",pos:"v.",domain:"힙합",cat:"음악 제작",reg:2,
   ko:"발매하다",en:"to release music",
   ex:"She dropped the album at midnight with no announcement.",
   exKo:"그는 예고 없이 자정에 앨범을 냈다.",blank:"dropped",
   note:"음악·영화·신제품 모두에 쓴다. 명사 the drop은 곡에서 터지는 지점을 뜻하기도 한다."},

  {term:"banger",pos:"n.",domain:"힙합",cat:"음악 제작",reg:2,
   ko:"엄청난 곡, 명곡",en:"an extremely good, energetic song",
   ex:"Three skits and one banger — that is the whole tape.",
   exKo:"스킷 세 개랑 명곡 하나, 그게 그 테이프 전부다.",blank:"banger",
   note:"음악 외에 경기·영화에도 쓴다. 캐주얼한 자리 전용이다."},

  {term:"slap",pos:"v.",domain:"힙합",cat:"음악 제작",reg:2,
   ko:"(곡이) 죽인다",en:"(of a song) to sound excellent, especially with strong bass",
   ex:"This slaps way harder in the car.",
   exKo:"이거 차에서 들으면 훨씬 죽인다.",blank:"slaps",
   note:"주어가 곡이다(This slaps). 사람에게 쓰면 '때린다'는 뜻이 되니 주의."},

  {term:"underground",pos:"adj./n.",domain:"힙합",cat:"음악 제작",reg:1,
   ko:"언더그라운드의, 비주류의",en:"outside the commercial mainstream",
   ex:"He stayed underground on purpose for a decade.",
   exKo:"그는 10년간 일부러 언더그라운드에 남았다.",blank:"underground",
   note:"반대는 mainstream. 음악·영화·예술 전반에 쓰는 일반 단어다."},

  {term:"sellout",pos:"n.",domain:"힙합",cat:"음악 제작",reg:2,
   ko:"변절자 (돈 때문에 신념을 판 사람)",en:"someone who abandons their principles for money or fame",
   ex:"Fans called him a sellout the week the ad aired.",
   exKo:"광고가 나간 그 주에 팬들은 그를 변절자라고 불렀다.",blank:"sellout",
   note:"강한 비난이라 사람에게 직접 쓰면 싸움이 난다. 동사는 sell out."},

  /* ── 씬·문화 ── */
  {term:"GOAT",pos:"n.",domain:"힙합",cat:"씬·문화",reg:2,
   ko:"역대 최고",en:"Greatest Of All Time",
   ex:"Every list has a different GOAT and that is the fun of it.",
   exKo:"목록마다 역대 최고가 다른데, 그게 재미다.",blank:"GOAT",
   note:"대문자로 쓰면 약자, 소문자 goat는 염소다. 스포츠에서 더 자주 쓴다."},

  {term:"street cred",pos:"n.",domain:"힙합",cat:"씬·문화",reg:2,
   ko:"바닥에서 인정받는 신뢰",en:"credibility earned from real experience, not marketing",
   ex:"You cannot buy street cred with a marketing budget.",
   exKo:"마케팅 예산으로 바닥의 신뢰를 살 수는 없다.",blank:"street cred",
   note:"credibility의 줄임. 업계·기술 분야에서도 비유로 쓴다."},

  {term:"shout-out",pos:"n.",domain:"힙합",cat:"씬·문화",reg:1,
   ko:"공개적인 감사 인사, 언급",en:"a public mention or acknowledgment of someone",
   ex:"Big shout-out to everyone who showed up in the rain.",
   exKo:"비 오는데 와 준 모두에게 정말 고맙다는 말 전한다.",blank:"shout-out",
   note:"give a shout-out to ~ 형태로 쓴다. 발표·방송에서도 무난하게 통한다."},

  {term:"cosign",pos:"v.",domain:"힙합",cat:"씬·문화",reg:2,
   ko:"보증하다, 밀어주다",en:"to publicly endorse someone, lending them your reputation",
   ex:"One cosign from her and the room took him seriously.",
   exKo:"그가 한 번 밀어 주자 사람들이 그를 진지하게 보기 시작했다.",blank:"cosign",
   note:"원래는 '연대 보증하다'라는 금융 용어. 힙합에서는 선배의 인정을 뜻한다."},

  {term:"crew",pos:"n.",domain:"힙합",cat:"씬·문화",reg:1,
   ko:"크루, 같이 다니는 무리",en:"a group of people who work or hang out together",
   ex:"He brought his whole crew to the studio.",
   exKo:"그는 크루 전원을 스튜디오에 데려왔다.",blank:"crew",
   note:"배·비행기의 '승무원'이라는 기본 뜻도 있어 어디서나 안전하다."},

  {term:"beef",pos:"n.",domain:"힙합",cat:"갈등",reg:2,
   ko:"불화, 다툼",en:"an ongoing conflict between people",
   ex:"The beef started over a misquoted interview.",
   exKo:"그 불화는 잘못 인용된 인터뷰에서 시작됐다.",blank:"beef",
   note:"have beef with someone 형태로 쓴다. 격식 자리에서는 conflict·dispute를 쓸 것."},

  {term:"diss",pos:"v./n.",domain:"힙합",cat:"갈등",reg:2,
   ko:"디스하다, 깎아내리다",en:"to insult or disrespect, especially in a song",
   ex:"He never named anyone, but everyone knew who he was dissing.",
   exKo:"그는 아무도 지목하지 않았지만 누구를 디스하는지 다들 알았다.",blank:"dissing",
   note:"disrespect의 줄임말. 한국어 '디스'가 여기서 왔다. diss track = 저격곡."},

  {term:"clap back",pos:"v.",domain:"힙합",cat:"갈등",reg:2,
   ko:"받아치다, 되받아 응수하다",en:"to respond sharply to criticism or an insult",
   ex:"She clapped back with a single line and closed the whole thing.",
   exKo:"그는 한 줄로 되받아치고 그 일을 끝내 버렸다.",blank:"clapped back",
   note:"SNS 문화에서 매우 흔하다. 명사는 clapback."},

  {term:"throw shade",pos:"v.",domain:"힙합",cat:"갈등",reg:2,
   ko:"은근히 깎아내리다",en:"to insult someone subtly or indirectly",
   ex:"That post was throwing shade without naming a single person.",
   exKo:"그 게시물은 아무도 지목하지 않으면서 은근히 깎아내리고 있었다.",blank:"throwing shade",
   note:"명사는 shade(He threw shade). 대놓고 하는 diss와 달리 '돌려까기'에 가깝다."},

  {term:"props",pos:"n.",domain:"힙합",cat:"씬·문화",reg:2,
   ko:"인정, 칭찬",en:"due respect or credit",
   ex:"Props to whoever mixed this — it sounds enormous.",
   exKo:"이거 믹스한 사람 인정. 소리가 어마어마하다.",blank:"Props",
   note:"proper respect의 줄임. give someone props(누구를 인정해 주다) 형태로 쓴다."},

  /* ── 자랑·성공 ── */
  {term:"flex",pos:"v./n.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"과시하다; 자랑거리",en:"to show off, especially wealth or success",
   ex:"Buying the cheap seats and bragging about it is a weird flex.",
   exKo:"싼 자리 사 놓고 자랑하는 건 좀 이상한 자랑이다.",blank:"flex",
   note:"weird flex but ok는 '뜬금없는 자랑이네'라는 유명한 밈 표현이다."},

  {term:"drip",pos:"n.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"때깔 나는 옷차림, 스웨그",en:"a stylish, expensive-looking outfit",
   ex:"The drip was immaculate and he knew it.",
   exKo:"차림새가 완벽했고 본인도 그걸 알고 있었다.",blank:"drip",
   note:"칭찬으로 쓴다. 형용사형은 drippy가 아니라 dripped out(빼입은)."},

  {term:"grind",pos:"n./v.",domain:"힙합",cat:"자랑·성공",reg:1,
   ko:"묵묵히 갈아 넣는 노력",en:"relentless hard work over a long period",
   ex:"Nobody sees the grind, they only see the launch.",
   exKo:"아무도 그 갈아 넣은 시간은 못 보고 결과만 본다.",blank:"grind",
   note:"the daily grind(고된 일상)로 일반 대화에서도 쓴다. 링크드인식 자기계발 어휘이기도 하다."},

  {term:"hustle",pos:"n./v.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"악착같이 벌다; 수완",en:"to work energetically to make money; such effort",
   ex:"He had three hustles going before the album paid anything.",
   exKo:"앨범이 돈이 되기 전까지 그는 벌이를 세 개나 굴리고 있었다.",blank:"hustles",
   note:"side hustle(부업)은 격식 자리에서도 통한다. 다만 '사기 치다'라는 뜻도 있으니 맥락 주의."},

  {term:"come up",pos:"n./v.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"성공가도, 치고 올라오기",en:"a rise in status or fortune",
   ex:"That deal was a serious come up for the whole label.",
   exKo:"그 계약은 레이블 전체에 제대로 된 도약이었다.",blank:"come up",
   note:"동사로는 come up in the world(출세하다). 명사로 쓸 때는 캐주얼한 표현이다."},

  {term:"stack",pos:"v.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"돈을 모으다",en:"to save up money",
   ex:"He stacked for two years before quitting the day job.",
   exKo:"그는 2년간 돈을 모으고 나서 본업을 그만뒀다.",blank:"stacked",
   note:"명사 stacks는 '뭉칫돈'. 원뜻이 '쌓다'라 일상에서도 널리 쓴다."},

  {term:"keep it real",pos:"phr.",domain:"힙합",cat:"씬·문화",reg:2,
   ko:"진솔하게 굴다, 가식 떨지 않다",en:"to stay honest and true to yourself",
   ex:"Whatever else you think of him, he keeps it real.",
   exKo:"그를 어떻게 보든 간에, 그는 가식은 없다.",blank:"keeps it real",
   note:"힙합 가치관의 핵심 문구. 헤어질 때 인사로도 쓴다(Keep it real.)"},

  {term:"legend",pos:"n.",domain:"힙합",cat:"씬·문화",reg:1,
   ko:"전설적인 인물",en:"someone hugely respected for their long achievement",
   ex:"He is a legend and he did not have to say a word.",
   exKo:"그는 전설이고, 한마디도 할 필요가 없었다.",blank:"legend",
   note:"You're a legend.은 영국·호주에서 '너 최고다'라는 가벼운 칭찬으로도 쓴다."},

  {term:"mainstream",pos:"adj./n.",domain:"힙합",cat:"씬·문화",reg:1,
   ko:"주류의",en:"belonging to the dominant, commercially popular culture",
   ex:"The sound was underground for years before it went mainstream.",
   exKo:"그 사운드는 주류가 되기까지 몇 년간 언더그라운드에 있었다.",blank:"mainstream",
   note:"go mainstream(주류가 되다). 뉴스·학술 글에서도 그대로 쓴다."},

  {term:"hype",pos:"n./v.",domain:"힙합",cat:"씬·문화",reg:1,
   ko:"과열된 기대, 띄우기",en:"intense promotion or excitement, sometimes excessive",
   ex:"The hype was louder than the actual record.",
   exKo:"실제 음반보다 그 기대감이 더 요란했다.",blank:"hype",
   note:"hype someone up은 '기를 살려 주다'라는 좋은 뜻이다. 마케팅 용어로도 쓴다."},

  {term:"shots fired",pos:"phr.",domain:"힙합",cat:"갈등",reg:2,
   ko:"저격 들어갔다",en:"someone has just made a pointed attack",
   ex:"He named the label in the second verse — shots fired.",
   exKo:"두 번째 벌스에서 레이블 이름을 댔다. 저격 들어간 거다.",blank:"shots fired",
   note:"제3자가 상황을 중계하듯 말할 때 쓴다. 당사자에게 직접 대고 쓰는 말은 아니다."},

  {term:"subliminal",pos:"n.",domain:"힙합",cat:"갈등",reg:2,
   ko:"이름 없이 하는 저격",en:"an indirect insult aimed at an unnamed target",
   ex:"The whole track is subliminals and everyone is guessing.",
   exKo:"그 곡 전체가 이름 없는 저격이라 다들 누군지 추측 중이다.",blank:"subliminals",
   note:"원래 뜻은 '잠재의식의'. 힙합에서는 '돌려까기 가사'를 뜻하는 명사로 쓴다."},

  {term:"call out",pos:"v.",domain:"힙합",cat:"갈등",reg:1,
   ko:"공개적으로 지적하다",en:"to publicly criticize someone for something",
   ex:"She called out the promoter for not paying the openers.",
   exKo:"그는 오프닝 팀에 돈을 안 준 프로모터를 공개적으로 지적했다.",blank:"called out",
   note:"명사 callout. 뉴스·직장에서도 쓰는 일반 표현이라 안전하다."},

  {term:"squash",pos:"v.",domain:"힙합",cat:"갈등",reg:2,
   ko:"갈등을 없던 일로 하다",en:"to end a conflict and make peace",
   ex:"They squashed the beef backstage after ten years.",
   exKo:"둘은 10년 만에 무대 뒤에서 앙금을 풀었다.",blank:"squashed",
   note:"squash the beef가 굳어진 짝이다. 원뜻은 '짓눌러 뭉개다'."},

  {term:"drag",pos:"v.",domain:"힙합",cat:"갈등",reg:2,
   ko:"신랄하게 까다",en:"to criticize someone harshly and publicly",
   ex:"The comments dragged him for a solid week.",
   exKo:"댓글이 일주일 내내 그를 신랄하게 깠다.",blank:"dragged",
   note:"SNS에서 매우 흔하다. get dragged(까이다) 수동형으로도 자주 쓴다."},

  {term:"receipts",pos:"n.",domain:"힙합",cat:"갈등",reg:2,
   ko:"증거 (스크린샷 등)",en:"evidence proving a claim, especially screenshots",
   ex:"He denied it until she posted the receipts.",
   exKo:"그가 계속 부인하다가 상대가 증거를 올리자 끝났다.",blank:"receipts",
   note:"'영수증'이 원뜻. show/post the receipts 형태로 쓴다."},

  {term:"blow up",pos:"v.",domain:"힙합",cat:"자랑·성공",reg:1,
   ko:"확 뜨다, 대박 나다",en:"to become suddenly very popular",
   ex:"The song blew up after it was used in a movie trailer.",
   exKo:"그 곡은 영화 예고편에 쓰이고 나서 확 떴다.",blank:"blew up",
   note:"'폭발하다'라는 원뜻도 있어 맥락으로 구분된다. 일상에서 널리 쓴다."},

  {term:"bag",pos:"n.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"목돈, 한몫",en:"a large amount of money; a lucrative opportunity",
   ex:"He turned one viral clip into a serious bag.",
   exKo:"그는 바이럴 영상 하나를 제대로 된 목돈으로 바꿨다.",blank:"bag",
   note:"secure the bag(돈을 확실히 챙기다)이 굳어진 표현이다."},

  {term:"lane",pos:"n.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"자기 영역, 자기 스타일",en:"one's own niche or area of strength",
   ex:"He found his lane and stopped chasing trends.",
   exKo:"그는 자기 영역을 찾고 유행 좇기를 그만뒀다.",blank:"lane",
   note:"stay in your lane은 '남 일에 참견 말라'는 뜻이라 상대에게 쓰면 무례하다."},

  {term:"run it up",pos:"v.",domain:"힙합",cat:"자랑·성공",reg:2,
   ko:"불려 나가다, 계속 벌다",en:"to keep increasing one's money or score",
   ex:"They sold out one room and just kept running it up.",
   exKo:"작은 공연장 하나 매진시키더니 계속 규모를 불려 나갔다.",blank:"running it up",
   note:"돈·점수 모두에 쓴다. 게임 중계에서도 자주 들린다."},

  /* ═══════════ 스트리트 (일상 구어) ═══════════ */

  /* ── 감정·반응 ── */
  {term:"lowkey",pos:"adv.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"솔직히 좀, 은근히",en:"somewhat, secretly (admitting something mildly)",
   ex:"I lowkey want to skip the party.",
   exKo:"솔직히 그 파티 좀 빠지고 싶어.",blank:"lowkey",
   note:"반대는 highkey(대놓고). 조심스럽게 속마음을 꺼낼 때 쓴다. 이메일·발표에는 부적합."},

  {term:"no cap",pos:"phr.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"진짜로, 거짓말 안 보태고",en:"no exaggeration; I'm telling the truth",
   ex:"That was the best meal I've had all year, no cap.",
   exKo:"올해 먹은 것 중 최고였어, 진짜로.",blank:"no cap",
   note:"cap이 '거짓말'이라 no cap은 '뻥 아님'. 상대에게 That's cap.이라 하면 '거짓말이지'가 된다."},

  {term:"sus",pos:"adj.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"수상한, 미심쩍은",en:"suspicious",
   ex:"He changed the subject twice, which felt sus.",
   exKo:"두 번이나 화제를 돌리는 게 좀 수상했어.",blank:"sus",
   note:"suspicious의 줄임. 게임 Among Us로 크게 퍼졌다."},

  {term:"salty",pos:"adj.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"삐진, 분한",en:"bitter or upset, especially over losing",
   ex:"He's still salty about the group project.",
   exKo:"걔 아직도 그 조별과제 때문에 삐져 있어.",blank:"salty",
   note:"주로 사소한 일로 토라진 상태를 놀리듯 말할 때 쓴다."},

  {term:"pressed",pos:"adj.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"안달난, 과하게 신경 쓰는",en:"overly bothered or desperate about something",
   ex:"Why are you so pressed about someone else's playlist?",
   exKo:"남의 플레이리스트에 왜 그렇게 안달이야?",blank:"pressed",
   note:"상대를 놀리는 말이라 친한 사이에서만 쓴다."},

  {term:"corny",pos:"adj.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"오글거리는, 촌스러운",en:"clichéd and unconvincing, often in a cringeworthy way",
   ex:"The speech was sweet but a little corny.",
   exKo:"연설은 따뜻했지만 좀 오글거렸어.",blank:"corny",
   note:"cheesy와 거의 같은 뜻. 사람에게 쓰면 은근한 모욕이 된다."},

  {term:"extra",pos:"adj.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"과한, 오버하는",en:"excessive or over-the-top",
   ex:"Renting a limo for a study group is a little extra.",
   exKo:"스터디 하는데 리무진 빌리는 건 좀 오버지.",blank:"extra",
   note:"형용사로 쓰는 게 포인트다(You're being extra). 명사 extra(여분)와 다르다."},

  {term:"mid",pos:"adj.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"그저 그런, 별로인",en:"mediocre; disappointingly average",
   ex:"Everyone hyped that show but honestly it was mid.",
   exKo:"다들 그 드라마 띄웠는데 솔직히 별로였어.",blank:"mid",
   note:"최근에 퍼진 말이라 세대 차가 크다. 남의 작품에 대고 쓰면 실례가 된다."},

  {term:"sheesh",pos:"interj.",domain:"스트리트",cat:"감정·반응",reg:2,
   ko:"우와, 헐",en:"an exclamation of amazement or exasperation",
   ex:"Sheesh, you finished the whole thing in one night?",
   exKo:"헐, 그걸 하룻밤에 다 끝냈다고?",blank:"Sheesh",
   note:"감탄과 어이없음 양쪽에 쓴다. 억양으로 뜻이 갈린다."},

  {term:"buggin'",pos:"v.",domain:"스트리트",cat:"감정·반응",reg:3,
   ko:"정신 나간 소리 하다, 흥분하다",en:"acting irrationally or overreacting",
   ex:"You're buggin' if you think that's a fair price.",
   exKo:"그게 적정가라고 생각하면 너 제정신 아니야.",blank:"buggin'",
   note:"뉴욕 흑인 커뮤니티에서 나온 표현이다. 뜻은 알아 두되 비원어민이 쓰면 어색하게 들린다."},

  /* ── 사람·관계 ── */
  {term:"homie",pos:"n.",domain:"스트리트",cat:"사람·관계",reg:3,
   ko:"친구, 동네 친구",en:"a close friend from one's neighborhood",
   ex:"He's been my homie since middle school.",
   exKo:"걘 중학교 때부터 내 친구야.",blank:"homie",
   note:"흑인·라티노 커뮤니티에서 나온 말이라 외부인이 쓰면 흉내 내는 느낌을 준다. friend·buddy를 쓸 것."},

  {term:"fam",pos:"n.",domain:"스트리트",cat:"사람·관계",reg:3,
   ko:"친한 사이, 형제 같은 사람",en:"a person treated like family; close friends collectively",
   ex:"Thanks for covering my shift, fam.",
   exKo:"내 근무 대신해 줘서 고마워, 형제.",blank:"fam",
   note:"family의 줄임. 위와 같은 이유로 이해만 해 두는 편이 안전하다."},

  {term:"OG",pos:"n./adj.",domain:"스트리트",cat:"사람·관계",reg:2,
   ko:"원조, 고참",en:"Original Gangster — the original or a respected veteran",
   ex:"She's an OG in this scene; she was booking shows in 2009.",
   exKo:"그는 이 씬의 원조야. 2009년부터 공연을 잡았거든.",blank:"OG",
   note:"지금은 '원조·초창기 멤버'라는 뜻으로 널리 쓴다(the OG recipe). 원래 뜻은 갱단 용어였다."},

  {term:"squad",pos:"n.",domain:"스트리트",cat:"사람·관계",reg:1,
   ko:"무리, 친구들",en:"a close group of friends",
   ex:"The whole squad showed up an hour early.",
   exKo:"애들 전부 한 시간 일찍 왔어.",blank:"squad",
   note:"군대·스포츠의 '분대·팀'이라는 기본 뜻이 있어 어디서나 무난하다."},

  {term:"real one",pos:"n.",domain:"스트리트",cat:"사람·관계",reg:2,
   ko:"진국인 사람",en:"a genuinely loyal, trustworthy person",
   ex:"You drove two hours to help me move — you're a real one.",
   exKo:"이사 도우려고 두 시간을 운전해 오다니, 너 진짜 진국이다.",blank:"real one",
   note:"큰 칭찬이다. 비슷하게 solid(믿을 만한)도 쓴다(He's solid)."},

  {term:"plug",pos:"n.",domain:"스트리트",cat:"사람·관계",reg:3,
   ko:"물건 구해 주는 사람, 연줄",en:"a connection who can get you something hard to obtain",
   ex:"She's the plug for concert tickets in this city.",
   exKo:"이 도시에서 콘서트 티켓은 그가 다 구해 줘.",blank:"plug",
   note:"원래 마약 공급책을 뜻하던 말이라 맥락에 따라 오해를 산다. 되도록 connection을 쓸 것."},

  {term:"clout",pos:"n.",domain:"스트리트",cat:"사람·관계",reg:2,
   ko:"영향력, 인지도",en:"influence or fame, especially online",
   ex:"He only posted it for clout.",
   exKo:"걘 그냥 관심 끌려고 올린 거야.",blank:"clout",
   note:"clout-chasing(관심 구걸)은 부정적인 말. 원래 clout는 정치적 영향력이라는 중립적 단어다."},

  {term:"ghost",pos:"v.",domain:"스트리트",cat:"사람·관계",reg:1,
   ko:"잠수 타다, 연락을 끊다",en:"to cut off contact suddenly and without explanation",
   ex:"We talked every day for a month and then he ghosted me.",
   exKo:"한 달 동안 매일 얘기하다가 걔가 갑자기 잠수 탔어.",blank:"ghosted",
   note:"연애·구직 양쪽에 쓴다. 회사가 지원자에게 그러는 것도 ghosting이라고 한다."},

  {term:"flake",pos:"v./n.",domain:"스트리트",cat:"사람·관계",reg:1,
   ko:"약속을 어기다; 그런 사람",en:"to break a plan at the last minute; someone who does this",
   ex:"He flaked on us twice this month.",
   exKo:"걔 이번 달에만 두 번 약속 펑크 냈어.",blank:"flaked",
   note:"flaky(믿을 수 없는)라는 형용사도 흔하다. 일상 대화에서 널리 쓰는 표준 구어다."},

  {term:"bruh",pos:"interj.",domain:"스트리트",cat:"사람·관계",reg:3,
   ko:"야, 이봐 (어이없을 때)",en:"a call for attention or an expression of disbelief",
   ex:"Bruh, you booked the wrong weekend.",
   exKo:"야, 너 주말 잘못 예약했잖아.",blank:"Bruh",
   note:"brother의 변형. 억양 하나로 친근함과 짜증이 갈려서 외국인이 조절하기 어렵다."},

  /* ── 상황·평가 ── */
  {term:"vibe",pos:"n./v.",domain:"스트리트",cat:"상황·평가",reg:1,
   ko:"분위기, 느낌; 잘 통하다",en:"the mood of a place or person; to get along well",
   ex:"The cafe has a really calm vibe in the morning.",
   exKo:"그 카페는 아침에 분위기가 참 차분해.",blank:"vibe",
   note:"vibe with someone(누구와 잘 맞다)으로도 쓴다. 이제 거의 표준어라 어디서나 통한다."},

  {term:"lit",pos:"adj.",domain:"스트리트",cat:"상황·평가",reg:2,
   ko:"신나는, 분위기 좋은",en:"exciting and full of energy",
   ex:"The show was absolutely lit.",
   exKo:"그 공연 진짜 신났어.",blank:"lit",
   note:"2010년대 중반에 크게 유행해서 지금은 살짝 옛말 느낌이 있다."},

  {term:"chill",pos:"adj./v.",domain:"스트리트",cat:"상황·평가",reg:1,
   ko:"느긋한; 느긋하게 쉬다",en:"relaxed; to relax",
   ex:"We're just going to chill at home tonight.",
   exKo:"오늘 밤엔 그냥 집에서 쉬려고.",blank:"chill",
   note:"He's chill.(성격이 무던하다)로도 쓴다. Chill out.(진정해)은 상대에 따라 무례하게 들릴 수 있다."},

  {term:"my bad",pos:"phr.",domain:"스트리트",cat:"상황·평가",reg:2,
   ko:"내 잘못이야, 미안",en:"my mistake (a casual apology)",
   ex:"My bad, I sent it to the wrong thread.",
   exKo:"미안, 엉뚱한 스레드에 보냈네.",blank:"My bad",
   note:"가벼운 실수에만 쓴다. 진짜 사과해야 할 자리에서는 I'm sorry를 쓸 것."},

  {term:"broke",pos:"adj.",domain:"스트리트",cat:"상황·평가",reg:1,
   ko:"돈이 없는",en:"having no money",
   ex:"I'm broke until Friday.",
   exKo:"금요일까지는 돈이 없어.",blank:"broke",
   note:"일시적으로 궁한 상태다. poor(가난한)와 달리 가볍게 농담처럼 쓴다."},

  {term:"bussin'",pos:"adj.",domain:"스트리트",cat:"상황·평가",reg:3,
   ko:"(음식이) 진짜 맛있는",en:"extremely delicious",
   ex:"That fried chicken was bussin'.",
   exKo:"그 후라이드 진짜 맛있었어.",blank:"bussin'",
   note:"흑인 영어에서 나와 SNS로 퍼졌다. 비원어민이 쓰면 유행어 흉내처럼 들리기 쉽다."},

  {term:"slaps",pos:"v.",domain:"스트리트",cat:"상황·평가",reg:2,
   ko:"(곡·음식이) 훌륭하다",en:"(of a song or food) to be excellent",
   ex:"This playlist slaps from start to finish.",
   exKo:"이 플레이리스트 처음부터 끝까지 좋다.",blank:"slaps",
   note:"주어가 사물이어야 한다. 사람에게 쓰면 '때린다'가 된다."},

  {term:"wild",pos:"adj.",domain:"스트리트",cat:"상황·평가",reg:1,
   ko:"어이없는, 대단한",en:"astonishing, hard to believe",
   ex:"It's wild that nobody noticed for three years.",
   exKo:"3년 동안 아무도 몰랐다는 게 어이없다.",blank:"wild",
   note:"That's wild.는 놀람에 두루 쓰는 안전한 반응이다."},

  {term:"clutch",pos:"adj.",domain:"스트리트",cat:"상황·평가",reg:1,
   ko:"결정적인 순간에 해내는",en:"performing excellently under pressure",
   ex:"Bringing an extra charger was clutch.",
   exKo:"충전기 하나 더 챙겨 온 거 진짜 신의 한 수였어.",blank:"clutch",
   note:"스포츠에서 왔다(a clutch player). 직장에서도 무난하게 쓸 수 있다."},

  {term:"solid",pos:"adj.",domain:"스트리트",cat:"상황·평가",reg:1,
   ko:"믿을 만한, 괜찮은",en:"dependable and of good quality",
   ex:"He's solid — if he says he'll be there, he will.",
   exKo:"걘 믿을 만해. 온다고 하면 오는 사람이야.",blank:"solid",
   note:"do someone a solid는 '부탁 하나 들어주다'라는 뜻의 관용구다."},

  /* ── 약속·행동 ── */
  {term:"hit me up",pos:"phr.",domain:"스트리트",cat:"약속·행동",reg:2,
   ko:"연락해",en:"contact me (by message or call)",
   ex:"Hit me up when you land and I'll come get you.",
   exKo:"도착하면 연락해, 데리러 갈게.",blank:"Hit me up",
   note:"hit up someone 형태로도 쓴다. 친구 사이 전용이며 업무 메일에는 쓰지 않는다."},

  {term:"pull up",pos:"v.",domain:"스트리트",cat:"약속·행동",reg:2,
   ko:"찾아오다, 들르다",en:"to show up somewhere",
   ex:"Pull up around eight, we'll still be here.",
   exKo:"8시쯤 와, 우리 아직 있을 거야.",blank:"Pull up",
   note:"원래 '차를 세우다'에서 왔다. 지금은 걸어와도 pull up이라고 한다."},

  {term:"link up",pos:"v.",domain:"스트리트",cat:"약속·행동",reg:1,
   ko:"만나다, 합류하다",en:"to meet up with someone",
   ex:"Let's link up after your class.",
   exKo:"수업 끝나고 만나자.",blank:"link up",
   note:"meet up과 거의 같지만 조금 더 캐주얼하다. 업무에서도 무난히 통한다."},

  {term:"bet",pos:"interj.",domain:"스트리트",cat:"약속·행동",reg:2,
   ko:"콜, 알겠어",en:"okay; agreed; you're on",
   ex:"— Meet at six? — Bet.",
   exKo:"— 6시에 볼까? — 콜.",blank:"Bet",
   note:"동의·수락의 짧은 대답. 상사에게 쓰면 성의 없어 보이니 주의."},

  {term:"say less",pos:"phr.",domain:"스트리트",cat:"약속·행동",reg:2,
   ko:"더 말 안 해도 돼, 알겠어",en:"I understand — no further explanation needed",
   ex:"— There's free food. — Say less.",
   exKo:"— 공짜 밥 있어. — 더 말 안 해도 돼.",blank:"Say less",
   note:"흔쾌히 동의할 때 쓴다. 상대 말을 자르는 뜻이 아니다."},

  {term:"facts",pos:"interj.",domain:"스트리트",cat:"약속·행동",reg:2,
   ko:"인정, 맞말",en:"I completely agree; that's true",
   ex:"— Mornings are better for focus. — Facts.",
   exKo:"— 집중은 아침이 낫지. — 인정.",blank:"Facts",
   note:"동의의 한마디. 복수형 그대로 쓴다(Fact.이 아니다)."},

  {term:"bounce",pos:"v.",domain:"스트리트",cat:"약속·행동",reg:2,
   ko:"자리를 뜨다",en:"to leave",
   ex:"It's getting late, I'm gonna bounce.",
   exKo:"늦었네, 나 갈게.",blank:"bounce",
   note:"비슷한 말로 dip, head out이 있다. head out이 가장 무난하다."},

  {term:"crash",pos:"v.",domain:"스트리트",cat:"약속·행동",reg:1,
   ko:"신세 지고 자다; 곯아떨어지다",en:"to sleep somewhere temporarily; to fall asleep from exhaustion",
   ex:"Can I crash on your couch tonight?",
   exKo:"오늘 밤 너희 소파에서 자도 될까?",blank:"crash",
   note:"crash a party는 '초대 없이 들이닥치다'라는 다른 뜻이니 구분할 것."},

  {term:"finna",pos:"v.",domain:"스트리트",cat:"약속·행동",reg:3,
   ko:"~하려는 참이다",en:"about to (going to)",
   ex:"I'm finna head out in five minutes.",
   exKo:"나 5분 뒤에 나가려고.",blank:"finna",
   note:"fixing to의 축약으로 흑인 영어(AAVE)의 문법 요소다. 뜻은 알되 직접 쓰지 않는 편이 좋다."},

  {term:"tryna",pos:"v.",domain:"스트리트",cat:"약속·행동",reg:3,
   ko:"~하려고 하다",en:"trying to",
   ex:"You tryna grab food after?",
   exKo:"끝나고 밥 먹을래?",blank:"tryna",
   note:"trying to의 축약. 듣기에서 자주 나오니 알아듣는 것이 중요하다. 글로는 쓰지 않는다."},

  /* ── 말투·어법 ──
     가사·드라마를 알아듣는 데 꼭 필요한 축약과 방언 문법.
     '틀린 영어'가 아니라 다른 말투이며, 등급 3은 알아듣기용이다. ── */
  {term:"gonna",pos:"v.",domain:"스트리트",cat:"말투·어법",reg:2,
   ko:"~할 것이다 (going to)",en:"going to",
   ex:"I'm gonna call you back in ten.",
   exKo:"10분 뒤에 다시 전화할게.",blank:"gonna",
   note:"말할 때는 원어민 대부분이 이렇게 발음한다. 다만 격식 있는 글에는 going to로 쓴다."},

  {term:"wanna",pos:"v.",domain:"스트리트",cat:"말투·어법",reg:2,
   ko:"~하고 싶다 (want to)",en:"want to",
   ex:"Do you wanna split a cab?",
   exKo:"택시 같이 탈래?",blank:"wanna",
   note:"want to의 축약. wanna는 조동사 뒤에는 못 쓴다(I will wanna ~ 는 어색)."},

  {term:"gotta",pos:"v.",domain:"스트리트",cat:"말투·어법",reg:2,
   ko:"~해야 한다 (have got to)",en:"have got to; must",
   ex:"I gotta be at the airport by six.",
   exKo:"6시까지 공항 가야 해.",blank:"gotta",
   note:"have to보다 급한 느낌. 글에서는 have to로 쓰는 것이 안전하다."},

  {term:"kinda",pos:"adv.",domain:"스트리트",cat:"말투·어법",reg:2,
   ko:"좀, 약간 (kind of)",en:"kind of; somewhat",
   ex:"It's kinda cold for June.",
   exKo:"6월치고 좀 춥다.",blank:"kinda",
   note:"sorta(sort of)도 같은 방식이다. 말을 부드럽게 눌러 주는 완충 표현."},

  {term:"'em",pos:"pron.",domain:"스트리트",cat:"말투·어법",reg:2,
   ko:"그들을, 그것들을 (them)",en:"them",
   ex:"Just tell 'em we're running late.",
   exKo:"우리 좀 늦는다고 걔네한테 말해 줘.",blank:"'em",
   note:"them의 h 없는 축약형. 듣기에서 놓치기 쉬우니 귀에 익혀 둘 것."},

  {term:"y'all",pos:"pron.",domain:"스트리트",cat:"말투·어법",reg:2,
   ko:"너희들 (you all)",en:"you all (plural you)",
   ex:"Are y'all coming to the thing on Saturday?",
   exKo:"너희 토요일 그거 올 거야?",blank:"y'all",
   note:"미국 남부에서 시작됐지만 지금은 전국에서 쓴다. 영어에 없는 '복수형 you'를 채워 주는 유용한 말이다."},

  {term:"-in' (g 탈락)",pos:"어법",domain:"스트리트",cat:"말투·어법",reg:2,
   ko:"-ing 의 g 를 흘리는 발음",en:"dropping the final g of -ing in casual speech",
   ex:"We were just talkin' about you.",
   exKo:"방금 네 얘기 하고 있었어.",blank:"talkin'",
   note:"거의 모든 원어민이 편한 자리에서 이렇게 발음한다. 표기할 때만 아포스트로피를 쓴다."},

  {term:"ain't",pos:"v.",domain:"스트리트",cat:"말투·어법",reg:3,
   ko:"~이 아니다, ~하지 않았다",en:"am not / is not / are not / has not / have not",
   ex:"That ain't what I said.",
   exKo:"내가 한 말은 그게 아니야.",blank:"ain't",
   note:"be동사·have의 부정을 한 단어로 처리하는 비표준형. 가사·영화에 늘 나오지만 시험·업무에서는 감점 요인이다."},

  {term:"이중 부정",pos:"어법",domain:"스트리트",cat:"말투·어법",reg:3,
   ko:"부정을 두 번 써서 부정을 강조",en:"using two negatives to strengthen, not cancel, the negation",
   ex:"I don't know nothing about that.",
   exKo:"난 그거 아무것도 몰라.",blank:"don't know nothing",
   note:"표준 문법에서는 긍정이 되지만 이 말투에서는 부정 강조다. 알아듣되 직접 쓰지는 말 것."},

  {term:"habitual be",pos:"어법",domain:"스트리트",cat:"말투·어법",reg:3,
   ko:"습관을 나타내는 be",en:"uninflected 'be' marking a habitual, recurring action",
   ex:"He be working late on Thursdays.",
   exKo:"걔는 목요일마다 늦게까지 일해.",blank:"be working",
   note:"'지금 일하는 중'이 아니라 '늘 그런다'는 뜻으로, 표준 영어에 없는 시제 구분이다. 흑인 영어(AAVE)의 고유 문법이라 흉내 내지 않는 것이 예의다."},

];
