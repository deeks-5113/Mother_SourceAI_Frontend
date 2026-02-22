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

    const setDistrict = (district: string) => {
        setFilters((prev) => ({
            ...prev,
            districts: prev.districts === district ? null : district,
        }))
    }

    const setEnvironment = (value: 'rural' | 'urban') => {
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
            className="w-[280px] h-screen bg-[#F9E8D4]/20 backdrop-blur-md border-r border-[#1E1B4B]/5 p-5 flex flex-col gap-5 overflow-hidden"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={springTransition}
        >
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5 text-sm font-black text-[#1E1B4B] tracking-tight">
                    <div className="p-1.5 rounded-lg bg-[#F9E8D4] text-[#1E1B4B]">
                        <Filter className="w-4 h-4" />
                    </div>
                    Intelligence Config
                </div>
            </div>

            <Separator className="bg-[#1E1B4B]/5 shrink-0" />

            {/* Outreach Need */}
            <div className="space-y-3 shrink-0">
                <div className="flex items-center justify-between group cursor-default">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Strategic Focus
                    </h4>
                    <MessageSquare className="w-3 h-3 text-slate-200 group-hover:text-[#F9C784] transition-colors" />
                </div>

                <div className="relative group">
                    <textarea
                        value={filters.specificNeed}
                        onChange={(e) => setSpecificNeed(e.target.value)}
                        placeholder="Define discovery focus..."
                        className="w-full bg-white/40 border border-[#1E1B4B]/10 rounded-2xl p-4 text-[11px] font-medium text-[#1E1B4B] placeholder:text-slate-300 focus:outline-none focus:border-[#F9C784]/40 transition-all min-h-[80px] resize-none shadow-sm"
                    />
                </div>
            </div>

            <Separator className="bg-[#1E1B4B]/5 shrink-0" />

            {/* Districts */}
            <div className="space-y-3 flex-1 overflow-hidden flex flex-col min-h-0">
                <div className="flex items-center justify-between group cursor-default shrink-0">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Target Clusters
                    </h4>
                    <MapPin className="w-3 h-3 text-slate-200 group-hover:text-[#F9C784] transition-colors" />
                </div>

                <div className="relative group shrink-0 mb-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 group-focus-within:text-[#F9C784] transition-colors" />
                    <input
                        type="text"
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                        placeholder="Search district..."
                        className="w-full bg-white/40 border border-[#1E1B4B]/10 rounded-xl py-2 pl-9 pr-3 text-[11px] font-medium text-[#1E1B4B] focus:outline-none focus:border-[#F9C784]/30 transition-all shadow-sm"
                    />
                </div>

                <div
                    className="flex flex-col gap-1.5 overflow-y-auto pr-1 hide-scrollbar min-h-0 flex-1"
                >
                    {filteredDistricts.map((district) => {
                        const isSelected = filters.districts === district
                        return (
                            <button
                                key={district}
                                onClick={() => setDistrict(district)}
                                className={cn(
                                    'flex items-center justify-between px-3 py-2 rounded-xl text-[11px] transition-all duration-300 text-left cursor-pointer group shrink-0 outline-none',
                                    isSelected
                                        ? 'bg-[#F9E8D4] text-[#1E1B4B] border border-[#1E1B4B]/10 shadow-sm'
                                        : 'text-slate-500 hover:bg-white hover:text-[#1E1B4B] border border-transparent'
                                )}
                            >
                                <div className="flex items-center gap-2.5 overflow-hidden">
                                    <div
                                        className={cn(
                                            'w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0',
                                            isSelected
                                                ? 'bg-[#1E1B4B] border-[#1E1B4B]'
                                                : 'border-[#1E1B4B]/10 group-hover:border-[#1E1B4B]'
                                        )}
                                    >
                                        {isSelected && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </div>
                                    <span className="font-bold truncate">{district}</span>
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
                        className="flex items-center justify-center gap-1.5 py-1 text-[10px] font-black text-slate-400 hover:text-[#1E1B4B] transition-colors cursor-pointer mt-1 shrink-0"
                    >
                        {showAllDistricts ? <><ChevronUp className="w-3 h-3" /> Collapse</> : <><ChevronDown className="w-3 h-3" /> Expand All {districts.length}</>}
                    </button>
                )}
            </div>

            <Separator className="bg-[#1E1B4B]/5 shrink-0" />

            {/* Rural / Urban Toggle */}
            <div className="space-y-3 shrink-0">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    Demographic Wash
                </h4>
                <div className="flex bg-white/40 rounded-2xl p-1 border border-[#1E1B4B]/10 gap-1 shadow-sm">
                    {(['rural', 'urban'] as const).map((value) => {
                        const isActive = filters.environment === value;
                        return (
                            <button
                                key={value}
                                onClick={() => setEnvironment(value)}
                                className={cn(
                                    'relative flex-1 py-1.5 text-[10px] font-black rounded-xl transition-all duration-500 cursor-pointer capitalize z-10',
                                    isActive ? 'text-[#1E1B4B]' : 'text-slate-400 hover:text-[#1E1B4B]'
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="filter-env-active"
                                        className="absolute inset-0 rounded-xl bg-white border border-[#1E1B4B]/10 shadow-sm"
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
            <div className="shrink-0 pt-2">
                <Button
                    onClick={() => triggerSearch('channels')}
                    className="w-full bg-[#F9C784] hover:bg-[#f9d4a1] text-[#1E1B4B] font-black text-[11px] h-11 rounded-2xl shadow-lg shadow-[#F9C784]/20 cursor-pointer"
                    size="sm"
                >
                    <Search className="w-4 h-4 mr-2" />
                    Generate Architecture
                </Button>
            </div>

            {/* Reset Filters */}
            {(filters.districts !== null || filters.environment !== 'rural' || filters.specificNeed !== '') && (
                <button
                    onClick={() => setFilters({ districts: null, environment: 'rural', specificNeed: '' })}
                    className="w-full py-1 text-[10px] font-black text-slate-400 hover:text-[#7C3AED] transition-all cursor-pointer uppercase tracking-[0.2em] shrink-0"
                >
                    Reset Protocol
                </button>
            )}
        </motion.div>
    )
}
