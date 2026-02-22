import { motion } from 'framer-motion'
import { useEngine } from '@/hooks/useEngine'
import { TrustMarquee } from '../sections/TrustMarquee'


export function AuroraHero() {
    const { setCurrentView, setIsLoading } = useEngine()

    const handleStart = () => {
        setIsLoading(true)
        setTimeout(() => {
            setCurrentView('home')
            setTimeout(() => setIsLoading(false), 2000)
        }, 800)
    }

    const containerVariants = {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const maskReveal = {
        initial: { y: '100%', opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    }

    return (
        <section className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">
            {/* LEFT SIDE - approx 50% */}
            <div className="w-full lg:w-1/2 flex items-center px-8 lg:px-16 relative z-10 py-12 lg:py-0">
                <div className="w-full max-w-2xl">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 group cursor-pointer w-fit mb-12">
                        <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] flex items-center justify-center">
                            <span className="text-white font-black text-2xl">M</span>
                        </div>
                        <span className="text-2xl font-black text-[#1E1B4B] tracking-tight">MotherSource AI</span>
                    </div>

                    {/* Hero Main Copy */}
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        className="py-12"
                    >
                        <motion.h1
                            variants={maskReveal}
                            className="text-5xl lg:text-7xl font-black text-[#1E1B4B] leading-[0.95] tracking-tighter mb-8"
                        >
                            FIND THE <span className="text-[#F9C784]">LIFELINE.</span> <br />
                            FUND THE <span className="text-[#F9C784]">MISSION.</span>
                        </motion.h1>

                        <motion.p
                            variants={maskReveal}
                            className="text-xl text-[#1E1B4B]/60 font-medium max-w-lg leading-relaxed mb-12"
                        >
                            Automating critical outreach to PHCs, NGOs, and Funders across AP and Telangana to ensure every mother is reached.
                        </motion.p>

                        {/* Integrated Reference Toggle/Pill CTA */}
                        <div className="overflow-hidden mb-12">
                            <motion.div
                                variants={maskReveal}
                                className="inline-flex p-1.5 rounded-full bg-[#1E1B4B]/5 border border-[#1E1B4B]/10 shadow-inner"
                            >
                                <button
                                    onClick={handleStart}
                                    className="px-10 py-4 rounded-full bg-[#1E1B4B] text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-[#1E1B4B]/10 hover:scale-[1.02] transition-transform active:scale-95"
                                >
                                    Launch AI Discovery
                                </button>
                                <button
                                    className="px-10 py-4 rounded-full text-[#1E1B4B] font-black text-[11px] uppercase tracking-widest hover:text-[#F9C784] transition-colors"
                                >
                                    How it works?
                                </button>
                            </motion.div>
                        </div>

                        {/* Mini Marquee Scrolling Text */}
                        <motion.div
                            variants={maskReveal}
                            className="w-full max-w-sm overflow-hidden pointer-events-none"
                        >
                            <motion.div
                                className="flex items-center gap-12 whitespace-nowrap"
                                animate={{ x: [0, -400] }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                {['WHO', 'UNICEF', 'PATH', 'MSF', 'USAID', 'Gates Foundation'].map((name, i) => (
                                    <span key={i} className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1E1B4B]/20">
                                        {name}
                                    </span>
                                ))}
                                {/* Duplicate for seamless loop */}
                                {['WHO', 'UNICEF', 'PATH', 'MSF', 'USAID', 'Gates Foundation'].map((name, i) => (
                                    <span key={`dup-${i}`} className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1E1B4B]/20">
                                        {name}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* RIGHT SIDE - 50% split */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-0 relative z-10 min-h-[500px] lg:min-h-0">
                <div className="relative w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] float-bubble">
                    <img
                        src="/images/mother-child.jpg"
                        alt="Mother joyfully lifting her child"
                        className="w-full h-full object-cover rounded-[3rem] shadow-2xl shadow-[#1E1B4B]/10 border-2 border-white"
                    />
                </div>
            </div>

            {/* Integrated Trust Marquee (Positioned higher to show others sooner) */}
            <div className="absolute bottom-0 left-0 w-full z-20">
                <TrustMarquee />
            </div>
        </section>
    )
}
