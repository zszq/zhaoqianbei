<template>
  <div class="xiaokeFirsts" ref="scrollBox">
    <div class="box">
      <ul ref="minHeight">
        <li 
          class="item" 
          v-for="(item,index) in xiaokeDetails.xiaokeFirsts" 
          :key="index" 
          @click="showDetail(index)"
          v-fb
        >
          <div class="picture">
            <img :src="item.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
          </div>
          <div class="intro">
            <h2 class="fc4">{{item.name}}</h2>
            <p class="intro-text"><span>{{item.time}}</span></p>
            <p class="intro-text"><span>{{item.address}}</span></p>
            <p class="intro-text">
              <span class="price">￥{{item.discountPrice}}元</span>
              <button class="buy" @click.stop="buy()">购买</button>
            </p>
          </div>
        </li>
      </ul>
      <div class="no-more"><span>-- 没有更多课程 --</span></div>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

  export default {
    data () {
      return {

      }
    },
    methods: {
      // 小课详情
      showDetail(index) {
        this.$store.commit('set_detail', this.xiaokeDetails.xiaokeFirsts[index]);
        this.$router.push("/xiaoke/xiaokeDetails");
      },
      // 购买小课
      buy() {
        if (sessionStorage.getItem("isLogin")) {
          this.$confirm("确认购买？").then(() => {
            this.$toast("请先与该前辈沟通!");
          }).catch(() => {
            this.$toast("购买取消");
          })
        }else{
          this.$toast("请先登录!");
          setTimeout(() => {
            this.$router.push({
              path: "/user/login",
              query: {redirect: "/xiaoke"}
            });
          }, 1200)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true,
          scrollbar: true,
          mouseWheel: true
        })
      })
    },
    props:["xiaokeDetails"]
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

.xiaokeFirsts
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  overflow hidden
  .box
    .item
      display flex
      align-items center
      position relative
      padding .170667rem
      background-color #fff
      border-bottom-1px(#ddd)
      &:last-child
        border-none-1px()
      .picture
        display inline-block
        width 1.365333rem
        height 1.365333rem
        img
          width 1.365333rem
          height 1.365333rem
          vertical-align middle
      .intro
        display inline-block
        margin-left .170667rem
        .intro-text
          line-height .3072rem
          color #666
          .price
            display inline-block
            width 1.706667rem
            line-height .597333rem
            color red
          .buy
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
    .no-more
      width 100%
      height 20%
      color #666
      font-size .238933rem
      text-align center
</style>