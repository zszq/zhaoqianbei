<template>
<transition name="fade">
  <div class="toast-box" :class="position" v-if="show">
    <div class="text">
      <span>{{text}}</span>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      text: '请输入内容',
      position: "center"
    }
  }
}
</script>
<style lang="stylus" scoped>
  .toast-box
    position fixed
    left 50%
    transform translate(-50%,-50%)
    display flex
    justify-content center
    align-items center
    width auto
    min-width 60px
    min-height 30px
    padding 5px 10px
    line-height 16px
    color #fff
    background-color rgba(0,0,0,.8)
    border-radius 3px
    z-index 9999
    &.fade-enter-active, &.fade-leave-active
      transition all .2s
    &.fade-enter, &.fade-leave-to
      opacity 0
      transform translate(-50%,-70%)
  .top
    top 10%
  .center
    top 50%
  .bottom
    bottom 10%

</style>
