'use client';

import { useState, useEffect } from 'react';
import { fetchWithAuth } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming generic TextArea or from shadcn
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label'; // Assuming Label component or use standard label

// Start of component
export default function ProfileEditor() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await fetchWithAuth('/admin/profile');
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const res = await fetchWithAuth('/admin/profile', {
                method: 'POST',
                body: JSON.stringify(profile),
            });
            if (res.ok) {
                setMessage('Profile updated successfully!');
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (err) {
            setMessage('Error saving profile.');
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Need to send with Authorization header, but fetchWithAuth handles JSON content-type by default unless we override?
            // fetchWithAuth sets Content-Type: application/json if not overridden/FormData handle it? 
            // Actually fetchWithAuth sets Content-Type to JSON. We need to remove it for FormData to let browser set boundary.
            // So let's handle upload manually or modify fetchWithAuth utils.
            const token = localStorage.getItem('admin_token');
            const res = await fetch('http://localhost:8000/admin/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                setProfile({ ...profile, avatar_url: data.url });
            }
        } catch (err) {
            console.error('Upload failed', err);
        }
    };

    if (loading) return <div>Loading profile...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information and avatar.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        {profile?.avatar_url && (
                            <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
                        )}
                        <div>
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input id="avatar" type="file" onChange={handleFileChange} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            value={profile?.full_name || ''}
                            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={profile?.bio || ''}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="mood">Current Mood</Label>
                        <Input
                            id="mood"
                            value={profile?.current_mood || ''}
                            onChange={(e) => setProfile({ ...profile, current_mood: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="hire"
                            checked={profile?.is_available_for_hire || false}
                            onChange={(e) => setProfile({ ...profile, is_available_for_hire: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label htmlFor="hire">Available for Hire</Label>
                    </div>

                    <Button type="submit" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    {message && <p className="text-sm text-muted-foreground">{message}</p>}
                </form>
            </CardContent>
        </Card>
    );
}
