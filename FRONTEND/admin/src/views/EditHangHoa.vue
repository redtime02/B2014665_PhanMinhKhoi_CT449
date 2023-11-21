<template>
  <div>
    <Header />
    <div class="container">
      <h2 class="text-center mt-4 mb-5">Cập Nhật Hàng Hóa</h2>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="tenHH">Tên Hàng Hóa:</label>
          <input
            type="text"
            class="form-control"
            id="tenHH"
            v-model="hangHoaData.TenHH"
            required
          />
          <div v-if="errors.tenHH" class="text-danger">{{ errors.tenHH }}</div>
        </div>
        <div class="form-group">
          <label for="moTaHH">Mô Tả Hàng Hóa:</label>
          <textarea
            class="form-control"
            id="moTaHH"
            v-model="hangHoaData.MoTaHH"
            required
          ></textarea>
          <div v-if="errors.moTaHH" class="text-danger">
            {{ errors.moTaHH }}
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="gia">Giá:</label>
            <input
              type="number"
              class="form-control"
              id="gia"
              v-model="hangHoaData.Gia"
              required
            />
            <div v-if="errors.gia" class="text-danger">
              {{ errors.gia }}
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="soLuongHang">Số Lượng Hàng:</label>
            <input
              type="number"
              class="form-control"
              id="soLuongHang"
              v-model="hangHoaData.SoLuongHang"
              required
            />
            <div v-if="errors.soLuongHang" class="text-danger">
              {{ errors.soLuongHang }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="ghiChu">Ghi Chú:</label>
          <input
            type="text"
            class="form-control"
            id="ghiChu"
            v-model="hangHoaData.GhiChu"
            required
          />
          <div v-if="errors.ghiChu" class="text-danger">
            {{ errors.ghiChu }}
          </div>
        </div>
        <div class="form-group">
          <label for="hinhHangHoa">Hình Hàng Hóa:</label>
          <input
            type="file"
            style="margin-left: 10px"
            class="form-control-file"
            id="hinhHangHoa"
            @change="handleFileChange"
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary w-35">
            Cập Nhật Hàng Hóa
          </button>
        </div>
        <div v-if="successMessage" class="text-success">
          {{ successMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import HangHoaService from "@/services/hanghoa.service";
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      hangHoaData: {
        TenHH: "",
        MoTaHH: "",
        Gia: 0,
        SoLuongHang: 0,
        GhiChu: "",
        HinhHangHoa: null,
      },
      errors: {
        tenHH: null,
        moTaHH: null,
        gia: null,
        soLuongHang: null,
        ghiChu: null,
        hinhHangHoa: null,
      },
      successMessage: "",
    };
  },
  created() {
    const MSHH = this.$route.params.MSHH;
    this.fetchHangHoa(MSHH);
  },
  methods: {
    async submitForm() {
      try {
        // Xóa thông báo lỗi trước khi submit lại
        this.errors = {
          tenHH: null,
          moTaHH: null,
          gia: null,
          soLuongHang: null,
          ghiChu: null,
          hinhHangHoa: null,
        };

        let hasErrors = false; // Thêm biến để kiểm tra có lỗi hay không

        // Kiểm tra và gán thông báo lỗi cho từng trường
        if (!this.hangHoaData.TenHH) {
          this.errors.tenHH = "Vui lòng nhập Tên Hàng Hóa.";
          hasErrors = true;
        }
        if (!this.hangHoaData.MoTaHH) {
          this.errors.moTaHH = "Vui lòng nhập Mô Tả Hàng Hóa.";
          hasErrors = true;
        }
        if (this.hangHoaData.Gia <= 0) {
          this.errors.gia = "Giá phải lớn hơn 0.";
          hasErrors = true;
        }
        if (this.hangHoaData.SoLuongHang <= 0) {
          this.errors.soLuongHang = "Số Lượng Hàng phải lớn hơn 0.";
          hasErrors = true;
        }
        if (!this.hangHoaData.GhiChu) {
          this.errors.ghiChu = "Vui lòng nhập Ghi Chú.";
          hasErrors = true;
        }
        if (!this.hangHoaData.HinhHangHoa) {
          this.errors.hinhHangHoa = "Vui lòng chọn Hình Hàng Hóa.";
          hasErrors = true;
        }

        // Kiểm tra nếu có lỗi, dừng quá trình submit
        // Kiểm tra nếu có lỗi, dừng quá trình submit
        if (hasErrors) {
          return;
        }

        // Nếu không có lỗi, tiến hành submit
        const hangHoa = await HangHoaService.updateHangHoa(
          this.$route.params.MSHH,
          this.hangHoaData
        );
        console.log(hangHoa);
        const MSHH = hangHoa.MSHH;
        // await HangHoaService.themHinhHangHoa(
        //   MSHH,
        //   this.hangHoaData.HinhHangHoa
        // );

        // Xử lý thành công, tạo hàng hóa và hình hàng hóa thành công
        // Thực hiện các hành động khác sau khi tạo hàng hóa và hình hàng hóa thành công
        this.successMessage = "Cập nhật hàng hóa thành công";
        setTimeout(() => {
          this.$router.push("/hanghoa-list"); // Điều hướng về trang HangHoaList
        }, 2000);
      } catch (error) {
        // Xử lý lỗi, hiển thị thông báo lỗi cho người dùng hoặc thực hiện các hành động khác khi có lỗi xảy ra
      }
    },
    handleFileChange(event) {
      this.hangHoaData.hinhHangHoa.TenHinh = event.target.files[0];
    },
    async fetchHangHoa(MSHH) {
      try {
        const hangHoa = await HangHoaService.getHangHoa(MSHH);
        this.hangHoaData = {
          TenHH: hangHoa.hangHoa.TenHH,
          MoTaHH: hangHoa.hangHoa.MoTaHH,
          Gia: hangHoa.hangHoa.Gia,
          SoLuongHang: hangHoa.hangHoa.SoLuongHang,
          GhiChu: hangHoa.hangHoa.GhiChu,
          HinhHangHoa: hangHoa.hinhHangHoa.TenHinh,
        };
        console.log(this.hangHoaData.TenHH);
      } catch (error) {
        // Xử lý lỗi khi lấy thông tin hàng hóa
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.form {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.w-35 {
  width: 35%;
}
</style>
