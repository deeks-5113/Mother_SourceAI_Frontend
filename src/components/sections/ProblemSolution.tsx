import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, CloudOff, Zap, ShieldAlert, Globe2 } from 'lucide-react'

const problems = [
    {
        title: "Fragmented Care",
        desc: "PHCs and NGOs operate in silos, leaving mothers lost in administrative gaps.",
        icon: CloudOff
    },
    {
        title: "Manual Triage",
        desc: "Critical referrals take days to coordinate, missing life-saving windows.",
        icon: ShieldAlert
    },
    {
        title: "Invisible Need",
        desc: "70% of rural health data remains unstructured and unactionable.",
        icon: AlertCircle
    }
]

const solutions = [
    {
        title: "Unified Lifeline",
        desc: "AI-synchronized logistics geofenced to every clinical asset.",
        icon: Globe2
    },
    {
        title: "12ms Response",
        desc: "Zero-latency triage protocol connecting mothers to specialists.",
        icon: Zap
    },
    {
        title: "Explainable Intel",
        desc: "Verified provenance for every mission-critical recommendation.",
        icon: CheckCircle2
    }
]

export function ProblemSolution() {
    return (
        <section className="py-32 px-12 lg:px-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* PROBLEM SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-red-500/60">The Friction</h3>
                            <h2 className="text-5xl lg:text-6xl font-black text-[#1E1B4B] tracking-tighter uppercase leading-[0.9]">
                                Fragmented <br />
                                <span className="text-red-500/40">Legacy.</span>
                            </h2>
                        </div>

                        <div className="grid gap-8">
                            {problems.map((p, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100 group-hover:bg-red-100 transition-colors">
                                        <p.icon className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-[#1E1B4B] uppercase tracking-tight">{p.title}</h4>
                                        <p className="text-[#1E1B4B]/60 font-medium text-sm leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* SOLUTION SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* High-end Glowing card */}
                        <div className="p-12 lg:p-16 rounded-[4rem] bg-[#1E1B4B] text-white relative overflow-hidden shadow-2xl shadow-[#1E1B4B]/20">
                            {/* Background Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9C784]/20 blur-[100px] rounded-full" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F9C784]/10 blur-[80px] rounded-full" />

                            <div className="relative z-10 space-y-12">
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-[#F9C784]">The Protocol</h3>
                                    <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                                        Unified <br />
                                        <span className="text-[#F9C784]">Lifeline.</span>
                                    </h2>
                                </div>

                                <div className="grid gap-8">
                                    {solutions.map((s, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-white/20 transition-colors">
                                                <s.icon className="w-6 h-6 text-[#F9C784]" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-lg font-black text-white uppercase tracking-tight">{s.title}</h4>
                                                <p className="text-slate-400 font-medium text-sm leading-relaxed">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating "AI Active" Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 lg:-right-12 px-6 py-3 rounded-2xl bg-[#F9C784] text-[#1E1B4B] shadow-xl border-4 border-white font-black uppercase text-[10px] tracking-widest z-20"
                        >
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#1E1B4B] animate-pulse" />
                                MotherSource AI Active
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
