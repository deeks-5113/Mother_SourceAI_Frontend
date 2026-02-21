import { motion } from 'framer-motion'
import { useEngine } from '@/hooks/useEngine'
import { districts } from '@/data/mockData'
import { MapPin, Filter, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export function FilterPanel() {
    const { filters, setFilters, triggerSearch } = useEngine()

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

    return (
        <motion.div
            layout
            className="w-[240px] min-h-screen bg-slate-900/50 border-r border-slate-700/50 p-4 flex flex-col gap-5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                <Filter className="w-4 h-4 text-teal-400" />
                Filters
            </div>

            <Separator />

            {/* Districts */}
            <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    Districts
                </h4>
                <div className="flex flex-col gap-1.5">
                    {districts.map((district) => {
                        const isSelected = filters.districts.includes(district)
                        return (
                            <button
                                key={district}
                                onClick={() => toggleDistrict(district)}
                                className={cn(
                                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 text-left cursor-pointer',
                                    isSelected
                                        ? 'bg-teal-500/15 text-teal-400 border border-teal-500/20'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-300'
                                )}
                            >
                                <div
                                    className={cn(
                                        'w-3.5 h-3.5 rounded border flex items-center justify-center transition-all',
                                        isSelected
                                            ? 'bg-teal-500 border-teal-500'
                                            : 'border-slate-600'
                                    )}
                                >
                                    {isSelected && (
                                        <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-2.5 h-2.5 text-white"
                                            viewBox="0 0 12 12"
                                        >
                                            <path
                                                d="M3.5 6L5.5 8L8.5 4"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </motion.svg>
                                    )}
                                </div>
                                {district}
                            </button>
                        )
                    })}
                </div>
            </div>

            <Separator />

            {/* Rural / Urban Toggle */}
            <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Area Type
                </h4>
                <div className="flex bg-slate-800 rounded-lg p-1 gap-1">
                    {(['all', 'rural', 'urban'] as const).map((value) => (
                        <button
                            key={value}
                            onClick={() => setEnvironment(value)}
                            className={cn(
                                'flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer capitalize',
                                filters.environment === value
                                    ? 'bg-teal-500/20 text-teal-400 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-300'
                            )}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Trigger */}
            <div className="space-y-2">
                <Button
                    onClick={() => triggerSearch('channels')}
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white text-xs"
                    size="sm"
                >
                    <Search className="w-3 h-3 mr-1.5" />
                    Search Channels
                </Button>
                <Button
                    onClick={() => triggerSearch('partners')}
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                    size="sm"
                >
                    <Search className="w-3 h-3 mr-1.5" />
                    Search Partners
                </Button>
            </div>

            {/* Active filter count */}
            {(filters.districts.length > 0 || filters.environment !== 'all') && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto"
                >
                    <button
                        onClick={() => setFilters({ districts: [], environment: 'all' })}
                        className="w-full py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                        Clear all filters
                    </button>
                </motion.div>
            )}
        </motion.div>
    )
}
