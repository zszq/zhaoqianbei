<template>
  <div class='studied' ref="scrollBox">
    <div class="box">
      <!-- 等待前辈确认 -->
      <ul>
        <li class="item" v-for="(item, index) in studyIngs" :key="index">
          <h2>等待前辈确认</h2>
          <div class="information">
            <img :src="studyIngs[index].u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
            <div class="intro">
              <h3 class="name">{{studyIngs[index].user_name}}</h3>
              <p class="qq">qq: {{studyIngs[index].qq}}</p>
              <p class="phone">手机: {{studyIngs[index].phone}}</p>
              <p class="course">课程: {{studyIngs[index].q_k_name}}</p>
              <p class="price">价格: {{studyIngs[index].s_price}}元</p>
              <p class="performance">
                已带<span>{{studyIngs[index].allStuEnd}}</span>人 | 
                在带<span>{{studyIngs[index].allStuIng}}</span>人 | 
                好评<span>{{studyIngs[index].q_zan}}</span>
              </p>
            </div>
          </div>
          <div class="datum">
            <h3>基本资料</h3>
            <p class="company">
              公司: <span>{{studyIngs[index].q_company}}</span>
            </p>
            <p class="joinTime">
              工作经验: <span>{{studyIngs[index].q_join_time}}</span>
            </p>
            <p class="skill">
              擅长技术: <span>{{studyIngs[index].q_k_f_name}}</span>
            </p>
            <p class="intro">
              介绍: <span>{{studyIngs[index].q_intro}}</span>
            </p>
          </div>
          <div class="findings">
            <p>待确认</p>
            <p @click="stopStudy(index)">不学了</p>
          </div>
        </li>
      </ul>
      <!-- 付款成功 -->
      <ul>
        <li class="item" v-for="(item, index) in payments" :key="index">
          <h2>付款成功</h2>
          <div class="information">
            <img :src="payments[index].u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
            <div class="intro">
              <h3 class="name">{{payments[index].user_name}}</h3>
              <p class="qq">qq: {{payments[index].qq}}</p>
              <p class="phone">手机: {{payments[index].phone}}</p>
              <p class="course">课程: {{payments[index].q_k_name}}</p>
              <p class="price">价格: {{payments[index].s_price}}元</p>
              <p class="performance">
                已带<span>{{payments[index].allStuEnd}}</span>人 | 
                在带<span>{{payments[index].allStuIng}}</span>人 | 
                好评<span>{{payments[index].q_zan}}</span>
              </p>
            </div>
          </div>
          <div class="datum">
            <h3>基本资料</h3>
            <p class="company">
              公司: <span>{{payments[index].q_company}}</span>
            </p>
            <p class="joinTime">
              工作经验: <span>{{payments[index].q_join_time}}</span>
            </p>
            <p class="skill">
              擅长技术: <span>{{payments[index].q_k_f_name}}</span>
            </p>
            <p class="intro">
              介绍: <span>{{payments[index].q_intro}}</span>
            </p>
          </div>
          <div class="findings">
            <p>已付款</p>
            <p @click="$toast('请前往网页端操作')">网页端退款</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"
import qs from "qs"

  export default {
    data () {
      return {

      }
    },
    methods: {
      // 不学了
      stopStudy(index) {
        let s_id = this.studyIngs[index].s_id;
        let data = {id: s_id}
        let formatData = qs.stringify(data); //序列化数据

        this.$confirm("是否取消拜师？").then(() => {
          this.$axios.post('/api/Ajax/buxue', formatData)
          .then((response) => {
            console.log(response)
            if(response.data.ret_msg == 1) {
              this.$toast("取消成功!");
              this.$parent.get_mySenior(); // 重新请求我的前辈数据数据
              setTimeout(() => {
                this.$router.go(0); // 刷新页面
              }, 500);
            }else{
              this.$toast("请稍后再试!");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$toast("网络错误!");
          })
        }).catch(() => {
          return;
        })
      }
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
    props:['studyIngs','payments']
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
            font-size .238933rem
            span
              color #666
        .findings
          display flex
          justify-content space-around
          p
            text-align center
            padding .170667rem
            color #199f96
            font-weight 600
            border-radius .085333rem
            cursor pointer


</style>