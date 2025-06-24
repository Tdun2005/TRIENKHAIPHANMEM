const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["moi", "dang su dung", "hu hong"],
    default: "moi"
  },
  location: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Device", DeviceSchema);
