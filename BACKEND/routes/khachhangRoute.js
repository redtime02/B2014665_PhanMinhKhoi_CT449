const express = require("express");
const router = express.Router();
const khachHangController = require("../controllers/khachhangController");
const authMiddleware = require("../middlewares/authMiddleware");

// Tạo khách hàng mới
router.post("/", khachHangController.register);

// Lấy thông tin khách hàng
router.get("/:id", khachHangController.getKhachHangById);

// Cập nhật thông tin khách hàng
router.put("/:id", khachHangController.updateKhachHang);

// Xóa khách hàng
router.delete("/:id", khachHangController.deleteKhachHang);

// Route đăng nhập
router.post("/login", khachHangController.login);

// Lấy danh sách khách hàng
router.get("/", khachHangController.getKhachHangList);

// Route đặt hàng từ khách hàng
router.post("/order", authMiddleware, khachHangController.datHang);

router.get("/donhang", authMiddleware, khachHangController.getXemDonHang);

module.exports = router;
