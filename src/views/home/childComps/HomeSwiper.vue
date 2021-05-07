 <template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  data() {
    return {
      isImageLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 轮播图片加载完成后发送事件，计算tabControl的offsetTop
    imageLoad() {
      // 有一张图片加载完成就行
      if(!this.isImageLoad) {
        this.$emit('imageLoad')
        this.isImageLoad = true
      }
      
    }
  }
}
</script>

<style scoped>
</style>