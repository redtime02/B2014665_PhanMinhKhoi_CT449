<template>
  <div class="register-container">
    <div class="card register-card">
      <div class="card-body">
        <h2 class="register-title">Đăng ký</h2>
        <form @submit="register" class="register-form">
          <div class="form-group">
            <label for="fullName">Họ tên</label>
            <input
              v-model="HoTenKH"
              type="text"
              id="fullName"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="Email"
              type="email"
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
          <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <input
              v-model="ConfirmPassword"
              type="password"
              id="confirmPassword"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input
              v-model="DiaChi"
              type="text"
              id="address"
              class="form-control"
              required
            />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Số điện thoại</label>
            <input
              v-model="SoDienThoai"
              type="tel"
              id="phoneNumber"
              class="form-control"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary btn-block">
            Đăng ký
          </button>
        </form>
        <p class="login-link mt-3">
          Đã có tài khoản? <router-link to="/">Đăng nhập</router-link>
        </p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import KhachHangService from "@/services/khachhang.service";

export default {
  data() {
    return {
      HoTenKH: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      DiaChi: "",
      SoDienThoai: "",
      error: null,
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async register(event) {
      event.preventDefault();
      try {
        if (this.Password !== this.ConfirmPassword) {
          throw new Error("Mật khẩu và xác nhận mật khẩu không khớp.");
        }

        const khachHangData = {
          HoTenKH: this.HoTenKH,
          Email: this.Email,
          Password: this.Password,
          DiaChi: this.DiaChi,
          SoDienThoai: this.SoDienThoai,
        };

        await KhachHangService.createKhachHang(khachHangData);
        this.errorMessage = "";
        // Đăng ký thành công, có thể chuyển hướng đến trang đăng nhập hoặc hiển thị thông báo thành công tại đây.
        this.successMessage = "Đăng ký thành công!";
        // Chuyển hướng đến trang đăng nhập
        this.$router.push("/");
      } catch (error) {
        this.error = error.message;
        console.error(error);
      }
    },
  },
};
</script>

<style>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-card {
  max-width: 400px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 30px;
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  width: 100%;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
