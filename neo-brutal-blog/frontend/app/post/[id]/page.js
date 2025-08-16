'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
        setPost(data.data);
      } else {
        setError(data.message || 'Post not found');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`, {  // <-- FIXED
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">LOADING POST...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">ERROR: {error}</div>
        <div className="text-center mt-2">
          <Link href="/" className="btn btn-primary">BACK TO POSTS</Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="card text-center">
          <h2 className="card-title">POST NOT FOUND</h2>
          <p className="card-content">The post you're looking for doesn't exist.</p>
          <div className="mt-2">
            <Link href="/" className="btn btn-primary">BACK TO POSTS</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex justify-between align-center mb-3">
        <Link href="/" className="btn btn-secondary">← ALL POSTS</Link>
        <div className="flex gap-2">
          <Link href={`/edit/${post.id}`} className="btn btn-accent">EDIT POST</Link>
          <button onClick={handleDelete} className="btn btn-danger">DELETE POST</button>
        </div>
      </div>

      <article className="card">
        <h1 className="card-title" style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
          {post.title}
        </h1>

        <div className="card-meta" style={{ marginBottom: '24px', fontSize: '1rem' }}>
          <strong>By {post.author}</strong>
          <br />
          Created: {formatDate(post.createdAt)}
          {post.updatedAt !== post.createdAt && (
            <>
              <br />Updated: {formatDate(post.updatedAt)}
            </>
          )}
        </div>

        <div className="card-content" style={{ fontSize: '1.2rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </div>
      </article>

      <div className="flex justify-between align-center mt-2">
        <Link href="/" className="btn btn-primary">← BACK TO ALL POSTS</Link>
        <Link href={`/edit/${post.id}`} className="btn btn-accent">EDIT THIS POST</Link>
      </div>
    </div>
  );
}
