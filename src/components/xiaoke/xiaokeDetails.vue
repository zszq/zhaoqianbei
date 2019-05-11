<template>
  <div class="xiaokeDetails">
    <div class="container">
      <!-- 顶部标题 -->
      <v-title :title="title"></v-title>
      <span class="talk" @click="goTalk"><i class="iconfont icon-liaotian"></i></span>
      <!-- 前辈详情 -->
      <div class="wrapper" ref="scrollBox">
        <div class="box">
          <div class="intro">
            <p>发布时间: {{details.creatTime | formatDate}}</p>
            <h2 class="intro-title">{{details.name}}</h2>
            <p class="intro-tips">
              <span>原价: {{details.price}}元</span>
              <span>优惠价: {{details.discountPrice}}元</span>
              <span>开课时间: {{details.time}}</span>
            </p>
          </div>
          <div class="detailWrap">
            <h2><i class="iconfont icon-xiangqing"></i> 课程详情</h2>
            <div class="qianbei">
              <div class="picture">
                <img :src="details.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
              </div>
              <div class="info">
                <p>发布者：{{details.user_name}}</p>
                <p>电话：{{details.phone}}</p>
                <p>邮箱：{{details.email}}</p>
              </div>
            </div>
            <div class="content">
              <h3>课程名：</h3>
              <p>{{details.name}}</p>
              <h3>开课人数：</h3>
              <p>{{details.team}}人以上</p>
              <h3>地址：</h3>
              <p>{{details.address}}</p>
              <h3>知识点及要求：</h3>
              <div class="describe" v-html="details.content"></div>
            </div>
          </div>
          <div class="tips"><span>-- 更多详情请咨询前辈 --</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

  export default {
    name: "xiaokeDetails",
    data () {
      return {
        title: {
          text: "前辈详情",
          back: true
        },
        details: this.$store.getters.get_detail
      }
    },
    methods: {
      // 去聊天
      goTalk() {
        this.$router.push({
          name: "dialogue",
          params: {
            uid: this.details.u_id,
            qian_name: this.details.user_name
          }
        })
      },
      _initScroll() {
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true,
          mouseWheel: true, // 开启鼠标滚轮
        })
      }
    },
    mounted() {
      this.$nextTick(() =>{
        this._initScroll();
      })
    },
    filters: {
      formatDate(time) {
        var unixTimestamp = new Date( time * 1000 );
        function week(w) {
          switch(w) {
            case 0 : 
              return "星期日";
              break;
            case 1 : 
              return "星期一";
              break;
            case 2 : 
              return "星期二";
              break;
            case 3 : 
              return "星期三";
              break;
            case 4 : 
              return "星期四";
              break;
            case 5 : 
              return "星期五";
              break;
            case 6 : 
              return "星期六";
              break;
          }
        }
        Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + week(this.getDay()) + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
        };
        return unixTimestamp.toLocaleString();
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .xiaokeDetails
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    width 100%
    height 100%
    z-index 1000
    .container
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      width 100%
      height 100%
      overflow hidden
      .iconfont
        font-size .273067rem
      .talk
        position absolute
        top 0
        right 0
        width .682667rem
        height .682667rem
        line-height .682667rem
        color #199f96
        z-index 9
        .icon-liaotian
          font-size .341333rem
      .wrapper
        position absolute
        top .682667rem
        bottom 0rem
        width 100%
        overflow hidden
        .box
          padding .170667rem
          .intro
            padding .085333rem .170667rem
            color #fff
            background-color #199f96
            border-radius .085333rem
            .intro-title 
              margin .341333rem 0
              text-align center
              font-size .426667rem
            .intro-tips
              display flex
              justify-content space-between
              font-size .221867rem
          .detailWrap
            padding .085333rem .170667rem
            margin-top .170667rem
            background-color #fff
            border-radius .085333rem
            h2 
              color #199f96
              font-size .3072rem
            h3
              margin-top .170667rem
            .qianbei
              display flex
              align-items center
              padding .170667rem 0
              border-bottom .017067rem solid #ccc
              .picture
                display inline-block
                width 1.024rem
                height 1.024rem
                img 
                  width 1.024rem
                  height 1.024rem
              .info
                display inline-block
                margin-left .170667rem
            .content
              padding .170667rem 0
          .tips
            margin .170667rem 0
            text-align center
            color #666


</style>