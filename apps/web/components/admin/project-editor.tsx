'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchWithAuth } from '@/lib/api';

export default function ProjectEditor({ project, onSave, onCancel }: { project?: any, onSave: () => void, onCancel: () => void }) {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        slug: project?.slug || '',
        description: project?.description || '',
        tags: project?.tags || '',
        content_markdown: project?.content_markdown || '',
        image_url: project?.image_url || '',
        demo_url: project?.demo_url || '',
        repo_url: project?.repo_url || ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = project ? `/admin/projects/${project.id}` : '/admin/projects';
            const method = project ? 'PUT' : 'POST';

            const res = await fetchWithAuth(url, {
                method,
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                onSave();
            } else {
                alert('Failed to save project');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-950 p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-bold mb-4">{project ? 'Edit Project' : 'New Project'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug (URL)</Label>
                        <Input id="slug" value={formData.slug} onChange={handleChange} required />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Input id="description" value={formData.description} onChange={handleChange} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" value={formData.tags} onChange={handleChange} placeholder="AI, React, Python" />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input id="image_url" value={formData.image_url} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="demo_url">Demo URL</Label>
                        <Input id="demo_url" value={formData.demo_url} onChange={handleChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="repo_url">Repo URL</Label>
                        <Input id="repo_url" value={formData.repo_url} onChange={handleChange} />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="content_markdown">Content (Markdown)</Label>
                    <textarea
                        id="content_markdown"
                        className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                        value={formData.content_markdown}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Project'}</Button>
                </div>
            </form>
        </div>
    );
}
