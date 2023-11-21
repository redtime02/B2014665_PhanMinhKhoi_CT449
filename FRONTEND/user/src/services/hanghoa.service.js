import createApiClient from "./api.service";

class HangHoaService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
  }

  // Tạo hàng hóa mới
  async createHangHoa(data) {
    try {
      const response = await this.api.post("/hanghoa", data);
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi tạo hàng hóa mới");
    }
  }

  // Lấy danh sách hàng hóa
  async getHangHoaList() {
    try {
      const response = await this.api.get("/hanghoa");
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi lấy danh sách hàng hóa");
    }
  }

  // Cập nhật thông tin hàng hóa
  async updateHangHoa(MSHH, data) {
    try {
      const response = await this.api.put(`/hanghoa/${MSHH}`, data);
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật thông tin hàng hóa");
    }
  }

  // Xóa hàng hóa
  async deleteHangHoa(MSHH) {
    try {
      const response = await this.api.delete(`/hanghoa/${MSHH}`);
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi xóa hàng hóa");
    }
  }

  // Lấy thông tin hàng hóa
  async getHangHoa(MSHH) {
    try {
      const response = await this.api.get(`/hanghoa/${MSHH}`);
      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi lấy thông tin hàng hóa");
    }
  }

  async themHinhHangHoa(MSHH, hinhHangHoa) {
    try {
      const formData = new FormData();
      formData.append("TenHinh", hinhHangHoa);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await this.api.post(
        `/hanghoa/${MSHH}/hinh`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      throw new Error("Lỗi khi thêm hình hàng hóa");
    }
  }
}

export default new HangHoaService();
