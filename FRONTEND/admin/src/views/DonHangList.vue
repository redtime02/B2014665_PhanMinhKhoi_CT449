<template>
  <div>
    <Header />
    <div class="container">
      <h2 class="text-center mt-4">Danh sách đơn hàng</h2>
      <div class="table-responsive mt-4">
        <table class="table mt-4 table-striped">
          <thead>
            <tr>
              <th>Số đơn</th>
              <th>Họ tên KH</th>
              <th>NV lập đơn</th>
              <th>Ngày đặt</th>
              <th>Ngày giao</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="donhang in donhangList" :key="donhang.SoDonDH">
              <td>{{ donhang.SoDonDH }}</td>
              <td>{{ donhang?.HoTenKH }}</td>
              <td>{{ donhang?.HoTenNV }}</td>
              <td>{{ formatDate(donhang?.NgayDH) }}</td>
              <td>{{ formatDate(donhang?.NgayGH) }}</td>
              <td>{{ donhang.TrangthaiDH }}</td>
              <td>
                <div
                  class="btn-group btn-group-sm"
                  style="gap: 10px"
                  role="group"
                >
                  <button
                    class="btn btn-primary rounded"
                    @click="xemDonHang(donhang.SoDonDH)"
                  >
                    Xem đơn hàng
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import AdminService from "@/services/admin.service";
import Header from "@/components/Header.vue";

export default {
  name: "DonHangList",
  components: {
    Header,
  },
  data() {
    return {
      donhangList: [],
    };
  },
  created() {
    this.getDonHangList();
  },
  methods: {
    async getDonHangList() {
      try {
        const response = await AdminService.getDonHangList();

        for (const donhang of response) {
          const khachhang = await AdminService.getKhachHangByMSKH(
            donhang?.MSKH
          );
          donhang.HoTenKH = khachhang.HoTenKH;

          if (donhang?.MSNV) {
            try {
              const nhanvien = await AdminService.getNhanVienByMSNV(
                donhang.MSNV
              );
              donhang.HoTenNV = nhanvien?.HoTenNV || "";
            } catch (error) {
              console.error(error);
              donhang.HoTenNV = "";
            }
          } else {
            donhang.HoTenNV = "";
          }
        }

        this.donhangList = response;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    xemDonHang(soDonDH) {
      // Thực hiện hành động khi người dùng nhấp vào button "Xem đơn hàng"
      console.log("Xem đơn hàng với số đơn: " + soDonDH);
      // Thực hiện chuyển hướng đến trang xem đơn hàng hoặc hiển thị thông tin đơn hàng chi tiết
      this.$router.push(`/donhang/${soDonDH}`);
    },
  },
};
</script>

<style>
.container {
  margin-top: 50px;
}

.table {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
}

.table td {
  vertical-align: middle;
}
</style>
