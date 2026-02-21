import { AnimatePresence, motion } from 'framer-motion'
import { useEngine } from '@/hooks/useEngine'
import { HeroOverlay } from '@/components/hero/HeroOverlay'
import { Sidebar } from '@/components/layout/Sidebar'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { EntityCard } from '@/components/cards/EntityCard'
import { ProgressiveLoader } from '@/components/loaders/ProgressiveLoader'
import { OutreachCopilot } from '@/components/copilot/OutreachCopilot'
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react'
import { staggerContainer, fadeSlideUp } from '@/lib/motionVariants'
import { Button } from './components/ui/button'

const fadeSlide = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
}

function WorkspaceHeader({ title, subtitle }: { title: string; subtitle: string }) {
    return (
        <motion.div
            layout
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
            <motion.div variants={fadeSlideUp}>
                <h2 className="text-2xl font-black text-slate-100 tracking-tight">{title}</h2>
                <p className="text-sm font-medium text-slate-500 mt-1">{subtitle}</p>
            </motion.div>

            <motion.div variants={fadeSlideUp} className="flex items-center gap-3">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-sm focus-within:border-teal-500/50 transition-all w-full md:w-64 group shadow-sm">
                    <Search className="w-4 h-4 group-hover:text-teal-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search clusters..."
                        className="bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-600 w-full"
                    />
                </div>

                <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl shadow-sm">
                    <button className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shadow-sm">
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-slate-500 hover:text-slate-300">
                        <List className="w-4 h-4" />
                    </button>
                </div>

                <Button variant="outline" className="border-slate-800 text-slate-400 gap-2 h-11 px-4 rounded-xl hover:bg-slate-800">
                    <SlidersHorizontal className="w-4 h-4" />
                    Config
                </Button>
            </motion.div>
        </motion.div>
    )
}

function HomeView() {
    const { results, isLoading } = useEngine()

    if (isLoading) {
        return <ProgressiveLoader />
    }

    return (
        <motion.div
            className="p-8 pb-20 max-w-[1600px] mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
        >
            <WorkspaceHeader
                title="Intelligence Discovery"
                subtitle={`System found ${results.length} mapped entities across ${new Set(results.map(e => e.district)).size} district clusters`}
            />

            <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {results.map((entity, index) => (
                        <EntityCard key={entity.id} entity={entity} index={index} />
                    ))}
                </AnimatePresence>
            </motion.div>
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
