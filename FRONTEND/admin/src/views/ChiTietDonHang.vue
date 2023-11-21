<template>
  <div class="chitiet-donhang">
    <Header />
    <div class="container">
      <h2 class="text-center mt-4 mb-5">Thông tin chi tiết đơn hàng</h2>
      <div v-if="chiTietDonHang" class="donhang-details">
        <div class="donhang-info">
          <p>
            <strong>Số đơn hàng:</strong> {{ chiTietDonHang.datHang.SoDonDH }}
          </p>
          <p>
            <strong>Họ tên khách hàng:</strong>
            {{ chiTietDonHang.HoTenKH }}
          </p>
          <!-- <p>
            <strong>Nhân viên lập đơn:</strong>
            {{ chiTietDonHang.datHang?.MSNV }}
          </p> -->
          <p>
            <strong>Ngày đặt hàng:</strong>
            {{ formatDate(chiTietDonHang.datHang?.NgayDH) }}
          </p>
          <p>
            <strong style="margin-right: 10px">Ngày giao hàng:</strong>
            <input type="date" v-model="ngayDatHang" />
          </p>
          <p>
            <strong style="margin-right: 10px">Trạng thái đơn hàng:</strong>
            <select style="width: 150px" v-model="trangThaiDonHang">
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </select>
          </p>
        </div>
        <div class="sanpham-list">
          <h3>Danh sách sản phẩm</h3>
          <table>
            <thead>
              <tr>
                <th>Tên hàng hóa</th>
                <th>Số lượng</th>
                <th>Giá đặt hàng</th>
                <th>Giảm giá</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="sanPham in chiTietDonHang.chiTietDatHang"
                :key="sanPham.MSHH"
              >
                <td>{{ chiTietDonHang.chiTietDatHang[0].TenHH }}</td>
                <td>{{ chiTietDonHang.chiTietDatHang[0].SoLuong }}</td>
                <td>{{ chiTietDonHang.chiTietDatHang[0].GiaDatHang }}</td>
                <td>{{ chiTietDonHang.chiTietDatHang[0].GiamGia }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
      <button @click="capNhatDonHang" class="update-btn">Cập nhật</button>
      <div v-if="successMessage" class="text-success">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Header from "@/components/Header.vue";
import AdminService from "@/services/admin.service";

export default {
  components: {
    Header,
  },
  data() {
    return {
      chiTietDonHang: null,
      successMessage: "",
    };
  },
  async created() {
    const SoDonDH = this.$route.params.id; // Hoặc lấy giá trị từ đường dẫn URL, ví dụ: this.$route.params.SoDonDH

    try {
      // Gọi hàm getChiTietDonHang từ adminService
      const response = await AdminService.getChiTietDonHang(SoDonDH);

      // Gán thông tin chi tiết đơn hàng vào biến chiTietDonHang
      this.chiTietDonHang = response;
      this.trangThaiDonHang = this.chiTietDonHang?.datHang?.TrangthaiDH;
      this.ngayDatHang = this.chiTietDonHang?.datHang?.NgayGH;

      const khachhang = await AdminService.getKhachHangByMSKH(
        this.chiTietDonHang.datHang.MSKH
      );
      this.chiTietDonHang.HoTenKH = khachhang.HoTenKH;
      console.log(this.chiTietDonHang.chiTietDatHang[0].MSHH);
      const tenHH = await AdminService.getHangHoaByMSHH(
        this.chiTietDonHang.chiTietDatHang[0].MSHH
      );
      this.chiTietDonHang.chiTietDatHang[0].TenHH = tenHH.TenHH;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    async capNhatDonHang() {
      const SoDonDH = this.$route.params.id; // Lấy số đơn hàng từ tham số đường dẫn URL

      // Tạo đối tượng dữ liệu cập nhật đơn hàng
      const data = {
        NgayGH: this.ngayDatHang, // Lấy ngày giao hàng từ ng-model "ngayDatHang"
        TrangthaiDH: this.trangThaiDonHang, // Lấy trạng thái đơn hàng từ ng-model "trangThaiDonHang"
      };

      try {
        // Gọi hàm updateDonDatHang từ adminService
        const response = await AdminService.updateDonDatHang(SoDonDH, data);
        console.log(response); // In ra kết quả cập nhật đơn hàng

        // Thực hiện các xử lý hoặc chuyển hướng sau khi cập nhật thành công
        this.successMessage = "Cập nhật đơn hàng thành công";
        setTimeout(() => {
          this.$router.push("/donhang-list"); // Điều hướng về trang HangHoaList
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.chitiet-donhang {
  /* Tùy chỉnh kiểu dáng cho phần tổng thể của trang */
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 4px;
}

.mb-5 {
  margin-bottom: 5px;
}

.donhang-details {
  /* Tùy chỉnh kiểu dáng cho phần chi tiết đơn hàng */
}

.donhang-info {
  /* Tùy chỉnh kiểu dáng cho phần thông tin đơn hàng */
}

.sanpham-list {
  /* Tùy chỉnh kiểu dáng cho phần danh sách sản phẩm */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.loading {
  /* Tùy chỉnh kiểu dáng cho phần hiển thị khi đang tải dữ liệu */
}

.update-btn {
  margin-top: 10px;
  /* Tùy chỉnh kiểu dáng cho nút 'Cập nhật' */
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
