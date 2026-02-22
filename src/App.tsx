import { AnimatePresence, motion } from 'framer-motion'
import { useEngine } from '@/hooks/useEngine'
import { AuroraHero } from '@/components/hero/AuroraHero'
import { FeatureBentoGrid } from '@/components/sections/FeatureBentoGrid'
import { SpecialistsCarousel } from '@/components/sections/SpecialistsCarousel'
import { Sidebar } from '@/components/layout/Sidebar'
import { FilterPanel } from '@/components/layout/FilterPanel'
import { EntityCard } from '@/components/cards/EntityCard'
import { ProgressiveLoader } from '@/components/loaders/ProgressiveLoader'
import { OutreachCopilot } from '@/components/copilot/OutreachCopilot'
import { MainStage } from '@/components/layout/MainStage'
import { ImpactGrid } from '@/components/sections/ImpactGrid'
import { FinalFooter } from '@/components/sections/FinalFooter'
import { OutreachView } from '@/components/sections/OutreachView'
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
                <h2 className="text-2xl font-black text-[#1E1B4B] tracking-tight">{title}</h2>
                <p className="text-sm font-medium text-slate-400 mt-1">{subtitle}</p>
            </motion.div>

            <motion.div variants={fadeSlideUp} className="flex items-center gap-3">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F9E8D4]/50 border border-[#1E1B4B]/5 text-[#1E1B4B]/40 text-sm focus-within:border-[#F9C784] transition-all w-full md:w-64 group shadow-sm">
                    <Search className="w-4 h-4 group-hover:text-[#F9C784] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search clusters..."
                        className="bg-transparent border-none outline-none text-[#1E1B4B] placeholder:text-[#1E1B4B]/30 w-full"
                    />
                </div>

                <div className="flex bg-[#F9E8D4]/50 border border-[#1E1B4B]/5 p-1 rounded-xl shadow-sm">
                    <button className="p-2 rounded-lg bg-[#F9C784] text-[#1E1B4B] shadow-sm">
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-[#1E1B4B]/40 hover:text-[#1E1B4B]">
                        <List className="w-4 h-4" />
                    </button>
                </div>

                <Button variant="outline" className="border-[#1E1B4B]/10 text-[#1E1B4B]/60 gap-2 h-11 px-4 rounded-xl hover:bg-[#F9E8D4]/50">
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
            className="p-8 pb-20 max-w-[1600px] mx-auto w-full"
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
                    className="flex flex-col items-center justify-center py-20 text-[#1E1B4B]/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Search className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-lg font-medium text-[#1E1B4B]/40">No entities match your filters</p>
                    <p className="text-sm mt-1">Try adjusting your district or area type selections</p>
                </motion.div>
            )}
        </motion.div>
    )
}

function PlaceholderView({ title, description }: { title: string; description: string }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center h-full p-6 text-center"
            {...fadeSlide}
            transition={{ duration: 0.4 }}
        >
            <div className="max-w-md">
                <div className="w-16 h-16 rounded-3xl bg-[#F9E8D4] border border-[#1E1B4B]/10 flex items-center justify-center mx-auto mb-6">
                    <SlidersHorizontal className="w-8 h-8 text-[#1E1B4B]" />
                </div>
                <h2 className="text-2xl font-black text-[#1E1B4B] mb-2">{title}</h2>
                <p className="text-[#1E1B4B]/60 font-medium leading-relaxed">{description}</p>
                <div className="mt-6 px-4 py-2 rounded-full bg-[#1E1B4B]/5 border border-[#1E1B4B]/10 text-[10px] font-black uppercase tracking-widest text-[#1E1B4B]/40 inline-block">
                    Module under development
                </div>
            </div>
        </motion.div>
    )
}

function Workspace() {
    const { currentView } = useEngine()

    return (
        <div className="flex-1 overflow-y-auto bg-white">
            <AnimatePresence mode="wait">
                {currentView === 'home' && (
                    <motion.div key="home" {...fadeSlide} className="min-h-full flex flex-col">
                        <HomeView />
                    </motion.div>
                )}

                {currentView === 'outreach' && (
                    <motion.div key="outreach" {...fadeSlide} className="h-full">
                        <OutreachView />
                    </motion.div>
                )}

                {(['funding', 'admin'] as const).map(view =>
                    currentView === view && (
                        <motion.div key={view} {...fadeSlide} className="h-full">
                            <PlaceholderView
                                title={`${view.charAt(0).toUpperCase() + view.slice(1)} Module`}
                                description={`The ${view} management system is currently being optimized for the Clinical Aurora interface.`}
                            />
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </div>
    )
}

export default function App() {
    const { currentView } = useEngine()

    return (
        <MainStage>
            <AnimatePresence mode="wait">
                {currentView === 'hero' ? (
                    <motion.div
                        key="hero-scroll"
                        className="flex-1 overflow-y-auto hide-scrollbar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <AuroraHero />
                        <FeatureBentoGrid />
                        <SpecialistsCarousel />
                        <ImpactGrid />
                        <FinalFooter />
                    </motion.div>
                ) : (
                    <motion.div
                        key="dashboard"
                        className="flex-1 flex overflow-hidden"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Sidebar />
                        <div className="flex-1 flex overflow-hidden bg-white/50 relative">
                            <AnimatePresence mode="popLayout">
                                {currentView !== 'outreach' && (
                                    <motion.div
                                        key="filter-panel"
                                        initial={{ x: -320, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -320, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="h-full"
                                    >
                                        <FilterPanel />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Workspace />
                        </div>
                        <OutreachCopilot />
                    </motion.div>
                )}
            </AnimatePresence>
        </MainStage>
    )
}
