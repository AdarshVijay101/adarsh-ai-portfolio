"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
    src: string;
    alt: string;
};

export function HeroPortrait({ src, alt }: Props) {
    return (
        <div className="relative w-full flex justify-end">
            {/* Back glow behind the subject */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 opacity-60 blur-3xl ml-auto w-full max-w-[500px]"
                style={{
                    background:
                        "radial-gradient(60% 60% at 55% 45%, rgba(34, 211, 238, 0.25) 0%, rgba(0,0,0,0) 70%)", // Cyan/Blue glow
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
            >
                {/* Gentle float */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    {/* A fixed-height stage so the portrait looks BIG on laptop */}
                    {/* Aligned right/bottom */}
                    <div className="relative ml-auto h-[clamp(460px,52vh,720px)] w-[min(520px,42vw)]">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            priority
                            sizes="(min-width: 1024px) 520px, 80vw"
                            className={[
                                "object-contain object-bottom select-none",
                                // soft realistic shadow
                                "drop-shadow-[0_28px_55px_rgba(0,0,0,0.55)]",
                                // SEAMLESS BLEND: fade edges + bottom into background via masking
                                "[mask-image:radial-gradient(85%_95%_at_55%_35%,black_64%,transparent_100%),linear-gradient(to_top,transparent_0%,black_24%)]",
                                "[-webkit-mask-image:radial-gradient(85%_95%_at_55%_35%,black_64%,transparent_100%),linear-gradient(to_top,transparent_0%,black_24%)]",
                                "will-change-transform",
                            ].join(" ")}
                        />
                    </div>

                    {/* Subtle highlight so the cutout doesn’t look pasted */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-0 h-full w-[min(520px,42vw)] opacity-35"
                        style={{
                            background:
                                "radial-gradient(55% 55% at 55% 35%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 65%)",
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
