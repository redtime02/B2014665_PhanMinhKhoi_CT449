<template>
  <div class="login-container">
    <form @submit="login" class="login-form">
      <h2 class="login-title">Đăng nhập nhân viên</h2>
      <div class="form-group">
        <label for="HoTenNV">Họ tên nhân viên</label>
        <input
          v-model="HoTenNV"
          type="text"
          id="HoTenNV"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="Password">Mật khẩu</label>
        <input
          v-model="Password"
          type="password"
          id="Password"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import AdminService from "@/services/admin.service";
export default {
  data() {
    return {
      HoTenNV: "",
      Password: "",
      error: null,
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        const response = await AdminService.adminLogin({
          HoTenNV: this.HoTenNV,
          Password: this.Password,
        });

        console.log(response);

        // Kiểm tra kết quả đăng nhập thành công
        if (response.adminToken) {
          // Lưu thông tin người dùng vào local storage hoặc Vuex store
          localStorage.setItem("admin", JSON.stringify(response.nhanVien));
          localStorage.setItem(
            "adminToken",
            JSON.stringify(response.adminToken)
          );
          // axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${response.adminToken}`;
          // console.log(axios.defaults.headers.common["Authorization"]);

          // Chuyển hướng đến trang chính của ứng dụng
          this.$router.push("/customer-list");
        } else {
          // Xử lý kết quả đăng nhập thất bại
          this.error = response.message;
        }
      } catch (error) {
        // Xử lý lỗi khi gửi yêu cầu đăng nhập
        this.error = "Đã xảy ra lỗi. Vui lòng thử lại sau.";
        console.error(error);
      }
    },
    // getAdminTokenFromLocalStorage() {
    //   const adminToken = localStorage.getItem("adminToken");
    //   if (adminToken) {
    //     console.log(adminToken);
    //     return adminToken;
    //   }
    //   return null;
    // },
  },
  // created() {
  //   const admin = this.getAdminFromLocalStorage();
  //   if (admin) {
  //     // Thực hiện các xử lý với thông tin người dùng
  //     console.log(admin);
  //     // Ví dụ: Kiểm tra xem người dùng đã đăng nhập hay chưa và chuyển hướng đến trang chính nếu đã đăng nhập.
  //     // this.$router.push("/dashboard");
  //   }
  // },
};
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
}
</style>
