# PERN User Management System

A full-stack web application built with **PostgreSQL**, **Express**, **React**, and **Node.js** for managing user accounts with authentication features.

## 🚀 Features

- ✅ User Registration with email, password, and profile info
- ✅ Secure User Login with JWT authentication
- ✅ Protected routes for authenticated users only
- ✅ Profile management (view and update user info)
- ✅ Password hashing with bcrypt
- ✅ Responsive UI with Bootstrap
- ✅ Input validation and error handling
- ✅ Token-based authentication system

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **helmet** - Security middleware
- **cors** - Cross-origin resource sharing

### Database
- **PostgreSQL** - Primary database
- **pg** - PostgreSQL client for Node.js

## 📁 Project Structure

```
pern-user-management/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── .env              # Environment variables
│   ├── server.js         # Main server file
│   └── package.json
└── package.json          # Root package.json
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd pern-user-management
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
npm run install-server

# Install client dependencies
npm run install-client
```

### 3. Database Setup
1. Create a PostgreSQL database:
```sql
CREATE DATABASE pern_user_management;
```

2. Update the environment variables in `server/.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pern_user_management
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Start the application

#### Development Mode (Both frontend and backend)
```bash
npm run dev
```

#### Start individually
```bash
# Start backend server (from root directory)
npm run server

# Start frontend client (from root directory)
npm run client
```

### 5. Access the application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🔑 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User Routes (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Health Check
- `GET /api/health` - Server health status

## 📝 API Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware validation for sensitive endpoints
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Helmet Integration**: Security headers for production

## 🚦 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start backend server only
- `npm run client` - Start frontend client only
- `npm run install-all` - Install all dependencies
- `npm run build` - Build client for production

### Server Scripts
- `npm start` - Start server in production mode
- `npm run dev` - Start server with nodemon (development)

### Client Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🎨 UI Pages

1. **Home Page** - Landing page with app overview
2. **Register Page** - User registration form
3. **Login Page** - User login form
4. **Profile Page** - View and edit user profile (protected)

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **JWT Token Issues**
   - Check if JWT_SECRET is set in `.env`
   - Verify token format in Authorization header

3. **CORS Issues**
   - Ensure proxy is set in client package.json
   - Check CORS configuration in server

4. **Port Conflicts**
   - Change PORT in server/.env if 5000 is occupied
   - Update proxy in client/package.json accordingly

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For support and questions, please open an issue in the repository.