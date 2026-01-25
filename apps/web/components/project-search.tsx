"use client"
import * as React from "react"
import Fuse from "fuse.js"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const allProjects = [
    {
        title: "SQL Error Detection & Auto-Remediation Agent",
        description: "A multi-step agent that classifies ETL failures (schema drift, nulls) and generates deterministic SQL fixes. Reduced debugging time by 50%. Built with Python, SQL, and Agentic workflows.",
        tags: ["Agentic AI", "Python", "FastAPI", "SQL", "Automation"],
        slug: "sql-error-agent"
    },
    {
        title: "Data Governance Knowledge Worker (RAG)",
        description: "Retrieval system answering stakeholder questions with grounded citations from policy docs. Enforces strict accuracy and citation using RAG and embeddings.",
        tags: ["RAG", "Embeddings", "Data Governance", "Python"],
        slug: "data-gov-rag"
    },
    {
        title: "Regulatory-Style Reporting Pack",
        description: "Accuracy-first KPI dashboards with variance explanations and data lineage notes for financial reporting standards. Ensuring trusted data delivery.",
        tags: ["Power BI", "SQL", "Compliance", "Reporting"],
        slug: "regulatory-reporting"
    }
]

export function ProjectSearch() {
    const [query, setQuery] = React.useState("")
    const [selectedTag, setSelectedTag] = React.useState<string | null>(null)

    // Fuse setup
    const fuse = React.useMemo(() => new Fuse(allProjects, {
        keys: ["title", "description", "tags"],
        threshold: 0.3
    }), [])

    const filteredProjects = React.useMemo(() => {
        let result = allProjects
        if (query) {
            result = fuse.search(query).map(r => r.item)
        }
        if (selectedTag) {
            result = result.filter(p => p.tags.includes(selectedTag))
        }
        return result
    }, [query, selectedTag, fuse])

    const allTags = Array.from(new Set(allProjects.flatMap(p => p.tags)))

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    placeholder="Search projects by keyword..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="md:max-w-xs"
                />
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-muted-foreground mr-2">Filter:</span>
                    <Badge
                        variant={selectedTag === null ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/90"
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </Badge>
                    {allTags.map(tag => (
                        <Badge
                            key={tag}
                            variant={selectedTag === tag ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/90"
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map(project => (
                    <Card key={project.title} className="flex flex-col h-full border-border/50 bg-card/50 hover:bg-card hover:border-primary/50 transition-all">
                        <CardHeader>
                            <CardTitle className="leading-snug">{project.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                            </div>
                        </CardHeader>
                        <CardDescription className="px-6 flex-1 text-base leading-relaxed text-muted-foreground">
                            {project.description}
                        </CardDescription>
                        <CardFooter className="mt-6 pt-0">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={`/projects/${project.slug}`}>View Case Study</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
                {filteredProjects.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                        No projects found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    )
}
