const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Đã kết nối MongoDB thành công");
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1); // Dừng server nếu lỗi
  }
};

module.exports = connectDB;
