export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-background/95">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by <strong>Adarsh Vijay</strong>. Powered by grounded RAG AI.
                </p>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/AdarshVijay101" target="_blank" rel="noreferrer" className="text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors">GitHub</a>
                    <a href="https://linkedin.com/in/adarshvijaykrishnakumar" target="_blank" rel="noreferrer" className="text-sm font-medium underline underline-offset-4 hover:text-primary transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    )
}
