/* ============================================================
   TOEIC Part 7 보강 — 단일 지문 10세트 + 멀티 지문 3세트
   ------------------------------------------------------------
   Part 7 전반부(147~175번)는 지문 하나에 2~4문항이 붙는다.
   후반부(176~200번)의 연계 문제와 달리, 여기서 점수를 깎는 것은
   대개 다음 세 가지다.

   ① 의도 파악 — 문자·채팅 지문에서 "At 10:42, what does she mean
      when she writes ~?" 로 묻는다. 그 한 줄이 아니라 바로 앞
      상대방의 말이 답을 정한다.
   ② 문장 삽입 — [1]~[4] 자리 중 하나를 고르는 문제. 넣을 문장의
      지시어(this, they, instead)가 가리킬 대상이 바로 앞에
      있어야 한다.
   ③ NOT / true 문제 — 셋은 지문에 있고 하나만 없다. 소거로 풀되
      "지문에 없는 것"과 "지문과 반대인 것"을 구분해야 한다.

   window.PART7_SINGLE : 단일 지문 (passage/ko 를 직접 가진다)
   window.PART7_EXTRA  : 멀티 지문 (part7.js 와 같은 docs 형식)
   ============================================================ */

window.PART7_SINGLE = [

  /* ═══════════ 1. 광고 — 회계 소프트웨어 ═══════════ */
  {id:"p7s-1", exam:"TOEIC", part7:true, kind:"single", level:2,
   series:"🏢 비즈니스 실무", type:"Part 7 · 광고", title:"Ledgerly for Small Business",
   topic:"소상공인용 회계 소프트웨어 광고",
   passage:"LEDGERLY\nAccounting that fits in a lunch break\n\nIf you run a business with fewer than twenty employees, you did not start it because you love bookkeeping. Ledgerly handles invoices, expenses, and quarterly tax summaries so that you can spend your evenings somewhere other than a spreadsheet.\n\n• Connect your bank account and Ledgerly sorts transactions automatically\n• Send an invoice from your phone in under a minute\n• Export a complete tax summary with one click\n• Unlimited support by chat, seven days a week\n\nPlans start at $18 a month. There is no setup fee and no annual contract.\n\nTry Ledgerly free for thirty days. We will not ask for card details until the trial ends, and if you decide it is not for you, simply let the trial lapse — no cancellation is necessary.\n\nSwitching from another program? Send us your existing records in any common format and our migration team will move them for you at no charge. Most transfers are completed within two business days.\n\nledgerly.com/start",
   ko:"레저리\n점심시간 안에 끝나는 회계\n\n직원이 20명 미만인 사업체를 운영하고 계신다면, 장부 정리가 좋아서 창업하신 것은 아닐 겁니다. 레저리가 청구서, 경비, 분기 세무 요약을 처리해 드리니 저녁 시간을 스프레드시트가 아닌 다른 곳에서 보내십시오.\n\n• 은행 계좌를 연결하면 레저리가 거래 내역을 자동으로 분류합니다\n• 휴대폰으로 1분 안에 청구서를 발송하세요\n• 클릭 한 번으로 완전한 세무 요약을 내보내세요\n• 주 7일 채팅 무제한 지원\n\n요금제는 월 18달러부터 시작합니다. 설치비가 없고 연간 계약도 없습니다.\n\n30일간 무료로 사용해 보십시오. 체험 기간이 끝날 때까지 카드 정보를 요구하지 않으며, 맞지 않다고 판단하시면 체험 기간이 그냥 만료되게 두시면 됩니다. 별도의 해지 절차가 필요 없습니다.\n\n다른 프로그램에서 옮겨 오시나요? 일반적인 형식이면 어떤 형식이든 기존 기록을 보내 주시면 저희 이전 담당팀이 무료로 옮겨 드립니다. 대부분의 이전은 영업일 기준 이틀 안에 완료됩니다.\n\nledgerly.com/start",
   gloss:[{w:"bookkeeping",ko:"장부 정리, 부기"},{w:"invoice",ko:"청구서"},{w:"lapse",ko:"(기한이) 만료되다"},
          {w:"migration",ko:"(데이터) 이전"},{w:"business day",ko:"영업일"}],
   qs:[
     {q:"For whom is the advertisement most likely intended?",
      opts:["Owners of small companies","Certified tax auditors","Bank branch managers","Software developers"],
      ans:0, exp:"첫 문장 'If you run a business with fewer than twenty employees'에서 대상이 소규모 사업주임을 밝힌다."},
     {q:"What is indicated about the free trial?",
      opts:["It lasts for two business days.","It requires payment details in advance.","It ends without any action from the user.","It is limited to new businesses."],
      ans:2, exp:"'simply let the trial lapse — no cancellation is necessary.' 아무것도 하지 않으면 그대로 끝난다. (B)는 'We will not ask for card details until the trial ends'와 정반대다."},
     {q:"What does Ledgerly offer at no cost to customers switching from other programs?",
      opts:["An extended trial period","Transfer of existing records","A discounted annual plan","On-site installation"],
      ans:1, exp:"마지막 문단: 'our migration team will move them for you at no charge.'"},
     {q:"What is NOT mentioned as a feature of the service?",
      opts:["Automatic sorting of bank transactions","Tax summaries that can be exported","Support available every day","Printed monthly statements"],
      ans:3, exp:"인쇄된 월간 명세서는 어디에도 없다. 나머지 셋은 불릿 목록에 그대로 있다."}
   ]},

  /* ═══════════ 2. 문자 대화 — 배송 트럭 고장 ═══════════ */
  {id:"p7s-2", exam:"TOEIC", part7:true, kind:"single", level:3,
   series:"🏢 비즈니스 실무", type:"Part 7 · 문자 대화", title:"Delivery Van Breakdown",
   topic:"배송 차량 고장을 두고 주고받은 문자 대화",
   passage:"Renata Blau  [8:12 A.M.]\nThe van won't start. I'm still at the depot.\n\nOskar Vance  [8:14 A.M.]\nBattery again?\n\nRenata Blau  [8:15 A.M.]\nLooks like it. Nothing at all when I turn the key.\n\nOskar Vance  [8:16 A.M.]\nOK. The Hillcrest order has to be there before eleven — they close for stocktaking at noon.\n\nRenata Blau  [8:17 A.M.]\nI know. Can I take the small truck?\n\nOskar Vance  [8:19 A.M.]\nMarcus has it until ten. He's doing the Fenwick run.\n\nRenata Blau  [8:20 A.M.]\nThen that's cutting it very fine.\n\nOskar Vance  [8:22 A.M.]\nAgreed. Let me call Marcus and see if he can drop the Fenwick boxes on his way back instead. They're not time-sensitive.\n\nRenata Blau  [8:23 A.M.]\nThat would work. In the meantime I'll load the Hillcrest pallets onto the loading bay so we lose no time.\n\nOskar Vance  [8:25 A.M.]\nGood. I'll also get the garage to look at the van today rather than Thursday. This is the third time this month.",
   ko:"레나타 블라우 [오전 8:12]\n밴이 시동이 안 걸려요. 아직 창고에 있어요.\n\n오스카 밴스 [오전 8:14]\n또 배터리인가요?\n\n레나타 블라우 [오전 8:15]\n그런 것 같아요. 키를 돌려도 아무 반응이 없어요.\n\n오스카 밴스 [오전 8:16]\n알겠어요. 힐크레스트 주문은 11시 전에 도착해야 해요. 거기 정오에 재고조사로 문을 닫아요.\n\n레나타 블라우 [오전 8:17]\n알아요. 소형 트럭을 써도 될까요?\n\n오스카 밴스 [오전 8:19]\n마커스가 10시까지 쓰고 있어요. 펜윅 배송을 도는 중이에요.\n\n레나타 블라우 [오전 8:20]\n그러면 시간이 너무 빠듯한데요.\n\n오스카 밴스 [오전 8:22]\n동의해요. 마커스한테 전화해서 펜윅 상자들을 돌아오는 길에 대신 내려 줄 수 있는지 알아볼게요. 그건 시간에 쫓기는 건 아니니까요.\n\n레나타 블라우 [오전 8:23]\n그러면 되겠네요. 그동안 저는 시간 낭비 없도록 힐크레스트 팔레트를 하역장에 실어 둘게요.\n\n오스카 밴스 [오전 8:25]\n좋아요. 그리고 정비소에 목요일 말고 오늘 밴을 봐 달라고 할게요. 이번 달만 세 번째예요.",
   gloss:[{w:"depot",ko:"차고, 물류 창고"},{w:"stocktaking",ko:"재고 조사"},{w:"cut it fine",ko:"시간이 아슬아슬하다"},
          {w:"time-sensitive",ko:"시간에 민감한, 급한"},{w:"loading bay",ko:"하역장"}],
   qs:[
     {q:"Why is the Hillcrest delivery urgent?",
      opts:["The van is scheduled for repair.","The customer closes at midday.","Marcus is unavailable after ten.","The pallets cannot be stored overnight."],
      ans:1, exp:"8:16 'they close for stocktaking at noon.' 정오 마감이 급한 이유다."},
     {q:"At 8:20 A.M., what does Ms. Blau most likely mean when she writes, \"Then that's cutting it very fine\"?",
      opts:["The truck is too small for the load.","There will barely be enough time to arrive.","The route is longer than she expected.","She would rather wait for the van to be fixed."],
      ans:1, exp:"바로 앞 8:19에서 '소형 트럭은 10시까지 쓸 수 없다'고 했다. 11시 마감에 10시 출발이면 시간이 빠듯하다는 뜻이다."},
     {q:"What does Mr. Vance propose doing?",
      opts:["Asking a colleague to change the order of his stops","Renting a vehicle for the day","Postponing the Hillcrest delivery","Sending the pallets by courier"],
      ans:0, exp:"8:22 'see if he can drop the Fenwick boxes on his way back instead' — 마커스에게 배송 순서를 바꿔 달라고 부탁하겠다는 것이다."},
     {q:"What does Mr. Vance suggest about the van?",
      opts:["It was serviced on Thursday.","It has broken down repeatedly.","It belongs to another depot.","It will be sold this month."],
      ans:1, exp:"마지막 줄 'This is the third time this month.' 같은 달에만 세 번째 고장이다."}
   ]},

  /* ═══════════ 3. 공지 — 사내 도서관 이용 규정 ═══════════ */
  {id:"p7s-3", exam:"TOEIC", part7:true, kind:"single", level:2,
   series:"🏢 비즈니스 실무", type:"Part 7 · 공지", title:"Resource Room: New Borrowing Rules",
   topic:"사내 자료실 대출 규정 변경 공지",
   passage:"NOTICE — Resource Room\n\nFrom 1 June the borrowing rules for the fourth-floor resource room will change. Please read the following before your next visit.\n\nLoan period. Books and bound reports may be borrowed for four weeks rather than two. — [1] — Journals and standards documents remain reference-only and may not leave the room.\n\nRenewals. A loan may be renewed twice online. After that the item must be returned to the desk, though it may be borrowed again the same day if no one else has requested it.\n\nRequests. If an item you need is on loan, place a request through the intranet catalogue. — [2] — The borrower will be notified and the loan will not be renewable again.\n\nOverdue items. We are removing overdue fines. — [3] — Instead, borrowing privileges are suspended until the item is returned. Staff with suspended privileges may still use the room for reference.\n\nDonations. Departments clearing shelf space are welcome to offer material to the resource room. — [4] — Please e-mail a list first; we cannot accept unsolicited deliveries.\n\nRuth Kalman, Information Services",
   ko:"공지 — 자료실\n\n6월 1일부터 4층 자료실 대출 규정이 변경됩니다. 다음 방문 전에 아래 내용을 읽어 주십시오.\n\n대출 기간. 도서와 제본된 보고서는 2주가 아니라 4주간 대출하실 수 있습니다. — [1] — 학술지와 규격 문서는 그대로 열람 전용이며 자료실 밖으로 반출할 수 없습니다.\n\n연장. 대출은 온라인으로 두 번까지 연장하실 수 있습니다. 그 후에는 데스크로 반납하셔야 하지만, 다른 요청자가 없다면 같은 날 다시 대출하실 수 있습니다.\n\n예약. 필요한 자료가 대출 중이면 인트라넷 목록에서 예약을 걸어 주십시오. — [2] — 대출자에게 통보되며 해당 대출은 더 이상 연장되지 않습니다.\n\n연체. 연체료를 폐지합니다. — [3] — 대신 자료를 반납하실 때까지 대출 권한이 정지됩니다. 권한이 정지된 직원도 자료실에서 열람은 하실 수 있습니다.\n\n기증. 서가를 정리하는 부서는 자료실에 자료를 제안해 주셔도 좋습니다. — [4] — 먼저 목록을 이메일로 보내 주십시오. 사전 협의 없이 보내신 자료는 받을 수 없습니다.\n\n정보서비스팀 루스 칼만",
   gloss:[{w:"loan period",ko:"대출 기간"},{w:"reference-only",ko:"열람 전용의"},{w:"overdue",ko:"연체된"},
          {w:"suspend",ko:"정지하다"},{w:"unsolicited",ko:"요청하지 않은"}],
   qs:[
     {q:"What is the main purpose of the notice?",
      opts:["To announce the opening of a new room","To explain changes to a lending policy","To request donations of office equipment","To advertise a training course"],
      ans:1, exp:"첫 문단이 'the borrowing rules … will change'로 목적을 밝힌다."},
     {q:"What is stated about journals?",
      opts:["They may be borrowed for four weeks.","They can be renewed twice.","They must be used in the room.","They are being donated to departments."],
      ans:2, exp:"'Journals and standards documents remain reference-only and may not leave the room.'"},
     {q:"What happens to employees who keep an item too long?",
      opts:["They pay a daily fine.","They cannot borrow until they return it.","They lose access to the room entirely.","They must renew the item online."],
      ans:1, exp:"'borrowing privileges are suspended until the item is returned.' 벌금은 폐지됐고(A 오답), 열람은 계속 가능하다(C 오답)."},
     {q:"In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\n\"This change follows feedback that the charges were more trouble to administer than they were worth.\"",
      opts:["[1]","[2]","[3]","[4]"], ans:2,
      exp:"the charges(그 요금)가 가리킬 대상은 바로 앞 문장의 overdue fines뿐이다. 따라서 [3]. 다른 자리에는 '요금'이라는 언급이 없어 지시어가 붕 뜬다."}
   ]},

  /* ═══════════ 4. 이메일 — 케이터링 견적 문의 ═══════════ */
  {id:"p7s-4", exam:"TOEIC", part7:true, kind:"single", level:2,
   series:"🏢 비즈니스 실무", type:"Part 7 · 이메일", title:"Quote Request for Staff Event",
   topic:"창립 기념 행사 케이터링 견적 문의 이메일",
   passage:"To:      events@brambleandpike.com\nFrom:    j.duarte@ostermann-eng.com\nDate:    12 February\nSubject: Quote request — 24 April\n\nHello,\n\nI am organising an evening reception for Ostermann Engineering on Thursday, 24 April, and would like a quotation.\n\nDetails as we currently have them:\n\n  Guests:   about 90, possibly up to 110\n  Venue:    our atrium at 4 Rendel Court (we supply tables and glassware)\n  Time:     6:30 P.M. to 9:30 P.M.\n  Format:   standing reception, no seated meal\n\nWe would like eight or nine hot and cold items served through the evening rather than all at once. Roughly a quarter of our guests do not eat meat, and we have two guests with severe nut allergies, so I would need to see ingredient lists in advance.\n\nTwo further questions. First, do you provide staff to serve, or is the food delivered only? Second, is there a surcharge if the final number rises above 100? Our headcount will not be confirmed until 10 April.\n\nWe used your company for a smaller lunch in 2022 and were very pleased, which is why I am coming back to you first. If you are already booked that evening, I would be grateful if you could tell me soon rather than late, as the date cannot move.\n\nBest regards,\nJúlia Duarte\nOffice Manager, Ostermann Engineering",
   ko:"수신: events@brambleandpike.com\n발신: j.duarte@ostermann-eng.com\n날짜: 2월 12일\n제목: 견적 요청 — 4월 24일\n\n안녕하세요,\n\n4월 24일 목요일에 오스터만 엔지니어링의 저녁 리셉션을 준비하고 있어 견적을 받고 싶습니다.\n\n현재까지 정해진 사항입니다:\n\n  인원:   약 90명, 최대 110명까지 가능\n  장소:   렌델 코트 4번지 저희 아트리움 (테이블과 유리잔은 저희가 준비)\n  시간:   오후 6시 30분 ~ 9시 30분\n  형식:   착석 식사 없이 스탠딩 리셉션\n\n따뜻한 음식과 찬 음식 여덟아홉 가지를 한꺼번에가 아니라 저녁 내내 나누어 내주셨으면 합니다. 손님의 약 4분의 1이 고기를 드시지 않고, 견과류 알레르기가 심한 손님이 두 분 계셔서 재료 목록을 미리 봐야 합니다.\n\n두 가지 더 여쭙습니다. 첫째, 서빙 인력을 제공하시는지, 아니면 음식 배달만 하시는지요. 둘째, 최종 인원이 100명을 넘으면 추가 요금이 있는지요. 저희 인원은 4월 10일에야 확정됩니다.\n\n2022년에 소규모 오찬 때 귀사를 이용하고 매우 만족했기에 이번에도 먼저 연락드립니다. 그날 저녁 이미 예약이 차 있으시면 날짜를 옮길 수 없으니 늦지 않게 알려 주시면 감사하겠습니다.\n\n오스터만 엔지니어링 총무 담당\n줄리아 두아르테 드림",
   gloss:[{w:"quotation",ko:"견적(서)"},{w:"atrium",ko:"(건물 중앙의) 아트리움, 홀"},{w:"surcharge",ko:"추가 요금"},
          {w:"headcount",ko:"인원수"},{w:"in advance",ko:"미리"}],
   qs:[
     {q:"What is Ms. Duarte's main reason for writing?",
      opts:["To confirm a booking she has already made","To obtain a price estimate for an event","To complain about a previous order","To change the date of a reception"],
      ans:1, exp:"제목과 첫 문장이 'would like a quotation' — 견적 요청이다."},
     {q:"What will Ostermann Engineering provide itself?",
      opts:["Serving staff","Tables and glassware","Ingredient lists","Hot and cold dishes"],
      ans:1, exp:"Venue 항목의 괄호: '(we supply tables and glassware)'."},
     {q:"Why does Ms. Duarte request ingredient information?",
      opts:["Some guests have dietary restrictions.","The venue requires it by law.","She is comparing two caterers.","The food must be labelled for display."],
      ans:0, exp:"고기를 먹지 않는 손님과 견과류 알레르기 손님이 있어서다."},
     {q:"What does Ms. Duarte indicate about the date of the event?",
      opts:["It may be moved to April 10.","It has not yet been decided.","It cannot be changed.","It depends on the final headcount."],
      ans:2, exp:"마지막 문단 'as the date cannot move.' 4월 10일은 인원 확정일이지 행사 날짜가 아니다."}
   ]},

  /* ═══════════ 5. 기사 — 시내버스 노선 개편 ═══════════ */
  {id:"p7s-5", exam:"TOEIC", part7:true, kind:"single", level:3,
   series:"🏢 비즈니스 실무", type:"Part 7 · 기사", title:"Bus Network Redesign Divides Riders",
   topic:"시내버스 노선 개편을 둘러싼 찬반 기사",
   passage:"WESTMARCH — The transit authority's redesigned bus network took effect on Monday, replacing forty-one routes with twenty-eight. Officials say the change will make buses more frequent; some riders say it has made their own journey longer.\n\nThe logic behind the redesign is straightforward. Under the old network, many routes ran once an hour, which is too infrequent to be useful for anyone without a fixed schedule. By concentrating the same number of vehicles on fewer corridors, the authority can run buses every ten to twelve minutes on the busiest streets.\n\nFor riders on those corridors, the improvement is immediate. Ivo Petran, who commutes from Ashgrove to the hospital district, said his wait had dropped from twenty minutes to under five. \"I no longer plan my morning around a timetable,\" he said.\n\nThe complaints come from the edges of the map. Several low-density neighbourhoods lost direct service and now require a transfer. Deborah Wyn, who lives in Palmer Heights, said her trip to the city centre had grown from thirty-five minutes to nearly an hour. \"Frequency does not help me if the bus no longer comes near my house,\" she said.\n\nThe authority acknowledges the trade-off. Planning director Samuel Oyelaran said roughly eight percent of current riders would see longer trips, while about sixty percent would see shorter ones. He added that three on-demand shuttle zones will begin operating in June to serve the areas that lost direct routes, and that the authority will publish ridership figures every quarter so the public can judge the outcome.",
   ko:"웨스트마치 — 교통공사의 개편된 버스 노선망이 월요일부터 시행되어 41개 노선이 28개로 통합됐다. 당국은 이번 변경으로 버스 운행이 잦아질 것이라고 말하지만, 일부 승객은 자신의 이동 시간이 오히려 길어졌다고 말한다.\n\n개편의 논리는 단순하다. 기존 노선망에서는 상당수 노선이 한 시간에 한 대씩 다녔는데, 일정이 고정되지 않은 사람에게는 쓸모없을 만큼 뜸한 간격이다. 같은 수의 차량을 더 적은 간선에 집중하면 가장 붐비는 도로에서는 10~12분마다 버스를 운행할 수 있다.\n\n그 간선을 이용하는 승객에게는 개선이 즉각적이다. 애시그로브에서 병원 지구로 통근하는 이보 페트란 씨는 대기 시간이 20분에서 5분 미만으로 줄었다고 말했다. \"이제 아침 일정을 시간표에 맞춰 짜지 않습니다.\"\n\n불만은 지도 가장자리에서 나온다. 인구 밀도가 낮은 몇몇 동네는 직통 노선을 잃어 이제 환승을 해야 한다. 파머 하이츠에 사는 데버라 윈 씨는 도심까지 가는 시간이 35분에서 거의 한 시간으로 늘었다고 말했다. \"버스가 우리 집 근처로 오지 않으면 배차 간격이 짧아진들 저에게는 소용이 없죠.\"\n\n당국도 이 맞교환을 인정한다. 기획국장 새뮤얼 오옐라란 씨는 현재 승객의 약 8퍼센트가 이동 시간이 늘고 약 60퍼센트는 줄어들 것이라고 말했다. 그는 직통 노선을 잃은 지역을 위해 수요응답형 셔틀 구역 세 곳이 6월부터 운영되며, 시민이 결과를 판단할 수 있도록 분기마다 승객 수치를 공개하겠다고 덧붙였다.",
   gloss:[{w:"transit authority",ko:"교통공사, 교통 당국"},{w:"corridor",ko:"(교통) 간선, 축"},{w:"transfer",ko:"환승"},
          {w:"trade-off",ko:"맞교환, 상충 관계"},{w:"on-demand",ko:"수요응답형의"}],
   qs:[
     {q:"What is the article mainly about?",
      opts:["A fare increase on city buses","A reorganisation of bus routes","The construction of a new bus depot","A strike by transit employees"],
      ans:1, exp:"첫 문단이 41개 노선을 28개로 재편한 사실을 전한다."},
     {q:"According to the article, how was the authority able to increase frequency?",
      opts:["By purchasing additional vehicles","By running fewer routes with the same fleet","By extending operating hours","By raising fares on busy corridors"],
      ans:1, exp:"2문단: 'By concentrating the same number of vehicles on fewer corridors.' 차량을 늘린 것이 아니다."},
     {q:"What is suggested about Ms. Wyn?",
      opts:["She no longer uses the bus at all.","She lives in a densely populated area.","Her journey now involves changing buses.","She works at the hospital district."],
      ans:2, exp:"저밀도 지역이 직통을 잃고 환승이 필요해졌다는 설명 바로 뒤에 그의 사례가 나온다."},
     {q:"What does the authority plan to do in June?",
      opts:["Restore several of the old routes","Begin operating on-demand shuttles","Publish its first ridership report","Redesign the network a second time"],
      ans:1, exp:"마지막 문단: 'three on-demand shuttle zones will begin operating in June.' 승객 수치 공개는 분기마다지 6월로 특정되지 않았다."}
   ]},

  /* ═══════════ 6. 온라인 채팅 — 전시 부스 준비 ═══════════ */
  {id:"p7s-6", exam:"TOEIC", part7:true, kind:"single", level:3,
   series:"🏢 비즈니스 실무", type:"Part 7 · 온라인 채팅", title:"Trade Show Booth Preparation",
   topic:"전시회 부스 준비를 두고 세 사람이 나눈 그룹 채팅",
   passage:"GROUP CHAT — Hall 3 Booth\n\nPia Nordqvist  [2:04 P.M.]\nThe printer just called. The backdrop banner won't be ready until Thursday afternoon.\n\nLeo Marchetti  [2:05 P.M.]\nThursday? Setup closes at six on Thursday.\n\nPia Nordqvist  [2:06 P.M.]\nThat's what I said. They had a machine fail on Monday and everything shifted.\n\nAdaeze Nnamdi  [2:08 P.M.]\nCan we collect it ourselves instead of waiting for their courier? The print shop is twenty minutes from the venue.\n\nPia Nordqvist  [2:09 P.M.]\nI asked. They'll have it boxed by two, so yes, if someone can drive over.\n\nLeo Marchetti  [2:10 P.M.]\nI'll be at the venue from noon setting up the demo screens. I can go.\n\nAdaeze Nnamdi  [2:12 P.M.]\nGood. What about the brochures — those came in last week, didn't they?\n\nPia Nordqvist  [2:13 P.M.]\nThey did, but there's a problem. The stand number is printed as B14 and we've been moved to B22.\n\nLeo Marchetti  [2:14 P.M.]\nWe can't reprint two thousand brochures for one number.\n\nAdaeze Nnamdi  [2:16 P.M.]\nWe don't need to. I'll order stickers with the correct number and put them over the old one. They can be here by Wednesday.\n\nPia Nordqvist  [2:17 P.M.]\nThat's the sensible answer. Leo, can you also confirm the electrical order? Last year we ended up with one socket for four devices.\n\nLeo Marchetti  [2:18 P.M.]\nAlready done — I asked for four this morning.",
   ko:"그룹 채팅 — 3홀 부스\n\n피아 노르드크비스트 [오후 2:04]\n인쇄소에서 방금 전화 왔어요. 배경 배너가 목요일 오후에나 나온대요.\n\n레오 마르케티 [오후 2:05]\n목요일이요? 목요일 6시면 부스 설치가 마감인데요.\n\n피아 노르드크비스트 [오후 2:06]\n제 말이 그 말이에요. 월요일에 기계가 고장 나서 전부 밀렸대요.\n\n아다에제 은남디 [오후 2:08]\n택배를 기다리지 말고 우리가 직접 가져오면 안 될까요? 인쇄소가 행사장에서 20분 거리예요.\n\n피아 노르드크비스트 [오후 2:09]\n물어봤어요. 2시까지는 포장해 둔다니까, 누가 차로 갈 수 있으면 가능해요.\n\n레오 마르케티 [오후 2:10]\n제가 정오부터 행사장에서 시연용 화면을 설치할 거예요. 제가 다녀올게요.\n\n아다에제 은남디 [오후 2:12]\n좋아요. 브로슈어는요? 지난주에 들어왔죠?\n\n피아 노르드크비스트 [오후 2:13]\n들어왔는데 문제가 있어요. 부스 번호가 B14로 인쇄됐는데 우리는 B22로 옮겨졌어요.\n\n레오 마르케티 [오후 2:14]\n번호 하나 때문에 브로슈어 2천 부를 다시 찍을 수는 없죠.\n\n아다에제 은남디 [오후 2:16]\n그럴 필요 없어요. 올바른 번호가 적힌 스티커를 주문해서 기존 번호 위에 붙일게요. 수요일까지 도착할 수 있어요.\n\n피아 노르드크비스트 [오후 2:17]\n그게 합리적인 답이네요. 레오, 전기 신청도 확인해 줄래요? 작년엔 기기 네 대에 콘센트 하나였잖아요.\n\n레오 마르케티 [오후 2:18]\n이미 했어요. 오늘 아침에 네 개 신청했습니다.",
   gloss:[{w:"backdrop",ko:"배경막"},{w:"courier",ko:"택배(업체)"},{w:"venue",ko:"행사장"},
          {w:"stand number",ko:"(전시) 부스 번호"},{w:"socket",ko:"콘센트"}],
   qs:[
     {q:"What problem does Ms. Nordqvist report at 2:04 P.M.?",
      opts:["A supplier has raised its prices.","An item will arrive very close to a deadline.","The booth location has been cancelled.","A machine at the venue is broken."],
      ans:1, exp:"배너가 목요일 오후에 나오는데 설치 마감이 목요일 6시다. 기계 고장은 인쇄소에서 일어난 일이다."},
     {q:"What does Mr. Marchetti agree to do?",
      opts:["Pick up the banner from the print shop","Reprint the brochures","Order stickers for the stand number","Move the booth to a different hall"],
      ans:0, exp:"2:10 'I'll be at the venue from noon … I can go.' 인쇄소에 직접 다녀오겠다는 뜻이다."},
     {q:"At 2:16 P.M., what does Ms. Nnamdi most likely mean when she writes, \"We don't need to\"?",
      opts:["The brochures do not have to be delivered.","Reprinting the brochures is unnecessary.","The stand number will be changed back.","No one has to drive to the print shop."],
      ans:1, exp:"바로 앞 2:14가 '2천 부를 다시 찍을 수는 없다'이므로, 그 재인쇄가 필요 없다는 뜻이다. 이어서 스티커라는 대안을 제시한다."},
     {q:"What is indicated about the electrical supply?",
      opts:["It was insufficient at a previous event.","It is included in the booth fee.","It must be ordered by Wednesday.","It will be installed by the print shop."],
      ans:0, exp:"2:17 'Last year we ended up with one socket for four devices.' 작년에 부족했다는 뜻이다."}
   ]},

  /* ═══════════ 7. 웹페이지 — 환불 정책 ═══════════ */
  {id:"p7s-7", exam:"TOEIC", part7:true, kind:"single", level:2,
   series:"🏢 비즈니스 실무", type:"Part 7 · 웹페이지", title:"Returns and Exchanges",
   topic:"온라인 매장 반품·교환 정책 페이지",
   passage:"harrowfield.com  ›  Help  ›  Returns and Exchanges\n\nWe want you to be satisfied with what you buy from us. If something is not right, here is how returns work.\n\nStandard returns\nUnworn items in their original packaging may be returned within sixty days of delivery for a full refund. Print a return label from your order page; postage is free within the country.\n\nExchanges\nIf you need a different size or colour, choose \"Exchange\" rather than \"Return\" on your order page. We hold the replacement item for you as soon as you submit the request, so you will not lose it to another customer while your parcel is in transit.\n\nSale items\nItems bought during a sale may be exchanged but not refunded. This is stated on each sale product page before you order.\n\nFaulty goods\nIf an item arrives damaged or develops a fault within two years, contact us with a photograph. We will repair, replace, or refund it, and the sixty-day limit does not apply. Postage on faulty goods is always paid by us.\n\nItems we cannot accept\nUnderwear, earrings, and made-to-measure garments cannot be returned unless faulty.\n\nRefund timing\nRefunds are issued to the original payment method within five working days of the parcel reaching our warehouse. Your bank may take a further two to three days to display the credit.",
   ko:"harrowfield.com › 도움말 › 반품 및 교환\n\n저희 제품에 만족하시기를 바랍니다. 문제가 있다면 반품은 다음과 같이 진행됩니다.\n\n일반 반품\n착용하지 않은 제품을 원래 포장 그대로 배송일로부터 60일 이내에 반품하시면 전액 환불해 드립니다. 주문 내역 페이지에서 반품 라벨을 출력하십시오. 국내 배송비는 무료입니다.\n\n교환\n다른 사이즈나 색상이 필요하시면 주문 페이지에서 '반품'이 아니라 '교환'을 선택하십시오. 요청을 접수하는 즉시 교환 상품을 확보해 두므로, 소포가 배송되는 동안 다른 고객에게 상품을 빼앗기지 않습니다.\n\n세일 상품\n세일 기간에 구매하신 상품은 교환은 되지만 환불은 되지 않습니다. 이 내용은 주문 전 각 세일 상품 페이지에 표시됩니다.\n\n하자 상품\n상품이 파손된 상태로 도착하거나 2년 이내에 하자가 생기면 사진과 함께 연락 주십시오. 수리, 교환 또는 환불해 드리며 60일 기한은 적용되지 않습니다. 하자 상품의 배송비는 항상 저희가 부담합니다.\n\n반품이 불가능한 상품\n속옷, 귀걸이, 맞춤 제작 의류는 하자가 없는 한 반품하실 수 없습니다.\n\n환불 시점\n환불은 소포가 저희 창고에 도착한 후 영업일 기준 5일 이내에 원래 결제 수단으로 처리됩니다. 은행에 따라 입금 표시까지 2~3일이 더 걸릴 수 있습니다.",
   gloss:[{w:"postage",ko:"우편·배송 요금"},{w:"in transit",ko:"운송 중인"},{w:"faulty",ko:"하자가 있는"},
          {w:"made-to-measure",ko:"맞춤 제작의"},{w:"working day",ko:"영업일"}],
   qs:[
     {q:"What is an advantage of choosing an exchange over a return?",
      opts:["The postage is cheaper.","The replacement is reserved immediately.","The time limit is longer.","No photograph is required."],
      ans:1, exp:"Exchanges 항목: 'We hold the replacement item for you as soon as you submit the request.'"},
     {q:"What is true about items bought on sale?",
      opts:["They cannot be returned for any reason.","They may be exchanged but not refunded.","They are excluded from the faulty-goods policy.","They must be returned within thirty days."],
      ans:1, exp:"Sale items 항목 그대로. 다만 하자가 있으면 Faulty goods 규정이 별도로 적용되므로 (A)·(C)는 틀리다."},
     {q:"How long does the store's guarantee against faults last?",
      opts:["Sixty days","Five working days","One year","Two years"],
      ans:3, exp:"'develops a fault within two years'."},
     {q:"What is NOT stated about refunds?",
      opts:["They are paid to the card originally used.","They are processed within five working days.","They may appear in the account later than they are issued.","They include a credit toward a future order."],
      ans:3, exp:"향후 주문에 쓸 적립금 얘기는 없다. 나머지 셋은 Refund timing 항목에 있다."}
   ]},

  /* ═══════════ 8. 회람 — 재택근무 정책 조정 ═══════════ */
  {id:"p7s-8", exam:"TOEIC", part7:true, kind:"single", level:3,
   series:"🏢 비즈니스 실무", type:"Part 7 · 회람", title:"Revised Hybrid Working Policy",
   topic:"재택·사무실 혼합 근무 정책 조정 회람",
   passage:"MEMORANDUM\n\nTo:   All staff, Kelwin Partners\nFrom: Adaora Mensah, Chief Operating Officer\nDate: 3 March\nRe:   Hybrid working from 1 April\n\nWhen we introduced hybrid working two years ago, we asked everyone to be in the office on days of their own choosing. — [1] — That worked well for individuals and poorly for teams: colleagues who needed to meet often found themselves in the building on different days.\n\nFrom 1 April, each team will instead agree two fixed office days per week. Team leaders should propose their two days to their department head by 20 March. — [2] — Where two teams work closely together, we ask that they choose at least one day in common.\n\nThe remaining three days may be worked from home, from the office, or from any of our regional sites, exactly as now. We are not increasing the total number of required office days.\n\nA small number of roles cannot be performed remotely at all, and staff in those roles are unaffected by this memo. — [3] — Their managers will confirm arrangements individually.\n\nWe recognise that fixed days are less convenient for some people than choosing freely. — [4] — If the two days your team selects create a genuine difficulty — a caring responsibility, a fixed course, a long commute on a particular day — speak to your team leader before 20 March, while the days are still being decided rather than after.",
   ko:"회람\n\n수신: 켈윈 파트너스 전 직원\n발신: 최고운영책임자 아다오라 멘사\n날짜: 3월 3일\n제목: 4월 1일부터 적용되는 혼합 근무\n\n2년 전 혼합 근무를 도입할 때 저희는 각자 원하는 날에 출근하시도록 했습니다. — [1] — 그 방식은 개인에게는 잘 맞았지만 팀에는 잘 맞지 않았습니다. 자주 만나야 하는 동료들이 서로 다른 날에 사무실에 나오는 일이 잦았습니다.\n\n4월 1일부터는 각 팀이 주 2회 고정 출근일을 정하게 됩니다. 팀장은 3월 20일까지 부서장에게 두 날짜를 제안해 주십시오. — [2] — 긴밀하게 협업하는 두 팀은 최소 하루는 같은 날로 맞춰 주시기 바랍니다.\n\n나머지 사흘은 지금과 똑같이 재택, 사무실, 또는 지역 사업장 어디에서든 근무하실 수 있습니다. 의무 출근 일수를 늘리는 것이 아닙니다.\n\n일부 직무는 원격 근무 자체가 불가능하며, 해당 직무의 직원은 이 회람의 영향을 받지 않습니다. — [3] — 관리자가 개별적으로 근무 방식을 확인해 드릴 것입니다.\n\n고정 출근일이 자유 선택보다 불편한 분들이 있다는 점을 알고 있습니다. — [4] — 팀이 정한 두 날짜가 실제로 곤란을 초래한다면 — 돌봄 책임, 고정된 수업, 특정 요일의 긴 통근 등 — 날짜가 정해진 뒤가 아니라 아직 정해지는 중인 3월 20일 전에 팀장과 상의해 주십시오.",
   gloss:[{w:"hybrid working",ko:"재택·사무실 혼합 근무"},{w:"department head",ko:"부서장"},{w:"remotely",ko:"원격으로"},
          {w:"caring responsibility",ko:"돌봄 책임"},{w:"commute",ko:"통근"}],
   qs:[
     {q:"What problem does the memo identify with the previous arrangement?",
      opts:["Too few employees came to the office.","Team members were rarely in on the same day.","Regional sites were left empty.","Managers could not track attendance."],
      ans:1, exp:"1문단: '콜리그들이 서로 다른 날에 나왔다'는 것이 문제였다. 출근 자체가 적었다는 언급은 없다."},
     {q:"What must team leaders do by 20 March?",
      opts:["Submit proposed office days","Report on remote productivity","Meet with the Chief Operating Officer","Confirm which roles are office-only"],
      ans:0, exp:"2문단: 'Team leaders should propose their two days to their department head by 20 March.'"},
     {q:"What does the memo indicate about the number of required office days?",
      opts:["It will rise from two to three.","It will remain the same.","It will be decided by each individual.","It will vary by department."],
      ans:1, exp:"3문단: 'We are not increasing the total number of required office days.'"},
     {q:"In which of the positions marked [1], [2], [3], and [4] does the following sentence best belong?\n\n\"That is deliberate, and we would rather hear about problems while the choice is still open.\"",
      opts:["[1]","[2]","[3]","[4]"], ans:3,
      exp:"That이 받을 대상은 바로 앞의 '고정 출근일이 덜 편하다는 점을 안다'는 인정이고, 뒤 문장은 '20일 전에 말하라'로 이어진다. 따라서 [4]."}
   ]},

  /* ═══════════ 9. 안내문 — 호텔 피트니스 센터 공사 ═══════════ */
  {id:"p7s-9", exam:"TOEIC", part7:true, kind:"single", level:2,
   series:"🏢 비즈니스 실무", type:"Part 7 · 안내문", title:"Fitness Centre Refurbishment",
   topic:"호텔 피트니스 센터 공사 안내와 대체 시설",
   passage:"To our guests,\n\nThe fitness centre on the lower ground floor will be closed for refurbishment from 6 to 27 October. We are sorry for the inconvenience and would like to explain what is available in the meantime.\n\nSwimming pool. The pool and sauna are in a separate part of the building and stay open throughout, 6:00 A.M. to 10:00 P.M. daily.\n\nAlternative gym. We have arranged complimentary access to Fenwick Fitness at 12 Barrow Lane, a four-minute walk from the hotel. Show your room key at their reception; there is nothing to sign and no charge. Their hours are 5:30 A.M. to 11:00 P.M.\n\nIn-room equipment. Yoga mats, resistance bands, and a set of light dumbbells can be delivered to your room at no cost. Call extension 3 and allow about fifteen minutes.\n\nWhat is changing. The new centre will have twice as many cardio machines, a separate free-weights area, and a small studio for classes. Two classes a day — one early morning, one evening — will be included in the room rate once the centre reopens.\n\nGuests who have booked a stay that falls entirely within the closure period and who selected our Wellness package may contact the front desk for a partial refund of the package supplement.\n\nWe expect to reopen on the morning of 28 October.\n\nHalvard Sten, General Manager",
   ko:"고객 여러분께,\n\n지하 1층 피트니스 센터가 10월 6일부터 27일까지 보수 공사로 휴관합니다. 불편을 드려 죄송하며, 그동안 이용하실 수 있는 시설을 안내드립니다.\n\n수영장. 수영장과 사우나는 건물의 다른 구역에 있어 공사 기간 내내 매일 오전 6시부터 오후 10시까지 운영합니다.\n\n대체 헬스장. 호텔에서 도보 4분 거리인 배로 레인 12번지 펜윅 피트니스를 무료로 이용하실 수 있도록 해 두었습니다. 그곳 프런트에 객실 키를 보여 주십시오. 서명할 서류도 요금도 없습니다. 운영 시간은 오전 5시 30분부터 오후 11시까지입니다.\n\n객실 내 운동 기구. 요가 매트, 저항 밴드, 가벼운 덤벨 세트를 무료로 객실에 가져다 드립니다. 내선 3번으로 전화 주시고 약 15분 정도 기다려 주십시오.\n\n무엇이 바뀌나요. 새 센터에는 유산소 기구가 두 배로 늘어나고, 프리웨이트 구역이 따로 생기며, 수업용 소규모 스튜디오가 마련됩니다. 재개관 후에는 하루 두 개 수업(이른 아침 1회, 저녁 1회)이 객실 요금에 포함됩니다.\n\n휴관 기간 안에 투숙 일정이 전부 들어가면서 웰니스 패키지를 선택하신 고객께서는 프런트에 문의하시면 패키지 추가 요금의 일부를 환불해 드립니다.\n\n10월 28일 오전에 재개관할 예정입니다.\n\n총지배인 할바르 스텐",
   gloss:[{w:"refurbishment",ko:"보수, 개보수"},{w:"complimentary",ko:"무료의"},{w:"resistance band",ko:"저항 밴드"},
          {w:"free weights",ko:"프리웨이트(덤벨·바벨)"},{w:"supplement",ko:"추가 요금"}],
   qs:[
     {q:"What is the purpose of the notice?",
      opts:["To announce a change in room rates","To inform guests of a temporary closure","To advertise a new hotel opening nearby","To describe a fitness class schedule"],
      ans:1, exp:"첫 문단이 10월 6~27일 휴관을 알리고 대체 시설을 설명한다."},
     {q:"How can guests use Fenwick Fitness?",
      opts:["By paying a reduced daily rate","By booking through the front desk","By presenting their room key","By signing a temporary membership form"],
      ans:2, exp:"'Show your room key at their reception; there is nothing to sign and no charge.'"},
     {q:"What will be included in the room rate after the centre reopens?",
      opts:["Use of the swimming pool","Two fitness classes per day","Delivery of in-room equipment","Access to Fenwick Fitness"],
      ans:1, exp:"'Two classes a day … will be included in the room rate once the centre reopens.'"},
     {q:"Who may request a partial refund?",
      opts:["All guests staying in October","Guests with a Wellness package staying only during the closure","Guests who booked before 6 October","Members of Fenwick Fitness"],
      ans:1, exp:"두 조건이 동시에 필요하다 — 투숙 기간이 휴관 기간 안에 전부 들어가고, 웰니스 패키지를 선택했을 것."}
   ]},

  /* ═══════════ 10. 편지 — 공급업체 계약 종료 ═══════════ */
  {id:"p7s-10", exam:"TOEIC", part7:true, kind:"single", level:3,
   series:"🏢 비즈니스 실무", type:"Part 7 · 편지", title:"Notice of Contract Expiry",
   topic:"청소 용역 계약 종료 통보와 후속 절차",
   passage:"Whitcombe Facilities Ltd\n8 Ordway Street, Calverton\n\n14 May\n\nMs. Bernadette Roche\nOperations Director\nSaltmere Cleaning Services\n\nDear Ms. Roche,\n\nI am writing to confirm that our cleaning contract, first signed in 2019 and renewed twice since, will end on 31 August and will not be renewed for a further term.\n\nI want to be clear that this decision does not reflect dissatisfaction with your team. Your supervisors have been reliable, and the two site managers I consulted both spoke well of your staff. Our reason is that we are consolidating cleaning, catering, and grounds maintenance under a single contractor from September, following a review of how these services are managed across our eleven sites. Saltmere was invited to tender for the combined contract and, as you know, chose not to bid.\n\nUnder clause 14 of our agreement, either party may end the contract at the expiry date with ninety days' written notice. This letter constitutes that notice.\n\nTwo practical matters remain. First, the cleaning equipment stored in the basement at Ordway Street belongs to Saltmere and should be collected before 5 September; please let me know a convenient date. Second, several of your staff have asked about transferring to the incoming contractor. I have passed their names on with their permission, and the new provider has agreed to interview anyone who wishes to be considered.\n\nI would be glad to meet before the end date to review any outstanding invoices. Thank you for six years of steady work.\n\nYours sincerely,\n\nColin Adeyemi\nHead of Facilities, Whitcombe Facilities Ltd",
   ko:"휘트컴 퍼실리티스\n캘버턴 오드웨이가 8번지\n\n5월 14일\n\n버나뎃 로슈 운영이사님\n솔트미어 클리닝 서비스\n\n로슈 이사님께,\n\n2019년에 처음 체결하고 이후 두 차례 갱신한 청소 계약이 8월 31일에 종료되며 추가 갱신은 하지 않음을 알려 드립니다.\n\n이 결정이 귀사 팀에 대한 불만에서 나온 것이 아니라는 점을 분명히 말씀드리고 싶습니다. 귀사의 관리자들은 신뢰할 만했고, 제가 상의한 두 곳의 사업장 관리자도 모두 귀사 직원들을 좋게 평가했습니다. 저희 사유는 열한 개 사업장에서 이들 서비스가 어떻게 관리되는지 검토한 결과, 9월부터 청소·급식·조경 관리를 하나의 업체로 통합하기로 했기 때문입니다. 솔트미어도 통합 계약 입찰에 초청받았으나 아시다시피 응찰하지 않기로 하셨습니다.\n\n계약서 14조에 따라 어느 쪽이든 만료일에 90일 전 서면 통보로 계약을 종료할 수 있습니다. 이 서한이 그 통보에 해당합니다.\n\n실무적으로 두 가지가 남아 있습니다. 첫째, 오드웨이가 지하에 보관된 청소 장비는 솔트미어 소유이므로 9월 5일 전에 회수해 주십시오. 편한 날짜를 알려 주시기 바랍니다. 둘째, 귀사 직원 몇 분이 새 업체로의 이직 가능성을 문의해 왔습니다. 본인 동의를 받아 명단을 전달했고, 새 업체는 희망하는 분은 누구든 면접하겠다고 했습니다.\n\n종료일 전에 만나 미결 청구서를 정리했으면 합니다. 6년간의 한결같은 업무에 감사드립니다.\n\n휘트컴 퍼실리티스 시설총괄\n콜린 아데예미 드림",
   gloss:[{w:"expiry",ko:"만료"},{w:"consolidate",ko:"통합하다"},{w:"tender / bid",ko:"입찰(하다)"},
          {w:"clause",ko:"(계약) 조항"},{w:"outstanding invoice",ko:"미결제 청구서"}],
   qs:[
     {q:"Why is the contract ending?",
      opts:["Saltmere's work was judged unsatisfactory.","Whitcombe is combining several services under one supplier.","Whitcombe is closing most of its sites.","Saltmere requested an early termination."],
      ans:1, exp:"2문단: 'we are consolidating cleaning, catering, and grounds maintenance under a single contractor.'"},
     {q:"What is indicated about Saltmere Cleaning Services?",
      opts:["It did not submit a bid for the new contract.","It has worked for Whitcombe since 2015.","It operates at eleven sites.","It has already removed its equipment."],
      ans:0, exp:"'Saltmere was invited to tender … and chose not to bid.'"},
     {q:"What does Mr. Adeyemi ask Ms. Roche to do?",
      opts:["Sign a revised agreement","Suggest a date to retrieve equipment","Interview candidates for the new contract","Reduce the number of supervisors"],
      ans:1, exp:"'should be collected before 5 September; please let me know a convenient date.'"},
     {q:"What has Mr. Adeyemi already done for some Saltmere employees?",
      opts:["Offered them positions at Whitcombe","Given their names to the new contractor","Extended their current contracts","Arranged additional training"],
      ans:1, exp:"'I have passed their names on with their permission.' 면접은 새 업체가 하는 것이고, 휘트컴이 직접 고용하는 것은 아니다."}
   ]}

];

