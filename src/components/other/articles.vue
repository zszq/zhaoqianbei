<template>
  <div class='articles'>
    <h1>{{data.post_title}}</h1>
    <div class="info">
      <div class="info-left">
        <img :src="data.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
      </div>
      <div class="info-right">
        <div class="name">
          <span>{{data.user_name}}</span>
        </div>
        <div class="information">
          <div class="time">
            <i class="iconfont icon-zhouqi"></i>
            <span>{{data.post_time | formatDate}}</span>
          </div>
          <div>
            <i class="iconfont icon-banjidaxiao"></i>        
            <span>{{data.post_click}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-html="data.post_content"></div>
    <div class="footer">
      <p class="home" @click="goHome">找前辈首页<span class="arrow">>></span></p>
      <p class="tips">学编程，教编程，当然找前辈！<br/>6500元，手把手，教到就业满意为止！</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'articles',
    data() {
      return {
        data: {},
        // path: ""
      }
    },
    methods: {
      get_articles() {
        // console.log(this.$route.params.id)
        this.$axios.get(`/api/index/jishuDetail/id/${this.$route.params.id}`).then((res) => {
          // console.log(res);
          this.data = res.data.data;
          document.title = this.data.post_title;
        }).catch((error) => {
          console.log(error);
          this.$toast("网络错误！");
        })
      },
      goHome() {
        this.$router.push("/dake");
      }
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
    },
    created() {
      this.get_articles();
    },
    // beforeRouteEnter (to, from, next) {
    //   // console.log(to.path);
    //   next(vm => {
    //     vm.path = to.path;
    //   })
    // }
  }
</script>

<style lang='stylus' scoped>
.articles
  background-color #fff
  padding .341333rem
  color #333
  font-size .273067rem
  h1
    font-size .4096rem
    font-weight normal
  .info
    display flex
    align-items center
    margin-top .170667rem
    .iconfont
      font-weight bold
      font-size .238933rem
    .info-left
      width .768rem
      height .768rem
      margin-right .085333rem
      img 
        width .768rem
        height .768rem
        border-radius 50%
    .info-right
      .name
        margin-bottom .085333rem
        font-weight bold
      .information
        display flex
        color #9f9f9f
        font-size .238933rem
        .time
          margin-right .512rem
  .content
    width 100%
    overflow hidden
  .content >>> p
    margin-top .170667rem
  .footer
    margin-top .341333rem
    .home 
      padding .085333rem 0
      color #199f96
    .tips
      font-size .256rem
</style>