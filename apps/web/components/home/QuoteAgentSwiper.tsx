"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Quote = {
    quote: string;
    person: string;
    title?: string;
    img: string; // local public path
};

const QUOTES: Quote[] = [
    {
        quote: "What I cannot create, I do not understand.",
        person: "Richard Feynman",
        title: "Physicist",
        img: "/images/quotes/feynman.png",
    },
    {
        quote: "The best way to predict the future is to invent it.",
        person: "Alan Kay",
        title: "Computer Scientist",
        img: "/images/quotes/alan-kay.png",
    },
    {
        quote: "Simplicity is prerequisite for reliability.",
        person: "Edsger W. Dijkstra",
        title: "Computer Scientist",
        img: "/images/quotes/dijkstra.png",
    },
    {
        quote: "All models are wrong, but some are useful.",
        person: "George Box",
        title: "Statistician",
        img: "/images/quotes/george-box.png",
    },
    {
        quote: "The real problem is not whether machines think but whether men do.",
        person: "B. F. Skinner",
        title: "Psychologist",
        img: "/images/quotes/skinner.png",
    },
];

function wrapIndex(i: number) {
    const n = QUOTES.length;
    return ((i % n) + n) % n;
}

export function QuoteAgentSwiper() {
    const [index, setIndex] = useState(0);
    const q = QUOTES[wrapIndex(index)];

    const go = (dir: number) => setIndex((v) => v + dir);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-4">
                {/* Agent chip */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/80">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Quote Agent
                </div>

                {/* Dots */}
                <div className="hidden items-center gap-2 sm:flex">
                    {QUOTES.map((_, i) => {
                        const active = i === wrapIndex(index);
                        return (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={[
                                    "h-1.5 w-1.5 rounded-full transition",
                                    active ? "bg-white" : "bg-white/30 hover:bg-white/50",
                                ].join(" ")}
                                aria-label={`Go to quote ${i + 1}`}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
                <div className="relative px-4 py-4 sm:px-5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={wrapIndex(index)}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, info) => {
                                if (info.offset.x < -60) go(1);
                                else if (info.offset.x > 60) go(-1);
                            }}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -24 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex items-center gap-4 cursor-grab active:cursor-grabbing"
                        >
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                                <Image src={q.img} alt={q.person} fill className="object-cover" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-sm text-white/90 sm:text-base">
                                    &ldquo;{q.quote}&rdquo;
                                </p>
                                <p className="mt-1 text-xs text-white/60">
                                    {q.person}{q.title ? ` • ${q.title}` : ""}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Hint */}
                    <div className="mt-2 text-[11px] text-white/40">
                        Swipe left/right to change quote
                    </div>
                </div>
            </div>
        </div>
    );
}
