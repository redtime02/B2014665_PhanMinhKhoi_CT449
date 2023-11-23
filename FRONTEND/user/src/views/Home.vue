<template>
  <Header style="position: relative; z-index: 1" />
  <div class="home-container">
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../images/Books_HD_(8314929977).jpg"
            class="d-block w-100"
            alt="Slide 1"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Cửa hàng sách BOOKSTORE</h5>
            <p>
              Giúp khách hàng có trải nghiệm tốt hơn và mua hàng chính hãng.
            </p>
            <router-link
              to="/product"
              class="btn btn-primary mt-5"
              style="width: 200px"
              >Mua Sắm Ngay</router-link
            >
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../images/istockphoto-157482029-170667a.webp"
            class="d-block w-100"
            alt="Slide 2"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Cửa hàng sách BOOKSTORE</h5>
            <p>
              Giúp khách hàng có trải nghiệm tốt hơn và mua hàng chính hãng.
            </p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../images/olesia-buyar-ZD03qVhBJZg-unsplash.jpg"
            class="d-block w-100"
            alt="Slide 3"
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Cửa hàng sách BOOKSTORE</h5>
            <p>
              Giúp khách hàng có trải nghiệm tốt hơn và mua hàng chính hãng.
            </p>
          </div>
        </div>
      </div>
      <!-- <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style>
.home-container {
  margin-top: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  margin-bottom: 200px;
}

.carousel {
  height: 100vh;
  margin-top: 150px;
  width: 100%; /* Đặt chiều cao của carousel bằng chiều cao của màn hình */
}

.carousel-item img {
  height: 100vh; /* Đặt chiều cao của hình ảnh là 100% */
  width: auto; /* Tự động tính toán chiều rộng để giữ tỷ lệ khung hình */
  object-fit: cover; /* Hiển thị hình ảnh bằng cách điền đầy không gian */
  margin: 0 auto; /* Canh giữa hình ảnh */
}

.carousel-caption {
  position: absolute; /* Đặt vị trí tuyệt đối */
  top: 50%; /* Đặt top là 50% */
  left: 50%; /* Đặt left là 50% */
  transform: translate(
    -50%,
    -50%
  ); /* Dịch chuyển vị trí -50% theo cả chiều ngang và chiều dọc */
  text-align: center; /* Căn giữa nội dung */
}

.carousel-caption h5 {
  font-size: 24px; /* Tăng kích thước font chữ tiêu đề */
  font-weight: bold; /* In đậm font chữ tiêu đề */
}

.carousel-caption p {
  font-size: 18px; /* Tăng kích thước font chữ nội dung */
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: #000; /* Đặt màu nền */
  opacity: 0.5; /* Đặt độ mờ */
}

.carousel-control-prev-icon:after,
.carousel-control-next-icon:after {
  color: #fff; /* Đặt màu biểu tượng */
}
</style>
