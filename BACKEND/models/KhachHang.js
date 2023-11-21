const mongoose = require("mongoose");

const khachHangSchema = new mongoose.Schema({
  MSKH: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  HoTenKH: { type: String, required: true },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: { type: String, required: true },
  DiaChi: { type: String, required: true },
  SoDienThoai: { type: String, required: true },
});

const KhachHang = mongoose.model("KhachHang", khachHangSchema);

module.exports = KhachHang;
