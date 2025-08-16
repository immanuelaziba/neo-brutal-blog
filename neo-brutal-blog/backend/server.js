const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (temporary — replace with DB later)
let posts = [
  {
    id: '1',
    title: 'Welcome to Neo-Brutal Blog',
    content: 'This is the first post in our brutally honest blog. Clean, functional, and to the point.',
    author: 'Admin',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    title: 'Building with Purpose',
    content: 'Every line of code should serve a purpose. No fluff, no unnecessary complexity. Just pure functionality wrapped in bold design.',
    author: 'Developer',
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString()
  }
];

// ROUTES =========

// GET all posts
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    data: posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  });
});

// GET one post
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  res.json({ success: true, data: post });
});

// CREATE new post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }
  const newPost = {
    id: uuidv4(),
    title,
    content,
    author: author || 'Anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  posts.push(newPost);
  res.status(201).json({ success: true, data: newPost });
});

// UPDATE post
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const idx = posts.findIndex(p => p.id === id);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }

  posts[idx] = {
    ...posts[idx],
    title,
    content,
    author: author || posts[idx].author,
    updatedAt: new Date().toISOString()
  };
  res.json({ success: true, data: posts[idx] });
});

// DELETE post
app.delete('/api/posts/:id', (req, res) => {
  const idx = posts.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  const deleted = posts.splice(idx, 1)[0];
  res.json({ success: true, data: deleted });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Blog API v1.0 is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blog API v1.0 server running on port ${PORT}`);
});
