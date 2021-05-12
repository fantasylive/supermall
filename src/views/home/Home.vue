<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        class="tab-control-fixed"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        v-show="isTabFixed"

      />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @contentScroll="contentScroll"
      :pull-up-load="true"
      @pullingUp = 'loadMore'
    >
      <home-swiper :banners="banners" @imageLoad = 'swiperImageLoad' />
      <home-recommend :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods-list="showGoods" />
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>

<script>
import { getHomeMultidata, getHomeData } from 'network/home'
// import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'

import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop
  },
  mixins: [itemListenerMixin, backTopMixin],
  // 将请求过来的数据保存
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      // 是否显示回到顶部组件
      // isShowBackTop: false,
      // tabControl的offsetTop
      tabOffsetTop: 0,
      // 吸顶的tabControl是否显示
      isTabFixed: false,
      // 离开home时保存当前滚动位置
      saveScrollY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 生命周期函数 在组件创建好后触发
  created() {
    // 请求轮播图和推荐的数据
    this.getHomeMultidata()

    // 请求分类的数据
    this.getHomeData('pop')
    this.getHomeData('new')
    this.getHomeData('sell')
  },
  // 生命周期函数 在组件挂载完成后触发
  mounted() {
    // 防抖在mixin中

    // // 进行防抖
    // const refresh = debounce(this.$refs.scroll.refresh, 200)
    // // 监听GoodsListItem图片是否加载完成
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh()
    // })
  },
  // 组件活跃时执行
  activated() {
    // 将页面滚动到离开时保存的位置并刷新
    this.$refs.scroll.scrollTo(0, this.saveScrollY, 0)
    this.$refs.scroll.refresh()
  },
  // 组件由活跃变为不活跃时执行
  deactivated() {
    // 离开时将页面滚动的位置保存
    this.saveScrollY = this.$refs.scroll.getScrollY()
    // 组件不活跃时停止对对应事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    /*
      监听事件相关方法
    */

    // 监听分类的切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 两个tabControl高亮显示一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 回到顶部
    // backTop() {
    //   // 从scroll组件中调用scrollTo方法
    //   this.$refs.scroll.scrollTo(0, 0)
    // },
    // 回到顶部图标是否显示的判断/tabControl是否吸顶
    contentScroll(position) {
      // this.isShowBackTop = -position.y > 1000
      this.listenShowBackTop(position)
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeData(this.currentType)
      // 完成上拉加载后刷新
      // this.$refs.scroll.scroll.refresh()
    },
    // homeSwiper加载完成后获取tabControl的offsetTop
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /* 
      网络请求相关方法
    */

    // 请求轮播图和推荐的数据的封装
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },

    // 请求分类的数据的封装
    getHomeData(type) {
      // 当前请求的页码为当前页码+1
      const page = this.goods[type].page + 1
      getHomeData(type, page).then((res) => {
        // 使用spread语法将请求的数据进行保存
        this.goods[type].list.push(...res.data.list)
        // 当前页码+1
        this.goods[type].page += 1
        // better-scroll完成此次上拉加载
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*
    防止轮播图被fixed后的navbar挡住(使用浏览器默认滚动时)
   */
  /* padding-top: 44px; */
  /* 
    vh是视窗百分比, 100vh就是高度和当前视窗一样, 
  */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* 使用浏览器默认滚动时的样式 */
  /* position: fixed;
  top: 0;
  width: 100%;
  z-index: 9; */
}
/* 使用浏览器默认滚动时的吸顶效果 */
/* .tab-control {
  position: sticky;
  top: 44px;
} */
.content {
  /* 滚动区域设置为绝对定位时，吸顶的tabControl只需要设置为相对定位提高元素层级即可，不需要脱离文档流 */
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0; */
  /* 
    -49px是因为上面home设置了padding-top即上面的navbar可以看作home的内容, 
    所以只减去下面tabbar的高度即可 
  */
  height: calc(100% - 93px);
  overflow: hidden;
}
/* 设置吸顶的tabControl的层级 */
/* 类名不设置为tab-control是因为vue会给组件默认添加和组件标签名相同的类名，设置为tab-control会影响原先的tabControl */
.tab-control-fixed{
  /*  
    滚动区域没有脱离文档流时，此时如果只设置相对定位并提高元素层级，
    因为都在文档流中，会导致吸顶tabControl显示出来时把原先的tabControl向下挤，
    导致两个tabControl同时出现的情况
    所以滚动区域没有设置绝对定位时，吸顶的tabControl要设置为绝对定位，防止和原先的tabControl冲突
  */
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  z-index: 9;
}
</style>