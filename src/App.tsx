import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Instagram, ArrowUp } from 'lucide-react';
import promoImg from './promo.png';
import homeMainImg from './m.png';
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
      '아무리 발라도 하루가 지나면 또 당기고 각질이 뜨는 경험, 한 번쯤 있으시죠?',
      '🔍 보습제를 열심히 발라도 건조한 진짜 이유\n\n보습제를 매일 꼼꼼히 바르는데도 피부가 당기고 각질이 일어난다면, 수분이 부족한 게 아닐 수 있어요.\n\n진짜 원인은 \'피부 장벽의 손상\'입니다. 피부 장벽이란 외부 자극과 수분 증발을 막아주는 피부 보호막인데요, 이 막이 손상되면 아무리 수분을 공급해도 그대로 증발해버립니다.\n\n쉽게 말해, 구멍 난 양동이에 물을 계속 붓는 것과 같은 상황이에요. 수분을 채우기 전에 먼저 \'구멍\'을 막는 것이 핵심입니다.',
      '⚠️ 장벽이 무너지면 피부에 생기는 악순환\n\n피부 장벽이 손상되면 외부 자극원이 쉽게 피부 속으로 침투합니다. 이 과정에서 염증 반응이 반복적으로 일어나게 되는데요.\n\n아토피·민감성 피부에서 자주 느끼는 가려움, 붉음증, 따가움이 바로 이 악순환의 결과예요. 긁으면 장벽이 더 손상되고, 손상된 장벽으로 자극이 더 깊이 침투하는 식입니다.\n\n이 상태에서 단순히 수분만 공급하는 보습제를 사용하면 일시적인 개선은 있어도 근본적인 장벽 회복은 어렵습니다. 피부가 반복적으로 예민하고 건조하다면, 장벽 복원에 초점을 맞춘 케어가 필요한 이유가 바로 여기에 있어요.',
      '🧪 에몰리언트가 일반 보습제와 다른 점\n\n여기서 주목해야 할 성분이 바로 에몰리언트입니다.\n\n에몰리언트란 장벽의 틈새를 채워 피부에 유연성과 밀폐력을 동시에 높여주는 성분을 말해요. 단순히 수분을 공급하는 것을 넘어, 피부 장벽 구조 자체를 복원하는 데 도움을 줍니다.\n\n여기에 \'히알루론산\'(피부 속 수분을 끌어당겨 잡아두는 성분)과 \'시카\'(병풀 추출물로 진정·재생 효과가 있는 성분)를 함께 활용하면 장벽 회복 속도가 눈에 띄게 빨라집니다. 실제로 최근 연구들에서도 장벽 손상 피부에 복합 성분을 적용했을 때 단일 성분 대비 회복 속도가 유의미하게 개선된 결과가 확인되고 있어요.\n\n🔬 논문 근거: 히드록시부틸 키토산 하이드로겔 적용 시 레이저 시술 후 피부 장벽 회복이 대조군 대비 통계적으로 유의미하게 향상됨 (2026, Prospective Randomized Split-Face Trial)',
      '🐌 달팽이 뮤신이 장벽 피부에 특히 좋은 과학적 이유\n\n달팽이 뮤신은 최근 몇 년 사이 주목받는 성분인데, 단순한 트렌드가 아닙니다.\n\n뮤신은 히알루론산과 유사한 점도 구조를 가져 피부 표면에 얇고 균일한 보호막을 형성해요. 이 막이 수분 증발을 억제하면서, 동시에 성장인자(세포 회복 신호를 보내는 단백질)의 전달을 도와줍니다.\n\n즉, 달팽이 뮤신은 보습과 피부 재생을 동시에 지원하는 성분이에요. 손상된 장벽 피부에서 수분을 잡아두면서 피부 스스로 회복할 수 있도록 신호를 보내는 셈이죠.\n\n🔬 논문 근거: 재조합 인간 섬유아세포성장인자(bFGF)가 피부 손상 부위의 세포 재생 및 회복에 유의미한 영향을 미침 (2026, Clinical Study)',
      '📋 아토피·민감성 피부를 위한 올바른 보습 루틴\n\n보습 성분이 아무리 좋아도 바르는 타이밍과 순서가 맞지 않으면 효과가 절반으로 줄어듭니다.\n\n핵심은 세안 후 3분 이내, 피부가 아직 살짝 촉촉한 상태에서 바로 보습제를 적용하는 거예요. 이 짧은 시간 안에 수분을 고정해주는 것이 하루 보습력을 결정합니다.\n\n순서는 이렇게 기억해두세요 :\n\n① 히알루론산 세럼으로 수분 먼저 채우기\n② 에몰리언트 성분이 풍부한 크림으로 마무리해 장벽 밀폐하기\n\n이 두 단계만 꾸준히 지켜도 보습 지속 시간이 확연히 달라지는 것을 느낄 수 있어요. 특히 환절기나 냉난방이 강한 실내 환경에서 더욱 효과적입니다.',
      '📚 논문 출처\n\n• Seo et al. *Direct Lineage Reprogramming of Fibroblasts into Functional Keratinocyte-Like Cells via BMI1 and FGFR2b for Diabetic Wound Repair.* 2025.\n• Characterization of *Serratia marcescens* (OK482790) prodigiosin along with in vitro and in silico validation for its medicinal bioactivities. 2024.\n• Clinical Study of Recombinant Human Basic Fibroblast Growth Factor Combined With Collagen Sponge in the Treatment of Maxillofacial Degree II Acute Skin Contusion. 2026.\n• Filament coating system assists recovery of ablative fCO₂ laser treatment: A split-face clinical observation. 2024.\n• Hydroxybutyl Chitosan Hydrogel Promotes Ablative Fractional CO₂ Laser Wound Healing: A Prospective, Randomized, Split-Face Trial and Animal Model Evidence. 2026.',
      '✍️ 마무리하며\n\n결국 건조하고 예민한 피부를 바꾸려면 수분 공급보다 장벽 복원이 먼저예요. 에몰리언트, 히알루론산, 시카, 뮤신처럼 장벽 회복에 실질적으로 작용하는 성분들을 함께 활용하는 것이 핵심입니다.\n\n"닥터코헨 EGF 세럼과 EGF 크림"에는 표피성장인자(EGF)와 장벽 강화 복합 성분이 함께 담겨 있어 세포 재생과 장벽 복원을 동시에 케어할 수 있고, "히알루 시카 워터리 선세럼"은 히알루론산과 시카를 결합해 보습·진정·자외선 차단(SPF50+ PA++++)을 한 번에 챙길 수 있도록 설계되어 있어요. 성분 중심으로 루틴을 고민하시는 분들이라면 한 번 살펴보시길 추천드립니다.'
    ]
  },
  {
    id: 'sun-serum-evolution',
    title: '바르는 것만으로는 부족해요, 선케어',
    date: '2026년 4월 10일',
    category: 'COHEN NOTE',
    excerpt: '자외선 차단만으로는 부족한 피부 노화 방어. 차단, 진정, 재생의 3단계 루틴이 왜 필수적인지 논문 근거와 함께 알아봅니다.',
    image: '/note2.png',
    verticalLabel: 'Evolution',
    content: [
      '아침마다 선크림을 꼼꼼히 챙겨 바르는데, 거울 속 피부는 왜 여전히 칙칙하고 탄력이 없을까요?\n"자외선 차단만 잘하면 되는 거 아닌가?" 했다가, 어느 날 문득 눈가 잔주름과 처진 피부를 발견하고 당황한 분들 분명 계실 거예요.',
      '사실 자외선 방어는 선크림 하나로 완성되지 않습니다.\n이 글에서는 자외선이 피부 속에서 실제로 무슨 일을 벌이는지, 그리고 차단 → 진정 → 재생, 세 단계가 왜 반드시 함께여야 하는지를 논문 근거와 함께 쉽게 풀어드릴게요.',
      '피부 노화의 80%는 자외선 때문이에요\n\n"설마 그 정도야?" 싶겠지만, 피부과학 연구에서 꾸준히 확인되는 수치입니다.\n자외선은 단순히 피부를 \'태우는\' 것에서 그치지 않아요.\n피부 깊숙이 침투해 콜라겐을 분해하고, 세포 DNA를 직접 손상시키며, 만성 염증 상태를 서서히 만들어 냅니다.\n\n문제는 이 손상이 눈에 바로 보이지 않는다는 점이에요.\n오늘 햇볕을 받은 피부가 내일 당장 주름으로 나타나는 게 아니라, 수년에 걸쳐 탄력 저하·색소 침착·피부 결 거침으로 쌓여서 나타나죠.\n선크림이 \'입구를 막는\' 역할을 한다면, 이미 시작된 내부 손상을 되돌리는 별도의 전략이 반드시 필요한 이유가 바로 여기에 있습니다.\n\n📌 *Rittié & Fisher (2002). UV-light-induced signal cascades and skin aging. Ageing Research Reviews.',
      '🔬 자외선이 피부 속에서 실제로 하는 일\n\n자외선이 피부에 닿는 순간, 세포 안에서는 조용한 전쟁이 시작됩니다.\n\n가장 먼저 일어나는 일은 활성산소(ROS, Reactive Oxygen Species)의 폭발적 생성이에요.\n활성산소는 피부 탄력을 유지하는 진피층 세포인 섬유아세포(fibroblast)를 집중 공격하고, 콜라겐과 엘라스틴 섬유를 파괴하기 시작합니다.\n\n더 무서운 건, 자외선에 반복 노출될수록 MMP(Matrix Metalloproteinase, 콜라겐 분해 효소)의 활성이 급격히 높아진다는 점이에요.\n쉽게 말해, 피부 탄력망을 지탱하는 기둥들을 스스로 무너뜨리는 효소가 과활성화된다는 거예요.\n광노화 연구(2023)에서도 이 메커니즘이 반복 확인되면서, 차단 이후의 \'항산화 대응\'이 얼마나 중요한지가 주목받고 있습니다.\n\n선크림은 자외선의 유입을 줄여주지만, 이미 피부 안에 쌓인 산화 스트레스와 염증 반응에는 직접 작용하지 못해요.\n그래서 차단 이후 단계가 반드시 필요합니다.',
      '🧪 차단만으로는 부족한 이유 — 항산화가 두 번째 방패\n\n2025년 발표된 D-리모넨 항산화 연구에서 흥미로운 결과가 나왔어요.\n산화 스트레스로 노화가 진행된 피부에 항산화 성분을 적용했더니, 콜라겐 분해가 현저히 억제되고 피부 구조 자체가 회복되는 것이 확인된 거예요.\n\n이 연구 결과가 시사하는 건 명확합니다.\n자외선 방어는 단일 제품·단일 성분으로 해결될 수 없고, **세 가지 축이 맞물려야** 비로소 완성된다는 것이에요.\n\n① 차단 : 선크림·선세럼으로 자외선 자체의 유입을 막는다\n② 항산화 : 활성산소를 중화해 콜라겐 분해 효소의 과활성을 억제한다\n③ 재생 : 이미 손상된 세포와 피부 장벽을 밤새 복구한다\n\n선크림 하나에 이 세 가지를 기대하는 건 무리예요.\n각 단계에 맞는 성분과 루틴이 따로 필요한 이유입니다.\n\n📌 *Huang et al. (2025). D-limonene attenuates D-galactose-induced skin aging mouse model. Journal of Molecular Histology.',
      '☀️ 햇볕 받은 날 저녁, 피부가 보내는 SOS 신호\n\n외출 후 피부가 괜히 당기고, 살짝 붉어지고, 전체적으로 열감이 느껴지는 경험 있으시죠?\n그건 단순한 건조함이 아니에요.\n피부가 "지금 염증 반응 중"이라고 보내는 신호입니다.\n\n자외선에 노출된 피부는 각질형성세포(keratinocyte, 피부 표면을 구성하는 세포)가 손상되면서 피부 장벽 기능이 급격히 저하돼요.\n이때 수분은 빠져나가고, 외부 자극에 대한 방어력도 떨어지게 됩니다.\n\n2023년 줄기세포 분비물(세크리톰, secretome) 연구에서는, 피부 재생 인자들이 손상된 각질형성세포의 회복 속도를 높이고 장벽 기능을 빠르게 정상화시킨다고 보고했어요.\n즉, 외출 후 저녁 루틴에서 진정·재생 성분을 집중 투입하는 것이 피부 회복의 핵심이라는 뜻입니다.\n\n히알루론산으로 즉각 수분을 채우고, 시카(병풀 추출물, Centella Asiatica)로 염증 반응을 가라앉히는 것. 그리고 밤 사이 재생 성분으로 손상된 세포를 복구하는 것, 이 순서가 중요합니다.\n\n📌 *Tenchov et al. (2023). Effect of stem cell secretome in skin rejuvenation: a narrative review. Molecular Biology Reports.',
      '📋 오늘부터 실천할 3단계 루틴\n\n복잡하게 생각하지 않아도 돼요. 세 가지 원칙만 지키면 됩니다.\n\n🌅 외출 전\nSPF50+ PA++++ 선세럼으로 자외선 차단과 보습을 동시에 해결하세요.\n자외선 차단 지수가 높을수록, 그리고 보습 성분이 함께 담겨 있을수록 피부 장벽이 더 단단하게 유지됩니다.\n\n🌤️ 외출 중·직후\n히알루론산과 시카(병풀) 성분으로 즉각 수분을 보충하고 진정 케어를 시작하세요.\n열감과 붉기가 남아 있는 상태에서 빠르게 진정시켜 주는 것이 이후 재생 효율을 높입니다.\n\n🌙 저녁 루틴\n항산화·재생 세럼으로 낮 동안 쌓인 산화 손상을 밤새 복구하세요.\n피부 세포 재생이 가장 활발하게 일어나는 시간대인 밤을 적극 활용하는 것이 광노화 방어의 핵심입니다.\n\n차단 → 진정 → 재생, 이 세 단계를 매일 꾸준히 쌓아가는 것.\n그게 자외선으로부터 피부를 지키는 가장 확실하고 과학적인 방법입니다.',
      '📚 참고 문헌\n\n• Rittié, L. & Fisher, G.J. (2002). UV-light-induced signal cascades and skin aging. *Ageing Research Reviews.*\n• Huang et al. (2025). D-limonene attenuates D-galactose-induced skin aging mouse model. *Journal of Molecular Histology.*\n• Tenchov et al. (2023). Effect of stem cell secretome in skin rejuvenation: a narrative review. *Molecular Biology Reports.*\n• Direct Lineage Reprogramming of Fibroblasts into Functional Keratinocyte-Like Cells via BMI1 and FGFR2b for Diabetic Wound Repair. (2025)\n• Filament coating system assists recovery of ablative fCO₂ laser treatment: A split-face clinical observation. (2024)\n• Hydroxybutyl Chitosan Hydrogel Promotes Ablative Fractional CO₂ Laser Wound Healing: A Prospective, Randomized, Split-Face Trial and Animal Model Evidence. (2026)\n• Ethnopharmacological evaluation of Vitellaria paradoxa triterpenes for wound healing: In vivo evidence of lupeol and α/β-amyrin in promoting dermal regeneration. (2026)',
      '🌿 마무리하며\n\n자외선 방어는 선크림 하나로 완성되지 않아요.\n차단으로 막고, 항산화로 중화하고, 재생 성분으로 복구하는 세 단계가 매일의 루틴 속에서 함께 작동해야 비로소 피부는 노화 속도를 늦출 수 있습니다.\n\n닥터코헨의 히알루 시카 워터리 선세럼(SPF50+ PA++++)은 자외선 차단과 동시에 히알루론산·시카 성분으로 보습과 진정을 함께 담았고, EGF 세럼·EGF 크림에는 표피성장인자(EGF)를 비롯한 재생 복합 성분이 담겨 있어 저녁 루틴의 복구 단계를 채워주는 선택지가 될 수 있어요.'
    ]
  },
  {
    id: 'vegan-formula',
    title: '보습 크림, 아무거나 발라도 될까요?',
    date: '2026년 4월 10일',
    category: 'COHEN NOTE',
    excerpt: '크림을 발라도 금방 당기는 건성·민감 피부를 위한 진짜 보습의 비밀. 피부 장벽 복원과 핵심 성분(히알루론산, 시카)의 과학적 효능을 분석합니다.',
    image: '/note3.png',
    verticalLabel: 'Moisture',
    content: [
      '크림을 열심히 발랐는데, 한 시간도 안 돼 피부가 다시 당기는 경험 😢\n"내가 원래 건성이라 어쩔 수 없나 봐…" 하고 포기하신 적 있으신가요?\n\n사실 그건 피부 탓이 아니라, 보습제 선택의 문제일 수 있습니다.\n오늘은 \'촉촉한 느낌\'과 \'진짜 보습\'이 어떻게 다른지, 그리고 건성·민감 피부에 실제로 효과 있는 성분이 무엇인지 과학적으로 풀어드릴게요.',
      '💧 크림 바른 직후엔 촉촉한데, 왜 금방 당길까요?\n\n보습제를 바른 직후의 그 포근한 느낌, 오래가지 않아서 속상하신 분 많으시죠.\n사실 대부분의 보습제는 피부 표면에 일시적으로 수분을 \'덮어주는\' 역할을 합니다.\n이건 피부가 스스로 수분을 붙잡는 능력이 살아난 게 아니에요.\n\n수분이 덮이는 것과, 수분이 머무는 것은 전혀 다른 이야기입니다.\n진짜 보습은 단순히 촉촉한 느낌을 주는 게 아니라, 피부 장벽을 복원하는 것에서 시작됩니다.\n이 차이를 모르고 보습제를 고르면, 아무리 좋은 크림을 발라도 결국 제자리 걸음이 될 수밖에 없어요.',
      '🧱 피부 장벽(Skin Barrier)이란 무엇인가요?\n\n피부 장벽은 외부 먼지·자극·세균을 막아주고, 피부 안쪽의 수분이 밖으로 빠져나가지 않도록 잡아주는 구조입니다.\n쉽게 말하면, 피부의 \'방어막\'이자 \'물탱크 뚜껑\' 같은 역할이에요.\n\n이 장벽은 세라마이드(피부 지질의 핵심 구성 성분), 지질(지방 성분), 그리고 천연보습인자(NMF, Natural Moisturizing Factor)로 이루어져 있어요.\n이 구조가 손상되면 어떤 비싼 크림을 발라도 수분은 금세 증발합니다.\n\n건성 피부의 당김, 민감 피부의 홍조와 따가움, 계절이 바뀔 때마다 피부가 예민해지는 것, 대부분 이 장벽이 무너진 신호입니다.\n결국 피부 장벽 복원 없이는 보습도 없다는 결론에 이르게 되죠.',
      '🔬 장벽 복원에 꼭 필요한 핵심 성분 2가지\n\n장벽을 복원하는 데 과학적으로 입증된 성분으로 가장 자주 언급되는 것이 바로 히알루론산과 시카(센텔라 아시아티카) 입니다.\n\n히알루론산(Hyaluronic Acid)은 피부 속에 원래 존재하는 천연 보습 물질입니다.\n자기 무게의 1,000배에 달하는 수분을 끌어당겨 붙잡는 능력이 있어서, 피부 안에서 수분이 오래 머물도록 도와줍니다.\n\n시카(Cica, 센텔라 아시아티카)는 손상된 피부를 진정시키고 장벽 재생을 촉진하는 성분입니다.\n오랫동안 상처 치유에 활용되어 온 식물 추출 성분으로, 피부 자극이 적어 민감성 피부에도 잘 맞습니다.\n\n연구에 따르면 이 두 성분이 함께 작용할 때 피부 보호막 복구 속도가 단독 사용보다 유의미하게 향상된다는 결과가 보고되어 있습니다.\n히알루론산이 수분을 채우고, 시카가 장벽을 다시 쌓아 올리는 이중 구조 덕분이에요.\n\n📌 *Pham et al. (2026). Hydroxybutyl Chitosan Hydrogel Promotes Ablative Fractional CO2 Laser Wound Healing. Lasers in Surgery and Medicine.',
      '📊 과학이 증명한 진짜 보습 효과\n\n\'덜 건조한 느낌\'은 주관적입니다. 그래서 과학은 더 객관적인 지표를 씁니다.\n바로 경피수분손실량(TEWL, Transepidermal Water Loss) 인데요, 피부 밖으로 빠져나가는 수분의 양을 실제로 측정하는 수치입니다.\nTEWL이 낮을수록 피부 안에 수분이 더 오래 머물고 있다는 뜻이에요.\n\n2024년 임상 연구에서, 장벽 복원 성분이 포함된 보습제를 사용한 그룹은 일반 보습제를 사용한 그룹보다 TEWL 수치가 유의미하게 감소했습니다.\n즉, 느낌이 아니라 실제 수치로 피부 속 수분이 더 오래 유지된다는 것이 확인된 거예요.\n\n이 결과는 성분 선택이 얼마나 중요한지를 잘 보여줍니다.\n비싼 크림보다, 성분이 제대로 된 크림이 더 효과적일 수 있다는 것이죠.\n\n📌 *Wang et al. (2024). Filament coating system assists recovery of ablative fCO2 laser treatment: A split-face clinical observation. Journal of Cosmetic Dermatology.',
      '✅ 건성·민감 피부를 위한 올바른 보습 루틴\n\n성분을 알았다면, 이제 바르는 방법도 중요합니다.\n아무리 좋은 성분도 순서와 타이밍이 맞지 않으면 효과가 반감될 수 있거든요.\n\n세안 후 3분 이내, 피부에 수분이 아직 남아 있을 때 바르는 것이 핵심입니다.\n이 짧은 시간 안에 수분을 잡아주는 세럼을 먼저 올려줘야 이후 크림의 흡수율도 높아집니다.',
      '📋 추천 보습 루틴 3단계\n\n① 히알루론산 세럼 : 피부에 수분을 먼저 충분히 공급해줍니다.\n수분이 있을 때 히알루론산을 올려야 수분을 \'붙잡는\' 효과가 극대화됩니다.\n\n② 시카 성분 크림 : 공급된 수분이 밖으로 빠져나가지 않도록 장벽을 밀봉해줍니다.\n진정 효과도 함께 있어서 민감하게 달아오른 피부를 차분하게 가라앉혀줘요.\n\n③ 낮에는 자외선 차단제 : 열심히 복원한 장벽을 자외선으로부터 지켜줍니다.\n자외선은 피부 장벽을 다시 손상시키는 주요 원인 중 하나이기 때문에, 마무리 단계에서 반드시 챙겨야 해요.\n\n이 세 단계, 순서와 성분을 함께 지킬 때 피부 장벽은 비로소 제대로 회복되기 시작합니다.',
      '📚 참고 문헌\n\n• Direct Lineage Reprogramming of Fibroblasts into Functional Keratinocyte-Like Cells via BMI1 and FGFR2b for Diabetic Wound Repair. (2025)\n• Characterization of Serratia marcescens (OK482790) prodigiosin along with in vitro and in silico validation for its medicinal bioactivities. (2024)\n• Clinical Study of Recombinant Human Basic Fibroblast Growth Factor Combined With Collagen Sponge in the Treatment of Maxillofacial Degree II Acute Skin Contusion. (2026)\n• Wang et al. Filament coating system assists recovery of ablative fCO2 laser treatment: A split-face clinical observation. Journal of Cosmetic Dermatology. (2024)\n• Pham et al. Hydroxybutyl Chitosan Hydrogel Promotes Ablative Fractional CO2 Laser Wound Healing: A Prospective, Randomized, Split-Face Trial and Animal Model Evidence. Lasers in Surgery and Medicine. (2026)',
      '🌿 마무리하며\n\n보습의 핵심은 \'얼마나 촉촉하게 느껴지느냐\'가 아니라, 피부 장벽이 실제로 회복되고 있느냐입니다.\n히알루론산으로 수분을 채우고, 시카로 장벽을 단단히 쌓아 올리는 것, 이 두 가지가 함께 이루어질 때 건성·민감 피부는 서서히 달라지기 시작합니다.\n\n닥터코헨의 히알루 시카 워터리 선세럼(SPF50+ PA++++)에는 히알루론산과 시카가 함께 담겨 있어 수분 보유·장벽 진정·자외선 차단을 한 번에 케어할 수 있고, EGF 크림·EGF 세럼에는 표피성장인자와 장벽 강화 성분이 포함되어 있어 손상된 피부 세포 재생과 탄력 케어에 도움이 되는 구성입니다.'
    ]
  },
  {
    id: 'egf-science-depth',
    title: '보습+항염 성분이 피부 장벽을 되살리는 법',
    date: '2026년 4월 15일',
    category: 'COHEN NOTE',
    excerpt: '예민한 피부를 위한 장벽 회복의 핵심, 보습과 항염 성분의 과학적 조화와 실질적인 관리법을 알아봅니다.',
    image: '/note1-1.png',
    verticalLabel: 'Longevity',
    content: [
      '예민한 피부 장벽 회복, 보습+항염 성분을 함께 써야 하는 진짜 이유\n\n세안하고 나면 늘 당기고, 조금만 자극받아도 금세 빨개지는 피부.\n"나만 이런가?" 싶지만, 사실 이런 고민을 가진 분들이 정말 많습니다.\n\n단순히 보습 크림 하나 더 바른다고 해결되지 않아서 답답하셨죠?\n그 이유는 피부 장벽이 무너진 상태에서는 수분만 채워선 부족하기 때문입니다.\n\n오늘은 예민한 피부가 왜 생기는지, 그리고 어떤 성분이 장벽 회복에 실질적으로 도움이 되는지를 논문 근거와 함께 쉽게 풀어드릴게요.',
      '🔍 내 피부, 왜 이렇게 예민한 걸까요?\n\n화장품을 바꾸지도 않았는데 갑자기 피부가 예민해졌다면, 원인은 피부 표면의 장벽 손상에 있을 가능성이 높습니다.\n\n피부 장벽은 외부 자극으로부터 피부를 보호하는 방어막 역할을 합니다.\n이 장벽이 약해지면 수분은 쉽게 빠져나가고, 외부 자극물은 반대로 피부 속으로 그대로 스며들게 됩니다.\n\n세안 후 느껴지는 \'당김\'과 \'따가움\', 조금만 마찰이 생겨도 올라오는 \'붉음\'은 모두 장벽이 제 역할을 못 하고 있다는 신호입니다.\n"건조한 피부"가 아니라 "장벽이 손상된 피부"로 접근해야 관리 방향이 달라집니다.',
      '🧱 피부 장벽이 무너지면 어떤 일이 생기나요?\n\n피부 장벽은 각질형성세포(피부 표면을 빈틈없이 채우는 세포)들이 층층이 쌓여 만들어진 구조입니다.\n마치 벽돌이 촘촘히 쌓인 담벼락처럼, 이 구조가 튼튼할수록 피부는 외부 환경으로부터 잘 보호됩니다.\n\n반대로 이 구조가 깨지면, 수분 증발이 빨라지고 세균이나 자극 물질이 피부 안으로 침투하기 쉬워집니다.\n특히 아토피성 피부는 이 방어막 자체가 선천적으로 취약한 경우가 많습니다.\n\n장벽이 약한 피부는 염증 반응이 반복되고, 염증이 반복될수록 장벽은 더 무너지는 악순환에 빠집니다.\n진정과 보습이 단순한 \'피부 관리\'가 아닌 \'회복의 출발점\'인 이유가 바로 여기 있습니다.',
      '💧 보습만으론 부족한 이유 — 항염 성분이 함께 필요합니다\n\n보습 성분의 대표주자 히알루론산(피부 속 수분을 끌어당겨 잡아두는 성분)은 장벽 회복을 위한 수분 기반을 만들어줍니다.\n하지만 피부에 염증이 진행 중인 상태에서는 수분만 채워도 자꾸 무너집니다.\n\n여기서 함께 필요한 것이 시카(센텔라아시아티카) 성분입니다.\n시카는 염증 신호를 차단해 피부가 자극에 반응하는 강도 자체를 낮춰주는 역할을 합니다.\n\n줄기세포 분비물질 관련 연구(Babaei et al., 2023)에 따르면, 항염 및 보습 활성 성분이 피부 재생 세포의 환경을 안정시키고 장벽 구성에 필요한 단백질 발현을 촉진한다는 사실이 확인되었습니다.\n\n즉, 수분을 채우는 동시에 염증 반응을 잠재워야 장벽이 실질적으로 회복될 수 있습니다.\n보습과 항염, 이 두 가지는 \'선택\'이 아니라 \'세트\'로 접근해야 합니다.',
      '🔬 진정 성분이 피부를 바꾸는 과정, 과학적으로 살펴보면\n\n항염 성분이 피부에 닿으면 가장 먼저 하는 일은 염증 신호 차단입니다.\n염증이 줄어들면, 피부 진피층에서 콜라겐을 생성하는 섬유아세포(피부 탄력과 재생을 담당하는 세포)가 제 역할을 다시 하기 시작합니다.\n\n같은 연구(Babaei et al., 2023)에서는 염증이 억제된 환경에서 피부 재생 세포의 이동 속도와 증식률이 모두 높아지는 것이 관찰되었습니다.\n\n결국 자극을 줄여야 피부 스스로 회복할 공간이 생깁니다.\n예민한 피부에 필요한 것은 \'아무것도 하지 않는 것\'이 아니라,\n자극을 최소화하면서 재생 환경을 만들어주는 것입니다.',
      '✅ 예민한 피부, 오늘부터 이렇게 관리하세요\n\n① 세안 후 30초 이내에 보습을 시작하세요\n피부가 외부에 노출되는 시간이 짧을수록 수분 손실을 줄일 수 있습니다.\n세안 후 물기를 두드려 닦자마자 바로 스킨케어를 시작하는 것이 핵심입니다.\n\n② 히알루론산 + 시카 성분을 레이어링(단계적으로 겹쳐 바르기)하세요\n수분막과 진정막이 함께 형성되어 장벽 회복 효과가 배가됩니다.\n가벼운 질감의 세럼을 먼저 바르고, 그 위에 보습 크림으로 마무리하는 순서가 좋습니다.\n\n③ 각질 제거와 강한 세안은 잠시 멈추세요\n이미 약해진 장벽에 물리적 자극을 더하면 회복이 더뎌집니다.\n피부가 안정될 때까지는 순한 클렌저로 부드럽게 세안하는 것만으로도 충분합니다.\n\n붉고 예민한 피부일수록, 가장 먼저 해야 할 일은 자극을 줄이고 장벽을 채우는 것입니다.\n화려한 성분보다 \'지금 피부에 필요한 것\'에 집중하는 것이 회복의 시작입니다.',
      '🌱 마무리하며\n\n예민한 피부는 단순히 \'약한 피부\'가 아닙니다.\n장벽이 손상된 상태에서 보내는 회복 신호이고, 올바른 접근으로 충분히 안정시킬 수 있습니다.\n\n핵심은 보습과 항염을 동시에, 그리고 자극을 최소화하는 것입니다.\n\n닥터코헨의 히알루 시카 워터리 선세럼에는 히알루론산과 시카 성분이 함께 담겨 있어, 보습과 진정을 동시에 케어하면서 SPF50+ PA++++ 자외선 차단까지 지원합니다.\n장벽 강화와 세포 재생에 집중하고 싶다면 EGF 세럼·EGF 크림라인도 함께 참고해 보세요.'
    ]
  },
  {
    id: 'sun-aging-protection',
    title: 'UVA 차단으로\n피부 광노화를 늦추는 법',
    date: '2026년 4월 24일',
    category: 'COHEN NOTE',
    excerpt: '자외선 차단과 피부 장벽 케어의 상관관계, 히알루론산과 시카 성분이 선케어 루틴에 필수적인 과학적 이유를 알아봅니다.',
    image: '/note5.png',
    verticalLabel: 'Protection',
    content: [
      '히알루론산 + 시카가 선케어에 함께 있어야 하는 이유\n\n자외선 차단 효과를 온전히 누리려면, 차단 성분만으로는 부족합니다.\n피부 장벽이 탄탄하게 유지되어야 자외선 손상에 대한 저항력도 높아지기 때문입니다.\n\n광노화 연구에서는 피부 장벽이 약해질수록 자외선 손상이 더 빠르게 축적된다는 점이 확인되었습니다.\n즉, 선케어와 장벽 케어는 분리된 개념이 아니라 하나의 루틴 안에서 함께 작동해야 합니다.\n\n여기서 두 가지 성분이 중요한 역할을 합니다.',
      '히알루론산(Hyaluronic Acid)\n\n피부 속 수분을 붙잡아 두는 천연 보습 물질입니다.\n세포 사이의 수분 환경을 촉촉하게 유지해줘, 자외선 손상 이후의 회복력을 높여줍니다.\n건조한 피부일수록 광노화가 빠르게 진행되기 때문에, 보습은 차단 못지않게 중요한 항노화 전략입니다.',
      '시카(Cica / 센텔라아시아티카 추출물)\n\n손상된 피부 장벽을 진정시키고 복구하는 데 특화된 식물 성분입니다.\n자외선이나 환경 자극으로 예민해진 피부를 빠르게 안정시키고, 외부 자극에 대한 저항력을 강화해줍니다.\n\n이 두 성분이 차단 성분과 함께 담긴 선크림을 고른다면, 차단·보습·진정·장벽 강화까지 한 번에 챙기는 효율적인 루틴이 완성됩니다.',
      '📅 오늘 선크림이 10년 후 피부를 만듭니다\n\n광노화는 어느 날 갑자기 생기지 않습니다.\n차단하지 않은 하루하루가 쌓여서, 어느 순간 \'갑자기 늙어 보이는\' 날이 오는 것입니다.\n\n반대로 생각하면, 오늘 선크림을 바르는 선택이 10년 후 피부를 바꾸는 일입니다.\n\n실천 포인트는 단순합니다.\n\n- ✅ SPF50+ PA++++이상의 제품 선택 (UVA·UVB 동시 차단)\n- ✅ 외출 30분 전 충분한 양으로 도포\n- ✅ 흐린 날, 실내에서도 생략하지 않기\n- ✅ 보습·진정 성분이 함께 담긴 선세럼 활용으로 꾸준한 실천\n\n특히 선세럼 타입은 일반 선크림보다 산뜻한 질감으로 매일 바르기 편해, 꾸준함이 중요한 선케어 루틴에 잘 맞습니다.',
      '🌿 마무리하며\n\n선크림은 단순히 피부를 태우지 않기 위한 제품이 아닙니다.\n매일 바르는 습관이 콜라겐을 지키고, 피부 장벽을 보호하고, 10년 후의 피부 나이를 결정합니다.\n\n닥터코헨 히알루 시카 워터리 선세럼은 SPF50+ PA++++의 자외선 차단 효과에 히알루론산과 시카를 함께 담아, 차단과 보습·진정을 한 번에 챙길 수 있도록 설계되었습니다.\n피부 재생을 집중적으로 케어하고 싶다면, 표피성장인자(EGF)가 담긴 닥터코헨 EGF 세럼·크림과 함께 루틴을 구성해보시는 것도 좋은 방법입니다.'
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
    subImages: [
      '/cream1.jpeg', '/cream2.jpeg', '/cream3.jpeg', '/cream4.jpeg',
      '/cream5.jpeg', '/cream6.jpeg', '/cream7.jpeg', '/cream8.jpeg',
      '/cream9.jpeg', '/cream10.jpeg'
    ],
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
    subImages: [
      '/serum01.jpeg', '/serum02.jpeg', '/serum03.jpeg', '/serum04.jpeg',
      '/serum05.jpeg', '/serum06.jpeg', '/serum07.jpeg', '/serum08.jpeg',
      '/serum09.jpeg', '/serum10.jpeg'
    ],
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
  setSelectedNewsId?: (id: string) => void;
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
    <span className="text-[11px] font-medium text-brand-stone uppercase opacity-60 tracking-widest">© 2026 DR. Cohen. All Rights Reserved.</span>
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
      <section className="relative h-[90vh] flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane - Image */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
          <img 
            src={homeMainImg} 
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
            <h1 className="font-black text-[12vw] lg:text-[8vw] leading-none tracking-tighter text-[#749474] uppercase">
              Dr. Cohen.
            </h1>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-brand-stone/20 py-6 overflow-hidden bg-white cursor-none">
        <a 
          href="https://smartstore.naver.com/drcohen/products/11963043290"
          target="_blank"
          rel="noopener noreferrer"
          className="flex whitespace-nowrap animate-marquee group cursor-none"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex gap-[40px] pr-[40px]">
              <MarqueeItem text="선세럼 1+1 이벤트 바로가기" />
              <MarqueeItem text="선세럼 1+1 이벤트 바로가기" />
            </div>
          ))}
        </a>
      </div>

      {/* Featured Products */}
      <section id="featured-products" className="px-10 py-32">
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
  <span className="text-[14px] font-bold tracking-[0.2em] uppercase flex items-center gap-6 shrink-0" style={{ color: '#800020' }}>
    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#800020' }} />
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
        {NEWS_ARTICLES.map((article) => (
          <div 
            key={article.id}
            className="relative group overflow-hidden aspect-[3/4] border-b border-brand-stone/20 md:odd:border-r md:even:border-r md:[&:nth-child(3n)]:border-r-0 pb-0.5"
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

const NewsDetail: React.FC<PageProps> = ({ setPage, selectedNewsId, onNewsClick }) => {
  const article = NEWS_ARTICLES.find(a => a.id === selectedNewsId);
  
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-[60px] bg-white relative"
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
            <p key={i} className="text-[18px] text-brand-ink-light leading-[2] tracking-[0.01em] whitespace-pre-line">
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
                onClick={() => {
                  onNewsClick?.(other.id);
                  window.scrollTo(0, 0);
                }}
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
  
  if (!product) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="pt-[60px] relative"
    >
      <div className="max-w-7xl mx-auto px-0 md:px-10 py-12 border-b border-brand-stone/40">
        <div className="px-10 md:px-0">
          <button 
            onClick={() => setPage?.('best')}
            className="text-[12px] tracking-[0.2em] uppercase text-brand-ink-light hover:text-brand-accent transition-colors cursor-none mb-12"
          >
            ← BEST로 돌아가기
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">
          {/* Product Info - Appears first on mobile, second on desktop */}
          <div className="flex flex-col gap-12 px-10 lg:px-0 lg:sticky lg:top-32 self-start lg:order-2">
            <div>
              <p className="text-[12px] tracking-[0.3em] uppercase text-brand-accent mb-4">{product.line}</p>
              <h1 className="font-bold text-[32px] lg:text-[42px] leading-tight text-brand-ink tracking-tight mb-6">{product.name}</h1>
              <p className="text-[16px] text-brand-ink-light leading-relaxed whitespace-pre-line">{product.desc}</p>
            </div>
            
            <div className="flex items-baseline gap-4 border-y border-brand-stone/40 py-8">
              <p className="text-[24px] tracking-[0.06em] text-brand-ink font-medium">₩ {product.price}</p>
              {product.originalPrice && <p className="text-[16px] text-brand-stone line-through">₩ {product.originalPrice}</p>}
              {product.discount && <p className="text-[16px] text-brand-accent font-semibold">{product.discount}</p>}
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

          {/* Product Images - Appears second on mobile, first on desktop */}
          <div className="flex flex-col items-center w-full lg:order-1">
            <div className="flex items-center justify-center w-full mb-20">
              {product.image ? (
                <img 
                  src={product.image} 
                  className="w-full max-w-[500px] h-auto object-contain" 
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

            {product.subImages && product.subImages.length > 0 && (
              <div className="w-full flex flex-col items-center">
                {product.subImages.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    className="w-full h-auto" 
                    alt={`${product.name} 상세 정보 ${index + 1}`} 
                    referrerPolicy="no-referrer" 
                  />
                ))}
              </div>
            )}
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
      
      <AnimatePresence>
        {showTopBtn && page !== 'home' && (
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

      <main className="overflow-visible">
        <AnimatePresence mode="wait">
          {page === 'home' && <Home key="home" setPage={setPage} onProductClick={handleProductClick} />}
          {page === 'best' && <Best key="best" setPage={setPage} bestTab={bestTab} setBestTab={setBestTab} onProductClick={handleProductClick} />}
          {page === 'about' && <About key="about" setPage={setPage} aboutTab={aboutTab} setAboutTab={setAboutTab} />}
          {page === 'news' && <News key="news" setPage={setPage} onNewsClick={handleNewsClick} />}
          {page === 'community' && <Community key="community" setPage={setPage} />}
          {page === 'product' && <ProductDetail key="product" setPage={setPage} selectedProductId={selectedProductId} />}
          {page === 'news-detail' && <NewsDetail key={`news-detail-${selectedNewsId}`} setPage={setPage} selectedNewsId={selectedNewsId} onNewsClick={handleNewsClick} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
