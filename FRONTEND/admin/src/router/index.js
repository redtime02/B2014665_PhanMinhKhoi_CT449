import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import CustomerList from "@/views/CustomerList.vue";
import HangHoaList from "@/views/HangHoaList.vue";
import DonHangList from "@/views/DonHangList.vue";
import AddHangHoa from "@/views/AddHangHoa.vue";
import EditHangHoa from "@/views/EditHangHoa.vue";
import ChiTietDonHang from "@/views/ChiTietDonHang.vue";
import AddKhachHang from "@/views/AddKhachHang.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/customer-list",
    name: "customer.list",
    component: CustomerList,
  },
  {
    path: "/hanghoa-list",
    name: "hanghoa.list",
    component: HangHoaList,
  },
  {
    path: "/donhang-list",
    name: "donhang.list",
    component: DonHangList,
  },
  {
    path: "/hanghoa-add",
    name: "hanghoa.add",
    component: AddHangHoa,
  },
  {
    path: "/hanghoa-edit/:MSHH",
    name: "hanghoa.edit",
    component: EditHangHoa,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/donhang/:id",
    name: "ChiTietDonHang",
    component: ChiTietDonHang,
  },
  {
    path: "/customer-add",
    name: "customer.add",
    component: AddKhachHang,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
