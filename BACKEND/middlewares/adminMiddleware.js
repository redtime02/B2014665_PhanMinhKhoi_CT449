const jwt = require("jsonwebtoken");
const NhanVien = require("../models/NhanVien");

const adminMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded);
      // Lấy thông tin người dùng từ decoded và lưu vào req.user
      const admin = await NhanVien.findById(decoded?.nhanVienId);
      console.log(admin);
      req.admin = admin;

      // Tiếp tục xử lý tiếp theo
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Token không hợp lệ" });
    }
  } else {
    return res.status(401).json({ error: "Không có mã token" });
  }
};

module.exports = adminMiddleware;
