import { motion } from 'framer-motion'
import { User, Stethoscope, Heart, Activity } from 'lucide-react'

export const DoctorTeamIllustration = () => {
    return (
        <div className="relative flex items-center justify-center w-full min-h-[500px] lg:h-[600px] group overflow-hidden">
            {/* Giant Background 'M' */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
            >
                <span className="text-[500px] font-black text-[#1E1B4B] leading-none transform translate-y-10">
                    M
                </span>
            </motion.div>

            {/* Decorative background depth */}
            <div className="absolute w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] bg-[#1E1B4B]/5 rounded-full blur-[100px] animate-pulse" />

            {/* Specialist Team Stage */}
            <div className="relative z-10 flex items-end justify-center gap-4 lg:gap-8 pb-10">
                {/* Specialist 1 (Female Doctor - Left) */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative group/doc"
                >
                    <div className="w-24 h-48 lg:w-32 lg:h-64 bg-white/80 backdrop-blur-md rounded-t-[3rem] rounded-b-2xl border border-[#1E1B4B]/10 shadow-xl overflow-hidden flex flex-col items-center">
                        <div className="h-[40%] w-full bg-[#1E1B4B]/5 flex items-center justify-center pt-8">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full border border-slate-100 flex items-center justify-center text-[#1E1B4B]/40">
                                <User size={40} />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col items-center gap-2">
                            <div className="w-12 h-1 bg-[#1E1B4B]/20 rounded-full" />
                            <div className="w-10 h-1 bg-[#1E1B4B]/10 rounded-full" />
                            <Stethoscope className="text-[#F9C784] mt-4 opacity-50" size={24} />
                        </div>
                    </div>
                    {/* Scrub Accent Color (Pink) */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-400 opacity-20" />
                </motion.div>

                {/* Specialist 2 (Male Lead Doctor - Center) */}
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative z-20 -mb-4 group/doc"
                >
                    <div className="w-28 h-56 lg:w-40 lg:h-80 bg-white/90 backdrop-blur-md rounded-t-[4rem] rounded-b-3xl border border-[#1E1B4B]/10 shadow-2xl overflow-hidden flex flex-col items-center scale-110">
                        <div className="h-[40%] w-full bg-[#1E1B4B]/10 flex items-center justify-center pt-10">
                            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full border border-slate-100 flex items-center justify-center text-[#1E1B4B]/60">
                                <User size={50} />
                            </div>
                        </div>
                        <div className="p-6 flex flex-col items-center gap-3">
                            <div className="w-16 h-1.5 bg-[#1E1B4B]/30 rounded-full" />
                            <div className="w-12 h-1.5 bg-[#1E1B4B]/15 rounded-full" />
                            <Activity className="text-teal-500 mt-6 animate-pulse" size={32} />
                        </div>
                    </div>
                    {/* Scrub Accent Color (Teal) */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 opacity-30" />
                </motion.div>

                {/* Specialist 3 (Female Specialist - Right) */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="relative group/doc"
                >
                    <div className="w-24 h-48 lg:w-32 lg:h-64 bg-white/80 backdrop-blur-md rounded-t-[3rem] rounded-b-2xl border border-[#1E1B4B]/10 shadow-xl overflow-hidden flex flex-col items-center">
                        <div className="h-[40%] w-full bg-[#1E1B4B]/5 flex items-center justify-center pt-8">
                            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full border border-slate-100 flex items-center justify-center text-[#1E1B4B]/40">
                                <User size={40} />
                            </div>
                        </div>
                        <div className="p-4 flex flex-col items-center gap-2">
                            <div className="w-12 h-1 bg-[#1E1B4B]/20 rounded-full" />
                            <div className="w-10 h-1 bg-[#1E1B4B]/10 rounded-full" />
                            <Heart className="text-red-400 mt-4 opacity-50" size={24} />
                        </div>
                    </div>
                    {/* Scrub Accent Color (Indigo) */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1E1B4B] opacity-10" />
                </motion.div>
            </div>

            {/* Glossy Overlay Detail */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1B4B]/0 via-[#F9C784]/5 to-[#1E1B4B]/0 pointer-events-none rounded-[3rem]" />
        </div>
    )
}
