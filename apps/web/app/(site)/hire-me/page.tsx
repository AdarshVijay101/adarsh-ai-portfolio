"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import { usePrivacy } from "@/app/context/privacy-context"

export default function HireMePage() {
    const { isPrivacyMode } = usePrivacy()

    return (
        <div className="max-w-3xl mx-auto space-y-12">
            <section className="space-y-6">
                <h1 className="text-4xl font-heading font-bold">Hire Me</h1>
                <p className="text-xl text-muted-foreground">
                    I am currently open to roles as an <strong>AI Engineer</strong>, <strong>Analytics Engineer</strong>, or <strong>Technical Business Analyst</strong> in the US.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    {!isPrivacyMode ? (
                        <>
                            <Button size="lg" className="w-full sm:w-auto">
                                <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                                <a href="mailto:kadarshvijay@gmail.com">
                                    <Mail className="mr-2 h-4 w-4" /> Email Me
                                </a>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto" disabled title="Disable Privacy Mode to download">
                                <Download className="mr-2 h-4 w-4" /> Download Resume (Hidden)
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto" disabled title="Disable Privacy Mode to view">
                                <Mail className="mr-2 h-4 w-4" /> Email Hidden
                            </Button>
                        </>
                    )}
                </div>
                {isPrivacyMode && (
                    <p className="text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-4 py-1 bg-muted/50 rounded-r">
                        * Contact details and Resume are currently hidden in <strong>Privacy Mode</strong>. Toggle the eye icon <span className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg></span> in the top right header to view them.
                    </p>
                )}
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardContent className="pt-6 space-y-4 h-full">
                        <h3 className="font-bold text-xl">Best Role Fit</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                <span><strong>AI Engineer (Applied):</strong> Building agentic tools, RAG systems, and data automations.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                <span><strong>Analytics Engineer:</strong> Engineering pipelines, cleaning data, and ensuring integrity.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                <span><strong>Technical BA:</strong> Bridging requirements to technical implementation.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6 space-y-4 h-full">
                        <h3 className="font-bold text-xl">How I Work</h3>
                        <ul className="space-y-3 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span><strong>Accuracy First:</strong> I verify before I automate. I'd rather ship it right than ship it twice.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span><strong>Audit-Ready:</strong> Everything I build generates logs, proof, and documentation.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span><strong>User-Centric:</strong> I explain technical outputs in business terms.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <section className="space-y-6">
                <h2 className="text-2xl font-bold font-heading">Interview Topics I Love</h2>
                <div className="flex flex-wrap gap-2">
                    {[
                        "Agentic AI Architecture",
                        "SQL Optimization (CTEs/Window Functions)",
                        "Data Governance Policies",
                        "Retrieval Augmented Generation (RAG)",
                        "Python Automation",
                        "Stakeholder Communication",
                        "Data Integrity Controls"
                    ].map(topic => (
                        <Badge key={topic} variant="secondary" className="text-sm py-2 px-4">
                            {topic}
                        </Badge>
                    ))}
                </div>
            </section>
        </div>
    )
}
