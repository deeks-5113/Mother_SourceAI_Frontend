export type ViewType = 'hero' | 'home' | 'outreach' | 'funding' | 'admin'

export interface Entity {
    id: string
    name: string
    type: 'NGO' | 'PHC' | 'Government Scheme' | 'Funding'
    district: string
    ruralUrban: 'Rural' | 'Urban'
    relevance: number
    ai_reasoning: string
    draftEmail: string
    rank?: number
    content?: string
    semantic_summary?: string
}

export const districts = [
    'NTR',
    'Guntur',
    'Visakhapatnam',
    'East Godavari',
    'Sri Potti Sriramulu Nellore',
    'Prakasam',
    'Kakinada',
    'Srikakulam',
    'Vizianagaram',
    'Krishna',
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
            'Entity resolved from NHM Portal and 2025 NGO Darpan filings. High rural mother outreach history in Anantapur cluster. Previously ran ASHA worker training programs — highly effective grassroots network.',
        draftEmail:
            'Dear Saheli Team,\n\nWe are reaching out from MotherSource AI, a platform dedicated to connecting underserved mothers with essential resources. Our AI analysis indicates a 94% alignment between your organization\'s work and the needs of mothers in the Anantapur cluster.\n\nWe would love to explore a partnership to extend your ASHA worker network for beneficiary identification.\n\nWarm regards,\nMotherSource AI',
    },
    {
        id: 'e9',
        name: 'Skoll Foundation — India Health Fund',
        type: 'Funding',
        district: 'Hyderabad (HQ)',
        ruralUrban: 'Urban',
        relevance: 91,
        ai_reasoning:
            'Entity resolved from Global Philanthropy Index. Focus aligned with "Universal Maternal Coverage" mandate. Strong history of funding tech-driven health interventions in AP/Telangana.',
        draftEmail:
            'Dear Skoll Foundation India Team,\n\nMotherSource AI is currently mobilizing a district-wide maternal health lifeline across AP and Telangana. Given your focus on tech-driven health interventions, we invite you to anchor this mission.',
    },
    {
        id: 'e2',
        name: 'District PHC — Kakinada Central',
        type: 'PHC',
        district: 'Kakinada',
        ruralUrban: 'Urban',
        relevance: 87,
        ai_reasoning:
            'Entity resolved from National Health Portal (NHM). Covers 23,000+ registered beneficiaries. co-location with ICDS center creates synergy for nutritional support hand-off.',
        draftEmail:
            'Dear PHC Kakinada Central,\n\nMotherSource AI has identified your facility as a key partner for our maternal health outreach initiative...',
    },
    {
        id: 'e3',
        name: 'Pradhan Mantri Matru Vandana Yojana',
        type: 'Government Scheme',
        district: 'Guntur',
        ruralUrban: 'Rural',
        relevance: 91,
        ai_reasoning:
            'PMMVY coverage in Guntur is at 62% — 38% gap represents ~4,200 eligible mothers not receiving benefits...',
        draftEmail:
            'Dear PMMVY District Coordinator,\n\nOur analysis shows a significant coverage gap of 38% in Guntur district...',
    },
    {
        id: 'e4',
        name: 'Hope Foundation for Mothers',
        type: 'NGO',
        district: 'Krishna',
        ruralUrban: 'Urban',
        relevance: 78,
        ai_reasoning:
            'Urban-focused NGO with strong digital outreach. 8,500 WhatsApp subscribers in Krishna district...',
        draftEmail:
            'Dear Hope Foundation,\n\nMotherSource AI has identified your organization\'s digital outreach...',
    },
    {
        id: 'e5',
        name: 'Srikakulam Rural Health Mission',
        type: 'PHC',
        district: 'Srikakulam',
        ruralUrban: 'Rural',
        relevance: 82,
        ai_reasoning:
            'Sub-center network spans 45 villages. High-risk pregnancy identification rate above district average...',
        draftEmail:
            'Dear Srikakulam RHM Team,\n\nYour sub-center network\'s impressive coverage...',
    },
    {
        id: 'e6',
        name: 'Janani Suraksha Yojana',
        type: 'Government Scheme',
        district: 'NTR',
        ruralUrban: 'Rural',
        relevance: 88,
        ai_reasoning:
            'JSY institutional delivery incentive uptake in NTR is 71%. targeted outreach could shift 40% to institutional settings.',
        draftEmail:
            'Dear JSY District Office,\n\nMotherSource AI analysis reveals an opportunity to improve institutional delivery rates...',
    },
    {
        id: 'e7',
        name: 'Arogya Lakshmi Foundation',
        type: 'NGO',
        district: 'Prakasam',
        ruralUrban: 'Rural',
        relevance: 73,
        ai_reasoning:
            'Nutrition-focused NGO operating in 8 mandals in Prakasam... overlapping beneficiary base with expectant mothers makes collaboration viable.',
        draftEmail:
            'Dear Arogya Lakshmi Foundation,\n\nMotherSource AI has identified a significant overlap in your beneficiary base...',
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
