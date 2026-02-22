import { motion } from 'framer-motion'
import { Home, Mail, Banknote, Shield } from 'lucide-react'
import { useEngine } from '@/hooks/useEngine'
import { cn } from '@/lib/utils'
import { springTransition } from '@/lib/motionVariants'

type View = 'home' | 'outreach' | 'funding' | 'admin'

const navItems: { icon: typeof Home; label: string; view: View }[] = [
    { icon: Home, label: 'Home', view: 'home' },
    { icon: Mail, label: 'Outreach', view: 'outreach' },
    { icon: Banknote, label: 'Funding', view: 'funding' },
    { icon: Shield, label: 'Admin', view: 'admin' },
]

export function Sidebar() {
    const { currentView, setCurrentView } = useEngine()

    return (
        <motion.aside
            layout
            className="flex flex-col items-center pt-10 pb-6 px-3 bg-white border-r border-[#DDD6FE]/30 w-[72px] h-full"
            initial={{ x: -72, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Brand icon */}
            <div className="w-10 h-10 rounded-xl bg-[#1E1B4B] flex items-center justify-center mb-8">
                <span className="text-white font-black text-xl">M</span>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-2 flex-1">
                {navItems.map(({ icon: Icon, label, view }) => {
                    const isActive = currentView === view
                    return (
                        <button
                            key={view}
                            onClick={() => setCurrentView(view)}
                            className={cn(
                                'relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 group cursor-pointer z-10',
                                isActive
                                    ? 'text-[#1E1B4B]'
                                    : 'text-slate-400 hover:text-[#1E1B4B]'
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 rounded-xl bg-[#F9E8D4] border border-[#1E1B4B]/10"
                                    transition={springTransition as any}
                                />
                            )}
                            <Icon className={cn(
                                "w-5 h-5 relative z-10 transition-transform duration-300",
                                isActive ? "scale-110" : "group-hover:scale-110"
                            )} />

                            {/* Tooltip */}
                            <div className="absolute left-[110%] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-white border border-[#1E1B4B]/10 text-[10px] font-bold text-[#1E1B4B] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl shadow-[#1E1B4B]/5">
                                {label}
                            </div>

                            <span className="text-[10px] font-black uppercase tracking-tight relative z-10">{label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Status indicator */}
            <div className="flex flex-col items-center gap-1 text-[10px] text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F9C784] animate-pulse" />
                <span className="font-bold">LIVE</span>
            </div>
        </motion.aside>
    )
}
