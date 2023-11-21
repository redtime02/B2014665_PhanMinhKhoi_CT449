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
            <router-link class="nav-link" to="/product">Sản Phẩm</router-link>
          </li>
        </ul>
        <form class="d-flex justify-content-center me-5">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Tìm kiếm ..."
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Tìm</button>
        </form>
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
                <router-link class="dropdown-item" to="#"
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

export default {
  name: "Header",
  setup() {
    const router = useRouter();
    const isDropdownOpen = ref(false);

    const logout = () => {
      // Thực hiện các tác vụ liên quan đến đăng xuất người dùng
      // Ví dụ: xóa token, xóa thông tin người dùng đã lưu, chuyển hướng đến trang đăng nhập, vv.

      // Sau khi xử lý đăng xuất, chuyển hướng đến trang đăng nhập
      router.push("/");
    };

    return { router, isDropdownOpen, logout };
  },
};
</script>

<style></style>
