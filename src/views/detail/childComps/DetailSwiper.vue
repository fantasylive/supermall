<template>
  <div>
    <swiper class="swiper-style">
      <swiper-item v-for="(item, index) in topSwiperImages" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props: {
    topSwiperImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.swiper-style {
  height: 300px;
  overflow: hidden;
}
</style>