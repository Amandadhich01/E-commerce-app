# E-Commerce App

A full-stack e-commerce web application with a responsive product catalog, cart, wishlist, and simulated checkout flow. The frontend is hosted live on GitHub Pages, and the project includes a Node.js/Express backend API.

### Live Demo
View the live website:  
**https://amandadhich01.github.io/E-commerce-app/**

---

## Features

### Frontend (Web Store)
- **Product Catalog:** Electronics, audio gear, smartphones, cameras, and accessories with high-resolution imagery and fallback placeholders.
- **Search & Filters:** Real-time search query matching, category tabs, and sorting by price and ratings.
- **Product Quick View:** Modal preview with full product specifications, highlights, and stock counts.
- **Shopping Cart Drawer:** Slide-over cart with live quantity controls, subtotal, estimated tax and shipping, and coupon code support (`WELCOME10`, `SAVE20`).
- **Wishlist:** Save favorite items to a wishlist drawer with one-click transfer to cart.
- **Checkout Flow:** Simulated multi-step checkout with address form, payment options (Card, UPI, Cash on Delivery), and order confirmation receipts.
- **User Accounts:** Local session login and registration with order history tracking.
- **Theme Switcher:** Toggle between dark and light themes.

### Backend (REST API)
- Express.js server with MongoDB/Mongoose connection.
- User authentication routes with JWT and bcrypt.
- Product CRUD routes (`/api/products`).
- CORS configured for cross-origin client access.

---

## Project Structure

```
E-commerce-app/
├── index.html         # Main storefront frontend (deployed via GitHub Pages)
├── css/
│   └── style.css      # Responsive styles and theme variables
├── js/
│   ├── products.js    # Product dataset
│   └── app.js         # Cart, wishlist, checkout, and state management
├── backend/           # Node.js + Express REST API
│   ├── package.json   # Dependencies
│   ├── .env.example   # Environment config
│   └── src/           # Server, controllers, models, and routes
└── README.md
```

---

## How to Run

### 1. Web Version (Live)
Visit the live deployment on GitHub Pages:  
https://amandadhich01.github.io/E-commerce-app/

### 2. Run Frontend Locally
Open `index.html` directly in your browser, or start a local server:
```bash
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

### 3. Run Backend API (Optional)
```bash
cd backend
npm install
npm run dev
```
The server will run on `http://localhost:5000`.

---

## Author
**Aman Dadhich**  
- GitHub: [@Amandadhich01](https://github.com/Amandadhich01)  
- Email: dadhichaman548@gmail.com
