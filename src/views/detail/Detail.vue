<template>
  <div>
    {{this.iid}}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      iid: null
    }
  },
  // 生命周期函数, 组件创建时调用
  created() {
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>
</style>