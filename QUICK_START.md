# 🚀 Ecommerce App - Quick Start Guide

## Current Status ✅

- **Frontend**: http://localhost:5173 (Vite + React)
- **Backend**: http://localhost:5000 (Express.js)
- **Database**: Optional (MongoDB - can add later)

## 🎯 What Works Right Now (Without MongoDB)

✅ **Frontend Features:**
- Home page with products
- Login/Register forms
- Navigation between pages
- Beautiful UI with Vite React

✅ **Backend Features:**
- Express REST API
- Authentication routes ready
- Product routes ready
- CORS enabled
- Gracefully handles missing MongoDB

## 📋 How to Run

### Option 1: Run Both (Frontend + Backend)

**Terminal 1 - Frontend:**
```powershell
$env:Path += ";C:\Program Files\nodejs"
cd C:\Users\Pc\Desktop\ecommerce-app\frontend
npm run dev
```
→ Opens at http://localhost:5173

**Terminal 2 - Backend:**
```powershell
$env:Path += ";C:\Program Files\nodejs"
cd C:\Users\Pc\Desktop\ecommerce-app
npm run dev
```
→ Runs at http://localhost:5000

### Option 2: Run Just Frontend
```powershell
$env:Path += ";C:\Program Files\nodejs"
cd C:\Users\Pc\Desktop\ecommerce-app\frontend
npm run dev
```

### Option 3: Run Just Backend
```powershell
$env:Path += ";C:\Program Files\nodejs"
cd C:\Users\Pc\Desktop\ecommerce-app
npm run dev
```

## 🗄️ MongoDB Setup (Optional - For Later)

To connect a database:

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. MongoDB will auto-connect

### MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

## 📂 Project Structure

```
ecommerce-app/
├── frontend/          # Vite + React (port 5173)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── src/               # Express backend (port 5000)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .env               # Configuration
└── package.json
```

## 🔌 API Endpoints Ready to Use

```
POST   /api/auth/register    - Register user
POST   /api/auth/login       - Login user
GET    /api/products         - Get all products
GET    /api/products/:id     - Get single product
POST   /api/products         - Create product (needs JWT)
PUT    /api/products/:id     - Update product (needs JWT)
DELETE /api/products/:id     - Delete product (needs JWT)
GET    /api/health           - Check server status
```

## 💡 Current Behavior

✅ Backend is running fine without MongoDB
✅ Frontend connects to backend when both are running
✅ All routes are ready to use
⚠️ Database features will work only when MongoDB is connected

## ⚡ Next Steps

1. **Test the app** - Both frontend and backend are running
2. **Add MongoDB** (optional) - When you need to save data
3. **Connect frontend to API** - Already partially set up
4. **Test authentication** - Register/login endpoints work
5. **Build features** - Add cart, orders, payments, etc.

## 🧪 Test Backend Quickly

Open new PowerShell and test:
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing
```

Should show: `{"message":"Server is running"}`

## 📝 Configuration

Edit `.env` to change:
- `PORT` - Backend port (default 5000)
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - Secret key for tokens
- `NODE_ENV` - development/production

## ✨ Everything is Ready!

Your app is set up and running. MongoDB warning is just informational — the server works fine without it.

**Start both and enjoy! 🎉**
