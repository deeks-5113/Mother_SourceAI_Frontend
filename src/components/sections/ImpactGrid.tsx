import { motion } from 'framer-motion'
import { Zap, Users, Globe } from 'lucide-react'

const pillars = [
    {
        title: "Rapid Response",
        description: "AI-triaging in under 12ms. Every second counts in critical maternal health emergencies.",
        icon: Zap,
        metric: "< 12ms",
        label: "Triaging Speed"
    },
    {
        title: "Specialist Sync",
        description: "Instant connection to 400+ certified specialists on standby across your district.",
        icon: Users,
        metric: "400+",
        label: "Doctors Online"
    },
    {
        title: "District Outreach",
        description: "Bridging the 100-mile rural gap by synchronizing logistics with medical necessity.",
        icon: Globe,
        metric: "100mi",
        label: "Gap Bridged"
    }
]

export function ImpactGrid() {
    return (
        <section className="py-32 bg-[#1E1B4B]/5 backdrop-blur-3xl px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-[#1E1B4B] tracking-tight mb-4 uppercase">The Three Pillars of Care</h2>
                    <p className="text-lg text-[#1E1B4B]/60 font-medium max-w-2xl mx-auto">
                        MotherSource AI powers the protocol that ensures elite medical coverage reaches every home.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="p-10 rounded-[3rem] bg-white/50 backdrop-blur-sm border border-[#1E1B4B]/5 shadow-xl shadow-[#1E1B4B]/5 hover:shadow-2xl hover:shadow-[#1E1B4B]/10 transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#F9E8D4]/50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <Icon className="w-8 h-8 text-[#1E1B4B]" />
                                </div>
                                <h3 className="text-2xl font-black text-[#1E1B4B] mb-4 uppercase tracking-tight">{pillar.title}</h3>
                                <p className="text-[#1E1B4B]/60 font-medium leading-relaxed mb-8">
                                    {pillar.description}
                                </p>
                                <div className="pt-8 border-t border-[#1E1B4B]/5 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black text-[#1E1B4B]">{pillar.metric}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1E1B4B]/40">{pillar.label}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#F9C784] flex items-center justify-center text-[#1E1B4B] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
