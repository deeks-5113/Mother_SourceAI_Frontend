export type ViewType = 'hero' | 'home' | 'outreach' | 'funding' | 'admin'

export interface Entity {
    id: string
    name: string
    type: 'NGO' | 'PHC' | 'Government Scheme'
    district: string
    ruralUrban: 'Rural' | 'Urban'
    relevance: number
    ai_reasoning: string
    draftEmail: string
}

export const districts = [
    'Anantapur',
    'Chittoor',
    'Guntur',
    'Krishna',
    'Kurnool',
    'Nellore',
    'Prakasam',
    'Visakhapatnam',
]

export const mockEntities: Entity[] = [
    {
        id: 'e1',
        name: 'Saheli Women Welfare Trust',
        type: 'NGO',
        district: 'Anantapur',
        ruralUrban: 'Rural',
        relevance: 94,
        ai_reasoning:
            'High alignment with maternal health mandate. Active in 12 villages within Anantapur cluster. Previously ran ASHA worker training programs — strong grassroots network for beneficiary identification.',
        draftEmail:
            'Dear Saheli Team,\n\nWe are reaching out from MotherSource AI, a platform dedicated to connecting underserved mothers with essential resources. Our AI analysis indicates a 94% alignment between your organization\'s work and the needs of mothers in the Anantapur cluster.\n\nWe would love to explore a partnership to extend your ASHA worker network for beneficiary identification.\n\nWarm regards,\nMotherSource AI',
    },
    {
        id: 'e2',
        name: 'District PHC — Chittoor Central',
        type: 'PHC',
        district: 'Chittoor',
        ruralUrban: 'Urban',
        relevance: 87,
        ai_reasoning:
            'Covers 23,000+ registered beneficiaries. Reports indicate consistent ANC visit data available. co-location with ICDS center creates synergy for nutritional support hand-off.',
        draftEmail:
            'Dear PHC Chittoor Central,\n\nMotherSource AI has identified your facility as a key partner for our maternal health outreach initiative. With over 23,000 registered beneficiaries and strong ANC data coverage, we see tremendous potential for collaboration.\n\nCould we schedule a brief call to discuss integration possibilities?\n\nBest regards,\nMotherSource AI',
    },
    {
        id: 'e3',
        name: 'Pradhan Mantri Matru Vandana Yojana',
        type: 'Government Scheme',
        district: 'Guntur',
        ruralUrban: 'Rural',
        relevance: 91,
        ai_reasoning:
            'PMMVY coverage in Guntur is at 62% — 38% gap represents ~4,200 eligible mothers not receiving benefits. Cross-referencing with Aadhaar-seeded data can accelerate enrollment.',
        draftEmail:
            'Dear PMMVY District Coordinator,\n\nOur analysis shows a significant coverage gap of 38% in Guntur district, affecting approximately 4,200 eligible mothers. MotherSource AI can assist in identifying and enrolling these beneficiaries through our data cross-referencing capabilities.\n\nLooking forward to your response.\n\nRegards,\nMotherSource AI',
    },
    {
        id: 'e4',
        name: 'Hope Foundation for Mothers',
        type: 'NGO',
        district: 'Krishna',
        ruralUrban: 'Urban',
        relevance: 78,
        ai_reasoning:
            'Urban-focused NGO with strong digital outreach. 8,500 WhatsApp subscribers in Krishna district. Can serve as communication channel for scheme awareness campaigns.',
        draftEmail:
            'Dear Hope Foundation,\n\nMotherSource AI has identified your organization\'s digital outreach capabilities as a strong fit for our maternal support awareness campaigns in Krishna district.\n\nYour 8,500-strong WhatsApp network could be instrumental in reaching urban mothers with scheme information.\n\nBest,\nMotherSource AI',
    },
    {
        id: 'e5',
        name: 'Kurnool Rural Health Mission',
        type: 'PHC',
        district: 'Kurnool',
        ruralUrban: 'Rural',
        relevance: 82,
        ai_reasoning:
            'Sub-center network spans 45 villages. High-risk pregnancy identification rate above district average. Limited digital infrastructure — requires offline-first outreach strategy.',
        draftEmail:
            'Dear Kurnool RHM Team,\n\nYour sub-center network\'s impressive coverage across 45 villages and strong high-risk pregnancy identification makes you an ideal MotherSource AI partner.\n\nWe\'d like to discuss how our platform can complement your offline-first approach.\n\nRegards,\nMotherSource AI',
    },
    {
        id: 'e6',
        name: 'Janani Suraksha Yojana',
        type: 'Government Scheme',
        district: 'Nellore',
        ruralUrban: 'Rural',
        relevance: 88,
        ai_reasoning:
            'JSY institutional delivery incentive uptake in Nellore is 71%. Vectorized PHC data reveals 1,800+ home deliveries last quarter — targeted outreach could shift 40% to institutional settings.',
        draftEmail:
            'Dear JSY District Office,\n\nMotherSource AI analysis reveals an opportunity to improve institutional delivery rates in Nellore. Our data indicates 1,800+ home deliveries last quarter that could benefit from targeted JSY outreach.\n\nWe request a meeting to share our detailed analysis.\n\nRegards,\nMotherSource AI',
    },
    {
        id: 'e7',
        name: 'Arogya Lakshmi Foundation',
        type: 'NGO',
        district: 'Prakasam',
        ruralUrban: 'Rural',
        relevance: 73,
        ai_reasoning:
            'Nutrition-focused NGO operating in 8 mandals. Moderate alignment — primary focus is child nutrition (0-5 years) but overlapping beneficiary base with expectant mothers makes collaboration viable.',
        draftEmail:
            'Dear Arogya Lakshmi Foundation,\n\nWhile your primary focus is child nutrition, MotherSource AI has identified a significant overlap in your beneficiary base with expectant mothers in Prakasam district.\n\nA joint approach could strengthen outcomes for both mothers and children.\n\nBest regards,\nMotherSource AI',
    },
    {
        id: 'e8',
        name: 'UPHC Visakhapatnam Port Area',
        type: 'PHC',
        district: 'Visakhapatnam',
        ruralUrban: 'Urban',
        relevance: 85,
        ai_reasoning:
            'Urban PHC with high migrant worker population. ANC registration shows 35% inter-state migrants. Multilingual outreach capability needed — Hindi, Telugu, Odiya support recommended.',
        draftEmail:
            'Dear UPHC Visakhapatnam Team,\n\nMotherSource AI has flagged your facility for its unique migrant population demographics. With 35% inter-state migrant ANC registrations, we believe a multilingual outreach strategy could significantly improve maternal care access.\n\nLet\'s discuss how we can support this effort.\n\nRegards,\nMotherSource AI',
    },
]
