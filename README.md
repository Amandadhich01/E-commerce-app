# Ecommerce App

A full-featured ecommerce application built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Product Management**: CRUD operations for products
- **User Authentication**: Secure password hashing with bcryptjs
- **Authorization**: Protected routes with JWT middleware
- **Database**: MongoDB integration with Mongoose ODM

## Project Structure

```
ecommerce-app/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── productController.js # Product logic
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Product.js           # Product schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── productRoutes.js     # Product endpoints
│   └── server.js                # Main server file
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
└── package.json                 # Dependencies
```

## Installation

1. **Clone or navigate to the project**:
   ```bash
   cd ecommerce-app
   ```

2. **Create `.env` file** (copy from `.env.example`):
   ```bash
   copy .env.example .env
   ```

3. **Update `.env` with your settings**:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Install dependencies** (already done):
   ```bash
   npm install
   ```

## Running the Application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Health Check
- `GET /api/health` - Check server status

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm

## Environment Variables

Create a `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **axios**: HTTP client
- **nodemon**: Development auto-reload

## Next Steps

1. Set up MongoDB locally or use MongoDB Atlas
2. Update `.env` with your MongoDB connection string
3. Run `npm run dev` to start development server
4. Test endpoints using Postman or similar tool
5. Consider adding:
   - Order management
   - Shopping cart
   - Payment integration
   - Admin panel
   - Email notifications

## License

ISC

## Author

Your Name
