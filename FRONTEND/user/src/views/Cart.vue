<template>
  <div>
    <Header />
    <div class="container">
      <h1 class="title">Danh sách sản phẩm trong giỏ hàng</h1>
      <div v-if="gioHang.length > 0">
        <div
          v-for="sanPham in gioHang"
          :key="sanPham.MSHH"
          class="product-item"
        >
          <div class="product-image">
            <img
              src="@/images/1700232520047-d340edda2b0eacb7ddc47537cddb5e08.jpg"
              :alt="sanPham.TenHH"
            />
          </div>
          <div class="product-info">
            <h2 class="product-title">{{ sanPham.TenHH }}</h2>
            <p class="product-price">
              <strong>Giá:</strong> {{ sanPham.GiaDatHang }} đ
            </p>
            <p class="product-quantity">
              <strong>Số lượng:</strong> {{ sanPham.SoLuong }}
            </p>
          </div>
          <div class="product-actions">
            <button @click="xoaSanPham(sanPham.MSHH)" class="btn btn-remove">
              Xóa
            </button>
          </div>
        </div>
        <div class="cart-summary">
          <div class="summary-item">
            <span class="summary-label">Tổng cộng:</span>
            <span class="summary-value">{{ tinhTongCong() }} đ</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Giảm giá:</span>
            <span class="summary-value">{{ tinhGiamGia() }} đ</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Thành tiền:</span>
            <span class="summary-value">{{ tinhThanhTien() }} đ</span>
          </div>
        </div>
        <button @click="datHang" class="btn btn-primary mt-3">Đặt hàng</button>
      </div>

      <div v-else>
        <p class="empty-cart">Giỏ hàng trống</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import KhachHangService from "@/services/khachhang.service";

export default {
  components: {
    Header,
  },
  data() {
    return {
      gioHang: [],
    };
  },
  mounted() {
    this.fetchGioHang();
  },
  methods: {
    async fetchGioHang() {
      try {
        this.gioHang = await KhachHangService.getGioHang();
        console.log(this.gioHang[0].MSHH);
      } catch (error) {
        console.error(error);
        // Xử lý lỗi khi không lấy được giỏ hàng
      }
    },
    async xoaSanPham(MSHH) {
      try {
        await KhachHangService.xoaSanPhamGioHang(MSHH);
        this.fetchGioHang(); // Cập nhật lại giỏ hàng sau khi xóa sản phẩm
      } catch (error) {
        console.error(error);
        // Xử lý lỗi khi không thể xóa sản phẩm
      }
    },
    async datHang() {
      try {
        // Tạo một mảng chứa các đối tượng chi tiết đặt hàng
        const chiTietDatHangList = {
          MSHH: this.gioHang[0].MSHH,
          SoLuong: this.gioHang[0].SoLuong,
          GiaDatHang: this.gioHang[0].GiaDatHang,
        };

        // Gọi phương thức datHang từ KhachHangService và truyền danh sách chi tiết đặt hàng
        console.log(chiTietDatHangList);
        await KhachHangService.datHang(chiTietDatHangList);

        // Xóa giỏ hàng sau khi đặt hàng thành công
        this.gioHang = [];

        // Hiển thị thông báo đặt hàng thành công
        alert("Đặt hàng thành công!");
      } catch (error) {
        console.error(error);
        // Xử lý lỗi khi không thể đặt hàng
        // Hiển thị thông báo đặt hàng thất bại
        alert("Đặt hàng thất bại!");
      }
    },
    tinhTongCong() {
      // Tính tổng cộng giá sản phẩm trong giỏ hàng
      let tongCong = 0;

      // Duyệt qua từng sản phẩm trong giỏ hàng
      this.gioHang.forEach((sanPham) => {
        // Tính tổng cộng bằng cách cộng dồn giá của từng sản phẩm
        tongCong += sanPham.GiaDatHang;
      });

      return tongCong;
    },
    tinhGiamGia() {
      // Tính giảm giá (nếu có)
      let giamGia = 0;
      // logic tính giảm giá
      return giamGia;
    },
    tinhThanhTien() {
      // Tính thành tiền sau khi đã áp dụng giảm giá
      const tongCong = this.tinhTongCong();
      const giamGia = this.tinhGiamGia();
      const thanhTien = tongCong - giamGia;
      return thanhTien;
    },
  },
};
</script>

<style>
.container {
  margin-top: 50px;
}

.title {
  margin-bottom: 50px;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.product-image img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

.product-info {
  flex-grow: 1;
  margin-left: 10px;
}

.product-title {
  font-size: 30px;
  margin-bottom: 5px;
}

.product-price {
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
}

.product-quantity {
  margin-bottom: 10px;
  font-size: 20px;
}

.product-actions {
  margin-left: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-remove {
  background-color: red;
  color: white;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.cart-summary {
  margin-top: 50px;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.summary-label {
  font-weight: bold;
  font-size: 25px;
}

.summary-value {
  font-weight: bold;
  font-size: 25px;
}
</style>
