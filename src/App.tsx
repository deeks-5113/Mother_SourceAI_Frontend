import { AnimatePresence, motion } from 'framer-motion'
import { useEngine } from '@/hooks/useEngine'
import { HeroOverlay } from '@/components/hero/HeroOverlay'
import { Sidebar } from '@/components/layout/Sidebar'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { EntityCard } from '@/components/cards/EntityCard'
import { ProgressiveLoader } from '@/components/loaders/ProgressiveLoader'
import { OutreachCopilot } from '@/components/copilot/OutreachCopilot'
import { Search, SlidersHorizontal } from 'lucide-react'

const fadeSlide = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
}

function WorkspaceHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <motion.div
            layout
            className="flex items-center justify-between mb-6"
            {...fadeSlide}
            transition={{ duration: 0.4 }}
        >
            <div>
                <h2 className="text-xl font-bold text-slate-100">{title}</h2>
                <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 text-sm">
                    <Search className="w-4 h-4" />
                    <span>Search entities...</span>
                </div>
                <button className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
                    <SlidersHorizontal className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}

function HomeView() {
    const { results, isLoading } = useEngine()

    if (isLoading) {
        return <ProgressiveLoader />
    }

    return (
        <motion.div className="p-6" {...fadeSlide} transition={{ duration: 0.4 }}>
            <WorkspaceHeader
                title="Entity Discovery"
                subtitle={`${results.length} entities matched across ${new Set(results.map(e => e.district)).size} districts`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                    {results.map((entity, index) => (
                        <EntityCard key={entity.id} entity={entity} index={index} />
                    ))}
                </AnimatePresence>
            </div>
            {results.length === 0 && (
                <motion.div
                    className="flex flex-col items-center justify-center py-20 text-slate-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Search className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-lg font-medium">No entities match your filters</p>
                    <p className="text-sm mt-1">Try adjusting your district or area type selections</p>
                </motion.div>
            )}
        </motion.div>
    )
}

function PlaceholderView({ title, description }: { title: string; description: string }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full p-6"
            {...fadeSlide}
            transition={{ duration: 0.4 }}
        >
            <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-violet-500/20 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
                    <SlidersHorizontal className="w-8 h-8 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">{title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                <div className="mt-6 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-slate-500 inline-block">
                    Module under development
                </div>
            </div>
        </motion.div>
    )
}

function Workspace() {
    const { currentView } = useEngine()

    return (
        <div className="flex-1 overflow-y-auto min-h-screen">
            <AnimatePresence mode="wait">
                {currentView === 'home' && (
                    <motion.div key="home" {...fadeSlide}>
                        <HomeView />
                    </motion.div>
                )}
                {currentView === 'outreach' && (
                    <motion.div key="outreach" {...fadeSlide}>
                        <PlaceholderView
                            title="Outreach Campaigns"
                            description="Manage automated outreach campaigns to NGOs, PHCs, and government scheme coordinators. Track response rates and follow-up schedules."
                        />
                    </motion.div>
                )}
                {currentView === 'funding' && (
                    <motion.div key="funding" {...fadeSlide}>
                        <PlaceholderView
                            title="Funding Pipeline"
                            description="Track grant applications, CSR partnerships, and donor engagement. AI-matched funding opportunities updated in real time."
                        />
                    </motion.div>
                )}
                {currentView === 'admin' && (
                    <motion.div key="admin" {...fadeSlide}>
                        <PlaceholderView
                            title="Admin Console"
                            description="User management, system configuration, and audit logs. Monitor engine health and vectorization pipeline status."
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function App() {
    const { currentView } = useEngine()

    return (
        <>
            <AnimatePresence mode="wait">
                {currentView === 'hero' && <HeroOverlay key="hero" />}
            </AnimatePresence>

            {currentView !== 'hero' && (
                <motion.div
                    className="flex min-h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Sidebar />
                    <FilterPanel />
                    <Workspace />
                    <OutreachCopilot />
                </motion.div>
            )}
        </>
    )
}
