<template>
  <div>
    <Header />
    <div class="container">
      <h2 class="text-center mt-4 mb-5">Thêm Khách Hàng</h2>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="tenHH">Họ tên khách hàng:</label>
          <input
            type="text"
            class="form-control"
            id="tenHH"
            v-model="khData.HoTenKH"
            required
          />
        </div>
        <div class="form-group">
          <label for="moTaHH">Email:</label>
          <input
            v-model="khData.Email"
            type="email"
            id="email"
            class="form-control"
            required
          />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="gia">Mật khẩu:</label>
            <input
              v-model="khData.Password"
              type="password"
              id="password"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="soLuongHang">Địa chỉ:</label>
            <input
              v-model="khData.DiaChi"
              type="text"
              id="address"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="form-group">
          <label for="ghiChu">Số điện thoại:</label>
          <input
            v-model="khData.SoDienThoai"
            type="tel"
            id="phoneNumber"
            class="form-control"
            required
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary w-35">
            Thêm Khách Hàng
          </button>
        </div>
        <div v-if="successMessage" class="text-success">
          {{ successMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AdminService from "@/services/admin.service";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      khData: {
        HoTenKH: "",
        Email: "",
        Password: "",
        DiaChi: "",
        SoDienThoai: "",
      },
      successMessage: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        // Nếu không có lỗi, tiến hành submit
        const khachHang = await AdminService.createKhachHang(this.khData);

        // Xử lý thành công, tạo hàng hóa và hình hàng hóa thành công
        // Thực hiện các hành động khác sau khi tạo hàng hóa và hình hàng hóa thành công
        this.successMessage = "Thêm khách hàng thành công";
        setTimeout(() => {
          this.$router.push("/customer-list"); // Điều hướng về trang HangHoaList
        }, 2000);
      } catch (error) {
        // Xử lý lỗi, hiển thị thông báo lỗi cho người dùng hoặc thực hiện các hành động khác khi có lỗi xảy ra
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.form {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.w-35 {
  width: 35%;
}
</style>
