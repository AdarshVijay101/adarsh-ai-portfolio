import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
    return (
        <div className="space-y-12 max-w-4xl mx-auto">
            <section className="space-y-4">
                <h1 className="text-4xl font-heading font-bold">About Me</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    I sit at the intersection of **Data Science** and **Process Automation**. With a Master’s in Data Science and 3+ years of experience, I don't just analyze numbers—I build the systems that make them reliable.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Currently, as a Junior AI Engineer at WinningEdge Solutions, I specialize in creating agents that fix themselves, pipelines that explain their own errors, and dashboards that tell the truth.
                </p>
            </section>

            <section className="space-y-8">
                <h2 className="text-2xl font-heading font-bold">Experience</h2>
                <div className="border-l-2 border-border pl-6 space-y-12">
                    {/* Item 1 */}
                    <div className="relative">
                        <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
                        <div className="space-y-2">
                            <h3 className="font-bold text-xl">Junior AI Engineer (Data Automation & Analytics)</h3>
                            <p className="text-muted-foreground font-mono text-sm">WinningEdge Solutions LLC | Dec 2025 – Present</p>
                            <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
                                <li><strong className="text-foreground">Led end-to-end delivery</strong> for analytics automation; translated ambiguous requirements into measurable outputs.</li>
                                <li>Built Python/SQL workflows (Agentic AI) reducing manual data cleanup by <strong className="text-emerald-500">35%</strong> via standardized validation rules.</li>
                                <li>Implemented data integrity controls (schema checks, constraint rules) for audit-ready summaries.</li>
                                <li>Created documentation and templates used by junior team members.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Item 2 */}
                    <div className="relative">
                        <span className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-muted-foreground/30 ring-4 ring-background" />
                        <div className="space-y-2">
                            <h3 className="font-bold text-xl">Data Scientist / Analytics Engineer</h3>
                            <p className="text-muted-foreground font-mono text-sm">Vastika Inc | Sep 2024 – Dec 2025</p>
                            <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
                                <li>Built repeatable KPI datasets/dashboards which improved reporting accuracy by <strong className="text-emerald-500">20%</strong>.</li>
                                <li>Implemented source-to-target reconciliation checks, looking for and reducing data defects by <strong className="text-emerald-500">40%</strong>.</li>
                                <li>Automated incident summaries and runbooks from pipeline logs, cutting time-to-resolution by <strong className="text-emerald-500">30%</strong>.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">Education</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">M.S. in Data Science</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">DePaul University</p>
                            <p className="text-muted-foreground text-sm font-mono mt-1">Jan 2023 – Dec 2024</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">B.Tech in Mechanical Engineering</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-medium">Vellore Institute of Technology</p>
                            <p className="text-muted-foreground text-sm font-mono mt-1">Jul 2018 – May 2022</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">Skills</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Technical</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {["Python", "SQL", "Agentic AI", "RAG", "FastAPI", "Databricks", "Power BI", "Tableau", "Git"].map(s => (
                                <Badge key={s} variant="secondary">{s}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Competencies</CardTitle></CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            {["Data Governance", "Integrity Controls", "Quantitative Analysis", "Reporting Automation", "Stakeholder Management"].map(s => (
                                <Badge key={s} variant="outline">{s}</Badge>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
