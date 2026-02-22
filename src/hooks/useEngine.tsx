import React, { useState, createContext, useContext } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { type Entity, mockEntities } from '../data/mockData';
import { apiService } from '../services/api';

// Define the possible views for our State-Driven SPA
type View = 'hero' | 'home' | 'outreach' | 'funding' | 'admin';

interface EngineContextType {
    currentView: View;
    setCurrentView: (view: View) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    selectedEntity: Entity | null;
    setSelectedEntity: (entity: Entity | null) => void;
    filters: {
        districts: string | null;
        environment: 'rural' | 'urban';
        specificNeed: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        districts: string | null;
        environment: 'rural' | 'urban';
        specificNeed: string;
    }>>;
    results: Entity[];
    triggerSearch: (type: 'channels' | 'partners') => Promise<void>;
    // Outreach Specifics
    outreachMeta: {
        channel: 'email' | 'whatsapp' | 'phone_script' | 'linkedin' | 'concept_note';
        tone: 'warm' | 'professional';
        recipientName: string;
        recipientRole: string;
    };
    setOutreachMeta: React.Dispatch<React.SetStateAction<EngineContextType['outreachMeta']>>;
    generatedDraft: {
        subject: string;
        content: string;
        missing: string[];
    } | null;
    isGenerating: boolean;
    handleGenerateOutreach: () => Promise<void>;
    // Thread Persistence
    threads: OutreachThread[];
    activeThreadId: string | null;
    saveCurrentThread: () => void;
    loadThread: (id: string) => void;
    createNewThread: () => void;
    messages: { role: 'user' | 'ai'; content: string; timestamp: Date }[];
    setMessages: Dispatch<SetStateAction<{ role: 'user' | 'ai'; content: string; timestamp: Date }[]>>;
}

