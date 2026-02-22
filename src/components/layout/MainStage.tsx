import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MainStageProps {
    children: ReactNode
}

export function MainStage({ children }: MainStageProps) {
    return (
        <div className="h-screen bg-[#1E1B4B]/5 p-4 md:p-8 flex items-center justify-center overflow-hidden">
            {/* Global Split Background (Reflects Hero style throughout) */}
            <div className="fixed inset-0 flex pointer-events-none z-0">
                <div className="flex-[1.2] bg-[#f9e8d4]" />
                <div className="flex-1 bg-white" />
            </div>

            <motion.div
                initial={{
                    clipPath: 'circle(0% at 50% 50%)',
                    opacity: 0,
                    scale: 0.95
                }}
                animate={{
                    clipPath: 'circle(150% at 50% 50%)',
                    opacity: 1,
                    scale: 1
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    opacity: { duration: 0.4 }
                }}
                className="flex-1 rounded-[2rem] shadow-[0_40px_100px_-20px_rgba(30,27,75,0.2),0_10px_40px_-10px_rgba(30,27,75,0.1)] relative overflow-hidden flex flex-col z-10 border-t-2 border-t-[#F9C784] border-x border-b border-[#1E1B4B]/10 h-full"
            >

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}
