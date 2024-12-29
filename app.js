const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Import modules for tasks
const videoRoutes = require("./video/video");
const cartRoutes = require("./cart/cart");
const stockRoutes = require("./stock/stock");

const app = express();
app.use(bodyParser.json());

// Use task-specific routes
app.use("/video", videoRoutes);
app.use("/cart", cartRoutes);
app.use("/stock", stockRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
