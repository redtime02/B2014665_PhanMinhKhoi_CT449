<template>
  <div>
    <Header />
    <div class="container">
      <div v-if="product">
        <div class="product-details">
          <div class="product-image col-4">
            <img
              src="@/images/1700232520047-d340edda2b0eacb7ddc47537cddb5e08.jpg"
              alt="Product Image"
              style="width: 300px; height: 300px;"
            />
          </div>
          <div class="product-info">
            <h1 class="product-title">{{ product.hangHoa.TenHH }}</h1>
            <p><strong>Giá:</strong> {{ product.hangHoa.Gia }}</p>
            <p>
              <strong>Số lượng hàng:</strong> {{ product.hangHoa.SoLuongHang }}
            </p>
            <p><strong>Ghi chú:</strong> {{ product.hangHoa.GhiChu }}</p>
            <div class="quantity-control">
              <label for="quantity">Số lượng:</label>
              <input
                type="number"
                id="quantity"
                v-model="quantity"
                min="1"
                :max="product.hangHoa.SoLuongHang"
              />
            </div>
            <div class="button-wrapper">
              <button
                @click="datHang()"
                class="btn btn-info me-2"
                :disabled="quantity > product.hangHoa.SoLuongHang"
              >
                Mua Ngay
              </button>
              <button @click="addToCart" class="btn btn-success">Thêm vào giỏ hàng</button>
            </div>
            <div class="button-wrapper">
            </div>
          </div>
        </div>
        <div>
          <p class="mt-3">
            <strong>Mô tả sản phẩm :</strong> 
            <p>
                {{ product.hangHoa.MoTaHH }}
            </p>
          </p>
        </div>
      </div>
      <div v-else class="loading-message">Loading...</div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import HangHoaService from "@/services/hanghoa.service";
import KhachHangService from "@/services/khachhang.service";

export default {
  components: {
    Header,
  },
  data() {
    return {
      product: null,
      quantity: 1,
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      const MSHH = this.$route.params.MSHH;
      try {
        this.product = await HangHoaService.getHangHoa(MSHH);
        console.log(this.product);
      } catch (error) {
        console.error(error);
        // Xử lý lỗi khi không lấy được thông tin sản phẩm
      }
    },
    getProductImageUrl(imageName) {
      return require(`@/assets/images/${imageName}`);
    },
    // formatCurrency(value) {
    //   // Format value as currency (e.g., 10000 -> 10,000)
    //   return value.toLocaleString("en-US");
    // },
async datHang() {
  try {
    const hangHoaId = this.$route.params.MSHH;
    const soLuong = this.quantity;

    // Lấy giá của sản phẩm
    const giaSanPham = this.product.hangHoa.Gia;

    // Tính giá đặt hàng
    const giaDatHang = giaSanPham * soLuong;

    // Gọi phương thức datHang từ dịch vụ KhachHangService
    const orderData = {
      MSHH: hangHoaId,
      SoLuong: soLuong,
      GiaDatHang: giaDatHang
    };

    const result = await KhachHangService.datHang(orderData);
    console.log(result);

    // Xử lý kết quả đặt hàng thành công và giá đặt hàng

  } catch (error) {
    console.error(error);
    // Xử lý lỗi khi không thể đặt hàng
  }
},
  async addToCart() {
    try {
      const hangHoaId = this.$route.params.MSHH;
      const soLuong = this.quantity;
      const tenHH = this.product.hangHoa.TenHH;

      // Lấy giá của sản phẩm
      const giaSanPham = this.product.hangHoa.Gia;

      // Tính giá đặt hàng
      const giaDatHang = giaSanPham * soLuong;
      // Lấy thông tin sản phẩm từ dữ liệu của component (this.product)

      // Tạo một đối tượng orderData chứa thông tin sản phẩm để đặt hàng
      const orderData = {
        MSHH: hangHoaId,
        TenHH: tenHH,
        GiaDatHang: giaDatHang,
        SoLuong: soLuong, // Số lượng sản phẩm muốn đặt hàng (trong ví dụ này là 1)
        GiamGia: 0, // Giảm giá (nếu có)
      };

      console.log(orderData);

      // Gọi phương thức datHang từ khachHangService để thực hiện đặt hàng
      const result = await KhachHangService.themVaoGio(orderData);
      console.log(result);

      // Hiển thị thông báo thành công cho người dùng
      alert("Thêm sản phẩm vào giỏ hàng thành công!");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(error);
      alert("Đã xảy ra lỗi khi thêm vào giỏ hàng");
    }
  },
  },
};
</script>

<style>
.container {
  margin-top: 100px;
}
.product-title {
  font-size: 24px;
  margin-bottom: 20px;
}
.product-details {
  display: flex;
  align-items: center;
}
.product-image img {
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-right: 20px;
}
.product-info p {
  margin-bottom: 10px;
}
.quantity-control {
  margin-top: 10px;
}
.quantity-control label {
  margin-right: 10px;
}
.loading-message {
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
