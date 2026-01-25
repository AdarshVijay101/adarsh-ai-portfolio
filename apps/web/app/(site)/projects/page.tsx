import { ProjectSearch } from "@/components/project-search"

export default function ProjectsPage() {
    return (
        <div className="space-y-8 max-w-screen-xl mx-auto">
            <div>
                <h1 className="text-4xl font-heading font-bold">Projects</h1>
                <p className="text-xl text-muted-foreground mt-2 max-w-2xl">
                    Case studies in Agentic AI, Data Governance, and Analytics Engineering. Each project demonstrates an "Accuracy First" approach.
                </p>
            </div>
            <ProjectSearch />
        </div>
    )
}
