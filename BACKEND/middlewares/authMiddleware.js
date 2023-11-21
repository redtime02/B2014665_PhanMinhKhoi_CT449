const jwt = require("jsonwebtoken");
const KhachHang = require("../models/KhachHang");

const authMiddleware = async (req, res, next) => {
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
      const user = await KhachHang.findById(decoded?.khachHangId);
      console.log(user);
      req.user = user;

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

module.exports = authMiddleware;
