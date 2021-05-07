<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="itemImageLoad"/>
    <div class="goods-item-text">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="fav">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemImageLoad() {
      // 使用事件总线在图片加载完成时将事件发送出去
      this.$bus.$emit('itemImageLoad')
    },
    // 点击时跳转到详情页面并传递商品iid
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item {
  margin: 5px;
  width: 45%;
}
.goods-item img {
  border-radius: 5px;
  width: 100%;
}
.goods-item-text {
  text-align: center;
}
.goods-item-text p{
  /* 设置文本不换行 */ 
  white-space: nowrap;
  /* 超出部分隐藏 */
  overflow: hidden;
  /* 文字超出部分省略号显示 */
  text-overflow: ellipsis;
}
.goods-item-text .price {
  color: var(--color-tint);
  margin-right: 10px;
}
/* 使用为元素添加图标 */
.goods-item-text .fav::before {
  content: '';
  display: inline-block;
  height: 14px;
  width: 14px;
  background-image:url('~assets/img/common/collect.svg');
  background-size: 100%;
}
</style>