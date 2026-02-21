import { useState, createContext, useContext, type ReactNode } from 'react';
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
        districts: string[];
        environment: 'all' | 'rural' | 'urban';
        specificNeed: string;
    };
    setFilters: React.Dispatch<React.SetStateAction<{
        districts: string[];
        environment: 'all' | 'rural' | 'urban';
        specificNeed: string;
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
        specificNeed: string;
    }>({
        districts: [],
        environment: 'all',
        specificNeed: ''
    });

    // The "Judge-Winning" Search Trigger
    const triggerSearch = async (type: 'channels' | 'partners') => {
        setIsLoading(true);

        try {
            if (type === 'channels') {
                // Map frontend filters to backend request
                // Backend API expects a single district, so we take the first or primary one
                const district = filters.districts.length > 0 ? filters.districts[0] : 'Hyderabad';
                const demographic = filters.environment === 'all' ? 'General' : (filters.environment.charAt(0).toUpperCase() + filters.environment.slice(1)) as 'Urban' | 'Rural';

                const responseResults = await apiService.searchChannels({
                    district,
                    demographic,
                    specific_need: filters.specificNeed || 'General maternity outreach'
                });

                setResults(responseResults);
            } else {
                // Fallback for 'partners' or other types (still using simulation for now)
                await new Promise((resolve) => setTimeout(resolve, 3500));
                const filtered = mockEntities.filter(e => {
                    const matchEnv = filters.environment === 'all' || e.ruralUrban.toLowerCase() === filters.environment;
                    const matchDist = filters.districts.length === 0 || filters.districts.includes(e.district);
                    return matchEnv && matchDist;
                });
                setResults(filtered);
            }
        } catch (error) {
            console.error("Discovery failed:", error);
            // Optionally set error state or show a toast
        } finally {
            setIsLoading(false);
        }
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
