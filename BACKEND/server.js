const express = require("express");
const mongoose = require("mongoose");
const khachHangRoutes = require("./routes/khachhangRoute");
const nhanVienRoutes = require("./routes/nhanvienRoute");
const hangHoaRoutes = require("./routes/hanghoaRoute");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
app.use(cookieParser());

// Kết nối cơ sở dữ liệu MongoDB
mongoose
  .connect("mongodb://localhost:27017/quanlydathang", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Đã kết nối tới cơ sở dữ liệu");
  })
  .catch((error) => {
    console.log("Lỗi kết nối cơ sở dữ liệu:", error);
  });

// Cấu hình middleware và routes
app.use(express.json());
app.use("/api/user", khachHangRoutes);
app.use("/api/admin", nhanVienRoutes);
app.use("/api/hanghoa", hangHoaRoutes);

// Khởi chạy server
app.listen(8000, () => {
  console.log("Server đang chạy trên cổng 8000");
});
