const mongoose = require("mongoose");

const hinhHangHoaSchema = new mongoose.Schema({
  MaHinh: {
    type: String,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  TenHinh: { type: String, required: true },
  MSHH: { type: String, ref: "HangHoa" },
});

const HinhHangHoa = mongoose.model("HinhHangHoa", hinhHangHoaSchema);

module.exports = HinhHangHoa;
