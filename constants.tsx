
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  name: "황진관",
  engName: "Hwang Jin Gwan",
  birth: "1992.02.14",
  phone: "010-4404-6007",
  email: "aeis2003@naver.com",
  expertiseInterior: "인테리어 : 은민에스엔디",
  expertiseConstruction: "종합건설 : 롯데건설 (국내/국외)",
  heroLine1: "공간의 가치를 결과로 증명하는",
  heroLine2: "건축/인테리어 기술 전문가",
  subHeroText: "백화점, 호텔, 병원, 글로벌 복합개발, 자동화 물류센터까지 프로젝트 전반을 총괄하는 건축·인테리어 전문 엔지니어입니다.",
  education: [
    { id: 'edu1', school: "김해건설공업고등학교 (건축과)", major: "건축과", period: "2010.02 졸업" },
    { id: 'edu2', school: "동명대학교 (실내건축학과)", major: "실내건축학", period: "2017.02 졸업" }
  ],
  career: [
    { 
      id: 'car1', 
      company: "은민에스엔디㈜", 
      department: "기술시공본부", 
      period: "2016.09 ~ 2022.05", 
      role: "현장소장",
      projects: ["부산 해운대 신라스테이 호텔", "부산 용호만 W스퀘어 쇼핑몰", "세종 레이캐슬 클럽하우스", "시흥 서울대학교 스마트캠퍼스", "부산 명지 신라스테이 호텔", "마포 풍농 엠갤러리 호텔"]
    },
    { 
      id: 'car2', 
      company: "롯데건설㈜", 
      department: "건축공사팀 (해외/국내)", 
      period: "2022.06 ~ 현재", 
      role: "건축/인테리어 공사 담당 (과장)",
      projects: ["베트남 하노이 롯데쇼핑몰", "하남 보바스 병원 신축공사", "고양 오카도 자동화 물류센터", "전주 컨벤션센터 신축공사 (착수 전 계획 수립 중)"]
    }
  ],
  projects: [
    {
      id: 'p_jeonju',
      company: '롯데건설',
      category: 'Convention',
      title: "전주 컨벤션센터 신축공사 (착수 전 계획 수립 중)",
      period: "2025.04 - 현재",
      description: "대규모 컨벤션 센터의 성공적 착공을 위한 도면 및 공정 실행 계획 수립 중",
      imageUrl: "https://images.unsplash.com/photo-1541888941257-18206730bc19?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/j1/800/600", "https://picsum.photos/seed/j2/800/600", "https://picsum.photos/seed/j3/800/600", "https://picsum.photos/seed/j4/800/600"],
      details: ["공사 전 실행 계획 수립", "설계 도면 검토 및 기술 검토", "업체 선정 및 공정 최적화"]
    },
    {
      id: 'p3',
      company: '롯데건설',
      category: 'Logistics',
      title: "고양 오카도 자동화 물류센터",
      period: "2025.03 - 진행 중",
      description: "영국 오카도의 첨단 자동화 시스템이 도입되는 국내 최초 프로젝트",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/o1/800/600", "https://picsum.photos/seed/o2/800/600", "https://picsum.photos/seed/o3/800/600", "https://picsum.photos/seed/o4/800/600"],
      details: ["오카도 영국 본사와의 기술 협의 및 일정 조율 주도", "토공~PC 공정까지 단계별 통합 관리", "자동화 설비와 건축 구조의 인터페이스 관리"]
    },
    {
      id: 'p2',
      company: '롯데건설',
      category: 'Medical',
      title: "하남 보바스 병원 신축공사",
      period: "2024.02 - 2025.03",
      description: "의료시설 특성에 맞는 엄격한 안전·품질 기준 관리",
      imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/b1/800/600", "https://picsum.photos/seed/b2/800/600", "https://picsum.photos/seed/b3/800/600", "https://picsum.photos/seed/b4/800/600"],
      details: ["병원 특수 장비를 반영한 건축·인테리어 공사", "설계 협의부터 운영 인계까지 전 단계 수행", "의료 환경 최적화 시공 관리"]
    },
    {
      id: 'p1',
      company: '롯데건설',
      category: 'Global',
      title: "베트남 하노이 롯데쇼핑몰 / 서비스 레지던스 / L7 호텔",
      period: "2022.06 - 2023.10",
      description: "해외 현장에 한국 건설 기준을 적용하며 글로벌 프로젝트 수행 역량 확보",
      imageUrl: "https://images.unsplash.com/photo-1541976535033-44737bb687ae?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/v1/800/600", "https://picsum.photos/seed/v2/800/600", "https://picsum.photos/seed/v3/800/600", "https://picsum.photos/seed/v4/800/600"],
      details: ["설계 협의, 공정 관리, 정산까지 전 과정 참여", "베트남 로컬 직원 및 협력사 관리", "자재 조달 및 안전 관리 수행"]
    },
    {
      id: 'p4',
      company: '은민에스엔디',
      category: 'Hotel',
      title: "마포 풍농 엠갤러리 호텔 (5성급)",
      period: "2021.06 - 2022.05",
      description: "글로벌 고급 자재 적용 및 엄격한 프리미엄 품질 기준 관리",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/m1/800/600", "https://picsum.photos/seed/m2/800/600", "https://picsum.photos/seed/m3/800/600", "https://picsum.photos/seed/m4/800/600"],
      details: ["5성급 호텔 인테리어 공사 총괄", "글로벌 디자인 스탠다드 준수 및 품질 관리", "공정·공무·정산 전 범위 책임 수행"]
    },
    {
      id: 'p_myeongji',
      company: '은민에스엔디',
      category: 'Hotel',
      title: "부산 명지 신라스테이 호텔",
      period: "2020.04 - 2021.05",
      description: "인테리어 및 FF&E까지 전 범위 총괄 및 브랜드 아이덴티티 시공",
      imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/my1/800/600", "https://picsum.photos/seed/my2/800/600", "https://picsum.photos/seed/my3/800/600", "https://picsum.photos/seed/my4/800/600"],
      details: ["신라스테이 브랜드 아이덴티티를 반영한 신규 인테리어 콘셉트 시공", "공정·비용·안전을 동시에 관리하며 브랜드 호텔 완성도 극대화", "FF&E 기획 및 설치 총괄 관리"]
    },
    {
      id: 'p6',
      company: '은민에스엔디',
      category: 'Education',
      title: "시흥 서울대학교 스마트캠퍼스",
      period: "2019.10 - 2020.04",
      description: "교육·연구시설의 기능성 확보를 위한 특화 시공",
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/s1/800/600", "https://picsum.photos/seed/s2/800/600", "https://picsum.photos/seed/s3/800/600", "https://picsum.photos/seed/s4/800/600"],
      details: ["연구실/사무공간 방음 및 특화 설비 반영", "기능 중심의 공간 설계 역량 강화", "무사고·무하자 공정 완수"]
    },
    {
      id: 'p_raycastle',
      company: '은민에스엔디',
      category: 'Commercial',
      title: "세종 레이캐슬 클럽하우스",
      period: "2019.01 - 2019.10",
      description: "고급 클럽하우스 인테리어 총괄 및 품질 관리",
      imageUrl: "https://images.unsplash.com/photo-1540339832862-47459980783f?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/r1/800/600", "https://picsum.photos/seed/r2/800/600", "https://picsum.photos/seed/r3/800/600", "https://picsum.photos/seed/r4/800/600"],
      details: ["고급 클럽하우스 인테리어 총괄 디자인 변경 협의", "실행예산·정산 관리 수행", "공정 지연 및 사고 없이 프로젝트 완수하며 고급 시설 품질 관리 경험 축적"]
    },
    {
      id: 'p5',
      company: '은민에스엔디',
      category: 'Commercial',
      title: "부산 용호만 W스퀘어 쇼핑몰",
      period: "2017.05 - 2018.12",
      description: "고객 동선과 매장 가시성을 고려한 대형 상업시설 시공",
      imageUrl: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/w1/800/600", "https://picsum.photos/seed/w2/800/600", "https://picsum.photos/seed/w3/800/600", "https://picsum.photos/seed/w4/800/600"],
      details: ["상업시설 인테리어 총괄 담당", "설계 변경 및 민원 대응, 공정 관리 직접 수행", "공간 활용도 극대화를 위한 설계 협의 주도"]
    },
    {
      id: 'p_haeundae',
      company: '은민에스엔디',
      category: 'Hotel',
      title: "부산 해운대 신라스테이 호텔",
      period: "2016.09 - 2017.03",
      description: "숙박시설 특성화 공정·안전·품질 관리 총괄",
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff43c638f614?auto=format&fit=crop&q=80&w=1600",
      subImages: ["https://picsum.photos/seed/h1/800/600", "https://picsum.photos/seed/h2/800/600", "https://picsum.photos/seed/h3/800/600", "https://picsum.photos/seed/h4/800/600"],
      details: ["호텔 인테리어 공사 총괄로서 공정·안전·품질 관리 수행", "숙박시설 특성상 요구되는 높은 안전 기준과 마감 품질을 충족", "운영 환경을 고려한 시공 계획으로 무사고·무하자 준공 달성"]
    }
  ],
  certifications: [
    { id: 'c1', name: "건축시공기술사", status: "취득 예정" },
    { id: 'c2', name: "건축기사" },
    { id: 'c3', name: "건설안전기사" },
    { id: 'c4', name: "실내건축기사" },
    { id: 'c5', name: "전산응용건축제도기능사" },
    { id: 'c6', name: "건축도장기능사" }
  ],
  kica: [
    { category: "건축", grade: "고급" },
    { category: "품질", grade: "고급" },
    { category: "안전", grade: "초급" }
  ]
};
