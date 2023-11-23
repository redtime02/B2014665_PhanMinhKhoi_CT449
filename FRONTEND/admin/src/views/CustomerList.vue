<template>
  <div>
    <Header />
    <div class="container">
      <h2 class="text-center mt-4">Danh sách khách hàng</h2>
      <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-primary mx-auto w-15" @click="addUser">
          <i class="fas fa-plus"></i> Thêm khách hàng
        </button>
      </div>
      <div class="table-responsive mt-4">
        <table class="table mt-4 table-striped">
          <thead>
            <tr>
              <th>MSKH</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.MSKH">
              <td>{{ customer.MSKH }}</td>
              <td>{{ customer.HoTenKH }}</td>
              <td>{{ customer.Email }}</td>
              <td>{{ customer.DiaChi }}</td>
              <td>{{ customer.SoDienThoai }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdminService from "@/services/admin.service";
import Header from "@/components/Header.vue";

export default {
  name: "CustomerList",
  components: {
    Header,
  },
  data() {
    return {
      customers: [],
    };
  },
  // mounted() {
  //   this.getCustomerList();
  // },
  created() {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      this.getCustomerList();
    } else {
      // Xử lý khi không có adminToken
    }
  },

  methods: {
    async getCustomerList() {
      try {
        const adminToken = localStorage.getItem("adminToken");
        const at = JSON.parse(adminToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${at}`;
        console.log(axios.defaults.headers.common["Authorization"]);
        const response = await AdminService.getKhachHangList();
        this.customers = response;
      } catch (error) {
        console.error(error);
      }
    },
    addUser() {
      this.$router.push({ name: "customer.add" });
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
