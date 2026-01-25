const API_URL = 'http://localhost:8000';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        if (typeof window !== 'undefined') localStorage.removeItem('admin_token');
        // window.location.href = '/admin/login'; // Optional: auto-redirect
        throw new Error('Unauthorized');
    }

    return response;
}

export async function login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/admin/token`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}
