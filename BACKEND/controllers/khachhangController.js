const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const KhachHang = require("../models/KhachHang");
const DatHang = require("../models/DatHang");
const ChiTietDatHang = require("../models/ChiTietDatHang");
const crypto = require("crypto");
const HangHoa = require("../models/HangHoa");
const GioHang = require("../models/GioHang");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const JWT_SECRET_KEY = generateSecretKey();

// Đăng ký
exports.createKhachHang = async (req, res) => {
  try {
    const khachHang = new KhachHang(req.body);
    const savedKhachHang = await khachHang.save();
    res.status(201).json(savedKhachHang);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy thông tin khách hàng theo ID
exports.getKhachHangById = async (req, res) => {
  try {
    const khachHang = await KhachHang.findOne({ MSKH: req.params.id });
    if (!khachHang) throw new Error("Khách hàng không tồn tại");
    res.json(khachHang);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cập nhật thông tin khách hàng
exports.updateKhachHang = async (req, res) => {
  try {
    const khachHang = await KhachHang.findOneAndUpdate(
      { MSKH: req.params.id },
      req.body,
      { new: true }
    );
    if (!khachHang) throw new Error("Khách hàng không tồn tại");
    res.json(khachHang);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Xóa khách hàng
exports.deleteKhachHang = async (req, res) => {
  try {
    const khachHang = await KhachHang.findOneAndDelete({
      MSKH: req.params.id,
    });
    if (!khachHang) throw new Error("Khách hàng không tồn tại");
    res.json({ message: "Xóa khách hàng thành công" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    // Kiểm tra xem khách hàng có tồn tại trong cơ sở dữ liệu hay không
    const khachHang = await KhachHang.findOne({ Email: Email });
    if (!khachHang) {
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
    }

    // Kiểm tra tính đúng đắn của mật khẩu
    const isMatch = await bcrypt.compare(Password, khachHang.Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
    }

    // Tạo mã JWT
    const token = jwt.sign(
      { khachHangId: khachHang._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "23h",
      }
    );

    const response = {
      token: token,
      khachHang: khachHang,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình đăng nhập" });
  }
};

// Lấy danh sách khách hàng
exports.getKhachHangList = async (req, res) => {
  try {
    const khachHangList = await KhachHang.find();
    res.json(khachHangList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.datHang = async (req, res) => {
  try {
    const { MSHH, SoLuong, GiaDatHang, GiamGia } = req.body;
    const khachHangId = req.user;

    // Tạo một bản ghi mới trong bảng DatHang
    const datHang = new DatHang({
      MSKH: khachHangId,
      NgayDH: new Date(),
    });

    // Lưu đơn hàng vào cơ sở dữ liệu
    await datHang.save();

    // Tạo một bản ghi mới trong bảng ChiTietDatHang
    const chiTietDatHang = new ChiTietDatHang({
      SoDonDH: datHang.SoDonDH,
      MSHH,
      SoLuong,
      GiaDatHang,
      GiamGia,
    });

    // Lưu chi tiết đặt hàng vào cơ sở dữ liệu
    await chiTietDatHang.save();

    res.status(201).json({ message: "Đặt hàng thành công", datHang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng ký khách hàng
exports.register = async (req, res) => {
  // try {
  //   const { email, password } = req.body;

  //   // Kiểm tra xem email đã tồn tại hay chưa
  //   const existingKhachHang = await KhachHang.findOne({ email });
  //   if (existingKhachHang) {
  //     return res.status(400).json({ error: "Email đã được đăng ký" });
  //   }

  //   // Mã hóa mật khẩu
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   // Tạo khách hàng mới
  //   const khachHang = new KhachHang({
  //     email,
  //     password: hashedPassword,
  //   });

  //   // Lưu khách hàng vào cơ sở dữ liệu
  //   await khachHang.save();

  //   res.status(201).json({ message: "Đăng ký thành công" });
  // } catch (error) {
  //   res.status(500).json({ error: "Đăng ký thất bại" });
  // }
  try {
    const { HoTenKH, Email, Password, DiaChi, SoDienThoai } = req.body;

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingUser = await KhachHang.findOne({
      Email: Email,
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã được sử dụng" });
    }

    // const existingPhone = await KhachHang.findOne({
    //   SoDienThoai: SoDienThoai,
    // });
    // if (existingPhone) {
    //   return res.status(400).json({ error: "Số điện thoại đã được sử dụng" });
    // }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Tạo khách hàng mới
    const khachHang = new KhachHang({
      HoTenKH: HoTenKH,
      Email: Email,
      Password: hashedPassword,
      DiaChi: DiaChi,
      SoDienThoai: SoDienThoai,
    });

    // Lưu khách hàng vào cơ sở dữ liệu
    await khachHang.save();

    // // Tạo mã JWT
    // const token = jwt.sign(
    //   { khachHangId: khachHang._id },
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: "1h",
    //   }
    // );

    // res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình đăng ký" });
  }
};

// // Đăng nhập khách hàng
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Tìm khách hàng theo email
//     const khachHang = await KhachHang.findOne({ email });
//     if (!khachHang) {
//       return res
//         .status(401)
//         .json({ error: "Email hoặc mật khẩu không chính xác" });
//     }

//     // So sánh mật khẩu
//     const isMatch = await bcrypt.compare(password, khachHang.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ error: "Email hoặc mật khẩu không chính xác" });
//     }

//     // Tạo JSON Web Token
//     const token = jwt.sign(
//       { khachHang: khachHang._id },
//       process.env.JWT_SECRET_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );

//     // Gửi token trong response
//     res
//       .cookie("token", token, { httpOnly: true, sameSite: "strict" })
//       .json({ message: "Đăng nhập thành công", token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Đăng nhập thất bại" });
//   }
// };

// Xem các đơn hàng của khách hàng
exports.getXemDonHang = async (req, res) => {
  try {
    const khachHangId = req.user;

    // Tìm các đơn hàng của khách hàng dựa trên MSKH
    const donHangList = await DatHang.find({ _id: khachHangId });

    if (donHangList.length === 0) {
      return res.status(200).json({ message: "Không có đơn hàng nào" });
    }

    res.status(200).json(donHangList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Tìm kiếm hàng hóa theo tên
exports.searchHangHoa = async (req, res) => {
  try {
    const { TenHH } = req.body;
    console.log(TenHH);
    if (TenHH) {
      const hangHoaList = await HangHoa.find({
        TenHH,
      });
      res.json(hangHoaList);
    } else {
      res.status(400).json({ error: "Missing TenHH in the request body" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { MSHH, TenHH, GiaDatHang, SoLuong, GiamGia } = req.body;
    const khachHangId = req.user; // Lấy ID khách hàng từ request

    // Tạo một bản ghi mới trong bảng GioHang
    const gioHang = new GioHang({
      MSHH,
      TenHH,
      GiaDatHang,
      SoLuong,
      GiamGia,
      MSKH: khachHangId, // Lưu ID khách hàng vào trường MSKH
    });

    // Lưu giỏ hàng vào cơ sở dữ liệu
    await gioHang.save();

    res.status(201).json({ message: "Thêm vào giỏ hàng thành công", gioHang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy giỏ hàng của khách hàng
exports.getGioHang = async (req, res) => {
  try {
    const gioHang = await GioHang.find({ MSKH: req.user });

    res.json(gioHang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xem các đơn hàng của khách hàng
exports.getXemDonHang = async (req, res) => {
  try {
    const khachHangId = req.user;
    console.log(khachHangId);

    // Tìm các đơn hàng của khách hàng trong bảng DatHang
    const donHangList = await DatHang.find({ MSKH: khachHangId });

    // Kiểm tra xem có đơn hàng nào hay không
    if (donHangList.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    // Trả về danh sách đơn hàng của khách hàng
    res.json(donHangList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