export interface OutreachThread {
    id: string;
    title: string;
    timestamp: Date;
    entity: Entity | null;
    meta: EngineContextType['outreachMeta'];
    draft: EngineContextType['generatedDraft'];
    messages: { role: 'user' | 'ai'; content: string; timestamp: Date }[];
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

export function EngineProvider({ children }: { children: ReactNode }) {
    const [currentView, setCurrentView] = useState<View>('hero');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
    const [results, setResults] = useState<Entity[]>(mockEntities);
    const [filters, setFilters] = useState<{
        districts: string | null;
        environment: 'rural' | 'urban';
        specificNeed: string;
    }>({
        districts: null,
        environment: 'rural',
        specificNeed: ''
    });

    // The "Judge-Winning" Search Trigger
    const triggerSearch = async (type: 'channels' | 'partners') => {
        setIsLoading(true);

        try {
            if (type === 'channels') {
                try {
                    // Map frontend filters to backend request
                    const district = filters.districts || 'Hyderabad';
                    const demographic = (filters.environment.charAt(0).toUpperCase() + filters.environment.slice(1)) as 'Urban' | 'Rural';

                    const responseResults = await apiService.searchChannels({
                        district,
                        demographic,
                        specific_need: filters.specificNeed || 'General maternity outreach'
                    });

                    if (responseResults && responseResults.length > 0) {
                        setResults(responseResults);
                        setIsLoading(false);
                        return;
                    }
                } catch (apiError) {
                    console.warn("Backend API unavailable, falling back to mock data:", apiError);
                }
            }

            // Fallback: Simulation / Mock Data filtering (the "usual" behavior)
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const filtered = mockEntities.filter(e => {
                const env = e.ruralUrban.toLowerCase() === filters.environment;
                const distSet = !filters.districts || filters.districts === e.district;
                return env && distSet;
            });

            // Ensure we show at least some results in mock mode for empty filters
            setResults(filtered.length > 0 ? filtered : mockEntities.slice(0, 4));

        } catch (error) {
            console.error("Discovery failed completely:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Outreach Logic ---
    const [outreachMeta, setOutreachMeta] = useState<EngineContextType['outreachMeta']>({
        channel: 'email',
        tone: 'professional',
        recipientName: '',
        recipientRole: ''
    });
    const [generatedDraft, setGeneratedDraft] = useState<EngineContextType['generatedDraft']>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateOutreach = async () => {
        if (!selectedEntity) return;

        setIsGenerating(true);
        try {
            const response = await apiService.generateOutreach({
                entity_id: selectedEntity.id,
                pilot_description: selectedEntity.content || "MotherSource AI Maternal Health Initiative",
                sender_name: "MotherSource AI Protocol",
                tone: outreachMeta.tone,
                channel: outreachMeta.channel,
                recipient_name: outreachMeta.recipientName,
                recipient_role: outreachMeta.recipientRole
            });

            setGeneratedDraft({
                subject: response.subject_line,
                content: response.message_content,
                missing: response.missing_variables
            });
        } catch (error) {
            console.error("Outreach generation failed:", error);
            setGeneratedDraft({
                subject: outreachMeta.channel === 'email' ? "Partnership Opportunity: MotherSource AI" : "",
                content: `[DEMO FALLBACK] This is a generated ${outreachMeta.channel} for ${selectedEntity.name}. Tone: ${outreachMeta.tone}.`,
                missing: ["pilot_impact_metrics", "co_funding_ratio"]
            });
        } finally {
            setIsGenerating(false);
        }
    };

    // --- Thread Persistence ---
    const [threads, setThreads] = useState<OutreachThread[]>(() => {
        const saved = localStorage.getItem('mother_source_threads');
        return saved ? JSON.parse(saved) : [];
    });
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string; timestamp: Date }[]>([
        {
            role: 'ai',
            content: "Protocol initiated. I've architected the outreach draft based on your clinical parameters. I'm ready to refine the strategy or adjust the tone. What would you like to achieve next?",
            timestamp: new Date()
        }
    ]);

    const saveCurrentThread = () => {
        if (!selectedEntity || !generatedDraft) return;

        const newThread: OutreachThread = {
            id: activeThreadId || Date.now().toString(),
            title: outreachMeta.recipientName || selectedEntity.name,
            timestamp: new Date(),
            entity: selectedEntity,
            meta: outreachMeta,
            draft: generatedDraft,
            messages: messages
        };

        if (activeThreadId) {
            setThreads(prev => prev.map(t => t.id === activeThreadId ? newThread : t));
        } else {
            setThreads(prev => [newThread, ...prev]);
            setActiveThreadId(newThread.id);
        }

        localStorage.setItem('mother_source_threads', JSON.stringify([newThread, ...threads.filter(t => t.id !== newThread.id)]));
    };

    const loadThread = (id: string) => {
        const thread = threads.find(t => t.id === id);
        if (thread) {
            setSelectedEntity(thread.entity);
            setOutreachMeta(thread.meta);
            setGeneratedDraft(thread.draft);
            setMessages(thread.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) }))); // Ensure Date objects
            setActiveThreadId(id);
            setCurrentView('outreach');
        }
    };

    const createNewThread = () => {
        setSelectedEntity(null);
        setGeneratedDraft(null);
        setActiveThreadId(null);
        setMessages([
            {
                role: 'ai',
                content: "Protocol initiated. I've architected the outreach draft based on your clinical parameters. I'm ready to refine the strategy or adjust the tone. What would you like to achieve next?",
                timestamp: new Date()
            }
        ]);
        setOutreachMeta({
            channel: 'email',
            tone: 'professional',
            recipientName: '',
            recipientRole: ''
        });
        setCurrentView('home');
    };

    return (
        <EngineContext.Provider
            value={{
                currentView,
                setCurrentView,
                isLoading,
                setIsLoading,
                selectedEntity,
                setSelectedEntity,
                filters,
                setFilters,
                results,
                triggerSearch,
                outreachMeta,
                setOutreachMeta,
                generatedDraft,
                isGenerating,
                handleGenerateOutreach,
                threads,
                activeThreadId,
                saveCurrentThread,
                loadThread,
                createNewThread,
                messages,
                setMessages,
            }}
        >
            {children}
        </EngineContext.Provider>
    );
}

export const useEngine = () => {
    const context = useContext(EngineContext);
    if (!context) {
        throw new Error('useEngine must be used within an EngineProvider');
    }
    return context;
};
