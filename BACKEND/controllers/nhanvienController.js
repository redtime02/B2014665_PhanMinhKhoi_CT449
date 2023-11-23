const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const NhanVien = require("../models/NhanVien");
const KhachHang = require("../models/KhachHang");
const DatHang = require("../models/DatHang");
const ChiTietDatHang = require("../models/ChiTietDatHang");
const crypto = require("crypto");
const HangHoa = require("../models/HangHoa");

// Tạo nhân viên mới
exports.createNhanVien = async (req, res) => {
  try {
    // Lấy thông tin từ body request
    const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;

    // Tạo nhân viên mới với trường MSNV được tự động gán giá trị
    const nhanVien = new NhanVien({
      HoTenNV,
      Password,
      ChucVu,
      DiaChi,
      SoDienThoai,
    });

    // Lưu nhân viên vào cơ sở dữ liệu
    await nhanVien.save();

    res
      .status(201)
      .json({ message: "Tạo nhân viên thành công", MSNV: nhanVien.MSNV });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập nhân viên
exports.adminLogin = async (req, res) => {
  try {
    const { HoTenNV, Password } = req.body;

    // Kiểm tra xem nhân viên có tồn tại trong cơ sở dữ liệu hay không
    const nhanVien = await NhanVien.findOne({ HoTenNV: HoTenNV });
    console.log(nhanVien);
    if (!nhanVien) {
      return res
        .status(400)
        .json({ error: "HoTenNV hoặc mật khẩu không đúng" });
    }

    // Kiểm tra tính đúng đắn của mật khẩu
    const isMatch = Password === nhanVien.Password;
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "HoTenNV hoặc mật khẩu không đúng" });
    }

    // Tạo mã JWT
    const adminToken = jwt.sign(
      { nhanVienId: nhanVien._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "23h",
      }
    );

    const response = {
      adminToken: adminToken,
      nhanVien: nhanVien,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình đăng nhập" });
  }
};

