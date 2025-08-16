'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Read from .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Post created successfully!');
        setTimeout(() => router.push('/'), 1500);
      } else {
        setError(data.message || 'Failed to create post');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-3">
        <h1 style={{ fontSize:'2.5rem', fontWeight:'bold', color:'var(--secondary)', textShadow:'2px 2px 0px var(--accent)' }}>
          CREATE POST
        </h1>
        <Link href="/" className="btn btn-secondary">
          BACK TO POSTS
        </Link>
      </div>

      {error && <div className="error">ERROR: {error}</div>}
      {success && <div className="success">SUCCESS: {success}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">POST TITLE</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your post title..."
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">AUTHOR NAME (OPTIONAL)</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter author name..."
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">POST CONTENT</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Write your post content here..."
            disabled={loading}
            rows={10}
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'CREATING...' : 'CREATE POST'}
          </button>
          <Link href="/" className="btn btn-secondary">CANCEL</Link>
        </div>
      </form>
    </div>
  );
}
