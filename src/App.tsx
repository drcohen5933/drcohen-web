import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Instagram, ArrowUp } from 'lucide-react';
import homeImg from './home.png';
import creamMainImg from './cream_main.png';

// --- Types ---
type Page = 'home' | 'best' | 'about' | 'news' | 'community' | 'product' | 'news-detail';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  verticalLabel: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'egf-regeneration',
    title: '민감성 피부를 위한\n에몰리언트의 진실',
    date: '2026년 4월 6일',
    category: 'COHEN NOTE — 2026.04',
    excerpt: '피부 장벽 손상으로 인한 수분 증발과 민감 반응을 해결하는 에몰리언트와 히알루론산의 시너지 효과를 분석합니다.',
    image: '/note1.png',
    verticalLabel: 'Regeneration',
    content: [
      '아무리 보습제를 발라도 하루가 지나면 다시 당기고 각질이 일어나는 느낌, 익숙하시죠?',
      '문제는 수분 부족이 아닙니다. 피부 장벽(외부 자극과 수분 증발을 막아주는 피부 보호막)이 손상되어 바른 수분이 그대로 빠져나가는 것이 진짜 원인입니다.',
      '피부 장벽이 손상되면 외부 자극원이 쉽게 침투해 염증 반응이 반복됩니다. 아토피·민감성 피부에서 흔히 나타나는 가려움, 붉음, 따가움이 바로 이 악순환의 결과입니다. 이때 단순히 수분만 공급하는 보습제로는 장벽 회복이 어렵습니다.',
      '에몰리언트(장벽 틈새를 채워 유연성과 밀폐력을 동시에 높이는 성분)는 단순 수분 공급을 넘어 피부 장벽 구조 자체를 복원합니다. 히알루론산(피부 속 수분을 끌어당겨 잡아두는 성분)과 시카(병풀 추출물, 진정·재생 효과)를 함께 적용하면 장벽 회복 속도가 유의미하게 높아집니다.',
      '뮤신은 히알루론산과 유사한 점도 구조로 피부 표면에 얇은 보호막을 형성합니다. 이 막은 수분 증발을 억제하면서 동시에 피부 재생에 관여하는 성장인자(세포 회복 신호를 보내는 단백질) 전달을 도와줍니다.',
      '손상된 장벽 피부에서 보습과 재생을 동시에 지원하는 이유가 바로 여기에 있습니다.',
      '세안 후 3분 이내, 피부가 살짝 촉촉할 때 보습제를 바르는 것이 핵심입니다. 히알루론산 세럼으로 수분을 먼저 채우고, 에몰리언트 성분이 풍부한 크림으로 마무리해 장벽을 밀폐하세요. 이 두 단계만 지켜도 보습 지속 시간이 눈에 띄게 달라집니다.'
    ]
  },
  {
    id: 'sun-serum-evolution',
    title: '자외선 차단제의 진화 — 세럼 타입이 옳은 이유',
    date: '2025년 2월 24일',
    category: 'COHEN NOTE',
    excerpt: '기존 선크림 대비 선세럼의 피부 흡수율과 체감 차이를 데이터로 분석했습니다.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    verticalLabel: 'Evolution',
    content: [
      '자외선 차단제는 이제 필수품을 넘어 스킨케어의 연장선이 되었습니다. 닥터코헨은 왜 무거운 크림 제형이 아닌 가벼운 세럼 제형을 선택했을까요?',
      '연구 결과, 세럼 제형은 크림보다 입자가 미세하여 피부 밀착력이 1.5배 높으며, 백탁 현상 없이 투명하게 흡수됩니다. 이는 메이크업 전 단계에서 피부 결을 정돈하는 데 최적의 조건을 제공합니다.',
      '또한 히알루론산과 시카 성분을 배합하여 자외선 차단과 동시에 수분 공급 및 진정 효과를 동시에 누릴 수 있도록 설계되었습니다.',
      '끈적임 없는 산뜻한 사용감은 사계절 내내 자외선 차단을 생활화할 수 있게 돕는 가장 중요한 요소입니다.'
    ]
  },
  {
    id: 'vegan-formula',
    title: '비건 포뮬러, 효능을 타협하지 않는 방법',
    date: '2025년 1월 15일',
    category: 'COHEN NOTE',
    excerpt: '동물성 원료 없이도 임상 효능을 유지하는 닥터코헨 비건 포뮬러의 개발 과정.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop',
    verticalLabel: 'Veganism',
    content: [
      '지속 가능한 아름다움을 위해 닥터코헨은 비건 포뮬러를 지향합니다. 하지만 비건 제품은 효능이 떨어진다는 편견이 있었습니다.',
      '우리는 식물 유래 단백질과 천연 추출물을 조합하여 동물성 원료를 대체하면서도 동일한, 혹은 그 이상의 효능을 내는 최적의 배합비를 찾아냈습니다.',
      '전 제품 이탈리아 V-LABEL 비건 인증을 획득하며 안전성과 윤리성을 동시에 입증했습니다.',
      '피부와 환경 모두에게 건강한 선택, 닥터코헨이 제안하는 새로운 뷰티 기준입니다.'
    ]
  }
];

interface Product {
  id: string;
  num: string;
  name: string;
  line: string;
  desc: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image?: string;
  subImages?: string[];
  details: string[];
}

const PRODUCTS: Product[] = [
  {
    id: 'sun-serum',
    num: '01',
    name: '히알루 시카 워터리 선세럼, 50ml',
    line: '선세럼 라인',
    desc: '닥터코헨 히알루 시카 워터리 선세럼 50ml 끈적임없는 수분 진정 선케어 SPF50+/PA4+',
    price: '15,000',
    originalPrice: '25,000',
    discount: '40%',
    image: '/sunmain.png',
    subImages: [
      '/sunsub_1.png', '/sunsub_2.png', '/sunsub_3.png', '/sunsub_4.png',
      '/sunsub_5.png', '/sunsub_6.png', '/sunsub_7.png', '/sunsub_8.png',
      '/sunsub_9.png', '/sunsub_10.png', '/sunsub_11.png', '/sunsub_12.png',
      '/sunsub_13.png', '/sunsub_14.png', '/sunsub_15.png', '/sunsub_16.png',
      '/sunsub_17.png', '/sunsub_18.png', '/sunsub_19.png', '/sunsub_20.png',
      '/sunsub_21.png', '/sunsub_22.png'
    ],
    details: [
      '피부타입 : 복합성',
      '종류 : 유기자차',
      '자외선차단지수 : SPF50+',
      '주요제품특징 : 촉촉함(수분공급), 부드러운 발림, 백탁현상방지'
    ]
  },
  {
    id: 'egf-cream',
    num: '02',
    name: 'EGF 재생크림',
    line: 'EGF 라인',
    desc: '닥터코헨 이지 액티브 플러스 프로틴 기미 크림\n[EGF 재생크림]',
    price: '48,000',
    originalPrice: '58,000',
    discount: '17%',
    image: creamMainImg,
    details: [
      '사용부위 : 팔자주름, 페이스용',
      '피부타입 : 모든피부용',
      '세부제품특징 : 피부탄력, 주름케어, 브라이트닝, 영양공급, 윤기부여',
      '주요제품특징 : 촉촉함(수분공급), 부드러운 발림'
    ]
  },
  {
    id: 'egf-serum',
    num: '03',
    name: 'EGF 세럼',
    line: 'EGF 라인',
    desc: '닥터코헨 이지 액티브 플러스 프로틴 기미 앰플 세럼\n[EGF 에센스]',
    price: '48,000',
    originalPrice: '58,000',
    discount: '17%',
    image: '/serum_main.png',
    details: [
      '사용부위 : 팔자주름, 페이스용',
      '피부타입 : 모든피부용',
      '종류 : 세럼',
      '주요제품특징 : 촉촉함(수분공급), 흡수력'
    ]
  }
];

interface PageProps {
  setPage?: (p: Page) => void;
  bestTab?: 'egf' | 'sun';
  setBestTab?: (tab: 'egf' | 'sun') => void;
  aboutTab?: 'story' | 'value';
  setAboutTab?: (tab: 'story' | 'value') => void;
  selectedProductId?: string;
  setSelectedProductId?: (id: string) => void;
  onProductClick?: (id: string) => void;
  selectedNewsId?: string;
  onNewsClick?: (id: string) => void;
}

// --- Components ---

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const followMouse = () => {
      setRingPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(followMouse);
    };
    const animId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animId);
  }, [mousePos]);

  return (
    <>
      <div 
        className="custom-cursor hidden md:block" 
        style={{ left: mousePos.x, top: mousePos.y }} 
      />
      <div 
        className="custom-cursor-ring hidden md:block" 
        style={{ left: ringPos.x, top: ringPos.y }} 
      />
    </>
  );
};

