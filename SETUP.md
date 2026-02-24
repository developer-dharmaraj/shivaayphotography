# Shivaay Photography - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Step 1: Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `backend/` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shivaayphotography
JWT_SECRET=your-secret-key-change-this-in-production
ADMIN_EMAIL=admin@lumina.com
ADMIN_PASSWORD=admin
```

**For MongoDB Atlas (Cloud):**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Replace `MONGODB_URI` with your Atlas connection string

4. Create uploads directories:
```bash
mkdir -p uploads/images
mkdir -p uploads/videos
```

5. Initialize admin user (run once):
```bash
# After starting server, run:
curl -X POST http://localhost:5000/api/auth/init
```

6. Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 2: Frontend Setup

1. Navigate to root folder (shivaayphotography):
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (if not exists):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000` (or port shown in terminal)

## 📋 Admin Dashboard Features

### Access Admin Dashboard
1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - Email: `admin@lumina.com`
   - Password: `admin`

### Available Management Sections:

1. **Dashboard** - Overview statistics
2. **Portfolio** - Manage gallery photos
   - Add/Edit/Delete photos
   - Set featured status
   - Categorize (Wedding, Pre-Wedding, Events, Commercial, Portrait)
3. **Banners** - Manage hero banners
   - Upload images/videos for homepage
   - Set active/inactive status
4. **Videos** - Manage video reels
   - Upload videos with thumbnails
   - Categorize videos
5. **Journal** - Manage blog posts
   - Create/Edit/Delete blog posts
   - Publish/Draft status
   - Rich content editor
6. **Inquiries** - View contact form submissions
   - Update inquiry status
   - Track customer inquiries

## 🎨 Frontend Pages

All pages now fetch data from API:

- **Home** (`/`) - Displays banners and featured gallery items
- **Portfolio** (`/portfolio`) - Gallery with category filters
- **Reels** (`/reels`) - Video reels page
- **Blog** (`/blog`) - Blog listing
- **Blog Post** (`/blog/:slug`) - Individual blog post
- **Contact** (`/contact`) - Contact form (saves to database)
- **About** (`/about`) - About page
- **Pricing** (`/pricing`) - Pricing page

## 📁 Project Structure

```
shivaayphotography/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & upload middleware
│   ├── uploads/         # Uploaded files
│   └── server.js        # Main server file
├── components/          # React components
├── pages/              # Page components
├── utils/              # API utilities
└── types.ts            # TypeScript types
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/gallery` - Get all gallery items
- `GET /api/banners` - Get active banners
- `GET /api/videos` - Get active videos
- `GET /api/blogs` - Get published blogs
- `GET /api/blogs/slug/:slug` - Get blog by slug
- `POST /api/inquiries` - Submit inquiry

### Protected Endpoints (Require Auth Token)
- All `POST`, `PUT`, `DELETE` operations
- `GET /api/banners/admin/all` - Get all banners
- `GET /api/videos/admin/all` - Get all videos
- `GET /api/blogs/admin/all` - Get all blogs
- `GET /api/inquiries` - Get all inquiries

## 🛠️ Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**
   - Make sure MongoDB is running
   - Check `MONGODB_URI` in `.env`
   - For local MongoDB: `mongodb://localhost:27017/shivaayphotography`

2. **Port Already in Use**
   - Change `PORT` in `.env` file
   - Or kill process using port 5000

3. **File Upload Not Working**
   - Check `uploads/` directory exists
   - Ensure write permissions

### Frontend Issues

1. **API Calls Failing**
   - Make sure backend is running on port 5000
   - Check `VITE_API_URL` in `.env.local`
   - Check browser console for CORS errors

2. **Images Not Loading**
   - Check if backend is serving static files
   - Verify image URLs in database
   - Check browser network tab

## 📝 Notes

- All file uploads are stored in `backend/uploads/`
- Images accessible at: `http://localhost:5000/uploads/images/filename.jpg`
- Videos accessible at: `http://localhost:5000/uploads/videos/filename.mp4`
- Admin token stored in localStorage
- Token expires after 7 days

## 🚀 Production Deployment

1. Set strong `JWT_SECRET` in production
2. Use MongoDB Atlas or production database
3. Configure CORS for production domain
4. Set up file storage (AWS S3, Cloudinary, etc.)
5. Use environment variables for all secrets
6. Enable HTTPS
7. Set up proper error logging

## 📞 Support

For issues or questions, check:
- Backend logs in terminal
- Browser console for frontend errors
- Network tab for API call issues
