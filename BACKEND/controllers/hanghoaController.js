const HangHoa = require("../models/HangHoa");
const HinhHangHoa = require("../models/HinhHangHoa");

const layDanhSachHangHoa = async (req, res) => {
  try {
    const danhSachHangHoa = await HangHoa.aggregate([
      {
        $lookup: {
          from: "hinhhanghoas", // Tên collection của model HinhHangHoa
          localField: "MSHH",
          foreignField: "MSHH",
          as: "HinhHangHoa",
        },
      },
      {
        $project: {
          MSHH: 1,
          TenHH: 1,
          MoTaHH: 1,
          Gia: 1,
          SoLuongHang: 1,
          GhiChu: 1,
          "HinhHangHoa.TenHinh": 1,
        },
      },
    ]);

    res.json(danhSachHangHoa);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách hàng hóa" });
  }
};

const themHangHoa = async (req, res) => {
  try {
    // Lấy thông tin hàng hóa từ body request
    const { TenHH, MoTaHH, Gia, SoLuongHang, GhiChu } = req.body;

    // Tạo một đối tượng mới của model HangHoa
    const hangHoaMoi = new HangHoa({
      TenHH,
      MoTaHH,
      Gia,
      SoLuongHang,
      GhiChu,
    });

    // Lưu hàng hóa vào cơ sở dữ liệu
    const hangHoaDaThem = await hangHoaMoi.save();

    res.json(hangHoaDaThem);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thêm hàng hóa" });
  }
};

const themHinhHangHoa = async (req, res) => {
  try {
    // Kiểm tra xem có file hình đã được tải lên hay không
    if (!req.file) {
      return res.status(400).json({ error: "Vui lòng tải lên hình hàng hóa" });
    }

    // Tạo một đối tượng mới của model HinhHangHoa
    const { TenHinh } = req.body;
    const { MSHH } = req.params;

    // Tạo một đối tượng mới của model HinhHangHoa
    const hinhHangHoaMoi = new HinhHangHoa({
      TenHinh: req.file.filename, // Sử dụng tên tệp tin đã lưu trữ từ Multer
      MSHH: req.params.MSHH, // Lấy mã số hàng hóa từ tham số trong URL
    });

    // Lưu hình hàng hóa vào cơ sở dữ liệu
    const hinhHangHoaDaThem = await hinhHangHoaMoi.save();

    res.json(hinhHangHoaDaThem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi thêm hình hàng hóa" });
  }
};

const suaHangHoa = async (req, res) => {
  try {
    const { MSHH } = req.params;
    const { TenHH, MoTaHH, Gia, SoLuongHang, GhiChu, TenHinh } = req.body;

    // Tìm hàng hóa cần sửa theo MSHH
    const hangHoa = await HangHoa.findOne({ MSHH });
    console.log(hangHoa);

    if (!hangHoa) {
      return res.status(404).json({ error: "Không tìm thấy hàng hóa" });
    }

    // Cập nhật thông tin hàng hóa
    hangHoa.TenHH = TenHH;
    hangHoa.MoTaHH = MoTaHH;
    hangHoa.Gia = Gia;
    hangHoa.SoLuongHang = SoLuongHang;
    hangHoa.GhiChu = GhiChu;

    // Lưu thông tin hàng hóa đã sửa vào cơ sở dữ liệu
    const hangHoaDaSua = await hangHoa.save();

    // Tìm hình hàng hóa theo MSHH
    // const hinhHangHoa = await HinhHangHoa.findOne({ MSHH });

    // if (!hinhHangHoa) {
    //   return res.status(404).json({ error: "Không tìm thấy hình hàng hóa" });
    // }

    // // Cập nhật thông tin hình hàng hóa
    // hinhHangHoa.TenHinh = TenHinh;

    // // Lưu thông tin hình hàng hóa đã sửa vào cơ sở dữ liệu
    // await hinhHangHoa.save();

    res.json(hangHoaDaSua);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi sửa hàng hóa" });
  }
};

const xoaHangHoa = async (req, res) => {
  try {
    const { MSHH } = req.params;

    // Tìm và xóa hàng hóa theo MSHH
    const hangHoaDaXoa = await HangHoa.findOneAndDelete({ MSHH });

    if (!hangHoaDaXoa) {
      return res.status(404).json({ error: "Không tìm thấy hàng hóa" });
    }

    res.json({ message: "Hàng hóa đã được xóa" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóahàng hóa" });
  }
};

// Lấy một hàng hóa
const layHangHoa = async (req, res) => {
  try {
    const { MSHH } = req.params;

    // Tìm hàng hóa theo MSHH
    const hangHoa = await HangHoa.findOne({ MSHH });

    if (!hangHoa) {
      return res.status(404).json({ error: "Không tìm thấy hàng hóa" });
    }

    // Tìm hình hàng hóa theo MSHH
    const hinhHangHoa = await HinhHangHoa.findOne({ MSHH });

    if (!hinhHangHoa) {
      return res.status(404).json({ error: "Không tìm thấy hình hàng hóa" });
    }

    // Kết hợp thông tin hàng hóa và hình hàng hóa thành một đối tượng
    const hangHoaVaHinh = {
      hangHoa,
      hinhHangHoa,
    };

    res.json(hangHoaVaHinh);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy hàng hóa và hình hàng hóa" });
  }
};

module.exports = {
  layDanhSachHangHoa,
  themHangHoa,
  suaHangHoa,
  xoaHangHoa,
  themHinhHangHoa,
  layHangHoa,
};
