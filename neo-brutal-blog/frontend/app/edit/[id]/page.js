'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Read from .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function EditPost({ params }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`);  // <-- FIXED
      const data = await response.json();

      if (data.success) {
        setFormData({
          title: data.data.title,
          content: data.data.content,
          author: data.data.author
        });
      } else {
        setError(data.message || 'Post not found');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

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

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`, { // <-- FIXED
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Post updated successfully!');
        setTimeout(() => {
          router.push(`/posts/${id}`);
        }, 1500);
      } else {
        setError(data.message || 'Failed to update post');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">LOADING POST...</div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="container">
        <div className="error">ERROR: {error}</div>
        <div className="text-center mt-2">
          <Link href="/" className="btn btn-primary">BACK TO POSTS</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-3">
        <h1 style={{fontSize:'2.5rem',fontWeight:'bold',color:'var(--secondary)',textShadow:'2px 2px 0px var(--accent)'}}>
          EDIT POST
        </h1>
        <div className="flex gap-2">
          <Link href={`/posts/${id}`} className="btn btn-secondary">VIEW POST</Link>
          <Link href="/" className="btn btn-secondary">ALL POSTS</Link>
        </div>
      </div>

      {error && <div className="error">ERROR: {error}</div>}
      {success && <div className="success">SUCCESS: {success}</div>}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">POST TITLE</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}
            className="form-input" placeholder="Enter your post title..." disabled={saving} />
        </div>

        <div className="form-group">
          <label htmlFor="author" className="form-label">AUTHOR NAME</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange}
            className="form-input" placeholder="Enter author name..." disabled={saving} />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">POST CONTENT</label>
          <textarea id="content" name="content" value={formData.content} onChange={handleChange}
            className="form-textarea" placeholder="Write your post content here..." disabled={saving} rows={12}/>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'SAVING...' : 'UPDATE POST'}
          </button>
          <Link href={`/posts/${id}`} className="btn btn-secondary">CANCEL</Link>
        </div>
      </form>
    </div>
  )
}
