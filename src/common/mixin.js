/*
  为了实现代码复用 将这个文件中的内容可以添加进任意组件中
*/
import { debounce  } from './utils'
import BackTop from "components/content/backTop/BackTop";

// 监听GoodsList图片加载的复用
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  // 监听图片加载完成并刷新
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
}

// 回到顶部组件的复用
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  },
}