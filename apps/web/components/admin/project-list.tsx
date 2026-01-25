'use client';

import { useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/api';
import { Button } from '@/components/ui/button';
import ProjectEditor from './project-editor';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [view, setView] = useState<'list' | 'edit' | 'create'>('list');
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const res = await fetchWithAuth('/admin/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await fetchWithAuth(`/admin/projects/${id}`, { method: 'DELETE' });
            loadProjects();
        } catch (err) {
            console.error(err);
        }
    };

    if (view === 'create') {
        return <ProjectEditor onSave={() => { setView('list'); loadProjects(); }} onCancel={() => setView('list')} />;
    }

    if (view === 'edit' && editingProject) {
        return <ProjectEditor project={editingProject} onSave={() => { setView('list'); loadProjects(); }} onCancel={() => setView('list')} />;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Projects</CardTitle>
                <Button onClick={() => setView('create')}>+ New Project</Button>
            </CardHeader>
            <CardContent>
                {projects.length === 0 ? (
                    <p className="text-muted-foreground">No projects found.</p>
                ) : (
                    <div className="space-y-4">
                        {projects.map((p: any) => (
                            <div key={p.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-semibold">{p.title}</h4>
                                    <p className="text-sm text-muted-foreground">{p.tags}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => { setEditingProject(p); setView('edit'); }}>Edit</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
