// GioHang.js

const mongoose = require("mongoose");

const gioHangSchema = new mongoose.Schema({
  MSHH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HangHoa",
    required: true,
  },
  TenHH: {
    type: String,
    required: true,
  },
  GiaDatHang: {
    type: Number,
    required: true,
  },
  SoLuong: {
    type: Number,
    required: true,
  },
  GiamGia: {
    type: Number,
    default: 0,
  },
  MSKH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KhachHang",
    required: true,
  },
});

const GioHang = mongoose.model("GioHang", gioHangSchema);

module.exports = GioHang;
