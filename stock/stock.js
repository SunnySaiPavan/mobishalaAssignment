const express = require("express");
const axios = require("axios");
const db = require("../db/db");
const router = express.Router();

// DhanHQ API configurations
const DHAN_API_URL = "https://api.dhan.co";
const DHAN_HEADERS = {
  Authorization: `Bearer ${process.env.DHAN_API_KEY}`,
};

// Fetch stock price
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`${DHAN_API_URL}/stocks/${symbol}/price`, {
      headers: DHAN_HEADERS,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Place a trade (buy/sell)
router.post("/trade", async (req, res) => {
  const { symbol, type, quantity } = req.body;
  try {
    const response = await axios.post(
      `${DHAN_API_URL}/trades`,
      { symbol, type, quantity },
      { headers: DHAN_HEADERS }
    );
    const trade = response.data;
    const query = `
      INSERT INTO trades (symbol, type, quantity, price) 
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [symbol, type, quantity, trade.price], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Trade executed", tradeId: this.lastID, trade });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch trade history
router.get("/trade-history", (req, res) => {
  const query = "SELECT * FROM trades";
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
