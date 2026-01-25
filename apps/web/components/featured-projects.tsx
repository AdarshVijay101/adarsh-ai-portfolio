import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FeaturedProjects() {
    const projects = [
        {
            title: "SQL Error Detection & Auto-Remediation Agent",
            description: "A multi-step agent that classifies ETL failures (schema drift, nulls) and generates deterministic SQL fixes. Reduced debugging time by 50%.",
            tags: ["Agentic AI", "Python", "FastAPI", "SQL"],
            slug: "sql-error-agent"
        },
        {
            title: "Data Governance Knowledge Worker (RAG)",
            description: "Retrieval system answering stakeholder questions with grounded citations from policy docs. Enforces strict accuracy and citation.",
            tags: ["RAG", "Embeddings", "Governance"],
            slug: "data-gov-rag"
        },
        {
            title: "Regulatory-Style Reporting Pack",
            description: "Accuracy-first KPI dashboards with variance explanations and data lineage notes for financial reporting standards.",
            tags: ["Power BI", "SQL", "Compliance"],
            slug: "regulatory-reporting"
        }
    ]

    return (
        <section className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="font-heading text-3xl font-bold tracking-tight">Featured Work</h2>
                <Button variant="ghost" asChild className="hidden md:flex">
                    <Link href="/projects">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.title} className="flex flex-col border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                        <CardHeader>
                            <CardTitle className="leading-snug">{project.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <CardDescription className="text-base">
                                {project.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`/projects/${project.slug}`}>View Case Study</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Button variant="ghost" asChild className="md:hidden w-full">
                <Link href="/projects">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </section>
    )
}
