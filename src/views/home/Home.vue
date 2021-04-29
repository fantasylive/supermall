<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  components: {
    NavBar
  },
  // 将请求过来的数据保存
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  // 生命周期函数 在组件创建好后触发
  created() {
    // 请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
};
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>