<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
  font-size: 15px;
  
}
.recommend-item {
  flex: 1;
  text-align: center;

}
.recommend-item img {
  height: 80%;
  width: 80%;

  margin-bottom: 5px;
}
</style>