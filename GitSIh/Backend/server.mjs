import express from "express";
import cors from "cors";
import { createRequire } from "module";
import admin from "firebase-admin";
import { createServer } from "http";
import { Server } from "socket.io";

const require = createRequire(import.meta.url);
const serviceAccount = require("./serviceAccountKey.json");

// Firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-esp32-cbe7f-default-rtdb.firebaseio.com",
});

const db = admin.database();
const app = express();
app.use(cors({ origin: "*" })); // allow all devices on network
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] }, // allow WebSocket connections
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend running on LAN. Use /api/readings and /api/control");
});

// GET ESP32 readings
app.get("/api/readings", async (req, res) => {
  try {
    const snapshot = await db.ref("ESP32").once("value");
    res.json(snapshot.val());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/control
app.post("/api/control", async (req, res) => {
  const { device, state } = req.body;
  if (!device || !state)
    return res.status(400).json({ error: "Device and state required" });

  try {
    await db.ref(`ESP32/commands/${device}`).set(state);
    res.json({ success: true, device, state });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Socket.io – real-time updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  const refESP = db.ref("ESP32");
  refESP.on("value", (snapshot) => {
    socket.emit("sensorData", snapshot.val());
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Listen on all network interfaces
const PORT = 5000;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running at http://<YOUR_PC_IP>:${PORT}`);
});
