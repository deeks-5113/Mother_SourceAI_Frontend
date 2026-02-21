import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Sparkles } from 'lucide-react'

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
                    className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors mb-2 cursor-pointer"
                >
                    <Sparkles className="w-3 h-3" />
                    {isExpanded ? 'Hide' : 'View'} AI Reasoning
                </button>
            )}

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div
                            className="relative rounded-lg p-3 text-xs leading-relaxed text-violet-200/80"
                            style={{
                                background: 'rgba(139, 92, 246, 0.08)',
                                border: '1px solid rgba(139, 92, 246, 0.15)',
                                boxShadow: '0 0 20px rgba(139, 92, 246, 0.1), inset 0 0 20px rgba(139, 92, 246, 0.05)',
                            }}
                        >
                            <Sparkles className="w-3.5 h-3.5 text-violet-400 inline mr-1.5 -mt-0.5" />
                            {reasoning}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
