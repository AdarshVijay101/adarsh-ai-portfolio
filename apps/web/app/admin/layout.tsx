import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Manage your portfolio content',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Adarsh Admin</h1>
            </header>
            <main className="p-8">
                {children}
            </main>
        </div>
    )
}
