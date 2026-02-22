import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { staggerContainer, fadeSlideUp } from '@/lib/motionVariants'

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
        <div className="space-y-10 p-8 max-w-[1600px] mx-auto">
            {/* Skeleton cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        variants={fadeSlideUp}
                        className="rounded-2xl border border-[#1E1B4B]/5 bg-[#F9E8D4]/10 p-6 space-y-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-3 flex-1">
                                <Skeleton className="h-5 w-3/4 bg-[#1E1B4B]/10" />
                                <Skeleton className="h-3 w-1/2 bg-[#1E1B4B]/10" />
                            </div>
                            <Skeleton className="w-12 h-12 rounded-full bg-[#1E1B4B]/10" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-3 w-full bg-[#1E1B4B]/10" />
                            <Skeleton className="h-3 w-5/6 bg-[#1E1B4B]/10 opacity-60" />
                        </div>
                        <div className="pt-4 border-t border-[#1E1B4B]/5">
                            <Skeleton className="h-12 w-full rounded-xl bg-[#1E1B4B]/5" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Cycling text */}
            <div className="flex items-center justify-center py-4">
                <div className="flex items-center gap-3 bg-[#1E1B4B] px-6 py-3 rounded-2xl border border-[#1E1B4B]/10 shadow-xl">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-[#F9C784] shadow-[0_0_10px_rgba(249,199,132,0.5)]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={phraseIndex}
                            className="text-xs font-bold text-white/80 uppercase tracking-widest font-mono"
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
