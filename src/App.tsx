import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Instagram, ArrowUp } from 'lucide-react';

// --- Types ---
type Page = 'home' | 'best' | 'about' | 'news' | 'community' | 'product' | 'news-detail';

interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image?: string;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'egf-regeneration',
    title: 'EGF는 어떻게 피부를 재생시키는가',
    date: '2025년 3월 12일',
    category: '연구노트 — 2025.03',
    excerpt: '표피세포성장인자(EGF)는 피부 세포 분열과 재생을 촉진하는 단백질입니다. 닥터코헨 연구팀이 3년간 추적한 EGF 안정화 기술의 모든 것을 공개합니다.',
    content: [
      '피부 재생의 핵심 성분인 EGF(Epidermal Growth Factor)는 1986년 노벨 생리의학상을 수상한 성분으로, 피부 세포의 성장을 돕고 손상된 피부 장벽을 복구하는 데 탁월한 효능을 보입니다.',
      '닥터코헨 연구소는 EGF의 효능을 극대화하기 위해 고농축 안정화 기술을 개발했습니다. 일반적인 EGF는 외부 환경에 매우 취약하여 쉽게 변질되지만, 닥터코헨만의 리포좀 공법을 통해 피부 깊숙이 안전하게 전달됩니다.',
      '3년간의 임상 시험 결과, 닥터코헨의 EGF 라인을 사용한 그룹에서 피부 탄력이 평균 24% 개선되었으며, 미세 주름이 눈에 띄게 완화되는 것을 확인했습니다.',
      '우리의 목표는 단순히 겉으로 보이는 변화가 아닌, 피부 본연의 힘을 길러주는 것입니다. 닥터코헨의 연구는 지금 이 순간에도 계속되고 있습니다.'
    ]
  },
  {
    id: 'sun-serum-evolution',
    title: '자외선 차단제의 진화 — 세럼 타입이 옳은 이유',
    date: '2025년 2월 24일',
    category: '연구노트',
    excerpt: '기존 선크림 대비 선세럼의 피부 흡수율과 체감 차이를 데이터로 분석했습니다.',
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
    category: '연구노트',
    excerpt: '동물성 원료 없이도 임상 효능을 유지하는 닥터코헨 비건 포뮬러의 개발 과정.',
    content: [
      '지속 가능한 아름다움을 위해 닥터코헨은 비건 포뮬러를 지향합니다. 하지만 비건 제품은 효능이 떨어진다는 편견이 있었습니다.',
      '우리는 식물 유래 단백질과 천연 추출물을 조합하여 동물성 원료를 대체하면서도 동일한, 혹은 그 이상의 효능을 내는 최적의 배합비를 찾아냈습니다.',
      '전 제품 이탈리아 V-LABEL 비건 인증을 획득하며 안전성과 윤리성을 동시에 입증했습니다.',
      '피부와 환경 모두에게 건강한 선택, 닥터코헨이 제안하는 새로운 뷰티 기준입니다.'
    ]
  },
  {
    id: 'sensitive-skin-guide',
    title: '민감성 피부를 위한 성분 선택 가이드',
    date: '2024년 12월 8일',
    category: '연구노트',
    excerpt: '어떤 성분이 민감한 피부를 자극하는지, 닥터코헨의 배제 성분 리스트와 그 이유.',
    content: [
      '민감성 피부는 아주 작은 자극에도 예민하게 반응합니다. 닥터코헨은 20가지 유해 성분을 배제한 클린 뷰티를 실천합니다.',
      '파라벤, 인공 향료, 인공 색소 등 피부 자극을 유발할 수 있는 성분을 철저히 배제하고, EWG 그린 등급의 성분만을 엄선하여 사용합니다.',
      '피부 자극 테스트 완료는 기본, 민감성 패널 테스트를 통해 실제 사용 시의 안전성을 한 번 더 검증합니다.',
      '당신의 피부가 편안하게 숨 쉴 수 있도록, 닥터코헨은 가장 순수한 성분만을 담습니다.'
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
    image: '/sun_main.png',
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
    desc: '닥터코헨 이지 액티브 플러스 프로틴 기미 크림 [EGF재생크림]',
    price: '48,000',
    originalPrice: '58,000',
    discount: '17%',
    image: '/cream_main.png',
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
    desc: '닥터코헨 이지 액티브 플러스 프로틴 기미 앰플 세럼 [EGF에센스]',
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

const Navbar = ({ activePage, setPage, handleNavBest }: { activePage: Page, setPage: (p: Page) => void, handleNavBest: (tab: 'egf' | 'sun') => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (p: Page) => {
    setPage(p);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-[80px] bg-brand-bg border-b border-brand-ink/10">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-2 w-24 cursor-none group z-[60] relative"
        >
          <span className={`block w-7 h-px bg-brand-ink transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5 bg-brand-accent' : 'group-hover:w-5 group-hover:bg-brand-accent'}`} />
          <span className={`block w-7 h-px bg-brand-ink transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'group-hover:w-8 group-hover:bg-brand-accent'}`} />
          <span className={`block w-7 h-px bg-brand-ink transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5 bg-brand-accent' : 'group-hover:w-5 group-hover:bg-brand-accent'}`} />
        </button>

        <ul className="absolute left-1/2 -translate-x-1/2 flex items-stretch h-full list-none hidden lg:flex">
          <NavItem label="Best" onClick={() => setPage('best')}>
            <Dropdown>
              <button onClick={() => handleNavBest('egf')} className="block w-full text-left px-8 py-4 text-[14px] tracking-[0.18em] uppercase text-brand-ink-light hover:text-brand-accent hover:bg-brand-card transition-colors cursor-none">EGF 라인</button>
              <button onClick={() => handleNavBest('sun')} className="block w-full text-left px-8 py-4 text-[14px] tracking-[0.18em] uppercase text-brand-ink-light hover:text-brand-accent hover:bg-brand-card transition-colors cursor-none">선세럼 라인</button>
            </Dropdown>
          </NavItem>
          <NavItem label="About" onClick={() => setPage('about')}>
            <Dropdown>
              <button onClick={() => setPage('about')} className="block w-full text-left px-8 py-4 text-[14px] tracking-[0.18em] uppercase text-brand-ink-light hover:text-brand-ink hover:bg-brand-bg transition-colors cursor-none">브랜드 스토리</button>
            </Dropdown>
          </NavItem>
          <li className="flex items-stretch">
            <button 
              onClick={() => setPage('home')}
              className="flex items-center px-8 font-serif text-[24px] font-normal tracking-[0.28em] text-brand-ink uppercase cursor-none whitespace-nowrap"
            >
              Dr. Cohen
            </button>
          </li>
          <NavItem label="News" onClick={() => setPage('news')}>
            <Dropdown>
              <button onClick={() => setPage('news')} className="block w-full text-left px-8 py-4 text-[14px] tracking-[0.18em] uppercase text-brand-ink-light hover:text-brand-ink hover:bg-brand-bg transition-colors cursor-none">연구 노트</button>
            </Dropdown>
          </NavItem>
          <NavItem label="Community" onClick={() => setPage('community')}>
            <Dropdown>
              <button onClick={() => setPage('community')} className="block w-full text-left px-8 py-4 text-[14px] tracking-[0.18em] uppercase text-brand-ink-light hover:text-brand-ink hover:bg-brand-bg transition-colors cursor-none">리뷰</button>
            </Dropdown>
          </NavItem>
        </ul>

        <div className="w-24 flex justify-end">
          <button 
            onClick={() => setPage('home')}
            className="lg:hidden font-serif text-[18px] font-normal tracking-[0.2em] text-brand-ink uppercase cursor-none whitespace-nowrap"
          >
            Dr. Cohen
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
                <button onClick={() => navigate('home')} className="font-serif text-[42px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">Home</button>
              </div>
              
              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('best')} className="font-serif text-[42px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">Best Item</button>
                <div className="flex gap-6 mt-1">
                  <button onClick={() => { handleNavBest('egf'); setIsMenuOpen(false); }} className="text-[11px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent cursor-none transition-colors">EGF 라인</button>
                  <button onClick={() => { handleNavBest('sun'); setIsMenuOpen(false); }} className="text-[11px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent cursor-none transition-colors">선세럼 라인</button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('about')} className="font-serif text-[48px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">About</button>
                <button onClick={() => navigate('about')} className="text-[12px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent text-left cursor-none transition-colors">브랜드 스토리</button>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('news')} className="font-serif text-[48px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">News</button>
                <button onClick={() => navigate('news')} className="text-[12px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent text-left cursor-none transition-colors">연구 노트</button>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={() => navigate('community')} className="font-serif text-[48px] tracking-widest uppercase text-brand-ink text-left cursor-none hover:text-brand-accent transition-colors">Community</button>
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
  <footer className="border-t border-brand-ink/10 px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
    <div className="flex items-center gap-12">
      <span className="font-serif text-[16px] tracking-[0.4em] uppercase text-brand-ink-light">Dr. Cohen</span>
      <a 
        href="https://www.instagram.com/dr.cohen_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-brand-stone hover:text-brand-accent transition-colors cursor-none"
      >
        <Instagram size={20} strokeWidth={1.5} />
      </a>
    </div>
    <div className="flex gap-12">
      <a href="#" className="text-[12px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent transition-colors cursor-none">개인정보처리방침</a>
      <a href="#" className="text-[12px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent transition-colors cursor-none">이용약관</a>
      <a 
        href="https://smartstore.naver.com/drcohen/qna?cp=1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[12px] tracking-[0.2em] uppercase text-brand-stone hover:text-brand-accent transition-colors cursor-none"
      >
        고객센터
      </a>
    </div>
    <span className="text-[12px] tracking-[0.15em] text-brand-stone uppercase">© 2025 DR. Cohen. All Rights Reserved.</span>
  </footer>
);

// --- Pages ---

const Home: React.FC<PageProps> = ({ setPage, onProductClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-0"
    >
      {/* Hero */}
      <section className="relative min-h-[700px] bg-brand-bg flex items-start justify-center px-4 pt-20 mb-12 overflow-hidden">
        {/* Atmospheric Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.1),transparent_70%)] pointer-events-none" />
        {/* Background Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 font-serif font-bold text-[17vw] md:text-[18vw] leading-none text-brand-ink select-none pointer-events-none tracking-tighter opacity-[0.08] md:opacity-[0.1] whitespace-nowrap z-0"
        >
          DR. COHEN
        </motion.h1>

        <div className="relative z-10 w-full max-w-6xl flex flex-col items-center justify-center">
          {/* Main Product Image */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-[280px] md:w-[420px] aspect-[4/5] flex items-center justify-center"
          >
            {/* Background Texture (cream2.png) */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              src="/cream2.png" 
              className="absolute w-[160%] h-[160%] max-w-none object-contain -z-10 opacity-90 pointer-events-none select-none" 
              alt="Cream Texture Background"
              referrerPolicy="no-referrer"
            />

            <img 
              src="/cream.png" 
              className="w-full h-full object-contain drop-shadow-2xl z-10" 
              alt="Dr. Cohen Hero Product"
              referrerPolicy="no-referrer"
            />

            {/* Texture/Splash element (optional, using a circle for abstract feel) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute -right-16 bottom-0 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl -z-10"
            />
          </motion.div>
        </div>

      </section>

      {/* Marquee */}
      <div className="border-y border-brand-ink/10 py-4 overflow-hidden bg-[#FDF2F2]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-[60px] pr-[60px]">
              <MarqueeItem text="피부 재생" />
              <MarqueeItem text="저자극" />
              <MarqueeItem text="유해성분 무첨가" />
              <MarqueeItem text="EGF" />
            </div>
          ))}
        </div>
      </div>

      {/* Best Items */}
      <section className="px-10 py-32 text-center bg-brand-card">
        <p className="text-[16px] tracking-[0.32em] uppercase text-brand-accent font-normal mb-4">DR. COHEN</p>
        <h2 className="font-serif text-[clamp(48px,8vw,80px)] font-normal leading-none text-brand-ink mb-6 tracking-tight">BEST ITEM</h2>
        <p className="text-[16px] tracking-[0.06em] text-brand-ink-light mb-16">닥터코헨이 자신 있게 선보이는 인기 제품들을 소개합니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <ProductCard category="SUN CARE" name="히알루 시카 워터리 선세럼, 50ml" price="15,000" originalPrice="25,000" discount="40%" image="/sun_main.png" onClick={() => onProductClick?.('sun-serum')} />
          <ProductCard category="EGF LINE" name="EGF 재생크림" price="48,000" originalPrice="58,000" discount="17%" image="/cream_main.png" onClick={() => onProductClick?.('egf-cream')} />
          <ProductCard category="EGF LINE" name="EGF 세럼" price="48,000" originalPrice="58,000" discount="17%" image="/serum_main.png" onClick={() => onProductClick?.('egf-serum')} />
        </div>
      </section>

      {/* Reviews */}
      <section className="px-10 pt-8 text-center">
        <p className="text-[16px] tracking-[0.32em] uppercase text-brand-accent font-normal mb-4">DR. COHEN</p>
        <h2 className="font-serif text-[clamp(48px,8vw,80px)] font-normal leading-none text-brand-ink mb-6 tracking-tight">REVIEW</h2>
        <p className="text-[16px] tracking-[0.06em] text-brand-ink-light mb-10">닥터코헨의 생생한 제품 후기를 확인해보세요.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5 -mx-10 relative">
          <ReviewCard 
            author="김지은 — 민감성 피부" 
            tag="EGF 재생크림" 
            text="자극 없이 투명하게 흡수되어서 너무 좋아요. 처음으로 제 피부에 맞는 재생크림을 찾았어요." 
            product="EGF 재생크림 · 3주 사용"
          />
          <ReviewCard 
            author="이수연 — 건성 피부" 
            tag="EGF 재생크림" 
            text="아침에 일어났을 때 피부가 촉촉해요. 더 이상 당기지 않아요." 
            product="EGF 재생크림 · 1개월 사용"
          />
          <ReviewCard 
            author="박민서 — 복합성 피부" 
            tag="히알루 시카 워터리 선세럼" 
            text="백탁 현상 없이 가벼워요. 데일리로 사용하기 딱 좋은 선세럼입니다." 
            product="히알루 시카 워터리 선세럼 · 2개월 사용"
          />
          <ReviewCard 
            author="최예린 — 지성 피부" 
            tag="EGF 세럼" 
            text="끈적임 없이 흡수력이 빨라요. 지성 피부에도 잘 맞습니다." 
            product="EGF 세럼 · 5주 사용"
          />
          <button 
            onClick={() => setPage('community')}
            className="absolute right-8 top-[42%] -translate-y-1/2 w-16 h-16 rounded-full bg-brand-accent text-brand-white flex items-center justify-center text-xl hover:scale-110 transition-all z-30 cursor-none"
          >
            →
          </button>
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
            className="w-16 h-16 rounded-full bg-brand-white/90 backdrop-blur-sm border border-brand-ink/5 flex items-center justify-center text-brand-ink hover:bg-brand-accent hover:text-brand-white transition-all hover:scale-110 cursor-none"
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

const ProductCard = ({ name, price, originalPrice, discount, image, onClick, category = "SKINCARE" }: { name: string, price: string, originalPrice?: string, discount?: string, image?: string, onClick?: () => void, category?: string }) => (
  <div 
    onClick={onClick}
    className="flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-700 cursor-none group border border-brand-ink/5"
  >
    {/* Top Label Area */}
    <div className="px-6 py-5 flex justify-between items-center bg-white">
      <span className="text-[12px] font-bold tracking-[0.15em] text-brand-ink uppercase">{category}</span>
      <span className="px-3 py-1 rounded-full bg-brand-accent/5 text-brand-accent text-[10px] font-bold tracking-widest uppercase">Best</span>
    </div>

    {/* Image Area */}
    <div className="aspect-square flex items-center justify-center w-full bg-white relative overflow-hidden">
      {image ? (
        <img src={image} className="h-[85%] w-[85%] object-contain group-hover:scale-110 transition-transform duration-1000 ease-out" alt={name} referrerPolicy="no-referrer" />
      ) : (
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <svg viewBox="0 0 100 200" fill="none" className="h-[60%]">
            <rect x="30" y="10" width="40" height="5" rx="2.5" fill="currentColor"/>
            <path d="M28 20 L25 180 Q25 188 50 188 Q75 188 75 180 L72 20Z" fill="currentColor"/>
          </svg>
        </div>
      )}
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/[0.02] transition-colors duration-700" />
    </div>

    {/* Bottom Info Area */}
    <div className="p-6 bg-white border-t border-brand-ink/5">
      <h3 className="text-[16px] font-medium text-brand-ink mb-2 line-clamp-1 tracking-tight">{name}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[18px] font-bold text-brand-ink">₩{price}</span>
          {originalPrice && <span className="text-[13px] text-brand-stone line-through opacity-40 italic">₩{originalPrice}</span>}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            <div className="w-3 h-3 rounded-full bg-brand-accent/20 border border-white" />
            <div className="w-3 h-3 rounded-full bg-brand-accent/40 border border-white" />
            <div className="w-3 h-3 rounded-full bg-brand-accent/60 border border-white" />
          </div>
          {discount && <span className="text-[13px] text-brand-accent font-bold tracking-tighter">{discount}</span>}
        </div>
      </div>
    </div>
  </div>
);

const ReviewCard = ({ author, tag, text, product }: { author: string, tag: string, text: string, product: string }) => (
  <div className="relative aspect-[3/4] overflow-hidden cursor-none group border border-brand-ink/5">
    <div className="absolute inset-0 bg-brand-card" />
    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 to-transparent to-50%" />
    <div className="absolute inset-0 flex items-center justify-center pb-24 opacity-[0.05]">
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="45" r="28" stroke="#000" strokeWidth="0.8"/>
        <circle cx="41" cy="43" r="2.8" stroke="#000" strokeWidth="0.7"/>
        <circle cx="59" cy="43" r="2.8" stroke="#000" strokeWidth="0.7"/>
        <path d="M42 55 C45 58 55 58 58 55" stroke="#000" strokeWidth="0.7" fill="none"/>
      </svg>
    </div>
    <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 transition-all duration-[480ms] group-hover:opacity-0 group-hover:-translate-y-4">
      <p className="text-[16px] tracking-[0.22em] uppercase text-brand-white/75 mb-4">{author}</p>
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(i => <span key={i} className="text-[16px] text-brand-accent">★</span>)}
      </div>
      <p className="text-[16px] tracking-[0.2em] uppercase text-brand-white/45">{tag}</p>
    </div>
    <div className="absolute inset-0 z-30 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[480ms] bg-brand-accent/95 flex flex-col justify-center items-start p-12">
      <div className="font-serif text-[80px] text-white/20 leading-[0.7] mb-6">"</div>
      <p className="font-serif text-[28px] font-light leading-relaxed text-white mb-8">{text}</p>
      <p className="text-[16px] tracking-[0.24em] uppercase text-white/80">{author.split(' — ')[0]}</p>
      <p className="text-[16px] tracking-[0.2em] uppercase text-white/60 mt-2">{product}</p>
    </div>
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
      <div className="px-10 pt-24 pb-16 border-b border-brand-ink/10 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <p className="text-[12px] tracking-[0.42em] uppercase text-brand-accent mb-4">DR. COHEN</p>
          <h1 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-[0.95] text-brand-ink tracking-tight">베스트<br/><span>아이템</span></h1>
        </div>
        <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">닥터코헨의 핵심 솔루션.<br/>피부 과학이 만들어낸 베스트 아이템을 만나보세요.</p>
      </div>

      <div className="flex px-10 border-b border-brand-ink/10">
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
              <BestItem line="EGF 라인" name="EGF 재생크림" desc="닥터코헨 이지 액티브 플러스 프로틴 기미 크림 [EGF재생크림]" price="48,000" originalPrice="58,000" discount="17%" image="/cream_main.png" onClick={() => onProductClick?.('egf-cream')} />
              <BestItem line="EGF 라인" name="EGF 세럼" desc="닥터코헨 이지 액티브 플러스 프로틴 기미 앰플 세럼 [EGF에센스]" price="48,000" originalPrice="58,000" discount="17%" image="/serum_main.png" onClick={() => onProductClick?.('egf-serum')} />
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <BestItem line="선세럼 라인" name="히알루 시카 워터리 선세럼" desc="닥터코헨 히알루 시카 워터리 선세럼 50ml 끈적임없는 수분 진정 선케어 SPF50+/PA4+" price="15,000" originalPrice="25,000" discount="40%" image="/sun_main.png" onClick={() => onProductClick?.('sun-serum')} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

const BestItem = ({ line, name, desc, price, originalPrice, discount, image, onClick }: { line: string, name: string, desc: string, price: string, originalPrice?: string, discount?: string, image?: string, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-700 cursor-none relative group border border-brand-ink/5"
  >
    {/* Top Label Area */}
    <div className="px-6 py-5 flex justify-between items-center bg-white">
      <span className="text-[12px] font-bold tracking-[0.15em] text-brand-ink uppercase">{line}</span>
      {discount && <span className="px-3 py-1 rounded-full bg-brand-accent text-white text-[10px] font-bold tracking-widest uppercase">{discount} OFF</span>}
    </div>

    {/* Image Area */}
    <div className="aspect-square flex items-center justify-center w-full bg-white relative overflow-hidden">
      {image ? (
        <img src={image} className="h-[85%] w-[85%] object-contain group-hover:scale-110 transition-transform duration-1000 ease-out" alt={name} referrerPolicy="no-referrer" />
      ) : (
        <div className="w-full h-full flex items-center justify-center opacity-10">
          <svg viewBox="0 0 100 200" fill="none" className="h-[60%]">
            <rect x="30" y="10" width="40" height="5" rx="2.5" fill="currentColor"/>
            <path d="M28 20 L25 180 Q25 188 50 188 Q75 188 75 180 L72 20Z" fill="currentColor"/>
          </svg>
        </div>
      )}
      <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/[0.02] transition-colors duration-700" />
    </div>

    {/* Bottom Info Area */}
    <div className="p-6 bg-white border-t border-brand-ink/5">
      <h3 className="text-[17px] font-medium text-brand-ink mb-1 line-clamp-1 tracking-tight">{name}</h3>
      <p className="text-[13px] text-brand-ink-light mb-5 line-clamp-2 h-10 leading-relaxed opacity-70">{desc}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[20px] font-bold text-brand-ink">₩{price}</span>
          {originalPrice && <span className="text-[14px] text-brand-stone line-through opacity-40 italic">₩{originalPrice}</span>}
        </div>
        <div className="flex -space-x-1.5">
          <div className="w-4 h-4 rounded-full bg-brand-accent/20 border-2 border-white shadow-sm" />
          <div className="w-4 h-4 rounded-full bg-brand-accent/40 border-2 border-white shadow-sm" />
          <div className="w-4 h-4 rounded-full bg-brand-accent/60 border-2 border-white shadow-sm" />
        </div>
      </div>
    </div>
  </div>
);

const About: React.FC<PageProps> = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="pt-[60px]"
  >
    <div className="px-10 pt-24 pb-16 border-b border-brand-stone/40 flex flex-col md:flex-row items-end justify-between gap-8">
      <div>
        <p className="text-[12px] tracking-[0.42em] uppercase text-brand-ink-light mb-4">DR. COHEN</p>
        <h1 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-[0.95] text-brand-ink tracking-tight">브랜드<br/><span>스토리</span></h1>
      </div>
      <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">자연과 과학의 경계에서,<br/>닥터코헨의 이야기가 시작됩니다.</p>
    </div>

    <div className="flex px-10 border-b border-brand-stone/40">
      <button className="px-8 py-6 text-[12px] tracking-[0.22em] uppercase text-brand-ink border-b-2 border-brand-ink cursor-none">브랜드 스토리</button>
    </div>

    <div className="p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
        <div className="aspect-[4/5] overflow-hidden bg-brand-card border border-brand-ink/5">
          <img 
            src="/story_main.png" 
            className="w-full h-full object-cover opacity-90" 
            alt="Brand Story"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="bg-brand-card p-16 flex flex-col justify-center gap-12 border border-brand-ink/5">
          <div>
            <p className="text-[12px] tracking-[0.4em] uppercase text-brand-accent mb-6">브랜드 스토리</p>
            <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-normal leading-tight text-brand-ink mb-8">닥터코헨<br/>브랜드 스토리</h2>
            <p className="text-[16px] tracking-[0.04em] text-brand-ink-light leading-[1.9]">닥터코헨은 EGF를 발견한 스탠리 코헨 박사의 세포 성장 연구에서 영감을 받았습니다. 우리는 시간의 흐름에 따른 피부의 변화를 과학적으로 이해하고, 신뢰할 수 있는 원료와 첨단 기술을 결합하여 피부 본연의 건강을 되찾는 데 집중합니다.</p>
          </div>
          <p className="text-[16px] tracking-[0.04em] text-brand-ink-light leading-[1.9]">정밀한 피부 진단과 과학적인 처방을 통해 건강하고 아름다운 변화를 제안하며, 지속적인 피부 과학 연구를 바탕으로 '건강, 효능, 아름다움'의 가치를 실현합니다.</p>
        </div>
      </div>

      <div className="mt-20 mb-12">
        <p className="text-[12px] tracking-[0.4em] uppercase text-brand-accent">핵심 가치</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        <ValueCard num="01" title="건강" desc="안전한 성분과 전문가의 처방을 바탕으로 피부 건강과 면역력을 강화하는 신뢰할 수 있는 제품을 개발합니다." />
        <ValueCard num="02" title="효능" desc="엄격한 선별 과정을 거친 고효능 원료를 사용하여 빠른 흡수와 확실한 효과를 담아냅니다. 피부 과학 기술이 집약된 기능성으로 최상의 품질과 안티에이징 효과를 직접 경험하실 수 있습니다." />
        <ValueCard num="03" title="아름다움" desc="가장 빛나는 피부 상태를 회복하고 본연의 아름다움으로 돌아가게 합니다. 인위적이지 않고 오래 지속되는 자연스러운 아름다움을 추구합니다." />
      </div>
    </div>
    <Footer />
  </motion.div>
);

const ValueCard = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="bg-brand-card p-12 border border-brand-ink/5">
    <div className="font-serif text-[80px] font-light text-brand-accent/10 leading-none mb-8">{num}</div>
    <p className="text-[20px] tracking-[0.16em] uppercase text-brand-ink mb-6">{title}</p>
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
        <h1 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-[0.95] text-brand-ink tracking-tight">연구<br/><span>노트</span></h1>
      </div>
      <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">피부 과학의 최전선에서,<br/>닥터코헨이 직접 전하는 연구 이야기.</p>
    </div>

    <div className="p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-0.5 mb-0.5">
        <div className="aspect-[16/10] bg-brand-card flex items-center justify-center relative overflow-hidden border border-brand-ink/5">
          <svg width="160" height="160" viewBox="0 0 300 280" fill="none" className="opacity-10">
            <path d="M20 260 C60 200 120 140 180 80 C220 40 260 20 280 30" stroke="#000" strokeWidth="2" fill="none"/>
            <ellipse cx="155" cy="100" rx="42" ry="22" transform="rotate(-40 155 100)" fill="#000"/>
            <ellipse cx="200" cy="70" rx="36" ry="18" transform="rotate(-50 200 70)" fill="#000" opacity="0.8"/>
          </svg>
        </div>
        <div className="bg-brand-card p-16 flex flex-col justify-between border border-brand-ink/5">
          <div>
            <p className="text-[16px] tracking-[0.38em] uppercase text-brand-accent mb-6">{NEWS_ARTICLES[0].category}</p>
            <h2 className="font-serif text-[40px] font-normal leading-[1.3] text-brand-ink mb-8">{NEWS_ARTICLES[0].title}</h2>
            <p className="text-[16px] tracking-[0.04em] text-brand-ink-light leading-[1.8] mb-12">{NEWS_ARTICLES[0].excerpt}</p>
          </div>
          <div>
            <p className="text-[14px] tracking-[0.22em] text-brand-stone">{NEWS_ARTICLES[0].date}</p>
            <button 
              onClick={() => onNewsClick?.(NEWS_ARTICLES[0].id)}
              className="mt-8 inline-flex items-center gap-4 text-[14px] tracking-[0.24em] uppercase text-brand-ink border-b border-brand-ink/25 pb-2 hover:text-brand-accent hover:border-brand-accent hover:gap-6 transition-all cursor-none"
            >
              더 보기 →
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {NEWS_ARTICLES.slice(1).map((article) => (
          <NewsCard 
            key={article.id}
            title={article.title} 
            date={article.date} 
            excerpt={article.excerpt} 
            onClick={() => onNewsClick?.(article.id)}
          />
        ))}
      </div>
    </div>
    <Footer />
  </motion.div>
);

const NewsCard: React.FC<{ title: string, date: string, excerpt: string, onClick?: () => void }> = ({ title, date, excerpt, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-brand-card hover:bg-brand-card2 transition-colors cursor-none overflow-hidden group border border-brand-ink/5"
  >
    <div className="aspect-[16/9] bg-brand-bg flex items-center justify-center overflow-hidden border-b border-brand-ink/5">
      <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="opacity-10">
        <circle cx="50" cy="50" r="35" stroke="#000" strokeWidth="2"/>
      </svg>
    </div>
    <div className="p-12">
      <p className="text-[16px] tracking-[0.38em] uppercase text-brand-accent mb-6">연구 노트</p>
      <h3 className="font-serif text-[32px] font-normal leading-[1.3] text-brand-ink mb-6 group-hover:text-brand-accent transition-colors">{title}</h3>
      <p className="text-[16px] tracking-[0.04em] text-brand-ink-light leading-[1.75] mb-8">{excerpt}</p>
      <p className="text-[14px] tracking-[0.22em] text-brand-stone">{date}</p>
    </div>
  </div>
);

const NewsDetail: React.FC<PageProps> = ({ setPage, selectedNewsId }) => {
  const article = NEWS_ARTICLES.find(a => a.id === selectedNewsId);
  
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-[60px]"
    >
      <div className="px-10 py-10 border-b border-brand-ink/10">
        <button 
          onClick={() => setPage?.('news')}
          className="text-[12px] tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none mb-12"
        >
          ← 목록으로
        </button>
        
        <div className="max-w-4xl mx-auto">
          <p className="text-[12px] tracking-[0.3em] uppercase text-brand-accent mb-6 text-center">{article.category}</p>
          <h1 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-tight text-brand-ink tracking-tight mb-12 text-center">{article.title}</h1>
          <p className="text-[12px] tracking-[0.1em] text-brand-stone mb-20 text-center">{article.date}</p>
          
          <div className="aspect-video bg-brand-card flex items-center justify-center border border-brand-ink/5 mb-20">
             <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="opacity-10">
                <path d="M10 90 L90 10" stroke="#000" strokeWidth="1"/>
                <circle cx="50" cy="50" r="30" stroke="#000" strokeWidth="1"/>
             </svg>
          </div>

          <div className="flex flex-col gap-12 mb-24">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-[16px] text-brand-ink-light leading-[1.9] tracking-[0.02em]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

const Community: React.FC<PageProps> = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="pt-[60px]"
  >
    <div className="px-10 pt-24 pb-16 border-b border-brand-stone/40 flex flex-col md:flex-row items-end justify-between gap-8">
      <div>
        <p className="text-[12px] tracking-[0.42em] uppercase text-brand-ink-light mb-4">DR. COHEN</p>
        <h1 className="font-serif text-[clamp(32px,5vw,56px)] font-normal leading-[0.95] text-brand-ink tracking-tight">리뷰</h1>
      </div>
      <p className="text-[16px] tracking-[0.06em] text-brand-ink-light max-w-[400px] leading-relaxed text-right">실제 사용자들이 전하는<br/>솔직한 피부 이야기.</p>
    </div>

    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-0.5">
        <StatCard num="4.9" label="평균 별점" />
        <StatCard num="2,841" label="전체 리뷰" />
        <StatCard num="98%" label="재구매 의사" />
      </div>

      <div className="pt-12">
        <div className="flex gap-4 mb-12 flex-wrap">
          {['All', 'EGF Line', 'Sun Serum Line'].map((f, i) => (
            <button 
              key={f} 
              className={`px-6 py-2.5 border border-brand-ink/10 text-[12px] tracking-[0.2em] uppercase transition-all cursor-none ${i === 0 ? 'bg-brand-accent text-brand-white border-brand-accent' : 'text-brand-ink-light hover:bg-brand-accent hover:text-brand-white hover:border-brand-accent'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
        <ReviewCard author="김지은 — 민감성 피부" tag="EGF 재생크림" text="자극 없이 투명하게 흡수되어서 너무 좋아요. 처음으로 제 피부에 맞는 재생크림을 찾았어요." product="EGF 재생크림 · 3주 사용" />
        <ReviewCard author="이수연 — 건성 피부" tag="EGF 재생크림" text="아침에 일어났을 때 피부가 촉촉해요. 더 이상 당기지 않아요." product="EGF 재생크림 · 1개월 사용" />
        <ReviewCard author="박민서 — 복합성 피부" tag="히알루 시카 워터리 선세럼" text="백탁 현상 없이 가벼워요. 데일리로 사용하기 딱 좋은 선세럼입니다." product="히알루 시카 워터리 선세럼 · 2개월 사용" />
        <ReviewCard author="최예린 — 지성 피부" tag="EGF 세럼" text="끈적임 없이 흡수력이 빨라요. 지성 피부에도 잘 맞습니다." product="EGF 세럼 · 5주 사용" />
        <ReviewCard author="정유나 — 건성 피부" tag="EGF 재생크림" text="피부 장벽이 튼튼해진 게 느껴져요. 제 인생 크림입니다." product="EGF 재생크림 · 6주 사용" />
        <ReviewCard author="한소희 — 민감성 피부" tag="히알루 시카 워터리 선세럼" text="민감성 피부인데 자극이 전혀 없어요. 선크림이 이렇게 편안할 수 있는지 몰랐네요." product="히알루 시카 워터리 선세럼 · 1개월 사용" />
        <ReviewCard author="오지현 — 복합성 피부" tag="EGF 세럼" text="세럼 하나로 피부 결이 정돈됐어요. 매우 만족합니다." product="EGF 세럼 · 3주 사용" />
        <ReviewCard author="신나래 — 지성 피부" tag="히알루 시카 워터리 선세럼" text="지성 피부라 선크림이 항상 고민이었는데 이건 달라요. 가볍고 산뜻합니다." product="히알루 시카 워터리 선세럼 · 7주 사용" />
      </div>
    </div>
    <Footer />
  </motion.div>
);

const StatCard = ({ num, label }: { num: string, label: string }) => (
  <div className="bg-brand-card p-12 border border-brand-ink/5">
    <p className="font-serif text-[clamp(48px,6vw,72px)] font-light text-brand-accent leading-none mb-4">{num}</p>
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
      <div className="max-w-7xl mx-auto px-0 md:px-10 py-12 border-b border-brand-ink/10">
        <div className="px-10 md:px-0">
          <button 
            onClick={() => setPage?.('best')}
            className="text-[12px] tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none mb-12"
          >
            ← 베스트로 돌아가기
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
              <div className="bg-brand-card aspect-square w-full flex items-center justify-center p-24 border border-brand-ink/5">
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
              <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-normal leading-tight text-brand-ink tracking-tight mb-6">{product.name}</h1>
              <p className="text-[16px] text-brand-ink-light leading-relaxed">{product.desc}</p>
            </div>
            
            <div className="flex items-baseline gap-4 border-y border-brand-ink/10 py-8">
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
        <h3 className="font-serif text-[32px] mb-12 text-brand-ink">관련 리뷰</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-l-2 border-brand-accent pl-8 py-4">
            <p className="text-[16px] italic text-brand-ink mb-4">"피부 장벽이 튼튼해진 게 느껴져요. 인생 아이템입니다."</p>
            <p className="text-[12px] tracking-[0.1em] text-brand-ink-light uppercase">김*은 — Verified Buyer</p>
          </div>
          <div className="border-l-2 border-brand-accent pl-8 py-4">
            <p className="text-[16px] italic text-brand-ink mb-4">"자극 없이 투명하게 흡수되어서 너무 좋아요. 재구매 의사 200%입니다."</p>
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
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedNewsId, setSelectedNewsId] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleNavBest = (tab: 'egf' | 'sun') => {
    setBestTab(tab);
    setPage('best');
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
      <Navbar activePage={page} setPage={setPage} handleNavBest={handleNavBest} />
      
      <main className="overflow-visible">
        <AnimatePresence mode="wait">
          {page === 'home' && <Home key="home" setPage={setPage} onProductClick={handleProductClick} />}
          {page === 'best' && <Best key="best" setPage={setPage} bestTab={bestTab} setBestTab={setBestTab} onProductClick={handleProductClick} />}
          {page === 'about' && <About key="about" setPage={setPage} />}
          {page === 'news' && <News key="news" setPage={setPage} onNewsClick={handleNewsClick} />}
          {page === 'community' && <Community key="community" setPage={setPage} />}
          {page === 'product' && <ProductDetail key="product" setPage={setPage} selectedProductId={selectedProductId} />}
          {page === 'news-detail' && <NewsDetail key="news-detail" setPage={setPage} selectedNewsId={selectedNewsId} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
