'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { HeroPortraitLarge } from "@/components/home/HeroPortraitLarge";

interface Profile {
    full_name: string;
    bio: string;
    current_mood: string;
    avatar_url: string;
    is_available_for_hire: boolean;
}

import { QuoteAgentSwiper } from "@/components/home/QuoteAgentSwiper";

// ... imports ...

export function Hero() {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetch('http://localhost:8000/admin/profile')
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="relative overflow-hidden">
            {/* Premium background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(1200px 700px at 18% 25%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(900px 560px at 85% 35%, rgba(16,185,129,0.10), transparent 62%)",
                }}
            >
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/5 rounded-full blur-[100px] pointer-events-none" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-6 h-full flex flex-col justify-center">
                {/* Laptop-first: 12-col hero with bottom alignment */}
                <div className="grid min-h-[85vh] grid-cols-12 items-center lg:items-end gap-4 lg:gap-10">
                    {/* LEFT: Hero text/buttons (7 cols) */}
                    <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-6 z-20 pb-12 lg:pb-16">

                        {/* Quote Agent Integrated Here */}
                        <div className="w-full max-w-lg mb-2">
                            <QuoteAgentSwiper />
                        </div>

                        <div className="space-y-4">
                            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors w-fit ${profile?.is_available_for_hire ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500' : 'border-amber-500/20 bg-amber-500/10 text-amber-500'}`}>
                                <span className="relative flex h-2.5 w-2.5">
                                    {profile?.is_available_for_hire && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${profile?.is_available_for_hire ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                </span>
                                {profile?.is_available_for_hire ? 'Available for new projects' : 'Currently Booked'}
                            </div>

                            <div className="space-y-1">
                                <p className="text-xl md:text-2xl lg:text-3xl font-medium text-cyan-400 tracking-wide">
                                    Hello, I'm
                                </p>
                                <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tight leading-[0.9]">
                                    {profile?.full_name ? profile.full_name.split(' ')[0] : 'ADARSH'} <br />
                                    <span className="text-white">{profile?.full_name ? profile.full_name.split(' ').slice(1).join(' ') : 'VIJAY'}</span>
                                </h1>
                                <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-400 pt-3">
                                    AI Engineer & <span className="text-cyan-400">Data Strategist</span>
                                </p>
                            </div>
                        </div>

                        <p className="max-w-xl text-lg md:text-xl text-slate-400 leading-relaxed text-balance">
                            {profile?.bio || "I build autonomous SQL agents, robust data pipelines, and governance strategies that bridge the gap between technical complexity and business value."}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-cyan-500 hover:bg-cyan-400 text-black rounded-full" asChild>
                                <Link href="/hire-me">
                                    Hire Me
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold border-slate-700 text-white hover:bg-white/10 rounded-full" asChild>
                                <Link href="/projects">
                                    View Work
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT: Portrait - BIG and anchored (5 cols) */}
                    <div className="col-span-12 lg:col-span-5 relative h-full min-h-[50vh] lg:min-h-0 pointer-events-none">
                        <div className="lg:absolute lg:bottom-0 lg:right-0 lg:w-full h-full flex items-end justify-end translate-x-12 lg:translate-x-0">
                            <HeroPortraitLarge
                                src="/hero-person.png"
                                alt={profile?.full_name || "Adarsh Vijay Krishnakumar"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
