<template>
  <div class='studied' ref="scrollBox">
    <div class="box">
      <ul>
        <li class="item" v-for="(item, index) in studyEnds" :key="index">
          <h2>前辈拒收</h2>
          <div class="information">
            <img :src="studyEnds[index].u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
            <div class="intro">
              <h3 class="name">{{studyEnds[index].user_name}}</h3>
              <p class="qq">qq: {{studyEnds[index].qq}}</p>
              <p class="phone">手机: {{studyEnds[index].phone}}</p>
              <p class="course">课程: {{studyEnds[index].q_k_name}}</p>
              <p class="price">价格: {{studyEnds[index].s_price}}元</p>
              <p class="performance">
                已带<span>{{studyEnds[index].allStuEnd}}</span>人 | 
                在带<span>{{studyEnds[index].allStuIng}}</span>人 | 
                好评<span>{{studyEnds[index].q_zan}}</span>
              </p>
            </div>
          </div>
          <div class="datum">
            <h3>基本资料</h3>
            <p class="company">
              公司: <span>{{studyEnds[index].q_company}}</span>
            </p>
            <p class="joinTime">
              工作经验: <span>{{studyEnds[index].q_join_time}}</span>
            </p>
            <p class="skill">
              擅长技术: <span>{{studyEnds[index].q_k_f_name}}</span>
            </p>
            <p class="intro">
              介绍: <span>{{studyEnds[index].q_intro}}</span>
            </p>
          </div>
          <div class="findings">
            <p>已取消</p>
          </div>
        </li>
      </ul>
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

    },
    mounted() {
      this.$nextTick(() =>{
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true,
          scrollbar: true, // 显示滚动条
          mouseWheel: true // 开启鼠标滚轮
        })
      })
    },
    created() {

    },
    components: {

    },
    props:['studyEnds']
  }
</script>

<style lang='stylus' scoped>
  .studied
    position absolute
    top .682667rem
    left 0
    right 0
    bottom 0
    overflow hidden
    .box
      padding .256rem 0
      .item
        margin 0 .170667rem .341333rem
        padding .170667rem
        background-color #fff
        border-radius .085333rem
        h2
          text-align center
        .information
          margin-top .170667rem
          padding .085333rem 0
          border-bottom 1px solid #f1f1f1
          img 
            width 1.365333rem
            height 1.365333rem
            margin 0 .170667rem
            border-radius 50%
            vertical-align middle
          .intro
            display inline-block
            vertical-align middle
            p
              margin-top .0512rem
              span
                color red
        .datum
          padding .085333rem 0
          border-bottom 1px solid #f1f1f1
          p
            margin-top .0512rem
            span
              color #666
        .findings
          display flex
          justify-content space-around
          p
            text-align center
            padding .170667rem
            color #aaa
            font-weight 600
            border-radius .085333rem
</style>