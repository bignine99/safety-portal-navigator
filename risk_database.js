/*
  안전관제 BIM Navigator - 위험정보 데이터베이스
  
  [중요]
  이 파일은 safety_search_portal.html과 
  모든 A/B/D-XX... .html 파일들과 "같은 폴더"에 있어야 합니다.

  [위험 등급 기준: 점수가 높을수록 위험함]
  80 - 100 : 매우위험 (빨강)
  60 - 80 : 위험 (주황)
  40 - 60 : 주의 (노랑)
  20 - 40 : 경고 (녹색)
  0 - 20 : 안전 (파랑)
*/

const RISK_DB = [
  { 
    title: "A-01. 덤프트럭", 
    score: 85, // (매우위험)
    file_card: "A-01. 덤프트럭 안전카드.html", 
    file_checklist: "A-01. 덤프트럭 체크리스트.html", 
    keywords: ["덤프", "트럭", "dump truck", "충돌", "전도", "사각지대", "끼임"] 
  },
  { 
    title: "A-02. 지게차", 
    score: 72, // (위험)
    file_card: "A-02. 지게차 안전카드.html", 
    file_checklist: "A-02. 지게차 체크리스트.html", 
    keywords: ["지게차", "forklift", "충돌", "전도", "포크", "깔림", "낙하"] 
  },
  { 
    title: "A-03. 크레인 (타워크레인)", 
    score: 89, // (매우위험)
    file_card: "A-03. 크레인 안전카드.html", 
    file_checklist: "A-03. 크레인 체크리스트.html", 
    keywords: ["크레인", "crane", "타워크레인", "전도", "낙하", "T/C", "붕괴", "줄걸이"] 
  },
  { 
    title: "A-04. 이동식크레인", 
    score: 66, // (위험)
    file_card: "A-04. 이동식크레인 안전카드.html", 
    file_checklist: "A-04. 이동식크레인 체크리스트.html", 
    keywords: ["이동식", "크레인", "카고크레인", "전도", "아웃트리거", "감전"] 
  },
  { 
    title: "A-05. 호이스트 (리프트)", 
    score: 57, // (주의)
    file_card: "A-05. 호이스트 안전카드.html", 
    file_checklist: "A-05. 호이스트 체크리스트.html", 
    keywords: ["호이스트", "리프트", "추락", "붕괴", "hoist", "낙하", "끼임"] 
  },
  { 
    title: "A-06. 굴삭기", 
    score: 67, // (위험)
    file_card: "A-06. 굴삭기 안전카드.html", 
    file_checklist: "A-06. 굴삭기 체크리스트.html", 
    keywords: ["굴삭기", "포크레인", "excavator", "충돌", "맞음", "전도", "깔림", "낙하", "감전"] 
  },
  { 
    title: "A-07. 로더", 
    score: 43, // (주의)
    file_card: "A-07. 로더 안전카드.html", 
    file_checklist: "A-07. 로더 체크리스트.html", 
    keywords: ["로더", "loader", "충돌", "맞음", "낙하", "전도", "추락"] 
  },
  { 
    title: "A-08. 콘크리트펌프카", 
    score: 33, // (경고)
    file_card: "A-08. 콘크리트펌프카 안전카드.html", 
    file_checklist: "A-08. 콘크리트펌프카 체크리스트.html", 
    keywords: ["콘크리트펌프카", "펌프카", "CPB", "감전", "맞음", "전도", "충돌"] 
  },
  { 
    title: "A-09. 레미콘", 
    score: 39, // (경고)
    file_card: "A-09. 레미콘 안전카드.html", 
    file_checklist: "A-09. 레미콘 체크리스트.html", 
    keywords: ["레미콘", "믹서트럭", "RMC", "충돌", "깔림", "전도", "끼임"] 
  },
  { 
    title: "A-10. 고소작업대", 
    score: 72, // (위험)
    file_card: "A-10. 고소작업대 안전카드.html", 
    file_checklist: "A-10. 고소작업대 체크리스트.html", 
    keywords: ["고소작업대", "MEWP", "추락", "전도", "깔림", "감전", "끼임"] 
  },
  { 
    title: "B-11. 외부(쌍줄)비계", 
    score: 77, // (위험)
    file_card: "B-11. 외부(쌍줄)비계 안전카드.html", 
    file_checklist: "B-11. 외부(쌍줄)비계 체크리스트.html", 
    keywords: ["외부비계", "쌍줄비계", "비계", "추락", "붕괴", "낙하", "scaffolding"] 
  },
  { 
    title: "B-12. 내부비계 (써포트)", 
    score: 56, // (주의)
    file_card: "B-12. 내부(써포트)비계 안전카드.html", 
    file_checklist: "B-12. 내부비계(써포트) 체크리스트.html", 
    keywords: ["내부비계", "써포트", "서포트", "동바리", "붕괴", "깔림", "좌굴"] 
  },
  { 
    title: "B-13. 안전계단", 
    score: 81, // (매우위험)
    file_card: "B-13. 안전계단 안전카드.html", 
    file_checklist: "B-13. 안전계단 체크리스트.html", 
    keywords: ["안전계단", "가설계단", "계단", "추락", "전도", "넘어짐", "실족"] 
  },
  { 
    title: "B-14. 안전난간", 
    score: 88, // (매우위험)
    file_card: "B-14. 안전난간 안전카드.html", 
    file_checklist: "B-14. 안전난간 체크리스트.html", 
    keywords: ["안전난간", "난간", "추락", "개구부", "단부", "railing"] 
  },
  { 
    title: "B-15. 가설통로", 
    score: 60, // (위험)
    file_card: "B-15. 가설통로 안전카드.html", 
    file_checklist: "B-15. 가설통로 체크리스트.html", 
    keywords: ["가설통로", "통로", "발판", "추락", "전도", "넘어짐", "walkway"] 
  },
  { 
    title: "B-16. 낙하물방지망", 
    score: 77, // (위험)
    file_card: "B-16. 낙하물방지망 안전카드.html", 
    file_checklist: "B-16. 낙하물방지망 체크리스트.html", 
    keywords: ["낙하물방지망", "낙방망", "방망", "낙하", "맞음", "붕괴"] 
  },
  { 
    title: "B-17. 추락방지망", 
    score: 93, // (매우위험)
    file_card: "B-17. 추락방지망 안전카드.html", 
    file_checklist: "B-17. 추락방지망 체크리스트.html", 
    keywords: ["추락방지망", "추방망", "안전망", "추락", "틈새", "파단"] 
  },
  { 
    title: "B-18. 말비계", 
    score: 72, // (위험)
    file_card: "B-18. 말비계 안전카드.html", 
    file_checklist: "B-18. 말비계 체크리스트.html", 
    keywords: ["말비계", "우마", "추락", "전도", "붕괴"] 
  },
  { 
    title: "B-19. 달비계", 
    score: 45, // (주의)
    file_card: "B-19. 달비계 안전카드.html", 
    file_checklist: "B-19. 달비계 체크리스트.html", 
    keywords: ["달비계", "곤돌라", "로프", "추락", "파단", "낙하"] 
  },
  { 
    title: "B-20. 현장출입구", 
    score: 16, // (안전)
    file_card: "B-20. 현장출입구 안전카드.html", 
    file_checklist: "B-20. 현장출입구 체크리스트.html", 
    keywords: ["출입구", "게이트", "E/G", "충돌", "전도", "낙하"] 
  },
  { 
    title: "B-21. 임시 자재 적재", 
    score: 45, // (주의)
    file_card: "B-21. 임시 자재 적재 안전카드.html", 
    file_checklist: "B-21. 임시 자재 적재 체크리스트.html", 
    keywords: ["자재", "적재", "붕괴", "낙하", "storage", "야적"] 
  },
  { 
    title: "B-22. 가설팬스", 
    score: 19, // (안전)
    file_card: "B-22. 가설팬스 안전카드.html", 
    file_checklist: "B-22. 가설팬스 체크리스트.html", 
    keywords: ["가설", "펜스", "팬스", "EGI", "전도", "붕괴", "fence"] 
  },
  { 
    title: "B-23. 위험물저장소", 
    score: 52, // (주의)
    file_card: "B-23. 위험물저장소 안전카드.html", 
    file_checklist: "B-23. 위험물저장소 체크리스트.html", 
    keywords: ["위험물", "저장소", "화재", "폭발", "질식", "hazardous", "유류"] 
  },
  { 
    title: "D-31. 거푸집설치", 
    score: 66, // (위험)
    file_card: "D-31. 거푸집설치 안전카드.html", 
    file_checklist: "D-31. 거푸집설치 체크리스트.html", 
    keywords: ["거푸집", "설치", "formwork", "붕괴", "깔림", "추락", "낙하"] 
  },
  { 
    title: "D-32. 철근설치", 
    score: 69, // (위험)
    file_card: "D-32. 철근설치 안전카드.html", 
    file_checklist: "D-32. 철근설치 체크리스트.html", 
    keywords: ["철근", "설치", "rebar", "찔림", "맞음", "추락", "붕괴"] 
  },
  { 
    title: "D-33. 콘크리트타설", 
    score: 73, // (위험)
    file_card: "D-33. 콘크리트타설 안전카드.html", 
    file_checklist: "D-33. 콘크리트타설 체크리스트.html", 
    keywords: ["콘크리트", "타설", "붕괴", "깔림", "맞음", "추락", "감전", "pouring"] 
  },
  { 
    title: "D-34. 콘크리트양생", 
    score: 33, // (경고)
    file_card: "D-34. 콘크리트양생 안전카드.html", 
    file_checklist: "D-34. 콘크리트양생 체크리스트.html", 
    keywords: ["콘크리트", "양생", "질식", "중독", "화재", "붕괴", "curing", "갈탄"] 
  },
  { 
    title: "D-35. 동바리설치", 
    score: 59, // (주의)
    file_card: "D-35. 동바리설치 안전카드.html", 
    file_checklist: "D-35. 동바리설치 체크리스트.html", 
    keywords: ["동바리", "설치", "서포트", "shoring", "붕괴", "깔림", "추락", "낙하"] 
  },
  { 
    title: "D-36. 거푸집해체", 
    score: 71, // (위험)
    file_card: "D-36. 거푸집해체 안전카드.html", 
    file_checklist: "D-36. 거푸집해체 체크리스트.html", 
    keywords: ["거푸집", "해체", "formwork", "stripping", "낙하", "맞음", "추락", "붕괴"] 
  },
  { 
    title: "D-36-2. 동바리해체", // D-36 파일 중복으로 -2 추가
    score: 66, // (위험)
    file_card: "D-36. 동바리해체 안전카드.html", 
    file_checklist: "D-36. 동바리해체 체크리스트.html", 
    keywords: ["동바리", "해체", "서포트", "stripping", "붕괴", "낙하", "추락"] 
  },
  { 
    title: "D-37. 갱폼 체결해제 및 인양", 
    score: 55, // (주의)
    file_card: "D-37. 갱폼 체결해제 및 인양 안전카드.html", 
    file_checklist: "D-37. 갱폼 체결해제 및 인양 체크리스트.html", 
    keywords: ["갱폼", "인양", "해체", "gang form", "추락", "붕괴", "낙하"] 
  },
  { 
    title: "D-38. 갱폼 설치 및 고정", 
    score: 67, // (위험)
    file_card: "D-38. 갱폼 설치 및 고정 안전카드.html", 
    file_checklist: "D-38. 갱폼 설치 및 고정 체크리스트.html", 
    keywords: ["갱폼", "설치", "고정", "gang form", "추락", "붕괴", "낙하"] 
  },
  { 
    title: "D-39. 설비 및 전기 배관", 
    score: 19, // (안전)
    file_card: "D-39. 설비 및 전기 배관 안전카드.html", 
    file_checklist: "D-39. 설비 및 전기 배관 체크리스트.html", 
    keywords: ["설비", "전기", "배관", "mep", "감전", "화재", "질식"] 
  }
];

/**
 * [수정됨] 위험 점수에 따라 위험 등급 객체(레벨, 색상 클래스)를 반환합니다.
 * @param {number} score - 위험 점수 (0-100)
 * @returns {{level: string, colorClass: string, bgClass: string, borderClass: string}}
 */
function getRiskInfo(score) {
  if (score >= 80) {
    return { level: '매우위험', colorClass: 'text-red-600', bgClass: 'bg-red-600', borderClass: 'border-red-600' };
  } else if (score >= 60) {
    return { level: '위험', colorClass: 'text-orange-500', bgClass: 'bg-orange-500', borderClass: 'border-orange-500' };
  } else if (score >= 40) {
    return { level: '주의', colorClass: 'text-yellow-500', bgClass: 'bg-yellow-500', borderClass: 'border-yellow-500' };
  } else if (score >= 20) {
    return { level: '경고', colorClass: 'text-green-500', bgClass: 'bg-green-500', borderClass: 'border-green-500' };
  } else {
    return { level: '안전', colorClass: 'text-blue-600', bgClass: 'bg-blue-600', borderClass: 'border-blue-600' };
  }
}