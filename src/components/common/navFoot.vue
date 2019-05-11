<template>
  <div class="navFoot">
    <ul class="navFoot-wrapper fc4">
      <router-link 
        class="navFoot-item" 
        v-for="(nav, index) in navs" 
        :key="index"
        tag="li" 
        :to="nav.path"
      >
        <i :class="[nav.icon, 'iconfont']"></i>
        <span class="navFoot-title">{{nav.title}}</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navs: [
          {title: "大课", path: "/dake", icon: "icon-dake"},
          {title: "小课", path: "/xiaoke", icon: "icon-xiaoke"},
          {title: "信息", path: "/message", icon: "icon-message"},
          {title: "用户", path: "/user", icon: "icon-user"}
        ]
      }
    }
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

  .navFoot
    position fixed
    left 0
    bottom 0
    width 100%
    height .853333rem
    background-color #fff
    .navFoot-wrapper
      display flex
      justify-content center
      align-items center
      height .853333rem
      border-top-1px(#ccc)
      .navFoot-item
        flex 1
        text-align center
        cursor pointer
        .iconfont
          display block
          font-size .392533rem
        .navFoot-title
          display block
          font-size .2048rem
      .router-link-active
        .iconfont, .navFoot-title
          color #199f96

</style>