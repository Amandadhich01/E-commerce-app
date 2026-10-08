/**
 * Products Dataset for E-Commerce Store
 * High quality curated electronics, gadgets, and lifestyle items
 */
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "MacBook Pro 16\" M3 Max",
    category: "electronics",
    categoryLabel: "Laptops",
    price: 2499.99,
    originalPrice: 2899.99,
    rating: 4.9,
    reviewsCount: 328,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "BESTSELLER",
    badgeType: "hot",
    stock: 7,
    description: "Supercharged by M3 Max with up to 16-core CPU and 40-core GPU. Liquid Retina XDR display with extreme dynamic range.",
    specs: ["16.2-inch Liquid Retina XDR", "Apple M3 Max Chip", "36GB Unified Memory", "1TB Superfast SSD", "Up to 22h Battery Life"]
  },
  {
    id: 2,
    name: "Sony WH-1000XM5 Wireless",
    category: "audio",
    categoryLabel: "Audio",
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewsCount: 512,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    badge: "15% OFF",
    badgeType: "sale",
    stock: 18,
    description: "Industry-leading noise cancellation with two processors and 8 microphones for unparalleled clarity and Hi-Res audio.",
    specs: ["Industry-leading ANC", "30-Hour Battery Life", "Speak-to-Chat Technology", "Multipoint Connection", "Crystal Clear Hands-free Call"]
  },
  {
    id: 3,
    name: "iPhone 16 Pro Max 256GB",
    category: "electronics",
    categoryLabel: "Smartphones",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.9,
    reviewsCount: 640,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    badge: "NEW ARRIVAL",
    badgeType: "new",
    stock: 12,
    description: "Titanium design with larger 6.9-inch display, Camera Control, 4K 120 fps Dolby Vision, and groundbreaking A18 Pro chip.",
    specs: ["6.9\" Super Retina XDR", "Grade 5 Titanium Body", "A18 Pro Bionic Chip", "48MP Fusion Camera System", "Camera Control Button"]
  },
  {
    id: 4,
    name: "Apple Watch Ultra 2 GPS + Cellular",
    category: "wearables",
    categoryLabel: "Wearables",
    price: 749.99,
    originalPrice: 799.99,
    rating: 4.9,
    reviewsCount: 189,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    badge: "TRENDING",
    badgeType: "trending",
    stock: 9,
    description: "The most rugged and capable Apple Watch. Aerospace titanium case, precision dual-frequency GPS, and up to 36 hours of battery.",
    specs: ["49mm Aerospace Titanium Case", "3000 nits Brightness Display", "100m Water Resistance", "Action Button Customization", "Precision Dual GPS"]
  },
  {
    id: 5,
    name: "Sony Alpha A7 IV Mirrorless Camera",
    category: "cameras",
    categoryLabel: "Cameras",
    price: 2199.99,
    originalPrice: 2499.99,
    rating: 4.9,
    reviewsCount: 97,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    badge: "PRO PICK",
    badgeType: "hot",
    stock: 4,
    description: "Full-frame 33MP Exmor R CMOS sensor with BIONZ XR image processor. 4K 60p 10-bit recording and real-time Eye AF.",
    specs: ["33MP Full-Frame Sensor", "4K 60p 10-bit 4:2:2", "759 Phase-Detect AF Points", "5-axis In-body Stabilization", "Dual SD / CFexpress Type A"]
  },
  {
    id: 6,
    name: "iPad Pro 13\" M4 OLED",
    category: "electronics",
    categoryLabel: "Tablets",
    price: 1299.99,
    originalPrice: 1399.99,
    rating: 4.8,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    badge: "SLIMMEST",
    badgeType: "new",
    stock: 14,
    description: "Outrageously thin design featuring revolutionary Ultra Retina XDR tandem OLED display and the breakthrough M4 chip.",
    specs: ["13-inch Ultra Retina XDR OLED", "Next-gen Apple M4 Chip", "5.1mm Ultra-thin profile", "Pencil Pro & Magic Keyboard support", "Face ID & Thunderbolt/USB-4"]
  },
  {
    id: 7,
    name: "Bose QuietComfort Ultra Earbuds",
    category: "audio",
    categoryLabel: "Audio",
    price: 279.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviewsCount: 384,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    badge: "POPULAR",
    badgeType: "trending",
    stock: 22,
    description: "Groundbreaking spatial audio for immersive listening. CustomTune technology personalizes sound to your ear anatomy.",
    specs: ["Bose Immersive Audio", "CustomTune Sound Calibration", "World-class Noise Cancellation", "Up to 24h with Charging Case", "IPX4 Sweat Resistant"]
  },
  {
    id: 8,
    name: "Dell XPS 15 OLED InfinityEdge",
    category: "electronics",
    categoryLabel: "Laptops",
    price: 1899.99,
    originalPrice: 2199.99,
    rating: 4.7,
    reviewsCount: 164,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    badge: "SAVE $300",
    badgeType: "sale",
    stock: 6,
    description: "Precision-crafted aluminum and carbon fiber with stunning 3.5K OLED touchscreen display and NVIDIA GeForce RTX 4060 graphics.",
    specs: ["Intel Core i9 14-Core CPU", "NVIDIA RTX 4060 8GB GPU", "3.5K OLED Touch 400 nits", "32GB DDR5 RAM", "1TB PCIe NVMe SSD"]
  },
  {
    id: 9,
    name: "Samsung Galaxy S24 Ultra AI",
    category: "electronics",
    categoryLabel: "Smartphones",
    price: 1149.99,
    originalPrice: 1299.99,
    rating: 4.8,
    reviewsCount: 476,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    badge: "GALAXY AI",
    badgeType: "hot",
    stock: 11,
    description: "Unleash new levels of creativity and productivity with Galaxy AI, Titanium exterior, integrated S Pen, and 200MP camera.",
    specs: ["6.8\" Dynamic AMOLED 2X 120Hz", "Built-in S Pen Stylus", "200MP Quad Camera Zoom", "Snapdragon 8 Gen 3 for Galaxy", "5000 mAh All-day Battery"]
  },
  {
    id: 10,
    name: "Fujifilm X100VI Compact Digital",
    category: "cameras",
    categoryLabel: "Cameras",
    price: 1599.99,
    originalPrice: 1699.99,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
    badge: "LIMITED",
    badgeType: "hot",
    stock: 3,
    description: "Classic dial-based styling with cutting-edge 40.2MP X-Trans CMOS 5 HR sensor and 6.0 stops of in-body image stabilization.",
    specs: ["40.2MP X-Trans CMOS 5 HR", "Fixed 23mm F2.0 Prime Lens", "Hybrid Optical/Electronic Viewfinder", "6.0-stop 5-axis In-body IS", "20 Film Simulation Modes"]
  },
  {
    id: 11,
    name: "Urban Minimalist Waterproof Backpack",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewsCount: 285,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    badge: "POPULAR",
    badgeType: "sale",
    stock: 25,
    description: "Weatherproof sleek backpack designed for tech commuters. Fits up to 16\" laptops with hidden anti-theft compartments.",
    specs: ["Waterproof Ballistic Nylon", "Dedicated Padded 16\" Laptop Sleeve", "Ergonomic Breathable Back Panel", "YKK Water-resistant Zippers", "Luggage Pass-through Strap"]
  },
  {
    id: 12,
    name: "Nike Air Max Pulse Lifestyle Sneakers",
    category: "fashion",
    categoryLabel: "Fashion",
    price: 139.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    badge: "TRENDING",
    badgeType: "trending",
    stock: 15,
    description: "Point-loaded Air cushioning system delivers a plush bounce with every stride. Textile and synthetic upper with sleek urban profile.",
    specs: ["Point-loaded Max Air Cushioning", "Breathable Mesh & Leather Upper", "Foam Midsole Comfort", "Durable Waffle Rubber Outsole", "Iconic Swoosh Branding"]
  }
];

// Fallback SVG generator for missing/broken images
function getProductFallbackSvg(title, category) {
  const colors = {
    electronics: '#3b82f6',
    audio: '#8b5cf6',
    wearables: '#10b981',
    cameras: '#f59e0b',
    accessories: '#ec4899',
    fashion: '#ef4444'
  };
  const color = colors[category] || '#6366f1';
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
    <rect width="100%" height="100%" fill="#1e293b"/>
    <circle cx="300" cy="210" r="90" fill="${color}" opacity="0.2"/>
    <circle cx="300" cy="210" r="60" fill="${color}" opacity="0.6"/>
    <text x="300" y="215" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="%23ffffff" text-anchor="middle">🛍️</text>
    <text x="300" y="320" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="%23f8fafc" text-anchor="middle">${encodeURIComponent(title)}</text>
  </svg>`;
}
