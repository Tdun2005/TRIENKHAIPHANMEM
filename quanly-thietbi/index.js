const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); // Đọc biến môi trường từ .env

const app = express();
connectDB(); // Kết nối MongoDB

app.use(cors());
app.use(express.json()); // Parse JSON request

// Khai báo các route (chưa có nhưng để sẵn)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/devices", require("./routes/deviceRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
