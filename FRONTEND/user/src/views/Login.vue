<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-body">
        <h2 class="login-title">Đăng nhập</h2>
        <form @submit="login" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="Email"
              type="text"
              id="email"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Mật khẩu</label>
            <input
              v-model="Password"
              type="password"
              id="password"
              class="form-control"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Đăng nhập
          </button>
        </form>
        <p class="register-link mt-3">
          Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import KhachHangService from "@/services/khachhang.service";
export default {
  data() {
    return {
      Email: "",
      Password: "",
      error: null,
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        const response = await KhachHangService.login({
          Email: this.Email,
          Password: this.Password,
        });

        console.log(response);

        // Kiểm tra kết quả đăng nhập thành công
        if (response.token) {
          // Lưu thông tin người dùng vào local storage hoặc Vuex store
          localStorage.setItem("user", JSON.stringify(response.khachHang));
          localStorage.setItem("token", JSON.stringify(response.token));
          // axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${response.adminToken}`;
          // console.log(axios.defaults.headers.common["Authorization"]);

          // Chuyển hướng đến trang chính của ứng dụng
          this.$router.push("/home");
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

.login-card {
  max-width: 400px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 30px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  width: 100%;
}
</style>
