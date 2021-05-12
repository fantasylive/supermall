<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navClick="navClick" ref="nav" />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @contentScroll="contentScroll"
    >
      <detail-swiper :topSwiperImages="topSwiperImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goodsList="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart" />

    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import {
  getItemInfo,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from 'network/detail'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { mapActions } from 'vuex'

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './childComps/DetailBottomBar'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topSwiperImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemOffsetTop: []
    }
  },
  // 生命周期函数, 组件创建时调用
  created() {
    this.iid = this.$route.params.iid
    this.getItemInfo(this.iid)
    this.getRecommend()
  },
  mounted() {},
  // 组件销毁时停止对事件总线上对应事件的监听
  destroyed() {
    // 第二个参数是为了将指定的函数取消, 否则会取消掉监听itemImgLoad的全部函数
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    // 将vuex中的actions.js中的方法映射到这里
    ...mapActions(['addCart']),

    /* 监听事件 */
    imageLoad() {
      this.$refs.scroll.refresh()

      // 图片加载完成后保存offsetTop
      this.itemOffsetTop = []
      this.itemOffsetTop.push(0)
      this.itemOffsetTop.push(this.$refs.params.$el.offsetTop)
      this.itemOffsetTop.push(this.$refs.comment.$el.offsetTop)
      this.itemOffsetTop.push(this.$refs.recommend.$el.offsetTop)
    },
    // 导航点击对应的item滚动到对应位置
    navClick(index) {
      this.$refs.scroll.scrollTo(0, -this.itemOffsetTop[index], 100)
    },
    // 监听滚动使当前展示内容和导航联动/回到顶部组件是否显示
    contentScroll(position) {
      let positionY = -position.y
      if (
        positionY < 0 ||
        (positionY >= this.itemOffsetTop[0] &&
          positionY < this.itemOffsetTop[1])
      ) {
        this.$refs.nav.currentIndex = 0
      } else if (
        positionY >= this.itemOffsetTop[1] &&
        positionY < this.itemOffsetTop[2]
      ) {
        this.$refs.nav.currentIndex = 1
      } else if (
        positionY >= this.itemOffsetTop[2] &&
        positionY < this.itemOffsetTop[3]
      ) {
        this.$refs.nav.currentIndex = 2
      } else {
        this.$refs.nav.currentIndex = 3
      }

      this.listenShowBackTop(position)
    },
    // 监听点击添加到购物车, 将当前商品数据添加到vuex中
    addToCart() {
      const product = {}
      product.image = this.topSwiperImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.$route.params.iid
      // 使用vuex映射的 actons.js中的方法将数据添加到store中 Promise监听添加操作完成后进行弹窗提示
      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    },

    /* 请求数据相关方法 */
    getItemInfo(iid) {
      // 获取首页数据并保存
      getItemInfo(iid).then((res) => {
        const data = res.result
        // 保存顶部轮播图数据
        this.topSwiperImages = data.itemInfo.topImages
        // 保存商品详情数据
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )
        // 保存店铺数据
        this.shop = new Shop(data.shopInfo)
        // 保存商品展示的图片等数据
        this.detailInfo = data.detailInfo
        // 商品参数数据
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )
        // 评论数据
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // // 当数据更新了，在dom中渲染后，自动执行该函数, 但是不能确定图片是否加载完成
        // this.$nextTick(() => {
        //   this.itemOffsetTop = []

        //   this.itemOffsetTop.push(0)
        //   this.itemOffsetTop.push(this.$refs.params.$el.offsetTop)
        //   this.itemOffsetTop.push(this.$refs.comment.$el.offsetTop)
        //   this.itemOffsetTop.push(this.$refs.recommend.$el.offsetTop)
        // })
      })
    },
    // 获取推荐数据
    getRecommend() {
      getRecommend().then((res) => {
        this.recommends = res.data.list
      })
    }
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  /* 防止详情页出现滚动条 */
  overflow: hidden;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: white;
}
.content {
  height: calc(100% - 102px);
  position: relative;
  z-index: 8;
  background-color: white;
}
.bottom-bar {
  position: relative;
  z-index: 9;
}
</style>