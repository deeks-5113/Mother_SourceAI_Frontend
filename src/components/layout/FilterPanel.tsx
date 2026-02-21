import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useEngine } from '@/hooks/useEngine'
import { districts } from '@/data/mockData'
import { MapPin, Filter, Search, ChevronRight, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { springTransition } from '@/lib/motionVariants'

export function FilterPanel() {
    const { filters, setFilters, triggerSearch } = useEngine()
    const [showAllDistricts, setShowAllDistricts] = useState(false)
    const [districtSearch, setDistrictSearch] = useState('')

    const toggleDistrict = (district: string) => {
        setFilters((prev) => ({
            ...prev,
            districts: prev.districts.includes(district)
                ? prev.districts.filter((d: string) => d !== district)
                : [...prev.districts, district],
        }))
    }

    const setEnvironment = (value: 'all' | 'rural' | 'urban') => {
        setFilters((prev) => ({ ...prev, environment: value }))
    }

    const setSpecificNeed = (value: string) => {
        setFilters((prev) => ({ ...prev, specificNeed: value }))
    }

    const filteredDistricts = useMemo(() => {
        const searched = districts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()))
        if (showAllDistricts || districtSearch) return searched
        return searched.slice(0, 6)
    }, [districtSearch, showAllDistricts])

    return (
        <motion.div
            layout
            className="w-[280px] h-screen glass-panel bg-slate-900/40 border-r border-slate-700/50 p-5 flex flex-col gap-5 overflow-hidden"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={springTransition}
        >
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 text-sm font-bold text-slate-200 tracking-tight">
                    <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                        <Filter className="w-4 h-4" />
                    </div>
                    Discovery Filters
                </div>
            </div>

            <Separator className="bg-slate-800 shrink-0" />

            {/* Outreach Need */}
            <div className="space-y-3 shrink-0">
                <div className="flex items-center justify-between group cursor-default">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                        Outreach Need
                    </h4>
                    <MessageSquare className="w-3 h-3 text-slate-600 group-hover:text-teal-500 transition-colors" />
                </div>

                <div className="relative group">
                    <textarea
                        value={filters.specificNeed}
                        onChange={(e) => setSpecificNeed(e.target.value)}
                        placeholder="e.g. maternal vaccination outreach..."
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl p-3 text-[11px] text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-teal-500/50 transition-all min-h-[70px] resize-none"
                    />
                </div>
            </div>

            <Separator className="bg-slate-800 shrink-0" />

            {/* Districts */}
            <div className="space-y-3 flex-1 overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between group cursor-default shrink-0">
                    <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                        Target District
                    </h4>
                    <MapPin className="w-3 h-3 text-slate-600 group-hover:text-teal-400 transition-colors" />
                </div>

                <div className="relative group shrink-0 mb-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600 group-focus-within:text-teal-500 transition-colors" />
                    <input
                        type="text"
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                        placeholder="Search district..."
                        className="w-full bg-slate-950/30 border border-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-[10px] text-slate-400 focus:outline-none focus:border-teal-500/30 transition-all"
                    />
                </div>

                <div
                    className="flex flex-col gap-1 overflow-y-auto pr-1 custom-scrollbar min-h-0 flex-1"
                >
                    {filteredDistricts.map((district) => {
                        const isSelected = filters.districts.includes(district)
                        return (
                            <button
                                key={district}
                                onClick={() => toggleDistrict(district)}
                                className={cn(
                                    'flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] transition-all duration-300 text-left cursor-pointer group shrink-0 outline-none',
                                    isSelected
                                        ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.05)]'
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                                )}
                            >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                    <div
                                        className={cn(
                                            'w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all duration-300 shrink-0',
                                            isSelected
                                                ? 'bg-teal-500 border-teal-500 glow-teal'
                                                : 'border-slate-700 group-hover:border-slate-500'
                                        )}
                                    >
                                        {isSelected && (
                                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12">
                                                <path
                                                    d="M3.5 6L5.5 8L8.5 4"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="font-medium truncate">{district}</span>
                                </div>
                                <ChevronRight className={cn(
                                    "w-3 h-3 opacity-0 group-hover:opacity-40 transition-all",
                                    isSelected && "opacity-20"
                                )} />
                            </button>
                        )
                    })}
                </div>

                {!districtSearch && districts.length > 6 && (
                    <button
                        onClick={() => setShowAllDistricts(!showAllDistricts)}
                        className="flex items-center justify-center gap-1.5 py-1 text-[10px] font-bold text-slate-500 hover:text-teal-400 transition-colors cursor-pointer mt-1 shrink-0"
                    >
                        {showAllDistricts ? <><ChevronUp className="w-3 h-3" /> Show Less</> : <><ChevronDown className="w-3 h-3" /> Show All {districts.length}</>}
                    </button>
                )}
            </div>

            <Separator className="bg-slate-800 shrink-0" />

            {/* Rural / Urban Toggle */}
            <div className="space-y-3 shrink-0">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                    Area Type
                </h4>
                <div className="flex bg-slate-950/50 rounded-xl p-1 border border-slate-800 gap-1 tracking-tight">
                    {(['all', 'rural', 'urban'] as const).map((value) => {
                        const isActive = filters.environment === value;
                        return (
                            <button
                                key={value}
                                onClick={() => setEnvironment(value)}
                                className={cn(
                                    'relative flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all duration-500 cursor-pointer capitalize z-10',
                                    isActive ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="filter-env-active"
                                        className="absolute inset-0 rounded-lg bg-teal-500/10 border border-teal-500/20 shadow-sm"
                                        transition={springTransition as any}
                                    />
                                )}
                                <span className="relative z-20">{value}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Search Trigger */}
            <div className="shrink-0 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/50 space-y-3">
                <Button
                    onClick={() => triggerSearch('channels')}
                    className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] h-9 shadow-[0_4px_12px_rgba(20,184,166,0.2)] cursor-pointer"
                    size="sm"
                >
                    <Search className="w-3.5 h-3.5 mr-2" />
                    Launch AI Discovery
                </Button>
            </div>

            {/* Reset Filters */}
            {(filters.districts.length > 0 || filters.environment !== 'all' || filters.specificNeed !== '') && (
                <button
                    onClick={() => setFilters({ districts: [], environment: 'all', specificNeed: '' })}
                    className="w-full py-1 text-[10px] font-bold text-slate-500 hover:text-teal-400 transition-all cursor-pointer uppercase tracking-widest shrink-0"
                >
                    Reset Config
                </button>
            )}
        </motion.div>
    )
}
