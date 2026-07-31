// 시험별 정보 (문제수 · 시간 · 과목 · 유형 · 점수)
window.EXAM_INFO = [
 {
  "id": "toefl",
  "name": "TOEFL iBT",
  "full": "Test of English as a Foreign Language (Internet-Based Test)",
  "icon": "🎓",
  "color": "#7c3aed",
  "purpose": "영미권 대학·대학원 유학 지원",
  "total": "약 2시간 (2023년 7월 개편 이후)",
  "score": "0–120점 (영역별 0–30점)",
  "validity": "2년",
  "format": "컴퓨터 기반 (센터 응시 또는 Home Edition)",
  "sections": [
   {
    "name": "Reading",
    "q": "20문항",
    "time": "35분",
    "detail": "지문 2개 × 각 10문항"
   },
   {
    "name": "Listening",
    "q": "28문항",
    "time": "36분",
    "detail": "강의 3개(각 6문항) + 대화 2개(각 5문항)"
   },
   {
    "name": "Speaking",
    "q": "4문항",
    "time": "16분",
    "detail": "독립형 1 + 통합형 3"
   },
   {
    "name": "Writing",
    "q": "2문항",
    "time": "29분",
    "detail": "통합형 1 (20분) + 토론형 1 (10분)"
   }
  ],
  "types": [
   "Reading — 어휘, 사실 확인, 추론, 문장 삽입, 요약표 완성",
   "Listening — 주제·목적, 세부사항, 태도, 구조, 추론",
   "Speaking — Task1 독립형(선호·의견) / Task2 캠퍼스 상황 / Task3 학술 개념 / Task4 강의 요약",
   "Writing — Task1 읽고 듣고 요약(통합형) / Task2 학술 토론 게시판 답글(10분·100단어 이상)"
  ],
  "tips": [
   "2023년 개편으로 Independent Writing이 사라지고 Academic Discussion(10분)으로 대체됨",
   "더미(채점 안 되는) 문항이 사라져 시험 시간이 3시간 → 2시간으로 단축",
   "Speaking은 준비 15–30초, 답변 45–60초로 매우 짧아 템플릿 암기가 필수"
  ]
 },
 {
  "id": "det",
  "name": "Duolingo English Test",
  "full": "듀오링고 영어 테스트 (DET)",
  "icon": "🦉",
  "color": "#16a34a",
  "purpose": "유학 지원 (5,700개 이상 기관 인정) · 저렴하고 빠른 대안",
  "total": "약 1시간 (적응형)",
  "score": "10–160점 (5점 단위) · 하위 점수 4종",
  "validity": "2년",
  "format": "온라인 응시 (집에서 24시간 가능) · 결과 48시간 내",
  "sections": [
   {
    "name": "Introduction",
    "q": "—",
    "time": "약 5분",
    "detail": "신분 확인, 규칙 안내"
   },
   {
    "name": "Adaptive Test",
    "q": "약 40–45문항",
    "time": "약 45분",
    "detail": "난이도가 실력에 맞춰 실시간 조정"
   },
   {
    "name": "Writing/Speaking Sample",
    "q": "2–3문항",
    "time": "약 10분",
    "detail": "학교에 함께 전송되는 영상·작문 샘플"
   }
  ],
  "types": [
   "Read and Complete — 지문의 빈칸 글자 채우기 (c-test)",
   "Read and Select — 실제 영단어 vs 존재하지 않는 단어 고르기",
   "Listen and Type — 문장을 듣고 그대로 받아쓰기",
   "Read Aloud — 화면의 문장을 소리 내어 읽기",
   "Write About the Photo — 사진을 1문장 이상으로 묘사 (1분)",
   "Speak About the Photo — 사진을 90초간 말로 묘사",
   "Read, Then Write — 지문을 읽고 50단어 이상 작문 (5분)",
   "Read/Listen, Then Speak — 읽거나 들은 뒤 90초 말하기",
   "Interactive Reading — 빈칸 완성·정보 찾기·주제 파악·제목 붙이기",
   "Interactive Listening — 대화에 응답한 뒤 대화 내용 요약",
   "Summarize the Conversation — 들은 대화를 요약해 말하기"
  ],
  "tips": [
   "적응형이라 맞힐수록 어려운 문제가 나옴 — 초반 문항이 점수에 큰 영향",
   "하위 점수 4종(Literacy·Comprehension·Conversation·Production)이 함께 제공됨",
   "부정행위 방지가 엄격 — 시선 이탈, 소리, 화면 이탈 시 무효 처리될 수 있음",
   "TOEFL 대비 저렴하고 빠르지만 인정 기관을 반드시 사전 확인해야 함"
  ]
 },
 {
  "id": "toeic",
  "name": "TOEIC",
  "full": "Test of English for International Communication (Listening & Reading)",
  "icon": "💼",
  "color": "#0ea5e9",
  "purpose": "국내 취업·승진·졸업 요건에서 가장 널리 쓰임",
  "total": "2시간 (LC 45분 + RC 75분)",
  "score": "10–990점 (LC 5–495 + RC 5–495)",
  "validity": "2년",
  "format": "지필 (OMR 마킹) · 매월 복수 회차",
  "sections": [
   {
    "name": "Part 1 사진 묘사",
    "q": "6문항",
    "time": "LC 45분",
    "detail": "사진을 보고 알맞은 설명 고르기"
   },
   {
    "name": "Part 2 질의응답",
    "q": "25문항",
    "time": "LC 45분",
    "detail": "질문을 듣고 알맞은 응답 고르기 (3지선다)"
   },
   {
    "name": "Part 3 짧은 대화",
    "q": "39문항",
    "time": "LC 45분",
    "detail": "대화 13개 × 각 3문항"
   },
   {
    "name": "Part 4 짧은 담화",
    "q": "30문항",
    "time": "LC 45분",
    "detail": "안내·공지 10개 × 각 3문항"
   },
   {
    "name": "Part 5 단문 빈칸",
    "q": "30문항",
    "time": "RC 75분",
    "detail": "문법·어휘 빈칸 채우기"
   },
   {
    "name": "Part 6 장문 빈칸",
    "q": "16문항",
    "time": "RC 75분",
    "detail": "지문 4개 × 각 4문항 (문장 삽입 포함)"
   },
   {
    "name": "Part 7 독해",
    "q": "54문항",
    "time": "RC 75분",
    "detail": "단일 29 + 이중 10 + 삼중 15문항"
   }
  ],
  "types": [
   "Part 5 — 품사 자리, 동사 형태(수일치·시제·태), 준동사, 관계사, 접속사 vs 전치사, 어휘",
   "Part 6 — 빈칸 4개 중 1개는 반드시 '문장 삽입' 유형",
   "Part 7 — 주제·목적, 세부사항, 추론, 동의어, 문장 위치 찾기, 의도 파악(채팅문)"
  ],
  "tips": [
   "총 200문항 · 2시간으로 시간 압박이 큼 — Part 7에 최소 55분 확보가 관건",
   "Part 5는 문항당 20초 이내로 끊고 넘어가야 Part 7 시간이 남음",
   "LC는 문제를 미리 읽는 선독(先讀)이 점수를 크게 좌우"
  ]
 },
 {
  "id": "toeicsp",
  "name": "TOEIC Speaking",
  "full": "TOEIC Speaking Test",
  "icon": "🎤",
  "color": "#f59e0b",
  "purpose": "국내 기업 채용·승진에서 회화 능력 증빙",
  "total": "약 20분",
  "score": "0–200점 (레벨 1–8)",
  "validity": "2년",
  "format": "컴퓨터 기반 (헤드셋 녹음)",
  "sections": [
   {
    "name": "Q1–2 지문 읽기",
    "q": "2문항",
    "time": "준비 45초 · 답변 45초",
    "detail": "광고·안내문을 소리 내어 읽기"
   },
   {
    "name": "Q3–4 사진 묘사",
    "q": "2문항",
    "time": "준비 45초 · 답변 30초",
    "detail": "사진을 보고 묘사"
   },
   {
    "name": "Q5–7 듣고 질문에 답하기",
    "q": "3문항",
    "time": "준비 3초 · 답변 15/15/30초",
    "detail": "전화 설문 형식의 즉답"
   },
   {
    "name": "Q8–10 표 보고 답하기",
    "q": "3문항",
    "time": "준비 45초 · 답변 15/15/30초",
    "detail": "일정표·이력서를 보고 정보 전달"
   },
   {
    "name": "Q11 의견 제시",
    "q": "1문항",
    "time": "준비 45초 · 답변 60초",
    "detail": "찬반 의견과 근거 말하기"
   }
  ],
  "types": [
   "발음·억양·강세 (Q1–2 중심)",
   "문법·어휘·일관성 (Q3–10)",
   "내용 관련성·완성도 (Q11)"
  ],
  "tips": [
   "Q5–7은 준비 시간이 3초뿐이라 즉답 템플릿 암기가 필수",
   "Q11은 60초를 다 채워야 하며 이유 2개 + 예시 구조가 안전",
   "레벨 6(160점) 이상이 대기업 지원의 실질적 기준선"
  ]
 },
 {
  "id": "opic",
  "name": "OPIc",
  "full": "Oral Proficiency Interview – computer",
  "icon": "🗣",
  "color": "#4f46e5",
  "purpose": "국내 기업 채용·승진 (삼성·현대 등에서 널리 채택)",
  "total": "약 40분 (오리엔테이션 20분 + 시험 40분)",
  "score": "NL–AL 등급제 (NL·NM·NH·IL·IM1~3·IH·AL)",
  "validity": "2년",
  "format": "컴퓨터 기반 · 가상 면접관(Ava)과 1:1 인터뷰 형식",
  "sections": [
   {
    "name": "자기소개",
    "q": "1문항",
    "time": "—",
    "detail": "첫 질문으로 거의 고정 출제"
   },
   {
    "name": "설문 기반 문항",
    "q": "약 8–10문항",
    "time": "—",
    "detail": "응시 전 선택한 관심사에서 출제"
   },
   {
    "name": "롤플레이",
    "q": "2–3문항",
    "time": "—",
    "detail": "정보 요청 + 문제 상황 해결"
   },
   {
    "name": "돌발 질문",
    "q": "2–3문항",
    "time": "—",
    "detail": "설문에서 고르지 않은 주제 (날씨·교통·은행 등)"
   }
  ],
  "types": [
   "묘사 — 장소·사람·사물을 자세히 설명",
   "경험 — 과거의 구체적 사건을 시간순으로 서술",
   "비교·변화 — 과거와 현재를 비교하거나 변화를 설명",
   "롤플레이 — 상황 속 질문하기 / 문제 해결 제안하기",
   "돌발 — 준비하지 않은 주제에 즉흥 대응"
  ],
  "tips": [
   "난이도는 응시자가 직접 선택(1–6단계) — IH·AL 목표면 5–6단계 필수",
   "설문에서 답변하기 쉬운 주제(영화·음악·공원)를 전략적으로 선택",
   "질문을 못 들었을 때 다시 듣기는 1회만 가능",
   "완벽한 문법보다 '자연스럽게 길게 말하기'가 등급을 좌우"
  ]
 },
 {
  "id": "teps",
  "name": "TEPS",
  "full": "Test of English Proficiency developed by Seoul National University",
  "icon": "📕",
  "color": "#dc2626",
  "purpose": "국내 대학원·공무원·전문직 시험 (서울대 주관)",
  "total": "약 105분",
  "score": "0–600점 (뉴텝스 기준)",
  "validity": "2년",
  "format": "지필 (OMR) · 문항당 시간 압박이 매우 큼",
  "sections": [
   {
    "name": "Listening 청해",
    "q": "40문항",
    "time": "약 40분",
    "detail": "Part 1 대화 10 · Part 2 대화 10 · Part 3 긴 대화 10 · Part 4–5 담화 10"
   },
   {
    "name": "Vocabulary 어휘",
    "q": "30문항",
    "time": "약 15분",
    "detail": "Part 1 대화 속 어휘 10 · Part 2 문장 속 어휘 20"
   },
   {
    "name": "Grammar 문법",
    "q": "30문항",
    "time": "약 15분",
    "detail": "Part 1–2 빈칸 20 · Part 3–4 오류 찾기 10"
   },
   {
    "name": "Reading 독해",
    "q": "35문항",
    "time": "약 40분",
    "detail": "Part 1 빈칸 10 · Part 2 흐름상 무관한 문장 2 · Part 3 내용 이해 13 · Part 4–5 복합 10"
   }
  ],
  "types": [
   "Listening — 대화·담화를 단 1회만 들려줌 (재생 없음)",
   "Vocabulary — 구어체 표현과 콜로케이션 비중이 높음",
   "Grammar — 문어체 정확성 + 어색한 문장 찾기(오류 인식)",
   "Reading — 빈칸 추론, 무관한 문장 삭제, 대의 파악"
  ],
  "tips": [
   "청해 지문이 화면·문제지에 나오지 않아 순간 집중력이 결정적",
   "어휘·문법 60문항을 30분에 풀어야 해 문항당 30초가 한계",
   "감점제가 없으므로 모르는 문항도 반드시 마킹",
   "TEPS-Speaking·Writing은 별도 시험으로 분리 시행"
  ]
 }
];
