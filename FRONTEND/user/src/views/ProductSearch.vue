<template>
  <div>
    <Header />
    <div class="container">
      <h1 class="mb-5">Kết quả tìm kiếm</h1>
      <div class="product-list">
        <template v-if="products.length > 0">
          <div
            v-for="product in products"
            :key="product.MSHH"
            class="product-card"
          >
            <img
              src="@/images/1700232520047-d340edda2b0eacb7ddc47537cddb5e08.jpg"
              :alt="product.TenHH"
              class="product-image"
            />
            <div class="d-flex flex-column product-details text-center">
              <h3 class="product-name">{{ product.TenHH }}</h3>
              <p class="product-description">{{ product.MoTaHH }}</p>
              <p class="product-price">{{ product.Gia }} đ</p>
              <button
                class="btn btn-primary"
                @click="viewProductDetail(product.MSHH)"
              >
                Xem Chi Tiết
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <p>Không tìm thấy sản phẩm</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import KhachHangService from "@/services/khachhang.service";
import Header from "../components/Header.vue";

export default {
  components: {
    Header,
  },
  name: "ProductSearch",
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const products = ref([]);
    const searchQuery = ref(props.searchQuery);

    onMounted(async () => {
      try {
        console.log(searchQuery.value);
        const result = await KhachHangService.searchHangHoa({
          TenHH: searchQuery.value,
        });
        products.value = result;
      } catch (error) {
        console.error(error);
      }
    });

    return { products };
  },
  methods: {
    viewProductDetail(MSHH) {
      // Xử lý logic khi người dùng nhấp vào nút "Xem Chi Tiết" cho sản phẩm cụ thể
      console.log("Xem Chi Tiết sản phẩm:", MSHH);
      this.$router.push({ name: "product.detail", params: { MSHH } });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 300px;
}

.product-image {
  width: 100%;
  height: auto;
}

.product-details {
  margin-top: 10px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
}

.product-description {
  font-size: 14px;
  margin-top: 5px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
