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
import { ReasoningChain } from '@/components/cards/ReasoningChain'
import { Mail, Copy, MapPin, Sparkles } from 'lucide-react'
import { useState } from 'react'

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
            <SheetContent side="right" className="w-full sm:max-w-md bg-slate-900 border-slate-700/50 flex flex-col overflow-y-auto">
                {entity && (
                    <>
                        <SheetHeader className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <SheetTitle className="text-base text-slate-100">
                                        Outreach Copilot
                                    </SheetTitle>
                                    <SheetDescription className="text-xs">
                                        AI-drafted communication ready for review
                                    </SheetDescription>
                                </div>
                            </div>
                        </SheetHeader>

                        <div className="flex-1 space-y-4 py-4">
                            {/* Entity Info */}
                            <div className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-4 space-y-3">
                                <h4 className="font-semibold text-sm text-slate-100">{entity.name}</h4>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="outline" className="text-[10px] bg-teal-500/10 text-teal-400 border-teal-500/20">
                                        {entity.type}
                                    </Badge>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <MapPin className="w-3 h-3" />
                                        {entity.district}
                                    </span>
                                    <span className="text-xs text-slate-500">{entity.ruralUrban}</span>
                                </div>

                                {/* Relevance bar */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Relevance Score</span>
                                        <span className="font-semibold text-teal-400">{entity.relevance}%</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-1000"
                                            style={{ width: `${entity.relevance}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* AI Reasoning */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-400">
                                    <Sparkles className="w-3 h-3" />
                                    AI Reasoning
                                </div>
                                <ReasoningChain reasoning={entity.ai_reasoning} isExpanded />
                            </div>

                            <Separator className="bg-slate-700/50" />

                            {/* Draft Email */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    Draft Email
                                </h4>
                                <Textarea
                                    value={emailContent}
                                    onChange={(e) => setEmailContent(e.target.value)}
                                    className="min-h-[200px] bg-slate-800/50 border-slate-700/50 text-slate-200 text-sm leading-relaxed resize-none focus:border-teal-500/30"
                                />
                            </div>
                        </div>

                        <SheetFooter className="gap-2 pt-4 border-t border-slate-700/50">
                            <Button
                                variant="outline"
                                onClick={handleCopy}
                                className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </Button>
                            <Button className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white">
                                <Mail className="w-4 h-4 mr-2" />
                                Send via Email
                            </Button>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
