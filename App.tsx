
import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_DATA } from './constants';
import { PortfolioData, Project } from './types';
import { 
  Briefcase, GraduationCap, Award, 
  ChevronDown, Settings, LogOut, CheckCircle, Globe, Building2, Layers, Users, Mail, Phone, MapPin, 
  Camera, Plus, Trash2, Edit2, Image as ImageIcon
} from 'lucide-react';

const STORAGE_KEY = 'portfolio_data_v9';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<'HOME' | 'PROFILE' | 'CAREER' | 'CAPABILITY' | 'PROJECTS' | 'CONTACT'>('HOME');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(prev => ({
          ...prev,
          ...parsed
        }));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const persistData = (newData: PortfolioData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Storage failed", e);
      alert("저장 공간이 부족합니다. 이미지 용량을 줄여주세요 (기존 이미지는 유지됩니다).");
    }
  };

  const updateField = (field: keyof PortfolioData, value: any) => {
    setData(prev => {
      const updated = { ...prev, [field]: value };
      persistData(updated);
      return updated;
    });
  };

  const handleAdminLogin = () => {
    if (password === "1111") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPassword("");
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("이미지 용량이 너무 큽니다. 2MB 이하의 이미지를 권장합니다.");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset target to allow same file re-upload if needed
    e.target.value = '';
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id as any);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const deleteProject = (id: string) => {
    if (window.confirm("정말 이 프로젝트를 삭제하시겠습니까?")) {
      setData(prev => {
        const newProjects = (prev.projects || []).filter(p => p.id !== id);
        const updated = { ...prev, projects: newProjects };
        persistData(updated);
        return updated;
      });
    }
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      company: '롯데건설',
      category: 'Commercial',
      title: '새 프로젝트 제목',
      period: '2025.01 - 2025.12',
      description: '프로젝트에 대한 간단한 설명을 입력하세요.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      subImages: [
        'https://picsum.photos/seed/s1/800/600',
        'https://picsum.photos/seed/s2/800/600',
        'https://picsum.photos/seed/s3/800/600',
        'https://picsum.photos/seed/s4/800/600'
      ],
      details: ['수행 업무 1', '수행 업무 2']
    };
    setData(prev => {
      const updated = { ...prev, projects: [newProject, ...(prev.projects || [])] };
      persistData(updated);
      return updated;
    });
  };

  const renderHighlightedText = (text: string = "") => {
    const keywords = ["공간의 가치", "증명", "기술 전문가"];
    let parts: React.ReactNode[] = [text];
    
    keywords.forEach(keyword => {
      const newParts: React.ReactNode[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const subparts = part.split(keyword);
          subparts.forEach((sub, i) => {
            newParts.push(<span key={`${i}-base`} className="text-[0.8em]">{sub}</span>);
            if (i < subparts.length - 1) {
              newParts.push(
                <span key={`${i}-high`} className="text-point text-[1em] font-extrabold tracking-tight">
                  {keyword}
                </span>
              );
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });
    return parts;
  };

  const heroImage = (data.projects || []).find(p => p.id === 'hero-img')?.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?grayscale&auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-point selection:text-white">
      <div className="fixed inset-0 arch-grid pointer-events-none z-0 opacity-40" />

      {/* Admin Control Bar */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {!isAdmin ? (
          <button onClick={() => setShowAdminLogin(true)} className="p-2 bg-white/80 backdrop-blur border border-gray-200 rounded hover:border-point transition-colors shadow-sm">
            <Settings size={20} className="text-gray-400" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow-lg">
              <Plus size={18} />
              <span>프로젝트 추가</span>
            </button>
            <button onClick={() => setIsAdmin(false)} className="flex items-center gap-2 px-4 py-2 bg-point text-white rounded hover:bg-point/90 transition-colors shadow-lg">
              <LogOut size={18} />
              <span>관리자 모드 종료</span>
            </button>
          </div>
        )}
      </div>

      {showAdminLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 border border-gray-200 max-w-sm w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 font-serif">관리자 접속</h2>
            <input 
              type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              className="w-full p-3 border border-gray-300 mb-4 focus:border-point outline-none"
            />
            <div className="flex gap-2">
              <button onClick={handleAdminLogin} className="flex-1 bg-point text-white py-3 hover:bg-black transition-colors">접속</button>
              <button onClick={() => setShowAdminLogin(false)} className="px-6 border border-gray-300 py-3 hover:bg-gray-100 transition-colors">취소</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 border-r border-gray-100 bg-white/90 backdrop-blur-md z-40 hidden md:flex flex-col items-center py-12">
        <button 
          onClick={() => handleNavClick('HOME')}
          className="text-point font-bold text-lg mb-12 tracking-tighter leading-none text-center font-serif hover:scale-110 transition-transform"
        >
          황<br/>진<br/>관
        </button>
        <div className="flex-1 flex flex-col gap-8">
          {['PROFILE', 'CAREER', 'CAPABILITY', 'PROJECTS', 'CONTACT'].map((nav) => (
            <button
              key={nav}
              onClick={() => handleNavClick(nav)}
              className={`writing-vertical transform rotate-180 text-[10px] font-bold tracking-[0.2em] transition-colors ${activeTab === nav ? 'text-point' : 'text-gray-400 hover:text-point'}`}
              style={{ writingMode: 'vertical-rl' }}
            >
              {nav}
            </button>
          ))}
        </div>
      </nav>

      <main className="md:pl-20 relative z-10">
        <section id="HOME" className="min-h-screen flex flex-col md:flex-row border-b border-gray-100 items-stretch scroll-mt-0">
          <div 
            className={`w-full md:w-[35%] h-[50vh] md:h-auto relative overflow-hidden group bg-gray-50 flex items-center justify-center ${isAdmin ? 'cursor-pointer' : ''}`}
            onClick={() => isAdmin && heroFileRef.current?.click()}
          >
            <img src={heroImage} alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-point/5 mix-blend-multiply" />
            <div className="absolute inset-0 border-[15px] border-white/20 m-6 pointer-events-none" />
            {isAdmin && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={32} className="text-white mb-2" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">사진 수정</span>
              </div>
            )}
            <input 
              type="file" ref={heroFileRef} className="hidden" accept="image/*" 
              onChange={(e) => handleImageUpload(e, (base64) => {
                setData(prev => {
                  const projects = [...(prev.projects || [])];
                  const heroIdx = projects.findIndex(p => p.id === 'hero-img');
                  if (heroIdx > -1) {
                    projects[heroIdx] = { ...projects[heroIdx], imageUrl: base64 };
                  } else {
                    projects.push({ id: 'hero-img', imageUrl: base64 } as any);
                  }
                  const updated = { ...prev, projects };
                  persistData(updated);
                  return updated;
                });
              })} 
            />
          </div>

          <div className="flex-1 p-8 md:p-20 lg:p-24 flex flex-col justify-center bg-white">
            <div className="max-w-3xl">
              <span className="text-point font-bold tracking-[0.4em] uppercase text-[10px] block mb-6">Architecture & Interior Professional</span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-[1.2] mb-12">
                {isAdmin ? (
                  <div className="space-y-4">
                    <input className="w-full p-2 text-xl border rounded outline-none focus:border-point" value={data.heroLine1} onChange={(e) => updateField('heroLine1', e.target.value)} />
                    <input className="w-full p-2 text-xl border rounded outline-none focus:border-point" value={data.heroLine2} onChange={(e) => updateField('heroLine2', e.target.value)} />
                  </div>
                ) : (
                  <>
                    <div className="mb-4">{renderHighlightedText(data.heroLine1)}</div>
                    <div>{renderHighlightedText(data.heroLine2)}</div>
                  </>
                )}
              </h1>
              <p className="text-lg text-gray-500 font-light leading-relaxed mb-16 italic font-serif">
                {isAdmin ? (
                  <textarea className="w-full p-2 text-sm border h-24 rounded outline-none focus:border-point" value={data.subHeroText} onChange={(e) => updateField('subHeroText', e.target.value)} />
                ) : data.subHeroText}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 font-bold">Information</p>
                  <h3 className="text-xl font-bold font-serif mb-2">{data.name} <span className="text-gray-300 font-sans text-sm font-normal">| {data.engName}</span></h3>
                  <p className="text-gray-400 text-sm mb-4">{data.birth}</p>
                  <div className="space-y-1">
                    <p className="text-gray-400 font-medium text-xs uppercase">{data.expertiseInterior}</p>
                    <p className="text-gray-400 font-medium text-xs uppercase">{data.expertiseConstruction}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 font-bold">Connect</p>
                  <p className="text-sm font-medium flex items-center gap-2 mb-2"><Phone size={14} className="text-point"/> {data.phone}</p>
                  <p className="text-sm font-medium flex items-center gap-2"><Mail size={14} className="text-point"/> {data.email}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="PROFILE" className="py-24 px-8 md:px-24 bg-surface border-b border-gray-100 scroll-mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-20">
              <div className="h-[2px] w-12 bg-point" />
              <h2 className="text-4xl font-serif font-bold">Expertise & Profile</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-16">
                <div>
                  <h3 className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-8">
                    <GraduationCap size={16} className="text-point" /> Education
                  </h3>
                  <div className="space-y-8">
                    {(data.education || []).map(edu => (
                      <div key={edu.id} className="relative pl-6 border-l border-gray-200">
                        <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-point" />
                        <p className="font-bold text-lg leading-tight">{edu.school}</p>
                        <p className="text-gray-500 text-xs mt-1">{edu.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-8">
                    <Award size={16} className="text-point" /> Certifications
                  </h3>
                  <div className="space-y-3">
                    {(data.certifications || []).map(cert => (
                      <div key={cert.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 shadow-sm rounded-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle size={14} className="text-point opacity-50" />
                          <span className="text-xs font-bold">{cert.name}</span>
                        </div>
                        {cert.status && <span className="text-[9px] bg-point text-white px-2 py-0.5 font-bold uppercase tracking-tighter">{cert.status}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-8">
                  KICA 한국건설인협회
                </h3>
                <div className="space-y-2">
                  {(data.kica || []).map(k => (
                    <div key={k.category} className="flex items-center justify-between p-5 border border-gray-200 bg-white group hover:border-point transition-colors">
                      <span className="text-xs font-bold text-gray-400 group-hover:text-point">{k.category}</span>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-serif font-bold text-gray-900">{k.grade}</span>
                        <span className="text-[10px] text-gray-400 mb-1 font-bold">GRADE</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-8 bg-gray-900 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/10 m-2" />
                  <p className="text-[10px] tracking-widest uppercase opacity-40 mb-6">Engineer Quality</p>
                  <p className="text-sm font-light leading-relaxed italic opacity-80">
                    건축 및 품질 분야에서 "고급" 등급을 보유하고 있으며, 정밀 시공과 체계적 공정 관리를 통해 완성도 높은 결과물을 보장합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="CAREER" className="py-24 px-8 md:px-24 bg-white border-b border-gray-100 scroll-mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-20">
              <div className="h-[2px] w-12 bg-point" />
              <h2 className="text-4xl font-serif font-bold">Career History</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {(data.career || []).map((car) => {
                const isLotte = car.company.includes('롯데건설');
                return (
                  <div key={car.id} className="group h-full flex flex-col">
                    <div className={`p-10 border flex-1 flex flex-col relative transition-all duration-500 hover:shadow-2xl ${isLotte ? 'bg-point border-point text-white hover:border-white/20' : 'bg-surface border-gray-100 hover:border-point/20'}`}>
                      <div className={`absolute top-0 right-0 w-16 h-16 border-t-[1px] border-r-[1px] m-4 transition-colors ${isLotte ? 'border-white/20 group-hover:border-white/50' : 'border-point/10 group-hover:border-point/30'}`} />
                      <span className={`text-[11px] font-bold tracking-[0.2em] uppercase mb-4 ${isLotte ? 'text-point-light' : 'text-point'}`}>{car.period}</span>
                      <h3 className="text-3xl font-serif font-bold mb-1">{car.company}</h3>
                      <p className={`text-[11px] font-bold uppercase tracking-[0.3em] mb-10 border-b pb-4 ${isLotte ? 'text-white/60 border-white/10' : 'text-gray-400 border-gray-100'}`}>{car.role}</p>
                      <div className="space-y-6">
                        <p className={`text-[10px] uppercase tracking-widest font-bold ${isLotte ? 'text-white/40' : 'text-gray-400'}`}>Major Sites & Projects</p>
                        <ul className="grid grid-cols-1 gap-3">
                          {car.projects?.map(p => (
                            <li key={p} className={`flex items-start gap-4 text-sm font-medium transition-colors ${isLotte ? 'text-white/80 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 transition-colors ${isLotte ? 'bg-white/30 group-hover:bg-white' : 'bg-point/20 group-hover:bg-point'}`} /> 
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="CAPABILITY" className="py-24 px-8 md:px-24 bg-surface relative overflow-hidden scroll-mt-0 border-b border-gray-100">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-20">
              <div className="h-[2px] w-12 bg-point" />
              <h2 className="text-4xl font-serif font-bold">Core Capabilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {[
                { 
                  icon: <Layers size={28} className="text-point" />, 
                  title: "시공 관리 (Construction Control)", 
                  desc: "설계도서, 현장 여건, 공정 진행사항을 복합적으로 검토하여 최적의 공사계획을 수립합니다.",
                  tags: ["설계도서 검토 및 VE 제안", "자재/인력/장비 선정 및 투입", "공정/품질/안전/환경 관리"]
                },
                { 
                  icon: <Building2 size={28} className="text-point" />, 
                  title: "공무 & 프로젝트 리소스 관리", 
                  desc: "인허가, 원가, 계약 등 리소스를 총괄하여 프로젝트의 Control Tower 역할을 수행합니다.",
                  tags: ["실행예산 수립 및 원가 통제", "설계변경 및 발주 개선 추진", "계약 및 대관 업무 대응"]
                },
                { 
                  icon: <Globe size={28} className="text-point" />, 
                  title: "글로벌 프로젝트 매니지먼트", 
                  desc: "해외 대형 복합개발 프로젝트 수행을 통해 구축한 글로벌 협업 및 로컬 관리 역량을 보유하고 있습니다.",
                  tags: ["해외 현지 직원 및 협력사 관리", "글로벌 건설 기준 적용 및 현지화", "영국 본사 등 해외 파트너 기술 협의"]
                },
                { 
                  icon: <Users size={28} className="text-point" />, 
                  title: "커뮤니케이션 & 조정 능력", 
                  desc: "발주처, 디자이너, 운영사 및 타 공종 부서와의 원활한 업무 조율을 통해 사업의 성공을 이끕니다.",
                  tags: ["이해관계자간 갈등 조정", "협력업체 통합 관리 및 조율", "PM(Project Manager) 성장 역량"]
                },
              ].map((cap, i) => (
                <div key={i} className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group">
                  <div className="mb-8 p-4 bg-surface w-fit group-hover:bg-point group-hover:text-white transition-colors">{cap.icon}</div>
                  <h3 className="text-2xl font-serif font-bold mb-4">{cap.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">{cap.desc}</p>
                  <div className="space-y-3">
                    {cap.tags.map((tag, j) => (
                      <div key={j} className="flex items-center gap-3 text-xs font-bold text-gray-800">
                        <div className="w-1.5 h-1.5 bg-point" /> {tag}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="PROJECTS" className="py-24 px-8 md:px-24 bg-white scroll-mt-0">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-20">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-point" />
                <h2 className="text-4xl font-serif font-bold">Project Portfolio</h2>
              </div>
            </div>
            <div className="space-y-32">
              {['롯데건설', '은민에스엔디'].map(companyName => (
                <div key={companyName}>
                   <div className="flex items-center gap-6 mb-12">
                     <span className="text-sm md:text-xl font-serif font-bold tracking-widest text-point shrink-0 uppercase opacity-80">
                       {companyName === '롯데건설' ? 'LOTTE E&C PROJECTS' : 'EUNMIN S&D PROJECTS'}
                     </span>
                     <div className="flex-1 h-px bg-gray-100" />
                   </div>
                   <div className="grid grid-cols-1 gap-12">
                    {(data.projects || [])
                      .filter(p => p.id !== 'hero-img' && p.company === companyName)
                      .map((proj) => {
                        const isJeonju = proj.id === 'p_jeonju';
                        return (
                          <div key={proj.id} className="group border border-gray-100 overflow-hidden relative">
                            {isAdmin && (
                              <div className="absolute top-4 right-4 z-20 flex gap-2">
                                <button onClick={(e) => { e.stopPropagation(); deleteProject(proj.id); }} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg"><Trash2 size={16} /></button>
                              </div>
                            )}
                            <div className={`flex flex-col md:flex-row ${isJeonju ? 'cursor-default' : 'cursor-pointer'}`} onClick={() => { if (isJeonju) return; setExpandedProject(expandedProject === proj.id ? null : proj.id); }}>
                              <div className="w-full md:w-2/5 h-[350px] overflow-hidden relative group/img">
                                <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" />
                                <div className="absolute top-6 left-6 bg-point text-white px-4 py-1 text-[10px] font-bold tracking-[0.2em] uppercase z-10">{proj.category}</div>
                                {!isJeonju && proj.subImages?.length > 0 && (
                                  <>
                                    <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-3 py-1.5 flex items-center gap-2 border border-white/20 transition-all duration-500 group-hover:bg-point/90 z-10">
                                      <div className="flex gap-0.5 items-center">
                                        <div className="w-1 h-1 bg-white rounded-full" /><div className="w-1 h-1 bg-white rounded-full opacity-60" /><div className="w-1 h-1 bg-white rounded-full opacity-30" />
                                      </div>
                                      <span className="text-[10px] font-bold text-white tracking-widest">+{proj.subImages.length}</span>
                                    </div>
                                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 z-10">
                                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 shadow-xl border border-gray-100">
                                        <ImageIcon size={12} className="text-point" /><span className="text-[9px] font-bold text-point uppercase tracking-widest">View Gallery</span>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {isAdmin && (
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-20"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const input = document.createElement('input');
                                      input.type = 'file'; input.accept = 'image/*';
                                      input.onchange = (ev) => handleImageUpload(ev as any, (base64) => {
                                        setData(prev => {
                                          const newProjects = prev.projects.map(p => p.id === proj.id ? { ...p, imageUrl: base64 } : p);
                                          const updated = { ...prev, projects: newProjects };
                                          persistData(updated);
                                          return updated;
                                        });
                                      });
                                      input.click();
                                    }}
                                  >
                                    <Camera className="text-white" size={24} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 p-10 lg:p-14 flex flex-col justify-center bg-white relative">
                                {isAdmin ? (
                                  <div className="space-y-4">
                                    <input className="text-2xl font-serif font-bold w-full border-b focus:border-point outline-none" value={proj.title} onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => {
                                        setData(prev => {
                                          const newProjects = prev.projects.map(p => p.id === proj.id ? { ...p, title: e.target.value } : p);
                                          const updated = { ...prev, projects: newProjects };
                                          persistData(updated);
                                          return updated;
                                        });
                                      }}
                                    />
                                    <input className="text-gray-500 font-light w-full border-b focus:border-point outline-none" value={proj.description} onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => {
                                        setData(prev => {
                                          const newProjects = prev.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p);
                                          const updated = { ...prev, projects: newProjects };
                                          persistData(updated);
                                          return updated;
                                        });
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-start mb-6">
                                      <span className="text-[11px] text-gray-400 font-bold tracking-widest uppercase">{proj.period}</span>
                                      {!isJeonju && <ChevronDown size={20} className={`text-point transition-transform duration-500 ${expandedProject === proj.id ? 'rotate-180' : ''}`} />}
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold mb-6 group-hover:text-point transition-colors leading-relaxed">{proj.title}</h3>
                                    <p className="text-gray-500 font-light leading-relaxed mb-4 text-base">{proj.description}</p>
                                  </>
                                )}
                              </div>
                            </div>
                            {!isJeonju && (
                              <div className={`transition-all duration-700 ease-in-out overflow-hidden ${expandedProject === proj.id ? 'max-h-[1400px] border-t border-gray-100' : 'max-h-0'}`}>
                                <div className="p-10 md:p-20 bg-surface grid grid-cols-1 lg:grid-cols-2 gap-20">
                                  <div>
                                    <h4 className="text-sm font-bold tracking-widest uppercase text-point mb-10 border-b border-point/10 pb-4">Key Responsibilities</h4>
                                    <ul className="space-y-6">
                                      {proj.details.map((detail, idx) => (
                                        <li key={idx} className="flex gap-6 group/detail">
                                          <span className="text-point font-bold text-xl opacity-20 shrink-0">0{idx+1}</span>
                                          {isAdmin ? (
                                            <div className="flex-1 flex gap-2">
                                              <input className="flex-1 bg-transparent border-b outline-none text-gray-600" value={detail}
                                                onChange={(e) => {
                                                  setData(prev => {
                                                    const updatedProjects = prev.projects.map(p => {
                                                      if (p.id === proj.id) {
                                                        const newDetails = [...p.details];
                                                        newDetails[idx] = e.target.value;
                                                        return { ...p, details: newDetails };
                                                      }
                                                      return p;
                                                    });
                                                    const updated = { ...prev, projects: updatedProjects };
                                                    persistData(updated);
                                                    return updated;
                                                  });
                                                }}
                                              />
                                              <button onClick={() => {
                                                setData(prev => {
                                                  const updatedProjects = prev.projects.map(p => {
                                                    if (p.id === proj.id) {
                                                      return { ...p, details: p.details.filter((_, i) => i !== idx) };
                                                    }
                                                    return p;
                                                  });
                                                  const updated = { ...prev, projects: updatedProjects };
                                                  persistData(updated);
                                                  return updated;
                                                });
                                              }} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                                            </div>
                                          ) : (
                                            <span className="text-gray-600 leading-relaxed font-medium">{detail}</span>
                                          )}
                                        </li>
                                      ))}
                                      {isAdmin && (
                                        <button onClick={() => {
                                          setData(prev => {
                                            const updatedProjects = prev.projects.map(p => p.id === proj.id ? { ...p, details: [...p.details, "새 업무 내용"] } : p);
                                            const updated = { ...prev, projects: updatedProjects };
                                            persistData(updated);
                                            return updated;
                                          });
                                        }} className="flex items-center gap-2 text-xs font-bold text-point py-2 border border-dashed border-point/30 w-full justify-center hover:bg-point/5 transition-colors">
                                          <Plus size={14} /> 상세 내용 추가
                                        </button>
                                      )}
                                    </ul>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 h-fit">
                                    {proj.subImages?.map((si, idx) => (
                                      <div key={idx} className="relative group/subimg h-40 overflow-hidden bg-gray-100 border border-white shadow-sm">
                                        <img src={si} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                        {isAdmin && (
                                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/subimg:opacity-100 transition-opacity cursor-pointer"
                                            onClick={() => {
                                              const input = document.createElement('input');
                                              input.type = 'file'; input.accept = 'image/*';
                                              input.onchange = (ev) => handleImageUpload(ev as any, (base64) => {
                                                setData(prev => {
                                                  const updatedProjects = prev.projects.map(p => {
                                                    if (p.id === proj.id) {
                                                      const newSubs = [...(p.subImages || [])];
                                                      newSubs[idx] = base64;
                                                      return { ...p, subImages: newSubs };
                                                    }
                                                    return p;
                                                  });
                                                  const updated = { ...prev, projects: updatedProjects };
                                                  persistData(updated);
                                                  return updated;
                                                });
                                              });
                                              input.click();
                                            }}
                                          ><Camera className="text-white" size={20} /></div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="CONTACT" className="py-32 px-8 md:px-24 bg-gray-900 text-white relative overflow-hidden scroll-mt-0">
          <div className="absolute bottom-0 left-0 w-full h-1/2 arch-grid opacity-5 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-[11px] font-bold text-point-light tracking-[0.5em] uppercase block mb-8">Professional Construction Engineer</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-10">Let's build<br/>with excellence.</h2>
            <p className="text-xl text-gray-400 font-light mb-20 max-w-2xl mx-auto leading-relaxed italic">
              "기본과 원칙을 준수하며 정밀한 데이터 분석을 바탕으로 현장의 모든 난관을 극복합니다. 공간의 완성도를 끝까지 책임지겠습니다."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-20">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Mobile</p>
                <a href={`tel:${data.phone}`} className="text-2xl font-serif font-bold hover:text-point-light transition-colors block">{data.phone}</a>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Email</p>
                <a href={`mailto:${data.email}`} className="text-2xl font-serif font-bold hover:text-point-light transition-colors block">{data.email}</a>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Location</p>
                <div className="flex items-center justify-center gap-2 text-2xl font-serif font-bold">Republic of Korea</div>
              </div>
            </div>
            <div className="mt-32 pt-12 border-t border-white/5 opacity-20 text-[9px] uppercase tracking-[0.4em]">&copy; 2025 HWANG JIN GWAN. ALL RIGHTS RESERVED.</div>
          </div>
        </section>
      </main>

      <style>{`
        .writing-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
        .text-point-light { color: #4da6ff; }
      `}</style>
    </div>
  );
};

export default App;
