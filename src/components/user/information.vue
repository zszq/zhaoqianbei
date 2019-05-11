<template>
  <div class="h-information">
    <v-title :title="title"></v-title>
    <div class="scrollBox" ref="scrollBox">
      <div class="box">
        <div class="portrait" v-fb>
          <span>头像</span>
          <span class="f-right"><img :src="userInfo.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null;"></span>
        </div>
        <div class="nickname" v-fb>
          <span>昵称</span>
          <span class="f-right">{{userInfo.user_name}}</span>
        </div>
        <div class="recommend" v-fb>
          <span>推荐码</span>
          <span class="f-right">{{userInfo.t_code}}</span>
        </div>
        <div class="phone" v-fb>
          <span>手机号</span>
          <span class="f-right">{{userInfo.phone}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

  export default {
    data() {
      return {
        userInfo: {},
        title: {
          text: "个人资料",
          back: true
        }
      }
    },
    methods: {
      
    },
    mounted() {
      this.userInfo = this.$store.getters.get_detail;
      
      this.$nextTick(() =>{
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true
        })
      })
    }
  }
</script>

<style lang='stylus' scoped>
  .h-information
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    .scrollBox
      position absolute
      top .682667rem
      left 0
      right 0
      bottom 0
      overflow hidden
      .box
        padding .170667rem 0
        .f-right
          float right
        .portrait, .nickname, .recommend, .phone
          clear both
          padding 0 .170667rem
          height .768rem
          line-height .768rem
          background #fff
          border-bottom 1px solid #f1f1f1
        .portrait
          span
            width .682667rem
            height .682667rem
            img
              width .682667rem
              height .682667rem
              vertical-align middle
              border-radius 50%
        .phone
          margin-top .341333rem

</style>