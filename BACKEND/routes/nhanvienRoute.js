const express = require("express");
const router = express.Router();
const nhanVienController = require("../controllers/nhanvienController");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Tạo nhân viên mới
router.post("/", adminMiddleware, nhanVienController.createNhanVien);

// Lấy danh sách nhân viên
router.get("/", adminMiddleware, nhanVienController.getNhanVienList);

// Cập nhật thông tin nhân viên
router.put("/:MSNV", adminMiddleware, nhanVienController.updateNhanVien);

// Xóa nhân viên
router.delete("/:MSNV", adminMiddleware, nhanVienController.deleteNhanVien);

// Lấy danh sách khách hàng
router.get("/khachhang", adminMiddleware, nhanVienController.getKhachHangList);

// Xóa khách hàng
router.delete(
  "/khachhang/:MSKH",
  adminMiddleware,
  nhanVienController.deleteKhachHang
);

// Cập nhật NgayGH và TrangThaiDH của đơn hàng
router.put(
  "/order/:SoDonDH",
  adminMiddleware,
  nhanVienController.updateDonDatHang
);

// Đăng nhập nhân viên
router.post("/admin-login", nhanVienController.adminLogin);

// Lấy danh sách đơn hàng
router.get("/get-orders", adminMiddleware, nhanVienController.getDonHangList);

// Lấy thông tin khách hàng từ MSKH
router.get(
  "/khachhang/:MSKH",
  adminMiddleware,
  nhanVienController.getKhachHangByMSKH
);

// Định nghĩa route lấy thông tin nhân viên từ MSNV
router.get(
  "/nhanvien/:MSNV",
  adminMiddleware,
  nhanVienController.getNhanVienByMSNV
);

// Xem chi tiết đơn hàng qua SoDonDH
router.get(
  "/chitietdonhang/:SoDonDH",
  adminMiddleware,
  nhanVienController.getChiTietDonHang
);

// Định nghĩa route lấy thông tin hàng hóa từ MSHH
router.get(
  "/hanghoa/:MSHH",
  adminMiddleware,
  nhanVienController.getHangHoaByMSHH
);

router.post("/khachhang", adminMiddleware, nhanVienController.createKhachHang);

module.exports = router;
