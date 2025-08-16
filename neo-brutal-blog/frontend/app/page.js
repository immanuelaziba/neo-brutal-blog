'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

REACT_APP_API_BASE_URL=https://neo-brutal-blog-production.up.railway.app

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`)
      const data = await response.json()
      
      if (data.success) {
        setPosts(data.data)
      } else {
        setError('Failed to fetch posts')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id))
      } else {
        setError('Failed to delete post')
      }
    } catch (err) {
      setError('Failed to delete post')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">LOADING POSTS...</div>
      </div>
    )
  }

  return (
    <div className="container">
      {error && (
        <div className="error">
          ERROR: {error}
        </div>
      )}

      <div className="flex justify-between align-center mb-3">
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: 'var(--secondary)',
          textShadow: '2px 2px 0px var(--accent)'
        }}>
          ALL POSTS
        </h1>
        <Link href="/create" className="btn btn-primary">
          NEW POST
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="card text-center">
          <h2 className="card-title">NO POSTS YET</h2>
          <p className="card-content">Be the first to create a post!</p>
          <div className="mt-2">
            <Link href="/create" className="btn btn-accent">
              CREATE FIRST POST
            </Link>
          </div>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card">
            <h2 className="card-title">{post.title}</h2>
            <div className="card-meta">
              By {post.author} • {formatDate(post.createdAt)}
              {post.updatedAt !== post.createdAt && (
                <span> • Updated {formatDate(post.updatedAt)}</span>
              )}
            </div>
            <div className="card-content">
              {post.content.length > 200 
                ? `${post.content.substring(0, 200)}...` 
                : post.content
              }
            </div>
            <div className="flex gap-2 mt-2">
              <Link href={`/posts/${post.id}`} className="btn btn-secondary">
                READ MORE
              </Link>
              <Link href={`/edit/${post.id}`} className="btn btn-accent">
                EDIT
              </Link>
              <button 
                onClick={() => handleDelete(post.id)} 
                className="btn btn-danger"
              >
                DELETE
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
