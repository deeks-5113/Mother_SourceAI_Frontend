import { motion } from 'framer-motion'
import { Home, Mail, Banknote, Shield, Sparkles } from 'lucide-react'
import { useEngine } from '@/hooks/useEngine'
import { cn } from '@/lib/utils'

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
                                'relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 group cursor-pointer',
                                isActive
                                    ? 'bg-teal-500/15 text-teal-400'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                            )}
                            title={label}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 rounded-xl bg-teal-500/15 border border-teal-500/20"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon className="w-5 h-5 relative z-10" />
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
