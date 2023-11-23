import createApiClient from "./api.service";

class KhachHangService {
  constructor(baseUrl = "/api/user") {
    this.api = createApiClient(baseUrl);
  }

  // Tạo khách hàng mới
  async createKhachHang(khachHangData) {
    try {
      const response = await this.api.post("/", khachHangData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  // Lấy thông tin khách hàng theo ID
  async getKhachHangById(id) {
    try {
      const response = await this.api.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  // Cập nhật thông tin khách hàng
  async updateKhachHang(id, khachHangData) {
    try {
      const response = await this.api.put(`/${id}`, khachHangData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  // Xóa khách hàng
  async deleteKhachHang(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  // Đăng nhập
  async login(credentials) {
    try {
      const response = await this.api.post("/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  // Lấy danh sách khách hàng
  async getKhachHangList() {
    try {
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  // Đặt hàng từ khách hàng
  async datHang(orderData) {
    try {
      const response = await this.api.post("/order", orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  async searchHangHoa(searchQuery) {
    try {
      const response = await this.api.post("/hanghoa/search", searchQuery);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  async themVaoGio(orderData) {
    try {
      const response = await this.api.post("/cart", orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  async getGioHang() {
    try {
      const response = await this.api.get("/giohang"); // Gửi yêu cầu GET để lấy giỏ hàng từ API
      return response.data; // Trả về dữ liệu giỏ hàng
    } catch (error) {
      throw new Error("Không thể lấy giỏ hàng"); // Xử lý lỗi nếu có
    }
  }

  async getXemDonHang() {
    try {
      const response = await this.api.get("/get-order"); // Gửi yêu cầu GET để lấy giỏ hàng từ API
      return response.data; // Trả về dữ liệu giỏ hàng
    } catch (error) {
      throw new Error("Không thể lấy đơn hàng"); // Xử lý lỗi nếu có
    }
  }
}

export default new KhachHangService();
