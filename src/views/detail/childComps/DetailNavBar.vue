<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          class="title"
          v-for="(item, index) in titles"
          :class="{ active: index === currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    // 点击title高亮显示
    titleClick(index) {
      this.currentIndex = index
      // 发送点击事件
      this.$emit('navClick', index)
    },
    // 点击返回进行回退
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.active {
  color: var(--color-high-text);
}
.center {
  display: flex;
}
.title {
  flex: 1;
}
.back img {
  margin-top: 11px;
}
</style>