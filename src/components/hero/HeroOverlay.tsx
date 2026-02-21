import { motion } from 'framer-motion'
import { FlipText } from './FlipText'
import { Button } from '@/components/ui/button'
import { useEngine } from '@/hooks/useEngine'
import { Sparkles, Activity, ShieldCheck, Globe } from 'lucide-react'
import { glowPulse } from '@/lib/motionVariants'

export function HeroOverlay() {
    const { setCurrentView, setIsLoading } = useEngine()

    const handleInitialize = () => {
        setIsLoading(true)
        setTimeout(() => {
            setCurrentView('home')
            setTimeout(() => setIsLoading(false), 3000)
        }, 800)
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-slate-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
                    }}
                />
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-teal-500/5 rounded-full"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-violet-500/5 rounded-full"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Floating Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-4 mb-10"
                >
                    {[
                        { icon: Activity, text: "Live Intelligence" },
                        { icon: ShieldCheck, text: "Verified Networks" },
                        { icon: Globe, text: "8 Operational Districts" }
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <badge.icon className="w-3 h-3 text-teal-400" />
                            {badge.text}
                        </div>
                    ))}
                </motion.div>

                {/* Logo / Brand */}
                <motion.div
                    className="flex items-center gap-3 mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                        <Sparkles className="w-6 h-6 text-slate-950" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-100">
                        MOTHER<span className="text-teal-400">SOURCE</span>
                    </span>
                </motion.div>

                {/* Headline */}
                <div className="text-center perspective-1000 mb-8">
                    <h1 className="text-5xl md:text-8xl font-black text-center max-w-5xl leading-[0.9] tracking-tighter text-white uppercase italic">
                        <FlipText text="Connecting" />
                        <br />
                        <span className="text-teal-400 drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                            <FlipText text="Lifelines" />
                        </span>
                    </h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    className="text-lg md:text-xl text-slate-400 text-center max-w-2xl mb-12 font-medium leading-relaxed px-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    Automating critical outreach to NGOs & Health Networks to ensure
                    no mother is left behind in the digital dark.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    variants={glowPulse as any}
                >
                    <Button
                        size="lg"
                        onClick={handleInitialize}
                        className="group relative px-10 py-8 text-xl font-black bg-white text-slate-950 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-tighter overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Start Initialization
                            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                        />
                    </Button>
                </motion.div>
            </div>

            {/* Decorative footer elements */}
            <motion.div
                className="absolute bottom-10 left-10 text-[10px] font-black text-slate-700 tracking-[0.4em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
            >
                Protocol v2.4 // AI Discovery Engine
            </motion.div>

            <motion.div
                className="absolute bottom-10 right-10 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
            >
                <div className="w-6 h-1 rounded-full bg-teal-500/20" />
                <div className="w-12 h-1 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                <div className="w-6 h-1 rounded-full bg-teal-500/20" />
            </motion.div>
        </motion.div>
    )
}
