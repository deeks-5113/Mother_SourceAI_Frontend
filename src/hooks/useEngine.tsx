import React, { useState, createContext, useContext, useCallback } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { type Entity, mockEntities } from '../data/mockData';
import { apiService } from '../services/api';
import type { DispatchSessionSummary } from '../services/api';

// Define the possible views for our State-Driven SPA
type View = 'hero' | 'home' | 'outreach' | 'funding' | 'admin';

export interface OutreachThread {
    id: string;
    entity_id: string;
    entity_name: string;
    channel: string;
    created_at: string;
    updated_at: string;
}

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
    // Thread Persistence (API-backed)
    threads: OutreachThread[];
    activeThreadId: string | null;
    messages: { role: 'user' | 'ai'; content: string; timestamp: Date }[];
    setMessages: Dispatch<SetStateAction<{ role: 'user' | 'ai'; content: string; timestamp: Date }[]>>;
    isDispatching: boolean;
    isSendingChat: boolean;
    dispatchToOutreach: () => Promise<void>;
    sendChatMessage: (text: string) => Promise<void>;
    fetchThreads: () => Promise<void>;
    loadThread: (id: string) => Promise<void>;
    deleteThread: (id: string) => Promise<void>;
    createNewThread: () => void;
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

    // The Search Trigger
    const triggerSearch = async (type: 'channels' | 'partners') => {
        setIsLoading(true);

        try {
            if (type === 'channels') {
                try {
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
            } else if (type === 'partners') {
                try {
                    const target_region = filters.districts || 'Tirupati';
                    const project_goal = filters.specificNeed || 'AI-driven maternal nutrition pilot for rural mothers';

                    // Field rules: target_region min 2, project_goal min 10
                    if (target_region.length >= 2 && project_goal.length >= 10) {
                        const responseResults = await apiService.searchPartners({
                            target_region,
                            project_goal
                        });

                        if (responseResults && responseResults.length > 0) {
                            setResults(responseResults);
                            setIsLoading(false);
                            return;
                        }
                    }
                } catch (apiError) {
                    console.warn("Partner API unavailable, falling back to mock data:", apiError);
                }
            }

            // Fallback: Mock Data filtering
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const filtered = mockEntities.filter(e => {
                const env = e.ruralUrban.toLowerCase() === filters.environment;
                const distSet = !filters.districts || filters.districts === e.district;
                return env && distSet;
            });

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

    // --- Thread Persistence (API-backed) ---
    const [threads, setThreads] = useState<OutreachThread[]>([]);
    const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string; timestamp: Date }[]>([]);
    const [isDispatching, setIsDispatching] = useState(false);
    const [isSendingChat, setIsSendingChat] = useState(false);

    // Dispatch: Create a brainstorm session from the current outreach draft
    const dispatchToOutreach = useCallback(async () => {
        if (!selectedEntity || !generatedDraft) return;

        setIsDispatching(true);
        try {
            const response = await apiService.createDispatchSession({
                entity_id: selectedEntity.id,
                entity_name: selectedEntity.name,
                pilot_description: selectedEntity.content || "MotherSource AI Maternal Health Initiative",
                channel: outreachMeta.channel,
                outreach_subject: generatedDraft.subject,
                outreach_body: generatedDraft.content,
            });

            setActiveThreadId(response.session_id);
            setMessages([
                { role: 'ai', content: response.seed_message, timestamp: new Date() }
            ]);

            // Add to local threads list immediately
            const newThread: OutreachThread = {
                id: response.session_id,
                entity_id: selectedEntity.id,
                entity_name: selectedEntity.name,
                channel: outreachMeta.channel,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            setThreads(prev => [newThread, ...prev]);
            setCurrentView('outreach');
        } catch (error) {
            console.error("Dispatch failed, using local fallback:", error);
            // Fallback: create a local-only thread
            const fallbackId = Date.now().toString();
            setActiveThreadId(fallbackId);
            setMessages([
                {
                    role: 'ai',
                    content: `I've reviewed the outreach draft for ${selectedEntity.name}. The ${outreachMeta.channel} strategy looks solid. How would you like to refine it?`,
                    timestamp: new Date()
                }
            ]);
            const fallbackThread: OutreachThread = {
                id: fallbackId,
                entity_id: selectedEntity.id,
                entity_name: selectedEntity.name,
                channel: outreachMeta.channel,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };
            setThreads(prev => [fallbackThread, ...prev]);
            setCurrentView('outreach');
        } finally {
            setIsDispatching(false);
        }
    }, [selectedEntity, generatedDraft, outreachMeta]);

    // Send a chat message in the active brainstorm session
    const sendChatMessage = useCallback(async (text: string) => {
        if (!activeThreadId || !text.trim()) return;

        // Immediately add user message
        const userMsg = { role: 'user' as const, content: text, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setIsSendingChat(true);

        try {
            const response = await apiService.sendDispatchChat(activeThreadId, text);
            setMessages(prev => [...prev, { role: 'ai', content: response.reply, timestamp: new Date() }]);
        } catch (error) {
            console.error("Chat failed, using fallback:", error);
            // Fallback: simulated response
            const fallbackResponses = [
                "Strategy refinement complete. I've adjusted the messaging to better align with the recipient's role.",
                "Optimizing metadata for higher resonance. Would you like to see a variant focused on community impact?",
                "Analyzing response patterns... I've added a stronger call-to-action focused on a pilot introduction.",
            ];
            setMessages(prev => [...prev, {
                role: 'ai',
                content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
                timestamp: new Date()
            }]);
        } finally {
            setIsSendingChat(false);
        }
    }, [activeThreadId]);

    // Fetch all threads from the backend
    const fetchThreads = useCallback(async () => {
        try {
            const sessions = await apiService.listDispatchSessions();
            setThreads(sessions.map((s: DispatchSessionSummary) => ({
                id: s.id,
                entity_id: s.entity_id,
                entity_name: s.entity_name,
                channel: s.channel,
                created_at: s.created_at,
                updated_at: s.updated_at,
            })));
        } catch (error) {
            console.error("Failed to fetch threads:", error);
        }
    }, []);

    // Load/resume a specific thread from the backend
    const loadThread = useCallback(async (id: string) => {
        setActiveThreadId(id);
        try {
            const session = await apiService.getDispatchSession(id);
            setMessages(session.messages.map(m => ({
                role: m.role === 'assistant' ? 'ai' as const : 'user' as const,
                content: m.content,
                timestamp: new Date(),
            })));
            // Restore entity context from session
            setGeneratedDraft({
                subject: session.outreach_draft.subject,
                content: session.outreach_draft.body,
                missing: [],
            });
        } catch (error) {
            console.error("Failed to load thread:", error);
            setMessages([{ role: 'ai', content: "Failed to resume this session. The backend may be unavailable.", timestamp: new Date() }]);
        }
    }, []);

    // Delete a thread
    const deleteThread = useCallback(async (id: string) => {
        try {
            await apiService.deleteDispatchSession(id);
            setThreads(prev => prev.filter(t => t.id !== id));
            if (activeThreadId === id) {
                setActiveThreadId(null);
                setMessages([]);
                setGeneratedDraft(null);
            }
        } catch (error) {
            console.error("Failed to delete thread:", error);
        }
    }, [activeThreadId]);

    // Reset for new thread
    const createNewThread = () => {
        setSelectedEntity(null);
        setGeneratedDraft(null);
        setActiveThreadId(null);
        setMessages([]);
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
                messages,
                setMessages,
                isDispatching,
                isSendingChat,
                dispatchToOutreach,
                sendChatMessage,
                fetchThreads,
                loadThread,
                deleteThread,
                createNewThread,
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

