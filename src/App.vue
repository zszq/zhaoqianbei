<template>
  <div id="app">
    <!-- 显示页面路由 -->
    <keep-alive exclude="message,user,pageError">
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  // 防止刷新页面数据丢失，此处操作就不用频繁保存到sessionStorage而只在刷新的时候保存，性能友好
  created() {
    //在页面刷新时将vuex里的信息保存到sessionStorage里(safari不支持beforeunload用pagehide)
    window.addEventListener("pagehide", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    })
    //在页面加载时读取sessionStorage里的信息保存到vuex里
    if (sessionStorage.getItem("store")) {
      // 在开发阶段，如果在Vuex里添加新的字段，新的字段不能被保存到localStorage里时用Object.assign()合并
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))));
    }
  },
  methods: {
    // 刷新当前页面不白屏
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
      console.log("刷新了");
    }
  }
}
</script>

<style lang="stylus">
  
</style>
