
export interface Education {
  id: string;
  school: string;
  major: string;
  period: string;
}

export interface Career {
  id: string;
  company: string;
  department: string;
  period: string;
  role: string;
  projects?: string[];
}

export interface Project {
  id: string;
  category: 'Hotel' | 'Commercial' | 'Medical' | 'Logistics' | 'Education' | 'Global' | 'Convention';
  title: string;
  period: string;
  description: string;
  imageUrl: string;
  subImages: string[];
  details: string[];
  company: '롯데건설' | '은민에스엔디';
}

export interface Certification {
  id: string;
  name: string;
  status?: string;
}

export interface KICAStatus {
  category: string;
  grade: string;
}

export interface PortfolioData {
  name: string;
  engName: string;
  birth: string;
  phone: string;
  email: string;
  expertiseInterior: string;
  expertiseConstruction: string;
  heroLine1: string;
  heroLine2: string;
  subHeroText: string;
  education: Education[];
  career: Career[];
  projects: Project[];
  certifications: Certification[];
  kica: KICAStatus[];
}
