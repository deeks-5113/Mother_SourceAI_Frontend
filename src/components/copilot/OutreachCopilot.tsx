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
    const { selectedEntity, setSelectedEntity } = useEngine()
    const [emailContent, setEmailContent] = useState('')
    const [copied, setCopied] = useState(false)

    const isOpen = selectedEntity !== null
    const entity = selectedEntity

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedEntity(null)
            setCopied(false)
        }
    }

    // Sync email content when entity changes
    if (entity && emailContent !== entity.draftEmail && !copied) {
        setEmailContent(entity.draftEmail)
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(emailContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-lg glass-panel bg-slate-950/90 border-l border-slate-800 flex flex-col p-0 overflow-hidden"
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
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.2)]">
                                        <Mail className="w-5 h-5 text-slate-950 px-0.5" />
                                    </div>
                                    <div>
                                        <SheetTitle className="text-xl font-black text-slate-100 tracking-tight italic uppercase italic">
                                            Outreach <span className="text-teal-400">Copilot</span>
                                        </SheetTitle>
                                        <SheetDescription className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                                            AI Generated Intelligence Alpha
                                        </SheetDescription>
                                    </div>
                                </div>
                            </div>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Entity Info */}
                            <motion.div
                                variants={fadeSlideUp}
                                initial="initial"
                                animate="animate"
                                className="rounded-2xl glass-card bg-slate-900/50 border-slate-800 p-6 space-y-6 shadow-2xl relative overflow-hidden"
                            >
                                {/* Rank Ribbon */}
                                <div className="absolute top-0 right-0">
                                    <div className="bg-teal-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-xl shadow-lg">
                                        RANK #{entity.rank || 'N/A'}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <h4 className="font-black text-xl text-slate-100 uppercase italic tracking-tight pr-12">{entity.name}</h4>
                                        {entity.semantic_summary && (
                                            <p className="text-[10px] font-bold text-teal-500/80 uppercase tracking-widest">
                                                {entity.semantic_summary}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <Badge variant="outline" className="text-[10px] font-bold uppercase py-0.5 px-2 bg-teal-500/10 text-teal-400 border-teal-500/20">
                                            {entity.type}
                                        </Badge>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {entity.district}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none bg-slate-800/50 px-1.5 py-1 rounded">
                                            {entity.ruralUrban}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Description */}
                                {entity.content && (
                                    <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-800/50 text-xs leading-relaxed text-slate-400 italic">
                                        {entity.content}
                                    </div>
                                )}

                                {/* Relevance bar */}
                                <div className="space-y-2.5 pt-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Match Confidence</span>
                                        <span className="text-lg font-black text-teal-400 tracking-tighter italic">{entity.relevance}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden p-[1px] border border-slate-700/50">
                                        <motion.div
                                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
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
                                className="space-y-4"
                            >
                                <div className="flex items-center gap-2 text-[10px] font-black text-violet-400 uppercase tracking-[0.3em] italic">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Reasoning Protocol
                                </div>
                                <ReasoningChain reasoning={entity.ai_reasoning} isExpanded />
                            </motion.div>

                            <Separator className="bg-slate-800/50" />

                            {/* Draft Email */}
                            <motion.div
                                variants={fadeSlideUp}
                                initial="initial"
                                animate="animate"
                                transition={{ delay: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-mono italic">
                                        Draft Generation
                                    </h4>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                        <span className="text-[9px] font-bold text-teal-500 uppercase tracking-widest">Optimized</span>
                                    </div>
                                </div>
                                <Textarea
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                    className="min-h-[250px] bg-slate-900/50 border-slate-800 text-slate-200 text-sm leading-relaxed p-6 rounded-2xl focus:border-teal-500/50 transition-all shadow-inner font-medium"
                                />
                            </motion.div>
                        </div>

                        <SheetFooter className="p-8 pt-4 pb-10 gap-3 border-t border-slate-800/50 bg-slate-950/50">
                            <Button
                                variant="outline"
                                onClick={handleCopy}
                                className="flex-1 h-12 border-slate-800 text-slate-400 font-bold uppercase text-[11px] tracking-widest hover:bg-slate-900 hover:text-slate-200 rounded-xl"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                {copied ? 'Copied' : 'Copy Payload'}
                            </Button>
                            <Button className="flex-1 h-12 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black uppercase text-[11px] tracking-widest rounded-xl shadow-[0_8px_20px_rgba(20,184,166,0.2)]">
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
