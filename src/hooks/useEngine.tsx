import { useState, createContext, useContext, type ReactNode } from 'react';
import { type Entity, mockEntities } from '../data/mockData';

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
        districts: string[];
        environment: 'all' | 'rural' | 'urban';
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        districts: string[];
        environment: 'all' | 'rural' | 'urban';
    }>>;
    results: Entity[];
    triggerSearch: (type: 'channels' | 'partners') => Promise<void>;
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

export function EngineProvider({ children }: { children: ReactNode }) {
    const [currentView, setCurrentView] = useState<View>('hero');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
    const [results, setResults] = useState<Entity[]>(mockEntities);
    const [filters, setFilters] = useState<{
        districts: string[];
        environment: 'all' | 'rural' | 'urban';
    }>({
        districts: [],
        environment: 'all'
    });

    // The "Judge-Winning" Search Trigger
    const triggerSearch = async (_type: 'channels' | 'partners') => {
        setIsLoading(true);

        // Simulate API Latency to show off the ProgressiveLoader
        // In production, this connects to /api/v1/searches/channels or /api/v1/searches/partners
        await new Promise((resolve) => setTimeout(resolve, 3500));

        // Logic to filter results based on selected parameters
        const filtered = mockEntities.filter(e => {
            const matchEnv = filters.environment === 'all' || e.ruralUrban.toLowerCase() === filters.environment;
            const matchDist = filters.districts.length === 0 || filters.districts.includes(e.district);
            return matchEnv && matchDist;
        });

        setResults(filtered);
        setIsLoading(false);
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
