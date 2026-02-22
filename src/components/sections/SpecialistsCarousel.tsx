import { motion } from 'framer-motion'
import { useRef } from 'react'

const specialists = [
    {
        name: 'Dr. Aruna Reddy',
        role: 'Maternal health Lead',
        clinic: 'Apollo Guntur',
        img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400'
    },
    {
        name: 'Dr. Vikram Seth',
        role: 'Neonatal Specialist',
        clinic: 'Rainbow Children’s',
        img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
    },
    {
        name: 'Sarah Chen',
        role: 'NGO Coordinator',
        clinic: 'Saheli Trust',
        img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400'
    },
    {
        name: 'Dr. Priya Mani',
        role: 'Public Health Strategist',
        clinic: 'NHM Andhra',
        img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400'
    },
    {
        name: 'David Miller',
        role: 'Field Operations',
        clinic: 'Red Cross',
        img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400'
    },
]

export function SpecialistsCarousel() {
    const targetRef = useRef<HTMLDivElement>(null)

    return (
        <section className="py-32 overflow-hidden bg-white">
            <div className="px-12 lg:px-24 mb-16 flex items-end justify-between">
                <div className="space-y-4">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1E1B4B]/60">Network Integrity</h3>
                    <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-[#1E1B4B] uppercase">Meet Our Specialists</h2>
                </div>
                <div className="flex gap-3">
                    <div className="w-12 h-1.5 rounded-full bg-slate-100" />
                    <div className="w-24 h-1.5 rounded-full bg-[#F9C784]" />
                </div>
            </div>

            <div
                ref={targetRef}
                className="flex gap-10 overflow-x-auto px-12 lg:px-24 pb-20 hide-scrollbar cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none' }}
            >
                {specialists.map((spec, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -12, scale: 1.05 }}
                        className="min-w-[380px] p-10 rounded-[3.5rem] bg-[#F9E8D4]/50 border border-[#1E1B4B]/5 shadow-xl shadow-[#1E1B4B]/5 group transition-all duration-500"
                    >
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 bg-[#F9C784]/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform" />
                            <img
                                src={spec.img}
                                alt={spec.name}
                                className="relative w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                                <div className="w-3 h-3 rounded-full bg-[#F9C784] animate-pulse" />
                            </div>
                        </div>

                        <h4 className="text-2xl font-black text-[#1E1B4B] mb-2">{spec.name}</h4>
                        <p className="text-[11px] font-black text-[#1E1B4B]/60 uppercase tracking-[0.2em] mb-6">{spec.role}</p>

                        <div className="pt-8 border-t border-[#1E1B4B]/5 flex items-center justify-between">
                            <span className="text-[10px] font-black text-[#1E1B4B]/40 uppercase tracking-[0.2em]">{spec.clinic}</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1E1B4B]/10 group-hover:bg-[#F9C784] transition-colors" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
