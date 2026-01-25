"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send, Bot, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
    role: 'user' | 'assistant'
    content: string
    citations?: string[]
}

export function ChatWidget() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [input, setInput] = React.useState("")
    const [messages, setMessages] = React.useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm Adarsh's grounded AI assistant. I can answer questions about his experience, projects, and skills based strictly on facts found in this portfolio." }
    ])
    const [isLoading, setIsLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = { role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)

        try {
            const res = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.content, history: [] })
            })

            if (!res.ok) throw new Error("Failed to fetch")

            const data = await res.json()

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response,
                citations: data.citations
            }])
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting to my backend. Please ensure the Python API is running on port 8000.",
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {!isOpen && (
                <Button
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 animate-in fade-in zoom-in"
                    onClick={() => setIsOpen(true)}
                >
                    <MessageSquare className="h-6 w-6" />
                </Button>
            )}

            {isOpen && (
                <Card className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] shadow-2xl z-50 flex flex-col animate-in slide-in-from-bottom-10 fade-in border-white/10 bg-black/60 backdrop-blur-xl">
                    <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between bg-white/5">
                        <div className="flex items-center gap-2">
                            <Bot className="h-5 w-5 text-cyan-400" />
                            <CardTitle className="text-base text-white">Adarsh-bot</CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="-mr-2 h-8 w-8 text-white/60 hover:text-white hover:bg-white/10">
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((m, i) => (
                            <div key={i} className={cn("flex gap-2", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                                {m.role === 'assistant' && (
                                    <div className="h-8 w-8 rounded-full bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center shrink-0">
                                        <Bot className="h-4 w-4 text-cyan-400" />
                                    </div>
                                )}
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm max-w-[85%]",
                                    m.role === 'user' ? "bg-cyan-600 text-white rounded-br-sm" : "bg-white/10 text-slate-200 border border-white/5 rounded-bl-sm"
                                )}>
                                    {m.content}
                                    {m.citations && m.citations.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-white/10 text-xs text-slate-400">
                                            <p className="font-semibold mb-1 flex items-center gap-1"><BookOpen className="h-3 w-3" /> Sources:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {m.citations.map(c => (
                                                    <span key={c} className="bg-black/20 px-1.5 py-0.5 rounded border border-white/10 hover:bg-white/5 transition-colors cursor-default">{c}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-2">
                                <div className="h-8 w-8 rounded-full bg-cyan-900/30 border border-cyan-500/30 flex items-center justify-center shrink-0">
                                    <Bot className="h-4 w-4 text-cyan-400" />
                                </div>
                                <div className="bg-white/10 border border-white/5 p-3 rounded-2xl rounded-bl-sm text-sm flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="p-4 border-t border-white/10 bg-white/5">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask about my SQL agent..."
                                className="flex-1 bg-black/40 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-cyan-500/50"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-cyan-600 hover:bg-cyan-500 text-white">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </>
    )
}
