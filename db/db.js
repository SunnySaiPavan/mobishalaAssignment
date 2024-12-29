const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Initialize database tables
db.serialize(() => {
  // Cart table
  db.run(`
    CREATE TABLE IF NOT EXISTS carts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      productId TEXT,
      quantity INTEGER,
      price REAL
    )
  `);

  // Trades table
  db.run(`
    CREATE TABLE IF NOT EXISTS trades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symbol TEXT,
      type TEXT,
      quantity INTEGER,
      price REAL
    )
  `);
});

module.exports = db;
