// NIDA Knowledge Base - HTP Interpretation Rules
import { KBRule } from '@/types';

export const knowledgeBase: KBRule[] = [
  // ==================== HOUSE (EV) RULES ====================
  {
    id: 'KB-HOUSE-001',
    element: 'door_size',
    category: 'house',
    indicator: 'small',
    interpretation: {
      tr: 'Küçük veya dar kapı, sosyal etkileşimde isteksizlik, utangaçlık veya çevreye karşı savunmacı tutum gösterebilir.',
      en: 'A small or narrow door may indicate reluctance in social interaction, shyness, or a defensive attitude toward the environment.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'BUCK-1948', author: 'Buck, J. N.', year: 1948, title: 'The H-T-P Technique', type: 'book' },
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['social', 'isolation', 'defense'],
  },
  {
    id: 'KB-HOUSE-002',
    element: 'door',
    category: 'house',
    indicator: 'absent',
    interpretation: {
      tr: 'Kapının çizilmemesi, sosyal izolasyon, erişilemezlik veya savunmacılık göstergesi olabilir.',
      en: 'Absence of a door may indicate social isolation, inaccessibility, or defensiveness.',
    },
    confidence: 'high',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'BUCK-1948', author: 'Buck, J. N.', year: 1948, title: 'The H-T-P Technique', type: 'book' },
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['social', 'isolation', 'defense'],
  },
  {
    id: 'KB-HOUSE-003',
    element: 'roof_size',
    category: 'house',
    indicator: 'large',
    interpretation: {
      tr: 'Büyük veya abartılı çatı, fantezi dünyasına sığınma veya entelektüel uğraşlara aşırı odaklanma gösterebilir.',
      en: 'A large or exaggerated roof may indicate retreat into fantasy or excessive focus on intellectual pursuits.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['fantasy', 'intellectual', 'escape'],
  },
  {
    id: 'KB-HOUSE-004',
    element: 'windows',
    category: 'house',
    indicator: 'absent',
    interpretation: {
      tr: 'Pencerelerin çizilmemesi, çevreyle etkileşimde isteksizlik veya geri çekilme eğilimi gösterebilir.',
      en: 'Absence of windows may indicate reluctance to interact with the environment or withdrawal tendencies.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'BUCK-1948', author: 'Buck, J. N.', year: 1948, title: 'The H-T-P Technique', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['social', 'withdrawal'],
  },
  {
    id: 'KB-HOUSE-005',
    element: 'windows',
    category: 'house',
    indicator: 'curtained',
    interpretation: {
      tr: 'Perdeli pencereler, gizlilik ihtiyacı veya savunmacı tutum gösterebilir.',
      en: 'Curtained windows may indicate a need for privacy or defensive attitude.',
    },
    confidence: 'low',
    evidenceStrength: 'single_study',
    sources: [
      { id: 'JOLLES-1971', author: 'Jolles, I.', year: 1971, title: 'A Catalog for HTP Interpretation', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['privacy', 'defense'],
  },

  // ==================== TREE (AĞAÇ) RULES ====================
  {
    id: 'KB-TREE-001',
    element: 'trunk_size',
    category: 'tree',
    indicator: 'large',
    interpretation: {
      tr: 'Büyük gövde, güçlü ego yapısı veya çevresel baskılara karşı direnç gösterebilir. Aşırı büyükse saldırganlık veya kontrol ihtiyacı da olabilir.',
      en: 'A large trunk may indicate strong ego structure or resistance to environmental pressures. If excessively large, it may also indicate aggression or need for control.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'KOCH-1952', author: 'Koch, C.', year: 1952, title: 'The Tree Test', type: 'book' },
      { id: 'BOLANDER-1977', author: 'Bolander, K.', year: 1977, title: 'Assessing Personality Through Tree Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['ego', 'strength', 'aggression'],
  },
  {
    id: 'KB-TREE-002',
    element: 'trunk',
    category: 'tree',
    indicator: 'hole_or_scar',
    interpretation: {
      tr: 'Gövdedeki yara veya delik, travma deneyimi ile ilişkilendirilebilir. Konumu, travmanın zamanlamasını gösterebilir.',
      en: 'A hole or scar on the trunk may be associated with trauma experience. Its position may indicate the timing of the trauma.',
    },
    confidence: 'high',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'BOLANDER-1977', author: 'Bolander, K.', year: 1977, title: 'Assessing Personality Through Tree Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['trauma', 'emotional'],
  },
  {
    id: 'KB-TREE-003',
    element: 'branches',
    category: 'tree',
    indicator: 'upward',
    interpretation: {
      tr: 'Yukarı yönelen dallar, iyimserlik, büyüme isteği ve hedeflere yönelim gösterebilir.',
      en: 'Upward-pointing branches may indicate optimism, desire for growth, and goal orientation.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'KOCH-1952', author: 'Koch, C.', year: 1952, title: 'The Tree Test', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['optimism', 'growth'],
  },
  {
    id: 'KB-TREE-004',
    element: 'branches',
    category: 'tree',
    indicator: 'downward',
    interpretation: {
      tr: 'Aşağı sarkan dallar, depresif eğilimler veya umutsuzluk gösterebilir.',
      en: 'Downward-hanging branches may indicate depressive tendencies or hopelessness.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'KOCH-1952', author: 'Koch, C.', year: 1952, title: 'The Tree Test', type: 'book' },
      { id: 'BOLANDER-1977', author: 'Bolander, K.', year: 1977, title: 'Assessing Personality Through Tree Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['depression', 'hopelessness'],
  },
  {
    id: 'KB-TREE-005',
    element: 'tree_overall',
    category: 'tree',
    indicator: 'dead',
    interpretation: {
      tr: 'Ölü veya kuru ağaç, depresyon, umutsuzluk veya yas sürecini gösterebilir.',
      en: 'A dead or dry tree may indicate depression, hopelessness, or mourning.',
    },
    confidence: 'high',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'BOLANDER-1977', author: 'Bolander, K.', year: 1977, title: 'Assessing Personality Through Tree Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['depression', 'grief'],
  },

  // ==================== PERSON (İNSAN) RULES ====================
  {
    id: 'KB-PERSON-001',
    element: 'hands',
    category: 'person',
    indicator: 'large',
    interpretation: {
      tr: 'Büyük eller, çevreyle etkileşimde zorluk, anksiyete veya suçluluk duygusu ile ilişkilendirilebilir. Saldırganlık da gösterebilir.',
      en: 'Large hands may be associated with difficulty interacting with environment, anxiety, or guilt. May also indicate aggression.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'MACHOVER-1949', author: 'Machover, K.', year: 1949, title: 'Personality Projection in Human Figure Drawing', type: 'book' },
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['anxiety', 'guilt', 'aggression'],
  },
  {
    id: 'KB-PERSON-002',
    element: 'hands',
    category: 'person',
    indicator: 'absent',
    interpretation: {
      tr: 'Ellerin çizilmemesi, güçsüzlük hissi, suçluluk veya çevreyle etkileşimden kaçınma ile ilişkilendirilebilir.',
      en: 'Omission of hands may be associated with feelings of helplessness, guilt, or avoidance of interaction.',
    },
    confidence: 'high',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'KOPPITZ-1968', author: 'Koppitz, E. M.', year: 1968, title: 'Psychological Evaluation of Children\'s Human Figure Drawings', type: 'book' },
    ],
    ageRange: { min: 7, max: 12 },
    tags: ['helplessness', 'guilt', 'avoidance'],
  },
  {
    id: 'KB-PERSON-003',
    element: 'eyes',
    category: 'person',
    indicator: 'large',
    interpretation: {
      tr: 'Büyük gözler, paranoid eğilimler, aşırı duyarlılık veya yoğun merak gösterebilir.',
      en: 'Large eyes may indicate paranoid tendencies, hypersensitivity, or intense curiosity.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'MACHOVER-1949', author: 'Machover, K.', year: 1949, title: 'Personality Projection in Human Figure Drawing', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['paranoia', 'sensitivity', 'curiosity'],
  },
  {
    id: 'KB-PERSON-004',
    element: 'eyes',
    category: 'person',
    indicator: 'closed_or_small',
    interpretation: {
      tr: 'Küçük veya kapalı gözler, içe dönüklük veya dünyayı görmek istememe eğilimi gösterebilir.',
      en: 'Small or closed eyes may indicate introversion or reluctance to see the world.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'MACHOVER-1949', author: 'Machover, K.', year: 1949, title: 'Personality Projection in Human Figure Drawing', type: 'book' },
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['introversion', 'avoidance'],
  },
  {
    id: 'KB-PERSON-005',
    element: 'head',
    category: 'person',
    indicator: 'detached',
    interpretation: {
      tr: 'Başın vücuttan ayrık çizilmesi, fantezi-gerçeklik ayrışması veya dissosiyasyon göstergesi olabilir.',
      en: 'A head drawn detached from the body may indicate fantasy-reality split or dissociation.',
    },
    confidence: 'high',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['dissociation', 'trauma'],
  },
  {
    id: 'KB-PERSON-006',
    element: 'arms',
    category: 'person',
    indicator: 'absent',
    interpretation: {
      tr: 'Kolların çizilmemesi, güçsüzlük, suçluluk veya çevreyle etkileşim zorluğu gösterebilir.',
      en: 'Omission of arms may indicate powerlessness, guilt, or difficulty interacting with environment.',
    },
    confidence: 'high',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'KOPPITZ-1968', author: 'Koppitz, E. M.', year: 1968, title: 'Psychological Evaluation of Children\'s Human Figure Drawings', type: 'book' },
    ],
    ageRange: { min: 7, max: 12 },
    tags: ['powerlessness', 'guilt'],
  },
  {
    id: 'KB-PERSON-007',
    element: 'mouth',
    category: 'person',
    indicator: 'absent',
    interpretation: {
      tr: 'Ağzın çizilmemesi, iletişim zorluğu veya sır saklama eğilimi gösterebilir.',
      en: 'Omission of mouth may indicate communication difficulty or tendency to keep secrets.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'KOPPITZ-1968', author: 'Koppitz, E. M.', year: 1968, title: 'Psychological Evaluation of Children\'s Human Figure Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['communication', 'secrecy'],
  },
  {
    id: 'KB-PERSON-008',
    element: 'figure_size',
    category: 'person',
    indicator: 'small',
    interpretation: {
      tr: 'Küçük figür, yetersizlik hissi, düşük özsaygı veya geri çekilme eğilimi gösterebilir.',
      en: 'A small figure may indicate feelings of inadequacy, low self-esteem, or withdrawal tendency.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'MACHOVER-1949', author: 'Machover, K.', year: 1949, title: 'Personality Projection in Human Figure Drawing', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['self-esteem', 'inadequacy'],
  },

  // ==================== GENERAL RULES ====================
  {
    id: 'KB-GENERAL-001',
    element: 'line_pressure',
    category: 'general',
    indicator: 'heavy',
    interpretation: {
      tr: 'Ağır çizgi baskısı, gerilim, saldırganlık veya enerji fazlası gösterebilir.',
      en: 'Heavy line pressure may indicate tension, aggression, or excess energy.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['tension', 'aggression'],
  },
  {
    id: 'KB-GENERAL-002',
    element: 'line_pressure',
    category: 'general',
    indicator: 'light',
    interpretation: {
      tr: 'Hafif çizgi baskısı, düşük enerji, çekingenlik veya depresif eğilim gösterebilir.',
      en: 'Light line pressure may indicate low energy, timidity, or depressive tendency.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['depression', 'timidity'],
  },
  {
    id: 'KB-GENERAL-003',
    element: 'shading',
    category: 'general',
    indicator: 'heavy',
    interpretation: {
      tr: 'Yoğun gölgeleme, kaygı veya gölgelenen bölgeyle ilgili endişe gösterebilir.',
      en: 'Heavy shading may indicate anxiety or concern related to the shaded area.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'HAMMER-1958', author: 'Hammer, E. F.', year: 1958, title: 'Clinical Application of Projective Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['anxiety'],
  },
  {
    id: 'KB-GENERAL-004',
    element: 'erasures',
    category: 'general',
    indicator: 'frequent',
    interpretation: {
      tr: 'Sık silme, mükemmeliyetçilik, kararsızlık veya anksiyete gösterebilir.',
      en: 'Frequent erasures may indicate perfectionism, indecisiveness, or anxiety.',
    },
    confidence: 'moderate',
    evidenceStrength: 'replicated',
    sources: [
      { id: 'KOPPITZ-1968', author: 'Koppitz, E. M.', year: 1968, title: 'Psychological Evaluation of Children\'s Human Figure Drawings', type: 'book' },
    ],
    ageRange: { min: 5, max: 12 },
    tags: ['anxiety', 'perfectionism'],
  },
];

export function getKBRulesForAge(age: number): KBRule[] {
  return knowledgeBase.filter(
    (rule) => age >= rule.ageRange.min && age <= rule.ageRange.max
  );
}

export function getKBRulesByCategory(category: KBRule['category']): KBRule[] {
  return knowledgeBase.filter((rule) => rule.category === category);
}

export function getKBRulesForAnalysis(age: number, drawingType: string): KBRule[] {
  const ageRules = getKBRulesForAge(age);

  if (drawingType === 'full_htp') {
    return ageRules;
  }

  const categoryMap: Record<string, KBRule['category'][]> = {
    house: ['house', 'general'],
    tree: ['tree', 'general'],
    person: ['person', 'general'],
  };

  const categories = categoryMap[drawingType] || ['general'];
  return ageRules.filter((rule) => categories.includes(rule.category));
}

// Alias for simpler usage - returns rules filtered by drawing type
export function getKBRules(drawingType: string): KBRule[] {
  const categoryMap: Record<string, KBRule['category'][]> = {
    house: ['house', 'general'],
    tree: ['tree', 'general'],
    person: ['person', 'general'],
    full_htp: ['house', 'tree', 'person', 'general'],
  };

  const categories = categoryMap[drawingType] || ['general'];
  return knowledgeBase.filter((rule) => categories.includes(rule.category));
}

export default knowledgeBase;
