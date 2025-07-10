# Car Admin Dashboard

A complete Next.js admin dashboard for managing car rental listings with authentication, approval workflow, and audit logging.

## 🚀 Project Overview

This is a full-stack web application built with **Next.js** that provides an internal admin dashboard for reviewing, approving, rejecting, and editing car rental listings submitted by users.

### What You'll See

**From a User Perspective:**
- **Login Page**: Clean authentication interface with username/password
- **Dashboard**: Table view of all car listings with status indicators
- **Actions**: Approve, Reject, or Edit listings with real-time updates
- **Audit Trail**: Complete history of all admin actions
- **Responsive Design**: Works on desktop, tablet, and mobile

**Key Features:**
- 🔐 **Authentication**: Secure login system (demo: admin/admin123)
- 📊 **Dashboard**: Paginated table with filtering by status
- ✅ **Approval Workflow**: Approve/Reject pending listings
- ✏️ **Edit Functionality**: Modal form to update listing details
- 📝 **Audit Logs**: Track all admin actions with timestamps
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **State Management**: React Context API

### Backend
- **API**: Next.js API Routes
- **Database**: SQLite (local file-based)
- **Authentication**: Mock system (easily replaceable)

### Development
- **Package Manager**: npm
- **Development Server**: Next.js dev server
- **Database**: SQLite (no external dependencies)

## 📋 Prerequisites

- **Node.js**: Version 18.19.0 or higher
- **npm**: Package manager
- **Git**: Version control

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd car-admin-dashboard
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Seed the Database
```bash
node scripts/seed.js
```

### 4. Access the Application
Open your browser and navigate to: **http://localhost:3000**

## 🔐 Login Credentials

**Demo Account:**
- **Username**: `admin`
- **Password**: `admin123`

## 📱 User Experience Walkthrough

### 1. **Login Page** (`/login`)
- Clean, centered login form
- Enter credentials: `admin` / `admin123`
- Automatic redirect to dashboard on success
- Error handling for invalid credentials

### 2. **Dashboard** (`/dashboard`)
- **Header**: Welcome message and navigation
- **Filter**: Dropdown to filter by status (All, Pending, Approved, Rejected)
- **Table**: Car listings with columns:
  - Car title and description
  - Price (formatted as currency)
  - Status badge (color-coded)
  - Creation date
  - Action buttons

### 3. **Listing Actions**
- **Approve**: Green button for pending listings
- **Reject**: Red button for pending listings  
- **Edit**: Blue button for all listings (opens modal)

### 4. **Edit Modal**
- Pre-filled form with current listing data
- Fields: Title, Description, Price, Status
- Save/Cancel buttons
- Real-time validation

### 5. **Audit Logs** (`/audit-logs`)
- Complete history of all admin actions
- Columns: Timestamp, Admin, Action, Listing
- Color-coded action badges
- Back to dashboard navigation

## 🗄️ Database Schema

### Listings Table
```sql
- id (Primary Key)
- title (Car title)
- description (Car description)
- price (Numeric)
- status (pending/approved/rejected)
- created_at (Timestamp)
- updated_at (Timestamp)
```

### Audit Logs Table
```sql
- id (Primary Key)
- listing_id (Foreign Key)
- action (approved/rejected/edited)
- admin (Username)
- timestamp (When action occurred)
```

## 🔧 API Endpoints

### Authentication
- `POST /api/login` - User authentication

### Listings Management
- `GET /api/listings` - Get all listings
- `POST /api/listings` - Create new listing
- `GET /api/listings/[id]` - Get single listing
- `PUT /api/listings/[id]` - Update listing
- `DELETE /api/listings/[id]` - Delete listing

### Approval Actions
- `POST /api/listings/[id]/approve` - Approve listing
- `POST /api/listings/[id]/reject` - Reject listing

### Audit & Utilities
- `GET /api/audit-logs` - Get audit trail
- `POST /api/seed` - Seed database with sample data

## 📁 Project Structure

```
car-admin-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── listings/      # Listing CRUD endpoints
│   │   │   ├── audit-logs/    # Audit trail endpoint
│   │   │   └── seed/          # Database seeding
│   │   ├── dashboard/         # Dashboard page
│   │   ├── audit-logs/        # Audit logs page
│   │   ├── login/             # Login page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ListingsTable.tsx  # Main listings table
│   │   └── EditModal.tsx      # Edit listing modal
│   └── context/               # React context
│       └── AuthContext.tsx    # Authentication state
├── scripts/
│   └── seed.js               # Database seeding script
├── car-listings.db           # SQLite database file
└── package.json
```

## 🎯 Features Implemented

### ✅ Core Requirements
- [x] Login page with authentication
- [x] Dashboard with paginated listings table
- [x] Approve/Reject/Edit actions for each listing
- [x] Edit form with pre-filled data
- [x] Next.js API routes for backend logic
- [x] Server-side rendering with getServerSideProps equivalent
- [x] Route protection (auth logic)
- [x] React state management (Context API)
- [x] TailwindCSS for clean UI

### ✅ Stretch Goals
- [x] Filtering by listing status
- [x] Audit trail/logging view
- [x] SQLite database (no cloud DB needed)
- [x] Performance optimizations (efficient re-renders)

## 🔄 Development Workflow

### Adding New Features
1. **Frontend**: Add components in `src/components/`
2. **Pages**: Create in `src/app/`
3. **API**: Add routes in `src/app/api/`
4. **Database**: Update schema in `src/app/api/db.ts`

### Database Operations
- **View Data**: Check `car-listings.db` file
- **Reset Data**: Delete `car-listings.db` and run `node scripts/seed.js`
- **Add Sample Data**: Modify `src/app/api/seed/route.ts`

## 🚀 Deployment

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
```

### Production Deployment
- **Vercel**: One-click deployment from GitHub
- **Netlify**: Connect repository for automatic deployment
- **Self-hosted**: Build and serve static files

## 🔧 Configuration

### Environment Variables
Create `.env.local` for custom configuration:
```env
DATABASE_URL=./car-listings.db
NODE_ENV=development
```

### Database Configuration
- **File**: `src/app/api/db.ts`
- **Location**: `car-listings.db` (project root)
- **Backup**: Copy `.db` file to preserve data

## 🐛 Troubleshooting

### Common Issues

**"No listings found"**
- Run `node scripts/seed.js` to populate database
- Check if `car-listings.db` file exists

**Login not working**
- Use credentials: `admin` / `admin123`
- Check browser console for errors

**API errors**
- Restart development server: `npm run dev`
- Check terminal for compilation errors

**Database issues**
- Delete `car-listings.db` and re-seed
- Check file permissions

## 📈 Performance

- **Client-side**: React optimizations, efficient re-renders
- **Server-side**: SQLite queries, minimal API calls
- **Database**: Indexed queries, prepared statements
- **UI**: Tailwind CSS, optimized bundle size

## 🔒 Security Considerations

- **Authentication**: Mock system (replace with real auth)
- **Input Validation**: Form validation on frontend and backend
- **SQL Injection**: Parameterized queries with better-sqlite3
- **XSS Protection**: React's built-in XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is for educational and assessment purposes.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
