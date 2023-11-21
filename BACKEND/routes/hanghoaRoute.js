const express = require("express");
const router = express.Router();
const multer = require("multer");
const hangHoaController = require("../controllers/hanghoaController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Thư mục lưu trữ hình ảnh tải lên
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Đặt tên file mới
  },
});

const upload = multer({ storage: storage });

// Lấy danh sách hàng hóa
router.get("/", hangHoaController.layDanhSachHangHoa);

// Thêm hàng hóa
router.post("/", adminMiddleware, hangHoaController.themHangHoa);

// Thêm hình ảnh hàng hóa với multer middleware
router.post(
  "/:MSHH/hinh",
  upload.single("TenHinh"),
  adminMiddleware,
  hangHoaController.themHinhHangHoa
);

// Sửa hàng hóa với multer middleware
router.put(
  "/:MSHH",
  // upload.single("hinhHangHoa"),
  adminMiddleware,
  hangHoaController.suaHangHoa
);

// Xóa hàng hóa
router.delete("/:MSHH", adminMiddleware, hangHoaController.xoaHangHoa);

// Lấy một hàng hóa
router.get("/:MSHH", hangHoaController.layHangHoa);

module.exports = router;
