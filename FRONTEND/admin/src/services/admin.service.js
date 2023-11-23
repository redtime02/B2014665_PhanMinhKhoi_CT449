import createApiClient from "./api.service";

class AdminService {
  constructor(baseUrl = "/api/admin") {
    this.api = createApiClient(baseUrl);
  }

  // Tạo nhân viên mới
  async createNhanVien(data) {
    return (await this.api.post("/nhanvien", data)).data;
  }

  // Lấy danh sách nhân viên
  async getNhanVienList() {
    return (await this.api.get("/nhanvien")).data;
  }

  // Cập nhật thông tin nhân viên
  async updateNhanVien(MSNV, data) {
    return (await this.api.put(`/nhanvien/${MSNV}`, data)).data;
  }

  // Xóa nhân viên
  async deleteNhanVien(MSNV) {
    return (await this.api.delete(`/nhanvien/${MSNV}`)).data;
  }

  // Lấy danh sách khách hàng
  async getKhachHangList() {
    return (await this.api.get("/khachhang")).data;
  }

  // Xóa khách hàng
  async deleteKhachHang(MSKH) {
    return (await this.api.delete(`/nhanvien/khachhang/${MSKH}`)).data;
  }

  // Cập nhật NgayGH và TrangThaiDH của đơn hàng
  async updateDonDatHang(SoDonDH, data) {
    return (await this.api.put(`/order/${SoDonDH}`, data)).data;
  }

  // Đăng nhập nhân viên
  async adminLogin(data) {
    return (await this.api.post("/admin-login", data)).data;
  }

  async getDonHangList() {
    return (await this.api.get("/get-orders")).data;
  }

  async getKhachHangByMSKH(MSKH) {
    return (await this.api.get(`/khachhang/${MSKH}`)).data;
  }

  // Lấy thông tin nhân viên từ MSNV
  async getNhanVienByMSNV(MSNV) {
    return (await this.api.get(`/nhanvien/${MSNV}`)).data;
  }

  async getChiTietDonHang(SoDonDH) {
    return (await this.api.get(`/chitietdonhang/${SoDonDH}`)).data;
  }

  async getHangHoaByMSHH(MSHH) {
    return (await this.api.get(`/hanghoa/${MSHH}`)).data;
  }

  async createKhachHang(data) {
    return (await this.api.post("/khachhang", data)).data;
  }
}

export default new AdminService();
