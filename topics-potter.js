/* ============================================================
   관심주제 리딩 — ⚡ 해리 포터 (장소 10 · 기숙사 4 · 다른 학교 7)
   ------------------------------------------------------------
   줄거리 요약이 아니라, 허구의 장소·제도를 학술 논문이 실제
   대상을 다루듯 분석한 TOEFL 지문이다. 지리학·건축학·행정학·
   형벌론·교육사회학·사료비판의 시선을 각각 다르게 잡았다.

   기존 topics.js 의 TOPIC_READING 과 같은 형식이며
   app.js 에서 같은 풀에 이어 붙는다.
     { id, exam, series, type, level, title, topic,
       passage, ko, gloss:[{w,ko}], qs:[{q,opts,ans,exp}] }
   level 3=고급, 4=최고급
   ============================================================ */
window.TOPIC_READING_POTTER = [
{
 "id": "hp-hogwarts",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "건축·제도",
 "level": 4,
 "title": "The Castle as an Administrative Instrument",
 "topic": "움직이는 계단은 장식이 아니라, 소수의 교직원이 대규모 기숙 학교를 통치하게 해 주는 행정 장치다",
 "passage": "Most institutional buildings are designed to be legible. Corridors repeat, floor plans can be memorized, and a newcomer becomes competent in the space within a few days. The castle that houses the wizarding school of Hogwarts refuses this convention. Its staircases pivot between landings, certain doorways admit or refuse passage according to conditions the user cannot inspect, and portions of the interior appear only when a need has been articulated. It is tempting to read such behavior as ornament. A more productive reading treats the architecture as an administrative instrument: the castle does not merely shelter the school's rules, it enforces them.\n\nConsider what unreliable circulation accomplishes. When routes cannot be memorized, seniority acquires practical value, because older students hold navigational knowledge that no map can transfer. Movement itself becomes an apprenticeship, and the informal hierarchy of the houses is reproduced daily without any member of staff issuing an order. Restricted areas are governed on the same principle. The boundary is maintained by the structure rather than by patrols, which allows a very small faculty to supervise a large residential population at almost no cost in labor.\n\nThe residential plan reinforces the effect. Common rooms are dispersed to the extremes of the building and sealed behind passwords, so that the house, rather than the year group, becomes the unit of ordinary sociability. Distance is doing the work that a written regulation would otherwise have to do.\n\nSome interpreters go further and attribute something like intention to the castle, citing the chamber that furnishes itself according to a visitor's need. The evidence is thinner than it appears. Responsiveness is not judgment, and a structure that answers requests indiscriminately, serving concealment as readily as study, resembles less a guardian than a very old machine that nobody has audited.",
 "ko": "대부분의 기관 건물은 읽히도록 설계된다. 복도는 반복되고, 평면도는 외울 수 있으며, 처음 온 사람도 며칠이면 그 공간에 능숙해진다. 마법 학교 호그와트를 담고 있는 성은 이 관례를 거부한다. 계단은 층계참 사이에서 회전하고, 어떤 출입구는 사용자가 확인할 수 없는 조건에 따라 통행을 허용하거나 거부하며, 내부의 어떤 부분은 필요가 표명되었을 때에만 나타난다. 이런 거동을 장식으로 읽고 싶어지기 쉽다. 더 생산적인 독법은 그 건축을 행정 장치로 취급하는 것이다. 성은 학교의 규칙을 단지 품고 있는 것이 아니라 그 규칙을 집행한다.\n\n신뢰할 수 없는 동선이 무엇을 이루는지 생각해 보라. 경로를 외울 수 없을 때 연차는 실질적인 가치를 얻는다. 상급생이 어떤 지도로도 옮겨 줄 수 없는 길 찾기 지식을 쥐고 있기 때문이다. 이동 자체가 도제 수업이 되고, 기숙사들의 비공식적 위계는 어떤 교직원이 명령을 내리지 않아도 매일 재생산된다. 출입 제한 구역도 같은 원리로 통제된다. 경계는 순찰이 아니라 구조가 유지하며, 이는 아주 적은 교원이 노동 비용을 거의 들이지 않고 대규모 기숙 인구를 감독할 수 있게 한다.\n\n주거 배치는 그 효과를 강화한다. 휴게실들은 건물의 양극단으로 흩어져 있고 암호 뒤에 봉인되어 있어서, 학년이 아니라 기숙사가 일상적 사교의 단위가 된다. 거리가, 그렇지 않았다면 성문 규정이 해야 했을 일을 대신하고 있는 것이다.\n\n어떤 해석자들은 한 걸음 더 나아가 성에 의도 비슷한 것을 부여하며, 방문자의 필요에 따라 스스로를 갖추는 방을 근거로 든다. 그러나 증거는 보이는 것보다 얇다. 반응성은 판단이 아니며, 은닉에도 공부에도 똑같이 기꺼이 봉사하며 요청에 무차별적으로 응답하는 구조물은 수호자라기보다 아무도 감사한 적 없는 아주 오래된 기계에 가깝다.",
 "gloss": [
  {
   "w": "legible",
   "ko": "읽어 낼 수 있는, 파악하기 쉬운"
  },
  {
   "w": "pivot",
   "ko": "회전하다, 축을 중심으로 돌다"
  },
  {
   "w": "articulate (a need)",
   "ko": "(필요를) 분명히 표명하다"
  },
  {
   "w": "circulation",
   "ko": "(건축) 동선, 사람의 이동 흐름"
  },
  {
   "w": "seniority",
   "ko": "연차, 선임 서열"
  },
  {
   "w": "apprenticeship",
   "ko": "도제 수업, 견습 과정"
  },
  {
   "w": "indiscriminately",
   "ko": "무차별적으로, 가리지 않고"
  }
 ],
 "qs": [
  {
   "q": "What is the main point the author makes about the castle?",
   "opts": [
    "Its unstable design is a decorative flourish typical of magical architecture.",
    "Its unpredictable structure functions as a mechanism of institutional control.",
    "Its floor plan was deliberately drawn to confuse intruders from outside.",
    "Its age makes it unsuitable for housing a large modern school."
   ],
   "ans": 1,
   "exp": "1문단 마지막 문장이 논지다 — 성은 규칙을 담고만 있는 것이 아니라 집행한다(enforces them). 2~3문단이 그 사례다. 첫 번째 보기는 저자가 명시적으로 반박한 독법(ornament)이므로 오답."
  },
  {
   "q": "According to paragraph 2, unreliable circulation benefits the school because it",
   "opts": [
    "encourages students to draw more accurate maps of the building",
    "forces the faculty to increase the number of nightly patrols",
    "reduces the amount of staff labor needed to supervise students",
    "makes restricted areas accessible only to the teaching staff"
   ],
   "ans": 2,
   "exp": "2문단 끝 문장: 경계를 구조가 유지하므로 아주 적은 교원이 노동 비용 거의 없이 감독한다. 순찰 증가는 본문이 부정한 내용(rather than by patrols)이라 오답."
  },
  {
   "q": "It can be inferred from paragraph 3 that if common rooms were placed close together,",
   "opts": [
    "students would need passwords more frequently than they do now",
    "the houses would lose some of their power to shape daily social life",
    "the castle would require a larger teaching staff to maintain order",
    "year groups would be dissolved as an organizing category"
   ],
   "ans": 1,
   "exp": "3문단은 거리와 암호 때문에 학년이 아니라 기숙사가 사교의 단위가 된다고 했다. 거리가 사라지면 그 효과가 약해진다는 추론이다. 학년 자체의 폐지는 본문이 말한 바가 아니므로 오답."
  },
  {
   "q": "In the last paragraph, the word audited is closest in meaning to",
   "opts": [
    "repaired",
    "inspected",
    "admired",
    "replaced"
   ],
   "ans": 1,
   "exp": "4문단 마지막 문장에서 성은 아무도 점검·검증한 적 없는 오래된 기계에 비유된다. 앞 문장의 cannot inspect와 호응한다. repaired(수리된)는 기계 비유에 끌리기 쉬우나 감사·점검의 뜻이 아니라 오답."
  }
 ]
},
{
 "id": "hp-diagonalley",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "도시·경제",
 "level": 4,
 "title": "A National Market Compressed into One Street",
 "topic": "다이애건 앨리의 업종 뒤섞임은 무질서가 아니라, 은폐 조건이 강제한 시장 압축의 결과다",
 "passage": "Commercial districts normally specialize. Over decades they sort themselves, banking gathering in one quarter and textiles in another. Diagon Alley, the principal retail street of magical Britain, shows no such sorting. A bookseller, an apothecary, a wand workshop, a menagerie, a bank, and an outfitter of school robes stand within a few hundred paces of one another. Read as an ordinary high street, this is an anomaly. Read as a national market compressed into a single corridor, it is precisely what one would predict.\n\nThe compression follows from concealment. Because the district must stay hidden from the surrounding non-magical city, it cannot expand outward. Any growth in demand has to be absorbed by the same frontage, which is why the upper storeys lean over the roadway and businesses are stacked rather than spread. Concentration also lowers the cost of enforcement. Sellers who trade beside their competitors and their customers are disciplined by observation, and reputation comes to substitute for the regulatory agency that this economy does not appear to maintain.\n\nThe open plaza before the goblin-run bank should be read as the district's civic center. It is the only public space in an otherwise narrow street, and because currency must be drawn there before it can be spent anywhere else, every shopping trip begins at the same point. Retail rents almost certainly fall with distance from that square.\n\nThe adjoining lane where disreputable goods are sold is often cited as proof that such self-regulation fails. That verdict may be premature. A market that funnels its illicit trade into one well-known turning has not lost control of it; it has zoned it. Whether the arrangement shields the ordinary shopper or merely keeps the trade conveniently placed for those who want it is not a question the street plan alone can settle.",
 "ko": "상업 지구는 보통 전문화된다. 수십 년에 걸쳐 스스로 분화하여 은행업은 한 구역에, 직물업은 다른 구역에 모인다. 마법 영국의 주요 소매 거리인 다이애건 앨리에는 그런 분화가 없다. 서점, 약재상, 지팡이 공방, 동물 가게, 은행, 그리고 교복 가게가 수백 걸음 안에 서 있다. 평범한 번화가로 읽으면 이는 이례다. 하나의 통로 안으로 압축된 전국 시장으로 읽으면, 이는 정확히 예측되는 바다.\n\n압축은 은폐에서 따라 나온다. 이 지구는 주변의 비마법 도시로부터 숨겨진 채로 있어야 하므로 바깥으로 확장할 수 없다. 수요의 증가는 무엇이든 같은 정면 폭 안에서 흡수되어야 하며, 그래서 위층들이 도로 위로 기울어져 나오고 업소들이 펼쳐지는 대신 쌓인다. 집중은 또한 단속 비용을 낮춘다. 경쟁자와 고객 옆에서 장사하는 판매자는 관찰에 의해 규율되며, 이 경제가 유지하고 있지 않은 것으로 보이는 규제 기관을 평판이 대신하게 된다.\n\n고블린이 운영하는 은행 앞의 트인 광장은 이 지구의 시민 중심으로 읽어야 한다. 그곳은 그 밖에는 좁기만 한 거리에서 유일한 공공 공간이며, 화폐를 다른 어디에서 쓰기 전에 반드시 거기서 인출해야 하므로 모든 쇼핑은 같은 지점에서 시작된다. 소매 임대료는 그 광장에서 멀어질수록 떨어질 것이 거의 확실하다.\n\n평판 나쁜 물건이 팔리는 인접 골목은 그런 자율 규제가 실패했다는 증거로 자주 인용된다. 그 판정은 성급할지도 모른다. 불법 거래를 잘 알려진 하나의 모퉁이로 몰아넣은 시장은 그 거래에 대한 통제를 잃은 것이 아니라 그것을 용도 지역으로 지정한 것이다. 그 배치가 평범한 손님을 보호하는지, 아니면 그저 그 거래를 원하는 이들에게 편리한 자리를 지켜 주는 것뿐인지는 거리 배치도만으로 결론 낼 수 있는 물음이 아니다.",
 "gloss": [
  {
   "w": "apothecary",
   "ko": "약재상, 조제 약방"
  },
  {
   "w": "anomaly",
   "ko": "이례, 변칙"
  },
  {
   "w": "concealment",
   "ko": "은폐, 숨김"
  },
  {
   "w": "frontage",
   "ko": "(건물의) 정면 폭, 도로에 면한 부분"
  },
  {
   "w": "substitute for",
   "ko": "~를 대신하다, 대체하다"
  },
  {
   "w": "disreputable",
   "ko": "평판이 나쁜, 떳떳하지 못한"
  },
  {
   "w": "premature",
   "ko": "성급한, 시기상조의"
  }
 ],
 "qs": [
  {
   "q": "What is the purpose of the passage?",
   "opts": [
    "To argue that the street's mixture of trades follows logically from its need to stay hidden",
    "To trace the history of magical commerce from its origins to the present day",
    "To compare magical retailing with the retailing of the surrounding city",
    "To recommend that the district expand beyond its current boundaries"
   ],
   "ans": 0,
   "exp": "1문단 끝에서 논지가 제시된다 — 압축된 전국 시장으로 보면 업종 혼재가 예측된다. 2문단이 그 원인으로 은폐를 든다. 역사 서술은 도입부의 배경 설명일 뿐 글의 목적이 아니라 오답."
  },
  {
   "q": "According to paragraph 2, why do the buildings lean over the roadway?",
   "opts": [
    "Because the surrounding city restricts the height of magical property",
    "Because growing demand must be absorbed without expanding outward",
    "Because narrow streets are easier for the goblins to defend",
    "Because rents are lowest at the far end of the street"
   ],
   "ans": 1,
   "exp": "2문단 두세 번째 문장 — 바깥으로 확장할 수 없어 같은 정면 폭 안에서 수요를 흡수하므로 위층이 도로로 기울고 업소가 쌓인다. 임대료 이야기는 3문단의 다른 논점이라 오답."
  },
  {
   "q": "Which of the following can be inferred about regulation in the district?",
   "opts": [
    "A formal inspectorate visits the shops at regular intervals",
    "Shopkeepers are policed mainly by the visibility of their conduct",
    "Goblins hold legal authority over the licensing of shops",
    "The district's rules are written down and posted publicly"
   ],
   "ans": 1,
   "exp": "2문단 끝 — 판매자는 관찰에 의해 규율되고 평판이 규제 기관을 대신한다고 했다. 규제 기관이 없어 보인다고 명시했으므로 공식 감독관 방문은 오답."
  },
  {
   "q": "The author's discussion of the adjoining lane suggests that",
   "opts": [
    "the district should be closed until the illicit trade is removed",
    "the lane proves that reputation-based discipline has broken down",
    "containment can be read either as control or as convenience",
    "the lane's goods are indistinguishable from those sold on the main street"
   ],
   "ans": 2,
   "exp": "4문단은 그 골목을 실패의 증거로 보는 견해를 소개한 뒤 판단을 유보한다 — 손님을 보호하는지, 거래를 편하게 해 주는지는 결론 낼 수 없다. 실패했다는 두 번째 보기는 저자가 성급하다고 한 견해라 오답."
  }
 ]
},
{
 "id": "hp-hogsmeade",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "지리·경제",
 "level": 4,
 "title": "A Village on the School's Calendar",
 "topic": "호그스미드는 자립 마을이 아니라 학교의 부속 경제권이며, 방문 허가 제도가 그 경제를 계절화한다",
 "passage": "Hogsmeade is routinely described as the only settlement in Britain inhabited entirely by witches and wizards, and the description invites us to treat it as a rare survival, an autonomous community that has outlasted the pressure to hide among ordinary neighbors. Autonomy, however, is a claim about economics rather than about population. Judged by what the village actually sells, Hogsmeade is better understood as a satellite of the school half a mile up the road.\n\nThe commercial inventory is revealing. A confectioner, a joke shop, a teashop courting couples, a stationer, and two public houses together describe a trade weighted heavily toward adolescent discretionary spending. A settlement serving only its permanent residents would not sustain competing sweet shops, nor a teashop whose decor is calculated for visitors who will come a handful of times a year. The proportions of the high street record who the customer is.\n\nThe permission regime then imposes a rhythm on that trade. Access is limited to students above a certain year, on a small number of announced weekends, and only on production of a signed consent form. The customer base therefore arrives in scheduled surges rather than in a steady flow, so revenue is not merely seasonal but calendared, set by an institution the shopkeepers do not control and cannot petition.\n\nIt could be objected that the village long predates the school in local tradition, and that a place with its own inn, post office, and burial ground is plainly more than a shopping annex. The objection is strong as history and weak as economics, since origin does not determine present dependence. What would genuinely test the argument is evidence of what the village does during the many weeks when no visit is scheduled, and on that point the record is nearly silent.",
 "ko": "호그스미드는 영국에서 마녀와 마법사만이 사는 유일한 정착지로 으레 소개되며, 그 설명은 우리로 하여금 이곳을 드문 잔존물로, 즉 평범한 이웃들 사이에 숨어야 한다는 압력을 견뎌 낸 자립 공동체로 다루게 만든다. 그러나 자립은 인구에 관한 주장이 아니라 경제에 관한 주장이다. 이 마을이 실제로 무엇을 파는가로 판단하면, 호그스미드는 길 위쪽 반 마일 거리에 있는 학교의 위성으로 이해하는 편이 낫다.\n\n상업 구성이 많은 것을 드러낸다. 과자점, 장난감 가게, 연인들의 환심을 사는 찻집, 문구점, 그리고 두 곳의 선술집은 다 함께 청소년의 재량 지출 쪽으로 크게 기운 상권을 그려 낸다. 상주 주민만을 상대하는 정착지라면 서로 경쟁하는 과자 가게 둘을 지탱할 수 없고, 일 년에 몇 번 오는 방문객에 맞춰 계산된 실내 장식의 찻집도 지탱할 수 없다. 번화가의 업종 비율이 누가 고객인지를 기록하고 있다.\n\n이어서 허가 제도가 그 상권에 리듬을 부과한다. 출입은 일정 학년 이상의 학생에게만, 사전에 공지된 소수의 주말에만, 그리고 서명된 동의서를 제출해야만 허용된다. 따라서 고객층은 꾸준한 흐름이 아니라 일정에 따른 급증의 형태로 도착하며, 수입은 단지 계절적인 것이 아니라 달력에 맞춰진 것이 된다. 상인들이 통제할 수도 청원할 수도 없는 기관이 그 달력을 정한다.\n\n이 마을이 지역 전승상 학교보다 훨씬 앞서 존재했고, 자체 여관과 우체국과 매장지를 가진 곳이라면 분명 쇼핑 부속 시설 이상이라는 반론이 제기될 수 있다. 그 반론은 역사로서는 강하고 경제학으로서는 약하다. 기원이 현재의 의존을 결정하지는 않기 때문이다. 이 주장을 진짜로 검증할 수 있는 것은 방문 일정이 없는 여러 주 동안 이 마을이 무엇을 하는가에 관한 증거인데, 바로 그 점에 대해 기록은 거의 침묵한다.",
 "gloss": [
  {
   "w": "settlement",
   "ko": "정착지, 취락"
  },
  {
   "w": "autonomous",
   "ko": "자립적인, 자율적인"
  },
  {
   "w": "satellite",
   "ko": "위성 도시, 부속 지역"
  },
  {
   "w": "discretionary spending",
   "ko": "재량 지출, 임의 소비"
  },
  {
   "w": "surge",
   "ko": "급증, 밀려듦"
  },
  {
   "w": "petition",
   "ko": "청원하다, 탄원하다"
  },
  {
   "w": "annex",
   "ko": "부속 건물, 부속 시설"
  }
 ],
 "qs": [
  {
   "q": "Which sentence best states the central claim of the passage?",
   "opts": [
    "Hogsmeade has preserved a purely magical population against outside pressure",
    "Hogsmeade's shops are too specialized to serve a general customer base",
    "Hogsmeade functions economically as a dependency of the nearby school",
    "Hogsmeade's history explains why its buildings are arranged as they are"
   ],
   "ans": 2,
   "exp": "1문단 마지막 문장이 논지다 — 이 마을은 학교의 위성으로 이해하는 편이 낫다. 순수 마법사 인구는 저자가 인구에 관한 주장일 뿐이라며 밀어 둔 통념이라 오답."
  },
  {
   "q": "According to paragraph 2, what does the mix of shops indicate?",
   "opts": [
    "That most trade depends on young visitors rather than residents",
    "That the village attracts tourists from the non-magical world",
    "That local residents prefer sweets to other goods",
    "That the shops were built at widely different periods"
   ],
   "ans": 0,
   "exp": "2문단 — 업종 구성이 청소년 재량 지출로 크게 기울어 있고, 상주 주민만으로는 경쟁하는 과자 가게 둘을 못 버틴다고 했다. 비마법 세계 관광객은 본문에 없는 내용이라 오답."
  },
  {
   "q": "The word calendared in paragraph 3 most nearly means",
   "opts": [
    "recorded in the village archives",
    "fixed by an externally set schedule",
    "spread evenly through the year",
    "announced only at short notice"
   ],
   "ans": 1,
   "exp": "3문단에서 수입이 단지 계절적인 것이 아니라 calendared라고 한 뒤, 상인들이 통제할 수 없는 기관이 그 달력을 정한다고 이어진다. 균등 분포는 급증(surges)과 정반대라 오답."
  },
  {
   "q": "All of the following are mentioned as facts about Hogsmeade EXCEPT",
   "opts": [
    "it has a post office and a burial ground",
    "students need written consent to visit it",
    "visits are permitted only on certain weekends",
    "its shopkeepers vote on the school's visit schedule"
   ],
   "ans": 3,
   "exp": "우체국·매장지는 4문단, 동의서와 지정 주말은 3문단에 나온다. 반면 3문단은 상인들이 그 일정에 청원조차 할 수 없다고 명시하므로 네 번째 보기가 정답(언급되지 않은 것)이다."
  }
 ]
},
{
 "id": "hp-express",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "교통·사회",
 "level": 3,
 "title": "One Train for Everyone: Transport as Ritual",
 "topic": "호그와트 급행은 비효율적 운송 수단이지만, 바로 그 비효율이 학년 전체를 하나의 집단으로 만든다",
 "passage": "Transport systems are usually judged by efficiency. The Hogwarts Express fails that test on purpose. There is one train, one departure, and one day of service each term, reached through a barrier on a London platform that most travelers cannot perceive. Students who could plainly travel by fireplace network, or under supervised escort, are nonetheless routed onto the same carriages. The redundancy is the point. The journey is not primarily a way of moving students; it is a way of assembling them.\n\nThe barrier performs the work of a threshold rite. Passage is unremarkable to those who already know the trick, invisible to those who do not, and, once made, effectively irreversible for the day. What lies on the other side is a cohort. Everyone arrives together, in the same order, after identical hours spent in a carriage that mixes years and houses before the sorting ceremony has divided anybody. Alliances and antagonisms formed on the journey therefore precede every institutional label the school will later attach.\n\nThe interior layout matters as much as the schedule. Compartments, unlike open carriages, create dozens of semi-private rooms whose doors any passer-by may slide open, so that sociability is neither compelled nor prevented but continually negotiated. A trolley moving along the corridor supplies a small internal economy of sweets, and the hours are among the few in the school year that pass without adult supervision.\n\nOne might reply that the train is merely an inherited artifact, a nineteenth-century machine retained through institutional inertia. Inertia does explain why the vehicle is a steam locomotive rather than something faster. It does not explain why the trip is effectively compulsory for students who have other means. Yet no record of a deliberate decision survives, and inferring purpose from consequence remains the weaker form of argument.",
 "ko": "운송 체계는 보통 효율로 평가된다. 호그와트 급행은 일부러 그 시험에 낙제한다. 열차는 하나, 출발은 한 번, 학기당 운행일은 하루이며, 대부분의 여행자가 지각하지 못하는 런던 승강장의 장벽을 통해 도달한다. 벽난로 연결망으로도, 감독을 동반한 인솔로도 분명히 이동할 수 있는 학생들이 그럼에도 같은 객차로 몰린다. 그 중복이야말로 핵심이다. 이 여정은 일차적으로 학생을 옮기는 방법이 아니라 학생을 한데 모으는 방법이다.\n\n장벽은 문턱 의례의 기능을 수행한다. 통과는 이미 요령을 아는 이에게는 대수롭지 않고, 모르는 이에게는 보이지 않으며, 일단 통과하고 나면 그날 하루는 사실상 되돌릴 수 없다. 반대편에 있는 것은 하나의 집단이다. 모두가 함께, 같은 순서로, 기숙사 배정식이 누구도 나누기 전에 학년과 기숙사를 뒤섞는 객차에서 똑같은 시간을 보낸 뒤 도착한다. 따라서 이 여정에서 맺어진 동맹과 반목은 학교가 나중에 붙이게 될 모든 제도적 이름표보다 앞선다.\n\n내부 배치는 시간표만큼이나 중요하다. 개방형 객차와 달리 칸막이 객실은 지나가는 누구라도 문을 밀어 열 수 있는 반쯤 사적인 방을 수십 개 만들어 내며, 그리하여 사교는 강제되지도 차단되지도 않은 채 끊임없이 협상된다. 통로를 따라 움직이는 수레는 사탕을 둘러싼 작은 내부 경제를 공급하고, 그 시간은 학년 중 어른의 감독 없이 흘러가는 몇 안 되는 시간에 속한다.\n\n이 열차는 그저 물려받은 유물, 즉 제도적 관성으로 유지된 19세기 기계일 뿐이라는 반론이 있을 수 있다. 관성은 그 탈것이 더 빠른 무엇이 아니라 증기 기관차인 이유를 설명해 준다. 그러나 다른 이동 수단이 있는 학생에게도 이 여행이 사실상 의무인 이유는 설명하지 못한다. 그럼에도 의도적 결정에 관한 기록은 남아 있지 않으며, 결과로부터 목적을 추론하는 것은 여전히 더 약한 논증 방식으로 남는다.",
 "gloss": [
  {
   "w": "redundancy",
   "ko": "중복, 여분"
  },
  {
   "w": "threshold rite",
   "ko": "문턱 의례, 통과 의례"
  },
  {
   "w": "cohort",
   "ko": "(같은 시기에 속한) 집단, 동기 집단"
  },
  {
   "w": "antagonism",
   "ko": "반목, 적대"
  },
  {
   "w": "compartment",
   "ko": "칸막이 객실"
  },
  {
   "w": "inertia",
   "ko": "관성, 타성"
  },
  {
   "w": "compulsory",
   "ko": "의무적인, 강제적인"
  }
 ],
 "qs": [
  {
   "q": "The passage is mainly concerned with",
   "opts": [
    "explaining why steam locomotives outperform magical travel",
    "describing the layout of a nineteenth-century railway carriage",
    "arguing that an inefficient journey serves a social function",
    "comparing several methods of magical transportation in detail"
   ],
   "ans": 2,
   "exp": "1문단 끝 — 여정은 학생을 옮기는 방법이 아니라 모으는 방법이라는 논지가 제시되고, 2~3문단이 그 사회적 기능을 설명한다. 증기 기관차는 4문단에서 관성의 예로만 잠깐 나오므로 오답."
  },
  {
   "q": "According to paragraph 2, why do relationships formed on the train matter?",
   "opts": [
    "They are formed before the school assigns students to houses",
    "They are supervised more closely than later friendships",
    "They determine which carriage a student may use next term",
    "They are recorded by the staff for administrative purposes"
   ],
   "ans": 0,
   "exp": "2문단 — 객차는 배정식 이전에 학년과 기숙사를 뒤섞고, 그래서 그 관계는 제도적 이름표보다 앞선다. 3문단이 이 시간을 감독 없는 시간이라 했으므로 감독 강화는 오답."
  },
  {
   "q": "What does the author suggest about compartments as opposed to open carriages?",
   "opts": [
    "They make it impossible for students to avoid one another",
    "They allow students to control social contact without eliminating it",
    "They were chosen because they are cheaper to maintain",
    "They keep each house strictly separated during the journey"
   ],
   "ans": 1,
   "exp": "3문단 — 문을 누구나 열 수 있는 반쯤 사적인 방이라 사교가 강제되지도 차단되지도 않고 협상된다고 했다. 접촉을 피할 수 없다는 첫 보기는 neither compelled의 정반대라 오답."
  },
  {
   "q": "In the final paragraph, the author concedes that",
   "opts": [
    "the train is faster than any alternative available to students",
    "there is no surviving evidence of a deliberate decision to require the trip",
    "institutional inertia fully accounts for the trip being compulsory",
    "students are permitted to arrive by fireplace network instead"
   ],
   "ans": 1,
   "exp": "4문단 마지막 문장에서 의도적 결정의 기록이 없다고 인정하며 판단을 유보한다. 관성이 의무성까지 설명한다는 세 번째 보기는 저자가 바로 앞 문장에서 부정했으므로 오답."
  }
 ]
},
{
 "id": "hp-gringotts",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "금융·제도",
 "level": 4,
 "title": "Custody Without Credit: The Goblin Bank",
 "topic": "그린고츠는 예금·대출을 하는 은행이 아니라 보관소이며, 그 구조가 종족 간 권력 관계를 드러낸다",
 "passage": "A modern bank is defined less by its vaults than by its ledgers. It accepts deposits, lends against them, and earns the difference between the two rates. Gringotts, by every available indication, does none of this. There is no sign of interest paid to depositors, of loans extended to merchants, or of ordinary credit creation. What the institution supplies is custody: the physical retention of objects placed miles below the surface, returned intact to whoever can prove entitlement. It is therefore not a bank in the economist's sense but a fortified warehouse that has acquired the vocabulary of banking.\n\nThe custody model explains the architecture. Vaults are reached by cart along underground track and graded by depth and by the severity of what guards them; the deepest are held by a dragon and by enchantments that punish intrusion rather than merely obstruct it. Depth therefore works as a pricing signal, and a client's standing can be read off the number of his vault.\n\nThe institution's most striking feature is who runs it. Goblins staff and direct the bank, while wizards, who dominate every other institution, hand their gold to a people they bar from wand ownership and from most public office. This is usually explained by goblin skill in metalwork and by a reputation for incorruptible bookkeeping.\n\nIt would be too tidy to conclude that the goblins are merely servants of a wizarding order. Control of the only vault system in the country is leverage of a serious kind, and the long quarrel over who truly owns goblin-made objects suggests that both sides regard the account as unsettled. What the record does not reveal is whether a goblin clerk could refuse a wizarding client outright, and until that is known the balance of power underground remains a matter of inference.",
 "ko": "현대의 은행은 금고실보다 장부에 의해 규정된다. 예금을 받고, 그것을 담보 삼아 대출하며, 두 이율의 차액을 번다. 확인 가능한 모든 정황으로 볼 때 그린고츠는 이 중 어느 것도 하지 않는다. 예금자에게 지급되는 이자도, 상인에게 나가는 대출도, 통상적인 신용 창출도 흔적이 없다. 이 기관이 공급하는 것은 보관이다. 지표 아래 수 마일에 놓인 물건을 물리적으로 붙들어 두었다가 권리를 입증할 수 있는 이에게 온전히 돌려주는 일이다. 따라서 이곳은 경제학자가 말하는 의미의 은행이 아니라, 은행의 어휘를 획득한 요새화된 창고다.\n\n보관 모형이 그 건축을 설명한다. 금고는 지하 궤도를 따라 수레로 도달하며 깊이와 그것을 지키는 것의 혹독함에 따라 등급이 매겨진다. 가장 깊은 곳은 용이, 그리고 침입을 단지 막는 것이 아니라 응징하는 마법이 지킨다. 그러므로 깊이는 가격 신호로 작동하며, 고객의 금고 번호에서 그 사람의 지위를 읽어 낼 수 있다.\n\n이 기관의 가장 두드러진 특징은 누가 그것을 운영하는가이다. 고블린이 은행에 인력을 대고 지휘하는 반면, 다른 모든 제도를 지배하는 마법사들은 자신들이 지팡이 소유와 대부분의 공직에서 배제해 온 종족에게 금을 맡긴다. 이는 대개 고블린의 금속 세공 기술과 매수되지 않는 장부 기록이라는 평판으로 설명된다.\n\n그러나 그렇다고 고블린이 마법사 질서의 하인일 뿐이라고 결론짓는 것은 지나치게 깔끔하다. 나라에서 유일한 금고 체계를 통제한다는 것은 진지한 종류의 지렛대이며, 고블린이 만든 물건을 진정 누가 소유하는가를 둘러싼 오랜 다툼은 양측 모두 그 셈이 아직 끝나지 않았다고 여긴다는 것을 시사한다. 기록이 밝혀 주지 않는 것은 고블린 직원이 마법사 고객을 정면으로 거절할 수 있는가이며, 그것이 알려지기 전까지 지하의 권력 균형은 추론의 문제로 남는다.",
 "gloss": [
  {
   "w": "ledger",
   "ko": "회계 장부, 원장"
  },
  {
   "w": "custody",
   "ko": "보관, 관리 책임"
  },
  {
   "w": "entitlement",
   "ko": "(정당한) 권리, 자격"
  },
  {
   "w": "fortified",
   "ko": "요새화된, 방비를 갖춘"
  },
  {
   "w": "obstruct",
   "ko": "막다, 방해하다"
  },
  {
   "w": "incorruptible",
   "ko": "매수되지 않는, 청렴한"
  },
  {
   "w": "leverage",
   "ko": "영향력, 지렛대 힘"
  }
 ],
 "qs": [
  {
   "q": "The author's main purpose in the first paragraph is to",
   "opts": [
    "describe the physical descent to the lowest vaults",
    "show that the institution lacks the defining functions of a bank",
    "praise the security arrangements protecting depositors",
    "explain how interest rates are set in the magical economy"
   ],
   "ans": 1,
   "exp": "1문단은 현대 은행의 정의(예금·대출·차액)를 제시한 뒤 그린고츠가 그중 무엇도 하지 않는다고 하며, 보관소라는 재규정으로 끝난다. 하강 묘사는 2문단의 세부 사항이므로 오답."
  },
  {
   "q": "According to paragraph 2, the depth of a vault indicates",
   "opts": [
    "how long the contents have been stored there",
    "how far the cart track has been extended underground",
    "the social and financial standing of its owner",
    "the age of the enchantments protecting it"
   ],
   "ans": 2,
   "exp": "2문단 마지막 문장 — 깊이는 가격 신호로 작동하고 금고 번호에서 지위를 읽을 수 있다. 궤도 연장은 본문에 없는 내용이라 오답."
  },
  {
   "q": "Which of the following is NOT presented in the passage as true of Gringotts?",
   "opts": [
    "It is staffed and directed by goblins",
    "It returns stored property to those who can prove entitlement",
    "It grades its vaults by depth",
    "It lends money to merchants at interest"
   ],
   "ans": 3,
   "exp": "고블린 운영은 3문단, 권리 입증 후 반환과 등급 매김은 1~2문단에 있다. 반면 1문단은 상인 대출의 흔적이 없다고 명시하므로 네 번째 보기가 정답."
  },
  {
   "q": "What can be inferred from the last paragraph about the relationship between goblins and wizards?",
   "opts": [
    "The dispute over ownership has been formally settled in the wizards' favor",
    "Goblins have quietly gained control of most wizarding institutions",
    "The goblins' position is stronger than their exclusion from office suggests",
    "Wizards are preparing to remove goblins from the bank's management"
   ],
   "ans": 2,
   "exp": "4문단은 유일한 금고 체계의 통제가 진지한 지렛대라며 고블린이 단순한 하인이라는 결론을 거부한다. 다만 다툼이 아직 끝나지 않았다고 했으므로 마법사에게 유리하게 종결되었다는 첫 보기는 오답."
  }
 ]
},
{
 "id": "hp-ministry",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "제도·정치",
 "level": 4,
 "title": "The Architecture of an Unelected Administration",
 "topic": "마법부는 왜 감시받지 않는가 — 지하 청사, 부서 구조, 그리고 언론의 연성 포섭",
 "passage": "The Ministry of Magic occupies a peculiar position in the study of governance: it is a national administration that no citizen elects and no external body audits. Its Minister is selected through consultation among senior officials and influential families, a process that resembles cooptation more than election. Because the magical population is small, the distance between the governed and the governing is short, and this proximity is often mistaken for accountability. Familiarity, however, is not representation.\n\nThe Ministry's physical design reinforces the ambiguity. The building is buried beneath a city that cannot see it, entered through disguised thresholds, and divided into departments whose names announce a function while obscuring the extent of their power. One department decides which beings possess legal personality; another conducts research that is exempt from disclosure by definition. Such an arrangement concentrates discretionary authority in offices that answer to one another rather than to any public.\n\nPress relations complete the structure. The Ministry does not own the principal newspaper outright, yet it supplies the paper with stories, reviews its corrections, and can render a persistent critic unemployable. Scholars of authoritarian administration call this soft capture: formal censorship becomes unnecessary once the incentives of editors align with the interests of officials. The result is a readership that is informed continuously and misinformed systematically.\n\nSome interpreters argue that the apparatus is defensible, since secrecy from the non-magical world is a genuine security requirement rather than a pretext, and an administration facing emergencies must act faster than deliberation allows. The objection has force. Yet the same machinery that concealed the community from outsiders was later turned inward against its own members with almost no modification, and no institution obstructed the conversion. A structure that can be repurposed so smoothly was never merely defensive.",
 "ko": "마법부는 통치 연구에서 독특한 위치를 차지한다. 어떤 시민도 선출하지 않고 어떤 외부 기구도 감사하지 않는 국가 행정기관인 것이다. 장관은 고위 관료와 영향력 있는 가문들 사이의 협의로 정해지는데, 이는 선거보다 내부 발탁에 가까운 과정이다. 마법사 인구가 적기 때문에 통치받는 자와 통치하는 자 사이의 거리가 짧고, 이 가까움은 흔히 책임성으로 오인된다. 그러나 친밀함은 대표성이 아니다.\n\n마법부의 물리적 설계는 이 모호함을 강화한다. 청사는 그것을 볼 수 없는 도시의 지하에 묻혀 있고, 위장된 출입구를 통해 들어가며, 이름은 기능을 알리되 권한의 범위는 가리는 부서들로 나뉘어 있다. 한 부서는 어떤 존재가 법적 인격을 갖는지를 결정하고, 다른 부서는 정의상 공개 대상에서 면제된 연구를 수행한다. 이런 구조는 어떤 공중이 아니라 서로에게만 답하는 관청들에 재량적 권한을 집중시킨다.\n\n언론과의 관계가 이 구조를 완성한다. 마법부가 주요 신문을 직접 소유하지는 않지만, 기사거리를 공급하고 정정 보도를 검토하며 끈질긴 비판자를 취업 불가 상태로 만들 수 있다. 권위주의 행정 연구자들은 이를 연성 포섭이라 부른다. 편집자의 이해관계가 관료의 이익과 일치하는 순간 공식적 검열은 불필요해진다. 그 결과는 끊임없이 정보를 제공받으면서 체계적으로 오도되는 독자층이다.\n\n어떤 해석자들은 이 장치가 옹호될 수 있다고 본다. 비마법 세계로부터의 비밀 유지는 구실이 아니라 실제 안보 요건이며, 비상사태에 직면한 행정부는 숙의가 허용하는 것보다 빠르게 움직여야 한다는 것이다. 이 반론에는 힘이 있다. 그러나 공동체를 외부인으로부터 감췄던 바로 그 기계장치가 나중에는 거의 개조 없이 내부 구성원을 향해 돌려졌고, 어떤 기관도 그 전환을 막지 못했다. 그렇게 매끄럽게 용도를 바꿀 수 있었던 구조라면 애초에 단지 방어적이기만 했던 적은 없다.",
 "gloss": [
  {
   "w": "cooptation",
   "ko": "(선거 없이) 내부에서 사람을 끌어들여 자리를 채움, 발탁·포섭"
  },
  {
   "w": "proximity",
   "ko": "가까움, 근접성"
  },
  {
   "w": "discretionary authority",
   "ko": "재량적 권한(판단에 따라 자유로이 행사하는 권한)"
  },
  {
   "w": "exempt from disclosure",
   "ko": "공개 의무에서 면제된"
  },
  {
   "w": "soft capture",
   "ko": "연성 포섭(강제 없이 이해관계를 일치시켜 장악함)"
  },
  {
   "w": "unemployable",
   "ko": "(누구도 고용하지 않아) 취업할 수 없는"
  },
  {
   "w": "repurposed",
   "ko": "본래 용도와 다른 목적으로 전용된"
  }
 ],
 "qs": [
  {
   "q": "What is the main point of the passage?",
   "opts": [
    "The Ministry is inefficient because it is located underground and is difficult for citizens to reach.",
    "The Ministry's selection process, departmental design, and press relations concentrate authority in offices that answer to no public.",
    "The Ministry should be replaced by an elected legislature modeled on non-magical governments.",
    "The Ministry's secrecy is entirely justified by the need to hide magic from the non-magical world."
   ],
   "ans": 1,
   "exp": "1문단 첫 문장(선출도 감사도 없는 행정기관)과 2·3문단이 각각 청사·부서 구조와 언론 관계를 들어 같은 결론으로 수렴한다. 3번은 4문단에서 저자가 그 정당화를 인정하되 결국 기각하므로 오답이다."
  },
  {
   "q": "According to paragraph 2, what is notable about the department that conducts research?",
   "opts": [
    "It employs more staff than any other department in the building.",
    "It reports directly to the non-magical government.",
    "It is the only department located above ground.",
    "Its research is exempt from disclosure as a matter of definition."
   ],
   "ans": 3,
   "exp": "2문단 '정의상 공개 대상에서 면제된 연구를 수행한다'가 그대로 근거다. 1번의 인원 규모는 본문에 전혀 언급되지 않은 정보다."
  },
  {
   "q": "In paragraph 3, the phrase soft capture refers to a situation in which",
   "opts": [
    "formal censorship is unnecessary because editors already share officials' interests",
    "a government purchases a newspaper and installs its own editors",
    "reporters are physically prevented from entering government buildings",
    "readers voluntarily stop reading the official newspaper"
   ],
   "ans": 0,
   "exp": "3문단은 이 용어를 곧바로 콜론 뒤에서 정의한다. 편집자의 유인이 관료의 이익과 일치하면 검열이 필요 없어진다는 것. 2번(신문 매입)은 본문이 명시적으로 부정한 내용이라 매력적이지만 틀렸다."
  },
  {
   "q": "It can be inferred from the final paragraph that the author",
   "opts": [
    "believes emergency powers are always illegitimate regardless of circumstances",
    "accepts the security justification but finds it insufficient because the apparatus was easily turned inward",
    "thinks the Ministry's critics have misunderstood the purpose of secrecy statutes",
    "holds that no institution existed that could have obstructed the conversion"
   ],
   "ans": 1,
   "exp": "4문단은 '반론에는 힘이 있다'로 정당화를 일부 수용한 뒤 Yet 이하에서 내부로 전용된 사실을 들어 판단을 뒤집는다. 1번처럼 비상 권한 전체를 부정하는 강한 주장은 본문 범위를 넘는다."
  }
 ]
},
{
 "id": "hp-azkaban",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "형벌·윤리",
 "level": 4,
 "title": "Punishment, Memory, and the Sentence That Does Not End",
 "topic": "아즈카반의 형벌은 신체가 아니라 기억을 박탈한다 — 그래서 형기가 끝나도 형벌은 끝나지 않는다",
 "passage": "Penal theory classifies punishments by what they take from the offender: money, liberty, time, or life. The island fortress of Azkaban takes something rarely itemized. It confines prisoners physically, as any prison does, but its distinguishing feature is the class of guards stationed there, whose presence drains a person's capacity to recall anything except despair. A sentence measured in years therefore operates on a register entirely different from ordinary incarceration.\n\nThe distinction matters because memory is not simply a possession that can be returned. It is the medium through which a person sustains a continuous identity and, consequently, the medium through which any moral reckoning could occur. Retributive justifications require an offender who understands what was done and can hold it in mind; rehabilitative justifications require someone able to imagine an altered future. A regime that erodes recollection disables both at once. What remains is incapacitation, and incapacitation that outlasts release, since former prisoners are described as hollowed rather than corrected.\n\nThe legal machinery surrounding the fortress compounds the difficulty. Committals have been made without trial, on ministerial authority, during periods declared emergencies; in at least one case a prisoner spent over a decade inside before anyone examined the file. Where the punishment itself degrades the faculties needed to contest a conviction, the ordinary safeguard of appeal becomes a formality that the punished are least equipped to invoke.\n\nA defender might reply that the community faced adversaries who could not be held by ordinary walls, and that these guards were the only custodians reliable enough for the task. The argument is not trivial. Still, the arrangement long outlived the emergency that produced it, and the guards eventually transferred their allegiance to the very faction they had been employed to contain. An instrument capable of changing sides was never truly under control.",
 "ko": "형벌 이론은 보통 범죄자에게서 무엇을 빼앗는가에 따라 형벌을 분류한다. 돈, 자유, 시간, 혹은 생명이다. 섬의 요새 아즈카반은 좀처럼 항목으로 정리되지 않는 무언가를 빼앗는다. 이곳은 다른 감옥처럼 수감자를 물리적으로 가두지만, 그 특징은 그곳에 배치된 간수 부류에 있다. 그들의 존재 자체가 절망 이외의 것을 기억하는 능력을 사람에게서 빨아낸다. 따라서 형식상 연 단위로 측정되는 형기는 보통의 구금과는 완전히 다른 차원에서 작동한다.\n\n이 구분이 중요한 이유는 기억이 돌려줄 수 있는 단순한 소유물이 아니기 때문이다. 기억은 한 사람이 연속된 정체성을 유지하는 매개이며, 따라서 어떤 도덕적 청산이든 그것이 이루어질 수 있는 매개이기도 하다. 응보적 정당화는 자신이 한 일을 이해하고 마음에 붙들어 둘 수 있는 범죄자를 요구하고, 교화적 정당화는 달라진 미래를 상상할 수 있는 사람을 요구한다. 기억을 침식하는 체제는 이 둘을 동시에 무력화한다. 남는 것은 무력화(격리)뿐이며, 그것도 출소 이후까지 지속되는 무력화다. 출소자들은 교정된 것이 아니라 속이 비워졌다고 묘사되기 때문이다.\n\n이 요새를 둘러싼 법적 장치는 문제를 가중시킨다. 비상사태로 선포된 시기에 장관의 권한으로 재판 없이 수감이 이루어진 적이 있고, 적어도 한 사례에서는 누군가 서류를 들여다보기까지 수감자가 십 년 넘게 안에 있었다. 형벌 자체가 유죄판결에 다투는 데 필요한 능력을 훼손하는 곳에서는, 항소라는 통상의 안전장치가 정작 처벌받은 자들이 가장 활용하기 어려운 형식으로 전락한다.\n\n옹호자는 이렇게 답할 수 있다. 공동체는 보통의 담장으로는 가둘 수 없는 적들과 맞섰고, 그 임무를 맡길 만큼 믿을 만한 간수는 그들뿐이었다고. 사소한 논변은 아니다. 그럼에도 이 체제는 그것을 낳은 비상사태보다 훨씬 오래 존속했고, 간수들은 결국 자신들이 억누르도록 고용되었던 바로 그 세력에게 충성을 옮겼다. 편을 바꿀 수 있는 도구는 애초에 통제되고 있었던 적이 없다.",
 "gloss": [
  {
   "w": "itemized",
   "ko": "항목별로 열거된, 세목으로 정리된"
  },
  {
   "w": "incarceration",
   "ko": "구금, 투옥"
  },
  {
   "w": "retributive",
   "ko": "응보적인(범죄에 상응하는 응징을 목적으로 하는)"
  },
  {
   "w": "incapacitation",
   "ko": "무력화, 범행 능력 제거(격리형의 목적)"
  },
  {
   "w": "committals",
   "ko": "수감 처분, 구금 명령"
  },
  {
   "w": "safeguard",
   "ko": "안전장치, 보호 수단"
  },
  {
   "w": "allegiance",
   "ko": "충성, 귀속"
  }
 ],
 "qs": [
  {
   "q": "What is the author's primary purpose in the passage?",
   "opts": [
    "To compare the physical design of Azkaban with that of non-magical prisons",
    "To recommend a specific reform of the sentencing statutes used by the Ministry",
    "To argue that Azkaban punishes by attacking memory, which undermines the standard justifications for punishment",
    "To describe the daily routine endured by prisoners held on the island"
   ],
   "ans": 2,
   "exp": "1문단이 '드물게 항목화되는 것을 빼앗는다'로 논점을 열고 2문단이 응보·교화 정당화가 무너지는 이유를 전개한다. 1번은 배경 정보일 뿐 글의 목적이 아니다."
  },
  {
   "q": "According to paragraph 2, retributive and rehabilitative justifications both fail at Azkaban because",
   "opts": [
    "each depends on mental capacities that the prison itself erodes",
    "neither has ever been accepted by wizarding courts",
    "the sentences imposed are too short to have any effect",
    "prisoners are released before their sentences are complete"
   ],
   "ans": 0,
   "exp": "2문단은 응보는 이해하고 붙들 수 있는 자를, 교화는 다른 미래를 상상할 수 있는 자를 요구한다고 한 뒤 기억 침식이 둘을 동시에 무력화한다고 말한다. 3번은 오히려 본문의 '형기보다 오래 지속되는' 서술과 반대다."
  },
  {
   "q": "All of the following are presented as problems with Azkaban EXCEPT",
   "opts": [
    "prisoners have been committed without any trial",
    "the punishment damages the abilities needed to appeal",
    "the guards later changed the side they served",
    "the island is too remote for families of prisoners to visit"
   ],
   "ans": 3,
   "exp": "재판 없는 수감(3문단), 항소 능력 훼손(3문단), 간수의 변절(4문단)은 모두 언급된다. 면회 거리 문제는 본문에 전혀 나오지 않는다."
  },
  {
   "q": "Which of the following can be inferred from the final paragraph?",
   "opts": [
    "The author believes the guards should have been given better working conditions",
    "The author treats the guards' defection as evidence that the arrangement was never genuinely controlled",
    "The author denies that the community ever faced dangerous adversaries",
    "The author expects the fortress to be closed within a generation"
   ],
   "ans": 1,
   "exp": "마지막 문장 '편을 바꿀 수 있는 도구는 통제되고 있었던 적이 없다'가 근거다. 2번은 저자가 '사소한 논변은 아니다'라며 위협의 실재를 인정했으므로 틀렸다."
  }
 ]
},
{
 "id": "hp-forest",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "주권·경계",
 "level": 4,
 "title": "Sovereignty at the Edge of the School Grounds",
 "topic": "금지된 숲의 자치는 권리가 아니라 묵인이다 — 사실상의 주권과 법적 부인 사이",
 "passage": "Legal geographers distinguish between territory that a state governs and territory that a state merely borders. The woodland adjoining the wizarding school belongs, awkwardly, to the second category. It lies inside the boundaries drawn on institutional maps, is named in school regulations as out of bounds, and is nonetheless inhabited by communities that neither the school nor the Ministry administers. The prohibition on student entry is therefore less a rule of discipline than an admission of limited reach.\n\nThe centaur population makes the anomaly explicit. Centaur society maintains its own deliberative body, its own criteria for membership, and its own doctrine restricting interference in others' affairs. It does not petition the Ministry for permission, and it treats human officials who enter as trespassers rather than as superiors. By any functional test of statehood, namely internal law, control of territory, and the capacity to exclude, this is a polity. Yet the Ministry's classification scheme registers centaurs not as a people but as creatures, a category assigned by an office whose mandate is regulation rather than diplomacy. Sovereignty is exercised in fact and denied in law.\n\nThe denial is not costless. Because the arrangement rests on forbearance rather than treaty, it may be revoked whenever the forbearing party finds it inconvenient, and gives the forest's inhabitants no forum in which to lodge a claim. Autonomy that depends on being ignored is a fragile possession.\n\nOne might object that the centaurs themselves refuse recognition, declining alliances and rejecting the vocabulary of citizenship, and that a status nobody has requested can hardly be said to be withheld. The point is fair as far as it goes. But a refusal made under a classification one did not choose is difficult to read as consent, and the forest's boundary has always been drawn and maintained by the stronger party.",
 "ko": "법지리학자들은 국가가 통치하는 영역과 국가가 단지 접경할 뿐인 영역을 구분한다. 마법학교에 인접한 숲은 어색하게도 두 번째 범주에 속한다. 그곳은 기관의 지도에 그려진 경계 안에 있고, 학교 규정에는 출입 금지 구역으로 명시되어 있으며, 그럼에도 학교도 마법부도 실효적으로 관리하지 못하는 공동체들이 거주하고 있다. 따라서 학생 출입 금지는 규율 규칙이라기보다 통치가 미치는 범위의 한계를 인정한 것에 가깝다.\n\n켄타우로스 집단은 이 변칙을 뚜렷하게 드러낸다. 켄타우로스 사회는 자체 심의 기구, 자체 성원 자격 기준, 그리고 타자의 일에 개입하는 것을 제한하는 자체 원칙을 유지한다. 그들은 마법부에 허가를 청원하지 않으며, 숲에 들어오는 인간 관리를 상급자가 아니라 무단 침입자로 대한다. 국가성의 기능적 기준, 즉 내부 법, 영역에 대한 통제, 배제할 수 있는 능력 어느 것으로 보아도 이것은 하나의 정치체다. 그런데 마법부의 분류 체계는 켄타우로스를 하나의 민족이 아니라 생물로 등재하며, 이 범주는 외교가 아니라 규제를 소관으로 하는 관청이 부여한 것이다. 주권은 사실상 행사되면서 법적으로는 부인된다.\n\n이 부인은 대가가 없지 않다. 이 상태는 조약이 아니라 묵인에 기대고 있으므로, 묵인하는 쪽이 불편해지는 순간 언제든 철회될 수 있고, 숲의 거주자들에게는 이의를 제기할 어떤 절차도 주어지지 않는다. 무시당하는 데 의존하는 자치는 취약한 소유물이다.\n\n켄타우로스 스스로가 인정을 거부하고 동맹을 사양하며 시민권이라는 어휘를 거절하므로, 아무도 요구한 적 없는 지위를 박탈했다고 말하기는 어렵다는 반론이 가능하다. 그 지적은 거기까지는 타당하다. 그러나 자신이 선택하지 않은 분류 아래에서 이루어진 거절을 동의로 읽기는 어렵고, 숲의 경계는 언제나 더 강한 쪽이 긋고 유지해 왔다.",
 "gloss": [
  {
   "w": "adjoining",
   "ko": "인접한, 맞닿아 있는"
  },
  {
   "w": "out of bounds",
   "ko": "출입 금지 구역인"
  },
  {
   "w": "deliberative body",
   "ko": "심의 기구, 합의체"
  },
  {
   "w": "trespassers",
   "ko": "무단 침입자"
  },
  {
   "w": "polity",
   "ko": "정치체, 정치 공동체"
  },
  {
   "w": "forbearance",
   "ko": "(권리 행사를) 삼감, 묵인"
  },
  {
   "w": "lodge a claim",
   "ko": "이의·청구를 제기하다"
  }
 ],
 "qs": [
  {
   "q": "Which of the following best states the central claim of the passage?",
   "opts": [
    "The forest is dangerous and school rules correctly forbid students from entering it.",
    "Centaurs would be better protected if they accepted Ministry citizenship immediately.",
    "The Ministry lacks the resources to patrol a woodland of that size.",
    "The forest functions as a self-governing polity whose sovereignty is exercised in fact but denied in law."
   ],
   "ans": 3,
   "exp": "2문단 마지막 문장이 논점을 압축한다. 1번은 출입 금지 규정을 언급하지만, 본문은 그것을 위험 경고가 아니라 통치 범위의 한계로 재해석한다."
  },
  {
   "q": "According to paragraph 2, the author calls centaur society a polity on the basis of",
   "opts": [
    "its long history and its oral traditions",
    "internal law, control of territory, and the capacity to exclude outsiders",
    "a treaty signed with the school many centuries ago",
    "the number of its members relative to the human population"
   ],
   "ans": 1,
   "exp": "2문단에 국가성의 기능적 기준이 세 가지로 열거되어 있다. 3번의 조약은 오히려 3문단에서 '조약이 아니라 묵인'이라고 명시적으로 부정된다."
  },
  {
   "q": "The word forbearance in paragraph 3 is closest in meaning to",
   "opts": [
    "formal legal recognition",
    "financial support provided in secret",
    "deliberate restraint from exercising a power one holds",
    "a shared border agreed upon by both sides"
   ],
   "ans": 2,
   "exp": "3문단은 forbearance를 조약과 대비시키고 '불편해지면 철회 가능'하다고 덧붙이므로, 가진 힘을 스스로 삼가는 상태를 뜻한다. 1번은 본문이 부인되고 있다고 말한 바로 그것이라 반대 의미다."
  },
  {
   "q": "What can be inferred about the author's response to the objection in the final paragraph?",
   "opts": [
    "The author is unwilling to treat the centaurs' refusal as genuine consent.",
    "The author fully accepts the objection and withdraws the earlier argument.",
    "The author believes the centaurs have already petitioned for recognition.",
    "The author considers the objection irrelevant to questions of sovereignty."
   ],
   "ans": 0,
   "exp": "마지막 두 문장에서 '거기까지는 타당하다'로 일부 수용한 뒤, 선택하지 않은 분류 아래의 거절은 동의로 읽기 어렵다며 조건을 단다. 2번처럼 논지를 철회하지는 않는다."
  }
 ]
},
{
 "id": "hp-godricshollow",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "기억·역사",
 "level": 3,
 "title": "A Monument and a Ruin in the Same Village",
 "topic": "고드릭 골짜기는 기억을 두 방식으로 보관한다 — 종결시키는 기념비와 종결을 거부하는 폐가",
 "passage": "Godric's Hollow is unusual among wizarding settlements in that it was never segregated. Magical and non-magical households have shared its lanes for centuries, and the village is remembered as a place where concealment was practiced without separation. For students of collective memory, however, its interest lies less in this coexistence than in the two contradictory ways the village stores its past.\n\nThe first is the monument in the square. To ordinary passers-by it appears to be an unremarkable obelisk; to those able to perceive it otherwise, it resolves into statuary commemorating a family destroyed in a single night. A monument of this kind performs a familiar operation. It converts a private catastrophe into public property, fixes one interpretation of the event, and invites the visitor to feel that the matter has been settled. Commemoration, understood this way, is a technology of closure.\n\nThe second is the ruin. The cottage where the killing occurred has been left standing, unrepaired, its damage fully visible, and its surface has accumulated messages left by strangers over many years. Nothing about it is resolved. A preserved ruin refuses the consolation that a monument offers; it insists that the event remains unfinished and that the community has not agreed on what it means.\n\nIt is tempting to treat the ruin as the more honest of the two, since it withholds the tidy narrative that official memorials impose. Yet the ruin has itself become a destination, and a wound maintained for visitors gradually begins to function as an exhibit. Preservation and monumentalization may differ less in kind than in tone. Both leave the event in the custody of people who did not experience it, and both turn the bereaved into subject matter for an audience that arrives long afterward.",
 "ko": "고드릭 골짜기는 마법사 마을 가운데 드물게 분리된 적이 없는 곳이다. 마법사 가구와 비마법 가구가 수 세기 동안 같은 골목을 공유해 왔고, 이 마을은 분리 없이 은폐가 실행된 장소로 기억된다. 그러나 집단 기억 연구자에게 이 마을이 흥미로운 이유는 이 공존보다도, 마을이 과거를 저장하는 서로 모순되는 두 방식에 있다.\n\n첫째는 광장의 기념비다. 평범한 행인에게 그것은 특징 없는 오벨리스크로 보이지만, 달리 볼 수 있는 사람에게는 하룻밤 사이에 파괴된 한 가족을 기리는 조각상으로 바뀐다. 이런 종류의 기념비는 익숙한 작업을 수행한다. 사적인 참사를 공공의 소유물로 전환하고, 사건에 대한 하나의 해석을 고정하며, 방문자로 하여금 그 문제가 이미 정리되었다고 느끼게 만든다. 이렇게 이해하면 기념은 종결의 기술이다.\n\n둘째는 폐가다. 살해가 일어난 오두막은 수리되지 않은 채 서 있고, 파괴의 흔적이 그대로 드러나 있으며, 그 표면에는 오랜 세월 낯선 이들이 남긴 메시지가 쌓여 있다. 그 무엇도 정리되지 않았다. 보존된 폐허는 기념비가 제공하는 위안을 거부한다. 폐허는 그 사건이 아직 끝나지 않았으며 공동체가 그 의미에 합의하지 못했다고 주장한다.\n\n둘 중 폐허가 더 정직하다고 여기고 싶어진다. 공식 기념물이 강요하는 말끔한 서사를 내주지 않기 때문이다. 그러나 그 폐허 역시 하나의 방문지가 되었고, 방문객을 위해 유지되는 상처는 차츰 전시물처럼 기능하기 시작한다. 보존과 기념비화는 종류보다 어조에서 더 차이가 날지도 모른다. 둘 다 사건을 그것을 겪지 않은 사람들의 관리 아래 남겨 두고, 둘 다 유족을 한참 뒤에 도착한 관객을 위한 소재로 만든다.",
 "gloss": [
  {
   "w": "segregated",
   "ko": "분리된, 격리된"
  },
  {
   "w": "obelisk",
   "ko": "오벨리스크(끝이 뾰족한 기념 석주)"
  },
  {
   "w": "statuary",
   "ko": "조각상(군), 조상 작품"
  },
  {
   "w": "commemoration",
   "ko": "기념, 추모 행위"
  },
  {
   "w": "consolation",
   "ko": "위안, 위로"
  },
  {
   "w": "monumentalization",
   "ko": "기념비화(사건을 기념물로 만듦)"
  },
  {
   "w": "the bereaved",
   "ko": "유족, 사별한 사람들"
  }
 ],
 "qs": [
  {
   "q": "What is the passage mainly about?",
   "opts": [
    "The architectural history of cottages in a rural wizarding village",
    "Why magical and non-magical residents were able to live together peacefully",
    "Two opposed ways in which a village preserves the memory of a violent event",
    "The legal status of properties damaged during a wizarding conflict"
   ],
   "ans": 2,
   "exp": "1문단 마지막 문장이 '모순되는 두 방식'을 예고하고 2·3문단이 각각 기념비와 폐가를 다룬다. 2번의 공존은 1문단에서 배경으로만 언급되고 곧 관심 밖으로 밀려난다."
  },
  {
   "q": "According to paragraph 2, a monument of this kind does which of the following?",
   "opts": [
    "It turns a private catastrophe into public property and fixes a single interpretation.",
    "It records the names of every villager who died over several centuries.",
    "It is visible only to non-magical passers-by and hidden from others.",
    "It was built by the family that had lived in the destroyed cottage."
   ],
   "ans": 0,
   "exp": "2문단에서 기념비가 수행하는 세 가지 작업이 나열되며 그 첫 두 가지가 그대로 정답이다. 3번은 가시성 관계를 뒤집은 것으로, 본문에서는 일반 행인에게 오벨리스크로 보인다."
  },
  {
   "q": "Which statement about the ruin is supported by paragraph 3?",
   "opts": [
    "It has been carefully repaired to match its original appearance.",
    "It is closed to visitors in order to protect the site.",
    "Its damage was removed once the war ended.",
    "Its unrepaired state signals that the meaning of the event remains unsettled."
   ],
   "ans": 3,
   "exp": "3문단은 폐가가 수리되지 않은 채 남아 사건이 끝나지 않았음을 주장한다고 서술한다. 2번은 오히려 낯선 이들이 남긴 메시지가 쌓였다는 서술과 어긋난다."
  },
  {
   "q": "In the final paragraph, the author concludes that",
   "opts": [
    "official memorials should be removed and replaced with preserved ruins",
    "the two forms of memory may be less different from each other than they first appear",
    "visitors to the village should be charged an entrance fee",
    "the ruin will eventually collapse and end the debate"
   ],
   "ans": 1,
   "exp": "마지막 문단은 폐허가 더 정직해 보인다는 통념을 제시한 뒤, 폐허도 전시물이 되며 둘은 종류보다 어조의 차이일 수 있다고 판단을 유보한다. 1번은 저자가 오히려 경계하는 결론이다."
  }
 ]
},
{
 "id": "hp-burrow",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "주거·계급",
 "level": 4,
 "title": "The House That Grew: Magic, Housing, and Class",
 "topic": "버로우는 증축으로 자랐다 — 마법은 공간을 늘려 주지만 가난을 가려 주지는 못한다",
 "passage": "The Weasley residence is usually described in affectionate terms that obscure what it documents. Architecturally it is an accretion: a modest structure, probably a converted farm building, extended upward and outward as each new child required accommodation. The additions are not concealed. Storeys sit unevenly upon storeys, and the whole is held together by enchantment rather than by engineering. Sociologists of housing call this incremental building, and they observe it wherever households must expand faster than their incomes.\n\nMagic alters the constraints without removing them. It supplies labour that a poorer family cannot purchase, keeps a leaning structure upright, and multiplies the interior capacity of ordinary objects. What it does not supply is capital. The family still wears inherited clothing, still uses textbooks that older siblings have annotated, still calculates the cost of a school year. Magic therefore substitutes for money in a single domain, namely construction, while leaving every other marker of scarcity untouched.\n\nThe consequence is a peculiar visibility. Because the house grew by increments that anyone can see, its history of need is legible from the road, and neighbours read it accurately. Wealthier families in the same community treat the dwelling as evidence of a deficiency they consider hereditary, using the language of blood to describe what is plainly a matter of income. The house becomes the medium through which class is asserted and insult delivered.\n\nA generous reading holds that the building refutes such snobbery, since it is warm and crowded and manifestly happier than the manors that look down on it. The reading is attractive and largely true. It should nevertheless be handled with care, because warmth is not a remedy for scarcity, and stories in which the poor are compensated with contentment have historically been told most often by people who were not poor.",
 "ko": "위즐리가의 집은 보통 애정 어린 표현으로 묘사되는데, 그 표현은 이 집이 실제로 기록하고 있는 것을 가린다. 건축적으로 이 집은 덧붙임의 결과다. 아마도 농가 건물을 개조했을 소박한 구조물이, 새 아이가 태어나 거처가 필요할 때마다 위로 또 옆으로 확장된 것이다. 증축의 흔적은 감춰지지 않았다. 층 위에 층이 고르지 않게 얹혀 있고, 전체는 공학이 아니라 마법으로 지탱된다. 주거 사회학자들은 이것을 점진적 증축이라 부르며, 가구가 소득보다 빠르게 늘어나야 하는 곳이면 어디서나 이 현상을 관찰한다.\n\n마법은 제약을 없애지 않고 바꿔 놓을 뿐이다. 마법은 가난한 가정이 살 수 없는 노동력을 공급하고, 기울어진 구조물을 서 있게 하며, 평범한 물건의 내부 용량을 몇 배로 늘린다. 마법이 공급하지 못하는 것은 자본이다. 이 가족은 여전히 물려받은 옷을 입고, 형과 누나가 필기해 둔 교과서를 쓰며, 한 학년의 비용을 미리 계산한다. 따라서 마법은 건축이라는 단 하나의 영역에서만 돈을 대신하고, 결핍을 드러내는 다른 모든 표지는 그대로 남겨 둔다.\n\n그 결과는 독특한 가시성이다. 이 집은 누구나 볼 수 있는 단위로 자랐기 때문에, 그 필요의 역사가 길에서부터 읽히고 이웃들은 그것을 정확히 읽어 낸다. 같은 공동체의 부유한 가문들은 이 집을 자신들이 유전적이라고 여기는 결함의 증거로 취급하며, 명백히 소득의 문제인 것을 혈통의 언어로 서술한다. 집은 계급이 주장되고 모욕이 전달되는 매체가 된다.\n\n너그러운 독법은 이 건물이 그런 속물근성을 반박한다고 본다. 이 집은 따뜻하고 북적이며, 그것을 내려다보는 저택들보다 분명히 더 행복하기 때문이다. 이 독법은 매력적이고 대체로 참이다. 그럼에도 조심스럽게 다뤄야 한다. 따뜻함은 결핍의 해결책이 아니며, 가난한 사람들이 만족으로 보상받는다는 이야기는 역사적으로 가난하지 않은 사람들이 가장 자주 해 온 이야기이기 때문이다.",
 "gloss": [
  {
   "w": "accretion",
   "ko": "덧붙어 늘어남, 부착 성장"
  },
  {
   "w": "accommodation",
   "ko": "거처, 숙소 공간"
  },
  {
   "w": "incremental building",
   "ko": "점진적 증축(형편에 따라 조금씩 지어 나가는 방식)"
  },
  {
   "w": "capital",
   "ko": "자본, 밑천"
  },
  {
   "w": "legible",
   "ko": "읽어 낼 수 있는, 판독 가능한"
  },
  {
   "w": "snobbery",
   "ko": "속물근성, 우월 의식"
  },
  {
   "w": "scarcity",
   "ko": "결핍, 부족"
  }
 ],
 "qs": [
  {
   "q": "Which of the following best expresses the main idea of the passage?",
   "opts": [
    "Magical construction methods are more efficient than non-magical ones.",
    "The house should be rebuilt to conform to modern safety standards.",
    "Large families are generally happier than small ones in wizarding society.",
    "Magic relieves one constraint of poverty while leaving the family's poverty visible and intact."
   ],
   "ans": 3,
   "exp": "2문단의 '마법은 건축에서만 돈을 대신하고 나머지 결핍 표지는 그대로 둔다'와 3문단의 가시성 논의가 함께 논점을 이룬다. 1번은 본문의 관심사인 계급 문제를 놓친 기술적 진술이다."
  },
  {
   "q": "According to paragraph 2, what does magic fail to provide the family?",
   "opts": [
    "Capital",
    "Labour for building work",
    "Structural stability for a leaning house",
    "Additional interior space inside ordinary objects"
   ],
   "ans": 0,
   "exp": "2문단은 마법이 노동력, 구조 안정, 내부 용량은 공급하지만 자본은 공급하지 못한다고 명시한다. 2번은 마법이 실제로 공급하는 항목이므로 반대다."
  },
  {
   "q": "The word legible in paragraph 3 is closest in meaning to",
   "opts": [
    "profitable",
    "carefully hidden",
    "able to be read or understood",
    "permanently recorded in writing"
   ],
   "ans": 2,
   "exp": "3문단은 집의 필요의 역사가 길에서 legible하며 이웃들이 그것을 정확히 '읽어 낸다'고 이어 말한다. 4번은 문자 기록에 한정한 해석이라 문맥과 맞지 않는다."
  },
  {
   "q": "What can be inferred from the final paragraph?",
   "opts": [
    "The author believes the wealthier families are correct about heredity.",
    "The author warns that praising the family's happiness can excuse the conditions they live in.",
    "The author thinks contentment fully compensates for material scarcity.",
    "The author argues that the manors are also examples of incremental building."
   ],
   "ans": 1,
   "exp": "마지막 문단은 너그러운 독법을 '대체로 참'이라 인정한 뒤, 따뜻함이 결핍의 해결책은 아니며 그런 이야기를 주로 해 온 쪽이 누구인지 지적한다. 3번은 저자가 바로 경계하는 결론이다."
  }
 ]
},
{
 "id": "hp-gryffindor",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "교육·제도",
 "level": 4,
 "title": "Why Courage Makes an Unreliable Selection Criterion",
 "topic": "용기는 측정할 수 없는 덕목인데, 제도는 그것을 측정했다고 공표한다",
 "passage": "Of the four residential houses at the wizarding school, the one founded on bravery poses the clearest version of a problem facing any institution that sorts people by virtue. Aptitude can be examined. Ambition can at least be self-reported. Courage is not a property a person carries about like height; it becomes visible only in circumstances that demand it, and eleven-year-olds have seldom met such circumstances. The ceremony therefore does not measure courage. It forecasts it, and announces the forecast to everyone present.\n\nThat announcement has consequences. Once a student is publicly assigned to the daring, later conduct acquires meanings it would not otherwise carry. Caution looks like a failure to live up to the label; recklessness looks like proof of it. The house is said to supply a disproportionate share of disciplinary cases involving rules broken for what the offender considered sufficient reason. This is not evidence that the sorting was mistaken. It shows that the criterion cannot separate two dispositions that are indistinguishable at the moment of action: accepting a risk one has weighed, and failing to notice that a risk exists.\n\nThe founding vocabulary suggests the distinction was understood from the start. Beside nerve and daring stands chivalry, a word naming not an appetite for danger but a code that restrains it. On that reading the criterion was never bravery alone but bravery governed, a compound quality far harder to detect in a child than raw willingness to act.\n\nOne interpretation concludes that the house is merely an engine for manufacturing recklessness under a respectable name. Yet the sorting is not imposed in silence: the hat consults the student, and a child who asks for this house states an aspiration rather than submits to a diagnosis. An institution that invites people to become something is doing different work from one that certifies what they already are. Which of the two is happening depends on what the school does with the seven years that follow, and on that the record is thin.",
 "ko": "마법학교의 네 기숙사 가운데 용맹을 토대로 세워진 곳은, 사람을 덕목에 따라 분류하는 모든 제도가 마주하는 문제를 가장 선명하게 보여 준다. 적성은 시험할 수 있다. 야망은 적어도 본인이 진술할 수 있다. 그러나 용기는 사람이 키처럼 지니고 다니는 속성이 아니다. 그것은 용기를 요구하는 상황에서만 드러나는데, 열한 살짜리들은 그런 상황을 거의 겪어 본 적이 없다. 따라서 분류식은 용기를 측정하지 않는다. 그것은 용기를 예측하고, 그 예측을 그 자리의 모두에게 공표한다.\n\n그 공표에는 결과가 따른다. 한 학생이 담대한 자들의 무리로 공개 배정되고 나면, 이후의 행동은 원래라면 지니지 않았을 의미를 얻는다. 신중함은 이름표에 걸맞게 살지 못한 실패로 보이고, 무모함은 그 이름표의 증거로 보인다. 이 기숙사는 위반자 본인이 충분한 이유라고 여긴 사정 때문에 규칙을 어긴 징계 사례를 유난히 많이 배출한다고 이야기된다. 이는 분류가 틀렸다는 증거가 아니다. 그것은 이 기준이 행동의 순간에는 구별되지 않는 두 성향, 즉 무게를 재어 본 위험을 감수하는 것과 위험이 있다는 사실 자체를 알아차리지 못하는 것을 갈라내지 못한다는 점을 보여 준다.\n\n창립 당시의 어휘를 보면 그 구분은 처음부터 이해되고 있었던 듯하다. 배짱과 담대함 옆에는 기사도가 놓여 있는데, 이는 위험에 대한 욕구가 아니라 그것을 억제하는 규범을 가리키는 말이다. 그렇게 읽으면 기준은 결코 용기 하나가 아니라 통제된 용기였고, 이는 그저 행동하려는 날것의 의지보다 아이에게서 알아보기가 훨씬 어려운 복합적 자질이다.\n\n한 가지 해석은 이 기숙사가 점잖은 이름 아래 무모함을 제조하는 장치일 뿐이라고 결론짓는다. 그러나 분류가 침묵 속에 강요되는 것은 아니다. 모자는 학생에게 의사를 묻고, 이 기숙사를 청하는 아이는 진단을 받아들이는 것이 아니라 포부를 밝히는 것이다. 사람들에게 무엇이 되어 보라고 권하는 제도는 이미 그러한 존재임을 증명해 주는 제도와는 다른 일을 하는 셈이다. 둘 중 무엇이 벌어지고 있는지는 학교가 그 뒤의 7년을 어떻게 쓰느냐에 달려 있는데, 그 점에 관한 기록은 빈약하다.",
 "gloss": [
  {
   "w": "disproportionate",
   "ko": "불균형하게 많은, 지나치게 큰 비중의"
  },
  {
   "w": "disposition",
   "ko": "성향, 기질"
  },
  {
   "w": "indistinguishable",
   "ko": "구별할 수 없는"
  },
  {
   "w": "chivalry",
   "ko": "기사도(무력을 절제하는 규범)"
  },
  {
   "w": "restrain",
   "ko": "억제하다, 제어하다"
  },
  {
   "w": "certify",
   "ko": "(공식적으로) 증명하다, 인증하다"
  },
  {
   "w": "aspiration",
   "ko": "포부, 되고자 하는 바람"
  }
 ],
 "qs": [
  {
   "q": "What is the main point of the passage?",
   "opts": [
    "The house founded on bravery admits more rule-breakers than the other three houses do.",
    "Courage was never actually part of the founder's criteria for the house.",
    "Selecting for courage forces an institution to publicize a prediction it cannot verify, and the prediction then shapes behavior.",
    "The sorting ceremony should be postponed until students are old enough to be tested properly."
   ],
   "ans": 2,
   "exp": "1문단 마지막 두 문장(측정이 아니라 예측하고 그 예측을 공표한다)과 2문단 첫 문장(그 공표에는 결과가 따른다)이 글 전체의 뼈대다. 1번은 2문단에 나오는 사례일 뿐 논점이 아니라서 오답이다."
  },
  {
   "q": "According to paragraph 2, the house's disciplinary record shows that",
   "opts": [
    "the criterion cannot tell a weighed risk apart from an unnoticed one",
    "students in that house are punished more harshly than others",
    "the sorting hat makes frequent errors of judgment",
    "caution is punished more often than recklessness"
   ],
   "ans": 0,
   "exp": "2문단 끝 문장이 근거다. 두 성향이 행동의 순간에는 구별되지 않는다고 명시한다. 3번은 바로 앞 문장에서 분류가 틀렸다는 증거가 아니라고 못 박았으므로 반대다."
  },
  {
   "q": "In paragraph 3, the word restrains is closest in meaning to",
   "opts": [
    "rewards",
    "explains",
    "predicts",
    "holds back"
   ],
   "ans": 3,
   "exp": "기사도가 위험에 대한 욕구가 아니라 그것을 억제하는 규범이라는 문맥이므로 hold back이 맞다. predicts는 1문단의 forecast와 헷갈린 선택지로, 3문단 문맥과는 무관하다."
  },
  {
   "q": "What can be inferred from the last paragraph about the author's judgment?",
   "opts": [
    "The author concludes that the house does manufacture recklessness.",
    "The author withholds a verdict because the effect depends on evidence the record does not supply.",
    "The author believes the hat should stop consulting students.",
    "The author regards aspiration and diagnosis as the same thing."
   ],
   "ans": 1,
   "exp": "마지막 문장에서 둘 중 무엇인지는 이후 7년에 달렸고 그 기록이 빈약하다고 했으므로 판단 유보다. 1번은 필자가 소개만 하고 곧바로 Yet으로 반박한 해석이라 오답이다."
  }
 ]
},
{
 "id": "hp-slytherin",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "사회·낙인",
 "level": 4,
 "title": "Why the Ambitious House Cannot Escape Its Reputation",
 "topic": "평판은 행위가 아니라, 열한 살에 붙은 분류가 해석의 틀이 되는 데서 나온다",
 "passage": "Reputation is usually assumed to follow conduct: a group behaves badly, and observers learn to expect bad behavior from it. The house associated with ambition inverts that sequence, and the inversion is what makes it worth study. Its reputation does not rest on a tally of what its members do. It rests on the fact that a classification fixed at the age of eleven becomes the frame through which everything they later do is read.\n\nThe mechanism is ordinary and well documented outside this school. An identical act — cultivating a useful acquaintance, competing hard for a position, keeping an intention private — is described as prudence in one student and as calculation in another, and the difference lies entirely in the badge on the robe. Ambition is in any case a criterion unlike the others, since it names a direction rather than a quality. It specifies nothing about what the ambition is for.\n\nOver time the label does real work. Families who accept the reputation send children who have already learned it; families who resent it steer their children elsewhere, sometimes by instructing them to ask the hat directly. Each year's intake is therefore slightly closer to the caricature than the last — not because the caricature was accurate, but because it was believed. The house did not become what it was accused of being. It was gradually staffed by those whom the accusation failed to deter.\n\nIt would be too tidy to conclude that the reputation is pure invention. The most notorious dark wizard of the century did come out of this house, and a school cannot be asked to forget that. The stigma account claims something narrower: that the denominator is never counted. Hundreds of members leave and do nothing remarkable, generating no stories at all, while one career of violence supplies a lifetime of them. Whether the reputation is unjust or merely imprecise is a question the surviving evidence cannot settle.",
 "ko": "평판은 대개 행위를 뒤따르는 것으로 여겨진다. 어떤 집단이 나쁘게 행동하면 관찰자들이 그 집단에서 나쁜 행동을 기대하게 된다는 식이다. 야망과 결부된 기숙사는 이 순서를 뒤집으며, 바로 그 역전이 이 기숙사를 연구할 만한 대상으로 만든다. 이곳의 평판은 구성원들이 무엇을 하는지를 집계한 결과에 근거하지 않는다. 그것은 열한 살에 확정된 분류가 이후 그들이 하는 모든 일을 읽어 내는 틀이 된다는 사실에 근거한다.\n\n그 기제는 평범하고 이 학교 바깥에서도 충분히 기록되어 있다. 동일한 행위 — 쓸모 있는 인맥을 다지는 것, 자리를 두고 치열하게 경쟁하는 것, 의도를 드러내지 않는 것 — 가 어떤 학생에게서는 신중함으로, 다른 학생에게서는 계산속으로 서술되며, 그 차이는 전적으로 로브에 달린 문장에 있다. 게다가 야망은 애초에 다른 기준들과 성격이 다르다. 그것은 자질이 아니라 방향을 가리키기 때문이다. 야망이 무엇을 위한 것인지에 대해서는 아무것도 말해 주지 않는다.\n\n시간이 흐르면서 이름표는 실제로 작동한다. 그 평판을 받아들이는 집안은 이미 그것을 학습한 아이를 보내고, 그 평판을 못마땅해하는 집안은 아이를 다른 곳으로 유도하며 때로는 모자에게 직접 청하라고 일러 둔다. 그리하여 해마다의 신입생 구성은 지난해보다 조금씩 더 그 희화화된 상에 가까워진다. 그 상이 정확해서가 아니라, 사람들이 그것을 믿었기 때문이다. 이 기숙사는 자신이 비난받은 그 모습이 된 것이 아니다. 그 비난에 물러서지 않은 이들로 서서히 채워진 것이다.\n\n그 평판이 순전한 날조라고 결론짓는 것은 너무 깔끔한 처리일 것이다. 금세기 가장 악명 높은 어둠의 마법사가 실제로 이 기숙사에서 나왔고, 학교더러 그것을 잊으라고 요구할 수는 없다. 낙인 이론이 주장하는 바는 그보다 좁다. 분모가 결코 세어지지 않는다는 것이다. 수백 명의 구성원이 졸업해 특별할 것 없는 삶을 살며 어떤 이야깃거리도 만들어 내지 않는 반면, 단 한 건의 폭력적 이력은 평생 회자될 이야기를 공급한다. 그 평판이 부당한 것인지 단지 부정확한 것인지는 남아 있는 증거로는 판정할 수 없는 문제다.",
 "gloss": [
  {
   "w": "invert",
   "ko": "(순서를) 뒤집다"
  },
  {
   "w": "tally",
   "ko": "집계, 셈한 수치"
  },
  {
   "w": "prudence",
   "ko": "신중함, 분별"
  },
  {
   "w": "caricature",
   "ko": "희화화된 상, 과장된 이미지"
  },
  {
   "w": "intake",
   "ko": "(그해에) 받아들인 인원, 신입생 집단"
  },
  {
   "w": "deter",
   "ko": "단념시키다, 물러서게 하다"
  },
  {
   "w": "denominator",
   "ko": "분모(비율을 낼 때의 전체 수)"
  }
 ],
 "qs": [
  {
   "q": "Which of the following best states the author's central claim?",
   "opts": [
    "The ambitious house has produced more dark wizards than any other house.",
    "The house's reputation is generated less by its members' conduct than by an early classification that governs how the conduct is interpreted.",
    "Ambition is a morally worse criterion than courage or loyalty.",
    "The sorting hat should stop taking students' preferences into account."
   ],
   "ans": 1,
   "exp": "1문단 마지막 두 문장이 논지를 그대로 진술한다. 평판이 집계가 아니라 열한 살의 분류가 만든 해석 틀에 근거한다는 것이다. 1번은 4문단에서 사례 하나로만 언급될 뿐 비교 통계로 제시된 적이 없다."
  },
  {
   "q": "According to paragraph 2, what makes ambition unlike the other houses' criteria?",
   "opts": [
    "It cannot be observed in an eleven-year-old.",
    "It is disliked by most wizarding families.",
    "It is measured by examination rather than by conduct.",
    "It indicates a direction and says nothing about its purpose."
   ],
   "ans": 3,
   "exp": "2문단 끝의 두 문장이 근거다. 야망은 자질이 아니라 방향을 가리키며 무엇을 위한 것인지는 말해 주지 않는다고 했다. 1번은 그리핀도르 지문의 논점과 섞은 오답으로, 이 문단에는 그런 진술이 없다."
  },
  {
   "q": "It can be inferred from paragraph 3 that the house's intake changed over time because",
   "opts": [
    "belief in the stereotype sorted families into those who accepted it and those who avoided it",
    "the hat lost the ability to judge character accurately",
    "the school changed its admission rules after a scandal",
    "ambitious students began to prefer other houses"
   ],
   "ans": 0,
   "exp": "3문단은 평판을 받아들인 집안과 못마땅해한 집안이 각각 다르게 움직였고, 그 결과 신입생 구성이 변했다고 설명한다. 4번은 방향이 반대로, 물러선 쪽은 야망이 아니라 그 비난을 꺼린 집안이다."
  },
  {
   "q": "In the last paragraph, the author mentions that the denominator is never counted in order to",
   "opts": [
    "argue that the dark wizard's house should be dissolved",
    "prove that the reputation is entirely false",
    "explain why unremarkable members leave no trace while a single notorious case dominates perception",
    "show that the school keeps inaccurate records of its graduates"
   ],
   "ans": 2,
   "exp": "바로 다음 문장이 그 뜻을 풀어 준다. 평범한 수백 명은 이야깃거리를 남기지 않고 한 건의 폭력적 이력만 회자된다는 것이다. 2번은 필자가 명시적으로 거부한 결론(순전한 날조라고 하기엔 너무 깔끔하다)이라서 틀렸다."
  }
 ]
},
{
 "id": "hp-ravenclaw",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "심리·경쟁",
 "level": 4,
 "title": "The Solitary Consequence of Sorting by Intellect",
 "topic": "매주 채점되는 자질을 소속 조건으로 삼으면, 소속은 끝내 확정되지 않는다",
 "passage": "Each of the four houses selects for a quality, but the qualities differ in one respect that is easy to overlook: only one of them is measured every week. Loyalty has no scoreboard. Courage is tested rarely, and usually in public. Intellect, by contrast, is graded continuously, ranked, and posted on a wall. A house that selects for wit therefore differs from the others structurally rather than merely temperamentally, because its defining trait is also the school's principal currency.\n\nThe consequence is that membership there is never settled. In another house, a student who performs poorly has failed at schoolwork; in this one, the same mark reads as evidence against the qualification for belonging. The architecture states the point without needing to argue it. Where other houses open to a password, which is collective knowledge passed generously from older students to younger, this one opens to a riddle that each arrival must answer alone. Entry is not granted once and then held. It is re-earned at the door.\n\nUnder those conditions the ordinary machinery of student life runs backward. Asking for help, elsewhere a routine transaction, becomes a disclosure. Work is done privately, because the condition of not yet knowing is exactly what one has an interest in concealing. A group assembled around a shared trait can thus operate, in daily practice, as a set of individuals with a common reason to avoid one another.\n\nOne might object that this reads too much into a door. Riddles are frequently solved by whoever happens to be waiting, and older students do coach the younger. It is also possible that the competitiveness described here belongs to the school entire, with its examinations and its published standings, and merely becomes visible where the selected trait and the examined trait coincide. On that account the house is not the cause of the isolation but the place where a general condition becomes legible.",
 "ko": "네 기숙사는 각각 하나의 자질을 기준으로 선발하지만, 그 자질들은 간과하기 쉬운 한 가지 점에서 서로 다르다. 그중 오직 하나만이 매주 측정된다는 점이다. 충성심에는 점수판이 없다. 용기는 드물게, 그것도 대개 공개된 자리에서 시험된다. 반면 지성은 끊임없이 채점되고, 순위가 매겨지며, 벽에 게시된다. 따라서 기지를 기준으로 선발하는 기숙사는 다른 곳들과 단지 기질에서가 아니라 구조에서 다르다. 그 기숙사를 규정하는 자질이 곧 이 학교의 주된 통화이기 때문이다.\n\n그 결과 그곳에서의 소속은 결코 확정되지 않는다. 다른 기숙사에서 성적이 나쁜 학생은 학업에서 실패한 것이지만, 이 기숙사에서는 같은 점수가 소속 자격 자체에 반하는 증거로 읽힌다. 건물 구조가 그 점을 논증할 필요도 없이 진술한다. 다른 기숙사들이 암호로 열리는 데 반해 — 암호란 선배가 후배에게 너그럽게 건네주는 공동의 지식이다 — 이곳은 도착한 사람이 혼자 답해야 하는 수수께끼로 열린다. 입장은 한 번 주어져 계속 보유되는 것이 아니다. 그것은 문 앞에서 매번 다시 획득된다.\n\n그런 조건에서는 학생 생활의 통상적인 작동 방식이 거꾸로 돌아간다. 다른 곳에서는 일상적인 거래인 도움 요청이 여기서는 자기 폭로가 된다. 공부는 혼자 하게 되는데, 아직 모르는 상태야말로 감추는 것이 이로운 바로 그것이기 때문이다. 그리하여 공통의 자질을 중심으로 모인 집단이 일상에서는 서로를 피할 공통의 이유를 가진 개인들의 집합으로 작동할 수 있다.\n\n이것이 문 하나에 지나치게 큰 의미를 부여한 해석이라는 반론도 가능하다. 수수께끼는 마침 그 앞에 서 있던 사람이 푸는 경우가 잦고, 선배들이 후배를 지도해 주기도 한다. 또한 여기서 서술한 경쟁성이 시험과 공개 순위를 갖춘 학교 전체의 것이며, 선발된 자질과 시험되는 자질이 겹치는 지점에서 가장 눈에 띄게 드러날 뿐일 가능성도 있다. 그렇게 보면 이 기숙사는 고립의 원인이 아니라, 일반적인 조건이 판독 가능해지는 자리인 셈이다.",
 "gloss": [
  {
   "w": "temperamentally",
   "ko": "기질상으로"
  },
  {
   "w": "principal currency",
   "ko": "주된 통화(가장 값나가는 교환 수단)"
  },
  {
   "w": "architecture",
   "ko": "건축 구조, 건물의 짜임"
  },
  {
   "w": "disclosure",
   "ko": "(감추던 것의) 폭로, 공개"
  },
  {
   "w": "conceal",
   "ko": "감추다, 숨기다"
  },
  {
   "w": "coach (v.)",
   "ko": "지도하다, 가르쳐 주다"
  },
  {
   "w": "legible",
   "ko": "읽어 낼 수 있는, 판독 가능한"
  }
 ],
 "qs": [
  {
   "q": "What is the author's main purpose in the passage?",
   "opts": [
    "To praise the house for its academic achievements",
    "To compare the four houses' entrance procedures in detail",
    "To recommend that the school stop posting examination rankings",
    "To explain how a continuously measured criterion turns a residential group into a competitive one"
   ],
   "ans": 3,
   "exp": "1문단의 매주 측정된다는 대비와 2, 3문단의 귀결이 하나의 논지를 이룬다. 2번은 암호와 수수께끼 대비가 그 논지를 뒷받침하는 근거로만 쓰였을 뿐, 글의 목적이 아니다."
  },
  {
   "q": "According to paragraph 2, the password differs from the riddle mainly because the password",
   "opts": [
    "is easier to remember than a riddle",
    "is shared knowledge handed down rather than an individual test",
    "is changed by the staff every term",
    "must be spoken in front of the whole house"
   ],
   "ans": 1,
   "exp": "2문단에서 암호를 선배가 후배에게 너그럽게 건네주는 공동의 지식이라고 규정하고, 수수께끼는 혼자 답해야 한다고 대비했다. 1번은 본문에 없는 난이도 비교라서 오답이다."
  },
  {
   "q": "Which of the following is NOT mentioned in the passage?",
   "opts": [
    "Intellect is graded and ranked continuously.",
    "Older students sometimes help younger ones with riddles.",
    "Members of the house are forbidden to study together.",
    "Courage is tested only rarely."
   ],
   "ans": 2,
   "exp": "3문단은 혼자 공부하게 되는 유인을 설명할 뿐 금지 규정은 어디에도 없다. 2번은 4문단에서 반론의 근거로 실제 언급되므로 정답이 될 수 없다."
  },
  {
   "q": "In the last paragraph, the author suggests that the isolation described earlier may",
   "opts": [
    "reflect a school-wide culture of examination rather than the house itself",
    "disappear once students reach their final year",
    "be caused chiefly by the difficulty of the riddles",
    "have been invented by the other three houses"
   ],
   "ans": 0,
   "exp": "4문단 셋째 문장이 근거로, 경쟁성이 학교 전체의 것이며 이 기숙사는 그것이 드러나는 자리일 뿐일 수 있다고 한다. 3번은 오히려 앞 문단의 주장을 강화하는 방향이라 반론이 될 수 없다."
  }
 ]
},
{
 "id": "hp-hufflepuff",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "집단·평판",
 "level": 3,
 "title": "The House That Is Said to Take the Rest",
 "topic": "나머지를 받는 곳이라는 평판은 그 집단이 아니라 관찰자의 기준관을 드러낸다",
 "passage": "Of the four houses, only one is routinely described in the negative — as the house that takes whoever is left. The description repays examination, because it reveals less about the house than about what its describers assume a selection criterion must be. The other three name qualities that are scarce, comparative, and therefore capable of ranking people. Diligence, patience and fair dealing are none of these. They can in principle be shown by anyone, and a trait available to everyone reads, to an observer trained on scarcity, as no criterion at all.\n\nThe odd part is that the residual description did not begin as an insult. The founder's own position, as the school preserves it, was that she would take the students the others declined and teach them alike. A modern ear hears condescension in that; it may be nearer to a statement of principle. The criterion is dispositional rather than aptitudinal — a willingness to work before ability has been certified — and criteria of that kind are invisible precisely because they exclude nobody in advance.\n\nThe cost is paid in standing rather than in outcome. Seven years of ranking last in prestige is not nothing, and members report the joke about leftovers long before they are old enough to answer it. Yet accounts of the school's final conflict record that when students were given leave to withdraw, this house stayed in numbers its reputation would not have predicted.\n\nTwo readings compete. One treats that record as vindication: the quality was real throughout, and only an emergency made it measurable. The other notices a difficulty in the evidence. A group organized around not complaining will under-report what it costs to be the school's afterthought, and seven years of being called the remainder may itself produce the unassuming manner later praised as character. On this the sources are silent, and the flattering reading should be held loosely.",
 "ko": "네 기숙사 가운데 오직 한 곳만이 늘 부정형으로 서술된다. 남은 사람을 받는 기숙사라는 것이다. 이 서술은 따져 볼 값어치가 있는데, 그것이 이 기숙사에 대해서보다 서술하는 이들이 선발 기준이란 어떠해야 한다고 전제하는지에 대해 더 많이 말해 주기 때문이다. 나머지 세 곳은 희소하고 비교 가능하며 따라서 사람을 서열화할 수 있는 자질을 내건다. 성실, 인내, 공정한 처신은 그 어느 것도 아니다. 그것들은 원칙적으로 누구나 보여 줄 수 있으며, 희소성에 길들여진 관찰자에게 누구에게나 열려 있는 자질은 아예 기준이 아닌 것으로 읽힌다.\n\n기묘한 대목은 그 잔여적 서술이 애초에 모욕으로 시작된 것이 아니라는 점이다. 학교가 전하는 바에 따르면 창립자 본인의 입장은, 다른 이들이 마다한 학생들을 받아 똑같이 가르치겠다는 것이었다. 오늘날의 귀에는 그 말이 생색으로 들리지만, 실은 원칙의 표명에 더 가까울지 모른다. 이 기준은 적성이 아니라 성향에 관한 것 — 능력이 인증되기 전에 기꺼이 일하려는 태도 — 이며, 그런 종류의 기준은 아무도 미리 배제하지 않기 때문에 바로 그 이유로 눈에 보이지 않는다.\n\n대가는 성과가 아니라 지위에서 치러진다. 7년 내내 위신의 꼴찌에 놓이는 일은 사소하지 않으며, 구성원들은 그 나머지 농담에 응수할 수 있는 나이가 되기 훨씬 전부터 그것을 듣는다고 전한다. 그러나 학교의 마지막 전투에 관한 기록들은, 학생들에게 물러날 기회가 주어졌을 때 이 기숙사가 그 평판으로는 예측되지 않을 규모로 남았다고 적고 있다.\n\n두 가지 독법이 경합한다. 하나는 그 기록을 명예 회복으로 본다. 그 자질은 내내 실재했고 다만 비상사태가 비로소 그것을 측정 가능하게 만들었다는 것이다. 다른 하나는 증거의 난점을 지적한다. 불평하지 않는다는 것을 중심으로 조직된 집단은 학교의 뒷전이 되는 대가가 얼마인지를 축소해 보고할 것이며, 7년 동안 나머지라고 불린 경험이야말로 훗날 인격이라 칭송되는 그 겸손한 태도를 만들어 냈을 수도 있다. 이에 대해 사료는 침묵하므로, 그 호의적인 독법은 느슨하게 쥐고 있어야 한다.",
 "gloss": [
  {
   "w": "residual",
   "ko": "나머지의, 잔여적인"
  },
  {
   "w": "comparative",
   "ko": "비교 가능한, 견주어 우열을 가릴 수 있는"
  },
  {
   "w": "condescension",
   "ko": "생색, 아랫사람 대하듯 하는 태도"
  },
  {
   "w": "dispositional",
   "ko": "성향에 관한(적성이 아니라 태도에 관한)"
  },
  {
   "w": "vindication",
   "ko": "정당성 입증, 명예 회복"
  },
  {
   "w": "unassuming",
   "ko": "잘난 체하지 않는, 겸손한"
  },
  {
   "w": "afterthought",
   "ko": "뒷전, 나중에야 떠올려지는 존재"
  }
 ],
 "qs": [
  {
   "q": "What does the author suggest the leftovers description mainly reveals?",
   "opts": [
    "The assumption that a real criterion must be scarce and able to rank people",
    "The actual quality of students the house admits each year",
    "A rivalry between the founder and the other three founders",
    "The school's failure to keep accurate admission records"
   ],
   "ans": 0,
   "exp": "1문단 둘째 문장이 곧바로 답을 준다. 그 서술은 기숙사보다 서술자가 전제하는 기준관을 드러낸다는 것이며, 이어지는 문장들이 희소성과 서열화를 그 전제로 지목한다. 2번은 본문이 명시적으로 부정하는 방향이다."
  },
  {
   "q": "According to paragraph 2, the house's criterion is invisible because it",
   "opts": [
    "was never written down by the founder",
    "is tested only during emergencies",
    "shuts nobody out in advance",
    "changes from one generation to the next"
   ],
   "ans": 2,
   "exp": "2문단 마지막 절이 근거다. 아무도 미리 배제하지 않기 때문에 보이지 않는다고 했다. 2번은 3, 4문단의 비상사태 언급과 섞은 오답으로, 보이지 않는 이유와는 무관하다."
  },
  {
   "q": "In paragraph 3, the phrase paid in standing rather than in outcome is closest in meaning to",
   "opts": [
    "the members achieve less than others but are respected more",
    "the members suffer in reputation, not in what they accomplish",
    "the members pay a fee that other houses do not pay",
    "the members must stand during house meetings"
   ],
   "ans": 1,
   "exp": "이어지는 문장들이 위신의 꼴찌라는 지위상의 손해와, 전투 때 남은 규모라는 실제 결과를 대비시킨다. 1번은 두 항목을 서로 뒤집어 놓은 오답이다."
  },
  {
   "q": "Which statement best describes the author's position in the last paragraph?",
   "opts": [
    "The war record proves that the house's critics were wrong.",
    "The house's reputation was created deliberately by the other houses.",
    "The founder's principle has since been abandoned by the school.",
    "The favorable reading is plausible but confounded by how the group formed."
   ],
   "ans": 3,
   "exp": "마지막 두 문장이 근거로, 불평하지 않는 집단은 대가를 축소 보고하고 그 겸손함 자체가 낙인의 산물일 수 있으니 호의적 독법을 느슨하게 쥐라고 한다. 1번은 필자가 소개한 뒤 곧바로 난점을 붙인 두 독법 중 하나일 뿐이다."
  }
 ]
},
{
 "id": "hp-beauxbatons",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "교육·문화",
 "level": 4,
 "title": "The Beauxbatons Delegation as an Act of State",
 "topic": "보바통 — 예절 교육은 어떻게 국가적 자기표현이 되는가",
 "passage": "Beauxbatons Academy of Magic occupies a position in the wizarding world that is easier to describe socially than geographically. It is generally placed somewhere in the Pyrenees, and the little that is recorded about its grounds emphasizes fountains, gardens and a palace-like architecture rather than the fortified towers associated with Hogwarts. This emphasis is not incidental. A school that presents itself through landscaping and manners is making a claim about what education is for, and the claim differs from the one implied by a castle.\n\nThe Triwizard Tournament makes the claim visible. When the Beauxbatons delegation arrives, its entrance is staged: the carriage, the uniform blue robes, the choreographed greeting. Observers at Hogwarts read this as affectation, and the reading is understandable, but it mistakes a diplomatic act for a personal one. The delegation is not merely a group of students; it is, for the duration of the tournament, the visible surface of a foreign magical culture. Madame Maxime's insistence on the quality of the accommodation follows the same logic. A representative who accepts poor treatment concedes something on behalf of everyone represented.\n\nSeen this way, the school's attention to comportment functions as a curriculum in national self-presentation. Students learn not only magic but how magic should look when strangers are watching, and the two lessons are taught together rather than in sequence.\n\nThe interpretation has limits. It is tempting to conclude that every gesture of refinement is calculated, yet the accounts that describe the visiting students also show them cold, homesick and unimpressed by their hosts — reactions that no diplomatic training would prescribe. Elegance may be a policy, but it appears also to be a habit, and habits are less strategic than they look.",
 "ko": "보바통 마법 아카데미는 마법 세계 안에서 지리적으로보다 사회적으로 설명하기가 더 쉬운 위치를 차지한다. 이 학교는 대체로 피레네 산맥 어딘가에 놓이며, 그 부지에 관해 기록된 얼마 안 되는 내용은 호그와트와 결부되는 요새화된 탑이 아니라 분수와 정원, 궁전 같은 건축을 강조한다. 이 강조는 부수적인 것이 아니다. 조경과 예절을 통해 자신을 드러내는 학교는 교육이 무엇을 위한 것인지에 대해 하나의 주장을 하고 있는 것이며, 그 주장은 성채가 함의하는 주장과 다르다.\n\n트리위저드 시합은 그 주장을 눈에 보이게 만든다. 보바통 대표단이 도착할 때 그 등장은 연출된 것이다. 마차, 통일된 푸른 로브, 짜인 인사. 호그와트의 구경꾼들은 이를 겉멋으로 읽고 그 독해는 이해할 만하지만, 그것은 외교적 행위를 개인적 행위로 오인한 것이다. 대표단은 단지 학생 무리가 아니다. 시합이 이어지는 동안 그들은 한 외국 마법 문화의 눈에 보이는 표면이다. 막심 부인이 숙소의 질을 고집하는 것도 같은 논리를 따른다. 나쁜 대우를 받아들이는 대표는 자신이 대표하는 모두를 대신해 무언가를 양보하는 것이다.\n\n이렇게 보면 이 학교가 몸가짐에 기울이는 주의는 국가적 자기표현의 교육과정으로 기능한다. 학생들은 마법만이 아니라 낯선 이들이 지켜볼 때 마법이 어떻게 보여야 하는지를 배우며, 두 가르침은 순서대로가 아니라 함께 주어진다.\n\n이 해석에는 한계가 있다. 세련됨의 모든 몸짓이 계산된 것이라고 결론짓고 싶어지지만, 방문한 학생들을 묘사하는 기록들은 그들이 춥고 향수에 젖고 주최 측에 감흥을 느끼지 못하는 모습 또한 보여준다. 어떤 외교 훈련도 지시하지 않을 반응들이다. 우아함은 하나의 방침일 수 있지만 동시에 습관이기도 한 듯하며, 습관은 보이는 것만큼 전략적이지 않다.",
 "gloss": [
  {
   "w": "incidental",
   "ko": "부수적인, 우연히 딸린"
  },
  {
   "w": "fortified",
   "ko": "요새화된"
  },
  {
   "w": "choreographed",
   "ko": "짜인, 안무처럼 연출된"
  },
  {
   "w": "affectation",
   "ko": "겉멋, 꾸민 태도"
  },
  {
   "w": "delegation",
   "ko": "대표단"
  },
  {
   "w": "concede",
   "ko": "양보하다, 내주다"
  },
  {
   "w": "comportment",
   "ko": "몸가짐, 처신"
  }
 ],
 "qs": [
  {
   "q": "What is the main point the author makes about Beauxbatons?",
   "opts": [
    "Its magical curriculum is more advanced than that of the other competing schools.",
    "Its concern with manner and appearance operates as a form of national representation.",
    "Its location in the Pyrenees is what explains its unusual architectural style.",
    "Its students resent having been sent abroad for the tournament."
   ],
   "ans": 1,
   "exp": "3문단의 'the school's attention to comportment functions as a curriculum in national self-presentation'이 논점을 한 문장으로 요약한다. (D)는 4문단의 향수·불만 언급만 보고 고르기 쉬우나, 그것은 논점이 아니라 논점에 대한 반론 재료로 제시된 것이다."
  },
  {
   "q": "According to the passage, why does Madame Maxime insist on the quality of the accommodation?",
   "opts": [
    "The tournament rules require that all three schools receive equal facilities.",
    "Her students had been promised conditions resembling their own palace.",
    "Accepting poor treatment would concede something on behalf of those she represents.",
    "She had been personally insulted by the Hogwarts staff on arrival."
   ],
   "ans": 2,
   "exp": "2문단 마지막 문장 'A representative who accepts poor treatment concedes something on behalf of everyone represented.'가 그대로 근거다. (A)의 규정 이야기는 지문에 전혀 없다."
  },
  {
   "q": "What can be inferred about the Hogwarts observers who watch the delegation arrive?",
   "opts": [
    "They judge the display by personal standards when a diplomatic standard would apply.",
    "They are unaware that a tournament is about to take place at their school.",
    "They had expected the French students to arrive without any escort.",
    "They agree with Madame Maxime about what counts as proper hospitality."
   ],
   "ans": 0,
   "exp": "2문단에서 구경꾼들의 독해가 'mistakes a diplomatic act for a personal one'이라고 평가된다. 즉 잣대를 잘못 골랐다는 뜻이다. (D)는 정반대 — 막심 부인의 요구를 겉멋으로 본 쪽이 이들이다."
  },
  {
   "q": "The word affectation in paragraph 2 is closest in meaning to",
   "opts": [
    "careful advance planning",
    "insincere or showy display",
    "open political hostility",
    "a formal written apology"
   ],
   "ans": 1,
   "exp": "2문단에서 이 단어는 연출된 등장을 깎아내리는 구경꾼들의 평가로 쓰였으므로 '꾸민 티, 겉멋'에 해당한다. (A)는 연출이 계획된 것은 맞지만 중립적 의미라 비판적 어감을 담지 못한다."
  }
 ]
},
{
 "id": "hp-durmstrang",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "제도·평판",
 "level": 4,
 "title": "A School That Cannot Be Visited or Verified",
 "topic": "덤스트랭 — 위치를 숨기는 제도는 어떻게 자신의 평판을 만드는가",
 "passage": "Durmstrang Institute is unusual among magical schools in that its defining feature is an absence: no one outside it is supposed to know where it is. The school is generally placed in the far north of Europe, and it is said to conceal itself from outsiders, who are carried to it without being able to fix its position. Whatever the original purpose of this arrangement, its consequence is straightforward. A school that cannot be visited cannot be inspected, and an institution that cannot be inspected is known only through what is said about it.\n\nWhat is said about Durmstrang is that it teaches the Dark Arts rather than merely defending against them. The claim circulates as common knowledge in Britain, is repeated by students who have never been there, and is never, in the surviving accounts, tested. Secrecy and reputation are not two separate facts here but two sides of one mechanism: the policy that protects the school from scrutiny also guarantees that the harshest available description of it goes unchallenged. Concealment does not suppress rumor; it removes the only thing that could correct it.\n\nThe record complicates the picture further. The school's most notorious former student was expelled from it, which suggests that limits of some kind were maintained, while its headmaster during the Triwizard Tournament had himself been convicted and later released — a biography that would disqualify an administrator in most systems. The evidence points in two directions at once.\n\nOne might conclude that the reputation is simply deserved. Yet the same evidence would be produced by a school that was merely secretive and politically unlucky, and nothing in the record allows the two possibilities to be told apart.",
 "ko": "덤스트랭 학교는 마법 학교들 가운데 특이하게도 그 규정적 특징이 하나의 부재다. 바깥의 누구도 그곳이 어디인지 알아서는 안 된다. 이 학교는 대체로 유럽 최북단에 놓이며, 외부인에게 자신을 숨긴다고 전해진다. 방문자는 위치를 특정하지 못한 채 그곳으로 실려 간다. 이 장치의 본래 목적이 무엇이었든 그 결과는 분명하다. 방문할 수 없는 학교는 조사할 수 없고, 조사할 수 없는 기관은 오직 그것에 관해 오가는 말을 통해서만 알려진다.\n\n덤스트랭에 관해 오가는 말은, 이 학교가 어둠의 마법을 단지 방어하는 데 그치지 않고 가르친다는 것이다. 이 주장은 영국에서 상식처럼 유통되고, 그곳에 가 본 적 없는 학생들에 의해 되풀이되며, 남아 있는 기록 어디에서도 검증되지 않는다. 여기서 비밀 유지와 평판은 서로 다른 두 사실이 아니라 하나의 기제가 지닌 두 면이다. 학교를 조사로부터 지켜 주는 그 방침이, 동시에 그 학교에 대한 가장 가혹한 묘사가 반박되지 않도록 보장한다. 은폐는 소문을 억누르지 않는다. 소문을 바로잡을 수 있는 유일한 것을 치워 버릴 뿐이다.\n\n기록은 그림을 한층 더 복잡하게 만든다. 이 학교의 가장 악명 높은 옛 학생은 그곳에서 퇴학당했는데, 이는 어떤 종류의 한계선은 유지되고 있었음을 시사한다. 반면 트리위저드 시합 당시의 교장은 스스로 유죄 판결을 받았다가 뒤에 풀려난 사람이었다. 대부분의 제도에서라면 관리자 자격을 박탈당했을 이력이다. 증거는 동시에 두 방향을 가리킨다.\n\n누군가는 그 평판이 그저 마땅한 것이라고 결론지을지도 모른다. 그러나 똑같은 증거는 단지 비밀스럽고 정치적으로 운이 나빴을 뿐인 학교에서도 나올 수 있으며, 기록 안의 어떤 것도 두 가능성을 갈라 놓아 주지 않는다.",
 "gloss": [
  {
   "w": "conceal",
   "ko": "숨기다, 감추다"
  },
  {
   "w": "inspect",
   "ko": "조사하다, 감독 점검하다"
  },
  {
   "w": "circulate",
   "ko": "(소문 등이) 유통되다, 퍼지다"
  },
  {
   "w": "scrutiny",
   "ko": "정밀한 조사, 감시의 눈"
  },
  {
   "w": "concealment",
   "ko": "은폐"
  },
  {
   "w": "notorious",
   "ko": "악명 높은"
  },
  {
   "w": "disqualify",
   "ko": "자격을 박탈하다"
  }
 ],
 "qs": [
  {
   "q": "What is the author's main argument about Durmstrang's secrecy?",
   "opts": [
    "It was adopted in order to protect the students from political persecution.",
    "It has kept the school from attracting applicants outside northern Europe.",
    "It removes the only means by which the school's reputation could be tested.",
    "It demonstrates that the accusations made against the school are false."
   ],
   "ans": 2,
   "exp": "2문단의 'Concealment does not suppress rumor; it removes the only thing that could correct it.'가 핵심이다. (D)는 반대 방향 — 글쓴이는 평판이 거짓이라고 말한 적이 없고, 판정할 수단이 없다고 말한다."
  },
  {
   "q": "According to the passage, what is true of the claim that Durmstrang teaches the Dark Arts?",
   "opts": [
    "It was confirmed by an official inspection of the school.",
    "It is repeated by people who have no direct experience of the school.",
    "It originated with the school's own headmaster during the tournament.",
    "It first appeared at the time of the Triwizard Tournament."
   ],
   "ans": 1,
   "exp": "2문단: 'is repeated by students who have never been there, and is never ... tested.' (A)는 정반대로, 지문은 조사 자체가 불가능하다고 말한다."
  },
  {
   "q": "All of the following are mentioned in the passage EXCEPT",
   "opts": [
    "the expulsion of its most notorious former student",
    "the criminal record of one of its headmasters",
    "the school's position in the far north of Europe",
    "a review of its curriculum carried out by outside authorities"
   ],
   "ans": 3,
   "exp": "(A)와 (B)는 3문단에서 평판을 복잡하게 만드는 요인으로, (C)는 1문단에서 학교의 위치로 언급된다. 외부 기관의 교육과정 심사는 지문 어디에도 없다. (C)를 고르기 쉬우나 1문단 두 번째 문장에 분명히 나온다."
  },
  {
   "q": "What does the author suggest in the final paragraph?",
   "opts": [
    "The available evidence cannot separate two competing explanations.",
    "The school should be closed until it agrees to permit inspection.",
    "Rumors about the school were deliberately spread by rival institutions.",
    "The school's reputation has improved considerably in recent years."
   ],
   "ans": 0,
   "exp": "4문단: 'nothing in the record allows the two possibilities to be told apart.' 판단을 유보하는 결론이다. (C)는 그럴듯하지만 소문의 출처에 대해 지문은 아무 말도 하지 않는다."
  }
 ]
},
{
 "id": "hp-ilvermorny",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "이주·제도",
 "level": 3,
 "title": "Ilvermorny and the Transplanting of an Institution",
 "topic": "일버모니 — 이민자가 옮겨 심은 제도는 무엇을 남기고 무엇을 바꾸는가",
 "passage": "Ilvermorny School of Witchcraft and Wizardry is, in origin, an institution built by someone who was never able to attend the school it resembles. Its founder emigrated from Ireland to North America and established a school whose organizing structure — four houses, a selection ceremony, a house-based ordering of student life — reproduces the pattern of Hogwarts closely enough that the resemblance cannot be accidental. Transplantation of this kind is common in the history of education: people who leave a system rarely invent a replacement from nothing, and instead carry the form they know and fill it with new material.\n\nThe new material is local. The four houses take their names from creatures of the American continent rather than from the founding families of a British castle, and the sorting is performed by carved figures rather than by an inherited object. The frame is imported; the contents are indigenous and adoptive at once. What results is neither a copy nor an original, which is the ordinary condition of institutions carried across an ocean.\n\nThe American context then pushed the school further from its model. After a serious breach of magical secrecy, the North American authorities adopted a statute enforcing near-total separation between magical and non-magical people, extending even to a prohibition on marriage and friendship across that line. A school operating under such a law is not simply a Hogwarts abroad. It educates its students for a stricter isolation than the British system ever required of them.\n\nIt is tempting to read Ilvermorny as an immigrant's answer to exclusion, and the founding story supports that reading. But an institution's later character is set less by its founder's intentions than by the laws under which it must operate, and on that measure the school became something she had not designed.",
 "ko": "일버모니 마법학교는 그 기원에서 보면, 자신이 닮은 그 학교에 끝내 다닐 수 없었던 사람이 세운 기관이다. 설립자는 아일랜드에서 북아메리카로 이주해 학교를 세웠고, 그 학교의 조직 구조 — 네 기숙사, 배정 의식, 기숙사를 중심으로 짜인 학생 생활 — 는 호그와트의 형태를 충분히 가깝게 재현하고 있어 그 닮음이 우연일 수 없다. 이런 종류의 이식은 교육의 역사에서 흔하다. 어떤 제도를 떠난 사람들은 대체물을 무에서 발명하는 일이 드물고, 대신 자기가 아는 형식을 들고 가 그 안을 새로운 재료로 채운다.\n\n새로운 재료는 그 땅의 것이다. 네 기숙사는 영국 성의 창건 가문이 아니라 아메리카 대륙의 생물들에게서 이름을 따오며, 배정은 물려받은 물건이 아니라 조각된 형상들에 의해 이루어진다. 틀은 수입된 것이고, 내용물은 토착적인 동시에 받아들여진 것이다. 그 결과는 복제도 아니고 원본도 아닌 무엇인데, 이는 바다를 건너온 제도의 통상적인 조건이다.\n\n그다음에는 미국이라는 맥락이 이 학교를 그 원형에서 더 멀리 밀어냈다. 마법 비밀 유지가 심각하게 깨진 사건 이후, 북아메리카 당국은 마법사와 비마법인 사이의 거의 완전한 분리를 강제하는 법을 채택했고, 그 분리는 그 선을 넘는 결혼과 우정의 금지에까지 미쳤다. 그런 법 아래에서 운영되는 학교는 단순히 해외에 있는 호그와트가 아니다. 그 학교는 영국의 제도가 학생들에게 한 번도 요구한 적 없는 더 엄격한 고립을 위해 그들을 교육한다.\n\n일버모니를 배제에 대한 한 이민자의 응답으로 읽고 싶어지고, 설립 이야기도 그 독해를 뒷받침한다. 그러나 한 기관의 이후 성격은 설립자의 의도보다 그 기관이 따라야 하는 법에 의해 더 많이 정해지며, 그 척도로 보면 이 학교는 그가 설계하지 않은 무언가가 되었다.",
 "gloss": [
  {
   "w": "transplantation",
   "ko": "이식, 옮겨 심기"
  },
  {
   "w": "resemblance",
   "ko": "닮음, 유사성"
  },
  {
   "w": "indigenous",
   "ko": "토착의, 그 땅 고유의"
  },
  {
   "w": "adoptive",
   "ko": "받아들여 취한, 입양된"
  },
  {
   "w": "breach",
   "ko": "위반, (약속·규정을) 깨뜨림"
  },
  {
   "w": "statute",
   "ko": "제정법, 법령"
  },
  {
   "w": "prohibition",
   "ko": "금지"
  }
 ],
 "qs": [
  {
   "q": "What is the passage mainly concerned with?",
   "opts": [
    "The magical creatures for which Ilvermorny's four houses are named",
    "How a transplanted institution both copies and departs from its model",
    "The reasons the founder was refused admission to a British school",
    "Whether American magical education is harder than British education"
   ],
   "ans": 1,
   "exp": "1문단의 이식 개념('carry the form they know and fill it with new material')과 2문단의 '복제도 원본도 아니다'가 글 전체의 뼈대다. (A)는 2문단의 한 가지 세부일 뿐 주제가 아니다."
  },
  {
   "q": "According to the passage, how does Ilvermorny's sorting differ from that of its model?",
   "opts": [
    "It is carried out by carved figures rather than by an inherited object.",
    "It assigns students to five houses instead of four.",
    "It takes place after the first year rather than before it.",
    "It allows each student to choose a house freely."
   ],
   "ans": 0,
   "exp": "2문단: 'the sorting is performed by carved figures rather than by an inherited object.' (B)는 기숙사 수가 넷으로 동일하다고 1문단에 명시되어 있으므로 틀렸다."
  },
  {
   "q": "The word breach in paragraph 3 is closest in meaning to",
   "opts": [
    "a violation",
    "a withdrawal",
    "a celebration",
    "an agreement"
   ],
   "ans": 0,
   "exp": "3문단에서 이 단어는 그 뒤에 강력한 분리법이 제정되는 계기로 쓰였으므로 비밀 유지가 '깨진' 사건을 뜻한다. (D)는 정반대 의미다."
  },
  {
   "q": "In the final paragraph, the author cautions readers that",
   "opts": [
    "the founder's own account of the school is unreliable",
    "institutions founded by immigrants rarely outlive their founders",
    "the school's later character owes more to law than to founding intentions",
    "historians have exaggerated the resemblance between the two schools"
   ],
   "ans": 2,
   "exp": "4문단: 'an institution's later character is set less by its founder's intentions than by the laws under which it must operate.' (D)는 1문단에서 닮음이 우연일 수 없다고 못 박았으므로 지문과 어긋난다."
  }
 ]
},
{
 "id": "hp-mahoutokoro",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "평가·사회",
 "level": 4,
 "title": "Wearing the Grade: Visible Assessment at Mahoutokoro",
 "topic": "마호우토코로 — 성취를 눈에 보이게 만들면 동기와 낙인이 함께 생긴다",
 "passage": "Mahoutokoro is described in far less detail than most magical schools, and one of the few features consistently attributed to it is also its most interesting as an institution: the robes issued to students are said to change color as the wearer's learning advances. Attainment, on this account, is not stored in a file that a teacher consults. It is worn.\n\nEducational systems generally keep assessment semi-private. A mark is known to the student, the family and the school, and the boundary of that circle is a matter of policy rather than of nature. Making attainment continuously visible to everyone in the room collapses that boundary, and the effect is double in a way that cannot be pulled apart. Visible progress supplies constant feedback and a legible ladder to climb, which are among the conditions under which motivation is sustained. The same visibility converts a slow learner's difficulty into a public fact that follows him through every corridor and every meal. Recognition and stigma are produced by one mechanism, not by two.\n\nThe setting reportedly sharpens the stakes at the other end as well: a robe turning white is associated with a serious violation, so the garment marks disgrace as readily as it marks achievement. A system that can promote in public can also expel in public.\n\nBecause so little is documented, caution is required about how the school actually works. It is possible that the color scale is coarse, shifting rarely and marking broad stages rather than continuous rank, in which case the pressures described here would be much weaker than they sound. Still, the design principle stands whatever its resolution. A school that displays results has decided that the value of shared knowledge outweighs the cost of exposure, and that is a judgment about values, not about teaching method.",
 "ko": "마호우토코로는 대부분의 마법 학교보다 훨씬 적게 묘사되며, 이 학교에 일관되게 부여되는 몇 안 되는 특징 중 하나가 제도로서 가장 흥미로운 지점이기도 하다. 학생에게 지급되는 로브가 입은 사람의 배움이 진전됨에 따라 색이 변한다고 전해진다. 이 설명대로라면 성취는 교사가 들여다보는 서류철에 보관되는 것이 아니다. 그것은 입혀진다.\n\n교육 제도는 대체로 평가를 반쯤 사적인 것으로 유지한다. 성적은 학생과 가족과 학교에 알려지며, 그 원의 경계는 자연의 문제가 아니라 방침의 문제다. 성취를 그 방 안의 모두에게 지속적으로 보이게 만드는 일은 그 경계를 무너뜨리고, 그 효과는 떼어 낼 수 없는 방식으로 이중적이다. 보이는 진전은 끊임없는 피드백과 올라갈 수 있는 읽히는 사다리를 제공하며, 이는 동기가 유지되는 조건에 속한다. 바로 그 가시성이 더딘 학습자의 어려움을 복도마다 식사마다 그를 따라다니는 공개된 사실로 바꾼다. 인정과 낙인은 두 개의 기제가 아니라 하나의 기제에서 생산된다.\n\n이 설정은 반대편 끝에서도 판돈을 키운다고 전해진다. 로브가 흰색으로 변하는 것은 중대한 위반과 결부되며, 따라서 그 옷은 성취를 표시하는 만큼이나 쉽게 불명예를 표시한다. 공개적으로 승격시킬 수 있는 제도는 공개적으로 퇴출시킬 수도 있다.\n\n기록된 것이 워낙 적으므로 이 학교가 실제로 어떻게 작동하는지에 대해서는 신중해야 한다. 색의 척도가 성글어서 드물게만 바뀌고 연속적인 등수가 아니라 넓은 단계를 표시하는 것일 수도 있으며, 그렇다면 여기서 서술한 압력은 들리는 것보다 훨씬 약할 것이다. 그럼에도 설계 원리 자체는 그 해상도가 어떻든 그대로 남는다. 결과를 내보이는 학교는 공유된 앎의 가치가 노출의 대가보다 크다고 결정한 것이며, 그것은 교수법에 관한 판단이 아니라 가치에 관한 판단이다.",
 "gloss": [
  {
   "w": "attainment",
   "ko": "성취, 도달한 수준"
  },
  {
   "w": "legible",
   "ko": "읽어 낼 수 있는, 알아보기 쉬운"
  },
  {
   "w": "stigma",
   "ko": "낙인, 오명"
  },
  {
   "w": "garment",
   "ko": "의복, 옷 한 벌"
  },
  {
   "w": "disgrace",
   "ko": "불명예, 망신"
  },
  {
   "w": "coarse",
   "ko": "성긴, 잘게 나뉘지 않은"
  },
  {
   "w": "outweigh",
   "ko": "~보다 더 크다, 능가하다"
  }
 ],
 "qs": [
  {
   "q": "Which of the following best states the author's main point?",
   "opts": [
    "Making attainment visible produces motivation and stigma through the same mechanism.",
    "Mahoutokoro's assessment is more accurate than written examinations elsewhere.",
    "Colored robes were adopted mainly to reduce the cost of school uniforms.",
    "Japanese magical education places unusually little value on individual achievement."
   ],
   "ans": 0,
   "exp": "2문단 마지막 문장 'Recognition and stigma are produced by one mechanism, not by two.'가 논점을 압축한다. (B)는 정확성 이야기를 지문이 전혀 하지 않으므로 틀렸다."
  },
  {
   "q": "According to the passage, what is a robe turning white associated with?",
   "opts": [
    "The completion of the final year of study",
    "A serious violation committed by the wearer",
    "The highest level of attainment in every subject",
    "The status of a newly admitted student"
   ],
   "ans": 1,
   "exp": "3문단: 'a robe turning white is associated with a serious violation.' (C)는 색 변화가 성취를 표시한다는 전체 설정에 이끌려 고르기 쉬운 오답이지만, 흰색은 반대쪽 끝을 가리킨다."
  },
  {
   "q": "The word coarse in the last paragraph is closest in meaning to",
   "opts": [
    "not finely divided",
    "unusually bright in color",
    "widely admired by outsiders",
    "very strictly enforced"
   ],
   "ans": 0,
   "exp": "4문단에서 이 단어는 바로 뒤의 'marking broad stages rather than continuous rank'로 스스로 풀이된다. (D)는 뒤이어 압력이 약해진다는 서술과 어긋난다."
  },
  {
   "q": "What does the author imply about ordinary assessment systems?",
   "opts": [
    "They deliberately hide results even from a student's own family.",
    "They restrict who is entitled to know a student's results.",
    "They give students feedback more frequently than Mahoutokoro does.",
    "They have given up ranking students in any form."
   ],
   "ans": 1,
   "exp": "2문단의 'A mark is known to the student, the family and the school, and the boundary of that circle is a matter of policy.' 즉 아는 사람의 범위를 제한한다는 뜻이다. (A)는 가족이 포함된다고 명시되어 있으므로 틀렸다."
  }
 ]
},
{
 "id": "hp-uagadou",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "기술·전통",
 "level": 4,
 "title": "The Wand as a Measure of Magic",
 "topic": "지팡이 없는 마법을 결핍으로 읽는 것은 관찰자의 기준을 드러낼 뿐이다",
 "passage": "Among the wizarding schools named in the surviving accounts, Uagadou, in Africa, is described as the largest and as the one most often characterized by an absence. European schools organize instruction around the wand; the available accounts suggest that Uagadou's students are taught to direct magic through the hand and through gesture. Commentators writing from within a wand-based tradition record this as a curiosity, and occasionally as a shortcoming, as though the school had failed to acquire an instrument its rivals possess.\n\nThat framing deserves scrutiny. A wand is a technology, and technologies are not neutral yardsticks of skill. An instrument concentrates and standardizes a practice, but it also constrains it, making the practitioner dependent on an object that can be lost, broken, or confiscated. A tradition that dispenses with such a device is not a step behind one that relies on it; it has shifted the same burden from the object to the body. The surviving reports emphasize precision of gesture, implying a training regime built around bodily discipline rather than mastery of an external tool.\n\nHistorians of education know this pattern well. Curricula are routinely ranked by how closely they resemble the ranker's own, and whatever the ranker lacks a name for is filed under deficiency. A difference in method is thus converted quietly into a difference in rank.\n\nYet the argument should not be inverted into a romance. To assert that wandless practice is plainly equivalent, or superior, rests on evidence as thin as the claim that it is backward. Almost nothing of the school's internal pedagogy has been set down by anyone trained inside it. Until such accounts exist, the defensible conclusion is narrower: what the sources establish is not the relative power of two traditions, but the standard the observers carried with them.",
 "ko": "남아 있는 기록에 이름이 오른 마법 학교들 가운데, 아프리카의 우아가두는 가장 규모가 큰 곳으로, 그리고 어떤 결핍으로 규정되는 일이 가장 잦은 곳으로 서술된다. 유럽의 학교들은 지팡이를 중심으로 수업을 조직한다. 반면 남아 있는 기록들은 우아가두의 학생들이 손과 몸짓으로 마법을 부리도록 배운다고 전한다. 지팡이 전통 안에서 글을 쓰는 논평자들은 이를 진기한 일로, 때로는 결점으로 기록한다. 마치 그 학교가 경쟁 학교들이 가진 도구를 미처 손에 넣지 못한 것처럼 말이다.\n\n이러한 규정 방식은 따져 볼 필요가 있다. 지팡이는 하나의 기술이며, 기술은 실력을 재는 중립적인 잣대가 아니다. 도구는 어떤 실천을 집중시키고 표준화하지만, 동시에 그것을 제약한다. 잃어버리거나 부러지거나 압수될 수 있는 물건에 시전자를 의존하게 만들기 때문이다. 그러한 도구를 쓰지 않는 전통은 도구에 의존하는 전통보다 한 단계 뒤처진 것이 아니다. 같은 부담을 물건에서 몸으로 옮겨 놓은 것이다. 남아 있는 보고들은 몸짓의 정밀함을 강조하는데, 이는 외부 도구의 숙달이 아니라 신체의 훈련을 중심으로 짜인 교육 과정을 시사한다.\n\n교육사를 다루는 이들은 이 유형을 잘 안다. 교육 과정은 흔히 평가자 자신의 것과 얼마나 닮았는가에 따라 서열이 매겨지고, 평가자에게 이름이 없는 것은 무엇이든 결핍 항목으로 분류된다. 그리하여 방법의 차이는 조용히 등급의 차이로 바뀐다.\n\n그러나 이 논증을 뒤집어 미화로 만들어서는 안 된다. 지팡이 없는 실천이 명백히 대등하다거나 더 우월하다고 단언하는 것은, 그것이 뒤떨어졌다는 단언과 똑같이 빈약한 근거 위에 서 있다. 이 학교의 내부 교수법에 대해서는 그 안에서 배운 사람이 남긴 기록이 거의 없다. 그런 기록이 나오기 전까지 방어할 수 있는 결론은 더 좁다. 자료들이 확립해 주는 것은 두 전통의 상대적 힘이 아니라, 관찰자들이 지니고 온 기준이라는 것이다.",
 "gloss": [
  {
   "w": "characterized by an absence",
   "ko": "어떤 결핍으로 규정되는"
  },
  {
   "w": "deserve scrutiny",
   "ko": "면밀히 따져 볼 만하다"
  },
  {
   "w": "yardstick",
   "ko": "판단 기준, 잣대"
  },
  {
   "w": "confiscate",
   "ko": "압수하다, 몰수하다"
  },
  {
   "w": "dispense with",
   "ko": "~ 없이 지내다, ~을 생략하다"
  },
  {
   "w": "pedagogy",
   "ko": "교수법, 교육 방식"
  },
  {
   "w": "defensible",
   "ko": "방어할 수 있는, 타당한"
  }
 ],
 "qs": [
  {
   "q": "What is the main purpose of the passage?",
   "opts": [
    "To describe the daily curriculum of the largest wizarding school",
    "To challenge the assumption that the lack of a wand marks a tradition as less advanced",
    "To argue that gesture-based magic is measurably more powerful than wand magic",
    "To explain how wands were invented and spread across wizarding Europe"
   ],
   "ans": 1,
   "exp": "1문단에서 지팡이 부재를 결점으로 적는 관찰자들을 소개하고, 2문단 첫 문장 That framing deserves scrutiny 이후 그 전제를 반박하는 것이 글 전체의 목적이다. 3번 보기는 마지막 문단에서 저자가 명시적으로 거부하는 주장(미화로 뒤집지 말 것)이므로 오답이다."
  },
  {
   "q": "According to paragraph 2, one disadvantage of relying on an instrument is that",
   "opts": [
    "it makes a practice impossible to standardize",
    "it requires more years of study than gesture does",
    "it prevents a school from growing in size",
    "it ties the practitioner to an object that may be lost or taken away"
   ],
   "ans": 3,
   "exp": "2문단의 making the practitioner dependent on an object that can be lost, broken, or confiscated가 그대로 근거다. 1번은 같은 문장에서 도구가 오히려 표준화한다(concentrates and standardizes)고 했으므로 정반대다."
  },
  {
   "q": "Paragraph 3 suggests that judgments about a school's curriculum often reveal",
   "opts": [
    "the standards held by the person doing the judging",
    "the true difficulty of the subjects being taught",
    "the number of students a school can admit",
    "the age of the institution being evaluated"
   ],
   "ans": 0,
   "exp": "3문단의 Curricula are routinely ranked by how closely they resemble the ranker's own에서 추론된다. 서열이 대상의 실제 수준이 아니라 평가자의 기준을 반영한다는 것이므로, 과목의 실제 난이도를 드러낸다는 2번은 지문의 논지와 어긋난다."
  },
  {
   "q": "The word romance in the last paragraph is closest in meaning to",
   "opts": [
    "a love story",
    "a long historical record",
    "an idealized account",
    "a private confession"
   ],
   "ans": 2,
   "exp": "마지막 문단은 지팡이 없는 마법을 우월하다고 단언하는 것도 근거가 빈약하다고 하므로, romance는 대상을 미화한 이야기, 즉 idealized account를 뜻한다. 1번은 단어의 일상적 의미일 뿐 문맥에 맞지 않는다."
  }
 ]
},
{
 "id": "hp-castelobruxo",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "지식·지리",
 "level": 4,
 "title": "When a Curriculum Belongs to a Place",
 "topic": "카스텔로브루쉬의 강점은 지식이 땅에 묶여 있음을 보여 준다",
 "passage": "Castelobruxo, described as a South American school set within the Amazonian rainforest, is known above all for two subjects: herbology and the study of magical creatures. Accounts note that visiting students are drawn by precisely those strengths, and that its reputation abroad rests on them rather than on the breadth of its teaching.\n\nThe obvious explanation is also the analytically interesting one: the curriculum reflects its site. A school surrounded by plant and animal life that has never been fully catalogued will produce specialists in plants and animals, not because anyone decreed it but because the material of study lies within walking distance. The forest is a laboratory that cannot be moved. Knowledge of this kind is not portable in the way a formula is; it is bound to specimens, seasons, and terrain, and decays when separated from them.\n\nExchange arrangements appear designed to loosen that binding, and to a degree they do. Yet an exchange carries students to the knowledge rather than the knowledge to students, and in doing so it confirms the very localization it seems to overcome. Visitors leave with notes and, at best, trained judgment; the conditions that generated the expertise stay where they were. Sociologists of science observe a comparable asymmetry elsewhere: field-based expertise stays attached to its sites, so that prestige accrues to whoever holds the terrain.\n\nThis is at once a strength and a vulnerability. An advantage grounded in access to an environment lasts only as long as the access does, and no internal reform could preserve a standing the forest had stopped supplying. The causal arrow may also run partly the other way: a school founded for unrelated reasons could have cultivated later the specialties its surroundings made cheapest to teach. The surviving descriptions do not settle that question. The safer claim is that place and curriculum here reinforce one another, whichever came first.",
 "ko": "카스텔로브루쉬는 아마존 우림 안에 자리한 남아메리카의 학교로 서술되며, 무엇보다도 약초학과 마법 생물 연구라는 두 과목으로 알려져 있다. 기록들은 방문 학생들이 바로 그 강점에 이끌려 온다는 점, 그리고 해외에서의 명성이 수업의 폭이 아니라 그 두 분야에 기대고 있다는 점을 언급한다.\n\n뻔한 설명이 분석적으로도 흥미로운 설명이다. 교육 과정은 그 장소를 반영한다. 아직 온전히 목록화되지 않은 식물과 동물에 둘러싸인 학교는 식물과 동물의 전문가를 배출하게 된다. 누가 그렇게 정해서가 아니라, 연구 대상이 걸어갈 수 있는 거리 안에 있기 때문이다. 그 숲은 옮길 수 없는 실험실이다. 이런 종류의 지식은 공식이 이동하는 방식으로 이동하지 않는다. 그것은 표본과 계절과 지형에 묶여 있으며, 그것들로부터 떼어 내면 부패한다.\n\n교환학생 제도는 그 결박을 느슨하게 하려는 것으로 보이고, 어느 정도는 실제로 그렇게 한다. 그러나 교환은 지식을 학생에게 실어 보내는 것이 아니라 학생을 지식에게로 실어 보내며, 그럼으로써 극복하려는 듯 보였던 그 지역성을 오히려 확증한다. 방문자들은 기록을, 잘해야 훈련된 판단력을 가지고 떠나지만, 그 전문성을 만들어 낸 조건들은 있던 자리에 그대로 남는다. 과학사회학자들은 다른 영역에서도 비슷한 비대칭을 관찰한다. 현장에 기반한 전문성은 그 현장에 붙어 있어서, 명성은 그 땅을 쥔 쪽에 쌓인다.\n\n이것은 강점인 동시에 취약점이다. 어떤 환경에 대한 접근에 뿌리를 둔 우위는 그 접근이 지속되는 동안만 지속되며, 숲이 더 이상 공급해 주지 않게 된 지위를 내부 개혁으로 지켜 낼 수는 없다. 인과의 화살이 부분적으로는 반대 방향일 수도 있다. 다른 이유로 세워진 학교가 나중에 주변 환경 덕에 가장 값싸게 가르칠 수 있는 분야를 키워 냈을 수도 있다는 것이다. 남아 있는 서술들은 그 물음을 매듭짓지 못한다. 더 안전한 주장은, 무엇이 먼저였든 이곳에서는 장소와 교육 과정이 서로를 강화한다는 것이다.",
 "gloss": [
  {
   "w": "catalogue (v.)",
   "ko": "목록으로 정리하다, 분류 기록하다"
  },
  {
   "w": "decree",
   "ko": "명령으로 정하다, 포고하다"
  },
  {
   "w": "portable",
   "ko": "옮길 수 있는, 이동 가능한"
  },
  {
   "w": "terrain",
   "ko": "지형, 지대"
  },
  {
   "w": "localization",
   "ko": "국지화, 특정 장소에 묶임"
  },
  {
   "w": "asymmetry",
   "ko": "비대칭"
  },
  {
   "w": "accrue to",
   "ko": "~에게 쌓이다, 돌아가다"
  }
 ],
 "qs": [
  {
   "q": "Which of the following best states the main idea of the passage?",
   "opts": [
    "Castelobruxo teaches a wider range of subjects than its reputation suggests",
    "Exchange programs have replaced field study at most magical schools",
    "The school's academic strengths are inseparable from the place it occupies",
    "Herbology is intrinsically more demanding than other magical subjects"
   ],
   "ans": 2,
   "exp": "2문단의 The curriculum reflects its site와 마지막 문단의 place and curriculum here reinforce one another가 논지다. 1번은 오히려 지문이 명성이 수업의 폭이 아니라 두 분야에 기댄다고 말한 것과 반대다."
  },
  {
   "q": "According to paragraph 3, exchange arrangements ultimately",
   "opts": [
    "confirm that the expertise remains tied to its location",
    "transfer the forest's conditions to other institutions",
    "reduce the school's reputation among foreign scholars",
    "replace field observation with written instruction"
   ],
   "ans": 0,
   "exp": "3문단의 an exchange carries students to the knowledge rather than carrying the knowledge to students, and in doing so it confirms the very localization가 근거다. 2번은 같은 문단이 그 조건들은 있던 자리에 남는다고 명시하므로 틀렸다."
  },
  {
   "q": "All of the following are mentioned in the passage as things bound to the school's site EXCEPT",
   "opts": [
    "specimens",
    "seasons",
    "terrain",
    "written formulas"
   ],
   "ans": 3,
   "exp": "2문단은 지식이 specimens, seasons, terrain에 묶인다고 열거하면서, 공식(formula)은 오히려 이동 가능한 것의 예로 대비시켰다. 따라서 4번이 정답이다."
  },
  {
   "q": "It can be inferred from the last paragraph that the author would consider the school's position",
   "opts": [
    "permanently secure because of its long history",
    "dependent on conditions the school does not fully control",
    "weaker than that of schools without a fixed campus",
    "irrelevant to how outsiders judge its teaching"
   ],
   "ans": 1,
   "exp": "마지막 문단의 An advantage grounded in access to an environment lasts only as long as the access does에서, 지위가 학교 바깥의 조건에 달려 있음을 추론할 수 있다. 1번은 저자가 취약점이라고 못 박은 부분과 정면으로 충돌한다."
  }
 ]
},
{
 "id": "hp-koldovstoretz",
 "exam": "TOEFL",
 "series": "⚡ 해리 포터",
 "type": "사료·공백",
 "level": 4,
 "title": "What the Archive Does Not Say",
 "topic": "기록의 공백은 대상이 아니라 기록자의 위치를 알려 준다",
 "passage": "Of the wizarding schools named in the surviving sources, the Russian institution called Koldovstoretz is the one about which almost nothing is reported. A name, a country, and a single sporting detail, namely that its students are said to play Quidditch mounted on whole uprooted trees rather than on brooms, make up very nearly the entire entry. Set beside the pages devoted to other schools, this is not a description at all. It is a gap.\n\nThe temptation is to fill the gap with plausible invention. A more disciplined response treats the gap itself as evidence. Archival silence is seldom random. It ordinarily maps the travels, languages, and interests of whoever compiled the record. Institutions written about at length tend to be the ones with which the compiler's own institution corresponded, traded students, or competed for prestige. The distribution of detail therefore traces a network of contact, and the thinnest entries mark the outer edge of that network rather than the outer edge of importance.\n\nThe one surviving detail is instructive in the same way. It is not a founding date or a course of study but an eccentric practice, which is exactly the kind of item that survives transmission when an outsider reports on a distant place. Anecdotes travel well; timetables do not. What the preserved fact chiefly reveals, then, is the genre of the source, something closer to a traveler's note than to an institutional history.\n\nNone of this establishes that the school conceals a wealth of features awaiting discovery. The argument cuts in one direction only. Absence of record is not a record of absence, yet neither is it evidence of hidden abundance. The school may in fact be small, or reserved about its affairs, or simply distant from those who wrote. What can responsibly be said is modest and methodological: before treating a thin entry as a description of a thing, one should ask who was in a position to write it.",
 "ko": "남아 있는 자료에 이름이 오른 마법 학교들 가운데, 콜도보스트레츠라 불리는 러시아의 학교는 보고된 바가 거의 없는 곳이다. 이름 하나, 나라 하나, 그리고 학생들이 빗자루가 아니라 통째로 뽑아낸 나무를 타고 퀴디치를 한다고 전해진다는 스포츠 관련 세부 하나가 사실상 항목 전체를 이룬다. 다른 학교들에 할애된 여러 쪽과 나란히 놓고 보면 이것은 서술이라 할 수 없다. 그것은 공백이다.\n\n유혹은 그 공백을 그럴듯한 창작으로 메우는 것이다. 더 절제된 대응은 그 공백 자체를 증거로 다루는 것이다. 기록의 침묵은 좀처럼 무작위가 아니다. 그것은 대개 기록을 편찬한 사람의 이동 경로와 언어와 관심사를 그려 낸다. 길게 서술된 기관들은 대체로 편찬자 자신의 기관과 서신을 주고받았거나, 학생을 교류했거나, 명성을 두고 경쟁한 곳들이다. 따라서 세부 정보의 분포는 접촉의 연결망을 따라 그려지며, 가장 얄팍한 항목들은 중요성의 변방이 아니라 그 연결망의 변방을 표시한다.\n\n하나 남은 그 세부도 같은 방식으로 시사적이다. 그것은 설립 연도나 교과 과정이 아니라 기이한 관행인데, 이는 외부인이 먼 곳에 대해 보고할 때 전달 과정에서 살아남는 바로 그런 종류의 항목이다. 일화는 잘 옮겨 다니지만 시간표는 그렇지 않다. 그러므로 보존된 그 사실이 주로 드러내는 것은 자료의 갈래다. 기관의 역사라기보다 여행자의 메모에 가까운 무엇 말이다.\n\n이 가운데 어떤 것도 그 학교가 발견을 기다리는 풍부한 특징을 감추고 있음을 입증하지는 않는다. 이 논증은 한쪽으로만 작동한다. 기록의 부재가 부재의 기록은 아니지만, 그렇다고 감춰진 풍요의 증거도 아니다. 그 학교는 실제로 작을 수도, 자기 일에 대해 말을 아낄 수도, 그저 기록한 자들로부터 멀리 있었을 수도 있다. 책임 있게 말할 수 있는 것은 소박하고 방법론적이다. 얄팍한 항목을 어떤 대상에 대한 서술로 취급하기 전에, 누가 그것을 쓸 수 있는 위치에 있었는지를 물어야 한다는 것이다.",
 "gloss": [
  {
   "w": "uprooted",
   "ko": "뿌리째 뽑힌"
  },
  {
   "w": "archival silence",
   "ko": "기록의 침묵, 사료상의 공백"
  },
  {
   "w": "compile",
   "ko": "(자료를) 편찬하다, 모아 엮다"
  },
  {
   "w": "eccentric",
   "ko": "기이한, 별난"
  },
  {
   "w": "transmission",
   "ko": "전달, 전승"
  },
  {
   "w": "abundance",
   "ko": "풍부함, 다량"
  },
  {
   "w": "methodological",
   "ko": "방법론적인"
  }
 ],
 "qs": [
  {
   "q": "The passage is primarily concerned with",
   "opts": [
    "reconstructing the daily life of a little-known school",
    "proving that Quidditch was played differently in Russia",
    "comparing the sports of several wizarding schools",
    "explaining what a lack of documentation can and cannot show"
   ],
   "ans": 3,
   "exp": "2문단의 treats the gap itself as evidence와 마지막 문단의 방법론적 결론이 글의 중심이다. 1번은 저자가 2문단 첫 문장에서 유혹이라며 명시적으로 물리치는 접근이므로 오답이다."
  },
  {
   "q": "According to paragraph 2, schools that receive lengthy entries in the record are typically those that",
   "opts": [
    "produced the greatest number of famous graduates",
    "had contact with the institution doing the recording",
    "kept the most complete internal documents",
    "were founded earliest in the region"
   ],
   "ans": 1,
   "exp": "2문단의 the ones with which the compiler's own institution corresponded, traded students, or competed for prestige가 근거다. 3번은 지문이 편찬자 쪽의 접촉을 기준으로 삼았지 대상 학교의 내부 문서 상태를 말하지 않았으므로 틀렸다."
  },
  {
   "q": "What can be inferred about the detail concerning trees and Quidditch?",
   "opts": [
    "It survived because striking anecdotes travel more easily than routine information",
    "It was recorded by teachers working inside the school",
    "It proves that the school rejected the customs of other schools",
    "It was the only fact the school allowed outsiders to publish"
   ],
   "ans": 0,
   "exp": "3문단의 Anecdotes travel well; timetables do not와 an outsider reports on a distant place에서 추론된다. 2번은 저자가 그 자료를 여행자의 메모에 가깝다고 규정한 것과 어긋난다."
  },
  {
   "q": "In the last paragraph, the word modest is closest in meaning to",
   "opts": [
    "shy about praise",
    "expensive to verify",
    "limited in scope",
    "recently discovered"
   ],
   "ans": 2,
   "exp": "마지막 문단은 결론을 좁게 한정하며 방법론적 조언만 남기므로, modest는 범위가 제한된이라는 뜻이다. 1번은 사람의 성격을 가리키는 일상적 의미로 문맥에 맞지 않는다."
  }
 ]
}
];
