"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroPortraitLarge({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    return (
        <div className="relative h-full w-full overflow-visible">
            {/* Glow behind subject */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-12 blur-3xl opacity-80"
                style={{
                    background:
                        "radial-gradient(60% 60% at 60% 40%, rgba(99,102,241,0.35) 0%, rgba(0,0,0,0) 70%)",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="relative"
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                >
                    {/* Portrait Stage (LAPTOP FIRST) */}
                    <div className="relative ml-auto h-[clamp(540px,68vh,860px)] w-[clamp(420px,34vw,620px)]">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            priority
                            sizes="(min-width: 1024px) 620px, 90vw"
                            className={[
                                "object-contain object-bottom select-none",
                                // Soft realistic depth
                                "drop-shadow-[0_32px_70px_rgba(0,0,0,0.60)]",
                                // Seamless blend: fade edges + bottom into background
                                "[mask-image:radial-gradient(85%_95%_at_58%_35%,black_64%,transparent_100%),linear-gradient(to_top,transparent_0%,black_28%)]",
                                "[-webkit-mask-image:radial-gradient(85%_95%_at_58%_35%,black_64%,transparent_100%),linear-gradient(to_top,transparent_0%,black_28%)]",
                                "will-change-transform",
                            ].join(" ")}
                        />
                    </div>

                    {/* Subtle highlight rim so cutout doesn’t look pasted */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-0 h-full w-[clamp(420px,34vw,620px)] opacity-30"
                        style={{
                            background:
                                "radial-gradient(55% 55% at 60% 35%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 65%)",
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
