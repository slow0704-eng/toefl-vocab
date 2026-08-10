/* ============================================================
   스피킹 추가 문항 — OPIc
   ------------------------------------------------------------
   ① 가족 구성원의 역할 (기본 주제) 3문항
   ② 친구 초대 롤플레이 3콤보 (질문하기 → 문제 해결 → 경험 말하기)
   ③ 휴가를 어떻게 보내는지 (휴가·출장) 2문항

   기존 speaking.js 의 SPEAKING_TOPICS 와 같은 형식이며,
   app.js 에서 같은 배열에 이어 붙인다.
   목표 등급은 IH–AL 기준으로, 답변에 filler·연결어·구체적 일화를
   섞어 실제 발화처럼 들리도록 썼다.
   ============================================================ */
window.SPEAKING_TOPICS_EXTRA = (window.SPEAKING_TOPICS_EXTRA||[]).concat([

  /* ═══════════ ① 가족 구성원의 역할 ═══════════ */

  {exam:"OPIc", category:"기본 주제", topic:"가족 역할·집안일", targetLevel:"IH–AL",
   question:"Tell me about the roles each member of your family plays at home. Who does what, and how did those roles come about?",
   answerEn:"Sure, so, there are four of us — my parents, my younger brother, and me. And honestly, the roles kind of sorted themselves out over the years rather than anyone sitting down and deciding. My mom is definitely the one who keeps everything running. She's the person who knows when the electricity bill is due, when someone has a dentist appointment, all of that. We call her the family's operating system, half-jokingly. My dad handles anything that involves fixing things or driving, so if a light goes out or someone needs a ride at eleven at night, that's his department. My brother and I split the everyday stuff. He does the dishes because he genuinely doesn't mind it, and I do the laundry and take out the recycling. What's interesting is that nobody assigned these. We just kind of drifted into whatever we were least bad at. If I'm being honest, though, the split isn't totally fair — my mom still carries most of the invisible work, the remembering and the planning. We've talked about it a few times, and lately we've been trying to take more of that off her plate.",
   answerKo:"네, 저희는 네 식구예요. 부모님, 남동생, 그리고 저요. 솔직히 역할은 누가 앉아서 정했다기보다 세월이 지나면서 저절로 정리된 쪽이에요. 어머니는 확실히 모든 걸 굴러가게 하는 분이세요. 전기 요금이 언제인지, 누가 치과 예약이 있는지, 그런 걸 다 아시는 분이죠. 저희끼리 반쯤 농담으로 어머니를 '집안의 운영체제'라고 불러요. 아버지는 뭔가 고치거나 운전하는 일을 다 맡으세요. 그래서 전등이 나가거나 밤 열한 시에 누가 태워 달라고 하면 그건 아버지 담당이에요. 동생이랑 저는 일상적인 걸 나눠 해요. 동생은 설거지를 하는데 진짜로 그걸 싫어하지 않아서 그렇고, 저는 빨래랑 재활용 내놓는 걸 해요. 재미있는 건 아무도 이걸 배정하지 않았다는 거예요. 그냥 각자 제일 덜 못하는 쪽으로 흘러간 거죠. 그런데 솔직히 말하면 이 분담이 완전히 공평하지는 않아요. 어머니가 여전히 눈에 안 보이는 일, 기억하고 계획하는 일을 대부분 지고 계시거든요. 저희끼리 몇 번 얘기했고, 요즘은 그 부담을 좀 덜어 드리려고 하는 중이에요.",
   keyExpressions:[
     {en:"sort themselves out",ko:"저절로 정리되다"},
     {en:"keep everything running",ko:"모든 게 굴러가게 하다"},
     {en:"that's his/her department",ko:"그건 그 사람 담당이다"},
     {en:"drift into ~",ko:"자연스럽게 ~하게 되다"},
     {en:"the invisible work",ko:"눈에 보이지 않는 일(챙기고 기억하는 일)"},
     {en:"take something off someone's plate",ko:"~의 부담을 덜어 주다"}],
   tips:"역할 나열만 하면 IM에서 멈춰요. ①누가 무엇을 하는지 → ②그 역할이 어떻게 정해졌는지 → ③분담이 공평한지에 대한 내 생각, 이렇게 세 단으로 올리면 IH 이상으로 들립니다. '운영체제' 같은 비유 하나, '밤 열한 시에 태워 달라고 하면' 같은 구체적 상황 하나를 넣으면 답변이 살아나요."},

  {exam:"OPIc", category:"기본 주제", topic:"가족 역할·집안일", targetLevel:"IH–AL",
   question:"How have the roles in your family changed over the years? Compare how things were when you were younger with how they are now.",
   answerEn:"That's a good question, because they've changed quite a lot, actually. When I was in school, the division was pretty traditional, I'd say. My parents did basically everything, and my brother and I were expected to study and not much else. Looking back, we were kind of guests in our own house. We didn't even know where the vacuum cleaner was kept.\n\nThe big shift happened when I started working and moved back home for a while. Suddenly I had my own income, my own schedule, and it felt strange to have my mom still doing my laundry at that age. So I started taking things over, and my brother followed once he graduated. These days it's much more even. We rotate cooking on weekends, and my dad, who used to never go near the kitchen, has actually gotten into making stews.\n\nThe other change is about decisions. When we were younger, my parents decided things and told us afterward. Now we discuss stuff together — where to go for holidays, whether to replace the car. To be honest, that shift was harder for my dad than the chores were. It took him a while to get used to being one voice among four instead of the one who decides.",
   answerKo:"좋은 질문이네요. 사실 꽤 많이 바뀌었거든요. 제가 학생이었을 때는 분담이 꽤 전통적이었다고 할 수 있어요. 부모님이 사실상 모든 걸 하셨고, 동생이랑 저는 공부만 하면 되는 존재였죠. 돌이켜 보면 저희는 저희 집에서 손님 같은 존재였어요. 청소기를 어디에 두는지도 몰랐으니까요.\n\n큰 변화는 제가 일을 시작하고 한동안 다시 집에 들어와 살면서 일어났어요. 갑자기 제 수입이 생기고 제 일정이 생겼는데, 그 나이에 어머니가 여전히 제 빨래를 하고 계신 게 이상하게 느껴지더라고요. 그래서 하나씩 넘겨받기 시작했고, 동생도 졸업하고 나서 따라왔어요. 요즘은 훨씬 고르게 나눠요. 주말에는 돌아가면서 요리하고, 예전엔 부엌 근처에도 안 가시던 아버지가 요즘은 찌개 만드는 데 재미를 붙이셨어요.\n\n또 하나 달라진 건 결정 방식이에요. 어렸을 땐 부모님이 정하고 저희에게 나중에 알려 주셨어요. 지금은 같이 의논해요. 명절에 어디 갈지, 차를 바꿀지 같은 것들이요. 솔직히 그 변화가 아버지한테는 집안일보다 더 어려웠던 것 같아요. 결정하는 사람에서 넷 중 한 목소리가 되는 데 시간이 좀 걸리셨거든요.",
   keyExpressions:[
     {en:"the division was traditional",ko:"분담이 전통적이었다"},
     {en:"guests in our own house",ko:"제 집에서 손님 같은 존재"},
     {en:"take things over",ko:"(일을) 넘겨받다"},
     {en:"rotate cooking",ko:"돌아가며 요리하다"},
     {en:"get into ~",ko:"~에 재미를 붙이다"},
     {en:"one voice among four",ko:"넷 중 한 목소리"}],
   tips:"비교 문항은 '예전 → 계기 → 지금' 세 덩어리로 나누는 게 가장 안전해요. 특히 <b>계기</b>를 넣는 게 핵심입니다. 그냥 '달라졌어요'가 아니라 '제가 일을 시작하면서'처럼 전환점을 대면 논리가 생겨요. 마지막에 집안일 말고 <b>결정권</b>이라는 다른 축을 하나 더 꺼내면 답변 폭이 넓어 보입니다."},

  {exam:"OPIc", category:"기본 주제", topic:"가족 역할·집안일", targetLevel:"IH–AL",
   question:"Have you ever had a disagreement with your family about household responsibilities? Tell me what happened and how it was resolved.",
   answerEn:"Yeah, definitely. There was one that went on for months, actually — it was about the dishes, of all things.\n\nSo the arrangement was that whoever didn't cook would wash up. Simple enough. But my brother had this habit of leaving everything to soak overnight, and by morning the sink would be full and my mom would just end up doing it before work. So technically he wasn't breaking the rule, but the rule wasn't working. I brought it up a couple of times and it turned into a whole thing, because he felt like I was policing him, and I felt like he was letting our mom cover for him.\n\nWhat finally fixed it wasn't a big conversation, honestly. My mom just stopped doing them. She left the sink exactly as it was for three days, which sounds petty but it made the point better than any argument. After that we changed the rule slightly — dishes have to be done before you go to bed, not just done at some point. Having an actual deadline made all the difference.\n\nLooking back, I think the real issue wasn't the dishes. It was that we had a rule with no time limit, and my brother and I were reading it completely differently.",
   answerKo:"네, 있어요. 사실 몇 달을 끈 게 하나 있는데, 하필이면 설거지 문제였어요.\n\n원래 규칙은 요리를 안 한 사람이 설거지를 한다는 거였어요. 간단하죠. 그런데 동생이 밤새 물에 담가 두는 버릇이 있었어요. 그러면 아침에는 싱크대가 꽉 차 있고, 결국 어머니가 출근 전에 하시게 되는 거예요. 그러니까 엄밀히 말하면 동생이 규칙을 어긴 건 아닌데 규칙이 작동을 안 한 거죠. 제가 몇 번 얘기를 꺼냈는데 일이 커졌어요. 동생은 제가 감시한다고 느꼈고, 저는 동생이 어머니한테 떠넘긴다고 느꼈거든요.\n\n결국 해결한 건 솔직히 대단한 대화가 아니었어요. 어머니가 그냥 설거지를 안 하기 시작하셨어요. 사흘 동안 싱크대를 그대로 두셨는데, 유치하게 들리지만 어떤 말다툼보다 효과가 확실했어요. 그다음에 규칙을 살짝 바꿨어요. 설거지는 '언젠가' 하는 게 아니라 자기 전까지 끝내야 한다고요. 실제 기한이 생기니까 완전히 달라지더라고요.\n\n돌이켜 보면 진짜 문제는 설거지가 아니었던 것 같아요. 시간 제한이 없는 규칙이 있었고, 동생이랑 제가 그걸 완전히 다르게 읽고 있었던 거죠.",
   keyExpressions:[
     {en:"of all things",ko:"하필이면"},
     {en:"leave something to soak",ko:"물에 담가 두다"},
     {en:"it turned into a whole thing",ko:"일이 커졌다"},
     {en:"police someone",ko:"~를 감시하다, 단속하다"},
     {en:"cover for someone",ko:"~를 대신 감당해 주다"},
     {en:"it made the point",ko:"할 말을 확실히 전했다"}],
   tips:"갈등 경험 문항은 <b>누가 나쁜 사람인지 정하지 않는 것</b>이 고득점 요령이에요. '동생이 규칙을 어긴 건 아닌데 규칙이 작동을 안 했다'처럼 양쪽 다 이해되게 말하면 훨씬 성숙하게 들립니다. 마지막에 '진짜 문제는 설거지가 아니었다'로 한 단계 올려 정리하는 마무리를 꼭 챙기세요."},

  /* ═══════════ ② 친구 초대 롤플레이 3콤보 ═══════════ */

  {exam:"OPIc", category:"롤플레이", topic:"친구 초대 — 질문하기", targetLevel:"IH–AL",
   question:"I'd like to give you a situation and ask you to act it out. You've decided to invite a friend over to your place this weekend. Call your friend and ask three or four questions to plan the visit.",
   answerEn:"Hey, it's me! Are you free to talk for a sec? Great. So listen, I was thinking — why don't you come over to my place this Saturday? I've been meaning to have you over since I moved in, and I finally got the place looking decent.\n\nSo, a few things I wanted to check. First, what time works for you? I was thinking around six, but if you'd rather come earlier and just hang out, that's totally fine with me.\n\nSecond — and this is the important one — is there anything you can't eat? I remember you mentioned something about dairy a while back, but I wasn't sure if that was an allergy or just a preference. I'd rather ask than guess and mess it up.\n\nOh, and are you bringing anyone? You're welcome to bring your roommate if you want, I just need to know so I can figure out how much food to make.\n\nLast thing — do you know how to get here? It's a bit tricky because the building entrance is on the back side. I can send you a pin, or honestly I could just meet you at the station if that's easier. Just let me know what you prefer.",
   answerKo:"야, 나야! 잠깐 통화 괜찮아? 좋아. 있잖아, 생각해 봤는데 이번 주 토요일에 우리 집에 오지 않을래? 이사하고 나서 계속 초대하려고 했는데, 이제야 집이 좀 봐줄 만해졌거든.\n\n몇 가지 확인하고 싶은 게 있어. 먼저, 몇 시가 괜찮아? 나는 여섯 시쯤 생각했는데, 더 일찍 와서 그냥 놀고 싶으면 그것도 완전 괜찮아.\n\n두 번째는, 이게 제일 중요한데, 못 먹는 거 있어? 예전에 유제품 얘기했던 것 같은데, 그게 알레르기였는지 그냥 안 좋아하는 건지 헷갈려서. 짐작해서 망치느니 물어보는 게 낫잖아.\n\n아 그리고, 누구 데려올 거야? 룸메이트 데려와도 괜찮아. 다만 음식 얼마나 할지 정해야 해서 미리 알려 줘.\n\n마지막으로, 우리 집 찾아올 줄 알아? 건물 입구가 뒤쪽에 있어서 좀 헷갈리거든. 위치 찍어서 보내 줄 수도 있고, 아니면 그냥 내가 역으로 마중 나가도 돼. 뭐가 편한지 알려 줘.",
   keyExpressions:[
     {en:"Are you free to talk for a sec?",ko:"잠깐 통화 괜찮아?"},
     {en:"I've been meaning to ~",ko:"계속 ~하려고 했었어"},
     {en:"What time works for you?",ko:"몇 시가 괜찮아?"},
     {en:"Is there anything you can't eat?",ko:"못 먹는 거 있어?"},
     {en:"You're welcome to bring ~",ko:"~ 데려와도 돼"},
     {en:"I can send you a pin",ko:"위치 찍어서 보내 줄게"}],
   tips:"롤플레이 질문하기는 <b>질문 3~4개를 또렷하게 세는 것</b>이 채점 포인트예요. First / Second / Oh, and / Last thing 처럼 표지를 붙이면 채점자가 개수를 놓치지 않습니다. 질문만 던지고 끝내지 말고 'if that's easier'처럼 <b>선택지를 함께 주는</b> 문장을 섞으면 자연스러운 원어민 통화처럼 들려요."},

  {exam:"OPIc", category:"롤플레이", topic:"친구 초대 — 문제 해결", targetLevel:"IH–AL",
   question:"I'm sorry, but there is a problem I need you to resolve. On the day of the visit, something has gone wrong at your place and you can't host your friend as planned. Call your friend, explain the situation, and offer two or three alternatives.",
   answerEn:"Hey, it's me — I'm really sorry to be calling you like this, but something's come up and I have to change our plan for tonight.\n\nSo, about an hour ago the pipe under my kitchen sink started leaking. Not a little drip — there's water all over the floor and I've had to shut off the valve. The building manager is sending someone, but he said it probably won't be until tomorrow morning. So basically I have no running water in the kitchen, and honestly the place is a mess right now. I feel terrible because I know you already left work early.\n\nSo here's what I was thinking. Option one, we could just move it to my place next Saturday, same time — by then it'll be fixed and I can actually cook properly like I planned.\n\nOr, if you're already on your way and you don't want to waste the trip, there's a really good Thai place two stops from me. My treat, obviously, since I'm the one cancelling.\n\nThe third option is we do it at your place instead, if that's not too much of an imposition. I'd bring everything — I already did the shopping this morning, so the food is sitting in my fridge anyway.\n\nWhichever works for you is fine with me. Again, I'm really sorry about this.",
   answerKo:"야, 나야. 이렇게 전화해서 정말 미안한데, 일이 생겨서 오늘 저녁 계획을 바꿔야 할 것 같아.\n\n한 시간쯤 전에 부엌 싱크대 밑 배관이 새기 시작했어. 조금씩 떨어지는 정도가 아니라 바닥에 물이 흥건해서 밸브를 잠가야 했어. 관리소에서 사람을 보내 준다는데 아마 내일 아침에나 온다고 하더라고. 그러니까 지금 부엌에 물이 아예 안 나오고, 솔직히 집이 엉망이야. 너 일찍 퇴근한 거 아는데 정말 미안해.\n\n그래서 이렇게 생각해 봤어. 첫째, 다음 주 토요일 같은 시간으로 미루는 거야. 그때쯤이면 고쳐져 있을 거고 원래 계획대로 제대로 요리해 줄 수 있어.\n\n아니면, 네가 이미 오는 중이고 헛걸음하기 싫으면, 우리 집에서 두 정거장 거리에 태국 음식 잘하는 집이 있어. 당연히 내가 살게. 취소한 사람이 나니까.\n\n세 번째는 너무 부담이 아니라면 대신 너희 집에서 하는 거야. 내가 다 가져갈게. 오늘 아침에 이미 장을 봐 놔서 재료가 어차피 우리 집 냉장고에 있거든.\n\n뭐가 됐든 네가 편한 걸로 해. 다시 한번 정말 미안해.",
   keyExpressions:[
     {en:"something's come up",ko:"일이 생겼어"},
     {en:"shut off the valve",ko:"밸브를 잠그다"},
     {en:"I feel terrible because ~",ko:"~라서 정말 미안해"},
     {en:"Here's what I was thinking",ko:"내 생각은 이래"},
     {en:"My treat",ko:"내가 살게"},
     {en:"if that's not too much of an imposition",ko:"너무 부담이 아니라면"},
     {en:"Whichever works for you",ko:"네가 편한 걸로"}],
   tips:"문제 해결 문항의 채점 뼈대는 <b>사과 → 상황 설명 → 대안 2~3개 → 재사과</b>입니다. 상황 설명은 반드시 <b>구체적</b>이어야 해요. '문제가 생겼어'가 아니라 '배관이 새서 밸브를 잠갔고 수리는 내일 아침'까지 가야 IH 이상입니다. 대안은 상대 입장에서 다른 종류로 내세요 — 미루기 / 밖에서 만나기 / 장소 바꾸기처럼요."},

  {exam:"OPIc", category:"롤플레이", topic:"친구 초대 — 경험 말하기", targetLevel:"IH–AL",
   question:"That's the end of the situation. Now, have you ever had plans with someone fall through at the last minute — either you cancelled or they did? Tell me what happened and how you handled it.",
   answerEn:"Oh, yes. This actually happened to me maybe two years ago, and I still bring it up sometimes.\n\nI'd invited about six friends over for my birthday. I spent the whole Saturday cooking — I'm talking three dishes, a cake I made from scratch, the whole thing. And then, starting around five, the messages began. One person's train was delayed, another one's kid got sick, and two of them, honestly, just said something vague like 'so sorry, something came up.' By six-thirty it was down to one friend and me, sitting there with enough food for eight people.\n\nI'll admit I was upset at first. Not at the ones with real reasons — obviously that happens — but at the vague ones. It felt like they'd only committed halfway to begin with.\n\nWhat we ended up doing was pretty good, though. My friend suggested we pack everything up and take it to another friend's place, since she lived nearby and had said she couldn't come because she was studying. So we just showed up at her door with a birthday dinner. She was thrilled, and it turned into one of my better birthdays, honestly.\n\nWhat I took from it is that plans falling apart isn't really the problem. It's whether you're willing to change the shape of the evening instead of just calling it off.",
   answerKo:"아, 있어요. 사실 2년쯤 전에 겪은 일인데 아직도 가끔 얘기해요.\n\n제 생일에 친구 여섯 명 정도를 초대했어요. 토요일 하루를 통째로 요리하는 데 썼죠. 요리 세 가지에, 케이크도 직접 굽고, 제대로 준비했어요. 그런데 다섯 시쯤부터 메시지가 오기 시작하는 거예요. 한 명은 기차가 연착됐고, 한 명은 아이가 아프고, 두 명은 솔직히 '미안, 일이 좀 생겨서'처럼 두루뭉술하게만 말하더라고요. 여섯 시 반쯤 되니까 친구 한 명이랑 저, 그리고 여덟 명 분량의 음식만 남아 있었어요.\n\n처음엔 좀 서운했다고 인정할게요. 진짜 사정이 있던 사람들한테가 아니라 — 그런 건 당연히 있을 수 있으니까요 — 두루뭉술하게 말한 쪽에요. 애초에 반만 약속한 것 같은 기분이 들었거든요.\n\n그래도 결국 한 일은 꽤 괜찮았어요. 같이 있던 친구가 음식을 다 싸서 다른 친구 집에 가자고 하더라고요. 그 친구가 근처에 살았고 공부하느라 못 온다고 했었거든요. 그래서 생일 저녁상을 들고 그냥 그 집 문 앞에 나타났죠. 그 친구가 엄청 좋아했고, 솔직히 제 생일 중에 손꼽히게 좋은 날이 됐어요.\n\n거기서 얻은 건, 계획이 틀어지는 것 자체가 문제는 아니라는 거예요. 그냥 없던 일로 하는 대신 그날 저녁의 모양을 바꿀 생각이 있느냐가 문제인 거죠.",
   keyExpressions:[
     {en:"fall through",ko:"(계획이) 무산되다"},
     {en:"from scratch",ko:"처음부터 직접"},
     {en:"something came up",ko:"일이 좀 생겼어 (두루뭉술한 취소 표현)"},
     {en:"commit halfway",ko:"어중간하게만 약속하다"},
     {en:"pack everything up",ko:"전부 싸다"},
     {en:"call it off",ko:"없던 일로 하다, 취소하다"}],
   tips:"롤플레이 3콤보의 마지막 '경험' 문항은 앞의 상황과 <b>주제만 겹치고 내용은 달라야</b> 자연스러워요. 여기서는 '내가 취소한' 앞 상황과 달리 '남들이 취소한' 경험을 골랐습니다. 시간 표지(다섯 시쯤 → 여섯 시 반)를 넣어 사건을 굴리고, 마지막에 <b>깨달은 점 한 문장</b>으로 닫으면 AL권으로 들립니다."},

  /* ═══════════ ③ 휴가를 어떻게 보내는지 ═══════════ */

  {exam:"OPIc", category:"휴가·출장", topic:"휴가 보내는 방식", targetLevel:"IH–AL",
   question:"What do you usually do during your vacation? Walk me through a typical day off from beginning to end.",
   answerEn:"Honestly, my vacations look a lot less exciting than other people's, and I've made peace with that.\n\nI'd say I'm a recharge-type traveler rather than a sightseeing-type. When I get time off, the first thing I do is nothing at all — I sleep in, which for me means until about nine, and I don't set an alarm. That alone feels like the point of the whole vacation.\n\nThen a typical day goes something like this. I make coffee properly, with the pour-over set I only use when I have time, and I read for an hour or two. Around noon I'll go out for a long walk, usually along the river near my place, and I'll grab lunch somewhere I haven't tried. Afternoons I keep deliberately empty. Sometimes I'll go to a bookstore, sometimes I'll just come home and watch something.\n\nIn the evening I usually cook, which I never do on work days, and I might call a friend or have someone over.\n\nI do take one or two proper trips a year — I went to Jeju last spring — but even then I plan maybe one thing per day and leave the rest open. I used to over-schedule trips and come back more tired than when I left. At some point I realized I was treating vacation like another project, and I've been much happier since I stopped.",
   answerKo:"솔직히 제 휴가는 다른 사람들 것보다 훨씬 재미없어 보이는데, 저는 그걸 받아들였어요.\n\n저는 관광형이라기보다 충전형 여행자라고 할 수 있어요. 휴가가 생기면 제일 먼저 하는 일은 아무것도 안 하는 거예요. 늦잠을 자는데, 저한테는 아홉 시쯤까지고, 알람을 안 맞춰요. 그것만으로도 휴가의 목적을 다한 기분이에요.\n\n그다음 하루는 대충 이래요. 시간 있을 때만 쓰는 드립 세트로 커피를 제대로 내리고, 한두 시간 책을 읽어요. 정오쯤에 오래 산책을 나가는데 보통 집 근처 강변을 걷고, 안 가 본 데서 점심을 먹어요. 오후는 일부러 비워 둬요. 서점에 갈 때도 있고, 그냥 집에 와서 뭘 볼 때도 있고요.\n\n저녁에는 보통 요리를 해요. 평일에는 절대 안 하는 일이죠. 친구한테 전화하거나 누굴 부르기도 하고요.\n\n일 년에 한두 번은 제대로 된 여행도 가요. 지난봄에는 제주에 다녀왔어요. 그런데 그때도 하루에 한 가지 정도만 정하고 나머지는 비워 둡니다. 예전에는 일정을 너무 빡빡하게 짜서 떠날 때보다 더 지쳐서 돌아왔거든요. 어느 순간 제가 휴가를 또 하나의 프로젝트처럼 다루고 있다는 걸 깨달았고, 그만둔 뒤로 훨씬 행복해졌어요.",
   keyExpressions:[
     {en:"make peace with ~",ko:"~를 받아들이다"},
     {en:"a recharge-type traveler",ko:"충전형 여행자"},
     {en:"sleep in",ko:"늦잠 자다"},
     {en:"keep something deliberately empty",ko:"일부러 비워 두다"},
     {en:"over-schedule",ko:"일정을 너무 빡빡하게 짜다"},
     {en:"treat A like another project",ko:"A를 또 하나의 과제처럼 다루다"}],
   tips:"'하루 일과를 처음부터 끝까지'라고 물으면 <b>시간 순서 표지</b>(first / around noon / afternoons / in the evening)를 반드시 깔아 주세요. 그리고 활동 나열로 끝내지 말고, 마지막에 '예전엔 이랬는데 지금은 이렇다'는 <b>변화와 깨달음</b>을 붙이면 등급이 올라갑니다. '충전형 vs 관광형'처럼 자기를 규정하는 표현을 앞에 두면 답변 전체가 하나로 묶여요."},

  {exam:"OPIc", category:"휴가·출장", topic:"휴가 보내는 방식", targetLevel:"IH–AL",
   question:"Tell me about a memorable vacation you've had recently. Where did you go, who were you with, and what made it memorable?",
   answerEn:"Sure. The one that comes to mind is a trip I took to Gangneung last autumn with two friends from university. It was only three days, but it stuck with me more than trips I've spent much more money on.\n\nWe took the KTX on a Friday evening — it's under two hours now, which still amazes me — and stayed in a small guesthouse near the beach. Nothing fancy. The owner was this older man who kept insisting we try his coffee, and it turned out Gangneung is actually known for coffee, which none of us had any idea about.\n\nThe thing that made it memorable wasn't really the place, though. It was that all three of us had been going through a rough patch — one friend had just left a job she hated, I was burnt out, and the third was dealing with some family stuff. And we didn't plan to talk about any of it. But on the second night we ended up sitting on the beach until about two in the morning, and everything came out.\n\nI think what I took away is that the best trips aren't necessarily the most interesting ones. That trip had no itinerary at all. But we were in a place none of us had obligations in, with nothing scheduled, and that turned out to be exactly what we needed.",
   answerKo:"네. 떠오르는 건 지난가을에 대학 친구 두 명이랑 강릉에 갔던 여행이에요. 딱 사흘이었는데, 돈을 훨씬 많이 쓴 여행들보다 더 오래 남았어요.\n\n금요일 저녁에 KTX를 탔어요. 이제 두 시간도 안 걸리는데 그게 아직도 신기해요. 바닷가 근처 작은 게스트하우스에 묵었어요. 화려한 데는 아니었고요. 주인분이 나이 지긋한 아저씨였는데 자기 커피를 꼭 마셔 보라고 계속 권하시더라고요. 알고 보니 강릉이 커피로 유명한 데였는데 저희 셋 다 전혀 몰랐어요.\n\n그런데 그 여행이 기억에 남는 건 사실 장소 때문이 아니었어요. 셋 다 그때 좀 힘든 시기를 지나고 있었거든요. 한 친구는 싫어하던 직장을 막 그만뒀고, 저는 번아웃이었고, 나머지 한 명은 집안 문제를 겪고 있었어요. 그리고 저희는 그 얘기를 할 생각이 전혀 없었어요. 그런데 둘째 날 밤에 새벽 두 시까지 바닷가에 앉아 있게 됐고, 결국 다 나왔죠.\n\n제가 얻은 건, 가장 좋은 여행이 꼭 가장 흥미로운 여행은 아니라는 거예요. 그 여행은 일정이랄 게 아예 없었어요. 그런데 셋 다 아무 의무도 없는 곳에, 잡아 놓은 일정 없이 있었고, 그게 정확히 저희에게 필요한 거였더라고요.",
   keyExpressions:[
     {en:"it stuck with me",ko:"오래 남았다"},
     {en:"nothing fancy",ko:"화려하진 않은"},
     {en:"go through a rough patch",ko:"힘든 시기를 지나다"},
     {en:"be burnt out",ko:"번아웃이다"},
     {en:"everything came out",ko:"(속 얘기가) 다 나왔다"},
     {en:"no itinerary at all",ko:"일정이랄 게 전혀 없는"}],
   tips:"'기억에 남는 휴가'는 <b>장소 자랑으로 가면 감점</b>이에요. 채점자가 듣고 싶은 건 왜 기억에 남는가입니다. 이 답변처럼 '기억에 남는 건 사실 장소 때문이 아니었어요'로 한 번 꺾어 주면 그때부터 이야기가 됩니다. 사소한 디테일(주인아저씨의 커피, 새벽 두 시)을 한두 개 심어 두면 지어낸 말처럼 들리지 않아요."}

]);
