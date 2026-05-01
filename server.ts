import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";

const db = new Database("yoycol.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    thumbnail TEXT,
    template_width INTEGER,
    template_height INTEGER,
    base_price REAL
  );

  CREATE TABLE IF NOT EXISTS designs (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed some sample Yoycol products if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insert = db.prepare("INSERT INTO products (id, name, category, thumbnail, template_width, template_height, base_price) VALUES (?, ?, ?, ?, ?, ?, ?)");
  const samples = [
    ["t-shirt-01", "AOP Men's T-Shirt", "Tops", "https://picsum.photos/seed/tshirt/200/200", 2000, 2000, 15.99],
    ["hoodie-01", "AOP Unisex Hoodie", "Outerwear", "https://picsum.photos/seed/hoodie/200/200", 2500, 3000, 28.50],
    ["leggings-01", "AOP Women's Leggings", "Bottoms", "https://picsum.photos/seed/leggings/200/200", 1800, 2800, 19.99],
    ["tote-01", "AOP Canvas Tote Bag", "Accessories", "https://picsum.photos/seed/tote/200/200", 1500, 1500, 12.00],
    ["socks-01", "AOP Crew Socks", "Accessories", "https://picsum.photos/seed/socks/200/200", 800, 1200, 8.50],
  ];
  samples.forEach(s => insert.run(...s));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.get("/api/designs", (req, res) => {
    const designs = db.prepare("SELECT * FROM designs ORDER BY created_at DESC").all();
    res.json(designs);
  });

  app.post("/api/designs", (req, res) => {
    const { id, name, data } = req.body;
    db.prepare("INSERT OR REPLACE INTO designs (id, name, data) VALUES (?, ?, ?)").run(id, name, JSON.stringify(data));
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
