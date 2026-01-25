import { CheckCircle2 } from "lucide-react"

export function WhyHireMe() {
    const reasons = [
        {
            title: "AI Engineer transforming manual workflows",
            description: "I don't just write scripts; I build agentic systems that handle ambiguity and reduce toil."
        },
        {
            title: "Data Analyst ensuring 100% integrity",
            description: "My background in governance means I prioritize accuracy, audit trails, and reliable data over hype."
        },
        {
            title: "Strategic Partner for clarity",
            description: "I bridge the gap between technical data outputs and business decision-making with clear communication."
        }
    ]

    return (
        <section className="rounded-xl border border-primary/20 bg-primary/5 p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="font-heading text-3xl font-bold tracking-tight">Why work with me?</h2>
                    <p className="text-muted-foreground text-lg text-balance">
                        I combine the precision of a Business Analyst with the innovation of an AI Engineer.
                    </p>
                </div>
                <div className="space-y-6">
                    {reasons.map((reason, i) => (
                        <div key={i} className="flex gap-4">
                            <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                            <div className="space-y-1">
                                <h3 className="font-bold">{reason.title}</h3>
                                <p className="text-muted-foreground">{reason.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
