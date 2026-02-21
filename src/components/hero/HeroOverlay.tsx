import { motion } from 'framer-motion'
import { FlipText } from './FlipText'
import { Button } from '@/components/ui/button'
import { useEngine } from '@/hooks/useEngine'
import { Sparkles } from 'lucide-react'

export function HeroOverlay() {
    const { setCurrentView, setIsLoading } = useEngine()

    const handleInitialize = () => {
        setIsLoading(true)
        setTimeout(() => {
            setCurrentView('home')
            setTimeout(() => setIsLoading(false), 3000)
        }, 600)
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            style={{
                background:
                    'radial-gradient(ellipse at 50% 50%, rgba(13,148,136,0.15) 0%, rgba(15,23,42,1) 70%)',
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Ambient glow rings */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-teal-500/10 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-teal-500/5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border border-violet-500/5" />
            </div>

            {/* Logo / Brand */}
            <motion.div
                className="flex items-center gap-2 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold tracking-tight text-slate-200">
                    MotherSource<span className="text-teal-400"> AI</span>
                </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-center max-w-4xl leading-tight mb-6 text-white">
                <FlipText text="Connecting 1,000 Mothers" />
                <br />
                <span className="text-teal-400">
                    <FlipText text="to Invisible Lifelines" />
                </span>
            </h1>

            {/* Subtitle */}
            <motion.p
                className="text-lg text-slate-400 text-center max-w-xl mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.8 }}
            >
                AI-powered discovery engine that maps underserved mothers to NGOs,
                government schemes, and primary health centres — automatically.
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 0.6 }}
            >
                <Button
                    size="lg"
                    onClick={handleInitialize}
                    className="relative px-8 py-6 text-lg font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white rounded-xl shadow-lg shadow-teal-500/25 transition-all duration-300 hover:shadow-teal-500/40 hover:scale-105 cursor-pointer"
                >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Initialize Engine
                </Button>
            </motion.div>

            {/* Bottom bar */}
            <motion.div
                className="absolute bottom-8 flex items-center gap-6 text-xs text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 0.6 }}
            >
                <span>v2.1.0</span>
                <span className="w-1 h-1 rounded-full bg-teal-500" />
                <span>8 Districts Active</span>
                <span className="w-1 h-1 rounded-full bg-teal-500" />
                <span>Real-time Vectorization</span>
            </motion.div>
        </motion.div>
    )
}
