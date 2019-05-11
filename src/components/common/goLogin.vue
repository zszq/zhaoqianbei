// 暂未使用，看需求使用
<template>
  <div class='goLogin'>
    <!-- 顶部标题 -->
    <!-- <v-title :title="title"></v-title> -->
    <!-- 内容 -->
    <div class="container">
      <img src="../../assets/images/ProLogo.png" alt="">
      <p>抱歉，你还没有登录，请先登录......</p>
      <button @click="goLogin">去登录</button>
    </div>
    <!-- 底部导航 -->
    <!-- <v-navfoot></v-navfoot> -->
  </div>
</template>

<script>
  export default {
    name: 'goLogin',
    data() {
      return {
        // title: {
        //   text: "去登录",
        //   back: false
        // }
      }
    },
    methods: {
      goLogin() {
        this.$router.push({
          path: "/user/login",
          query: {redirect: "/message/msgList"}
        });
      }
    },
    mounted() {

    }
  }
</script>

<style lang='stylus' scoped>
  .goLogin
      .container
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 90%
        text-align center
        img 
          width 1.706667rem
          height 1.706667rem
        p
          margin .170667rem 0
        button
          padding .085333rem .170667rem
          text-align center
          vertical-align middle
          color #199f96
          font-size .273067rem
          background-color #fff
          border 1px solid #199f96
          outline none
          border-radius 0.0512rem
          cursor pointer
</style>