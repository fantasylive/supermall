<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script scoped>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 监听滚动数据
      probeType: this.probeType,
      // 上拉加载更多
      pullUpLoad: this.pullUpLoad,
      // 允许监听其中组件的事件
      click: true
    })
    // 监听滚动数据, 使用自定义事件返回
    this.scroll.on('scroll', position => {
      this.$emit('contentScroll', position)
    })
    // 监听上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  },
  methods: {
    // time: 如果不传这个参数，就默认是300
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    // 完成此次上拉加载
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    // 重新加载
    refresh() {
      this.scroll.refresh()
    },
    // 获取当前scrollY值
    getScrollY() {
      // 判断是否有值
      return this.scroll.y ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>