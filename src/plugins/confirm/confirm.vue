<template>
  <transition name="fade-slide">
    <div class="confirm" v-if="show">
      <div class="confirm-box">
        <div class="title">
          <h3>{{title}}</h3>
        </div>
        <div class="content">
          <p>{{content}}</p>
        </div>
        <div class="btn">
          <span @click="handleAction('confirm')">确认</span>
          <span @click="handleAction('cancel')">取消</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        title: "提示",
        content: "请输入内容",
        promiseStatus: null // 存储promise回调
      }
    },
    methods: {
      handleAction(action) {
        this.show = false;
        this.title = "提示";
        this.content = "请输入内容";
        
        if(action == 'confirm'){
          this.promiseStatus.resolve("confirm");
        }else{
          this.promiseStatus.reject("cancel");
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
.confirm
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  display flex
  justify-content center
  align-items center
  background-color rgba(0,0,0,.4)
  z-index 999
  &.fade-slide-enter-active, &.fade-slide-leave-active
    transition opacity 0.2s
  &.fade-slide-enter, &.fade-slide-leave-to
    opacity 0
  &.fade-slide-enter-active .confirm-box, &.fade-slide-leave-active .confirm-box
    transition all 0.2s
  &.fade-slide-enter .confirm-box, &.fade-slide-leave-to .confirm-box
    opacity 0
    transform translateY(-30%)
  .confirm-box
    width 250px
    background-color #fff
    border-radius 10px
    z-index 1000
    .title
      margin-top 10px
      text-align center
    .content
      padding 15px 10px
      text-align center
      color #000
      line-height 16px
    .btn
      display flex
      justify-content center
      align-items center
      border-top 1px solid #ccc
      span
        display block
        width 100%
        height 45px
        line-height 45px
        text-align center
        color #199f96

</style>