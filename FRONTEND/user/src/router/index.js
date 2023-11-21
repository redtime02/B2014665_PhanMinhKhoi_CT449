import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Register from "@/views/Register.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
  },
  {
    path: "/product/:MSHH",
    name: "product.detail",
    component: ProductDetail,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
