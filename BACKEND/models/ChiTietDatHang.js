const mongoose = require("mongoose");

const chiTietDatHangSchema = new mongoose.Schema({
  SoDonDH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DatHang",
    required: true,
  },
  MSHH: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HangHoa",
    required: true,
  },
  SoLuong: {
    type: Number,
    required: true,
  },
  GiaDatHang: {
    type: Number,
    required: true,
  },
  GiamGia: {
    type: Number,
    default: 0,
  },
});

const ChiTietDatHang = mongoose.model("ChiTietDatHang", chiTietDatHangSchema);

module.exports = ChiTietDatHang;
