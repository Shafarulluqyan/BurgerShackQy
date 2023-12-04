<script>
import FooterView from '../components/FooterView.vue'
export default {
  components: {
    FooterView
  }
}
</script>

<template>
  <div class="hero_area">
    <div class="bg-box">
      <img src="@/assets/images/hero-bg.jpg" alt="" />
    </div>
    <!-- slider section -->
    <section class="slider_section">
      <div id="customCarousel1" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="container">
              <div class="row">
                <div class="col-md-7 col-lg-6">
                  <div class="detail-box">
                    <h1>Fast Food Restaurant</h1>
                    <p>
                      Listen up, there's this spot, and it's all about those bomb burgers, you feel
                      me? Describe it in a way that screams 'the place to be' for burger lovers.
                      What's the vibe like, and which burger is totally blowing everyone's minds?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="container">
              <div class="row">
                <div class="col-md-7 col-lg-6">
                  <div class="detail-box">
                    <h1>Fast Food Restaurant</h1>
                    <p>
                      Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad
                      mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore,
                      sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="container">
              <div class="row">
                <div class="col-md-7 col-lg-6">
                  <div class="detail-box">
                    <h1>Fast Food Restaurant</h1>
                    <p>
                      Doloremque, itaque aperiam facilis rerum, commodi, temporibus sapiente ad
                      mollitia laborum quam quisquam esse error unde. Tempora ex doloremque, labore,
                      sunt repellat dolore, iste magni quos nihil ducimus libero ipsam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end slider section -->
  </div>

  <!-- offer section -->

  <section class="offer_section layout_padding-bottom">
    <div class="offer_container">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="box">
              <div class="img-box">
                <img src="@/assets/images/o1.jpg" alt="" />
              </div>
              <div class="detail-box">
                <h5>Burger bun</h5>
                <h6><span>top-selling product last week</span></h6>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="box">
              <div class="img-box">
                <img src="@/assets/images/o2.jpg" alt="" />
              </div>
              <div class="detail-box">
                <h5>Pizza Mamaroni</h5>
                <h6><span>top-selling product of the week</span></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- end offer section -->

  <!-- footer section -->
  <FooterView />
  <!-- footer section -->
</template>
