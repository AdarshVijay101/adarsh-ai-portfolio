import { notFound } from "next/navigation"
import { ArchitectureDiagram } from "@/components/architecture-diagram"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function generateStaticParams() {
    return [{ slug: 'sql-error-agent' }, { slug: 'data-gov-rag' }, { slug: 'regulatory-reporting' }]
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
    const { slug } = params

    if (slug !== 'sql-error-agent') {
        // Placeholder for others to avoid complex logic for standard ones
        return (
            <div className="space-y-8 max-w-4xl mx-auto">
                <Link href="/projects" className="text-muted-foreground hover:text-primary flex items-center gap-2 mb-8"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link>
                <h1 className="text-3xl font-bold">Project Case Study: {slug}</h1>
                <p className="text-muted-foreground">Full case study content coming soon. Please check 'SQL Error Detection' for the interactive demo.</p>
            </div>
        )
    }

    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <Link href="/projects" className="text-muted-foreground hover:text-primary flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back to Projects</Link>

            <header className="space-y-6">
                <h1 className="text-4xl font-heading font-bold">SQL Error Detection & Auto-Remediation Agent</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    An agentic workflow that autonomously fixes 35% of daily data pipeline failures by classifying errors and generating deterministic SQL repairs.
                </p>
                <div className="flex gap-2">
                    <Badge>Agentic AI</Badge>
                    <Badge>Python</Badge>
                    <Badge>FastAPI</Badge>
                    <Badge>Data Engineering</Badge>
                </div>
            </header>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">The Problem</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                    Data pipelines at the user's previous role failed frequently due to upstream schema drift or data quality issues (e.g. nulls in non-nullable columns). Debugging these logs manually took **2-4 hours per incident**, slowing down SLA reporting and distracting engineers from high-value work.
                </p>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold font-heading">Architecture Solution</h2>
                <p className="text-muted-foreground">
                    The system uses a multi-step "Agentic" approach. Interact with the diagram below to understand the flow from Error to Fix.
                </p>
                <ArchitectureDiagram />
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">Key Implementation Details</h2>
                <ul className="list-disc ml-5 space-y-3 text-muted-foreground text-lg">
                    <li><strong className="text-foreground">Log Ingestion:</strong> Automatically parses Airflow logs using regex to identify stack traces.</li>
                    <li><strong className="text-foreground">Classification:</strong> A lightweight classifier distinguishes between transient network errors (retry) and data errors (requires fix).</li>
                    <li><strong className="text-foreground">Sandbox Validator:</strong> The most critical component. It spins up a temporary transaction, applies the fix, runs a data quality check, and only commits if the check passes. This ensures "Do No Harm".</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-bold font-heading">Business Impact</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <div className="text-3xl font-bold text-emerald-500">50%</div>
                        <div className="text-sm text-muted-foreground">Reduction in debugging time</div>
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <div className="text-3xl font-bold text-primary">Zero</div>
                        <div className="text-sm text-muted-foreground">Regression failures due to Sandbox</div>
                    </div>
                </div>
            </section>
        </div>
    )
}
