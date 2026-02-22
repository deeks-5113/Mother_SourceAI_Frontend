import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Send } from 'lucide-react'
import { useEngine } from '@/hooks/useEngine'

export function FinalFooter() {
    const { setCurrentView, setIsLoading } = useEngine()

    const handleStart = () => {
        setIsLoading(true)
        setTimeout(() => {
            setCurrentView('home')
            setTimeout(() => setIsLoading(false), 2000)
        }, 800)
    }

    return (
        <section className="relative pt-20">
            <div className="bg-[#1E1B4B] rounded-t-[4rem] px-12 lg:px-24 pt-32 pb-20 overflow-hidden">
                {/* Decorative Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl aspect-square bg-[#7C3AED]/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8 uppercase">
                            Join the Network. <br />
                            <span className="text-[#F9C784]">Protect the Future.</span>
                        </h2>

                        <p className="text-lg text-slate-300 font-medium max-w-2xl mx-auto mb-12">
                            Ready to transform maternal outreach in your district?
                            Start your discovery protocol today.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                            <Button
                                onClick={handleStart}
                                className="h-16 px-10 rounded-full bg-[#F9C784] hover:bg-[#f9d4a1] text-[#1E1B4B] font-black text-lg transition-all duration-500 shadow-2xl shadow-[#F9C784]/20 hover:scale-105 active:scale-95"
                            >
                                Get Support Now.
                                <ArrowRight className="w-5 h-5 ml-3" />
                            </Button>

                            <div className="flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                                <Send className="w-5 h-5 text-[#F9C784]" />
                                <input
                                    type="email"
                                    placeholder="Follow our Progress"
                                    className="bg-transparent border-none outline-none text-white placeholder:text-slate-500 w-48 text-sm font-bold"
                                />
                                <button className="text-white hover:text-[#F9C784] transition-colors p-2">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="pt-20 border-t border-white/5 w-full flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[#F9C784] flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full border-2 border-[#1E1B4B]/40" />
                                </div>
                                <span className="text-xl font-black text-white tracking-tight">MotherSource</span>
                            </div>

                            <div className="flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors">Legal</a>
                                <a href="#" className="hover:text-white transition-colors">Contact</a>
                            </div>

                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                © 2026 MotherSource AI
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
