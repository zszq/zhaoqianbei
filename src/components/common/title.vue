<template>
  <div class='title-bar'>
    <div class="title-box fc0">
      <span class="arrow" @click="goBack" v-if="title.back"></span>
      <h2 class="title">{{title.text}}</h2>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack() {
        // this.$router.goBack(); // 路由配置时添加的goBack方法
        this.$router.back();
      }
    },
    props:["title"]
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

  .title-bar
    position fixed
    top 0
    left 0
    width 100%
    height .682667rem
    line-height .682667rem
    text-align center
    background-color #fff
    z-index 9
    .title-box
      width 100%
      height .682667rem
      line-height .682667rem
      text-align center
      color #444
      background-color #fff
      border-bottom-1px(#ddd)
      .arrow
        position absolute
        top 0
        left 0rem
        margin-left .085333rem
        width .682667rem
        height .682667rem
        cursor pointer
        &:before, &:after
          content ""
          position absolute
          left 0
          top .170667rem
          border .170667rem solid transparent
          border-right-color #444
        &:after
          border-right-color #fff
          left .034133rem
      .title
        display inline-block
        font-weight normal
</style>