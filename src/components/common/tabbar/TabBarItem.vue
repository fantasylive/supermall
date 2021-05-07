<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    /*
      父组件在使用此子组件时需要传递的参数
    */
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
      }
    },
    computed: {
      /*
        判断当前组件是否处于活跃状态
        $route为当前router跳转对象,判断当前组件路径path是否包含在当前url的路径中,如果是则说明当前组件处于活跃状态
      */
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      /*
        文字绑定的样式
        如果当前组件为活跃状态则设置该样式为
      */
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      /*
        监听该组件的点击事件，进行路由跳转
        添加.catch()防止重复点击同一个item报错的问题
      */
      itemClick() {
        this.$router.replace(this.path).catch(err => err.message)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
