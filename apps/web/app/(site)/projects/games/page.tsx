import Link from "next/link"
import { ArrowRight, Bot, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GamesDashboard() {
    const games = [
        {
            title: "AI Connect Four",
            description: "Challenge an AI agent in a classic game of strategy. Switch between different AI personalities like ChatGPT, Gemini, or Grok.",
            href: "/projects/games/connect-four",
            icon: Bot,
            color: "text-cyan-400",
            bg: "bg-cyan-950/30",
            border: "border-cyan-800/50"
        },
        {
            title: "Sketch & Guess",
            description: "Draw anything on the canvas and let the AI vision model guess what it is in real-time. Powered by Vision LLMs.",
            href: "/projects/games/sketch-guess",
            icon: PenTool,
            color: "text-purple-400",
            bg: "bg-purple-950/30",
            border: "border-purple-800/50"
        }
    ]

    return (
        <div className="container max-w-6xl py-24 mx-auto px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
                <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight">
                    AI <span className="text-cyan-400">Playground</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Interact with my latest AI experiments. Test reasoning capabilities or vision models in fun, interactive demos.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {games.map((game) => (
                    <Link
                        key={game.title}
                        href={game.href}
                        className={`group relative overflow-hidden rounded-3xl border ${game.border} ${game.bg} p-8 transition-all hover:scale-[1.02] hover:shadow-2xl`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black/40 ${game.color} shadow-inner`}>
                                <game.icon className="h-8 w-8" />
                            </div>

                            <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                            <p className="text-muted-foreground text-lg mb-8 flex-grow leading-relaxed">
                                {game.description}
                            </p>

                            <div className="flex items-center text-sm font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                                Play Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
