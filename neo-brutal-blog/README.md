# Neo-Brutal Blog v1.0

A full-stack blog application with CRUD functionality built using Node.js, Express, and Next.js. Features a neo-brutalist design with bold typography, stark contrasts, and functional aesthetics.

## 🎨 Design Philosophy

- **Neo-Brutalist**: Bold, functional, unapologetic design
- **Color Palette**: 
  - Primary: `#a12121` (Bold Red)
  - Secondary: `#303438` (Dark Gray) 
  - Accent: `#ffd700` (Gold)
  - Extended: Various shades for better contrast and legibility

## 🚀 Features (v1.0)

- ✅ **Create** new blog posts
- ✅ **Read** all posts and individual posts  
- ✅ **Update** existing posts
- ✅ **Delete** posts with confirmation
- ✅ Responsive neo-brutalist design
- ✅ In-memory data storage (temporary)
- ✅ Form validation and error handling
- ✅ Loading states and user feedback

## 📁 Project Structure

```
blog-api-v1/
├── package.json              # Root package with scripts
├── backend/
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express API server
└── frontend/
    ├── package.json          # Frontend dependencies
    ├── next.config.js        # Next.js configuration
    ├── app/
    │   ├── layout.js         # Root layout
    │   ├── globals.css       # Neo-brutalist styles
    │   ├── page.js           # Home page (blog list)
    │   ├── create/
    │   │   └── page.js       # Create post page
    │   ├── posts/
    │   │   └── [id]/
    │   │       └── page.js   # Single post view
    │   └── edit/
    │       └── [id]/
    │           └── page.js   # Edit post page
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd blog-api-v1
   npm run install-all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend API on `http://localhost:5000`
   - Frontend on `http://localhost:3000`

### Manual Setup

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Setup backend:**
   ```bash
   cd backend
   npm install
   npm run dev  # Starts on port 5000
   ```

3. **Setup frontend (in new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev  # Starts on port 3000
   ```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both backend and frontend
- `npm run install-all` - Install all dependencies
- `npm run build` - Build frontend for production
- `npm start` - Start backend in production mode

### Backend (`/backend`)
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start in production mode

### Frontend (`/frontend`)
- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm start` - Start production build

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |
| GET | `/api/health` | Health check |

### Request/Response Format

**Create/Update Post:**
```json
{
  "title": "Post Title",
  "content": "Post content here...",
  "author": "Author Name"
}
```

**Response Format:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Post Title",
    "content": "Post content...",
    "author": "Author Name",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🎯 Usage

1. **View Posts**: Visit `http://localhost:3000` to see all posts
2. **Create Post**: Click "NEW POST" button or visit `/create`
3. **Read Post**: Click "READ MORE" on any post card
4. **Edit Post**: Click "EDIT" button on post card or single post view
5. **Delete Post**: Click "DELETE" button (with confirmation)

## ⚠️ Current Limitations (v1.0)

- **In-memory storage**: Data is lost on server restart
- **No authentication**: Anyone can create/edit/delete posts
- **No pagination**: All posts loaded at once
- **No search/filtering**: Basic list view only
- **No rich text editing**: Plain text only
- **No image uploads**: Text content only

## 🔮 Future Versions

### v1.1 Planned Features
- Database integration (MongoDB/PostgreSQL)
- Data persistence
- Better error handling

### v1.2 Planned Features
- User authentication
- Post categories/tags
- Search functionality

### v1.3 Planned Features
- Rich text editor
- Image uploads
- Comments system

## 🎨 Styling

The application uses a neo-brutalist design system with:
- **Typography**: Courier New (monospace)
- **Bold borders**: 3-4px solid black outlines
- **Drop shadows**: Offset box shadows for depth
- **High contrast**: Bold colors with clear hierarchy
- **Functional design**: Form follows function

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project as a starting point for your own blog!

---

**Built with purpose. Styled with attitude. 🖤**