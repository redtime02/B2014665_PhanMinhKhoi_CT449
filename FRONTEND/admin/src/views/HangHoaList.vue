<template>
  <div>
    <Header />
    <div class="container">
      <div>
        <h2 class="text-center mt-4">Danh sách hàng hóa</h2>
      </div>
      <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-primary mx-auto w-15" @click="addProduct">
          <i class="fas fa-plus"></i> Thêm hàng hóa
        </button>
      </div>
      <div class="table-responsive mt-4">
        <table class="table mt-4 table-striped">
          <thead>
            <tr>
              <th>MSHH</th>
              <th>Tên hàng hóa</th>
              <th>Giá</th>
              <th>Số lượng hàng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hanghoa in hanghoaList" :key="hanghoa.MSHH">
              <td>{{ hanghoa.MSHH }}</td>
              <td>{{ hanghoa.TenHH }}</td>
              <td>{{ hanghoa.Gia }}</td>
              <td>{{ hanghoa.SoLuongHang }}</td>
              <td class="d-flex">
                <div
                  class="btn-group btn-group-sm"
                  style="gap: 10px"
                  role="group"
                >
                  <button
                    @click="editHangHoa(hanghoa.MSHH)"
                    class="btn btn-primary rounded"
                  >
                    Sửa
                  </button>
                  <button
                    @click="deleteHangHoa(hanghoa.MSHH)"
                    class="btn btn-danger rounded"
                  >
                    Xóa
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
import HangHoaService from "@/services/hanghoa.service";
import Header from "@/components/Header.vue";

export default {
  name: "HangHoaList",
  components: {
    Header,
  },
  data() {
    return {
      hanghoaList: [],
    };
  },
  created() {
    this.getHangHoaList();
  },
  methods: {
    async getHangHoaList() {
      try {
        const response = await HangHoaService.getHangHoaList();
        this.hanghoaList = response;
      } catch (error) {
        console.error(error);
      }
    },
    editHangHoa(MSHH) {
      // Thực hiện hành động khi nhấn nút sửa
      // Ví dụ: chuyển hướng đến trang chỉnh sửa sản phẩm với MSHH như tham số
      this.$router.push({ name: "hanghoa.edit", params: { MSHH } });
    },
    deleteHangHoa(MSHH) {
      // Thực hiện hành động khi nhấn nút xóa
      // Ví dụ: gọi phương thức xóa sản phẩm từ HangHoaService và làm refresh danh sách sản phẩm
      HangHoaService.deleteHangHoa(MSHH)
        .then(() => {
          this.getHangHoaList(); // Refresh danh sách sản phẩm
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addProduct() {
      this.$router.push({ name: "hanghoa.add" });
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

.w-15 {
  width: 15%;
}
</style>
```
