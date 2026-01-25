"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PrivacyToggle } from '@/components/privacy-toggle'
import { MessageSquare } from 'lucide-react'

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container px-4 md:px-8 flex h-14 max-w-screen-2xl items-center mx-auto">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-heading font-bold text-xl tracking-tight">Adarsh.</span>
                </Link>
                <nav className="flex flex-1 items-center space-x-6 text-sm font-medium hidden md:flex">
                    <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
                    <Link href="/projects" className="transition-colors hover:text-foreground/80 text-foreground/60">Work</Link>
                    <Link href="/projects/games" className="transition-colors hover:text-cyan-400 text-foreground/60">Games (Beta)</Link>
                    <Link href="/blog" className="transition-colors hover:text-foreground/80 text-foreground/60">Blog</Link>
                    <Link href="/hire-me" className="transition-colors hover:text-foreground/80 text-foreground/60">Hire Me</Link>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <PrivacyToggle />
                    <Button size="sm" className="hidden sm:flex">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Ask Adarsh-bot
                    </Button>
                    <Button size="icon" className="sm:hidden">
                        <MessageSquare className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
