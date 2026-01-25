import { ReactNode } from "react";
import { GlassShell } from "@/components/shell/GlassShell";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <GlassShell>
            <SiteHeader />
            <main className="flex-1 container mx-auto px-4 md:px-8 py-6">
                {children}
            </main>
            <SiteFooter />
        </GlassShell>
    );
}
