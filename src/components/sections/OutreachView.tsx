import { useState, useRef, useEffect } from 'react'
import { useEngine } from '@/hooks/useEngine'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, MessageSquare, User, Bot, Plus, Settings, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { staggerContainer } from '@/lib/motionVariants'

export function OutreachView() {
    const {
        threads,
        activeThreadId,
        loadThread,
        deleteThread,
        createNewThread,
        fetchThreads,
        sendChatMessage,
        isSendingChat,
        messages,
    } = useEngine()

    const [inputValue, setInputValue] = useState('')
    const chatEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isSendingChat])

    // Fetch threads from the backend when entering the outreach view
    useEffect(() => {
        fetchThreads()
    }, [fetchThreads])

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue
        if (!messageText.trim()) return
        setInputValue('')
        sendChatMessage(messageText)
    }

    const suggestedActions = [
        "Make it warmer",
        "More clinical focus",
        "Add follow-up steps",
        "Shorten for mobile"
    ]

    return (
        <motion.div
            className="flex-1 flex h-full overflow-hidden bg-white/50"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
        >
            {/* Thread History Sidebar */}
            <div className="w-80 flex flex-col bg-[#1E1B4B] text-white/90 border-r border-white/5 overflow-hidden">
                <div className="p-6 space-y-4">
                    <Button
                        onClick={createNewThread}
                        className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Strategy
                    </Button>

                    <div className="flex-1 space-y-1 pt-4 overflow-hidden flex flex-col">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] pl-2 mb-4">Thread History</p>
                        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                            {threads.length === 0 && (
                                <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center space-y-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                                        <MessageSquare className="w-4 h-4 text-white/20" />
                                    </div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">No strategies saved yet</p>
                                </div>
                            )}
                            {threads.map(thread => (
                                <div
                                    key={thread.id}
                                    className={`w-full p-4 rounded-2xl text-left border transition-all group relative overflow-hidden ${activeThreadId === thread.id
                                        ? 'bg-[#F9C784] border-[#F9C784] text-[#1E1B4B]'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-white/70'
                                        }`}
                                >
                                    <button
                                        onClick={() => loadThread(thread.id)}
                                        className="w-full text-left"
                                    >
                                        <div className="flex flex-col gap-1 relative z-10">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[11px] font-black uppercase tracking-tight truncate flex-1">{thread.entity_name}</span>
                                                <span className="text-[8px] font-black opacity-40">{new Date(thread.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${activeThreadId === thread.id ? 'bg-[#1E1B4B]/10 text-[#1E1B4B]' : 'bg-white/10 text-white/50'
                                                    }`}>
                                                    {thread.channel}
                                                </Badge>
                                            </div>
                                        </div>
                                    </button>
                                    {/* Delete button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteThread(thread.id)
                                        }}
                                        className={`absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20 ${activeThreadId === thread.id
                                            ? 'hover:bg-[#1E1B4B]/10 text-[#1E1B4B]/60 hover:text-red-600'
                                            : 'hover:bg-white/10 text-white/30 hover:text-red-400'
                                            }`}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    {activeThreadId === thread.id && (
                                        <motion.div
                                            layoutId="active-thread-glow"
                                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-auto p-6 border-t border-white/5 bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#F9C784] flex items-center justify-center text-[#1E1B4B] shadow-lg shadow-[#F9C784]/10">
                            <User className="w-5 h-5" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-black truncate">Health Official</p>
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Protocol Admin</p>
                        </div>
                        <Settings className="w-4 h-4 text-white/20 cursor-pointer hover:text-white transition-colors" />
                    </div>
                </div>
            </div>

            {/* Right Section: Strategic Refinement Thread — Full Width */}
            <div className="flex-1 h-full flex flex-col bg-white relative overflow-hidden">
                <div className="pt-10 p-6 lg:p-10 pb-6 border-b border-[#1E1B4B]/5 bg-white z-20">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#F9E8D4] rounded-lg">
                                <Sparkles className="w-4 h-4 text-[#1E1B4B]" />
                            </div>
                            <h3 className="text-[12px] font-black text-[#1E1B4B] uppercase tracking-[0.4em]">Strategy Refinement</h3>
                        </div>
                        <Badge className="bg-green-50 text-green-700 border-green-100 text-[8px] font-black uppercase tracking-widest">Live Thread</Badge>
                    </div>

                    {/* Suggested Chips as Quick Thread Starters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {suggestedActions.map(action => (
                            <button
                                key={action}
                                onClick={() => handleSendMessage(action)}
                                disabled={!activeThreadId || isSendingChat}
                                className="flex-shrink-0 px-4 py-1.5 rounded-full border border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-500 hover:border-[#F9C784] hover:text-[#1E1B4B] hover:bg-[#F9E8D4]/30 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-10 scroll-smooth bg-slate-50/30 custom-scrollbar">
                    {messages.length === 0 && !activeThreadId && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12">
                            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                                <MessageSquare className="w-7 h-7 text-slate-300" />
                            </div>
                            <p className="text-sm font-bold text-slate-400">Dispatch a strategy to start brainstorming</p>
                            <p className="text-xs text-slate-300 mt-2">Select an entity → Generate outreach → Click Dispatch</p>
                        </div>
                    )}
                    <AnimatePresence initial={false}>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-12 h-12 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-md ${msg.role === 'ai' ? 'bg-[#1E1B4B] text-white' : 'bg-[#F9C784] text-[#1E1B4B]'
                                    }`}>
                                    {msg.role === 'ai' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                                </div>
                                <div className="space-y-2 max-w-[85%]">
                                    <div className={`p-6 rounded-[2.5rem] text-sm font-medium leading-relaxed shadow-sm ${msg.role === 'ai'
                                        ? 'bg-white text-[#1E1B4B] border border-slate-100 rounded-tl-lg'
                                        : 'bg-[#1E1B4B] text-white rounded-tr-lg shadow-[#1E1B4B]/10'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <div className={`text-[8px] font-black text-slate-300 uppercase tracking-widest px-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.role.toUpperCase()}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isSendingChat && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5">
                                <div className="w-12 h-12 rounded-[1.25rem] bg-[#1E1B4B] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                                    <Bot className="w-6 h-6 animate-pulse" />
                                </div>
                                <div className="p-6 bg-white border border-slate-100 rounded-[2.5rem] rounded-tl-lg shadow-sm">
                                    <div className="flex gap-2">
                                        {[0, 1, 2].map(i => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F9C784] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area (Pinned) */}
                <div className="p-4 lg:p-6 border-t border-[#1E1B4B]/5 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                    <div className="relative group">
                        <Textarea
                            placeholder={activeThreadId ? "Type a clinical instruction or strategy prompt..." : "Dispatch a strategy first to start chatting..."}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSendMessage()
                                }
                            }}
                            disabled={!activeThreadId}
                            className="min-h-[60px] w-full bg-slate-50 border-slate-100 rounded-[2rem] p-4 pr-20 text-sm font-medium focus:border-[#F9C784]/50 focus:bg-white transition-all resize-none shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim() || isSendingChat || !activeThreadId}
                            className="absolute bottom-3 right-5 w-10 h-10 rounded-xl bg-[#1E1B4B] text-white flex items-center justify-center hover:bg-[#2e2a70] disabled:opacity-20 transition-all shadow-xl shadow-[#1E1B4B]/10 active:scale-90"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-6">
                        <div className="h-px bg-slate-100 flex-1" />
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] whitespace-nowrap">AI Intelligence Refinement Protocol</p>
                        <div className="h-px bg-slate-100 flex-1" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
