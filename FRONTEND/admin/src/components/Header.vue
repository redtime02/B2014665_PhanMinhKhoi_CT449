<template>
  <header>
    <nav class="d-flex">
      <h4 class="">
        <router-link class="text-decoration-none text-white" to="/"
          >BOOKSTORE</router-link
        >
      </h4>
      <ul class="d-flex">
        <li><router-link to="/customer-list">Khách hàng</router-link></li>
        <li><router-link to="/hanghoa-list">Sản phẩm</router-link></li>
        <li><router-link to="/donhang-list">Đơn hàng</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "Header",
  setup() {
    const router = useRouter();

    return { router };
  },
};
</script>

<style>
header {
  background-color: darkgreen;
  padding: 10px;
  margin-top: 0;
  width: 100%;
  height: 50px;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 80px;
  align-items: center;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}
</style>
