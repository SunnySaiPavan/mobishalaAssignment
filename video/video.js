const express = require("express");
const axios = require("axios");
const router = express.Router();

// 100ms API configurations
const HMS_API_URL = "https://api.100ms.live/v2";
const HMS_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.HMS_API_KEY}`,
};

// Create a new video room
router.post("/create-room", async (req, res) => {
  const { roomName } = req.body;
  try {
    const response = await axios.post(
      `${HMS_API_URL}/rooms`,
      { name: roomName },
      { headers: HMS_HEADERS }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate a token for participants
router.post("/generate-token", async (req, res) => {
  const { roomId, userId, role } = req.body;
  try {
    const response = await axios.post(
      `${HMS_API_URL}/auth/token`,
      { room_id: roomId, user_id: userId, role },
      { headers: HMS_HEADERS }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List active rooms
router.get("/active-rooms", async (req, res) => {
  try {
    const response = await axios.get(`${HMS_API_URL}/rooms`, { headers: HMS_HEADERS });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
