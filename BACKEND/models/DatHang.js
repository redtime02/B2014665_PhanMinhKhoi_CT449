const mongoose = require("mongoose");

const datHangSchema = new mongoose.Schema(
  {
    SoDonDH: {
      type: String,
      unique: true,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    MSKH: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KhachHang",
      required: true,
    },
    MSNV: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhanVien",
    },
    NgayDH: {
      type: Date,
      required: true,
      default: Date.now,
    },
    NgayGH: {
      type: Date,
    },
    TrangthaiDH: {
      type: String,
    },
  },
  { timestamps: true }
);

const DatHang = mongoose.model("DatHang", datHangSchema);

module.exports = DatHang;
