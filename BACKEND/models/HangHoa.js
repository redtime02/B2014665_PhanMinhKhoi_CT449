const mongoose = require("mongoose");

const hangHoaSchema = new mongoose.Schema({
  MSHH: {
    type: String,
    unique: true,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  TenHH: { type: String, required: true },
  MoTaHH: { type: String, required: true },
  Gia: { type: Number, required: true },
  SoLuongHang: { type: Number, required: true },
  GhiChu: { type: String, required: true },
});

const HangHoa = mongoose.model("HangHoa", hangHoaSchema);

module.exports = HangHoa;
