import { motion } from 'framer-motion'
import { Home, Mail, Banknote, Shield, Sparkles } from 'lucide-react'
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
            className="flex flex-col items-center py-6 px-3 bg-slate-900 border-r border-slate-700/50 w-[72px] min-h-screen"
            initial={{ x: -72, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Brand icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-8">
                <Sparkles className="w-5 h-5 text-white" />
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
                                    ? 'text-teal-400'
                                    : 'text-slate-500 hover:text-slate-300'
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 rounded-xl bg-teal-500/10 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)]"
                                    transition={springTransition as any}
                                />
                            )}
                            <Icon className={cn(
                                "w-5 h-5 relative z-10 transition-transform duration-300",
                                isActive ? "scale-110" : "group-hover:scale-110"
                            )} />

                            {/* Tooltip */}
                            <div className="absolute left-[110%] top-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-[10px] text-slate-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                                {label}
                            </div>

                            <span className="text-[10px] font-medium relative z-10">{label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Status indicator */}
            <div className="flex flex-col items-center gap-1 text-[10px] text-slate-600">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>Online</span>
            </div>
        </motion.aside>
    )
}
