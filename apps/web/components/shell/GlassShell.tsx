import { ReactNode } from "react";

export function GlassShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#040817]">
            {/* Background */}
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_20%_20%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(900px_600px_at_80%_40%,rgba(16,185,129,0.12),transparent_62%)]" />
                <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:60px_60px]" />
            </div>

            {/* Center Card */}
            <div className="relative mx-auto max-w-6xl px-6 py-10 lg:py-14">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.06] shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl">
                    <div className="px-6 py-6 lg:px-10 lg:py-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
