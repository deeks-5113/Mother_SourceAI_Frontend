import type { Entity } from "@/data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export interface ChannelResponseItem {
    entity_id: string;
    name: string;
    type: string;
    content?: string;
    semantic_summary?: string;
    rank_position: number;
    relevance_score: number;
    comparative_reasoning: string;
}

export interface SearchResponse {
    results: ChannelResponseItem[];
    district: string;
    demographic: string;
}

export interface SearchRequest {
    district: string;
    demographic: 'Urban' | 'Rural' | 'General';
    specific_need: string;
}

export interface OutreachRequest {
    entity_id: string;
    pilot_description: string;
    sender_name: string;
    tone: 'warm' | 'professional';
    channel: 'email' | 'whatsapp' | 'phone_script' | 'linkedin' | 'concept_note';
    recipient_name?: string;
    recipient_role?: string;
}

export interface OutreachResponse {
    subject_line: string;
    message_content: string;
    missing_variables: string[];
}

export const apiService = {
    async searchChannels(request: SearchRequest): Promise<Entity[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/channels/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `API Error: ${response.status}`);
            }

            const data: SearchResponse = await response.json();

            // Map backend response to frontend Entity type
            return data.results.map((item) => ({
                id: item.entity_id,
                name: item.name,
                type: item.type as 'NGO' | 'PHC' | 'Government Scheme', // Assuming backend types match or need casting
                district: data.district,
                ruralUrban: data.demographic as 'Rural' | 'Urban',
                relevance: Math.round(item.relevance_score * 100),
                ai_reasoning: item.comparative_reasoning,
                draftEmail: `Dear ${item.name} Team,\n\nWe are reaching out from MotherSource AI...`, // Default draft
                rank: item.rank_position,
                content: item.content,
                semantic_summary: item.semantic_summary,
            }));
        } catch (error) {
            console.error("Failed to fetch channels:", error);
            throw error;
        }
    },

    async generateOutreach(request: OutreachRequest): Promise<OutreachResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/outreach/draft`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Outreach API Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Outreach generation failed:", error);
            throw error;
        }
    },

    async checkHealth(): Promise<boolean> {
        try {
            // Health check is outside /api/v1 usually
            const baseUrl = API_BASE_URL.replace('/api/v1', '');
            const response = await fetch(`${baseUrl}/health`);
            const data = await response.json();
            return data.status === 'ok';
        } catch {
            return false;
        }
    }
};
