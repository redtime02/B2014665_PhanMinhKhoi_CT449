<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">BOOKSTORE</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/home"
              >Trang Chủ</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/product"
              >Sản Phẩm</router-link
            >
          </li>
        </ul>
        <form class="d-flex justify-content-center me-5">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Tìm kiếm"
            aria-label="Search"
            v-model="searchQuery"
          />
          <button
            class="btn btn-outline-light"
            type="button"
            @click="searchHangHoa"
          >
            Tìm
          </button>
        </form>
        <img
          src="@/images/cart-icon.png"
          alt="Giỏ hàng"
          class="cart-icon me-5"
          style="width: 45px; cursor: pointer"
          @click="goToCart"
        />
        <ul class="navbar-nav me-5">
          <li class="nav-item dropdown ml-auto">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              @click="isDropdownOpen = !isDropdownOpen"
              :class="{ show: isDropdownOpen }"
            >
              Phan Khoi
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
              :class="{ show: isDropdownOpen }"
            >
              <li>
                <router-link class="dropdown-item" to="/order"
                  >Đơn hàng của tôi</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" to="#" @click="logout"
                  >Đăng xuất</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import KhachHangService from "@/services/khachhang.service";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Header",
  // components: {
  //   FontAwesomeIcon,
  // },
  setup() {
    const router = useRouter();
    const isDropdownOpen = ref(false);
    const searchQuery = ref("");

    const logout = () => {
      // Thực hiện các tác vụ liên quan đến đăng xuất người dùng
      // Ví dụ: xóa token, xóa thông tin người dùng đã lưu, chuyển hướng đến trang đăng nhập, vv.

      // Sau khi xử lý đăng xuất, chuyển hướng đến trang đăng nhập
      router.push("/");
    };

    const searchHangHoa = async () => {
      if (searchQuery.value !== "") {
        // Kiểm tra xem searchQuery có giá trị không rỗng
        try {
          // Gửi yêu cầu tìm kiếm hàng hóa
          // const result = await KhachHangService.searchHangHoa({
          //   TenHH: searchQuery.value,
          // });

          // if (result.length > 0) {
          // Điều hướng đến trang hiển thị sản phẩm tìm kiếm
          router.push({
            name: "product.search",
            params: { searchQuery: searchQuery.value }, // Pass the searchQuery to the route
          });
          // } else {
          //   // Hiển thị thông báo không tìm thấy sản phẩm
          //   alert("Không tìm thấy sản phẩm phù hợp");
          // }
        } catch (error) {
          console.error(error);
          alert("Đã xảy ra lỗi khi tìm kiếm hàng hóa");
        }
      } else {
        // Hiển thị thông báo yêu cầu nhập từ khóa tìm kiếm
        alert("Vui lòng nhập từ khóa tìm kiếm");
      }
    };

    const goToCart = () => {
      router.push("/cart");
    };

    return {
      router,
      isDropdownOpen,
      logout,
      searchQuery,
      searchHangHoa,
      goToCart,
    };
  },
};
</script>

<style></style>