const Navbar = ({ activePage, setPage, handleNavBest, handleNavAbout }: { activePage: Page, setPage: (p: Page) => void, handleNavBest: (tab: 'egf' | 'sun') => void, handleNavAbout: (tab: 'story' | 'value') => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-[80px] bg-white/80 backdrop-blur-md">
        <button 
          onClick={() => setPage('home')}
          className="font-bold text-[28px] tracking-tight text-brand-accent cursor-none"
        >
          Dr. Cohen
        </button>

        <div className="flex items-center gap-12">
          <div className="hidden lg:flex items-center gap-10">
            <button onClick={() => setPage('best')} className="text-[14px] font-bold tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none">BEST</button>
            <button onClick={() => setPage('about')} className="text-[14px] font-bold tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none">About</button>
            <button onClick={() => setPage('news')} className="text-[14px] font-bold tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none">Notes</button>
            <button onClick={() => setPage('community')} className="text-[14px] font-bold tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none">Reviews</button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 w-6 cursor-none"
          >
            <span className={`block w-full h-0.5 bg-brand-ink transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-full h-0.5 bg-brand-ink transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-full h-0.5 bg-brand-ink transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[55] bg-brand-bg flex flex-col pt-[120px] px-10"
          >
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('home')} className="font-bold text-[42px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">Home</button>
              </div>
              
              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('best')} className="font-bold text-[42px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">BEST</button>
                <div className="flex gap-6 mt-1">
                  <button onClick={() => { handleNavBest('egf'); setIsMenuOpen(false); }} className="text-[11px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent cursor-none transition-colors">EGF 라인</button>
                  <button onClick={() => { handleNavBest('sun'); setIsMenuOpen(false); }} className="text-[11px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent cursor-none transition-colors">선세럼 라인</button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('about')} className="font-bold text-[48px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">About</button>
                <div className="flex gap-6 mt-1">
                  <button onClick={() => { handleNavAbout('story'); setIsMenuOpen(false); }} className="text-[11px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent cursor-none transition-colors">브랜드 스토리</button>
                  <button onClick={() => { handleNavAbout('value'); setIsMenuOpen(false); }} className="text-[11px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent cursor-none transition-colors">핵심 가치</button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('news')} className="font-bold text-[48px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">News</button>
                <button onClick={() => navigate('news')} className="text-[12px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent text-left cursor-none transition-colors">COHEN NOTE</button>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('community')} className="font-bold text-[48px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">Community</button>
                <button onClick={() => navigate('community')} className="text-[12px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent text-left cursor-none transition-colors">리뷰</button>
              </div>
            </div>

            <div className="mt-auto pb-10 flex gap-6">
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavItem = ({ label, children, onClick }: { label: string, children?: React.ReactNode, onClick: () => void }) => (
  <li className="relative group flex items-stretch">
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-8 text-[14px] tracking-[0.22em] uppercase text-brand-ink-light hover:text-brand-ink transition-colors cursor-none"
    >
      {label} <ChevronDown className="w-4 h-4 transition-transform group-hover:-rotate-180" />
    </button>
    {children}
  </li>
);

const Dropdown = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute top-[80px] left-1/2 -translate-x-1/2 -translate-y-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-200 bg-brand-white border border-brand-ink/10 min-w-[180px] py-2 shadow-[0_8px_28px_rgba(0,0,0,0.07)]">
    {children}
  </div>
);

const Footer = () => (
  <footer className="border-t border-brand-stone/40 px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-12 bg-brand-card">
    <div className="flex items-center gap-12">
      <span className="font-bold text-[24px] tracking-widest text-brand-accent uppercase">Dr. Cohen</span>
      <a 
        href="https://www.instagram.com/dr.cohen_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-brand-stone hover:text-brand-accent transition-colors cursor-none"
      >
        <Instagram size={24} strokeWidth={1.5} />
      </a>
    </div>
    <div className="flex gap-12">
      <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none">개인정보처리방침</a>
      <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none">이용약관</a>
      <a 
        href="https://smartstore.naver.com/drcohen/qna?cp=1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[11px] tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none"
      >
        고객센터
      </a>
    </div>
    <span className="text-[11px] font-medium text-brand-stone uppercase opacity-60 tracking-widest">© 2025 DR. Cohen. All Rights Reserved.</span>
  </footer>
);

// --- Pages ---

const BestItem = ({ line, name, desc, price, originalPrice, discount, image, onClick }: { line: string, name: string, desc: string, price: string, originalPrice?: string, discount?: string, image?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="flex flex-col items-center cursor-none group transition-all duration-500 hover:scale-105"
  >
    {/* Image Area */}
    <div className="aspect-square flex items-center justify-center w-full rounded-2xl overflow-hidden mb-2 relative">
      {discount && (
        <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-brand-accent text-white flex items-center justify-center text-[10px] font-bold tracking-tighter">
          {discount}
        </div>
      )}
      {image ? (
        <img src={image} className="h-[80%] w-[80%] object-contain group-hover:scale-110 transition-transform duration-700" alt={name} referrerPolicy="no-referrer" />
      ) : (
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <svg viewBox="0 0 100 200" fill="none" className="h-[60%]">
            <rect x="30" y="10" width="40" height="5" rx="2.5" fill="currentColor"/>
            <path d="M28 20 L25 180 Q25 188 50 188 Q75 188 75 180 L72 20Z" fill="currentColor"/>
          </svg>
        </div>
      )}
    </div>

    {/* Bottom Info Area */}
    <div className="text-center">
      <p className="text-[10px] font-bold tracking-widest text-brand-accent uppercase mb-2">{line}</p>
      <h3 className="text-[16px] font-bold text-brand-ink mb-2 tracking-tight">{name}</h3>
      <p className="text-[13px] text-brand-ink-light mb-4 line-clamp-2 h-10 max-w-[280px] opacity-60 whitespace-pre-line leading-tight">{desc}</p>
      <div className="flex items-center justify-center gap-3">
        <span className="text-[16px] font-bold text-brand-accent">₩{price}</span>
        {originalPrice && <span className="text-[14px] text-brand-stone line-through opacity-50">₩{originalPrice}</span>}
      </div>
    </div>
  </div>
);

const Home: React.FC<PageProps> = ({ setPage, onProductClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-0"
    >
      {/* Hero - Split Layout */}
      <section className="relative h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane - Image */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
          <img 
            src={homeImg} 
            className="w-full h-full object-cover" 
            alt="Skin Science" 
            referrerPolicy="no-referrer" 
          />
        </div>

        {/* Right Pane - Content */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#F9F9F7] flex flex-col items-center justify-center p-10 relative">
          <div className="max-w-[400px] text-center flex flex-col items-center">
          </div>

          {/* Large Typography at Bottom Right */}
          <div className="absolute bottom-10 right-10 text-right">
            <h1 className="font-black text-[12vw] lg:text-[8vw] leading-none tracking-tighter text-brand-accent uppercase">
              Dr. Cohen.
            </h1>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-brand-stone/20 py-4 overflow-hidden bg-white">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-[60px] pr-[60px]">
              <MarqueeItem text="저자극" />
              <MarqueeItem text="히알루론" />
              <MarqueeItem text="EGF" />
              <MarqueeItem text="세포 재생" />
              <MarqueeItem text="미백" />
              <MarqueeItem text="이지 액티브+ 프로틴" />
              <MarqueeItem text="닥터코헨" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="px-10 py-32">
        <div className="text-center mb-20">
          <h2 className="font-bold text-[clamp(40px,6vw,64px)] leading-none text-brand-ink tracking-tight uppercase">
            BEST
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <BestItem line="선세럼 라인" name="히알루 시카 워터리 선세럼" desc="닥터코헨 히알루 시카 워터리 선세럼 50ml 끈적임없는 수분 진정 선케어 SPF50+/PA4+" price="15,000" originalPrice="25,000" discount="40%" image="/sunmain.png" onClick={() => onProductClick?.('sun-serum')} />
          <BestItem line="EGF 라인" name="EGF 재생크림" price="48,000" originalPrice="58,000" discount="17%" desc={"닥터코헨 이지 액티브 플러스 프로틴 기미 크림\n[EGF 재생크림]"} image={creamMainImg} onClick={() => onProductClick?.('egf-cream')} />
          <BestItem line="EGF 라인" name="EGF 세럼" price="48,000" originalPrice="58,000" discount="17%" desc={"닥터코헨 이지 액티브 플러스 프로틴 기미 앰플 세럼\n[EGF 에센스]"} image="/serum_main.png" onClick={() => onProductClick?.('egf-serum')} />
        </div>
      </section>

      {/* Core Values */}
      <section className="px-10 py-32 bg-brand-soft/30">
        <div className="text-center mb-20">
          <h2 className="font-bold text-[clamp(40px,6vw,64px)] leading-none text-brand-ink tracking-tight uppercase">
            CORE VALUES
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 max-w-7xl mx-auto">
          <ValueCard 
            image="/about_1.png"
            title="건강" 
            desc="안전한 성분과 전문가의 처방을 바탕으로 피부 건강과 면역력을 강화하는 신뢰할 수 있는 제품을 개발합니다." 
          />
          <ValueCard 
            image="/about_2.png"
            title="효능" 
            desc="엄격한 선별 과정을 거친 고효능 원료를 사용하여 빠른 흡수와 확실한 효과를 담아냅니다. 피부 과학 기술이 집약된 기능성으로 최상의 품질과 안티에이징 효과를 직접 경험하실 수 있습니다." 
          />
          <ValueCard 
            image="/about_3.png"
            title="아름다움" 
            desc="가장 빛나는 피부 상태를 회복하고 본연의 아름다움으로 돌아가게 합니다. 인위적이지 않고 오래 지속되는 자연스러운 아름다움을 추구합니다." 
          />
        </div>
      </section>

      {/* SNS */}
      <section className="relative aspect-[21/7] md:aspect-[21/5] border-t border-brand-stone/40 mt-10 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/pooter.png" className="w-full h-full object-cover opacity-80" alt="Footer Background" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="text-[12px] tracking-[0.3em] uppercase text-brand-white">Follow us on Instagram</p>
          <a 
            href="https://www.instagram.com/dr.cohen_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-brand-white/90 backdrop-blur-sm border border-brand-stone/40 flex items-center justify-center text-brand-ink hover:bg-brand-accent hover:text-brand-white transition-all hover:scale-110 cursor-none"
          >
            <Instagram size={24} strokeWidth={1.5} />
          </a>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
};

const MarqueeItem = ({ text }: { text: string }) => (
  <span className="text-[12px] tracking-[0.44em] uppercase text-brand-accent flex items-center gap-6 shrink-0">
    <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
    {text}
  </span>
);

const ProductCard = ({ category, name, price, originalPrice, image, onClick, isFeatured }: { category: string, name: string, price: string, originalPrice?: string, image?: string, onClick?: () => void, isFeatured?: boolean }) => (
  <div 
    onClick={onClick}
    className="flex flex-col cursor-none group transition-all duration-500"
  >
    {/* Image Area */}
    <div className="aspect-[4/5] flex items-center justify-center w-full bg-brand-card rounded-3xl overflow-hidden mb-2 relative">
      {image ? (
        <img src={image} className="h-[70%] w-[70%] object-contain group-hover:scale-105 transition-transform duration-700" alt={name} referrerPolicy="no-referrer" />
      ) : (
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <svg viewBox="0 0 100 200" fill="none" className="h-[60%]">
            <rect x="30" y="10" width="40" height="5" rx="2.5" fill="currentColor"/>
            <path d="M28 20 L25 180 Q25 188 50 188 Q75 188 75 180 L72 20Z" fill="currentColor"/>
          </svg>
        </div>
      )}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-accent">
          +
        </button>
      </div>
    </div>

    {/* Info Area */}
    <div className="px-2">
      <h3 className="text-[15px] font-bold text-brand-ink mb-1 tracking-tight">{name}</h3>
      <p className="text-[12px] text-brand-ink-light mb-2 opacity-60 line-clamp-1">{category}</p>
      <div className="flex items-center gap-3">
        <span className="text-[15px] font-medium text-brand-accent">₩{price}</span>
        {originalPrice && <span className="text-[13px] text-brand-stone line-through opacity-40">₩{originalPrice}</span>}
      </div>
    </div>
  </div>
);

const ReviewCard = ({ author, tag, text, image }: { author: string, tag: string, text: string, image: string }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="aspect-square w-full overflow-hidden mb-4 bg-brand-card">
      <img 
        src={image} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        alt={tag} 
        referrerPolicy="no-referrer" 
      />
    </div>
    <h3 className="font-bold text-[16px] lg:text-[18px] mb-4 text-brand-ink tracking-tight">{tag}</h3>
    <p className="text-[14px] lg:text-[15px] text-brand-ink-light leading-relaxed max-w-[340px] mb-4">
      {text}
    </p>
    <p className="text-[12px] tracking-[0.2em] text-brand-accent uppercase font-medium">{author}</p>
  </div>
);

const Best: React.FC<PageProps> = ({ bestTab, setBestTab, onProductClick }) => {
  const currentTab = bestTab || 'egf';
  const setTab = setBestTab || (() => {});

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-[60px]"
    >
      <div className="px-10 pt-24 pb-16 border-b border-brand-stone/40 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <p className="text-[12px] tracking-[0.42em] uppercase text-brand-accent mb-4">DR. COHEN</p>
          <h1 className="font-bold text-[clamp(32px,5vw,56px)] leading-[0.95] text-brand-ink tracking-tight uppercase">BEST</h1>
        </div>
        <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">닥터코헨의 핵심 솔루션.<br/>피부 과학이 만들어낸 베스트 아이템을 만나보세요.</p>
      </div>

      <div className="flex px-10 border-b border-brand-stone/40">
        <button 
          onClick={() => setTab('egf')}
          className={`px-8 py-6 text-[12px] tracking-[0.22em] uppercase transition-all cursor-none border-b-2 ${currentTab === 'egf' ? 'text-brand-accent border-brand-accent' : 'text-brand-ink-light border-transparent'}`}
        >
          EGF 라인
        </button>
        <button 
          onClick={() => setTab('sun')}
          className={`px-8 py-6 text-[12px] tracking-[0.22em] uppercase transition-all cursor-none border-b-2 ${currentTab === 'sun' ? 'text-brand-accent border-brand-accent' : 'text-brand-ink-light border-transparent'}`}
        >
          선세럼 라인
        </button>
      </div>

      <div className="p-10 bg-brand-card">
        {currentTab === 'egf' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <BestItem line="EGF 라인" name="EGF 재생크림" desc={"닥터코헨 이지 액티브 플러스 프로틴 기미 크림\n[EGF 재생크림]"} price="48,000" originalPrice="58,000" discount="17%" image={creamMainImg} onClick={() => onProductClick?.('egf-cream')} />
              <BestItem line="EGF 라인" name="EGF 세럼" desc={"닥터코헨 이지 액티브 플러스 프로틴 기미 앰플 세럼\n[EGF 에센스]"} price="48,000" originalPrice="58,000" discount="17%" image="/serum_main.png" onClick={() => onProductClick?.('egf-serum')} />
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <BestItem line="선세럼 라인" name="히알루 시카 워터리 선세럼" desc="닥터코헨 히알루 시카 워터리 선세럼 50ml 끈적임없는 수분 진정 선케어 SPF50+/PA4+" price="15,000" originalPrice="25,000" discount="40%" image="/sunmain.png" onClick={() => onProductClick?.('sun-serum')} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

const About: React.FC<PageProps> = ({ aboutTab, setAboutTab }) => {
  const currentTab = aboutTab || 'story';
  const setTab = setAboutTab || (() => {});

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-[60px]"
    >
      <div className="px-10 pt-24 pb-16 border-b border-brand-stone/40 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <p className="text-[12px] tracking-[0.42em] uppercase text-brand-ink-light mb-4">DR. COHEN</p>
          <h1 className="font-bold text-[clamp(32px,5vw,56px)] leading-[0.95] text-brand-ink tracking-tight uppercase">ABOUT</h1>
        </div>
        <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">자연과 과학의 경계에서,<br/>닥터코헨의 이야기가 시작됩니다.</p>
      </div>

      <div className="flex px-10 border-b border-brand-stone/40">
        <button 
          onClick={() => setTab('story')}
          className={`px-8 py-6 text-[12px] tracking-[0.22em] uppercase transition-all cursor-none border-b-2 ${currentTab === 'story' ? 'text-brand-accent border-brand-accent' : 'text-brand-ink-light border-transparent'}`}
        >
          브랜드 스토리
        </button>
        <button 
          onClick={() => setTab('value')}
          className={`px-8 py-6 text-[12px] tracking-[0.22em] uppercase transition-all cursor-none border-b-2 ${currentTab === 'value' ? 'text-brand-accent border-brand-accent' : 'text-brand-ink-light border-transparent'}`}
        >
          핵심 가치
        </button>
      </div>

      <div className="p-10">
        {currentTab === 'story' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
              <div className="aspect-[3/2] overflow-hidden bg-brand-card border border-brand-stone/40">
                <img 
                  src="/story_main.png" 
                  className="w-full h-full object-cover opacity-90" 
                  alt="Brand Story"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="bg-brand-card p-12 flex flex-col justify-center gap-8 border border-brand-stone/40">
                <div>
                  <p className="text-[12px] tracking-[0.4em] uppercase text-brand-accent mb-4">BRAND STORY</p>
                  <h2 className="font-bold text-[clamp(28px,3vw,42px)] leading-tight text-brand-ink mb-6">닥터코헨<br/>브랜드 스토리</h2>
                  <p className="text-[15px] tracking-[0.04em] text-brand-ink-light leading-[1.8]">닥터코헨은 EGF를 발견한 스탠리 코헨 박사의 세포 성장 연구에서 영감을 받았습니다. 우리는 시간의 흐름에 따른 피부의 변화를 과학적으로 이해하고, 신뢰할 수 있는 원료와 첨단 기술을 결합하여 피부 본연의 건강을 되찾는 데 집중합니다.</p>
                </div>
                <p className="text-[15px] tracking-[0.04em] text-brand-ink-light leading-[1.8]">정밀한 피부 진단과 과학적인 처방을 통해 건강하고 아름다운 변화를 제안하며, 지속적인 피부 과학 연구를 바탕으로 '건강, 효능, 아름다움'의 가치를 실현합니다.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-12">
              <p className="text-[16px] tracking-[0.4em] uppercase text-brand-accent">CORE VALUES</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
              <ValueCard 
                image="/about_1.png"
                title="건강" 
                desc="안전한 성분과 전문가의 처방을 바탕으로 피부 건강과 면역력을 강화하는 신뢰할 수 있는 제품을 개발합니다." 
              />
              <ValueCard 
                image="/about_2.png"
                title="효능" 
                desc="엄격한 선별 과정을 거친 고효능 원료를 사용하여 빠른 흡수와 확실한 효과를 담아냅니다. 피부 과학 기술이 집약된 기능성으로 최상의 품질과 안티에이징 효과를 직접 경험하실 수 있습니다." 
              />
              <ValueCard 
                image="/about_3.png"
                title="아름다움" 
                desc="가장 빛나는 피부 상태를 회복하고 본연의 아름다움으로 돌아가게 합니다. 인위적이지 않고 오래 지속되는 자연스러운 아름다움을 추구합니다." 
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

const ValueCard = ({ image, title, desc }: { image: string, title: string, desc: string }) => (
  <div className="bg-brand-card p-12 border border-brand-stone/40 flex flex-col group">
    <div className="w-full aspect-[4/5] overflow-hidden mb-10">
      <img 
        src={image} 
        className="w-full h-full object-cover" 
        alt={title} 
        referrerPolicy="no-referrer" 
      />
    </div>
    <p className="text-[20px] font-bold tracking-[0.16em] uppercase text-brand-ink mb-6">{title}</p>
    <p className="text-[16px] tracking-[0.04em] text-brand-ink-light leading-[1.8]">{desc}</p>
  </div>
);

const News: React.FC<PageProps> = ({ onNewsClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="pt-[60px]"
  >
    <div className="px-10 pt-24 pb-16 border-b border-brand-stone/40 flex flex-col md:flex-row items-end justify-between gap-8">
      <div>
        <p className="text-[12px] tracking-[0.42em] uppercase text-brand-ink-light mb-4">DR. COHEN</p>
        <h1 className="font-bold text-[clamp(32px,5vw,56px)] leading-[0.95] text-brand-ink tracking-tight uppercase">COHEN NOTE</h1>
      </div>
      <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">피부 과학의 최전선에서,<br/>닥터코헨이 직접 전하는 연구 이야기.</p>
    </div>

    <div className="p-10 lg:p-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 border border-brand-stone/20">
        {NEWS_ARTICLES.slice(0, 3).map((article) => (
          <div 
            key={article.id}
            className="relative group overflow-hidden aspect-[3/4] border-r border-brand-stone/20 last:border-r-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
              <img 
                src={article.image} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                alt={article.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h2 className="text-[22px] lg:text-[26px] font-bold text-white leading-tight tracking-tight whitespace-pre-line">
                  {article.title}
                </h2>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => onNewsClick?.(article.id)}
                  className="bg-white text-brand-ink px-8 py-3 rounded-full text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-xl cursor-none"
                >
                  Read article
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </motion.div>
);

const NewsDetail: React.FC<PageProps> = ({ setPage, selectedNewsId }) => {
  const article = NEWS_ARTICLES.find(a => a.id === selectedNewsId);
  
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-[60px] bg-white"
    >
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={article.image} 
          className="w-full h-full object-cover" 
          alt={article.title}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[14px] tracking-[0.4em] uppercase mb-6"
          >
            {article.category}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-bold text-[clamp(32px,5vw,64px)] leading-tight tracking-tight max-w-4xl"
          >
            {article.title}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-10 py-24">
        <div className="flex items-center justify-between mb-20 pb-8 border-b border-brand-stone/20">
          <button 
            onClick={() => setPage?.('news')}
            className="text-[13px] tracking-[0.2em] uppercase text-brand-ink font-medium hover:text-brand-accent transition-colors cursor-none"
          >
            ← Back to notes
          </button>
          <p className="text-[13px] tracking-[0.1em] text-brand-stone">{article.date}</p>
        </div>

        <div className="flex flex-col gap-12 mb-32">
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-[18px] text-brand-ink-light leading-[2] tracking-[0.01em]">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related Section */}
        <div className="border-t border-brand-stone/20 pt-20">
          <h3 className="text-[24px] font-bold mb-12">Other Research Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {NEWS_ARTICLES.filter(a => a.id !== article.id).slice(0, 2).map(other => (
              <div 
                key={other.id} 
                onClick={() => setPage?.('news')} // Simplified for now
                className="group cursor-none"
              >
                <div className="aspect-video overflow-hidden mb-2">
                  <img src={other.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={other.title} referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-[18px] font-bold group-hover:text-brand-accent transition-colors">{other.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

const REVIEWS_DATA = [
  {
    "author": "ejw4*** — 한달사용",
    "tag": "선세럼",
    "text": "평소에 건성이라 촉촉선크림을 많이 사용하는데 이번에는 세럼처럼 사용하기좋더라구요 ㅎㅎ",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260316_106/1773656446404cShJM_JPEG/IMG_6675.jpeg"
  },
  {
    "author": "cand******** — 일반",
    "tag": "선세럼",
    "text": " 다른 선크림은 눈시리고 그 위에 화장을 하게 되면 밀리게 되는데 이 선세럼은 백탁 현상 없이 화장 전에 발라도 밀리지 않아요!! 발랐을 때 앰플 바르는 거처럼 엄청 가볍고 촉촉했어요!  시간이 지나도 답답함이나 끈적임이 거의 느껴지지 않아요 화장 전 선크림 찾으시는 분과 눈시림이 고민이신 분들에게 완전 추천이에요!!",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260208_107/1770505617664O2mVO_JPEG/IMG_0703.jpeg"
  },
  {
    "author": "blos******* — 일반",
    "tag": "선세럼",
    "text": "원래 내가 쓸라그랬는데 남편이 좋다고 뺐어감 백탁없고 세럼이라서 꾸덕하지않고 촉촉하게 펴발라져서 뭉침도 없고 완전 잘발린다! 일주일넘게 썼는데 자극도 ㄴㄴ  선크림바르는거 싫어하는 남자분들한테 짱일듯",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260203_248/1770097737392kGO4n_JPEG/KakaoTalk_20260203_144001520_08.jpg"
  },
  {
    "author": "4556*** — 일반",
    "tag": "선세럼",
    "text": "  요즘처럼 건조한 계절에는 선크림 하나만 잘못 발라도 화장이 바로 들뜨더라고요. 특히 유기자차는 눈시림 때문에 항상 조심해서 골랐는데, 닥터코엔 히알루 시카 워터리 선세럼은 불편함이 없어서 만족스러웠어요!!  제형은 정말 가벼운 세럼 타입이에요. 손에 덜었을 때 묽고 촉촉한 느낌이라 피부에 올리면 부드럽게 잘 펴 발리고, 끈적임 없이 빠르게 흡수돼요. 백탁도 없어서 바르고 나서 얼굴이 하얘 보이거나 뜨는 느낌도 없었고요. 향은 거의 느껴지지 않는 정도라 예민한 분들도 부담 없을 것 같아요✨  바르고 나면 겉은 산뜻한데 속은 촉촉하게 유지돼서 아침에 메이크업 전에 바르기 딱 좋았어요. 저는 요즘 메이크업 베이스 대신 이 선세럼 하나만 바르고 화장하는데, 들뜨는 느낌 없이 잘 올라가서 손이 자주 가요懶",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260201_156/17699137939132Gd7H_JPEG/IMG_6470.jpeg"
  },
  {
    "author": "wkd7*** — 일반",
    "tag": "선세럼",
    "text": "화장잘먹는 선크림으로 추천드려용!  메이크업 좋아하시는 분들이라면 '화잘먹(화장이 잘 먹는)' 템의 소중함을 아실 거예요. 화잘먹선세럼으로 유명한 이유를 직접 써보니 알겠더라고요.殺 ​ 피부 요철을 수분으로 촘촘하게 메워주는 느낌이라, 그 위에 파운데이션을 올리면 은은한 광채가 올라와요. 인위적인 기름광이 아니라 건강해 보이는 수분광이라 피부 컨디션이 정말 좋아 보여요. 오후가 되어도 다크닝이나 들뜸 없이 화장이 짱짱하게 유지되는 걸 보고 감탄했답니다. 추천합니다!",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260131_188/176987027526443ypz_JPEG/IMG_9588.jpeg"
  },
  {
    "author": "thdg***** — 일반",
    "tag": "선세럼",
    "text": "백탁현상도없고 촉촉하니 넘 좋아여 ㅎㅎ",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260131_81/1769867888890mVc4c_JPEG/IMG_2719.jpeg"
  },
  {
    "author": "sson******* — 일반",
    "tag": "선세럼",
    "text": "백탁없고 촉촉하게 잘 발려요",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260128_26/1769596282234HJeXx_GIF/1000121342.gif"
  },
  {
    "author": "ejw4*** — 일반",
    "tag": "선세럼",
    "text": " 평소에 선크림만 바르면 밀리고 백탁현상이 심해서 촉촉하고 저와같은 여드름피부에도 사용할 수 있는 선크림이 없을까 찾아보다가 닥터코헨 선세럼을 알게되었습니다  피부가 복합성이라 민감한 편인데도 눈시림 없이 사용가능하고 무엇보다 마무리감이 촉턱해서 메이크업 기초베이스로 쓰기 좋은 것 같아요! 아무래도 시카성분이 들어가 있다보니 항염에도 도움이 되어서 여드름피부에도 부담없이 바를 수 있을 것 같습니다 ㅎㅎ 다쓰면 또 주문해놔야겠어요",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260128_234/1769526880805cNd0h_JPEG/output_326077539.jpeg"
  },
  {
    "author": "kimy******** — 일반",
    "tag": "선세럼",
    "text": "겨울철이면 항상 피부가 예민해지고, 화장할 때 들뜨는 게 너무 신경 쓰이더라고요 하지만 닥터코헨 히알루 시카 워터리 선세럼은 히알루론산과 뮤신 성분이 들어있어서 그런지, 바르는 순간부터 피부가 촉촉하게 가라앉는 느낌이에요. 유기자차 특유의 자극이 전혀 없어서, 민감한 피부인 저도 전혀 붉어지거나 따가운 느낌 없이 사용할 수 있었어요.",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260127_143/1769516249689rsuLq_JPEG/IMGEFBCBF4955.jpg"
  },
  {
    "author": "jsy8****** — 일반",
    "tag": "선세럼",
    "text": " 발림성이 너무 좋아요 이런 제품 잘못 구입하면 엄청 끈적거리는데, 끈적거림이 전혀 없구요 가볍게 외출할 때는 요고 하나만 바르고 나가도 딱입니다 자극도 적어서 피부가 예민하신 분들도 편하게 사용하실 수 있구요 세럼처럼 가벼운 텍스쳐도 만족스럽습니다",
    "image": "https://phinf.pstatic.net/checkout.phinf/20260127_163/17694986422672bqkp_JPEG/20260127_133034.jpg"
  },
  {
    "author": "vh**** — 일반",
    "tag": "선세럼",
    "text": "요즘 딸이 화장을 하고 싶어하더라고요. 중학생 딸을 둔 엄마로서 요즘 가장 신경 쓰이는 것 중 하나가 바로 자외선 차단이에요.예전엔 선크림을 챙겨 바르는 게 어른들 이야기 같았는데, 요즘은 중학생들도 체육활동, 하교길, 학원 이동 등으로 햇볕에 노출되는 시간이 꽤 길더라고요.아무 선크림이나 바르게 할 수는 없잖아요. 중1 딸 피부는 아직 많이 여리고, 조금만 안 맞아도 바로 트러물이 올라오는 예민한 피부라 성분, 사용감, 자극 여부를 가장 중요하게 봤어요.아침 메이크업 전에 사용해보니 선세럼이라는 이름이 왜 붙었는지 바로 이해가 됐어요. 피부에 수분감을 채워주면서 파운데이션이 밀리지 않고 화장이 훨씬 얇고 깔끔하게 올라가요. 특히알루론산과 뮤신 성분이 함유되어 있어서 그 건조한 날에도 속당김이 덜했고 오후가 되어도 화장 들뜸이 확실히 줄어든게 느껴졌어요.",
    "image": "https://phinf.pstatic.net/image.nmv/shopnbuyer_2026_01_26_2726/Q2sp3s32Ts_03.jpg"
  },
  {
    "author": "8132*** — 한달사용",
    "tag": "선세럼",
    "text": "최고에요 진짜 좋네요",
    "image": "/review_sun.png"
  },
  {
    "author": "h2**** — 한달사용",
    "tag": "선세럼",
    "text": "완전 좋아요 굿이에요",
    "image": "/sunmain.png"
  },
  {
    "author": "2236*** — 한달사용",
    "tag": "선세럼",
    "text": "생각보다 좋은거같아요",
    "image": "/review_sun.png"
  },
  {
    "author": "rlqu******** — 한달사용",
    "tag": "선세럼",
    "text": "부드럽게 발리는게좋아용",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250827_213/17563047211091n4a9_JPEG/1756304698881.jpg"
  },
  {
    "author": "chai****** — 한달사용",
    "tag": "선세럼",
    "text": "부드럽게잘발리네요 ㅎㅎ",
    "image": "/sunmain.png"
  },
  {
    "author": "sme1*** — 한달사용",
    "tag": "선세럼",
    "text": "여름에 땀이랑 섞이는 데도 가볍고 좋아요",
    "image": "/review_sun.png"
  },
  {
    "author": "gkst****** — 한달사용",
    "tag": "선세럼",
    "text": "잘 사용중이에요 피부에 잘맞아요",
    "image": "/sunmain.png"
  },
  {
    "author": "mimi**** — 한달사용",
    "tag": "선세럼",
    "text": "여름내내 잘 사용하고 있어요",
    "image": "/review_sun.png"
  },
  {
    "author": "l987**** — 한달사용",
    "tag": "선세럼",
    "text": "좋아요 잘쓰고있어요",
    "image": "/sunmain.png"
  },
  {
    "author": "wkdw**** — 한달사용",
    "tag": "선세럼",
    "text": "잘 쓰는중입니다ㅎㅎ",
    "image": "/review_sun.png"
  },
  {
    "author": "op**** — 한달사용",
    "tag": "선세럼",
    "text": "끈적임 없고 흡수빠르고 무엇보다 답답함이 없습니다. 피부에 잘 맞아요.",
    "image": "/sunmain.png"
  },
  {
    "author": "colo***** — 일반",
    "tag": "선세럼",
    "text": "민감한 피부라서 걱정이 되었는데 자극 없이 잘 사용하고 있습니다!!! 타사 제품보다 훨씬 보호가 잘되어서 이제는 이거만 사용할꺼 같아요~  배송도 매우 빠르고 좋았어요!!",
    "image": "/review_sun.png"
  },
  {
    "author": "jshy**** — 일반",
    "tag": "선세럼",
    "text": "평소 선크림 바르고 나면 피부가 답답하고 끈적여서 늘 고민이었는데 수분감 가득한 제형이라 바르는 순간 촉촉하게 스며들고 끈적임, 백탁 현상도 없고 민감성인 제 피부에도 자극 없이 잘 맞아서 다 쓰면 재구매할게요 ^^ 빠른 배송 감사합니다",
    "image": "/sunmain.png"
  },
  {
    "author": "jb**** — 일반",
    "tag": "선세럼",
    "text": "아버지가 야외활동을 많이 하셔서 선크림을 꼭 챙겨 바르시는데 선스틱은 진짜 너무 금방 닳아서 불편하고 크림타입은 항상 끈적이는거 때문에 발림성 좋고 마무리감 좋은거 찾아서 구매하는데 요거 써보시고 좋다고 하시네요",
    "image": "/review_sun.png"
  },
  {
    "author": "pkh5*** — 일반",
    "tag": "선세럼",
    "text": "1년내내 자외선 차단제를 사용하는데 같은 제품을 사용해도 여름이 되니까 트러블이 생기더라구요. 안바르자니 피부가 자외선이 노출되니까 순한 제품으로 알아보다 닥터코헨 시카 선세럼으로 주문했어요. 열흘정도 사용하고 있는데 이제품으로 바꾸고  나서는 신기하게 트러블이 안올라오네요ㅎㅎ",
    "image": "/sunmain.png"
  },
  {
    "author": "h2**** — 일반",
    "tag": "선세럼",
    "text": "백탁이 되지않아서 좋고 엄청 촉촉하다는게 이 제품의 큰 장점인거같아요 잘 사용해볼게여 ㅎㅎ 추천합니다",
    "image": "/review_sun.png"
  },
  {
    "author": "hhs2*** — 일반",
    "tag": "선세럼",
    "text": "완전 촉촉하고 되게 좋아요!  매일 꾸준히 바르고 있는데 성분이 순해서 믿고 구매해도 될거같은 제품이네요",
    "image": "/sunmain.png"
  },
  {
    "author": "heer**** — 일반",
    "tag": "선세럼",
    "text": "자외선차단지수도 만족스럽고 발림성도 부드럽게 잘 발리는거 같아서 진짜 좋아요. 진작 구매할걸 그랬어요",
    "image": "/review_sun.png"
  },
  {
    "author": "2236*** — 일반",
    "tag": "선세럼",
    "text": "저렴한 가격에 구입하게되서 좋은거같아요 품질은 뛰어난데 가격은 저렴해서 더 좋은거같아요 빠른배송 감사합니다",
    "image": "/sunmain.png"
  },
  {
    "author": "sicg**** — 일반",
    "tag": "선세럼",
    "text": "자외선 차단 효과가 우수하면서도 피부에 자극이 없어 아주 만족스럽습니다. 끈적이지 않고 가볍게 발리며, 수분감이 풍부해 바른 후에도 피부가 편안합니다. 시카 성분이 포함되어 있어 예민한 날에도 안심하고 사용할 수 있었고, 백탁 현상도 전혀 없었습니다. 매일 외출 전 마지막 단계로 잘 사용하고 있습니다.",
    "image": "/review_sun.png"
  },
  {
    "author": "shda*** — 일반",
    "tag": "선세럼",
    "text": "선세럼이라길래 궁금해서 써봤는데 이거 진짜 물건이에요☀️ 스킨케어랑 선크림이 한 번에 끝나니까 바쁠 때 너무 좋아요ㅎㅎ 끈적임도 없고 수분감 짱이라 화장 전에 발라도 밀리지 않아요! 촉촉하면서 쿨링감도 살짝 있어서 여름에 완전 찰떡템이에요",
    "image": "/sunmain.png"
  },
  {
    "author": "wook**** — 일반",
    "tag": "선세럼",
    "text": "선세럼이 부드럽게 바를수 있어요  번들거림도 없고 끈적임도 없어요  백탁이 없이 피부에 잘 스며들어서 좋아요  수분감도 충분해서 사용하기에 편해요  강추입니다",
    "image": "/review_sun.png"
  },
  {
    "author": "gkst****** — 일반",
    "tag": "선세럼",
    "text": "여름이라 이것저것 바르기 귀찮아도 선크림은 꼭 바르는데 이렇게 촉촉한 선크림 바르니 좋네요!! 산뜻하게 마무리돼서 화장 덧발라도 밀리는것도없어요~~ 가격대도 적당하고 피부도 자극없고 오히려 수분감있으니 진정되는 느낌입니다~~",
    "image": "/sunmain.png"
  },
  {
    "author": "eld1*** — 일반",
    "tag": "선세럼",
    "text": "워터리해서 여름에 쓰기 좋은 선세럼이네요 끈적임도 없고 시카함유로 진정효과도 있어서 열감 올라오는 요즘 딱이예요. 가격도 저렴한편이라 데일리로 쓰기에 좋아요",
    "image": "/review_sun.png"
  },
  {
    "author": "wwww**** — 일반",
    "tag": "선세럼",
    "text": "백탁없고 피부 좋아보여요 이걸로걍 끝 데일리로 쓰기 딱입니당 가볍게 발리니 답답한거 없이 촉촉함 짱",
    "image": "/sunmain.png"
  },
  {
    "author": "call***** — 일반",
    "tag": "선세럼",
    "text": "수분감많은 텍스쳐라서 듬뿍듬뿍 발라도 끈적임없이 촉촉해요. 많이 발라도 밀림없고, 성분도 좋은거같아요.",
    "image": "/review_sun.png"
  },
  {
    "author": "rlqu******** — 일반",
    "tag": "선세럼",
    "text": "일상적인 선케어는 물론이고 메이크업 전 베이스로도 적합하면서 휴대가 간편해서 사용하기 편해요~ 피부에 부드럽게 발리고 끈적임이 없어서 만족스럽게 사용하고 있어요ㅎㅎ",
    "image": "/sunmain.png"
  },
  {
    "author": "nm**** — 일반",
    "tag": "선세럼",
    "text": "여름에 이것저것 덧바르면 오히려 흡수 안되고 답답한 느낌이라 선세럼으로 사서 선크림 세럼 한번에 해결하자 라는 생각으로 샀는데 너무 편합니다~ 얇게 발리는데 수분감은 충분해서 좋아요 자외선 차단도 잘되고요!",
    "image": "/review_sun.png"
  },
  {
    "author": "gml9*** — 일반",
    "tag": "선세럼",
    "text": "산뜻한 사용감이 제일 만족스러운 선케어제품입니다. 발림성, 사용감, 가격, 피부에 자극 등 모든 방면에서 아쉬움이 없어요.",
    "image": "/sunmain.png"
  },
  {
    "author": "8132*** — 일반",
    "tag": "선세럼",
    "text": "선세럼이 촉촉하고 건조하지않아 좋네요 배송속도도 빠르게와서 좋았고 포장도 아주 꼼꼼하게 왔습니다 ㅎㅎ",
    "image": "/review_sun.png"
  },
  {
    "author": "kask****** — 일반",
    "tag": "선세럼",
    "text": "솔직히 선크림은 끈적임 떄문에 바르기 꺼려졌는데 이제품은 좀 다르네요!! 세럼처럼 묽은 제형이라 피부에 닿자마자 시원하게 발리고 흡수도 엄청 빨라서 놀랐어요 선크림 특유의 답답함이나 끈적임이 1도 없어서 바른 건지도 모를 정도에요 햇볕 아래 오래 있어도 피부가 편안하고 촉촉함이 오래 유지돼서 건조함도 잘 안느껴졌어요 진정 효과까지 있는 것 같아 제 피부엔 인생템 등극입니다!!",
    "image": "/sunmain.png"
  },
  {
    "author": "love******** — 일반",
    "tag": "선세럼",
    "text": "끈적임 없이 촉촉하게 스며드는 시카 워터리 선세럼으로 아침마다 자연광 아래에서도 피부안심 셀카타임! 끈적임 전혀 없는 수분 선세럼 제형이라 바르고 나면 보송한데 촉촉함은 그대로!   시카 콤플렉스로 피부 진정·수분 케어까지 동시에 만족해요.  메이크업 베이스로도 활용 가능!  백탁 없이 데일리로 사용해요. 얼굴에 톡톡 마사지하듯 바르면 끈적임 없이 스르륵 스며들고, 아침에 바르고 나면 하루 종일 피부가 촉촉하게 유지돼요. 무엇보다 바른 직후에도 화장 지속력에 방해되지 않아 파운데이션도 깨끗하게 발려서 메이크업이 숨어들지 않더라고요. 화장 후 야외에서 햇빛을 많이 받아도 따가움 없이 편안했고,저녁에 셀카 찍으면 피부톤 정리된 느낌에 자신감이 생겼어요. 부결도 부드러워졌다는 칭찬을 받아서 기분 좋더라고요!",
    "image": "/review_sun.png"
  },
  {
    "author": "jako***** — 일반",
    "tag": "선세럼",
    "text": "이걸 왜 이제알았을까요ㅠㅠㅠ 썬크림 바르면 피부도 너무 답답하고 하얗게 뜨는느낌에 기름진느낌도 싫어서 잘안바르고 다녔는데 이건 그냥 크림바르는 느낌에 흡수도 빠르고 엄청 촉촉해요!!! 백탁현상도 없고 끈적임도 없어서 매일 데일리로 바르기 너무 좋아요♡",
    "image": "/sunmain.png"
  },
  {
    "author": "msoo**** — 일반",
    "tag": "선세럼",
    "text": "선크림 열심히 바른덕에 아직 안탔어요! 수분크림같은 가벼운 사용감으로 발림성도 좋고, 시카성분으로 따가운 햇볕에 자극받은  피부를 진정시켜줘서 아직까지 피부컨디션이 좋아요ㅎㅎ",
    "image": "/review_sun.png"
  },
  {
    "author": "sme1*** — 일반",
    "tag": "선세럼",
    "text": "데일리선크림으로 추천드립니다! 백탁없고 엄청 가볍게 발리니까  제대로 흡수시키지 않아도 되니 너무 좋아요 그리고 워터링제형으로 가벼워서 여름에도 발라도 끈적거림, 무거움, 답답함이 느껴지지 않습니당",
    "image": "/sunmain.png"
  },
  {
    "author": "dltl***** — 일반",
    "tag": "선세럼",
    "text": "배송도빠르고 물건도아주조아요 포장도 꼼꼼하게 잘되서오고 굉장히 만족합니다 촉촉하게산뜻하게스며들어 오래유지되니 보습감도 맘에들어요 선세럼이라 여러가지안발라도부드럽고조아요",
    "image": "/review_sun.png"
  },
  {
    "author": "jiye**** — 일반",
    "tag": "선세럼",
    "text": "아침에 이거 하나만 바르면 끝이라 너무 편해요 스킨케어 겸 선케어라서 준비시간도 단축되고 넘 좋네요",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250710_89/1752118862567wxI5G_JPEG/tttttt.jpg"
  },
  {
    "author": "vs**** — 일반",
    "tag": "선세럼",
    "text": "발림이 진짜 세럼 같아요 가볍고 끈적임 없이 스르르 퍼져서  여름에도 부담 없어요",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250710_299/1752111504435k5MhU_JPEG/afaf.jpg"
  },
  {
    "author": "minj****** — 일반",
    "tag": "선세럼",
    "text": "촉촉하고 발림성이 부드러워요!! 무기자차 선크림이 무조건 좋은줄알고 썼는데 그것도 아니었네요. 예민한 피부인데도 트러블없이 잘 맞아요.",
    "image": "/sunmain.png"
  },
  {
    "author": "mimi**** — 일반",
    "tag": "선세럼",
    "text": "촉촉하게 부드럽게 잘 발라지고 백탁없이 좋아서 잘 바르고 있어요  피부 진정에도 아주 좋아서 만족이에요 ~ 배송도 빠르고 좋아요 ~",
    "image": "/review_sun.png"
  },
  {
    "author": "kt**** — 일반",
    "tag": "선세럼",
    "text": "피부가 예민한편인데 사용해보니 다른 선크림들과  다르게 순하네요~ 촉촉하고 번들거림이 없어서 얼굴이 편해요! 발림성도 좋고 백탁도 없어서 바르면 가볍고 산뜻한 느낌이 드네요~! 트러블도 없어서 잘 사용하고 있어요~",
    "image": "/sunmain.png"
  },
  {
    "author": "dnjf***** — 일반",
    "tag": "선세럼",
    "text": "좋습니다. 피부 한번 예민해져서 원래 바르던 선크림도 잘 맞지 않고 예민한 편이었는데 이거 사용하면서 정말 많이 도움받고 있어요. 뭐만 발라도 따갑고 가렵던 증상 없이 편안하고 세럼 느낌이라 촉촉해요",
    "image": "/review_sun.png"
  },
  {
    "author": "l987**** — 일반",
    "tag": "선세럼",
    "text": "끈적임이 전혀 없어서 여름철에 사용하기 딱 좋고, 흡수도 빨라서 마치 스킨케어 바르는 느낌이었습니다. 수분감도 충분해서 건조함 없이 촉촉함이 오래 유지됐고, **SPF50+/PA4+**의 강력한 자외선 차단 효과까지 있어서 안심하고 야외 활동을 즐길 수 있었네요. 민감성 피부에도 자극 없이 편안해서 데일리 선케어로 정말 만족스러웠습니다!",
    "image": "/sunmain.png"
  },
  {
    "author": "dlst****** — 일반",
    "tag": "선세럼",
    "text": "제형이 끈적이지 않고 좋네요. 발림성도 부드럽고 흡수 빨라요. 좋은 제품 감사합니다.",
    "image": "/review_sun.png"
  },
  {
    "author": "kims********* — 일반",
    "tag": "선세럼",
    "text": "백탁업고 눈 안따갑구 데일리로 매일 바를 수 있어서 좋아요 로션제형보다 묽어서 덧발라도 답답하지 않아요",
    "image": "/sunmain.png"
  },
  {
    "author": "wkdw**** — 일반",
    "tag": "선세럼",
    "text": "선크림인데 세럼형식이라 선크림처럼 묵직한 느낌이 없어서 좋네요ㅎㅎ 촉촉하고 수분감도 적당해서 잘 발리고 느낌도 좋고 편안해요",
    "image": "/review_sun.png"
  },
  {
    "author": "ogb6*** — 일반",
    "tag": "선세럼",
    "text": "워터리한 제형이라서 건조함 없이 촉촉하게 마무리돼요 정말 수분 세럼을 따로 안 써도 될 정도예요ㅋㅋ",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250709_30/1752036313357FtDBs_JPEG/3333333332.jpg"
  },
  {
    "author": "mang**** — 일반",
    "tag": "선세럼",
    "text": "튜브형이라 휴대도 간편하고 양 조절도 쉬워요 가방에 쏙 넣고 다니면서 수시로 바르고 있어요",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250709_140/1752031855896iX1Yk_JPEG/2.jpg"
  },
  {
    "author": "fres**** — 일반",
    "tag": "선세럼",
    "text": "트러블 날까 봐 걱정했는데 전혀 자극 없고 민감한 날에도 안심하고 쓰고 있어요 저자극 인증이 괜히 있는게 아니네요",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250708_248/1751970441352v5TEy_JPEG/KakaoTalk_20250630_092632909.jpg"
  },
  {
    "author": "xx_x*** — 일반",
    "tag": "선세럼",
    "text": "요즘 최애 선세럼임.. 피부가 건조한편이라서 선크림도 항상 좀 촉촉한 타입으로 사는편인데 이게 딱 그래요 촉촉한 수분감 많은 타입이라서 너무 좋아요..대만족",
    "image": "/sunmain.png"
  },
  {
    "author": "l0ve****** — 일반",
    "tag": "선세럼",
    "text": "끈적끈적 거리는거 극혐인데 이거는 아주 프레쉬 하면서도 끈적임 없이 깔끔하게 발라지니까는 좋아요 들뜨거나 겉돌지않구요. 요즘 이것만 손이 가네요 배송도 빨리 왔어요^^",
    "image": "/review_sun.png"
  },
  {
    "author": "gkdu****** — 일반",
    "tag": "선세럼",
    "text": "부드럽개 잘발리니까 선크림보다 훨씬 낫네요. 진작에 살걸 그랬어요. 다쓰면 또 구매하려구요!!",
    "image": "/sunmain.png"
  },
  {
    "author": "rlaq******** — 일반",
    "tag": "선세럼",
    "text": "촉촉한데 전혀 끈적이지 않아서 바르는 순간부터 기분 좋은 선세럼이에요. 히알루론산 + 시카 조합 덕분에 피부 진정 & 보습 둘 다 챙길 수 있어서 요즘엔 아침 스킨케어 마지막 단계에 꼭 바르게 되더라구요. 강한 자외선 차단력에 부담 없는 사용감까지, 지복합성 피부도 만족할 제품이에요 ☀️",
    "image": "/review_sun.png"
  },
  {
    "author": "dol0*** — 일반",
    "tag": "선세럼",
    "text": "피부 보호와 수분 공급을 동시에! 저는 피부가 건조하고 민감해서 수분 공급이 중요한데, 닥터코헨 히알루 시카 워터리 선세럼이 딱 맞는 제품이에요. 끈적임이 없고 산뜻하게 발리면서도 피부에 충분한 수분을 공급해줍니다. 시카 성분이 피부를 진정시키는 데 도움을 주고, 히알루론산이 피부 깊숙이 수분을 채워줘서 피부가 촉촉하고 건강하게 유지됩니다. SPF50+/PA++++로 강력한 자외선 차단 효과도 기대 이상이고, 피부에 자극 없이 부드럽게 발리기 때문에 민감한 피부도 걱정 없이 사용할 수 있어요. 매일 아침과 외출 전 꼭 사용하는데, 피부가 한층 더 밝아지고 건강해진 느낌입니다. 가볍고 산뜻한 선케어를 찾는 분들께 강력 추천드려요.",
    "image": "/sunmain.png"
  },
  {
    "author": "sol6*** — 일반",
    "tag": "선세럼",
    "text": "끈적임 없이 가볍고 산뜻한 선세럼 저는 평소에 끈적임 없는 선케어 제품을 선호하는데, 닥터코헨 히알루 시카 워터리 선세럼이 딱 맞았어요. 발림성이 부드럽고 가볍기 때문에 피부에 빠르게 흡수되고, 끈적임 없이 산뜻하게 마무리됩니다. SPF50+/PA++++로 자외선 차단 효과도 뛰어나서 외출 전 꼭 바르고 나가는데, 피부가 답답하거나 무거운 느낌이 전혀 없어요. 특히 피부가 민감하거나 예민한 분들에게 추천드리고 싶어요. 피부에 자극 없이 진정 효과도 기대할 수 있어서, 피부가 예민한 날에도 안심하고 사용할 수 있습니다. 매일 아침 사용하는 습관이 생겼고, 피부가 한층 더 건강해진 느낌입니다.",
    "image": "/review_sun.png"
  },
  {
    "author": "nova****** — 일반",
    "tag": "선세럼",
    "text": "끈적임 없이 촉촉하게 발려서 여름에도 부담 없이 바를 수 있는 수분 진정 선세럼이에요!",
    "image": "/sunmain.png"
  },
  {
    "author": "jmjl*** — 일반",
    "tag": "선세럼",
    "text": "굉장히 촉촉하고 부드럽네요.  세럼과 선크림이 합해져 피부 보습은 물론이고 자외선으로부터 피부를 보호 백탁현상 일어나지 않고 피부에 흡수 잘되며 겉도는 현상이 없어 바르고 다른 메이크업 없이도 외출이 가능요. 수분크림 느낌에 가까운 촉촉한 제형이고 피부 자극없고 좋습니다.",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250701_23/1751350005116zeKPj_JPEG/1751349264288.jpg"
  },
  {
    "author": "op**** — 일반",
    "tag": "선세럼",
    "text": "지복합성 피부라 그런지 선크림을 바르면 답답하고 유분이 올라와 나중에는 얼굴이 망ㅠ 요 며칠 밖에 있는 시간이 많았는데 햇빚도 강하고 피부가 따가워 선제품을 안바름 안되겠더라고요. 산뜻한 타입을 찾아 구입했습니다.선세럼이라 촉촉하게 발리며 흡수도 빠르고~ 무엇보다 답답한 느낌이 1도 없어요. 굿굿 촉촉하게 수분은 잡아주고 자외선 차단까지~ 올여름 필수 기초템!!",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250701_92/1751348713126UBQkE_JPEG/1751348655613.jpg"
  },
  {
    "author": "mykb*** — 일반",
    "tag": "선세럼",
    "text": "요즘 같은 강한 햇빛에는 자외선 차단이 필수잖아요. 끈적이는 선크림이 너무 싫어서 워터리 제형을 찾다가 닥터코헨 히알루 시카 워터리 선세럼을 써봤어요!  제형은 정말 가볍고 수분감 가득한 에센스 타입이라 바르자마자 쏙 흡수되고 끈적임 0%! 유분기도 거의 느껴지지 않아서 지성 피부에도 찰떡이에요.  그리고 히알루론산 + 시카 성분 덕분에 진정 + 보습 효과도 확실히 느껴졌어요. 요즘 미세하게 올라오던 열감이 줄어든 느낌!  무기자차처럼 백탁도 없고, 메이크업 전에 발라도 밀림 없이 잘 먹어요. 가볍게 덧바르기도 좋고요 :)  피부 자극 테스트 완료된 제품이라 민감성인 저도 안심하고 사용할 수 있었어요.",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250630_146/1751245131242tXlkM_JPEG/IMG_1119.jpeg"
  },
  {
    "author": "chai****** — 일반",
    "tag": "선세럼",
    "text": "백탁이없어서 좋아요! 부드럽게 잘발리고 선세럼바르고 위에 한번 더 선쿠션으로 살짝 마무리하면 촉촉하고 자외선 차단도 이중으로 되니까 안심임ㅋㅋ 은은하게 광도 나고 만족~",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250630_22/1751243270314uCoQK_JPEG/EB84A4.jpg"
  },
  {
    "author": "gahe***** — 일반",
    "tag": "선세럼",
    "text": "촉촉하고 가볍게 발리는 워터리 제형의 선세럼이에요. SPF50+/PA++++의 강력한 자외선 차단은 물론, 히알루론산과 시카 성분이 들어 있어서 자극 없이 피부를 진정시켜줘요. 무엇보다 끈적임이 거의 없고, 흡수도 빨라 데일리 선케어로 부담 없이 쓸 수 있어요.  화장이 밀리거나 들뜨는 현상도 없어서 메이크업 전에 바르기에도 좋았고, 민감한 피부에도 자극 없이 잘 맞았어요. 향도 거의 없어 예민하신 분들도 무난하게 사용할 수 있을 듯합니다.",
    "image": "https://phinf.pstatic.net/checkout.phinf/20250630_94/175124508481918WYG_JPEG/IMG_1118.jpeg"
  },
  {
    "author": "your**** — 한달사용",
    "tag": "EGF 재생크림",
    "text": "피부가 예민한편인데 음 나쁘진 않아요",
    "image": "/review_cr.png"
  },
  {
    "author": "wwwl**** — 한달사용",
    "tag": "EGF 세럼",
    "text": "촉촉 좋아요 재구매각~!",
    "image": "/review_se.png"
  }
];

const Community: React.FC<PageProps> = () => {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 9;

  const filteredReviews = activeFilter === '전체' 
    ? REVIEWS_DATA 
    : activeFilter === 'EGF'
      ? REVIEWS_DATA.filter(review => review.tag === 'EGF 재생크림' || review.tag === 'EGF 세럼')
      : REVIEWS_DATA.filter(review => review.tag === activeFilter);

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-[60px]"
    >
      <div className="px-10 pt-24 pb-16 border-b border-brand-stone/40 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <p className="text-[12px] tracking-[0.42em] uppercase text-brand-ink-light mb-4">DR. COHEN</p>
          <h1 className="font-bold text-[clamp(32px,5vw,56px)] leading-[0.95] text-brand-ink tracking-tight uppercase">REVIEWS</h1>
        </div>
        <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">실제 사용자들이 전하는<br/>솔직한 피부 이야기.</p>
      </div>

      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-0.5">
          <StatCard num="4.9" label="평균 별점" />
          <StatCard num="368" label="전체 리뷰" />
          <StatCard num="98%" label="재구매 의사" />
        </div>

        <div className="pt-12">
          <div className="flex gap-4 mb-12 flex-wrap">
            {['전체', '선세럼', 'EGF'].map((f) => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 border border-brand-stone/40 text-[12px] tracking-[0.2em] uppercase transition-all cursor-none ${activeFilter === f ? 'bg-brand-accent text-brand-white border-brand-accent' : 'text-brand-ink-light hover:bg-brand-accent hover:text-brand-white hover:border-brand-accent'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20"
        >
          <AnimatePresence mode="popLayout">
            {paginatedReviews.map((review, idx) => (
              <motion.div
                key={`${review.author}-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ReviewCard 
                  author={review.author} 
                  tag={review.tag} 
                  text={review.text} 
                  image={review.image} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className={`w-10 h-10 border border-brand-stone/40 text-[12px] transition-all cursor-none ${currentPage === page ? 'bg-brand-ink text-brand-white border-brand-ink' : 'text-brand-ink-light hover:border-brand-accent'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

const StatCard = ({ num, label }: { num: string, label: string }) => (
  <div className="bg-brand-card py-10 px-12 border border-brand-stone/40">
    <p className="font-bold text-[clamp(40px,5vw,64px)] font-light text-brand-accent leading-none mb-4">{num}</p>
    <p className="text-[12px] tracking-[0.3em] uppercase text-brand-ink-light">{label}</p>
  </div>
);

// --- Main App ---

const ProductDetail: React.FC<PageProps> = ({ setPage, selectedProductId }) => {
  const product = PRODUCTS.find(p => p.id === selectedProductId);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-[60px] relative"
    >
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-12 right-12 z-[100] w-16 h-16 bg-brand-ink text-brand-white rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-accent transition-all cursor-none"
            aria-label="상단으로 이동"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto px-0 md:px-10 py-12 border-b border-brand-stone/40">
        <div className="px-10 md:px-0">
          <button 
            onClick={() => setPage?.('best')}
            className="text-[12px] tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none mb-12"
          >
            ← BEST로 돌아가기
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-12">
          <div className="flex items-start justify-center w-full lg:sticky lg:top-24">
            {product.image ? (
              <img 
                src={product.image} 
                className="w-full max-w-[500px] h-auto max-h-[85vh] object-contain" 
                alt={product.name} 
                referrerPolicy="no-referrer" 
              />
            ) : (
              <div className="bg-brand-card aspect-square w-full flex items-center justify-center p-24 border border-brand-stone/40">
                <svg viewBox="0 0 100 200" fill="none" className="h-[480px]">
                  <rect x="30" y="10" width="40" height="5" rx="2.5" fill="#C8C4B8"/>
                  <path d="M28 20 L25 180 Q25 188 50 188 Q75 188 75 180 L72 20Z" fill="#E0DDD6"/>
                  <text x="50" y="95" textAnchor="middle" fontFamily="serif" fontSize="6" fill="#2B3D2A" letterSpacing="1.5">DR. COHEN</text>
                  <text x="50" y="108" textAnchor="middle" fontFamily="sans-serif" fontSize="4" fill="#6B7D6A" letterSpacing="1">{product.line.includes('EGF') ? 'EGF' : 'SUN'}</text>
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-12 px-10 lg:px-0">
            <div>
              <p className="text-[12px] tracking-[0.3em] uppercase text-brand-accent mb-4">{product.line}</p>
              <h1 className="font-bold text-[clamp(40px,5vw,64px)] leading-tight text-brand-ink tracking-tight mb-6">{product.name}</h1>
              <p className="text-[16px] text-brand-ink-light leading-relaxed whitespace-pre-line">{product.desc}</p>
            </div>
            
            <div className="flex items-baseline gap-4 border-y border-brand-stone/40 py-8">
              <p className="text-[24px] tracking-[0.06em] text-brand-ink font-medium">₩ {product.price}</p>
              {product.originalPrice && <p className="text-[16px] text-brand-stone line-through">₩ {product.originalPrice}</p>}
              {product.discount && <p className="text-[16px] text-brand-accent font-semibold">{product.discount}</p>}
            </div>
            
            <div className="flex flex-col gap-6">
              <p className="text-[12px] tracking-[0.2em] uppercase text-brand-ink font-semibold">제품 상세 정보</p>
              <ul className="flex flex-col gap-4">
                {product.details.map((detail, i) => (
                  <li key={i} className="text-[16px] text-brand-ink-light flex gap-4">
                    <span className="text-brand-accent">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => {
                if (product.id === 'egf-cream') {
                  window.open('https://smartstore.naver.com/drcohen/products/10100254748', '_blank', 'noopener,noreferrer');
                } else if (product.id === 'egf-serum') {
                  window.open('https://smartstore.naver.com/drcohen/products/10100289480', '_blank', 'noopener,noreferrer');
                } else if (product.id === 'sun-serum') {
                  window.open('https://smartstore.naver.com/drcohen/products/11963043290', '_blank', 'noopener,noreferrer');
                }
              }}
              className="w-full py-6 bg-brand-ink text-brand-white text-[12px] tracking-[0.3em] uppercase hover:bg-brand-accent transition-all cursor-none mt-4"
            >
              {['egf-cream', 'egf-serum', 'sun-serum'].includes(product.id) ? '네이버에서 구매하기' : '장바구니 담기'}
            </button>
          </div>
        </div>

        {product.subImages && product.subImages.length > 0 && (
          <div className="mt-32 w-full flex flex-col items-center">
            {product.subImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                className="w-full max-w-[700px] h-auto" 
                alt={`${product.name} 상세 정보 ${index + 1}`} 
                referrerPolicy="no-referrer" 
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="max-w-7xl mx-auto px-10 py-24">
        <h3 className="font-bold text-[32px] mb-12 text-brand-ink">관련 리뷰</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-l-2 border-brand-accent pl-8 py-4">
            <p className="text-[16px] text-brand-ink mb-4">"피부 장벽이 튼튼해진 게 느껴져요. 인생 아이템입니다."</p>
            <p className="text-[12px] tracking-[0.1em] text-brand-ink-light uppercase">김*은 — Verified Buyer</p>
          </div>
          <div className="border-l-2 border-brand-accent pl-8 py-4">
            <p className="text-[16px] text-brand-ink mb-4">"자극 없이 투명하게 흡수되어서 너무 좋아요. 재구매 의사 200%입니다."</p>
            <p className="text-[12px] tracking-[0.1em] text-brand-ink-light uppercase">이*연 — Verified Buyer</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [bestTab, setBestTab] = useState<'egf' | 'sun'>('egf');
  const [aboutTab, setAboutTab] = useState<'story' | 'value'>('story');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedNewsId, setSelectedNewsId] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleNavBest = (tab: 'egf' | 'sun') => {
    setBestTab(tab);
    setPage('best');
  };

  const handleNavAbout = (tab: 'story' | 'value') => {
    setAboutTab(tab);
    setPage('about');
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setPage('product');
  };

  const handleNewsClick = (id: string) => {
    setSelectedNewsId(id);
    setPage('news-detail');
  };

  return (
    <div className="min-h-screen cursor-none overflow-visible">
      <CustomCursor />
      <Navbar activePage={page} setPage={setPage} handleNavBest={handleNavBest} handleNavAbout={handleNavAbout} />
      
      <main className="overflow-visible">
        <AnimatePresence mode="wait">
          {page === 'home' && <Home key="home" setPage={setPage} onProductClick={handleProductClick} />}
          {page === 'best' && <Best key="best" setPage={setPage} bestTab={bestTab} setBestTab={setBestTab} onProductClick={handleProductClick} />}
          {page === 'about' && <About key="about" setPage={setPage} aboutTab={aboutTab} setAboutTab={setAboutTab} />}
          {page === 'news' && <News key="news" setPage={setPage} onNewsClick={handleNewsClick} />}
          {page === 'community' && <Community key="community" setPage={setPage} />}
          {page === 'product' && <ProductDetail key="product" setPage={setPage} selectedProductId={selectedProductId} />}
          {page === 'news-detail' && <NewsDetail key="news-detail" setPage={setPage} selectedNewsId={selectedNewsId} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
