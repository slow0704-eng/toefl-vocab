/* ============================================================
   TOEIC Part 6 — 장문 빈칸 채우기 (Text Completion)
   ------------------------------------------------------------
   Part 5 는 문장 하나로 끝나지만 Part 6 는 지문 전체를 읽어야
   답이 갈린다. 특히 두 가지가 Part 5 와 다르다.

   ① 시제·대명사는 "앞뒤 문장"이 정한다.
      빈칸 문장만 보면 네 개가 다 말이 되는데, 앞 문단에 이미
      일어난 일로 서술돼 있으면 과거, 다음 주 일정이 나오면
      미래로 고정된다.
   ② 4문항 중 하나는 반드시 문장 삽입이다.
      앞 문장의 지시어·연결어와 뒤 문장의 주어가 맞물리는
      자리를 찾는 문제라, 문법이 아니라 흐름으로 푼다.

   각 세트: { id, level, type, title, topic, en, ko, gloss, qs }
     en   : 빈칸을 ___1___ ~ ___4___ 로 표시한 지문
     qs   : [{no, cat, opts[4], ans, exp}]
            cat "문장 삽입" 이면 opts 가 통문장이다.
   level: 2=중급, 3=고급
   ============================================================ */
window.PART6 = [

  /* ═══════════ 1. 이메일 — 본사 이전 안내 ═══════════ */
  {id:"p6-1", level:2, type:"이메일", title:"Office Relocation Notice",
   topic:"본사 이전을 사내에 알리는 이메일",
   en:"To: All Staff\nFrom: Facilities Management\nSubject: Move to the Brayton Building\n\nAs many of you already know, our head office ___1___ to the Brayton Building on 14 September. The new address is 220 Harlow Street, three blocks south of our current location.\n\nPacking crates will be delivered to each floor on 11 September. Please label every box with your name and department, and leave personal items out of the crates. ___2___ Anything left in the old office after 5:00 P.M. on 13 September will be discarded.\n\nThe Brayton Building has fewer parking spaces than our current site. ___3___, staff who drive are encouraged to apply for a permit before 1 September. Permits will be issued on a first-come, first-served basis.\n\nIf you have questions about the move, please contact the facilities desk at extension 4120. We ___4___ your patience during this transition.",
   ko:"수신: 전 직원\n발신: 시설관리팀\n제목: 브레이턴 빌딩 이전\n\n이미 많은 분들이 아시다시피, 본사가 9월 14일 브레이턴 빌딩으로 이전합니다. 새 주소는 할로우가 220번지로, 현재 위치에서 남쪽으로 세 블록 떨어진 곳입니다.\n\n포장용 상자는 9월 11일에 각 층으로 배송됩니다. 모든 상자에 이름과 부서를 표시해 주시고, 개인 물품은 상자에 넣지 말아 주십시오. 개인 소지품은 각자 직접 옮기셔야 합니다. 9월 13일 오후 5시 이후 옛 사무실에 남아 있는 물건은 폐기됩니다.\n\n브레이턴 빌딩은 현재 건물보다 주차 공간이 적습니다. 따라서 차량을 이용하시는 직원은 9월 1일 전에 주차권을 신청하시기 바랍니다. 주차권은 선착순으로 발급됩니다.\n\n이전에 관해 문의사항이 있으시면 시설관리 데스크(내선 4120)로 연락해 주십시오. 이 기간 동안 보내 주시는 인내에 감사드립니다.",
   gloss:[{w:"relocation",ko:"이전, 이동"},{w:"crate",ko:"(운반용) 상자"},{w:"discard",ko:"폐기하다"},
          {w:"on a first-come, first-served basis",ko:"선착순으로"},{w:"transition",ko:"전환, 이행기"}],
   qs:[
     {no:1, cat:"동사 시제", opts:["has moved","will be moving","had moved","was moved"], ans:1,
      exp:"뒤에 '14 September'라는 미래 날짜가 붙어 있고, 이어지는 문단이 전부 이전 준비 절차다. 아직 일어나지 않은 일이므로 미래진행 will be moving. 이미 옮겼다면 포장 상자를 배송할 이유가 없다."},
     {no:2, cat:"문장 삽입", opts:[
        "The new lease runs for a further five years.",
        "You will need to carry personal belongings yourself.",
        "Parking permits are valid at both locations.",
        "Our previous move took place over a weekend."], ans:1,
      exp:"앞 문장이 'leave personal items out of the crates(개인 물품은 상자에 넣지 마라)'이므로, 그럼 개인 물품은 어떻게 하라는 것인지가 바로 이어져야 자연스럽다. (B)가 그 답을 준다. (C)는 주차 얘기라 다음 문단 소재이고, (A)·(D)는 지시사항 흐름을 끊는다."},
     {no:3, cat:"연결어", opts:["Nevertheless","For example","Accordingly","In contrast"], ans:2,
      exp:"'주차 공간이 적다' → '미리 신청하라'는 원인과 그에 따른 조치다. 인과를 잇는 Accordingly가 맞다. Nevertheless(그럼에도)나 In contrast(반대로)를 넣으면 앞뒤가 뒤집힌다."},
     {no:4, cat:"어휘", opts:["appreciate","require","postpone","reserve"], ans:0,
      exp:"'~ your patience'와 어울리는 동사는 appreciate(감사하다). We appreciate your patience는 공지문 맺음말의 관용 표현이다."}
   ]},

  /* ═══════════ 2. 공지 — 주차장 보수 공사 ═══════════ */
  {id:"p6-2", level:2, type:"공지", title:"Parking Structure Repairs",
   topic:"주차 건물 보수 공사와 임시 주차 안내",
   en:"NOTICE TO TENANTS\n\nRepairs to the east parking structure will begin on Monday, 3 April and are expected to ___1___ approximately six weeks. During this period, levels 3 and 4 will be closed to all vehicles.\n\nTenants who normally park on the closed levels may use the overflow lot on Denton Road at no additional charge. A shuttle will run between the lot and the main lobby every fifteen minutes from 7:00 A.M. to 7:30 P.M. ___2___\n\nWe recognize that this arrangement is less convenient than usual. The work, ___3___, cannot be delayed any further; the concrete on the upper levels has deteriorated to the point where it must be replaced.\n\nUpdated information will be posted in each lobby and sent by e-mail every Friday. Please direct any ___4___ to the building management office.",
   ko:"입주사 안내문\n\n동편 주차 건물 보수 공사가 4월 3일 월요일에 시작되며 약 6주간 진행될 예정입니다. 이 기간 동안 3층과 4층은 모든 차량에 대해 폐쇄됩니다.\n\n평소 폐쇄 층에 주차하시던 입주사는 덴턴로의 임시 주차장을 추가 요금 없이 이용하실 수 있습니다. 셔틀버스가 오전 7시부터 오후 7시 30분까지 15분 간격으로 주차장과 본관 로비 사이를 운행합니다. 주말에는 셔틀이 운행되지 않습니다.\n\n이 조치가 평소보다 불편하다는 점을 알고 있습니다. 그러나 공사를 더 미룰 수는 없습니다. 상층부 콘크리트가 교체하지 않으면 안 될 정도로 노후했기 때문입니다.\n\n최신 정보는 각 로비에 게시되고 매주 금요일 이메일로 발송됩니다. 문의사항은 건물 관리사무소로 보내 주십시오.",
   gloss:[{w:"tenant",ko:"입주자, 세입자"},{w:"overflow lot",ko:"임시(보조) 주차장"},{w:"deteriorate",ko:"악화되다, 노후하다"},
          {w:"arrangement",ko:"조치, 처리 방식"},{w:"direct A to B",ko:"A를 B로 보내다"}],
   qs:[
     {no:1, cat:"동사 형태", opts:["take","taking","be taken","have taken"], ans:0,
      exp:"be expected to 뒤는 동사원형. 공사가 6주를 '차지하다'라는 능동 의미이므로 수동 be taken도 아니다."},
     {no:2, cat:"문장 삽입", opts:[
        "Shuttle service will not operate on weekends.",
        "All four levels will remain open as usual.",
        "Monthly parking rates will increase in April.",
        "The east structure was built twelve years ago."], ans:0,
      exp:"바로 앞 문장이 셔틀 운행 시간표다. 그 시간표에 붙는 단서(주말 미운행)가 자연스럽다. (B)는 '3·4층 폐쇄'와 정면으로 모순되고, (C)는 'at no additional charge'와 어긋난다."},
     {no:3, cat:"연결어", opts:["however","therefore","likewise","in addition"], ans:0,
      exp:"앞 문장은 '불편한 줄 안다'는 인정이고 뒤는 '그래도 미룰 수 없다'는 반전이다. 삽입 위치가 주어 뒤 콤마 사이라도 역할은 같다. → however"},
     {no:4, cat:"어휘", opts:["deliveries","inquiries","renovations","vacancies"], ans:1,
      exp:"'~을 관리사무소로 보내라'의 목적어로 맞는 것은 inquiries(문의). 앞 문장에서 정보 안내 방법을 설명한 뒤 추가 질문 창구를 알려 주는 흐름이다."}
   ]},

  /* ═══════════ 3. 기사 — 지역 카페 체인 확장 ═══════════ */
  {id:"p6-3", level:3, type:"기사", title:"Marlow Coffee to Open Ten New Branches",
   topic:"지역 카페 체인의 확장 계획 기사",
   en:"HARBOURSIDE — Marlow Coffee, the regional chain founded here in 2009, announced yesterday that it ___1___ ten additional branches over the next two years. Eight of the new locations will be in the metropolitan area, with the remaining two in Ashford and Kellingham.\n\nThe expansion follows three consecutive years of rising revenue. Chief executive Nadia Sorel attributed the growth less to advertising than to the company's decision to roast its own beans. ___2___\n\nNot everyone is convinced the pace is sustainable. Retail analyst Peter Yun noted that two competing chains had expanded ___3___ in the same period and later closed underperforming stores. Ms. Sorel responded that Marlow's new sites had been selected only after eighteen months of foot-traffic study.\n\nHiring for the first three branches ___4___ next month. The company expects to add roughly 140 positions in total.",
   ko:"하버사이드 — 2009년 이곳에서 창립된 지역 체인 말로 커피가 어제 향후 2년간 열 개의 지점을 추가로 열 계획이라고 발표했다. 신규 지점 중 여덟 곳은 대도시권에 들어서고, 나머지 두 곳은 애슈퍼드와 켈링엄에 자리 잡는다.\n\n이번 확장은 3년 연속 매출 증가에 이은 것이다. 나디아 소렐 최고경영자는 성장의 원인을 광고보다는 원두를 직접 로스팅하기로 한 결정에서 찾았다. 그 변화로 회사는 원가를 낮추는 동시에 맛을 일정하게 유지할 수 있었다.\n\n이 속도가 지속 가능하다고 모두가 믿는 것은 아니다. 소매 분석가 피터 윤은 경쟁 체인 두 곳이 같은 기간에 공격적으로 확장했다가 나중에 실적이 부진한 매장을 닫았다고 지적했다. 소렐 씨는 말로의 신규 부지가 18개월간의 유동인구 조사를 거친 뒤에야 선정됐다고 답했다.\n\n첫 세 개 지점의 채용은 다음 달에 시작된다. 회사는 총 140여 개의 일자리가 생길 것으로 예상하고 있다.",
   gloss:[{w:"consecutive",ko:"연속적인"},{w:"attribute A to B",ko:"A를 B의 덕분으로 돌리다"},{w:"sustainable",ko:"지속 가능한"},
          {w:"underperforming",ko:"실적이 부진한"},{w:"foot traffic",ko:"유동인구"}],
   qs:[
     {no:1, cat:"동사 시제", opts:["opened","has opened","would open","had opened"], ans:2,
      exp:"주절 동사가 announced(과거)이고 내용은 '앞으로 2년간'이므로 시제 일치에 따라 will → would. 과거완료 had opened를 넣으면 이미 문 연 지점이 되어 'over the next two years'와 충돌한다."},
     {no:2, cat:"문장 삽입", opts:[
        "The change allowed the company to lower costs while keeping flavour consistent.",
        "Its first branch remains open near the harbour.",
        "Advertising spending has doubled since last spring.",
        "Most customers order their drinks through the mobile app."], ans:0,
      exp:"앞 문장이 '광고보다 자체 로스팅 결정 덕분'이라고 원인을 짚었다. 그 결정이 어떤 이득을 줬는지 설명하는 (A)가 이어져야 한다. (C)는 '광고보다는'이라는 앞 문장과 정반대 방향이다."},
     {no:3, cat:"어휘", opts:["aggressively","reluctantly","narrowly","temporarily"], ans:0,
      exp:"'확장했다가 부진 매장을 닫았다'는 경고성 사례다. 무리하게 밀어붙였다는 뜻의 aggressively가 맞는다. reluctantly(마지못해)면 뒤의 폐점 결과와 인과가 이어지지 않는다."},
     {no:4, cat:"수 일치", opts:["begin","begins","are beginning","have begun"], ans:1,
      exp:"주어의 핵은 Hiring(단수 동명사)이고 'for the first three branches'는 수식어일 뿐이다. next month가 있으므로 현재시제로 미래를 나타내는 begins."}
   ]},

  /* ═══════════ 4. 광고 — 코워킹 스페이스 개관 ═══════════ */
  {id:"p6-4", level:2, type:"광고", title:"Introducing Carlow Works",
   topic:"공유 오피스 개관 광고와 개관 기념 할인",
   en:"CARLOW WORKS — Now Open on Fenner Avenue\n\nLooking for a workspace that grows with your business? Carlow Works offers private offices, dedicated desks, and open seating in a renovated textile mill just ten minutes from the city centre.\n\nEvery membership ___1___ high-speed internet, mail handling, and unlimited use of our four meeting rooms. Members may also book the ground-floor event space at a reduced rate.\n\n___2___ Members who join before 30 June will receive their first two months at half price and may cancel at any time with thirty days' notice.\n\nWe designed Carlow Works for teams that change size quickly. If your team grows, you can move to a larger office ___3___ signing a new contract.\n\nTours are available weekdays from 9:00 A.M. to 6:00 P.M. Book one at carlowworks.com or simply ___4___ in — the front desk is always staffed.",
   ko:"칼로 웍스 — 페너 애비뉴에 오픈했습니다\n\n사업 규모에 맞춰 함께 커지는 업무 공간을 찾고 계신가요? 칼로 웍스는 도심에서 단 10분 거리의 리모델링한 방직공장 건물에서 개인 사무실, 지정 좌석, 자유 좌석을 제공합니다.\n\n모든 멤버십에는 초고속 인터넷, 우편물 관리, 네 개 회의실 무제한 이용이 포함됩니다. 회원은 1층 행사 공간도 할인가에 예약하실 수 있습니다.\n\n개관 기념 혜택은 이번 달로 끝납니다. 6월 30일 이전에 가입하시는 회원은 첫 두 달을 반값에 이용하실 수 있으며, 30일 전에 통보하시면 언제든 해지하실 수 있습니다.\n\n칼로 웍스는 인원이 빠르게 바뀌는 팀을 염두에 두고 설계했습니다. 팀이 커지면 새 계약서를 쓰지 않고도 더 큰 사무실로 옮기실 수 있습니다.\n\n투어는 평일 오전 9시부터 오후 6시까지 가능합니다. carlowworks.com에서 예약하시거나 그냥 들러 주십시오 — 안내 데스크에는 항상 직원이 있습니다.",
   gloss:[{w:"dedicated desk",ko:"(공유 오피스의) 지정 좌석"},{w:"textile mill",ko:"방직공장"},{w:"at a reduced rate",ko:"할인가로"},
          {w:"with thirty days' notice",ko:"30일 전 통보로"},{w:"staffed",ko:"직원이 배치된"}],
   qs:[
     {no:1, cat:"수 일치", opts:["include","includes","including","are included"], ans:1,
      exp:"주어 Every membership은 단수. every+명사는 항상 단수 취급이므로 includes."},
     {no:2, cat:"문장 삽입", opts:[
        "Our opening offer ends this month.",
        "Parking is not available on site.",
        "The building was completed in 1908.",
        "Meeting rooms must be booked a week ahead."], ans:0,
      exp:"뒤 문장이 '6월 30일 이전 가입자는 반값'이라는 기한 한정 혜택이다. 그 혜택을 여는 문장인 (A)가 앞에 와야 한다. (D)는 앞 문단의 'unlimited use'와 모순된다."},
     {no:3, cat:"전치사", opts:["without","despite","besides","except"], ans:0,
      exp:"'새 계약서를 쓰지 않고도 옮길 수 있다'가 광고의 강점이다. 동명사 signing 앞에서 '~하지 않고'는 without."},
     {no:4, cat:"어휘", opts:["drop","fill","check","take"], ans:0,
      exp:"drop in은 '예약 없이 들르다'라는 구동사. 앞의 'Book one … or simply ___ in'에서 예약과 대비되는 행동을 가리킨다."}
   ]},

  /* ═══════════ 5. 이메일 — 배송 지연 사과 ═══════════ */
  {id:"p6-5", level:2, type:"이메일", title:"Regarding Order 88-4102",
   topic:"부품 공급 차질로 인한 배송 지연 사과 이메일",
   en:"Dear Ms. Ferreira,\n\nThank you for your order of twelve Model K desk lamps, placed on 2 May. I am writing to let you know that the shipment ___1___ by about ten days.\n\nOur supplier in Vestholm reported a shortage of the aluminium housings used in this model. ___2___ We now expect to ship your order on 24 May and to deliver it no later than 27 May.\n\nBecause the delay is entirely ___3___ our end, we have removed the shipping charge from your invoice. A revised invoice is attached to this message.\n\nIf the new date does not work for you, we can substitute the Model J lamp, which is in stock and similar in size. Please let me know ___4___ Friday so that I can adjust the order.\n\nSincerely,\nTomas Hale\nCustomer Accounts",
   ko:"페레이라 님께,\n\n5월 2일에 주문해 주신 모델 K 스탠드 12개에 감사드립니다. 배송이 약 열흘 지연될 예정임을 알려드리고자 메일 드립니다.\n\n베스톨름에 있는 저희 공급업체에서 이 모델에 쓰이는 알루미늄 몸체가 부족하다고 알려 왔습니다. 지난주에 대체 공급처를 확보했습니다. 현재로서는 5월 24일에 발송하여 늦어도 5월 27일까지는 배송해 드릴 수 있을 것으로 보입니다.\n\n이번 지연은 전적으로 저희 측 사정이므로 청구서에서 배송비를 삭제했습니다. 수정된 청구서를 이 메일에 첨부했습니다.\n\n새 날짜가 맞지 않으시면 재고가 있고 크기가 비슷한 모델 J 스탠드로 대체해 드릴 수 있습니다. 주문을 조정할 수 있도록 금요일까지 알려 주시기 바랍니다.\n\n토마스 헤일 드림\n고객 관리팀",
   gloss:[{w:"shipment",ko:"발송(품)"},{w:"shortage",ko:"부족"},{w:"housing",ko:"(기계의) 몸체, 외함"},
          {w:"invoice",ko:"청구서, 송장"},{w:"substitute",ko:"대체하다"}],
   qs:[
     {no:1, cat:"태", opts:["will delay","will be delayed","has delayed","is delaying"], ans:1,
      exp:"주어 the shipment는 지연시키는 쪽이 아니라 지연되는 쪽이므로 수동. 아직 오지 않은 발송이므로 will be delayed."},
     {no:2, cat:"문장 삽입", opts:[
        "We secured an alternative source last week.",
        "Model K has been discontinued.",
        "Your payment was received on 2 May.",
        "The lamps are assembled in this office."], ans:0,
      exp:"앞 문장이 '자재 부족'이라는 문제, 뒤 문장이 '이제 24일 발송 가능'이라는 해결이다. 그 사이를 잇는 것은 대체 공급처 확보다. (B)면 아예 배송이 불가능해져 뒤 문장과 모순된다."},
     {no:3, cat:"전치사", opts:["at","on","in","by"], ans:1,
      exp:"on our end는 '저희 쪽 사정으로'라는 관용 표현. 문제의 책임 소재를 밝힐 때 쓴다."},
     {no:4, cat:"전치사", opts:["by","until","during","within"], ans:0,
      exp:"'금요일까지 알려 달라'는 그 시점 전에 완료되는 동작이므로 by. until은 금요일까지 계속 알리는 상태가 되어 어색하다."}
   ]},

  /* ═══════════ 6. 회람 — 사내 소프트웨어 교체 ═══════════ */
  {id:"p6-6", level:3, type:"회람", title:"Transition to Orbit Expense",
   topic:"경비 처리 시스템 교체와 교육 일정 회람",
   en:"MEMORANDUM\n\nTo: All department heads\nFrom: Ingrid Salas, Finance\nRe: New expense system\n\nBeginning 1 October, all travel and purchase claims must be submitted through Orbit Expense. The system we have used since 2016 will be retired on 30 September, and claims filed after that date in the old system ___1___.\n\nOrbit is considerably simpler for the person filing a claim: receipts can be photographed with a phone, and the software reads the amount and date automatically. ___2___ For approvers, the layout will look familiar, though the approval button has moved to the top of the screen.\n\nTraining sessions of forty-five minutes ___3___ in the sixth-floor conference room throughout September. Please make sure at least one person from each team attends.\n\nAny claim already in progress on 30 September will be transferred automatically, so there is no need to resubmit it. Employees ___4___ have questions about a transferred claim should contact the finance help desk rather than their approver.",
   ko:"회람\n\n수신: 각 부서장\n발신: 재무팀 잉그리드 살라스\n제목: 새 경비 시스템\n\n10월 1일부터 모든 출장비·구매비 청구는 오빗 익스펜스를 통해 제출해야 합니다. 2016년부터 사용해 온 기존 시스템은 9월 30일에 종료되며, 그 이후 기존 시스템에 제출된 청구는 처리되지 않습니다.\n\n오빗은 청구서를 작성하는 사람 입장에서 훨씬 간단합니다. 영수증을 휴대폰으로 촬영하면 소프트웨어가 금액과 날짜를 자동으로 읽어 냅니다. 그 결과 대부분의 청구가 5분 이내에 완료됩니다. 승인자 입장에서는 화면 구성이 익숙하겠지만 승인 버튼이 화면 상단으로 옮겨졌습니다.\n\n45분짜리 교육 세션이 9월 내내 6층 회의실에서 열립니다. 각 팀에서 최소 한 명은 참석하도록 해 주십시오.\n\n9월 30일 시점에 진행 중인 청구는 자동으로 이관되므로 다시 제출하실 필요가 없습니다. 이관된 청구에 대해 문의가 있는 직원은 승인자가 아니라 재무 헬프데스크로 연락해 주십시오.",
   gloss:[{w:"claim",ko:"(비용) 청구(서)"},{w:"retire (a system)",ko:"(시스템을) 폐기·종료하다"},{w:"considerably",ko:"상당히"},
          {w:"approver",ko:"승인자"},{w:"in progress",ko:"진행 중인"}],
   qs:[
     {no:1, cat:"태", opts:["will not process","will not be processed","have not processed","are not processing"], ans:1,
      exp:"주어 claims는 처리되는 대상이므로 수동. 9월 30일 이후의 일이니 미래 will not be processed."},
     {no:2, cat:"문장 삽입", opts:[
        "As a result, most claims take under five minutes to complete.",
        "Paper receipts must be mailed to the finance office.",
        "The old system will remain available until December.",
        "Approvers will need a new password each month."], ans:0,
      exp:"앞 문장이 '사진만 찍으면 자동 인식'이라는 편의 설명이므로, 그 결과를 요약하는 (A)가 자연스럽다. (B)는 사진 촬영과 모순되고, (C)는 첫 문단의 '9월 30일 종료'와 정면으로 어긋난다."},
     {no:3, cat:"동사 형태", opts:["will hold","will be held","holding","are holding"], ans:1,
      exp:"주어 Training sessions는 열리는 쪽이므로 수동. 9월 내내 예정된 일이라 미래 will be held."},
     {no:4, cat:"관계사", opts:["who","which","whose","whom"], ans:0,
      exp:"선행사 Employees는 사람이고 빈칸 뒤에 동사 have가 바로 오므로 주격 관계대명사 who. whom은 목적격이라 뒤에 주어가 와야 한다."}
   ]},

  /* ═══════════ 7. 안내문 — 신입사원 온보딩 ═══════════ */
  {id:"p6-7", level:2, type:"안내문", title:"Your First Week at Delway",
   topic:"신입사원 첫 주 일정 안내문",
   en:"Welcome to Delway Logistics.\n\nYour first day begins at 9:30 A.M. in the ground-floor training room. Please bring photo identification and your signed contract; you will not be able to collect your building pass ___1___ them.\n\nThe morning covers company policies and safety procedures. In the afternoon you will meet your team and set up your workstation. ___2___\n\nOn your second day, you will shadow a colleague in your department. This is the best opportunity you will have to ask questions, so we encourage you to be ___3___ — no question is considered too basic during the first week.\n\nBy Friday, your manager will meet with you to agree on goals for your first three months. Nothing discussed in that meeting is final; goals ___4___ at any point as you learn more about the role.",
   ko:"델웨이 로지스틱스에 오신 것을 환영합니다.\n\n첫날은 오전 9시 30분 1층 교육실에서 시작합니다. 사진이 있는 신분증과 서명한 계약서를 지참해 주십시오. 이 서류들 없이는 출입증을 수령하실 수 없습니다.\n\n오전에는 회사 규정과 안전 절차를 다룹니다. 오후에는 소속 팀과 인사하고 업무 공간을 세팅하게 됩니다. 노트북은 도착하시기 전에 미리 준비되어 있습니다.\n\n둘째 날에는 소속 부서의 동료를 따라다니며 업무를 지켜보게 됩니다. 질문하기에 가장 좋은 기회이므로 적극적으로 임하시기 바랍니다. 첫 주에는 어떤 질문도 너무 기초적이라고 여겨지지 않습니다.\n\n금요일까지 관리자와 만나 첫 3개월의 목표를 합의하게 됩니다. 그 면담에서 논의된 내용이 확정은 아닙니다. 업무를 더 알아 가면서 목표는 언제든 조정될 수 있습니다.",
   gloss:[{w:"photo identification",ko:"사진이 부착된 신분증"},{w:"building pass",ko:"출입증"},{w:"shadow (a colleague)",ko:"(동료를) 따라다니며 업무를 익히다"},
          {w:"workstation",ko:"업무 공간, 작업 자리"},{w:"agree on",ko:"~에 합의하다"}],
   qs:[
     {no:1, cat:"전치사", opts:["without","besides","against","among"], ans:0,
      exp:"'서류를 가져오라 → 그것 없이는 출입증을 못 받는다'는 흐름이므로 without."},
     {no:2, cat:"문장 삽입", opts:[
        "A laptop will be prepared for you before you arrive.",
        "Parking permits are issued after six months.",
        "The training room seats eighty people.",
        "Most staff work from home on Fridays."], ans:0,
      exp:"앞 문장이 '업무 공간을 세팅한다'이므로 장비 준비 상태를 알려 주는 (A)가 이어진다. (D)는 금요일 면담이 예정된 마지막 문단과 충돌한다."},
     {no:3, cat:"어휘", opts:["curious","cautious","punctual","modest"], ans:0,
      exp:"뒤 문장이 '어떤 질문도 기초적이라 여겨지지 않는다'이므로 궁금한 것을 마음껏 물어보라는 뜻. curious가 맞는다."},
     {no:4, cat:"태", opts:["can adjust","can be adjusted","adjusting","have adjusted"], ans:1,
      exp:"목표(goals)는 조정되는 대상이므로 수동 can be adjusted. 앞 문장 'Nothing … is final'과 짝을 이룬다."}
   ]},

  /* ═══════════ 8. 편지 — 구독 갱신 안내 ═══════════ */
  {id:"p6-8", level:2, type:"편지", title:"Your Subscription Expires Soon",
   topic:"잡지 구독 만료와 갱신 안내 편지",
   en:"Dear Subscriber,\n\nYour subscription to Northern Field Quarterly expires with the winter issue. We hope you ___1___ the magazine over the past year and will choose to continue.\n\nRenewing is straightforward. You may renew online at northernfield.com/renew, by telephone, or by returning the enclosed card. ___2___\n\nThis year we are adding a digital archive to every print subscription at no extra cost. Subscribers ___3___ access all issues published since 1994, including the photography supplements that are no longer available in print.\n\nRates will rise slightly in March. However, anyone who renews before 15 February ___4___ the current rate for two full years.\n\nWith thanks for your readership,\nElena Vance, Circulation Manager",
   ko:"구독자님께,\n\n노던 필드 쿼털리 구독이 겨울호로 만료됩니다. 지난 한 해 동안 이 잡지를 즐겁게 보셨기를 바라며, 계속 구독해 주시기를 기대합니다.\n\n갱신은 간단합니다. northernfield.com/renew에서 온라인으로, 전화로, 또는 동봉된 카드를 반송하셔서 갱신하실 수 있습니다. 어느 방법이든 몇 분이면 끝납니다.\n\n올해부터는 모든 인쇄 구독에 디지털 아카이브를 추가 비용 없이 제공합니다. 구독자께서는 1994년 이후 발행된 모든 호를 열람하실 수 있으며, 여기에는 더 이상 인쇄본으로 구할 수 없는 사진 별책도 포함됩니다.\n\n요금은 3월에 소폭 인상됩니다. 다만 2월 15일 이전에 갱신하시는 분은 현재 요금을 꼬박 2년간 유지하실 수 있습니다.\n\n애독해 주셔서 감사드립니다.\n발행부장 엘레나 밴스 드림",
   gloss:[{w:"expire",ko:"만료되다"},{w:"straightforward",ko:"간단한, 복잡하지 않은"},{w:"enclosed",ko:"동봉된"},
          {w:"supplement",ko:"별책, 부록"},{w:"circulation",ko:"발행 부수, 판매 부수"}],
   qs:[
     {no:1, cat:"동사 시제", opts:["enjoy","enjoyed","have enjoyed","will enjoy"], ans:2,
      exp:"'over the past year'는 과거부터 지금까지 이어진 기간이므로 현재완료. 단순 과거는 지금과의 연결이 끊긴다."},
     {no:2, cat:"문장 삽입", opts:[
        "Whichever method you choose, it takes only a few minutes.",
        "Back issues cannot be purchased individually.",
        "Our offices are closed for the winter holiday.",
        "The magazine is printed in Halbury."], ans:0,
      exp:"앞 문장에서 갱신 방법 세 가지를 나열했다. 그 세 가지를 하나로 묶어 마무리하는 (A)가 자연스럽다. Whichever method가 앞의 나열을 그대로 받는다."},
     {no:3, cat:"동사 형태", opts:["will be able to","are able","can to","will able to"], ans:0,
      exp:"조동사 will 뒤에는 be able to가 붙어야 미래의 가능을 나타낸다. can to·will able to는 형태 자체가 틀렸다."},
     {no:4, cat:"동사 시제", opts:["kept","will keep","would keep","has kept"], ans:1,
      exp:"조건이 '2월 15일 이전에 갱신하면'이므로 결과는 미래. 주어 anyone은 단수지만 will keep은 수와 무관하다."}
   ]},

  /* ═══════════ 9. 기사 — 물류창고 자동화 ═══════════ */
  {id:"p6-9", level:3, type:"기사", title:"Warehouse Automation Reaches the Midsize Firm",
   topic:"중견 물류업체의 창고 자동화 도입 기사",
   en:"For a decade, automated warehouses were the preserve of the very largest retailers, ___1___ only they could absorb the cost of the equipment. That is changing. Robotics vendors now lease their systems by the month, and midsize distributors are signing up.\n\nHalloran Supply, which employs 210 people at a single site outside Trentmoor, installed twenty mobile shelving robots in January. ___2___ Order-picking time has fallen by roughly a third since then.\n\nThe firm's operations director, Mei Aoki, is careful about how she describes the result. The robots did not ___3___ jobs, she says; they removed the walking. Staff who once covered twelve kilometres in a shift now stay at packing stations while shelves are brought to them.\n\nStill, the transition demanded retraining, and not every employee wanted it. Two workers left rather than move to the packing floor. Ms. Aoki concedes that the company ___4___ the training programme earlier than it did.",
   ko:"지난 10년간 자동화 창고는 최대 규모 소매업체만의 것이었다. 장비 비용을 감당할 수 있는 곳이 그들뿐이었기 때문이다. 그런데 상황이 바뀌고 있다. 로봇 공급업체들이 이제 시스템을 월 단위로 임대하고 있고, 중견 유통업체들이 계약에 나서고 있다.\n\n트렌트무어 외곽 단일 사업장에서 210명을 고용하고 있는 핼로런 서플라이는 1월에 이동식 선반 로봇 20대를 설치했다. 설치 작업은 주말 이틀 만에 끝났다. 그 이후 주문 피킹 시간이 약 3분의 1 줄었다.\n\n이 회사의 운영이사 메이 아오키는 결과를 설명하는 방식에 신중하다. 로봇이 일자리를 없앤 것이 아니라 걷는 일을 없앴다는 것이다. 예전에는 한 교대에 12킬로미터를 걷던 직원들이 이제는 포장대에 머무르고 선반이 그들에게 온다.\n\n그럼에도 이 전환에는 재교육이 필요했고, 모든 직원이 그것을 원한 것은 아니었다. 두 명은 포장 구역으로 옮기는 대신 퇴사했다. 아오키 씨는 회사가 교육 프로그램을 실제보다 더 일찍 시작했어야 했다고 인정한다.",
   gloss:[{w:"the preserve of",ko:"~만의 영역"},{w:"absorb the cost",ko:"비용을 감당하다"},{w:"order picking",ko:"주문 물품 집품"},
          {w:"shift",ko:"교대 근무"},{w:"concede",ko:"인정하다"}],
   qs:[
     {no:1, cat:"접속사", opts:["because","although","whereas","unless"], ans:0,
      exp:"'최대 업체만의 것이었다'는 결과와 '그들만 비용을 감당할 수 있었다'는 원인을 잇는다. → because"},
     {no:2, cat:"문장 삽입", opts:[
        "The installation took two days over a weekend.",
        "The site has been in operation since 1978.",
        "The company plans to open a second warehouse.",
        "Robotics vendors rarely offer leasing terms."], ans:0,
      exp:"앞 문장은 '1월에 설치했다', 뒤 문장은 '그 이후 피킹 시간이 줄었다'이다. 사이에 설치가 얼마나 걸렸는지가 들어가야 시간 흐름이 끊기지 않는다. (D)는 첫 문단의 'lease their systems by the month'와 모순된다."},
     {no:3, cat:"어휘", opts:["eliminate","postpone","evaluate","distribute"], ans:0,
      exp:"뒤에 세미콜론으로 'they removed the walking(걷는 일을 없앴다)'이 대조된다. '일자리를 없앤 것이 아니라'가 되려면 eliminate."},
     {no:4, cat:"가정법", opts:["should start","should have started","must start","would start"], ans:1,
      exp:"이미 지나간 일에 대한 후회·아쉬움은 should have p.p. 뒤의 'earlier than it did'가 실제로는 늦게 시작했음을 알려 준다."}
   ]},

  /* ═══════════ 10. 이메일 — 컨퍼런스 발표자 초청 ═══════════ */
  {id:"p6-10", level:3, type:"이메일", title:"Invitation to Speak at RegionBuild",
   topic:"건축 컨퍼런스 발표자 초청 이메일",
   en:"Dear Dr. Ibarra,\n\nOn behalf of the RegionBuild organising committee, I would like to invite you to speak at this year's conference, held in Calverton from 8 to 10 November.\n\nWe have followed your work on low-cost retrofitting ___1___ your paper appeared in Built Environment Review last spring. Delegates this year are largely municipal planners, and your findings on insulation in older housing stock would speak directly to their concerns. ___2___\n\nThe session we have in mind runs for fifty minutes, ___3___ questions. We can schedule it on any of the three days, so please tell us which suits you.\n\nThe committee covers travel and two nights' accommodation for all invited speakers. ___4___ you are able to join us, I will send the full schedule and a short form for your biography and photograph.\n\nWe do hope you will accept.\n\nYours sincerely,\nHarriet Ng, Programme Chair",
   ko:"이바라 박사님께,\n\n리전빌드 조직위원회를 대표하여, 11월 8일부터 10일까지 캘버턴에서 열리는 올해 콘퍼런스에 발표자로 모시고자 합니다.\n\n작년 봄 『빌트 인바이런먼트 리뷰』에 박사님의 논문이 실린 이후로 저희는 저비용 리모델링에 관한 연구를 눈여겨봐 왔습니다. 올해 참가자는 대부분 지방자치단체 도시계획 담당자들로, 노후 주택 단열에 관한 박사님의 연구 결과가 이들의 관심사에 바로 맞닿아 있습니다. 여러 참가자가 지난해 설문에서 바로 이 주제를 요청했습니다.\n\n저희가 생각하는 세션은 질의응답을 포함해 50분입니다. 사흘 중 어느 날이든 배정할 수 있으니 편하신 날을 알려 주십시오.\n\n조직위원회는 초청 발표자 전원의 교통비와 2박 숙박비를 부담합니다. 참석해 주실 수 있다면 전체 일정표와 약력·사진을 기재하실 간단한 양식을 보내 드리겠습니다.\n\n수락해 주시기를 진심으로 바랍니다.\n\n프로그램 위원장 해리엇 응 드림",
   gloss:[{w:"on behalf of",ko:"~를 대표하여"},{w:"retrofitting",ko:"(기존 건물의) 개보수"},{w:"delegate",ko:"참가자, 대표"},
          {w:"housing stock",ko:"주택 재고, 기존 주택"},{w:"accommodation",ko:"숙박"}],
   qs:[
     {no:1, cat:"접속사", opts:["since","during","while","by the time"], ans:0,
      exp:"'논문이 실린 이후로 지금까지 지켜봐 왔다'는 계속의 의미. have followed(현재완료)와 짝을 이루는 접속사는 since. during은 전치사라 절을 이끌 수 없다."},
     {no:2, cat:"문장 삽입", opts:[
        "Several delegates requested this very topic in last year's survey.",
        "Registration closes at the end of this week.",
        "The venue is a short walk from the station.",
        "We are unable to cover travel expenses this year."], ans:0,
      exp:"앞 문장이 '참가자들의 관심사와 맞닿아 있다'이므로, 그 근거를 대는 (A)가 이어진다. (D)는 마지막 문단의 '교통비를 부담한다'와 정면으로 모순된다."},
     {no:3, cat:"전치사", opts:["including","besides","except","regarding"], ans:0,
      exp:"'질의응답을 포함해 50분'이라는 뜻이므로 including. except면 50분에 질의응답이 빠진다는 정반대 의미가 된다."},
     {no:4, cat:"접속사", opts:["If","Unless","Whether","Even though"], ans:0,
      exp:"'참석할 수 있다면 일정표를 보내겠다'는 조건. Unless(~하지 않는다면)를 넣으면 거절한 사람에게 일정표를 보내는 셈이 된다."}
   ]}

];
