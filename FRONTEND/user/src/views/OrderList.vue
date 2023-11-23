<template>
  <Header />
  <div class="container">
    <h1 class="mb-5">Danh sách đơn hàng</h1>
    <table class="order-table table mt-4 table-striped">
      <thead>
        <tr>
          <th>Mã đơn hàng</th>
          <th>Ngày đặt hàng</th>
          <th>Ngày giao hàng</th>
          <th>Trạng thái đơn hàng</th>
          <th>Hành động</th>
          <!-- Thêm các cột khác tùy theo yêu cầu -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.SoDonDH }}</td>
          <td>{{ formatDate(order.NgayDH) }}</td>
          <td>{{ formatDate(order.NgayGH) }}</td>
          <td>{{ order.TrangthaiDH }}</td>
          <td>
            <button class="btn btn-danger" @click="cancelOrder(order.id)">
              Hủy
            </button>
          </td>
          <!-- Thêm các cột khác tùy theo yêu cầu -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import KhachHangService from "@/services/khachhang.service.js";
import moment from "moment";

export default {
  components: {
    Header,
  },
  data() {
    return {
      orders: [], // Danh sách đơn hàng
    };
  },
  mounted() {
    this.fetchOrders(); // Gọi function fetchOrders() khi component được mounted
  },
  methods: {
    async fetchOrders() {
      try {
        this.orders = await KhachHangService.getXemDonHang();
      } catch (error) {
        console.log(error);
        // Xử lý lỗi nếu có
      }
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
};
</script>

<style>
.container {
  margin-top: 50px;
}

.order-list {
  margin-top: 50px;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th,
.order-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.order-table th {
  background-color: #f5f5f5;
}

.order-table tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