// Lấy danh sách nhân viên
exports.getNhanVienList = async (req, res) => {
  try {
    const nhanVienList = await NhanVien.find();
    res.json(nhanVienList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin nhân viên
exports.updateNhanVien = async (req, res) => {
  try {
    const { MSNV } = req.params;
    const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;

    // Tìm nhân viên theo MSNV
    const nhanVien = await NhanVien.findOne({ MSNV });
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    // Cập nhật thông tin nhân viên
    nhanVien.HoTenNV = HoTenNV;
    nhanVien.Password = Password;
    nhanVien.ChucVu = ChucVu;
    nhanVien.DiaChi = DiaChi;
    nhanVien.SoDienThoai = SoDienThoai;

    // Lưu nhân viên đã cập nhật vào cơ sở dữ liệu
    await nhanVien.save();

    res.json({ message: "Cập nhật nhân viên thành công", MSNV: nhanVien.MSNV });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa nhân viên
exports.deleteNhanVien = async (req, res) => {
  try {
    const { MSNV } = req.params;

    // Xóa nhân viên theo MSNV
    await NhanVien.findOneAndDelete({ MSNV });

    res.json({ message: "Xóa nhân viên thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

// Thêm khách hàng
exports.addKhachHang = async (req, res) => {
  try {
    const { MSNV } = req.params;
    const { HoTenKH, DiaChi, SoDienThoai } = req.body;

    // Tìm nhân viên theo MSNV
    const nhanVien = await NhanVien.findOne({ MSNV });
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    // Tạo khách hàng mới
    const khachHang = new KhachHang({
      HoTenKH,
      DiaChi,
      SoDienThoai,
      NhanVien: nhanVien._id,
    });

    // Lưu khách hàng vào cơ sở dữ liệu
    await khachHang.save();

    res.status(201).json({ message: "Thêm khách hàng thành công", khachHang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sửa thông tin khách hàng
exports.updateKhachHang = async (req, res) => {
  try {
    const { MSNV, MSKH } = req.params;
    const { HoTenKH, DiaChi, SoDienThoai } = req.body;

    // Tìm nhân viên theo MSNV
    const nhanVien = await NhanVien.findOne({ MSNV });
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    // Tìm khách hàng theo MSKH
    const khachHang = await KhachHang.findOne({
      _id: MSKH,
      NhanVien: nhanVien._id,
    });
    if (!khachHang) {
      return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    // Cập nhật thông tin khách hàng
    khachHang.HoTenKH = HoTenKH;
    khachHang.DiaChi = DiaChi;
    khachHang.SoDienThoai = SoDienThoai;

    // Lưu khách hàng đã cập nhật vào cơ sở dữ liệu
    await khachHang.save();

    res.json({ message: "Cập nhật khách hàng thành công", khachHang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa khách hàng
exports.deleteKhachHang = async (req, res) => {
  try {
    const { MSNV, MSKH } = req.params;

    // Tìm nhân viên theo MSNV
    const nhanVien = await NhanVien.findOne({ MSNV });
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    // Xóa khách hàng theo MSKH
    const khachHang = await KhachHang.findOneAndDelete({
      _id: MSKH,
      NhanVien: nhanVien._id,
    });
    if (!khachHang) {
      return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    res.json({ message: "Xóa khách hàng thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa khách hàng
exports.deleteKhachHang = async (req, res) => {
  try {
    const { MSKH } = req.params;

    // Xóa khách hàng theo MSKH
    const khachHang = await KhachHang.findOneAndDelete({ _id: MSKH });
    if (!khachHang) {
      return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    res.json({ message: "Xóa khách hàng thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật NgayGH và TrangThaiDH của đơn hàng
exports.updateDonDatHang = async (req, res) => {
  try {
    const { SoDonDH } = req.params;
    const { NgayGH, TrangthaiDH } = req.body;
    const nhanVienId = req.admin;

    // Tìm đơn hàng theo số đơn đặt hàng
    const donDatHang = await DatHang.findOne({ SoDonDH });
    if (!donDatHang) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    // Cập nhật NgayGH và TrangThaiDH của đơn hàng
    donDatHang.MSNV = nhanVienId;
    donDatHang.NgayGH = NgayGH;
    donDatHang.TrangthaiDH = TrangthaiDH;

    // Lưu đơn hàng đã cập nhật vào cơ sở dữ liệu
    await donDatHang.save();

    res.json({
      message: "Cập nhật đơn hàng thành công",
      SoDonDH: donDatHang.SoDonDH,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách đơn hàng
exports.getDonHangList = async (req, res) => {
  try {
    const donHangList = await DatHang.find();
    res.json(donHangList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin khách hàng từ MSKH
exports.getKhachHangByMSKH = async (req, res) => {
  try {
    const { MSKH } = req.params;

    // Tìm khách hàng theo MSKH
    const khachHang = await KhachHang.findOne({ _id: MSKH });

    if (!khachHang) {
      return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    res.json(khachHang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin nhân viên từ MSNV
exports.getNhanVienByMSNV = async (req, res) => {
  try {
    const { MSNV } = req.params;

    // Tìm nhân viên theo MSNV
    const nhanVien = await NhanVien.findOne({ _id: MSNV });
    if (!nhanVien) {
      return res.status(404).json({ message: "Nhân viên không tồn tại" });
    }

    res.json(nhanVien);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết đơn hàng
exports.getChiTietDonHang = async (req, res) => {
  try {
    const { SoDonDH } = req.params;

    // Tìm đơn hàng dựa vào SoDonDH
    const datHang = await DatHang.findOne({ SoDonDH });

    if (!datHang) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    // Tìm chi tiết đơn hàng dựa vào SoDonDH
    const chiTietDatHang = await ChiTietDatHang.find({ SoDonDH });

    res.json({ datHang, chiTietDatHang });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHangHoaByMSHH = async (req, res) => {
  try {
    const { MSHH } = req.params;

    // Tìm hàng hóa theo MSHH
    const hangHoa = await HangHoa.findOne({ MSHH });

    if (!hangHoa) {
      return res.status(404).json({ message: "Hàng hóa không tồn tại" });
    }

    res.json(hangHoa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createKhachHang = async (req, res) => {
  try {
    const khachHang = new KhachHang(req.body);
    const savedKhachHang = await khachHang.save();
    res.status(201).json(savedKhachHang);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
