import { useEngine } from '@/hooks/useEngine'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { ReasoningChain } from '@/components/cards/ReasoningChain'
import { Mail, Copy, MapPin, Sparkles, Send } from 'lucide-react'
import { useState } from 'react'
import { springTransition, fadeSlideUp } from '@/lib/motionVariants'

export function OutreachCopilot() {
    const { selectedEntity, setSelectedEntity, outreachMeta, setOutreachMeta, generatedDraft, isGenerating, handleGenerateOutreach, setCurrentView } = useEngine()
    const [copied, setCopied] = useState(false)

    const isOpen = selectedEntity !== null
    const entity = selectedEntity

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedEntity(null)
            setCopied(false)
        }
    }

    const handleCopy = async () => {
        if (!generatedDraft) return
        await navigator.clipboard.writeText(generatedDraft.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-lg bg-white backdrop-blur-xl border-l border-[#1E1B4B]/5 flex flex-col p-0 overflow-hidden"
            >
                {entity && (
                    <motion.div
                        className="flex flex-col h-full"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={springTransition}
                    >
                        <SheetHeader className="p-8 pb-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#1E1B4B] flex items-center justify-center shadow-lg shadow-[#1E1B4B]/10">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <SheetTitle className="text-xl font-black text-[#1E1B4B] tracking-tight uppercase">
                                            Outreach <span className="text-[#F9C784]">Protocol</span>
                                        </SheetTitle>
                                        <SheetDescription className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">
                                            AI Discovery Intelligence
                                        </SheetDescription>
                                    </div>
                                </div>
                            </div>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto p-8 space-y-10">
                            {/* Entity Info */}
                            <motion.div
                                variants={fadeSlideUp}
                                initial="initial"
                                animate="animate"
                                className="rounded-[2.5rem] bg-white border border-[#1E1B4B]/10 p-8 space-y-6 shadow-sm relative overflow-hidden"
                            >
                                {/* Rank Ribbon */}
                                <div className="absolute top-0 right-0">
                                    <div className="bg-[#1E1B4B] text-white font-black text-[10px] px-4 py-1.5 rounded-bl-2xl shadow-sm">
                                        RANK #{entity.rank || 'N/A'}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="font-black text-2xl text-[#1E1B4B] tracking-tight pr-12 leading-none">{entity.name}</h4>
                                        {entity.semantic_summary && (
                                            <p className="text-[10px] font-black text-[#F9C784] uppercase tracking-[0.2em]">
                                                {entity.semantic_summary}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <Badge variant="outline" className="text-[10px] font-black uppercase py-0.5 px-3 bg-[#F9E8D4] text-[#1E1B4B] border-[#1E1B4B]/10 rounded-lg">
                                            {entity.type}
                                        </Badge>
                                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                                            <MapPin className="w-3.5 h-3.5 text-[#F9C784]" />
                                            {entity.district}
                                        </span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none bg-slate-50 px-2 py-1.5 rounded-lg">
                                            {entity.ruralUrban}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Description */}
                                {entity.content && (
                                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-xs leading-relaxed text-slate-500 font-medium">
                                        {entity.content}
                                    </div>
                                )}

                                {/* Relevance bar */}
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Resonance Mapping</span>
                                        <span className="text-xl font-black text-[#1E1B4B] tracking-tighter">{entity.relevance}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden p-[1px] border border-slate-200/50">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-[#1E1B4B] to-[#F9C784]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${entity.relevance}%` }}
                                            transition={{ ...springTransition, delay: 0.2 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            {/* AI Reasoning */}
                            <motion.div
                                variants={fadeSlideUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.1 }}
                                className="space-y-5"
                            >
                                <div className="flex items-center gap-2 text-[10px] font-black text-[#1E1B4B]/60 uppercase tracking-[0.4em]">
                                    <Sparkles className="w-3.5 h-3.5 text-[#F9C784]" />
                                    Reasoning Matrix
                                </div>
                                <ReasoningChain reasoning={entity.ai_reasoning} isExpanded />
                            </motion.div>

                            <Separator className="bg-[#1E1B4B]/5" />

                            {/* Outreach Configuration */}
                            <motion.div
                                variants={fadeSlideUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.15 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-2 text-[10px] font-black text-[#1E1B4B]/60 uppercase tracking-[0.4em]">
                                    Configuration Matrix
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Channel</label>
                                        <select
                                            value={outreachMeta.channel}
                                            onChange={(e) => setOutreachMeta(prev => ({ ...prev, channel: e.target.value as any }))}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#F9C784]/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="email">Email</option>
                                            <option value="whatsapp">WhatsApp</option>
                                            <option value="phone_script">Phone Script</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="concept_note">Concept Note</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tone</label>
                                        <select
                                            value={outreachMeta.tone}
                                            onChange={(e) => setOutreachMeta(prev => ({ ...prev, tone: e.target.value as any }))}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#F9C784]/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="professional">Professional</option>
                                            <option value="warm">Warm</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recipient Name</label>
                                        <input
                                            type="text"
                                            value={outreachMeta.recipientName}
                                            onChange={(e) => setOutreachMeta(prev => ({ ...prev, recipientName: e.target.value }))}
                                            placeholder="e.g. Dr. Priya"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E1B4B] placeholder:text-slate-300 outline-none focus:border-[#F9C784]/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recipient Role</label>
                                        <select
                                            value={outreachMeta.recipientRole}
                                            onChange={(e) => setOutreachMeta(prev => ({ ...prev, recipientRole: e.target.value }))}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 text-xs font-bold text-[#1E1B4B] outline-none focus:border-[#F9C784]/50 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Role...</option>
                                            <option value="CMO / Medical Officer">CMO / Medical Officer</option>
                                            <option value="Primary / ASHA">Primary / ASHA</option>
                                            <option value="CSR Head / Funder">CSR Head / Funder</option>
                                            <option value="NGO">NGO Partner</option>
                                        </select>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleGenerateOutreach}
                                    disabled={isGenerating}
                                    className="w-full h-11 bg-[#1E1B4B] text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-[#2e2a70] transition-all shadow-lg shadow-[#1E1B4B]/10 active:scale-[0.98]"
                                >
                                    {isGenerating ? 'Synthesizing Intelligence...' : 'Generate Optimized Outreach'}
                                </Button>
                            </motion.div>

                            <Separator className="bg-[#1E1B4B]/5" />

                            {/* Draft Generator */}
                            <motion.div
                                variants={fadeSlideUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.2 }}
                                className="space-y-5"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                                        Draft Generator Output
                                    </h4>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isGenerating ? 'bg-[#F9C784] animate-pulse' : 'bg-green-400'}`} />
                                        <span className="text-[9px] font-black text-[#1E1B4B]/60 uppercase tracking-widest">
                                            {isGenerating ? 'Generating' : generatedDraft ? 'Optimized' : 'Ready'}
                                        </span>
                                    </div>
                                </div>

                                {generatedDraft && generatedDraft.missing.length > 0 && (
                                    <div className="p-4 rounded-2xl bg-[#F9C784]/10 border border-[#F9C784]/20 flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#F9C784] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[#1E1B4B] font-black text-[10px]">!</span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-[#1E1B4B] uppercase tracking-wider">Missing Variables Detected</p>
                                            <p className="text-[10px] font-medium text-[#1E1B4B]/60 leading-normal">
                                                AI requires more context for: <span className="text-[#1E1B4B] font-bold">{generatedDraft.missing.join(', ')}</span>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {generatedDraft?.subject && (
                                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Subject Line</p>
                                            <p className="text-xs font-bold text-[#1E1B4B] leading-snug">{generatedDraft.subject}</p>
                                        </div>
                                    )}
                                    <Textarea
                                        value={generatedDraft ? generatedDraft.content : isGenerating ? "Architecting the perfect outreach payload based on clinical parameters..." : "Configure the matrix above and generate to architect a clinical outreach draft."}
                                        readOnly
                                        className="min-h-[250px] bg-white border-[#1E1B4B]/10 text-slate-600 text-sm leading-relaxed p-6 rounded-[2rem] focus:border-[#F9C784]/40 transition-all shadow-sm font-medium resize-none cursor-default"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <SheetFooter className="p-8 pt-6 pb-10 gap-4 border-t border-[#1E1B4B]/5 bg-[#F9E8D4]/5">
                            <Button
                                variant="outline"
                                onClick={handleCopy}
                                disabled={!generatedDraft || isGenerating}
                                className="flex-1 h-12 bg-white border-[#1E1B4B]/10 text-[#1E1B4B]/60 font-black uppercase text-[11px] tracking-widest hover:bg-[#F9E8D4] hover:text-[#1E1B4B] rounded-2xl transition-all"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                {copied ? 'Copied' : 'Copy Draft'}
                            </Button>
                            <Button
                                onClick={() => {
                                    setCurrentView('outreach')
                                    handleOpenChange(false)
                                }}
                                disabled={!generatedDraft || isGenerating}
                                className="flex-1 h-12 bg-[#F9C784] hover:bg-[#f9d4a1] text-[#1E1B4B] font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-lg shadow-[#F9C784]/20 transition-all active:scale-[0.98]"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Dispatch
                            </Button>
                        </SheetFooter>
                    </motion.div>
                )}
            </SheetContent>
        </Sheet>
    )
}
