# ⚡ NexaStore — Modern Full-Featured E-Commerce Web App

[![Live Website](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?style=for-the-badge&logo=github)](https://amandadhich01.github.io/E-commerce-app/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A high-performance, modern, responsive e-commerce web application featuring a rich product catalog, real-time search, dynamic category filtering, interactive shopping cart with coupon discounts, wishlist drawer, seamless checkout simulation, and persistent state management.

🌐 **Live Website Link:**  
👉 **[https://amandadhich01.github.io/E-commerce-app/](https://amandadhich01.github.io/E-commerce-app/)**

---

## 🌟 Key Features

### 🛍️ Client-Side E-Commerce Experience
- **Interactive Product Catalog**: Showcasing electronics, audio equipment, smartphones, cameras, wearables, and apparel with high-resolution imagery and fallback safeguards.
- **Instant Search & Filter Bar**: Real-time keyword search, category pills, price and rating sorting without page reload.
- **Product Quick View Modal**: Inspect high-res product photos, specifications, key highlights, and in-stock counts.
- **Slide-Over Shopping Cart Drawer**:
  - Live quantity modification (+ / - / remove)
  - Promo code verification (`WELCOME10` for 10% off, `SAVE20` for 20% off, `FREESHIP` for free shipping)
  - Automatic calculation of subtotal, discounts, shipping, taxes, and grand total.
- **Wishlist Drawer**: Save favorite products with instant "Move to Cart" actions.
- **Multi-Step Checkout Flow**:
  - Shipping address and customer info input
  - Multiple payment methods (Card, UPI / QR, Cash on Delivery)
  - Animated Order Confirmation receipt with generated Order ID and delivery tracking.
- **Authentication & User Profile**:
  - Mock login & registration with persistent `localStorage` session
  - Order history log tracking all completed purchases
  - Pre-filled demo credentials for one-click testing.
- **Modern UI & Themes**:
  - Responsive design optimized for mobile, tablet, and desktop
  - Dark & Light mode toggle with user preference persistence
  - Floating toast notifications for real-time user feedback.

---

## 📁 Repository Structure

```
E-commerce-app/
├── index.html                   # Main production frontend (Served by GitHub Pages)
├── css/
│   └── style.css                # Modern responsive UI styling & theme variables
├── js/
│   ├── products.js              # Curated product catalog dataset & SVG fallbacks
│   └── app.js                   # State management, cart, wishlist, checkout & auth
├── backend/                     # Node.js + Express REST API
│   ├── package.json             # Backend dependencies (Express, Mongoose, JWT, etc.)
│   ├── .env.example             # Environment variables template
│   └── src/
│       ├── server.js            # Express server entry point
│       ├── config/database.js   # MongoDB connection setup
│       ├── controllers/         # Auth & Product controllers
│       ├── models/              # User & Product schemas
│       ├── middleware/          # JWT authentication middleware
│       └── routes/              # Express API route endpoints
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── .gitattributes               # GitHub Linguist language statistics override
└── README.md                    # Project documentation
```

---

## 🚀 Running the Project

### 1. View the Live Site
Simply visit: **[https://amandadhich01.github.io/E-commerce-app/](https://amandadhich01.github.io/E-commerce-app/)**

### 2. Run Locally in Your Browser
You can open `index.html` directly in any web browser, or serve it using any local static server:
```bash
# Using Python
python -m http.server 3000

# Or using Node npx
npx serve .
```
Navigate to `http://localhost:3000`.

### 3. Run the Backend REST API (Optional)
```bash
cd backend
npm install
npm run dev
```
The Express API will be running on `http://localhost:5000`.

---

## 🎟️ Demo Promo Codes

Test the discount engine in the cart drawer using these coupon codes:
- **`WELCOME10`** — 10% Discount on total order
- **`SAVE20`** — 20% Discount on total order
- **`FREESHIP`** — Zero shipping cost

---

## 👨‍💻 Author

**Aman Dadhich**  
- GitHub: [@Amandadhich01](https://github.com/Amandadhich01)  
- Email: dadhichaman548@gmail.com
