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
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-400 hover:text-violet-300 transition-colors mb-3 cursor-pointer group"
                >
                    <Sparkles className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                    {isExpanded ? 'Hide' : 'Analyze'} Resonance
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
                            className="relative rounded-xl p-4 text-xs font-medium leading-relaxed text-violet-100/90 glass-card bg-violet-500/5 border-violet-500/20 shadow-[inset_0_0_20px_rgba(167,139,250,0.05)]"
                        >
                            <div className="flex gap-2.5">
                                <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
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