/* ============================================================
   멀티 지문 보강 — 2지문 2세트 + 3지문 1세트
   part7.js 의 PART7 과 같은 형식이며 app.js 에서 이어 붙인다.
   link:true 는 두 지문 이상을 겹쳐야 풀리는 연계 문제다.
   ============================================================ */
window.PART7_EXTRA = [

  /* ═══════════ 11. 2지문 — 사내 교육 신청 (공지 + 이메일) ═══════════ */
  {id:"p7-5", exam:"TOEIC", part7:true, kind:"double", level:3,
   series:"🏢 비즈니스 실무", type:"Part 7 · 2지문", title:"Professional Development Fund",
   topic:"사외 교육 지원금 공지와 신청 이메일",
   docs:[
     {label:"지문 1 · 사내 공지",
      en:"PROFESSIONAL DEVELOPMENT FUND — Autumn Round\n\nThe fund supports external courses, conferences, and professional qualifications that are relevant to your current role or to a role you are preparing for.\n\nWhat is covered\n  Tier A  Up to £400   Short courses and one-day conferences\n  Tier B  Up to £1,200 Multi-day training and professional examinations\n  Tier C  Up to £3,000 Qualifications lasting a year or more\n\nConditions\n• Tier A applications require your manager's approval only.\n• Tier B and Tier C applications also go to the development committee, which meets on the first Tuesday of each month.\n• Tier C recipients agree to remain with the company for twelve months after the qualification is completed.\n• Travel and accommodation are reimbursed separately and do not count against the tier limit.\n\nHow to apply\nSend the application form to development@arnwick.co.uk at least six weeks before the course begins. Applications received later than this cannot be guaranteed a decision in time.\n\nApplications close for the autumn round on 30 September.",
      ko:"직무개발 지원금 — 가을 회차\n\n이 지원금은 현재 직무 또는 준비 중인 직무와 관련된 외부 교육, 콘퍼런스, 전문 자격을 지원합니다.\n\n지원 범위\n  A등급  최대 400파운드   단기 과정 및 1일 콘퍼런스\n  B등급  최대 1,200파운드 다일간 교육 및 전문 시험\n  C등급  최대 3,000파운드 1년 이상 소요되는 자격 과정\n\n조건\n• A등급 신청은 관리자 승인만 받으면 됩니다.\n• B등급과 C등급 신청은 매월 첫째 화요일에 열리는 개발위원회도 거칩니다.\n• C등급 수혜자는 자격 취득 후 12개월간 재직하는 데 동의합니다.\n• 교통비와 숙박비는 별도로 정산되며 등급 한도에 포함되지 않습니다.\n\n신청 방법\n과정 시작 최소 6주 전에 신청서를 development@arnwick.co.uk로 보내십시오. 이보다 늦게 접수된 신청은 제때 결정을 보장할 수 없습니다.\n\n가을 회차 신청은 9월 30일에 마감됩니다."},
     {label:"지문 2 · 이메일",
      en:"To:      development@arnwick.co.uk\nFrom:    t.okafor@arnwick.co.uk\nDate:    22 September\nSubject: Application — Data Analysis Certificate\n\nDear Committee,\n\nI am applying to the autumn round for the Applied Data Analysis Certificate at Calverton College. The programme runs from 6 January to 18 December, one evening a week, and the fee is £2,650.\n\nI work in supply planning and currently prepare our demand forecasts in spreadsheets. The certificate covers forecasting methods and database querying, both of which I would use immediately. My manager, Priya Deshmukh, has approved the application and can confirm this.\n\nThe college is in Calverton, so I would travel there each week; I have not included that cost here, as I understand it is handled separately.\n\nI am aware of the twelve-month condition attached to this level of funding and am happy to accept it.\n\nOne question: the course begins on 6 January, which is more than six weeks away, but the committee meets on 7 October and again on 4 November. If a decision is not reached in October, would a November decision still allow me to enrol? The college's enrolment deadline is 30 November.\n\nMany thanks,\nTendai Okafor\nSupply Planning",
      ko:"수신: development@arnwick.co.uk\n발신: t.okafor@arnwick.co.uk\n날짜: 9월 22일\n제목: 신청 — 데이터 분석 자격 과정\n\n위원회 귀중,\n\n캘버턴 칼리지의 응용 데이터 분석 자격 과정에 가을 회차로 신청합니다. 이 과정은 1월 6일부터 12월 18일까지 주 1회 저녁에 진행되며 수강료는 2,650파운드입니다.\n\n저는 공급 기획 업무를 하며 현재 수요 예측을 스프레드시트로 작성하고 있습니다. 이 자격 과정은 예측 기법과 데이터베이스 질의를 모두 다루는데, 두 가지 다 바로 업무에 쓸 수 있습니다. 제 관리자인 프리야 데시무크 님이 신청을 승인했으며 확인해 주실 수 있습니다.\n\n칼리지가 캘버턴에 있어 매주 이동해야 하는데, 그 비용은 별도로 처리된다고 이해하여 여기에는 포함하지 않았습니다.\n\n이 지원 등급에 12개월 조건이 붙는다는 점을 알고 있으며 기꺼이 받아들이겠습니다.\n\n한 가지 여쭙습니다. 과정은 1월 6일에 시작하여 6주보다 여유가 있지만 위원회는 10월 7일과 11월 4일에 열립니다. 10월에 결정이 나지 않으면 11월 결정으로도 등록이 가능할까요? 칼리지의 등록 마감은 11월 30일입니다.\n\n공급기획팀\n텐다이 오카포 드림"}
   ],
   gloss:[{w:"tier",ko:"등급, 단계"},{w:"reimburse",ko:"(비용을) 정산·환급하다"},{w:"qualification",ko:"자격(증)"},
          {w:"demand forecast",ko:"수요 예측"},{w:"enrolment",ko:"등록"}],
   qs:[
     {q:"What is the purpose of the notice?",
      opts:["To announce a new company training centre","To describe funding available for outside study","To recruit members for a committee","To change the date of a conference"],
      ans:1, exp:"공지 첫 문장이 외부 교육·콘퍼런스·자격을 지원하는 기금임을 밝힌다."},
     {q:"Which tier applies to Mr. Okafor's application?", link:true,
      opts:["Tier A","Tier B","Tier C","No tier applies"],
      ans:2, exp:"연계 문제. 과정이 1월 6일부터 12월 18일까지 1년 가까이 이어지므로 '1년 이상 소요되는 자격 과정' = Tier C. 수강료 2,650파운드도 Tier C 한도 3,000파운드 안이다."},
     {q:"Why does Mr. Okafor mention that he has not included travel costs?", link:true,
      opts:["He plans to walk to the college.","His manager will pay them.","The notice states they are reimbursed separately.","The course is held online."],
      ans:2, exp:"연계 문제. 공지의 조건 항목 'Travel and accommodation are reimbursed separately'를 그가 적용한 것이다."},
     {q:"What condition does Mr. Okafor say he accepts?",
      opts:["Attending the committee meeting in person","Staying with the company for a year afterwards","Paying part of the fee himself","Submitting a report on the course"],
      ans:1, exp:"'I am aware of the twelve-month condition … and am happy to accept it.' 이는 공지의 Tier C 조건이다."},
     {q:"What is Mr. Okafor's concern?",
      opts:["That the fee may rise before January","That a decision might come after he needs to enrol","That his manager has not yet approved the request","That the autumn round has already closed"],
      ans:1, exp:"마지막 문단에서 11월 4일 위원회 결정과 11월 30일 등록 마감의 간격을 걱정하고 있다. 관리자 승인은 이미 받았고(C 오답), 마감일 9월 30일 전인 22일에 보냈다(D 오답)."}
   ]},

  /* ═══════════ 12. 2지문 — 매장 설문 결과와 후속 조치 ═══════════ */
  {id:"p7-6", exam:"TOEIC", part7:true, kind:"double", level:3,
   series:"🏢 비즈니스 실무", type:"Part 7 · 2지문", title:"Customer Survey Follow-Up",
   topic:"고객 설문 결과 요약과 그에 따른 매장 조치 회람",
   docs:[
     {label:"지문 1 · 설문 결과 요약",
      en:"BRAYDON MARKET — Customer Survey, Summary of Results\nResponses: 1,842 (in store and online), collected 1–21 February\n\n\"How satisfied are you with…\"           Satisfied   Neutral   Dissatisfied\n  Range of products                          78%        14%          8%\n  Freshness of produce                       81%        12%          7%\n  Checkout waiting time                      41%        23%         36%\n  Staff helpfulness                          86%         9%          5%\n  Store layout and signage                   52%        26%         22%\n  Opening hours                              69%        19%         12%\n\nWritten comments (most frequent themes)\n  1. Long queues between 5 P.M. and 7 P.M. on weekdays (411 mentions)\n  2. Difficulty locating the bakery section after the January move (238)\n  3. Requests for a wider range of gluten-free products (156)\n  4. Praise for individual staff members by name (149)\n\nNote: satisfaction with checkout time has fallen fourteen points since the same survey last year. All other categories are within three points of last year's result.",
      ko:"브레이던 마켓 — 고객 설문, 결과 요약\n응답 수: 1,842건(매장 및 온라인), 2월 1~21일 수집\n\n\"다음 항목에 얼마나 만족하십니까?\"        만족   보통   불만\n  상품 구색                                 78%   14%    8%\n  농산물 신선도                             81%   12%    7%\n  계산 대기 시간                            41%   23%   36%\n  직원 응대                                 86%    9%    5%\n  매장 동선과 안내 표시                     52%   26%   22%\n  영업시간                                  69%   19%   12%\n\n서술형 의견 (빈도 높은 주제)\n  1. 평일 오후 5~7시 긴 대기 줄 (411건)\n  2. 1월 이전 이후 베이커리 코너를 찾기 어려움 (238건)\n  3. 글루텐 프리 상품 확대 요청 (156건)\n  4. 특정 직원을 이름을 들어 칭찬 (149건)\n\n참고: 계산 대기 시간 만족도는 작년 같은 설문 대비 14포인트 하락했습니다. 나머지 항목은 모두 작년 결과와 3포인트 이내 차이입니다."},
     {label:"지문 2 · 매장 회람",
      en:"To:   All Braydon Market staff\nFrom: Ruth Okonjo, Store Manager\nDate: 3 March\nRe:   What we are doing about the survey\n\nThank you to everyone who encouraged customers to respond. Three points from the results deserve action, and one deserves celebration.\n\nAction 1 — Queues. This is the only category that moved significantly, and it moved the wrong way. From 17 March, two additional checkouts will be staffed between 4:30 P.M. and 7:30 P.M. on Monday to Friday. Rotas have been redrawn and you will see your new shift pattern this week.\n\nAction 2 — Finding the bakery. We knew the January change would take some getting used to, but two hundred comments is more than we expected. Overhead signs will be installed at the ends of aisles 4 and 5 by the end of the month. If customers still ask, please walk them there rather than pointing.\n\nAction 3 — Gluten-free range. Buying has agreed to add eighteen lines from April. Shelf space will come from the reduction in tinned goods agreed last autumn.\n\nAnd the celebration: the highest-scoring category was you. Eighty-six percent said staff were helpful, and a hundred and forty-nine comments named individual colleagues. Those comments have been printed and are on the noticeboard in the break room.",
      ko:"수신: 브레이던 마켓 전 직원\n발신: 점장 루스 오콘조\n날짜: 3월 3일\n제목: 설문 결과에 대한 조치\n\n고객들이 응답하도록 독려해 주신 모든 분께 감사드립니다. 결과 중 세 가지는 조치가 필요하고, 한 가지는 축하할 일입니다.\n\n조치 1 — 대기 줄. 유의미하게 움직인 유일한 항목인데 나쁜 쪽으로 움직였습니다. 3월 17일부터 월~금 오후 4시 30분~7시 30분에 계산대 두 곳을 추가로 운영합니다. 근무표를 다시 짰으며 이번 주에 새 근무 패턴을 확인하실 수 있습니다.\n\n조치 2 — 베이커리 찾기. 1월 변경에 적응할 시간이 필요하리라 예상했지만 200건이 넘는 의견은 예상보다 많았습니다. 이달 말까지 4번과 5번 통로 끝에 천장 안내판을 설치합니다. 그래도 고객이 물으시면 손으로 가리키지 말고 직접 모셔다 드리십시오.\n\n조치 3 — 글루텐 프리 상품. 구매팀이 4월부터 18개 품목을 추가하기로 했습니다. 진열 공간은 지난가을에 합의한 통조림 축소분에서 확보합니다.\n\n그리고 축하할 일. 가장 점수가 높은 항목은 바로 여러분이었습니다. 86퍼센트가 직원이 친절하다고 답했고 149건의 의견이 동료들의 이름을 언급했습니다. 그 의견들은 인쇄하여 휴게실 게시판에 붙여 두었습니다."}
   ],
   gloss:[{w:"produce",ko:"농산물"},{w:"queue",ko:"대기 줄"},{w:"rota",ko:"근무표"},
          {w:"aisle",ko:"(매장) 통로"},{w:"line (retail)",ko:"(상품) 품목"}],
   qs:[
     {q:"What does the survey summary indicate about staff helpfulness?",
      opts:["It received the highest satisfaction score.","It fell by fourteen points.","It was not measured last year.","It received the most written comments."],
      ans:0, exp:"86퍼센트로 가장 높다. 14포인트 하락은 계산 대기 시간이고, 서술형 최다는 대기 줄(411건)이다."},
     {q:"Which action responds to the survey's largest decline?", link:true,
      opts:["Installing overhead signs","Staffing more checkouts in the evening","Adding gluten-free products","Printing customer comments"],
      ans:1, exp:"연계 문제. 지문 1에서 14포인트 떨어진 항목은 계산 대기 시간이고, 지문 2의 조치 1이 저녁 시간대 계산대 증설이다."},
     {q:"Why were overhead signs judged necessary?", link:true,
      opts:["A section was relocated in January.","New products required labelling.","The store extended its opening hours.","Customers could not find the checkouts."],
      ans:0, exp:"연계 문제. 지문 1의 의견 2번(1월 이전 후 베이커리를 못 찾음)에 대응해 지문 2가 통로 끝 안내판 설치를 정했다."},
     {q:"Where will space for the new products come from?",
      opts:["The bakery section","The reduction of tinned goods","Two closed checkouts","The break room"],
      ans:1, exp:"조치 3: 'Shelf space will come from the reduction in tinned goods agreed last autumn.'"},
     {q:"What has Ms. Okonjo done with some of the comments?",
      opts:["Sent them to the buying department","Displayed them in the staff break room","Included them in the survey summary","Read them at a team meeting"],
      ans:1, exp:"마지막 문단: 'printed and are on the noticeboard in the break room.'"}
   ]},

  /* ═══════════ 13. 3지문 — 워크숍 장소 변경 ═══════════ */
  {id:"p7-7", exam:"TOEIC", part7:true, kind:"triple", level:4,
   series:"🏢 비즈니스 실무", type:"Part 7 · 3지문", title:"Workshop Venue Change",
   topic:"워크숍 일정표, 장소 변경 이메일, 참가자 문의",
   docs:[
     {label:"지문 1 · 일정표",
      en:"NORTHGATE INSTITUTE\nOne-Day Workshop: Writing for Non-Specialists\nSaturday, 11 October — Room 2.14, Institute Building, 30 Gorse Road\n\n09:30  Registration and coffee\n10:00  Session 1  Who is your reader? (Dr. Anwen Pryce)\n11:30  Break\n11:45  Session 2  Cutting jargon without losing accuracy (Dr. Anwen Pryce)\n13:00  Lunch (provided)\n14:00  Session 3  Structure: the inverted pyramid and its limits (Mr. Ilya Voronin)\n15:15  Break\n15:30  Session 4  Editing workshop — bring a sample of your own writing\n17:00  Close\n\nFee: £95 (£60 for members of the Institute)\nPlaces: 24\n\nParticipants should bring a laptop for Session 4. Room 2.14 has power at every seat and step-free access from the Gorse Road entrance.",
      ko:"노스게이트 인스티튜트\n1일 워크숍: 비전문가를 위한 글쓰기\n10월 11일 토요일 — 고스로 30번지 인스티튜트 빌딩 2.14호\n\n09:30  등록 및 커피\n10:00  세션 1  당신의 독자는 누구인가 (안웬 프라이스 박사)\n11:30  휴식\n11:45  세션 2  정확성을 잃지 않고 전문용어 줄이기 (안웬 프라이스 박사)\n13:00  점심 (제공)\n14:00  세션 3  구조: 역피라미드와 그 한계 (일리야 보로닌)\n15:15  휴식\n15:30  세션 4  편집 워크숍 — 본인 글 샘플을 가져오세요\n17:00  종료\n\n수강료: 95파운드 (인스티튜트 회원 60파운드)\n정원: 24명\n\n참가자는 세션 4를 위해 노트북을 지참해 주십시오. 2.14호는 전 좌석에 전원이 있으며 고스로 입구에서 계단 없이 접근할 수 있습니다."},
     {label:"지문 2 · 이메일 (주최 측 → 참가자 전원)",
      en:"To:      workshop participants\nFrom:    m.hollis@northgate-institute.org\nDate:    2 October\nSubject: Venue change for 11 October\n\nDear all,\n\nA water leak has closed the second floor of the Institute Building, and we have had to move the workshop. It will now take place at the Marden Centre, 5 Culver Street — about seven minutes' walk from our usual building, on the far side of the park.\n\nThe timings in the programme are unchanged, and both tutors are unaffected. Two other things have changed.\n\nFirst, the Marden Centre's largest room seats thirty-two rather than twenty-four, so we have released eight further places. If you know a colleague who was turned away, they may still book.\n\nSecond, the Marden Centre does not have power sockets at the seats — only along one wall. Please arrive with your laptop charged. We will bring extension leads but cannot promise a socket for everyone.\n\nThe Culver Street entrance has three steps. There is a step-free entrance on Padgett Lane at the rear of the building; please let me know in advance if you need it, as that door is kept locked and we will arrange for someone to meet you.\n\nLunch arrangements are unchanged.\n\nMarion Hollis\nCourse Administrator",
      ko:"수신: 워크숍 참가자\n발신: m.hollis@northgate-institute.org\n날짜: 10월 2일\n제목: 10월 11일 장소 변경\n\n참가자 여러분께,\n\n누수로 인스티튜트 빌딩 2층이 폐쇄되어 워크숍 장소를 옮기게 되었습니다. 이제 컬버가 5번지 마든 센터에서 열립니다. 평소 건물에서 도보 7분 거리로, 공원 건너편입니다.\n\n프로그램의 시간표는 그대로이고 두 강사도 변동이 없습니다. 다만 두 가지가 달라졌습니다.\n\n첫째, 마든 센터의 가장 큰 강의실은 24석이 아니라 32석이라 여덟 자리를 추가로 열었습니다. 마감되어 등록하지 못한 동료가 있다면 지금도 신청할 수 있습니다.\n\n둘째, 마든 센터는 좌석마다 콘센트가 있지 않고 한쪽 벽면에만 있습니다. 노트북을 충전해서 오십시오. 멀티탭을 가져가겠지만 모든 분께 콘센트를 드린다고 약속드릴 수는 없습니다.\n\n컬버가 입구에는 계단이 세 개 있습니다. 건물 뒤편 패젓 레인에 계단 없는 출입구가 있으니 필요하시면 미리 알려 주십시오. 그 문은 잠겨 있어 마중 나갈 사람을 준비해야 합니다.\n\n점심 관련 사항은 변동 없습니다.\n\n과정 담당 매리언 홀리스"},
     {label:"지문 3 · 이메일 (참가자 → 주최 측)",
      en:"To:      m.hollis@northgate-institute.org\nFrom:    d.arriaga@brenlow.org\nDate:    3 October\nSubject: RE: Venue change for 11 October\n\nDear Ms. Hollis,\n\nThank you for the notice. Three things from my side.\n\nI use a wheelchair, so I will need the rear entrance you mention. I plan to arrive at about 9:15 A.M. — would that be early enough for someone to meet me?\n\nI also have a colleague, Femi Balogun, who was told in September that the workshop was full. He would like one of the new places. Shall he book through the website or would you rather add him directly?\n\nFinally, my laptop battery is unreliable and I would rather not risk it during the afternoon session. If the sockets are all along one wall, could I be seated on that side? I am happy to sit anywhere else for the morning.\n\nWith thanks,\nDaniela Arriaga\nBrenlow Trust",
      ko:"수신: m.hollis@northgate-institute.org\n발신: d.arriaga@brenlow.org\n날짜: 10월 3일\n제목: RE: 10월 11일 장소 변경\n\n홀리스 님께,\n\n안내 감사합니다. 제 쪽에서 세 가지 말씀드립니다.\n\n저는 휠체어를 이용해서 말씀하신 후문이 필요합니다. 오전 9시 15분쯤 도착할 예정인데, 마중 나오시기에 충분히 이른 시각일까요?\n\n또 9월에 워크숍이 마감됐다는 안내를 받은 동료 페미 발로군이 있습니다. 새로 열린 자리 중 하나를 원합니다. 웹사이트로 신청하면 될까요, 아니면 직접 추가해 주시는 편이 나을까요?\n\n마지막으로, 제 노트북 배터리가 못 미더워서 오후 세션에 위험을 감수하고 싶지 않습니다. 콘센트가 한쪽 벽면에만 있다면 그쪽 자리에 앉을 수 있을까요? 오전에는 어디에 앉아도 괜찮습니다.\n\n브렌로 트러스트\n다니엘라 아리아가 드림"}
   ],
   gloss:[{w:"jargon",ko:"전문용어"},{w:"inverted pyramid",ko:"역피라미드 (기사 구조)"},{w:"step-free access",ko:"계단 없는 진입로"},
          {w:"extension lead",ko:"멀티탭, 연장 코드"},{w:"turn away",ko:"(정원이 차서) 돌려보내다"}],
   qs:[
     {q:"What is stated about the workshop schedule after the move?",
      opts:["It starts an hour later.","It remains the same.","Session 4 has been cancelled.","One tutor has been replaced."],
      ans:1, exp:"지문 2: 'The timings in the programme are unchanged, and both tutors are unaffected.'"},
     {q:"Why does Ms. Arriaga want a particular seat in the afternoon?", link:true,
      opts:["Session 4 requires a laptop and sockets are limited.","She cannot see the screen from the back.","The rear entrance is closest to that side.","Lunch is served on that side of the room."],
      ans:0, exp:"연계 문제. 지문 1에서 세션 4가 노트북 지참 편집 실습이고, 지문 2에서 콘센트가 한쪽 벽면뿐이라고 했다. 두 지문을 겹쳐야 이유가 완성된다."},
     {q:"How many places were available for the workshop after the venue changed?", link:true,
      opts:["24","30","32","8"],
      ans:2, exp:"연계 문제. 지문 1의 정원 24명에 지문 2의 '여덟 자리 추가'를 더하면 32명이고, 지문 2가 마든 센터 강의실이 32석이라고 확인해 준다."},
     {q:"What does Ms. Arriaga ask about her colleague?",
      opts:["Whether he may attend only the afternoon","How he should register for a place","Whether the member rate applies to him","If he can be seated beside her"],
      ans:1, exp:"'Shall he book through the website or would you rather add him directly?'"},
     {q:"What must Ms. Hollis arrange for Ms. Arriaga?",
      opts:["A taxi from the Institute Building","Someone to open the Padgett Lane door","A printed copy of the programme","A separate lunch order"],
      ans:1, exp:"지문 2에서 후문은 잠겨 있어 마중이 필요하다고 했고, 지문 3에서 아리아가 씨가 그 문이 필요하다고 밝혔다."}
   ]}

];
