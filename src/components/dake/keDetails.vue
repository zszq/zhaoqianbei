<template>
  <div class="ke-details">
    <!-- 顶部标题 -->
    <v-title :title="title"></v-title>
    <!-- 课程详情 -->
    <div class="ke-wrapper">
      <div class="box">
        <div class="ke-top">
            <div class="ke-quickLook">
              <h2 class="title">{{details.ke_title}}课程</h2>
              <h2 class="title2">{{details.ke_title}}</h2>
              <p class="wrapper">
                <span>
                  <i class="iconfont icon-yuanjia"></i> 原价：<span class="invalid">{{details.ke_price}}元</span>
                </span>
                <span>
                  <i class="iconfont icon-youhuijia"></i> 优惠价：<span class="enable">{{details.ke_dis_price}}元</span>
                </span>
              </p>
              <p class="wrapper">
                <span>
                  <i class="iconfont icon-banjidaxiao"></i> 班级大小：<span>一对一</span>
                </span>
                <span>
                  <i class="iconfont icon-zhouqi"></i> 学习周期：<span>{{details.ke_period}}个月左右</span>
                </span>
              </p>
            </div>
        </div>
        <div class="ke-bottom">
          <div class="ke-intro">
            <h2 class="title"><i class="iconfont icon-jianjie"></i> 课程简介</h2>
            <p>{{details.ke_short_intro}}</p>
          </div>
          <div class="ke-feature">
            <h2 class="title"><i class="iconfont icon-tese"></i> 课程特色</h2>
            <p>{{details.ke_special}}</p>
          </div>
          <div class="ke-detail">
            <h2 class="title"><i class="iconfont icon-xiangqing"></i> 课程详情</h2>
            <p v-html="details.ke_content" ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

  export default {
    data () {
      return {
        title: {
          text: "课程介绍",
          back: true
        },
        details: this.$store.getters.get_detail
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .ke-details
    .ke-wrapper
      position relative
      top .682667rem
      .box
        padding .170667rem
        .iconfont
          font-size .273067rem
        h2.title
          font-size .273067rem
          font-weight 600
          padding-bottom .085333rem
        .ke-top
          background-color #199f96
          color #fff
          margin-bottom .341333rem
          border-radius .085333rem
          .ke-quickLook
            border-radius .085333rem
            padding .170667rem
            .title2
              font-size .512rem
              font-weight 700
              text-align center
              padding-bottom .085333rem
            .wrapper
              display flex
              justify-content space-between
              margin-top .085333rem
            .invalid
              text-decoration line-through
        .ke-bottom
          border-radius .0512rem
          .ke-intro, .ke-feature, .ke-detail
            padding .170667rem
            margin-bottom .341333rem
            border-radius .085333rem
            background-color #fff
            .title
              color #199f96
              font-size .3072rem
          .ke-detail
            margin-bottom 0
            
</style>