<template>
  <div class="tab-control">
      
    <!-- 用户点击时高亮显示 -->
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{ Active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      // currentIndex为几, 对应index的标签就高亮显示
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  padding: 10px 0 10px;
  background-color: white;
}
.tab-control-item {
  flex: 1;
}
.Active {
  color: var(--color-high-text);
}
.Active span {
  border-bottom: 3px solid var(--color-tint);
  padding: 5px;
}
</style>