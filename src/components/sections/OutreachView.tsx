import { useState, useRef, useEffect } from 'react'
import { useEngine } from '@/hooks/useEngine'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, MessageSquare, Mail, Phone, Share2, FileText, User, Bot, Plus, Settings, Save, GripVertical } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { fadeSlideUp, staggerContainer } from '@/lib/motionVariants'

export function OutreachView() {
    const {
        generatedDraft,
        outreachMeta,
        selectedEntity,
        handleGenerateOutreach,
        isGenerating: isSyncing,
        setCurrentView,
        threads,
        activeThreadId,
        loadThread,
        saveCurrentThread,
        createNewThread,
        messages,
        setMessages
    } = useEngine()

    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue
        if (!messageText.trim()) return

        const userMsg = { role: 'user' as const, content: messageText, timestamp: new Date() }
        setMessages(prev => [...prev, userMsg])
        setInputValue('')
        setIsTyping(true)

        // Simulate AI response with context awareness
        setTimeout(() => {
            let aiResponse = ""
            const lowerText = messageText.toLowerCase()

            if (lowerText.includes('warm') || lowerText.includes('style')) {
                aiResponse = "Acknowledged. I'm softening the opening and emphasizing the collaborative nature of this partnership to increase trust."
            } else if (lowerText.includes('clinical') || lowerText.includes('data')) {
                aiResponse = "Refining strategy to prioritize clinical outcome projections and district-level health metrics."
            } else if (lowerText.includes('follow-up')) {
                aiResponse = "I've structured a 3-step follow-up sequence optimized for this channel's typical response latency."
            } else {
                const responses = [
                    "Strategy refinement complete. I've adjusted the messaging to better align with the recipient's role.",
                    "Optimizing metadata for higher resonance. Would you like to see a variant focused on community impact?",
                    "Payload stabilized. I recommend deploying this version to test local engagement levels.",
                    "Analyzing response patterns... I've added a stronger call-to-action focused on a pilot introduction."
                ]
                aiResponse = responses[Math.floor(Math.random() * responses.length)]
            }

            setMessages(prev => [...prev, { role: 'ai', content: aiResponse, timestamp: new Date() }])
            setIsTyping(false)
        }, 1200)
    }

    const suggestedActions = [
        "Make it warmer",
        "More clinical focus",
        "Add follow-up steps",
        "Shorten for mobile"
    ]

    const ChannelIcon = {
        email: Mail,
        whatsapp: MessageSquare,
        phone_script: Phone,
        linkedin: Share2,
        concept_note: FileText
    }[outreachMeta?.channel || 'email'] || MessageSquare

    return (
        <motion.div
            className="flex-1 flex h-full overflow-hidden bg-white/50"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
        >
            {/* Thread History Sidebar (The "ChatGPT" Style) */}
            <div className="w-80 flex flex-col bg-[#1E1B4B] text-white/90 border-r border-white/5 overflow-hidden">
                <div className="p-6 space-y-4">
                    <Button
                        onClick={createNewThread}
                        className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        New Strategy
                    </Button>

                    <div className="space-y-1 pt-4">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] pl-2 mb-4">Thread History</p>
                        <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                            {threads.length === 0 && (
                                <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center space-y-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                                        <MessageSquare className="w-4 h-4 text-white/20" />
                                    </div>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">No strategies saved yet</p>
                                </div>
                            )}
                            {threads.map(thread => (
                                <button
                                    key={thread.id}
                                    onClick={() => loadThread(thread.id)}
                                    className={`w-full p-4 rounded-2xl text-left border transition-all group relative overflow-hidden ${activeThreadId === thread.id
                                        ? 'bg-[#F9C784] border-[#F9C784] text-[#1E1B4B]'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10 text-white/70'
                                        }`}
                                >
                                    <div className="flex flex-col gap-1 relative z-10">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="text-[11px] font-black uppercase tracking-tight truncate flex-1">{thread.title}</span>
                                            <span className="text-[8px] font-black opacity-40">{new Date(thread.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${activeThreadId === thread.id ? 'bg-[#1E1B4B]/10 text-[#1E1B4B]' : 'bg-white/10 text-white/50'
                                                }`}>
                                                {thread.meta.channel}
                                            </Badge>
                                            <span className="text-[9px] font-bold opacity-40 truncate">{thread.entity?.name}</span>
                                        </div>
                                    </div>
                                    {activeThreadId === thread.id && (
                                        <motion.div
                                            layoutId="active-thread-glow"
                                            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                        />
                                    )}
                                </button>
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

            {/* Middle Section: Intelligence Hub (Condensed) */}
            <div className="lg:w-[380px] xl:w-[420px] flex flex-col border-r border-[#1E1B4B]/5 overflow-hidden bg-slate-50/50">
                <div className="p-8 lg:p-10 pb-12 w-full flex flex-col justify-end min-h-full space-y-8 overflow-y-auto hide-scrollbar">
                    {!selectedEntity || !generatedDraft ? (
                        <motion.div
                            variants={fadeSlideUp}
                            className="h-full flex flex-col items-center justify-center p-12 text-center"
                        >
                            <div className="w-24 h-24 rounded-[3rem] bg-[#F9E8D4] border border-[#1E1B4B]/10 flex items-center justify-center mb-8 shadow-2xl shadow-[#1E1B4B]/5">
                                <Sparkles className="w-10 h-10 text-[#1E1B4B]" />
                            </div>
                            <h3 className="text-3xl font-black text-[#1E1B4B] mb-4 tracking-tight uppercase">Intelligence Hub</h3>
                            <p className="text-slate-400 font-medium max-w-sm mb-10 text-sm leading-relaxed">
                                Select an entity from Discovery and architect a strategy to see its clinical parameters here.
                                <br /><br />
                                <span className="text-[#1E1B4B] font-bold">Your threads are archived on the left for quick retrieval.</span>
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    className="bg-[#1E1B4B] text-white px-10 h-14 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-xl shadow-[#1E1B4B]/20 transition-all active:scale-95"
                                    onClick={() => setCurrentView('home')}
                                >
                                    Return to Discovery
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div variants={fadeSlideUp} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 cursor-grab active:cursor-grabbing hover:bg-slate-100 rounded-lg transition-colors">
                                            <GripVertical className="w-5 h-5 text-slate-300" />
                                        </div>
                                        <Badge className="bg-[#1E1B4B] text-white text-[9px] uppercase font-black px-3 py-1 rounded-lg tracking-widest">ACTIVE PROTOCOL</Badge>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">SID: {activeThreadId || 'UNSAVED'}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Synced</span>
                                    </div>
                                </div>
                                <h2 className="text-4xl lg:text-6xl font-black text-[#1E1B4B] tracking-tight leading-none uppercase">
                                    Strategy <span className="text-[#F9C784]">Hub</span>
                                </h2>
                                <p className="text-sm font-medium text-slate-400 max-w-md">Iterate on your clinical messaging strategy in real-time with AI-driven resonance mapping.</p>
                            </motion.div>

                            <motion.div variants={fadeSlideUp} className="bg-white border border-[#1E1B4B]/10 rounded-[3rem] p-10 lg:p-14 shadow-sm space-y-10 relative overflow-hidden group">
                                {/* Channel Badge Overlay */}
                                <div className="absolute top-0 right-10">
                                    <div className="bg-[#F9C784] text-[#1E1B4B] font-black text-[9px] px-8 py-2.5 rounded-b-2xl shadow-sm uppercase tracking-[0.25em]">
                                        {outreachMeta.channel}
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-[#1E1B4B] flex items-center justify-center flex-shrink-0 shadow-xl shadow-[#1E1B4B]/10 group-hover:scale-105 transition-transform">
                                        <ChannelIcon className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Recipient Identity</span>
                                            <h4 className="text-3xl font-black text-[#1E1B4B] tracking-tight leading-tight block">{selectedEntity.name}</h4>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="text-[10px] font-black text-[#F9C784] border-[#F9C784]/30 bg-[#F9C784]/5 uppercase tracking-widest px-4 py-1.5 rounded-xl font-mono">
                                                {outreachMeta.recipientRole || "Stakeholder"}
                                            </Badge>
                                            <Badge variant="outline" className="text-[10px] font-black text-slate-400 border-slate-200 uppercase tracking-widest px-4 py-1.5 rounded-xl">
                                                {outreachMeta.tone} RESONANCE
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-10 pt-4">
                                    {generatedDraft.subject && (
                                        <div className="p-10 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] group/subject relative shadow-inner">
                                            <div className="absolute right-8 top-8 opacity-20 group-hover/subject:opacity-100 transition-opacity">
                                                <Sparkles className="w-5 h-5 text-[#F9C784]" />
                                            </div>
                                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-4">Architected Subject</p>
                                            <p className="text-xl font-bold text-[#1E1B4B] leading-snug tracking-tight">{generatedDraft.subject}</p>
                                        </div>
                                    )}
                                    <div className="p-12 bg-white border border-slate-100 rounded-[3rem] shadow-sm relative group/payload min-h-[300px]">
                                        <div className="absolute -left-1 -top-1 w-32 h-32 bg-gradient-to-br from-[#F9E8D4]/30 to-transparent rounded-full blur-3xl" />
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-8 relative">Message Payload <span className="text-[#F9C784] ml-2 text-sm">●</span></p>
                                        <div className="text-lg text-slate-600 font-medium leading-[1.8] whitespace-pre-wrap relative">
                                            {generatedDraft.content}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-10 border-t border-slate-100">
                                    <div className="flex items-center gap-5">
                                        <Button
                                            onClick={saveCurrentThread}
                                            className="bg-[#F9C784] text-[#1E1B4B] h-12 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#F9C784]/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save Strategy
                                        </Button>
                                    </div>
                                    <Button
                                        onClick={handleGenerateOutreach}
                                        disabled={isSyncing}
                                        className="bg-[#1E1B4B] text-white h-12 px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#1E1B4B]/20 hover:scale-[1.02] transition-all"
                                    >
                                        {isSyncing ? "Syncing..." : "Regenerate Strategy"}
                                    </Button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>

            {/* Right Section: Strategic Refinement Thread (Hero Focus) */}
            <div className="flex-1 flex flex-col bg-white border-l border-[#1E1B4B]/5 relative">
                <div className="p-8 lg:p-10 pb-6 border-b border-[#1E1B4B]/5 bg-white z-20">
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
                                className="flex-shrink-0 px-4 py-1.5 rounded-full border border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-500 hover:border-[#F9C784] hover:text-[#1E1B4B] hover:bg-[#F9E8D4]/30 transition-all active:scale-95"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-10 scroll-smooth bg-slate-50/30">
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
                        {isTyping && (
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
                <div className="p-8 lg:p-10 border-t border-[#1E1B4B]/5 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                    <div className="relative group">
                        <Textarea
                            placeholder="Type a clinical instruction or strategy prompt..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSendMessage()
                                }
                            }}
                            className="min-h-[110px] w-full bg-slate-50 border-slate-100 rounded-[2.5rem] p-7 pr-20 text-sm font-medium focus:border-[#F9C784]/50 focus:bg-white transition-all resize-none shadow-inner"
                        />
                        <button
                            onClick={() => handleSendMessage()}
                            disabled={!inputValue.trim() || isTyping}
                            className="absolute bottom-5 right-5 w-12 h-12 rounded-[1.25rem] bg-[#1E1B4B] text-white flex items-center justify-center hover:bg-[#2e2a70] disabled:opacity-20 transition-all shadow-xl shadow-[#1E1B4B]/10 active:scale-90"
                        >
                            <Send className="w-5 h-5" />
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
