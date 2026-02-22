import { motion } from 'framer-motion'

const partners = [
    { name: 'WHO', logo: 'WHO' },
    { name: 'UNICEF', logo: 'UNICEF' },
    { name: 'PATH', logo: 'PATH' },
    { name: 'MSF', logo: 'MSF' },
    { name: 'USAID', logo: 'USAID' },
    { name: 'GATES FOUNDATION', logo: 'GATES FOUNDATION' },
]

export function TrustMarquee() {
    return (
        <section className="py-4 bg-transparent border-y border-[#1E1B4B]/5 overflow-hidden">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex items-center gap-12 pr-12"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {[...partners, ...partners, ...partners].map((p, i) => (
                        <div key={i} className="flex items-center gap-4 grayscale opacity-40 hover:opacity-100 transition-opacity cursor-default">
                            <span className="text-[10px] font-black tracking-[0.4em] text-[#1E1B4B]">
                                {p.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
