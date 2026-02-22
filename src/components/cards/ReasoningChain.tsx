import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { springTransition } from '@/lib/motionVariants'

interface ReasoningChainProps {
    reasoning: string
    isExpanded?: boolean
}

export function ReasoningChain({ reasoning, isExpanded: controlledExpanded }: ReasoningChainProps) {
    const [internalExpanded, setInternalExpanded] = useState(false)
    const isExpanded = controlledExpanded ?? internalExpanded

    return (
        <div>
            {controlledExpanded === undefined && (
                <button
                    onClick={(e) => { e.stopPropagation(); setInternalExpanded(!internalExpanded); }}
                    className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#F9C784] hover:text-[#1E1B4B] transition-colors mb-3 cursor-pointer group"
                >
                    <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                    {isExpanded ? 'Hide' : 'Analyze'} Protocol
                </button>
            )}

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={springTransition}
                        className="overflow-hidden"
                    >
                        <div
                            className="relative rounded-2xl p-5 text-[11px] font-medium leading-relaxed text-[#1E1B4B]/60 bg-[#F9E8D4]/10 border border-[#1E1B4B]/10 shadow-sm"
                        >
                            <div className="flex gap-3">
                                <Sparkles className="w-4 h-4 text-[#F9C784]/40 shrink-0" />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {reasoning}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
