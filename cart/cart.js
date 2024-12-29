const express = require("express");
const db = require("../db/db");
const router = express.Router();

// Add item to cart
router.post("/", (req, res) => {
  const { userId, productId, quantity, price } = req.body;
  const query = `
    INSERT INTO carts (userId, productId, quantity, price) 
    VALUES (?, ?, ?, ?)
  `;
  db.run(query, [userId, productId, quantity, price], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Item added to cart", cartId: this.lastID });
  });
});

// Fetch cart items
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const query = "SELECT * FROM carts WHERE userId = ?";
  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
