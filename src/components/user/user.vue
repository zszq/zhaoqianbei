<template>
  <div class="user">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="router-child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "user",
    data () {
      return {
        transitionName: ""
      }
    },
    mounted() {
      
    },
    watch: {
      $route(to, from) {
        if(to.meta.index < from.meta.index) {
          this.transitionName = "slide-right"
        } else {
          this.transitionName = "slide-left"
        }
      }
    },
    // watch: {
    // '$route' (to, from){
    //     let isBack = this.$router.isBack;
    //     if(isBack) {
    //       this.transitionName = 'slide-right';
    //     } else {
    //       this.transitionName = 'slide-left';
    //     }
    //     this.$router.isBack = false
    //   }
    // }
  }
</script>

<style lang='stylus' scoped>
  // 第一种动画
  .router-child-view
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    transition all 0.3s
  .slide-left-enter,
  .slide-right-leave-active 
    opacity 0
    transform translate(100%, 0)
  .slide-left-leave-active,
  .slide-right-enter 
    opacity 0
    transform translate(-30%, 0)

  // 第二种动画
  // .router-child-view
  //   position absolute
  //   left 0
  //   top 0
  //   width 100%
  //   height 100%
  //   transition all 0.5s cubic-bezier(0.55, 0, 0.1, 1)
  // .slide-left-enter,
  // .slide-right-leave-active 
  //   opacity 0
  //   transform translate(50px, 0)
  // .slide-left-leave-active,
  // .slide-right-enter 
  //   opacity 0
  //   transform translate(-50px, 0)
</style>