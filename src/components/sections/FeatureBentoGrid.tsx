import { motion } from 'framer-motion'
import { Activity, ShieldCheck, Globe, Zap } from 'lucide-react'

const features = [
    {
        title: 'Precision Mapping',
        desc: 'ML-driven resonance scoring for every healthcare cluster.',
        icon: Activity,
        grid: 'col-span-2'
    },
    {
        title: 'Network Integrity',
        desc: 'Verified communication protocols for PHCs.',
        icon: ShieldCheck,
        grid: 'col-span-1'
    },
    {
        title: 'Rapid Deployment',
        desc: 'Zero-latency outreach automation.',
        icon: Zap,
        grid: 'col-span-1'
    },
    {
        title: 'Regional Coverage',
        desc: 'Hyper-local intelligence for every district.',
        icon: Globe,
        grid: 'col-span-2'
    }
]

export function FeatureBentoGrid() {
    return (
        <section className="py-32 px-12 lg:px-24 bg-[#F9E8D4]/50">
            <div className="grid grid-cols-4 gap-8">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`${f.grid} p-10 rounded-[3rem] bg-white/80 backdrop-blur-sm border border-[#1E1B4B]/5 shadow-xl shadow-[#1E1B4B]/5 group transition-all duration-500`}
                    >
                        <div className="w-16 h-16 rounded-3xl bg-[#F9E8D4] flex items-center justify-center mb-8 group-hover:bg-[#F9C784] transition-colors">
                            <f.icon className="w-8 h-8 text-[#1E1B4B]" />
                        </div>
                        <h3 className="text-2xl font-black tracking-tight text-[#1E1B4B] mb-3 uppercase">{f.title}</h3>
                        <p className="text-[#1E1B4B]/60 font-medium leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
