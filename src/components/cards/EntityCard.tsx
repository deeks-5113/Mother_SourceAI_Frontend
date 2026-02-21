import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReasoningChain } from './ReasoningChain'
import { useEngine } from '@/hooks/useEngine'
import { MapPin, Building2, Heart } from 'lucide-react'
import type { Entity } from '@/data/mockData'

interface EntityCardProps {
    entity: Entity
    index: number
}

function CircularProgress({ value, size = 48 }: { value: number; size?: number }) {
    const strokeWidth = 4
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const progress = ((100 - value) / 100) * circumference

    const getColor = (v: number) => {
        if (v >= 85) return '#2dd4bf'
        if (v >= 70) return '#a78bfa'
        return '#94a3b8'
    }

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(100,116,139,0.2)"
                    strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor(value)}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: progress }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-200">{value}</span>
            </div>
        </div>
    )
}

const typeConfig: Record<Entity['type'], { icon: typeof Heart; color: string }> = {
    NGO: { icon: Heart, color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
    PHC: { icon: Building2, color: 'bg-sky-500/15 text-sky-400 border-sky-500/20' },
    'Government Scheme': { icon: Building2, color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
}

export function EntityCard({ entity, index }: EntityCardProps) {
    const { setSelectedEntity } = useEngine()

    const TypeIcon = typeConfig[entity.type]?.icon ?? Heart

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="cursor-pointer"
            onClick={() => setSelectedEntity(entity)}
        >
            <Card className="relative overflow-hidden bg-slate-800/50 border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5">
                {/* Gradient accent top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500/50 via-violet-500/50 to-teal-500/50" />

                <CardHeader className="flex flex-row items-start justify-between pb-3">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-slate-100 truncate pr-4">
                            {entity.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                            <Badge
                                variant="outline"
                                className={`text-[10px] px-2 py-0 ${typeConfig[entity.type]?.color ?? ''}`}
                            >
                                <TypeIcon className="w-2.5 h-2.5 mr-1" />
                                {entity.type}
                            </Badge>
                        </div>
                    </div>
                    <CircularProgress value={entity.relevance} />
                </CardHeader>

                <CardContent className="pb-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {entity.district}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-700/50 text-[10px]">
                            {entity.ruralUrban}
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col items-stretch">
                    <ReasoningChain reasoning={entity.ai_reasoning} />
                </CardFooter>
            </Card>
        </motion.div>
    )
}
