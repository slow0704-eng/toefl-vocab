/* ============================================================
   OPIc 보강 ① — 설문 주제 중 비어 있던 7개 유닛
   ------------------------------------------------------------
   UNIT 01 학교 / 02 수업 / 03 직장 / 04 업무 /
   UNIT 10 스포츠 관람 / 14 SNS에 글 올리기 / 19 농구·야구·축구

   유닛마다 세 문항을 같은 순서로 짰다. OPIc 이 실제로 한 주제에서
   세 문항을 연달아 내는 방식(콤보)과 같다.
     ① 묘사·설명   — 눈에 보이는 것을 순서대로
     ② 경험        — 과거시제를 끝까지 유지하며 한 장면
     ③ 비교·변화 또는 문제점·의견 — 등급을 가르는 문항

   topic 이름은 opic.js 의 유닛 키워드와 유형 규칙에 맞춰 지었다.
   예: "학교 - 우리 학교 묘사" → UNIT 01 학교 × 유형 03(장소 묘사)

   answerEn 은 IH–AL 기준으로 filler·연결어·구체적 숫자를 섞어
   실제 발화처럼 썼다. 외워서 읊는 톤이 되지 않게 문장 길이를
   일부러 들쭉날쭉하게 두었다.
   ============================================================ */
window.SPEAKING_TOPICS_OPIC = (window.SPEAKING_TOPICS_OPIC||[]).concat([

/* ═══════════════════ UNIT 01 학교 ═══════════════════ */

{exam:"OPIc", category:"학생", topic:"학교 - 우리 학교 묘사", targetLevel:"IH–AL",
 question:"You indicated in the survey that you are a student. Tell me about your school. What does the campus look like, and what buildings are there?",
 answerEn:"Sure, so my campus sits on a hill, which honestly is the first thing anyone mentions about it. You come up from the subway station and there's this long slope before you even reach the main gate, so everyone arrives slightly out of breath. I've stopped noticing it, but visitors always complain.\n\nOnce you're through the gate, there's a wide open square with a fountain that only runs in summer. The library is straight ahead — it's the newest building, all glass, six floors, and it's open until midnight during exam periods. To the left there are three older buildings made of red brick where most of the lectures happen. They're from the seventies, I think, and the elevators are painfully slow, so people just take the stairs.\n\nBehind all of that there's a sports field and a student union building with a cafeteria on the ground floor. That's where I spend most of my time between classes, to be honest — not because the food is great, but because it's warm and you always run into someone you know.\n\nSo it's not a huge campus. You can walk from one end to the other in about ten minutes. But it feels compact rather than cramped, if that makes sense.",
 answerKo:"네, 저희 캠퍼스는 언덕 위에 있는데, 솔직히 누구든 저희 학교에 대해 제일 먼저 언급하는 게 그거예요. 지하철역에서 올라오면 정문에 닿기도 전에 긴 비탈길이 있어서 다들 약간 숨이 찬 상태로 도착하죠. 저는 이제 신경도 안 쓰는데, 방문객들은 늘 불평해요.\n\n정문을 지나면 넓은 광장이 있고 여름에만 가동되는 분수가 있어요. 정면에는 도서관이 있는데, 가장 새 건물이고 전면이 유리에 6층이며 시험 기간에는 자정까지 열어요. 왼쪽에는 붉은 벽돌로 지은 오래된 건물 세 동이 있고 대부분의 강의가 거기서 열립니다. 70년대 건물인 것 같은데 엘리베이터가 답답할 만큼 느려서 다들 그냥 계단으로 다녀요.\n\n그 뒤쪽에는 운동장과 학생회관이 있고 1층에 학생식당이 있어요. 솔직히 수업 사이에 시간을 제일 많이 보내는 곳이 거기예요. 음식이 훌륭해서가 아니라 따뜻하고 아는 사람을 꼭 마주치기 때문이죠.\n\n그래서 아주 큰 캠퍼스는 아니에요. 끝에서 끝까지 10분이면 걸어갈 수 있어요. 그래도 답답하다기보다는 아담한 느낌이에요, 무슨 말인지 아신다면요.",
 keyExpressions:[
   {en:"sits on a hill", ko:"언덕 위에 자리 잡고 있다"},
   {en:"slightly out of breath", ko:"약간 숨이 찬"},
   {en:"painfully slow", ko:"답답할 만큼 느린"},
   {en:"run into someone you know", ko:"아는 사람과 마주치다"},
   {en:"compact rather than cramped", ko:"답답하다기보다는 아담한"}],
 tips:"장소 묘사는 '입구에서 들어가며 보이는 순서'로 시선을 옮기면 문장이 저절로 이어집니다. 정면 → 왼쪽 → 뒤쪽처럼요. 마지막에 크기나 분위기를 한 줄로 요약하면 깔끔하게 닫힙니다."},

{exam:"OPIc", category:"학생", topic:"학교 - 학교에서 있었던 기억에 남는 경험", targetLevel:"IH–AL",
 question:"Tell me about a memorable experience you had at your school. When did it happen, who were you with, and why do you still remember it?",
 answerEn:"Okay, this happened in my second year, during the campus festival in May. My department had a booth, and somehow I ended up being the one running it, which I did not volunteer for.\n\nThe plan was simple. We were selling handmade lemonade, and we'd bought about two hundred lemons the night before. What we hadn't checked was the weather. It rained from eleven in the morning straight through to four in the afternoon — not drizzle, proper rain. Nobody wanted a cold drink. By two o'clock we had sold maybe fifteen cups and we were sitting under this sagging tent watching water pool on the plastic sheet above our heads.\n\nAnd then my friend Jiwon just said, out of nowhere, \"Let's make hot lemon tea instead.\" We had a portable burner for boiling water anyway. So we changed the sign with a marker, and within about twenty minutes there was a line. People were soaked and cold and they wanted something hot. We sold out by six.\n\nI still remember it because of that switch, honestly. It was a small thing, but it was the first time I saw a plan fail and get fixed in real time, and it worked because someone said something out loud instead of just sitting there.",
 answerKo:"네, 이건 2학년 때 5월 캠퍼스 축제 기간에 있었던 일이에요. 저희 과에서 부스를 운영했는데 어쩌다 보니 제가 그걸 맡게 됐어요. 자원한 것도 아닌데 말이죠.\n\n계획은 단순했어요. 수제 레모네이드를 팔기로 했고 전날 밤에 레몬을 200개쯤 사 뒀어요. 확인하지 않은 건 날씨였죠. 오전 11시부터 오후 4시까지 계속 비가 왔어요. 이슬비도 아니고 제대로 된 비였어요. 아무도 찬 음료를 원하지 않았죠. 2시쯤엔 열다섯 잔쯤 팔았고, 축 처진 천막 아래 앉아서 머리 위 비닐에 물이 고이는 걸 보고 있었어요.\n\n그때 친구 지원이가 갑자기 그러더라고요. \"그냥 따뜻한 레몬차를 만들자.\" 어차피 물 끓일 휴대용 버너가 있었거든요. 그래서 매직으로 간판을 고쳐 썼는데 20분쯤 지나니 줄이 생겼어요. 사람들이 다 젖고 추워서 뜨거운 걸 원했던 거죠. 6시엔 다 팔았어요.\n\n솔직히 그 전환 때문에 아직도 기억나요. 작은 일이었지만 계획이 실패하고 실시간으로 고쳐지는 걸 처음 본 순간이었고, 누군가 가만히 앉아 있는 대신 소리 내어 말했기 때문에 된 일이었으니까요.",
 keyExpressions:[
   {en:"I did not volunteer for", ko:"자원한 게 아니다"},
   {en:"not drizzle, proper rain", ko:"이슬비가 아니라 제대로 된 비"},
   {en:"out of nowhere", ko:"난데없이, 갑자기"},
   {en:"sold out by six", ko:"6시엔 다 팔렸다"},
   {en:"in real time", ko:"실시간으로"}],
 tips:"경험 문항은 '그래서 왜 기억에 남는가'를 마지막 한 문단으로 따로 떼어 말해야 완성됩니다. 사건만 나열하고 끝내면 IM 수준에서 멈춥니다."},

{exam:"OPIc", category:"학생", topic:"학교 - 예전 학교와 지금 학교 비교", targetLevel:"IH–AL",
 question:"How is your current school different from the school you attended before? Compare the two and talk about which one suited you better.",
 answerEn:"They do have some things in common — same city, both public, both with more students than the buildings can really hold. But almost everything else is different.\n\nThe biggest difference is how much of your time is decided for you. In high school, my day was fixed from eight in the morning until six or seven in the evening. Same room, same classmates, same order every day. At university I might have two classes on Monday and none at all on Wednesday, and I choose which building I'm in. That sounds obviously better, and mostly it is, but it took me a whole semester to stop wasting the free time completely.\n\nAnother difference is the relationship with teachers. In high school my homeroom teacher knew everything about me, including things I'd rather she didn't. Now a professor might not learn my name unless I go to office hours, which means nobody notices if I disappear. That cuts both ways.\n\nIf I had to pick, I'd say university suits me better, but not because it's easier — it isn't. It's because the responsibility is mine now. In high school I did well because the structure pushed me. Here, whatever I get, I actually earned it, and that feels different.",
 answerKo:"공통점도 있긴 해요. 같은 도시고, 둘 다 공립이고, 둘 다 건물이 감당할 수 있는 것보다 학생이 많아요. 하지만 그 외에는 거의 모든 게 달라요.\n\n가장 큰 차이는 하루 중 얼마만큼이 남에 의해 정해지느냐예요. 고등학교 때는 아침 8시부터 저녁 6~7시까지 일과가 고정돼 있었어요. 같은 교실, 같은 반 친구들, 매일 같은 순서였죠. 대학에서는 월요일에 수업이 두 개고 수요일엔 하나도 없을 수도 있고, 어느 건물에 있을지도 제가 정해요. 딱 들어도 더 좋아 보이고 대체로 그렇긴 한데, 그 자유 시간을 완전히 낭비하지 않게 되기까지 한 학기가 통째로 걸렸어요.\n\n또 다른 차이는 선생님과의 관계예요. 고등학교 담임 선생님은 제가 알리고 싶지 않은 것까지 포함해 저에 대해 다 아셨어요. 지금은 제가 면담 시간에 찾아가지 않으면 교수님이 제 이름을 모르실 수도 있고, 그건 제가 사라져도 아무도 눈치채지 못한다는 뜻이죠. 양날의 검이에요.\n\n굳이 고르라면 대학이 저한테 더 맞아요. 더 쉬워서는 아니고요, 안 쉬워요. 이제 책임이 제 것이기 때문이에요. 고등학교 때는 구조가 저를 밀어 줘서 잘한 거였어요. 여기서는 뭘 얻든 제가 실제로 벌어들인 거고, 그게 느낌이 달라요.",
 keyExpressions:[
   {en:"decided for you", ko:"남이 대신 정해 주는"},
   {en:"it took me a whole semester to ~", ko:"~하는 데 한 학기가 통째로 걸렸다"},
   {en:"office hours", ko:"(교수) 면담 시간"},
   {en:"that cuts both ways", ko:"그건 양면이 있다, 양날의 검이다"},
   {en:"I actually earned it", ko:"내가 실제로 얻어낸 것이다"}],
 tips:"비교 문항의 뼈대는 '공통점 한 줄 → 차이 두세 개 → 내 선택과 이유'입니다. 마지막에 '더 쉬워서가 아니라 ~ 때문'처럼 예상되는 이유를 한 번 부정해 주면 답변이 훨씬 성숙하게 들립니다."},

/* ═══════════════════ UNIT 02 수업 ═══════════════════ */

{exam:"OPIc", category:"학생", topic:"수업 - 좋아하는 수업과 수업 방식 설명", targetLevel:"IH–AL",
 question:"Tell me about your favorite class. What is the class about, how is it usually run, and why do you like it?",
 answerEn:"My favorite class is a seminar on urban history. It meets once a week for three hours, which sounds brutal but honestly the time goes quickly.\n\nThe way it works is a bit different from my other classes. There's no lecture, or almost none. We read maybe forty pages before each session, and then two students present — not a summary, but an argument about what the reading got wrong or left out. After that the professor just opens it up, and the rest of the session is discussion. She'll interrupt occasionally to give context, but she mostly lets us go.\n\nWhat I like about it is that you can't hide. In a big lecture I can sit near the back and half-listen, and I do, if I'm being honest. In this class there are eleven of us around one table, so if you haven't read, everyone knows within about ten minutes.\n\nThe other thing is that it changed how I look at my own city. We spent three weeks on how subway lines get planned, and now I genuinely cannot walk past a construction site without wondering who decided it should be there. That's probably the best thing a class can do to you.",
 answerKo:"제가 제일 좋아하는 수업은 도시사 세미나예요. 주 1회 세 시간짜리인데, 말만 들으면 끔찍하지만 솔직히 시간이 금방 가요.\n\n진행 방식이 다른 수업과 좀 달라요. 강의가 없거나 거의 없어요. 매 수업 전에 40쪽쯤 읽어 오고, 학생 두 명이 발표를 해요. 요약이 아니라 그 글이 무엇을 틀렸고 무엇을 빠뜨렸는지에 대한 주장으로요. 그다음에 교수님이 그냥 판을 열어 주시고 나머지 시간은 토론이에요. 가끔 끼어들어 배경 설명을 해 주시지만 대체로 저희가 하게 두세요.\n\n제가 좋아하는 점은 숨을 수가 없다는 거예요. 대형 강의에서는 뒤쪽에 앉아 반쯤만 들을 수 있고, 솔직히 저도 그래요. 이 수업은 한 테이블에 열한 명이 둘러앉아 있어서 안 읽어 오면 10분 안에 다 알아요.\n\n또 하나는 이 수업이 제 도시를 보는 방식을 바꿔 놨다는 거예요. 지하철 노선이 어떻게 기획되는지를 3주간 다뤘는데, 이제는 공사장을 지나칠 때마다 누가 저기에 저걸 두기로 했을까 궁금해하지 않을 수가 없어요. 수업이 사람한테 해 줄 수 있는 최고의 일이 아마 그거일 거예요.",
 keyExpressions:[
   {en:"which sounds brutal", ko:"말만 들으면 끔찍하지만"},
   {en:"opens it up", ko:"(토론을) 열어 주다"},
   {en:"you can't hide", ko:"숨을 수가 없다"},
   {en:"half-listen", ko:"반쯤만 듣다"},
   {en:"cannot walk past ~ without -ing", ko:"~을 지나칠 때마다 …하게 된다"}],
 tips:"수업 설명은 '무엇을 배우는지'보다 '어떻게 진행되는지'를 구체적으로 말할 때 점수가 올라갑니다. 읽기 분량, 인원수, 시간처럼 숫자를 하나씩 끼워 넣으세요."},

{exam:"OPIc", category:"학생", topic:"수업 - 수업 중 힘들었던 경험", targetLevel:"IH–AL",
 question:"Tell me about a time when a class was difficult for you. What was the problem, and how did you handle it?",
 answerEn:"So there was a statistics course in my third semester that nearly broke me, and I'll admit the problem was partly my own doing.\n\nIt was a required course, and I went in assuming it would be like high school math — memorize the procedure, apply it, done. It wasn't. By week four we were on probability distributions and I realized I didn't actually understand what the numbers meant. I could get the right answer on a practice problem and still not be able to explain it, which is a very uncomfortable feeling.\n\nI made it worse for about a month by not saying anything. I kept telling myself I'd catch up on the weekend, and then the weekend would go by. The midterm came back at fifty-two percent.\n\nWhat finally worked was embarrassingly simple. I went to office hours — my first time all semester — and instead of asking about a specific problem, I just told the professor I didn't understand the concept underneath any of it. She spent forty minutes drawing on a whiteboard for me, and about halfway through, something clicked. After that I went every single week. I ended up with a B, which given where I was at midterm, I'm honestly proud of.\n\nThe lesson, I guess, is that I waited a month too long to admit I was lost.",
 answerKo:"3학기 때 통계 수업이 하나 있었는데 저를 거의 무너뜨렸어요. 그리고 그 문제가 어느 정도는 제 탓이었다는 걸 인정할게요.\n\n필수 과목이었고, 저는 고등학교 수학 같겠지 하고 들어갔어요. 절차를 외우고 적용하면 끝이라고요. 아니었어요. 4주 차에 확률분포로 들어갔는데 그때 숫자가 무슨 뜻인지 제가 사실은 이해하지 못하고 있다는 걸 깨달았어요. 연습 문제에서 정답은 낼 수 있는데 설명은 못 하는 상태였고, 그건 정말 불편한 기분이에요.\n\n한 달 정도는 아무 말도 안 하면서 상황을 더 악화시켰어요. 주말에 따라잡으면 되겠지 하고 계속 미뤘고, 주말은 그냥 지나갔어요. 중간고사가 52점으로 돌아왔어요.\n\n결국 통한 방법은 민망할 정도로 단순했어요. 교수님 면담 시간에 찾아갔어요. 그 학기 통틀어 처음이었죠. 그리고 특정 문제를 묻는 대신, 그 밑에 깔린 개념 자체를 이해 못 하고 있다고 그냥 말씀드렸어요. 교수님이 40분 동안 화이트보드에 그림을 그려 주셨고, 절반쯤 지났을 때 뭔가 딸깍 하고 맞아떨어졌어요. 그 뒤로는 매주 갔어요. 결국 B를 받았는데, 중간고사 성적을 생각하면 솔직히 뿌듯해요.\n\n교훈이라면, 길을 잃었다고 인정하기까지 한 달을 너무 오래 끌었다는 거겠죠.",
 keyExpressions:[
   {en:"nearly broke me", ko:"나를 거의 무너뜨렸다"},
   {en:"partly my own doing", ko:"어느 정도는 내 탓인"},
   {en:"something clicked", ko:"뭔가 딱 이해가 됐다"},
   {en:"catch up on the weekend", ko:"주말에 따라잡다"},
   {en:"admit I was lost", ko:"내가 헤매고 있다고 인정하다"}],
 tips:"문제 해결형 경험은 '문제 → 잘못된 대응 → 진짜 해결 → 교훈' 네 단계로 가세요. 중간에 실패한 시도를 하나 넣으면 이야기가 훨씬 사실적으로 들립니다."},

{exam:"OPIc", category:"학생", topic:"수업 - 온라인 수업과 대면 수업 비교", targetLevel:"IH–AL",
 question:"These days many classes are held online. Compare online classes with in-person classes and tell me which you prefer and why.",
 answerEn:"Honestly, both have something the other doesn't, so it depends on what the class is trying to do.\n\nOnline is better for pure information. If the professor is going to talk for ninety minutes and show slides, I'd rather watch it at home where I can pause, rewind the part I missed, and speed it up when it's obvious. I also get back the commute, which for me is about eighty minutes a day. That's not nothing.\n\nIn person is better for everything else. In a discussion class, online is genuinely painful — people talk over each other because of the lag, and nobody can read the room. The small stuff disappears too. You can't lean over and ask the person next to you what the professor just said. I didn't realize how much I relied on that until it was gone.\n\nThere's also a self-discipline problem I should admit. Online, I'd have the lecture playing while I answered messages, and at the end I'd have absorbed maybe half of it.\n\nSo if I have to pick, in person — but only because most of my classes involve discussion. For a big lecture course, I'd choose online without hesitating.",
 answerKo:"솔직히 둘 다 상대방에게 없는 게 하나씩 있어서, 그 수업이 뭘 하려는 수업인지에 따라 달라요.\n\n온라인은 순수한 정보 전달에는 더 나아요. 교수님이 90분간 말씀하시고 슬라이드를 보여 주는 수업이라면, 저는 집에서 보는 쪽이 좋아요. 멈출 수 있고, 놓친 부분을 되감을 수 있고, 뻔한 부분은 배속으로 넘길 수 있으니까요. 통학 시간도 되찾는데 저한테는 하루 80분쯤 돼요. 적은 시간이 아니죠.\n\n그 외의 모든 것에는 대면이 나아요. 토론 수업에서 온라인은 정말 괴로워요. 지연 때문에 말이 겹치고 아무도 분위기를 못 읽어요. 사소한 것들도 사라져요. 옆 사람한테 몸을 기울여 교수님이 방금 뭐라고 하셨는지 물어볼 수가 없죠. 그게 없어지고 나서야 제가 그걸 얼마나 의지했는지 알았어요.\n\n인정해야 할 자기 관리 문제도 있어요. 온라인이면 강의를 틀어 놓고 메시지에 답하다가, 끝나면 절반쯤만 흡수한 상태가 되곤 했어요.\n\n그래서 굳이 고르라면 대면이요. 다만 제 수업 대부분이 토론을 포함하기 때문이에요. 대형 강의 과목이라면 망설임 없이 온라인을 고를 거예요.",
 keyExpressions:[
   {en:"that's not nothing", ko:"그건 적은 게 아니다"},
   {en:"talk over each other", ko:"서로 말이 겹치다"},
   {en:"read the room", ko:"분위기를 읽다"},
   {en:"absorb half of it", ko:"절반쯤만 흡수하다"},
   {en:"without hesitating", ko:"망설임 없이"}],
 tips:"비교 문항에서 '무조건 A가 낫다'고 하면 근거가 얕아집니다. '수업 유형에 따라 다르다'처럼 조건을 걸고 각각의 경우를 나누면 훨씬 높은 등급으로 들립니다."},

/* ═══════════════════ UNIT 03 직장 ═══════════════════ */

{exam:"OPIc", category:"직장인", topic:"직장 - 우리 회사와 사무실 묘사", targetLevel:"IH–AL",
 question:"You indicated that you work. Tell me about your company and describe your office. What does it look like, and where do you sit?",
 answerEn:"I work for a mid-sized company that makes scheduling software for clinics. There are around ninety of us, and we're all in one building near the river — three floors, nothing fancy from the outside.\n\nOur floor is open plan, which I have complicated feelings about. When you come out of the elevator, there's a small reception area with two sofas that nobody ever sits on, and then the whole floor opens up. Desks are in clusters of six, one cluster per team. Mine is by the window on the east side, so I get direct sun until about eleven and then it's fine for the rest of the day. In summer I lose that argument with the blinds every single morning.\n\nAlong the back wall there are four meeting rooms with glass fronts, named after rivers for some reason. Two of them are barely big enough for four people, which means the good one is always booked.\n\nThe part I actually like is the kitchen. It's bigger than it needs to be, with a long table where people eat lunch together instead of at their desks. That was deliberate, apparently — someone in management insisted on it — and honestly it works. That's where I've learned most of what I know about what other teams are doing.",
 answerKo:"저는 병원용 예약 관리 소프트웨어를 만드는 중견 회사에 다녀요. 90명 정도 있고 전부 강가 근처 한 건물에 있어요. 3층짜리고 밖에서 보면 특별할 건 없어요.\n\n저희 층은 개방형 사무실인데, 그 점에 대해서는 감정이 복잡해요. 엘리베이터에서 나오면 아무도 앉지 않는 소파 두 개가 놓인 작은 리셉션 공간이 있고, 그다음엔 층 전체가 탁 트여 있어요. 책상은 여섯 개씩 묶여 있고 팀당 한 묶음이에요. 제 자리는 동쪽 창가라 11시쯤까지 햇빛이 직접 들어오고 그 뒤로는 괜찮아요. 여름엔 매일 아침 블라인드와 벌이는 그 싸움에서 제가 져요.\n\n뒷벽을 따라 유리로 된 회의실이 네 개 있는데 무슨 이유에선지 강 이름이 붙어 있어요. 그중 두 개는 네 명이 겨우 들어갈 정도라서, 괜찮은 방은 늘 예약이 차 있죠.\n\n제가 정말 좋아하는 곳은 주방이에요. 필요 이상으로 크고 긴 테이블이 있어서 사람들이 자기 자리 대신 거기서 같이 점심을 먹어요. 알고 보니 그건 의도된 거였대요. 경영진 중 누군가가 고집했다고 하더라고요. 솔직히 효과가 있어요. 다른 팀이 뭘 하는지에 대해 제가 아는 것 대부분을 거기서 배웠거든요.",
 keyExpressions:[
   {en:"open plan", ko:"칸막이 없는 개방형 사무실"},
   {en:"nothing fancy", ko:"특별할 것 없는"},
   {en:"in clusters of six", ko:"여섯 개씩 묶여서"},
   {en:"barely big enough for", ko:"~에게 겨우 맞을 만큼만 큰"},
   {en:"that was deliberate", ko:"그건 의도된 것이었다"}],
 tips:"사무실 묘사는 '엘리베이터에서 내린 순간'부터 시작하면 동선이 자연스럽게 잡힙니다. 마지막에 가장 좋아하는 공간 하나를 골라 이유까지 붙이면 단순 나열에서 벗어납니다."},

{exam:"OPIc", category:"직장인", topic:"직장 - 회사에서 겪은 기억에 남는 일", targetLevel:"IH–AL",
 question:"Tell me about something memorable that happened at your workplace. What happened, and why does it stand out?",
 answerEn:"The thing that stands out most happened during my second month, which is probably why it stuck.\n\nWe had a client demo scheduled for a Thursday morning — a hospital group, fairly big deal for us. I wasn't presenting; I was just there to handle questions about one small feature. About twenty minutes before it started, our lead developer found a bug that made the calendar view show the wrong week for anyone in a different time zone. And the client's headquarters was in a different time zone.\n\nSo there was this moment where four of us were standing around a laptop deciding whether to postpone. And our manager, Sunhee, said something I still think about. She said, \"We're not going to hide it. We'll show them the bug and tell them when it'll be fixed.\"\n\nAnd that's what we did. She opened the demo by explaining the problem before anyone could find it. The client's IT director actually laughed and said it was the first honest demo he'd been to that year. We got the contract.\n\nIt sticks with me because I would have postponed. I was two months in and my instinct was to hide the flaw. Watching it go the other way, and work, changed how I handle bad news at work.",
 answerKo:"가장 기억에 남는 일은 입사 두 달째에 있었어요. 아마 그래서 더 각인됐을 거예요.\n\n목요일 오전에 고객사 시연이 잡혀 있었어요. 병원 그룹이었고 저희한테는 꽤 큰 건이었죠. 저는 발표자가 아니라 작은 기능 하나에 대한 질문에 답하려고 들어가 있었어요. 시작 20분쯤 전에 저희 리드 개발자가 버그를 발견했어요. 시간대가 다른 사용자에게는 캘린더 화면이 엉뚱한 주를 보여 주는 버그였죠. 그런데 그 고객사 본사가 다른 시간대에 있었어요.\n\n그래서 네 사람이 노트북 앞에 둘러서서 시연을 미룰지 말지 정하는 순간이 있었어요. 그때 저희 팀장 선희 님이 하신 말을 아직도 생각해요. \"숨기지 않겠습니다. 버그를 보여 드리고 언제 고쳐질지 말씀드리죠.\"\n\n그리고 정말 그렇게 했어요. 팀장님이 아무도 찾아내기 전에 문제를 먼저 설명하면서 시연을 시작하셨어요. 고객사 IT 총괄이 웃으면서 그해 참석한 시연 중 처음으로 정직한 시연이라고 했어요. 계약은 저희가 따냈습니다.\n\n이게 기억에 남는 이유는 저였다면 미뤘을 거라서예요. 두 달 차였고 제 본능은 결함을 감추는 쪽이었어요. 정반대로 가는 걸 보고, 그게 통하는 걸 본 게 회사에서 나쁜 소식을 다루는 제 방식을 바꿨어요.",
 keyExpressions:[
   {en:"fairly big deal for us", ko:"우리에게는 꽤 큰 건"},
   {en:"twenty minutes before it started", ko:"시작 20분 전에"},
   {en:"go the other way", ko:"정반대로 가다"},
   {en:"it sticks with me", ko:"그 일이 계속 마음에 남는다"},
   {en:"handle bad news", ko:"나쁜 소식을 다루다"}],
 tips:"직장 경험은 대사 한 줄을 그대로 인용하면 장면이 살아납니다. She said, \"…\" 형태로 한 번만 쓰세요. 두 번 이상 쓰면 오히려 산만해집니다."},

{exam:"OPIc", category:"직장인", topic:"직장 - 직장 문화의 변화와 문제점", targetLevel:"IH–AL",
 question:"How has the workplace culture in your country changed in recent years? Talk about the changes and any problems that remain.",
 answerEn:"This has actually become a pretty big topic here, and I'd say the change is real but uneven.\n\nThe clearest change is around hours. Ten or fifteen years ago, leaving before your manager was basically not done, and drinking together after work was treated as part of the job. That has genuinely faded. In my company, evening gatherings happen maybe twice a year now, and they end at nine. Younger colleagues simply decline, and nobody treats it as a scandal anymore.\n\nThe second change is flexibility. A lot of companies kept some remote work after the pandemic, and that has changed who can stay in a job — people with young children, especially.\n\nBut some things haven't moved. The hierarchy is still there; it just got quieter. You no longer get shouted at, but a senior person's suggestion is still not really a suggestion. And the flexibility isn't evenly distributed at all. Large companies offer it; smaller subcontractors often don't, and those are the people who need it most.\n\nSo personally, I think the visible parts of the culture changed faster than the underlying part. The dinners disappeared, and that's a real improvement. Whether people feel able to disagree with their boss — I don't think that's changed nearly as much.",
 answerKo:"이건 사실 여기서 꽤 큰 화두가 됐는데, 변화는 실제로 있지만 고르지 않다고 말하고 싶어요.\n\n가장 분명한 변화는 근무 시간이에요. 10~15년 전만 해도 상사보다 먼저 퇴근하는 건 사실상 있을 수 없는 일이었고, 퇴근 후 회식은 업무의 일부처럼 여겨졌어요. 그건 정말로 옅어졌어요. 저희 회사는 저녁 모임이 이제 1년에 두 번쯤 있고 9시면 끝나요. 어린 동료들은 그냥 거절하고, 아무도 그걸 큰일로 여기지 않아요.\n\n두 번째 변화는 유연성이에요. 팬데믹 이후 많은 회사가 재택근무를 일부 유지했고, 그게 누가 일을 계속할 수 있는지를 바꿔 놨어요. 특히 어린 자녀가 있는 사람들이요.\n\n하지만 안 움직인 것도 있어요. 위계는 여전히 있고 조용해졌을 뿐이에요. 이제 고함을 듣지는 않지만 윗사람의 '제안'은 여전히 진짜 제안이 아니에요. 그리고 그 유연성이 전혀 고르게 분배되지 않았어요. 대기업은 제공하지만 작은 협력업체는 대체로 그렇지 않고, 정작 그게 가장 필요한 사람들이 그쪽에 있어요.\n\n그래서 개인적으로는 문화의 눈에 보이는 부분이 밑바닥 부분보다 빨리 바뀌었다고 생각해요. 회식이 사라진 건 진짜 개선이에요. 사람들이 상사에게 반대할 수 있다고 느끼는지는, 그만큼 바뀌었다고 보지 않아요.",
 keyExpressions:[
   {en:"real but uneven", ko:"실제이긴 하지만 고르지 않은"},
   {en:"basically not done", ko:"사실상 있을 수 없는 일인"},
   {en:"has genuinely faded", ko:"정말로 옅어졌다"},
   {en:"not evenly distributed", ko:"고르게 분배되지 않은"},
   {en:"the underlying part", ko:"밑바닥에 있는 부분"}],
 tips:"사회 이슈 문항은 '변한 것 두 개 + 안 변한 것 한 개' 구조가 가장 안정적입니다. 마지막에 '겉은 빨리 바뀌었지만 속은 아니다'처럼 층을 나눠 정리하면 AL 답변이 됩니다."},

/* ═══════════════════ UNIT 04 업무 ═══════════════════ */

{exam:"OPIc", category:"직장인", topic:"업무 - 내가 맡은 일과 하루 업무 방식 설명", targetLevel:"IH–AL",
 question:"Tell me about the work you do. What are your main responsibilities, and what does a typical workday look like?",
 answerEn:"I work in customer support, but not the kind where you're on the phone all day. My job is the layer above that — when a ticket can't be solved by the front-line team, it comes to me.\n\nSo a typical day starts around nine with the queue. I look at whatever came in overnight and sort it into three piles, basically: things I can answer in ten minutes, things that need a developer, and things that aren't actually bugs but are the customer misunderstanding how a feature works. That third pile is the biggest, which tells you something about our documentation.\n\nMornings are usually the ten-minute ones, because I want the queue short before the daily stand-up at eleven. In that meeting I flag anything that's likely to become a pattern — if three clinics report the same thing in a week, that's not three tickets, that's one bug.\n\nAfternoons are slower and more useful. That's when I write up the recurring issues and hand them to the product team, and once a week I update the help articles.\n\nThe part I like most is honestly the third pile. Every time I rewrite a confusing help page, the same question stops arriving. It's the only part of the job where the work reduces future work.",
 answerKo:"저는 고객 지원 업무를 하는데, 하루 종일 전화를 받는 종류는 아니에요. 제 일은 그 윗단계예요. 1차 응대팀이 해결하지 못한 문의가 저한테 넘어오죠.\n\n그래서 보통 하루는 9시쯤 대기열을 보는 것으로 시작해요. 밤사이 들어온 걸 보고 크게 세 무더기로 나눠요. 10분 안에 답할 수 있는 것, 개발자가 필요한 것, 그리고 사실 버그가 아니라 고객이 기능을 오해한 것. 세 번째 무더기가 제일 큰데, 그게 저희 설명 문서에 대해 뭔가를 말해 주죠.\n\n오전에는 보통 10분짜리들을 처리해요. 11시 데일리 스탠드업 전에 대기열을 짧게 만들어 두고 싶거든요. 그 회의에서 패턴이 될 것 같은 건을 짚어요. 한 주에 세 병원이 같은 걸 신고하면 그건 문의 세 건이 아니라 버그 한 건이니까요.\n\n오후는 더 느리고 더 유용해요. 반복되는 문제를 정리해서 제품팀에 넘기고, 주 1회 도움말 문서를 갱신하는 시간이에요.\n\n제가 제일 좋아하는 부분은 솔직히 세 번째 무더기예요. 헷갈리는 도움말 페이지를 다시 쓸 때마다 같은 질문이 더 이상 안 들어와요. 일이 미래의 일을 줄여 주는 유일한 부분이에요.",
 keyExpressions:[
   {en:"front-line team", ko:"1차 응대 팀"},
   {en:"sort it into three piles", ko:"세 무더기로 나누다"},
   {en:"daily stand-up", ko:"매일 하는 짧은 팀 회의"},
   {en:"become a pattern", ko:"패턴으로 굳어지다"},
   {en:"the work reduces future work", ko:"그 일이 미래의 일을 줄여 준다"}],
 tips:"업무 설명은 직함이 아니라 '하루의 흐름'으로 말하세요. 오전-회의-오후로 시간을 쪼개면 문장이 저절로 이어지고, 마지막에 가장 좋아하는 업무와 그 이유를 붙이면 마무리가 생깁니다."},

{exam:"OPIc", category:"직장인", topic:"업무 - 업무에서 문제가 생겨 해결한 경험", targetLevel:"IH–AL",
 question:"Tell me about a time when something went wrong with your work. What was the problem, and how did you solve it?",
 answerEn:"Okay, so about a year ago we had a situation where the same complaint kept coming in and nobody could reproduce it.\n\nSeveral clinics reported that appointment reminders were going out at three in the morning. Obviously bad. But when our developers tested it, the reminders went out correctly every time. So for about two weeks it sat there as \"cannot reproduce,\" which in practice means nothing happens.\n\nWhat I did was probably obvious in hindsight, but it took me a while to get there. Instead of looking at the software, I looked at the clinics. I pulled the list of everyone who'd complained — eleven of them — and looked for what they had in common. It wasn't the version they were running, and it wasn't the size of the clinic. It was that all eleven had changed their opening hours in the previous month.\n\nOnce I had that, the developers found it in an afternoon. There was a bug where changing the schedule didn't update the time zone offset. It only broke if you edited existing hours rather than setting them fresh, which is exactly what our own testers never did.\n\nIn the end it was fixed within three days of my noticing the pattern. What I took from it is that when the software can't be reproduced, the answer is usually in what the users did, not in the code.",
 answerKo:"1년쯤 전에 같은 불만이 계속 들어오는데 아무도 재현하지 못하는 상황이 있었어요.\n\n여러 병원에서 예약 알림이 새벽 3시에 발송된다고 신고했어요. 당연히 심각한 문제죠. 그런데 저희 개발자들이 테스트하면 매번 정상적으로 발송됐어요. 그래서 2주쯤 '재현 불가' 상태로 방치돼 있었는데, 실무에서 그건 아무 일도 일어나지 않는다는 뜻이에요.\n\n제가 한 일은 지나고 보면 뻔한 건데 거기까지 가는 데 시간이 좀 걸렸어요. 소프트웨어를 보는 대신 병원들을 봤어요. 불만을 제기한 열한 곳의 목록을 뽑아서 공통점을 찾았어요. 사용 중인 버전도 아니었고 병원 규모도 아니었어요. 열한 곳 전부 지난달에 진료 시간을 변경했다는 점이었어요.\n\n그걸 알고 나니 개발자들이 오후 한나절 만에 원인을 찾았어요. 일정을 변경할 때 시간대 오프셋이 갱신되지 않는 버그가 있었어요. 새로 설정할 때가 아니라 기존 시간을 수정할 때만 깨졌는데, 그건 저희 테스터들이 한 번도 하지 않던 방식이었죠.\n\n결국 제가 패턴을 발견한 지 사흘 만에 수정됐어요. 제가 얻은 건, 소프트웨어가 재현되지 않을 때 답은 대개 코드가 아니라 사용자가 무엇을 했는지에 있다는 거예요.",
 keyExpressions:[
   {en:"cannot reproduce", ko:"재현이 안 된다 (버그 처리 용어)"},
   {en:"obvious in hindsight", ko:"지나고 보면 뻔한"},
   {en:"what they had in common", ko:"그들의 공통점"},
   {en:"setting them fresh", ko:"새로 설정하는 것"},
   {en:"what I took from it", ko:"내가 그 일에서 배운 것"}],
 tips:"문제 해결 경험에서 가장 점수가 되는 대목은 '어떻게 원인에 도달했는가'입니다. 결과보다 추론 과정을 한 문단 더 쓰세요."},

{exam:"OPIc", category:"직장인", topic:"업무 - 일하는 방식의 변화 비교", targetLevel:"IH–AL",
 question:"How has the way you do your work changed compared to when you started? Compare then and now.",
 answerEn:"Quite a lot, actually, and most of it isn't about tools.\n\nWhen I started, I answered everything in the order it arrived. Someone wrote in, I replied, next one. It felt productive because the number went down. But I was solving the same problem twenty times a month and never asking why it kept coming back.\n\nNow I work almost backwards from that. The first thing I do isn't answer — it's look for repeats. If something has come in more than three times, I stop answering individually and go write documentation or file a bug instead. That means my daily numbers look worse than they did in my first year, and it took me a while to be comfortable with that.\n\nThe tools changed too, obviously. We used to track everything in a shared spreadsheet, which was chaos, and now there's a proper ticketing system with tags. But honestly the spreadsheet wasn't the real problem.\n\nThe other difference is that I used to apologize constantly. Every reply started with \"I'm so sorry for the inconvenience.\" Now I tell people what happened and when it'll be fixed, and I've found that customers actually prefer that. They don't want sympathy; they want a date.",
 answerKo:"꽤 많이 바뀌었어요. 그리고 대부분은 도구에 관한 게 아니에요.\n\n처음에는 들어온 순서대로 다 답했어요. 누가 문의를 보내면 답하고, 다음 것으로 넘어가고요. 숫자가 줄어드니까 생산적으로 느껴졌어요. 그런데 저는 같은 문제를 한 달에 스무 번씩 해결하면서 왜 그게 계속 돌아오는지는 한 번도 묻지 않았던 거예요.\n\n지금은 거의 그 반대로 일해요. 제일 먼저 하는 게 답하는 게 아니라 반복을 찾는 거예요. 뭔가가 세 번 넘게 들어왔으면 개별 응대를 멈추고 대신 문서를 쓰거나 버그로 등록해요. 그러면 제 일일 처리 숫자는 첫해보다 나빠 보이는데, 그게 편해지기까지 시간이 좀 걸렸어요.\n\n도구도 당연히 바뀌었죠. 예전엔 공유 스프레드시트에 전부 기록했는데 그건 혼돈이었고, 지금은 태그가 있는 제대로 된 티켓 시스템이 있어요. 하지만 솔직히 스프레드시트가 진짜 문제는 아니었어요.\n\n또 하나 다른 점은 제가 예전엔 끊임없이 사과했다는 거예요. 모든 답장이 \"불편을 드려 대단히 죄송합니다\"로 시작했어요. 지금은 무슨 일이 있었고 언제 고쳐질지를 말해요. 그리고 고객들이 사실 그걸 더 좋아한다는 걸 알게 됐어요. 그분들은 동정이 아니라 날짜를 원하거든요.",
 keyExpressions:[
   {en:"in the order it arrived", ko:"들어온 순서대로"},
   {en:"work backwards from that", ko:"그와 정반대 방향으로 일하다"},
   {en:"file a bug", ko:"버그로 등록하다"},
   {en:"be comfortable with that", ko:"그 상태를 받아들이다"},
   {en:"they want a date", ko:"그들이 원하는 건 (해결) 날짜다"}],
 tips:"'예전 → 지금' 비교는 도구 변화만 말하면 얕게 들립니다. 일하는 판단 기준이 어떻게 바뀌었는지를 중심에 두고, 도구 얘기는 곁가지로 한 줄만 붙이세요."},

/* ═══════════════════ UNIT 10 스포츠 관람 ═══════════════════ */

{exam:"OPIc", category:"여가활동", topic:"스포츠 관람 - 경기를 보는 방식과 장소 묘사", targetLevel:"IH–AL",
 question:"You indicated that you like watching sports. What sport do you follow, and where and how do you usually watch games?",
 answerEn:"I follow baseball, mostly. I've supported the same team since I was about eleven, which at this point feels less like a choice and more like a condition.\n\nMost games I watch at home, on my laptop, because they're on weeknights and the stadium is an hour away. I've got a routine that's slightly embarrassing — I eat before it starts, because I don't want to be in the kitchen during an inning, and I keep my phone face down so I don't accidentally see a score before I get there.\n\nMaybe six or seven times a season I actually go. The stadium is on the west side of the city, right by the river, and it's an old one — steep stands, narrow seats, a roof that only covers about half of it. I always sit in the same area, down the third-base line, because that's where the organized cheering is. If you've never been to a game here, that part surprises people. There's a leader with a microphone on a platform, each player has their own chant, and the whole section stands for three hours.\n\nHonestly the baseball itself is maybe half of why I go. The other half is that it's three hours where nothing else is required of me.",
 answerKo:"저는 주로 야구를 봐요. 열한 살쯤부터 같은 팀을 응원해 왔는데, 이쯤 되면 선택이라기보다는 지병에 가까운 느낌이에요.\n\n대부분의 경기는 집에서 노트북으로 봐요. 평일 밤 경기가 많고 구장이 한 시간 거리라서요. 살짝 민망한 루틴이 있는데, 경기 시작 전에 밥을 먹어요. 이닝 중간에 주방에 있고 싶지 않거든요. 그리고 도착하기 전에 실수로 점수를 보게 될까 봐 휴대폰을 엎어 놔요.\n\n한 시즌에 예닐곱 번쯤은 실제로 가요. 구장은 도시 서쪽 강가에 있고 오래된 곳이에요. 관중석이 가파르고 좌석이 좁고 지붕은 절반쯤만 덮여 있어요. 저는 늘 같은 구역, 3루 라인 쪽에 앉아요. 조직적인 응원이 거기서 이뤄지거든요. 여기 야구장에 와 본 적이 없다면 그 부분이 놀라울 거예요. 단상 위에 마이크를 든 응원단장이 있고 선수마다 자기 응원가가 있고, 그 구역 전체가 세 시간을 서 있어요.\n\n솔직히 야구 자체는 제가 가는 이유의 절반쯤이에요. 나머지 절반은 세 시간 동안 저에게 아무것도 요구되지 않는다는 점이에요.",
 keyExpressions:[
   {en:"less like a choice and more like a condition", ko:"선택이라기보다 지병에 가까운"},
   {en:"phone face down", ko:"휴대폰을 엎어 놓은"},
   {en:"down the third-base line", ko:"3루 라인 쪽에"},
   {en:"organized cheering", ko:"조직적인 응원"},
   {en:"nothing else is required of me", ko:"나에게 아무것도 요구되지 않는다"}],
 tips:"관람 주제는 '집에서 볼 때'와 '경기장에 갈 때'를 나눠 말하면 분량이 자연스럽게 나옵니다. 응원 문화처럼 우리나라 특유의 요소를 하나 설명해 주면 채점자에게 인상이 남습니다."},

{exam:"OPIc", category:"여가활동", topic:"스포츠 관람 - 기억에 남는 경기 관람 경험", targetLevel:"IH–AL",
 question:"Tell me about the most memorable game you have ever watched. When was it, who were you with, and what made it special?",
 answerEn:"The one I always come back to was about six years ago, a playoff game in October. I went with my older brother, which matters, because we don't talk much otherwise.\n\nWe were losing by three going into the ninth inning, and honestly people were already leaving. My brother wanted to go too — he said we'd beat the traffic. I said give it ten minutes. That's the only reason we saw it.\n\nWhat happened was almost silly. Two walks, then a single, and suddenly the bases were loaded with one out. And the whole stadium, which had been dead quiet, just came back to life in about thirty seconds. Then our catcher, who had been terrible all season, hit it into the left-field seats. Grand slam. We won by one.\n\nI remember the noise more than the play. It didn't sound like cheering, it sounded like something breaking. And I remember my brother grabbing my shoulder and shaking it, which he has never done before or since.\n\nSo it's special partly because of the comeback, but mostly because of who I was standing next to. We still bring it up at family dinners, usually within about ten minutes of sitting down.",
 answerKo:"제가 늘 다시 꺼내는 경기는 6년쯤 전 10월 플레이오프 경기예요. 형이랑 같이 갔는데, 그게 중요해요. 평소엔 저희가 말을 별로 안 하거든요.\n\n9회에 들어갈 때 3점 차로 지고 있었고 솔직히 사람들이 이미 나가고 있었어요. 형도 가자고 했어요. 차 막히기 전에 나가자고요. 저는 10분만 더 보자고 했어요. 저희가 그 장면을 본 건 순전히 그 때문이에요.\n\n일어난 일은 거의 우스울 정도였어요. 볼넷 두 개, 그다음 안타 하나, 그리고 갑자기 1아웃 만루가 됐어요. 죽은 듯이 조용하던 구장 전체가 30초 만에 되살아났어요. 그러고는 시즌 내내 부진했던 저희 포수가 좌측 관중석으로 넘겨 버렸어요. 만루 홈런. 1점 차로 이겼어요.\n\n저는 그 플레이보다 소리를 더 기억해요. 환호처럼 들리지 않았고 뭔가가 부서지는 소리 같았어요. 그리고 형이 제 어깨를 붙잡고 흔들던 게 기억나요. 그 전에도 그 후에도 한 번도 없던 일이에요.\n\n그래서 그 경기가 특별한 건 역전 때문이기도 하지만, 대부분은 제가 누구 옆에 서 있었느냐 때문이에요. 저희는 아직도 가족 식사 때 그 얘기를 꺼내요. 보통 앉은 지 10분 안에요.",
 keyExpressions:[
   {en:"beat the traffic", ko:"차 막히기 전에 빠져나가다"},
   {en:"the bases were loaded", ko:"만루가 되다"},
   {en:"came back to life", ko:"되살아났다"},
   {en:"grand slam", ko:"만루 홈런"},
   {en:"bring it up", ko:"(그 얘기를) 꺼내다"}],
 tips:"경기 관람 경험은 결과보다 '소리·몸짓' 같은 감각 묘사를 하나 넣으면 확 살아납니다. 그리고 함께 간 사람과의 관계를 이유로 연결하면 마무리가 강해집니다."},

{exam:"OPIc", category:"여가활동", topic:"스포츠 관람 - 직접 관람과 중계 시청 비교", targetLevel:"IH–AL",
 question:"Compare watching a game at the stadium with watching it on television. What are the advantages of each, and which do you prefer?",
 answerEn:"They're almost different activities at this point, honestly.\n\nTelevision is better if you actually want to understand the game. You get replays from four angles, you get the pitch speed on screen, and a commentator tells you why a manager made a substitution. At the stadium you often genuinely don't know what just happened until you check your phone. It's also cheaper, obviously, and you can leave whenever you want.\n\nBut the stadium gives you something television physically can't, which is everyone else. On TV, a big moment is loud in your living room and then it's over. In the stadium, forty thousand people react at the same instant, and you feel it in the floor. There's also the part where you can see the whole field at once, so you notice things like an outfielder moving three steps before the pitch — nobody puts that on TV.\n\nIf I'm being practical, I watch about ninety percent on screen. But if you asked me which games I actually remember from the last five years, they're all ones I went to. So my honest answer is: television for following a season, the stadium for having a memory.",
 answerKo:"솔직히 이쯤 되면 거의 다른 활동이에요.\n\n경기를 제대로 이해하고 싶다면 중계가 나아요. 네 각도의 리플레이가 나오고 화면에 구속이 뜨고, 해설자가 감독이 왜 교체를 했는지 설명해 줘요. 경기장에서는 방금 무슨 일이 있었는지 휴대폰을 확인하기 전까지 진짜로 모르는 경우가 많아요. 당연히 더 싸기도 하고, 원할 때 그만둘 수도 있죠.\n\n하지만 경기장은 중계가 물리적으로 줄 수 없는 걸 줘요. 바로 다른 사람들이요. TV에서는 큰 순간이 거실에서 시끄럽고 그걸로 끝이에요. 경기장에서는 4만 명이 같은 순간에 반응하고, 그게 바닥으로 느껴져요. 또 경기장 전체를 한눈에 볼 수 있어서 외야수가 투구 전에 세 걸음 움직이는 것 같은 걸 알아채게 돼요. 그런 건 아무도 TV에 안 내보내죠.\n\n현실적으로 말하면 저는 90퍼센트쯤을 화면으로 봐요. 그런데 지난 5년간 실제로 기억나는 경기가 뭐냐고 물으신다면 전부 제가 직접 간 경기예요. 그래서 솔직한 답은 이래요. 시즌을 따라가는 데는 중계, 기억을 남기는 데는 경기장.",
 keyExpressions:[
   {en:"almost different activities", ko:"거의 다른 활동"},
   {en:"you feel it in the floor", ko:"바닥으로 느껴진다"},
   {en:"nobody puts that on TV", ko:"그런 건 TV에 안 나온다"},
   {en:"if I'm being practical", ko:"현실적으로 말하면"},
   {en:"for having a memory", ko:"기억을 남기기 위해서는"}],
 tips:"비교 문항 마무리로 'A는 ~을 위해, B는 ~을 위해'처럼 두 대상에 서로 다른 역할을 배정하면 우열을 가르는 것보다 훨씬 세련되게 들립니다."},

/* ═══════════════════ UNIT 14 SNS에 글 올리기 ═══════════════════ */

{exam:"OPIc", category:"여가활동", topic:"SNS에 글 올리기 - 이용 습관과 올리는 내용 설명", targetLevel:"IH–AL",
 question:"You indicated that you post on social media. Which platforms do you use, what do you usually post, and how often?",
 answerEn:"I use two, and I use them completely differently, which I think is pretty common now.\n\nThe first one is Instagram, and I post there maybe twice a month. Almost always photos — food I cooked, a walk somewhere, occasionally a concert. What I've noticed about myself is that I never post the day something happens. I'll take the photos, then leave them for a week, and by then half of them don't seem worth posting. So my feed is basically a slow, heavily filtered version of my life.\n\nThe second is a smaller group chat platform where I'm much more active — several times a day. That's where the actual talking happens, and nobody there is performing. It's twelve people I've known for years, and it's mostly complaints and links.\n\nAs for what I don't post: anything about work, anything about family arguments, and I've stopped posting travel photos while I'm still travelling. A friend had her apartment broken into a few years back, and although there's no proof it was related, it changed my habits.\n\nSo, short version — I browse a lot and post rarely, and I think that ratio has been shifting further in that direction every year.",
 answerKo:"두 개를 쓰는데, 완전히 다르게 써요. 요즘엔 꽤 흔한 일인 것 같아요.\n\n첫 번째는 인스타그램이고 한 달에 두 번쯤 올려요. 거의 항상 사진이에요. 제가 만든 음식, 어딘가 산책, 가끔 공연 같은 거요. 제 자신에 대해 알아챈 건 무슨 일이 있는 그날에는 절대 안 올린다는 거예요. 사진을 찍어 두고 일주일쯤 묵히면, 그때쯤엔 절반은 올릴 만해 보이지 않아요. 그래서 제 피드는 기본적으로 제 삶의 느리고 잔뜩 걸러진 버전이에요.\n\n두 번째는 더 작은 단톡 형태의 플랫폼인데 거기서는 훨씬 활발해요. 하루에 몇 번씩요. 진짜 대화는 거기서 이뤄지고 아무도 연기를 하지 않아요. 몇 년째 알고 지낸 열두 명이고, 대부분 불평과 링크예요.\n\n안 올리는 것으로 말하자면, 일 얘기, 가족과 다툰 얘기는 안 올리고, 여행 중에 여행 사진 올리는 것도 그만뒀어요. 몇 년 전에 친구 집에 도둑이 들었는데, 관련이 있다는 증거는 없지만 그 일이 제 습관을 바꿔 놨어요.\n\n그래서 요약하면, 많이 보고 드물게 올려요. 그리고 그 비율이 해마다 더 그쪽으로 기울고 있는 것 같아요.",
 keyExpressions:[
   {en:"heavily filtered version", ko:"잔뜩 걸러낸 버전"},
   {en:"nobody there is performing", ko:"거기선 아무도 연기하지 않는다"},
   {en:"as for what I don't post", ko:"안 올리는 것으로 말하자면"},
   {en:"had her apartment broken into", ko:"집에 도둑이 들었다"},
   {en:"browse a lot and post rarely", ko:"많이 보고 드물게 올린다"}],
 tips:"SNS 주제는 '무엇을 올리는가'만큼 '무엇을 안 올리는가'가 좋은 소재입니다. 안 올리는 이유에 짧은 일화를 붙이면 습관 설명이 자연스럽게 경험으로 확장됩니다."},

{exam:"OPIc", category:"여가활동", topic:"SNS에 글 올리기 - 올린 글로 생긴 기억에 남는 일", targetLevel:"IH–AL",
 question:"Tell me about a memorable experience you had because of something you posted online. What happened?",
 answerEn:"This is a small story but it genuinely surprised me.\n\nAbout two years ago I posted a photo of a bookshop — one of those old ones with narrow aisles, in a neighbourhood I don't usually go to. I wrote maybe one line under it, something like \"still here, somehow.\" I wasn't expecting anything; I think I posted it at eleven at night.\n\nThe next morning I had a message from someone I hadn't spoken to since high school. She said her grandfather had run that shop until the nineties, and she hadn't seen the inside of it in about twenty years. She asked if I could take more photos.\n\nSo I went back that weekend and took maybe thirty pictures, and I felt slightly ridiculous doing it — photographing shelves for a stranger, basically. She wrote back a long message. Apparently there was a specific window at the back where she used to do her homework, and it's still there.\n\nWe've since met for coffee twice, which after fifteen years of nothing is strange but nice.\n\nWhat stays with me is that I posted it thoughtlessly. One line at eleven at night. And it turned out to matter enormously to exactly one person, which is not something you can plan for.",
 answerKo:"작은 이야기인데 저를 정말로 놀라게 했어요.\n\n2년쯤 전에 서점 사진을 하나 올렸어요. 통로가 좁은 오래된 서점이었고, 평소에 잘 안 가는 동네였어요. 밑에 한 줄쯤 썼어요. \"어떻게든 아직 있네\" 정도로요. 아무것도 기대하지 않았고, 밤 11시쯤 올렸던 것 같아요.\n\n다음 날 아침에 고등학교 이후로 말 한 번 안 해 본 사람한테서 메시지가 왔어요. 자기 할아버지가 90년대까지 그 서점을 운영하셨는데 20년쯤 그 안을 못 봤다고요. 사진을 더 찍어 줄 수 있냐고 물었어요.\n\n그래서 그 주말에 다시 가서 서른 장쯤 찍었는데, 하면서 좀 우스꽝스러운 기분이었어요. 사실상 낯선 사람을 위해 책장을 찍고 있었으니까요. 그 친구가 긴 답장을 보냈어요. 뒤쪽에 숙제를 하던 특정한 창문이 있었는데 아직도 그대로 있다고요.\n\n그 후로 두 번 커피를 마셨는데, 15년간 아무 왕래가 없다가 그러니까 이상하면서도 좋더라고요.\n\n제 마음에 남는 건 제가 그걸 아무 생각 없이 올렸다는 점이에요. 밤 11시에 한 줄. 그런데 그게 정확히 한 사람에게 엄청나게 중요한 일이 됐어요. 그건 계획할 수 있는 게 아니잖아요.",
 keyExpressions:[
   {en:"still here, somehow", ko:"어떻게든 아직 남아 있다"},
   {en:"hadn't spoken to since ~", ko:"~ 이후로 말해 본 적 없는"},
   {en:"felt slightly ridiculous", ko:"좀 우스꽝스러운 기분이었다"},
   {en:"after fifteen years of nothing", ko:"15년간 아무 왕래도 없다가"},
   {en:"not something you can plan for", ko:"계획할 수 있는 일이 아니다"}],
 tips:"경험 문항에서 사건이 작아도 괜찮습니다. 오히려 '별생각 없이 한 일이 뜻밖의 결과를 낳았다'는 구조가 극적인 사건보다 말하기 쉽고 자연스럽습니다."},

{exam:"OPIc", category:"여가활동", topic:"SNS에 글 올리기 - SNS 문화의 변화와 문제점", targetLevel:"IH–AL",
 question:"How has social media changed over the past several years, and what problems do people talk about?",
 answerEn:"It's changed a lot, and I'd argue the biggest change is that it stopped being social.\n\nWhen I started using these apps around ten years ago, my feed was people I actually knew — badly lit photos, birthday messages, that kind of thing. Now if I open the same app, the first fifteen things are from accounts I've never followed. It's become a television channel that occasionally shows my friends. And the format changed too. Everything is short video now, and it's designed so that stopping requires an actual decision.\n\nThe problem people talk about most here is the comparison effect, especially among younger users. When everyone's feed is the edited version, you end up measuring your ordinary Tuesday against other people's best moments, and that's not a fair fight.\n\nThe second issue is misinformation. Something false spreads for two days, gets corrected quietly on day three, and by then a hundred times more people saw the false version.\n\nWhere I'd push back slightly is on the idea that it's all bad. My mother, who is seventy-one, is in three group chats and speaks to more people in a week than she did in a month before. So I think the honest position is that it connected people who were isolated and made people who were already connected feel worse.",
 answerKo:"많이 바뀌었고, 가장 큰 변화는 그게 '소셜'이기를 그만뒀다는 점이라고 봐요.\n\n10년쯤 전에 이런 앱들을 쓰기 시작했을 때 제 피드는 제가 실제로 아는 사람들이었어요. 조명이 엉망인 사진, 생일 축하 메시지, 그런 것들이요. 지금은 같은 앱을 열면 처음 열다섯 개가 제가 팔로우한 적도 없는 계정이에요. 가끔 제 친구를 보여 주는 텔레비전 채널이 된 거죠. 형식도 바뀌었어요. 이제 전부 짧은 영상이고, 멈추려면 실제로 결심을 해야 하도록 설계돼 있어요.\n\n여기서 사람들이 가장 많이 얘기하는 문제는 비교 효과예요. 특히 어린 사용자들 사이에서요. 모두의 피드가 편집된 버전일 때, 결국 자기의 평범한 화요일을 다른 사람들의 최고의 순간과 견주게 되는데 그건 공정한 싸움이 아니죠.\n\n두 번째 문제는 잘못된 정보예요. 거짓이 이틀간 퍼지고 사흘째에 조용히 정정되는데, 그때쯤이면 거짓 버전을 본 사람이 백 배는 많아요.\n\n제가 조금 반박하고 싶은 건 전부 나쁘다는 생각이에요. 일흔한 살인 저희 어머니는 단톡방 세 개에 계시고 예전에 한 달간 대화하던 것보다 많은 사람과 일주일에 대화하세요. 그래서 정직한 입장은 이거예요. 고립돼 있던 사람들은 연결시켜 줬고, 이미 연결돼 있던 사람들은 기분이 더 나빠지게 만들었다.",
 keyExpressions:[
   {en:"stopped being social", ko:"소셜이기를 그만뒀다"},
   {en:"badly lit photos", ko:"조명이 엉망인 사진"},
   {en:"the comparison effect", ko:"비교 효과"},
   {en:"that's not a fair fight", ko:"그건 공정한 싸움이 아니다"},
   {en:"where I'd push back", ko:"내가 반박하고 싶은 지점은"}],
 tips:"이슈형 문항에서 마지막에 반대 근거를 하나 인정하고 다시 정리하면 AL 답변이 됩니다. 'Where I'd push back is…' 한 문장을 통째로 외워 두면 어느 주제에나 붙습니다."},

/* ═══════════════════ UNIT 19 농구·야구·축구 ═══════════════════ */

{exam:"OPIc", category:"운동", topic:"농구·야구·축구 - 직접 하는 운동과 하는 방식 설명", targetLevel:"IH–AL",
 question:"You indicated that you play a team sport. Which sport do you play, where do you play it, and how often?",
 answerEn:"I play football — soccer, if you like — on Saturday mornings, and I've been doing it with roughly the same group for about five years now.\n\nWe play on a rented artificial pitch about twenty minutes from my apartment. It's a small-sided game, six a side, on half a full-size field. We book the eight o'clock slot, which sounds painful but is actually the point — it's cheap at that hour, and the pitch is empty.\n\nThe way it works is very casual. There's a group chat, someone posts on Thursday asking who's in, and whoever answers first fills the twelve places. If we only get ten, we play five a side. If we get sixteen, we rotate.\n\nI play in defence, mostly because I'm the slowest person there and defenders can hide that better. I'm not especially good. I'd say I'm reliable rather than skilful — I don't lose the ball, and I don't try things I can't do.\n\nAfterwards, about half of us go for breakfast at a place near the pitch. Honestly that hour is as much a part of it as the game is. Five years in, some of these people are close friends and I still don't know what most of them do for a living.",
 answerKo:"저는 토요일 아침에 축구를 해요. 거의 같은 사람들과 5년 정도 해 왔어요.\n\n저희 집에서 20분쯤 떨어진 대여 인조잔디 구장에서 해요. 정규 구장 절반 크기에서 6대6으로 하는 작은 경기예요. 8시 타임을 예약하는데, 말만 들으면 괴로울 것 같지만 사실 그게 핵심이에요. 그 시간엔 싸고 구장이 비어 있거든요.\n\n방식은 아주 느슨해요. 단톡방이 있고 목요일에 누가 참석자를 물어보는 글을 올리면, 먼저 답한 사람 순으로 열두 자리가 채워져요. 열 명만 모이면 5대5로 하고, 열여섯 명이면 돌아가면서 뛰어요.\n\n저는 수비를 봐요. 대체로는 제가 거기서 제일 느리고, 수비수는 그걸 더 잘 감출 수 있어서예요. 특별히 잘하지는 않아요. 잘한다기보다는 안정적이라고 할 수 있어요. 공을 안 뺏기고, 못 하는 걸 시도하지 않거든요.\n\n끝나고 나면 절반쯤은 구장 근처 식당에 아침을 먹으러 가요. 솔직히 그 한 시간이 경기만큼이나 이 활동의 일부예요. 5년째인데 이 중 몇 명은 가까운 친구가 됐고 저는 아직도 대부분이 무슨 일을 하는지 몰라요.",
 keyExpressions:[
   {en:"small-sided game", ko:"인원을 줄인 소규모 경기"},
   {en:"six a side", ko:"6대6으로"},
   {en:"who's in", ko:"누가 참석하는지"},
   {en:"reliable rather than skilful", ko:"화려하기보다 안정적인"},
   {en:"what they do for a living", ko:"그들이 무슨 일로 먹고사는지"}],
 tips:"운동 주제는 '얼마나 잘하는가'를 솔직하게 낮춰 말하면 오히려 자연스럽습니다. reliable rather than skilful처럼 대조 구문 하나를 쓰면 표현 점수가 올라갑니다."},

{exam:"OPIc", category:"운동", topic:"농구·야구·축구 - 운동하다 겪은 기억에 남는 일", targetLevel:"IH–AL",
 question:"Tell me about a memorable experience you had while playing your sport. What happened, and why do you remember it?",
 answerEn:"There's one from about three years ago that the group still brings up, and unfortunately I'm the reason.\n\nIt was February, freezing, and we were one player short, so a guy called Minsu brought his father. He must have been sixty-five, maybe older. Everyone was polite about it but I think we all quietly assumed he'd play for ten minutes and then sit down.\n\nHe was, without exaggeration, the best player on the pitch. He didn't run much — he didn't need to. He just always seemed to be standing exactly where the ball was about to go. At one point I was marking him, and he turned me so completely that I ended up facing the wrong way while he walked past me. I heard someone on my own team laughing.\n\nAfterwards, at breakfast, it came out that he'd played semi-professionally in the eighties and stopped after a knee injury. Nobody had asked. He'd just quietly turned up in borrowed boots.\n\nI remember it partly because it was funny at my expense, but mostly because of how completely I'd misjudged him in the first thirty seconds. Now he plays with us maybe once a month, and everybody wants him on their team.",
 answerKo:"3년쯤 전에 있었던 일인데 저희 모임에서 아직도 꺼내요. 안타깝게도 제가 그 원인이고요.\n\n2월이었고 엄청 추웠고 한 명이 모자랐어요. 그래서 민수라는 친구가 자기 아버지를 모시고 왔어요. 예순다섯은 되셨을 거예요, 어쩌면 더요. 다들 예의는 차렸지만 아마 속으로는 10분쯤 뛰시다 앉으시겠지 하고 짐작했을 거예요.\n\n과장 없이 그날 구장에서 가장 잘하는 선수였어요. 많이 뛰지도 않으셨어요. 그럴 필요가 없었으니까요. 그냥 늘 공이 갈 자리에 미리 서 계셨어요. 어느 순간 제가 그분을 마크하고 있었는데, 저를 어찌나 완벽하게 돌려세우셨는지 그분이 제 옆을 걸어 지나가는 동안 저는 엉뚱한 방향을 보고 서 있었어요. 우리 팀 누군가가 웃는 소리가 들렸어요.\n\n나중에 아침 먹으면서 알게 됐는데, 80년대에 세미프로로 뛰시다가 무릎 부상으로 그만두셨다더라고요. 아무도 묻지 않았던 거예요. 그냥 빌린 축구화를 신고 조용히 오셨던 거죠.\n\n제가 이걸 기억하는 건 제 손해로 웃긴 일이어서이기도 하지만, 대부분은 제가 첫 30초 만에 그분을 얼마나 완벽하게 잘못 판단했는지 때문이에요. 지금은 한 달에 한 번쯤 같이 뛰시는데 다들 자기 팀에 모시고 싶어 해요.",
 keyExpressions:[
   {en:"one player short", ko:"한 명이 모자란"},
   {en:"without exaggeration", ko:"과장 없이"},
   {en:"marking him", ko:"그를 수비하고 있던"},
   {en:"funny at my expense", ko:"내가 망신당해서 웃긴"},
   {en:"misjudged him", ko:"그를 잘못 판단했다"}],
 tips:"경험 문항에서 '내 예상이 빗나갔다'는 구조는 언제나 통합니다. 처음에 어떻게 짐작했는지를 먼저 말해 두어야 반전이 살아납니다."},

{exam:"OPIc", category:"운동", topic:"농구·야구·축구 - 예전과 지금의 운동 습관 비교", targetLevel:"IH–AL",
 question:"How has the way you play sports changed compared to when you were younger? Compare then and now.",
 answerEn:"Almost everything about it has changed except the sport itself.\n\nWhen I was at school, I played football probably four times a week, and none of it was planned. You just went to the field after class and there were already enough people there. Nobody booked anything, nobody paid anything, and if you were tired you played anyway because being tired wasn't a reason.\n\nNow it's once a week and it lives in a calendar. There's a booking, there's a fee split twelve ways, and if it rains we cancel. And I warm up now, which past me would find hilarious. I do about ten minutes of stretching because I pulled a hamstring three years ago and it took two months to be normal again.\n\nThe other change is what I want out of it. At sixteen I genuinely cared about winning — I'd be in a bad mood for hours after a loss. Now I honestly could not tell you the result of last Saturday's game. What I'd notice is if two people didn't show up.\n\nSo, less often, more organized, much more careful, and the point of it has moved from the result to the people. I don't think that's a decline. It's just a different activity wearing the same name.",
 answerKo:"운동 종목만 빼면 거의 모든 게 바뀌었어요.\n\n학교 다닐 때는 축구를 아마 주 4회쯤 했고, 그중 계획된 건 하나도 없었어요. 수업 끝나고 그냥 운동장에 가면 이미 사람이 충분히 있었어요. 아무도 예약하지 않았고 아무도 돈을 내지 않았고, 피곤해도 그냥 했어요. 피곤한 건 이유가 아니었으니까요.\n\n지금은 주 1회고 그게 달력 안에 살아요. 예약이 있고 열두 명이 나누는 비용이 있고 비가 오면 취소해요. 그리고 이제 몸을 풀어요. 예전의 저라면 웃겼을 일이죠. 스트레칭을 10분쯤 하는데 3년 전에 햄스트링이 나가서 정상으로 돌아오기까지 두 달이 걸렸거든요.\n\n또 다른 변화는 제가 거기서 뭘 원하느냐예요. 열여섯 살 때는 진심으로 이기고 싶었어요. 지고 나면 몇 시간씩 기분이 나빴죠. 지금은 솔직히 지난 토요일 경기 결과를 말씀드릴 수도 없어요. 제가 알아챌 만한 건 두 사람이 안 나왔다는 사실이에요.\n\n그래서 덜 자주, 더 조직적으로, 훨씬 조심스럽게 하고, 목적이 결과에서 사람으로 옮겨 갔어요. 그게 쇠퇴라고 생각하지는 않아요. 그냥 같은 이름을 달고 있는 다른 활동인 거죠.",
 keyExpressions:[
   {en:"it lives in a calendar", ko:"그게 달력 안에 들어가 있다"},
   {en:"a fee split twelve ways", ko:"열두 명이 나눠 내는 비용"},
   {en:"past me would find hilarious", ko:"예전의 나라면 웃겼을 일"},
   {en:"pulled a hamstring", ko:"햄스트링이 나갔다"},
   {en:"a different activity wearing the same name", ko:"같은 이름을 단 다른 활동"}],
 tips:"변화 비교는 빈도·비용·목적 세 축으로 나누면 빠짐없이 말할 수 있습니다. 마지막에 '나빠진 게 아니라 달라진 것'이라고 평가를 한 줄 덧붙이면 마무리가 깔끔합니다."}

]);
