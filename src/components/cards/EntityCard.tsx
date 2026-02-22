import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReasoningChain } from './ReasoningChain'
import { useEngine } from '@/hooks/useEngine'
import { MapPin, Building2, Heart, ArrowUpRight } from 'lucide-react'
import type { Entity } from '@/data/mockData'
import { fadeSlideUp, springTransition } from '@/lib/motionVariants'

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
        if (v >= 85) return '#1E1B4B'
        if (v >= 70) return '#F9C784'
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
                    stroke="rgba(30,27,75,0.05)"
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
                <span className="text-xs font-black text-[#1E1B4B]/60">{value}%</span>
            </div>
        </div>
    )
}

const typeConfig: Record<Entity['type'], { icon: typeof Heart; color: string }> = {
    NGO: { icon: Heart, color: 'bg-[#F9E8D4] text-[#1E1B4B] border-[#1E1B4B]/10' },
    PHC: { icon: Building2, color: 'bg-blue-50 text-blue-700 border-blue-100' },
    'Government Scheme': { icon: Building2, color: 'bg-[#F9C784]/10 text-[#1E1B4B] border-[#F9C784]/30' },
}

export function EntityCard({ entity, index }: EntityCardProps) {
    const { setSelectedEntity } = useEngine()

    const TypeIcon = typeConfig[entity.type]?.icon ?? Heart

    return (
        <motion.div
            layout
            variants={fadeSlideUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-20px" }}
            transition={{ ...(springTransition as any), delay: index * 0.05 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="cursor-pointer group h-full"
            onClick={() => setSelectedEntity(entity)}
        >
            <Card className="relative h-full flex flex-col overflow-hidden bg-white border-[#1E1B4B]/5 group-hover:border-[#1E1B4B]/20 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(30,27,75,0.05)]">
                {/* Ranking Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#F9E8D4]/50 border border-[#1E1B4B]/10 text-[10px] font-black text-[#1E1B4B] shadow-sm group-hover:border-[#1E1B4B]/30 transition-colors duration-500">
                        {entity.rank || index + 1}
                    </div>
                </div>

                {/* Animated accent gradient */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F9C784]/0 via-[#F9C784]/40 to-[#F9C784]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="flex flex-row items-start justify-between pb-3 pl-14">
                    <div className="flex-1 min-w-0 pr-4">
                        <h3 className="font-black text-base text-[#1E1B4B] group-hover:text-[#1E1B4B] transition-colors duration-300 leading-[1.1] tracking-tight">
                            {entity.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-3">
                            <Badge
                                variant="outline"
                                className={`text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-lg ${typeConfig[entity.type]?.color ?? ''}`}
                            >
                                <TypeIcon className="w-2.5 h-2.5 mr-1" />
                                {entity.type}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-1">
                        <CircularProgress value={entity.relevance} />
                        <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover:text-[#1E1B4B] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0" />
                    </div>
                </CardHeader>

                <CardContent className="pb-4 flex-1">
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 group-hover:text-slate-500 transition-colors uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 shrink-0">
                            <MapPin className="w-3 h-3 text-[#F9C784]" />
                            {entity.district}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-200 shrink-0" />
                        <span className="px-1.5 py-0.5 rounded bg-slate-50 text-[#1E1B4B]/60 shrink-0">
                            {entity.ruralUrban}
                        </span>
                    </div>

                    {entity.content && (
                        <p className="mt-4 text-[11px] leading-relaxed text-[#1E1B4B]/60 group-hover:text-[#1E1B4B]/80 transition-colors line-clamp-3 font-medium">
                            {entity.content}
                        </p>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col items-stretch pt-0 pb-4 bg-[#F9E8D4]/5">
                    <ReasoningChain reasoning={entity.ai_reasoning} />
                </CardFooter>
            </Card>
        </motion.div>
    )
}
