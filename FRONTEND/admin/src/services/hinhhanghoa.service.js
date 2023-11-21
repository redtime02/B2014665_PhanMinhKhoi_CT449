import createApiClient from "./api.service";

class HinhHangHoaService {
  constructor(baseUrl = "/api") {
    this.api = createApiClient(baseUrl);
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

export default new HinhHangHoaService();
