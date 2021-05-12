<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="checked-all"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 计算总的价格 filter筛选出被选中的商品 reduce将被选中的商品的价格累加 最后toFixed保留2位小数
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    // 返回被选中商品的数量
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    /* 
      判断当前是否为全选
      every方法是将传入的方法(方法返回一个布尔值)对数组内所有的对象执行 如果所有的数组对象执行这个方法都返回true则every的执行结果为true
    */ 
    isSelectAll() {
      // return !(this.cartList.filter(item=>item.checked).length)
      if (this.cartList.length === 0) {
        return false;
      } else {
        return !this.cartList.every((item) => !item.checked);
      }
    },
  },
  methods: {
    // 点击全选按钮时执行
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    // 用户点击结算时判断是否有商品被选中
    calcClick() {
      if (!this.cartList.find(item => item.checked)) {
        this.$toast.show('请选择购买的商品');
      }
    },
  },
};
</script>

<style>
.bottom-bar {
  position: relative;
  display: flex;
  height: 60px;
  line-height: 60px;
  background-color: #eeeeee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.checked-all {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.totalPrice {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: #fb7299;
  text-align: center;
  color: #ffffff;
}
</style> 