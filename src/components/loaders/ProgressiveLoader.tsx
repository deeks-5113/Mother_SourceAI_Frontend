import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

const loadingPhrases = [
    'Vectorizing PHC data...',
    'Analyzing NGO alignment...',
    'Cross-referencing beneficiary clusters...',
    'Ranking by proximity score...',
    'Mapping scheme eligibility...',
    'Calibrating relevance engine...',
]

export function ProgressiveLoader() {
    const [phraseIndex, setPhraseIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="space-y-6 p-6">
            {/* Skeleton cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 space-y-4"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-3/4 bg-slate-700/50" />
                                <Skeleton className="h-3 w-1/2 bg-slate-700/30" />
                            </div>
                            <Skeleton className="w-12 h-12 rounded-full bg-slate-700/50" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-full bg-slate-700/30" />
                            <Skeleton className="h-3 w-5/6 bg-slate-700/20" />
                        </div>
                        <Skeleton className="h-16 w-full rounded-lg bg-violet-500/5" />
                    </motion.div>
                ))}
            </div>

            {/* Cycling text */}
            <div className="flex items-center justify-center py-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-teal-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={phraseIndex}
                            className="text-sm text-slate-400 font-mono"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {loadingPhrases[phraseIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
