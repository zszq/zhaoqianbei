<template>
  <div class="container">
    <v-title :title="title"></v-title>
    <div class="pageErrors">
      <i class="iconfont icon-pageError"></i>
      <p>页面不存在，<span>{{sendMsg}}s</span>后回到大课！</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: "pageError",
    data() {
      return {
        title: {
          text: "页面错误",
          back: false
        },
        num: 3, //倒计时秒数,
        timer: {} //定时器挂到VUE上
      }
    },
    computed: {
      sendMsg: function () {
        //计算返回传递给组件的消息内容
        return this.num;
      }
    },
    mounted() {
      //设置倒计时定时器
      this.timer = setInterval(() => {
        this.num--;
        if (this.num === 0) {
          clearInterval(this.timer)
          this.$router.replace('/')
        }
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)  //页面销毁时同时清除定时器
    }
  }
</script>
<style lang="stylus" scoped>
  .pageErrors
    position relative
    margin-top 30%
    text-align center
    i 
      font-size 1.365333rem
    p 
      margin-top .170667rem
      span 
        color red
        font-size .3072rem
</style>

