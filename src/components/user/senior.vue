<template>
  <div class='h-senior'>
    <v-title :title="title"></v-title>
    <div class="wrap">
      <div v-if="!isQian" class="noQian">
        <div class="content">
          <p>还不是前辈，请先认证前辈！</p>
          <button @click="certification">前往认证</button>
        </div>
      </div>
      <div v-else>
        <div v-if="list.length==0 ? true : false" class='noXue'>
          <p>你还没有学员！</p>
        </div>
        <div v-else>
          <ul>
            <li v-for="(item, index) in list" :key="index" class="xueyuan">
              <div class="xue-left">
                <div class="portrayal">
                  <img :src="item.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null;">
                </div>
                <div class="name-time">
                  <p class='fc4'>{{item.user_name}}</p>
                  <p>{{item.baishi_time | formatDate}}</p>
                </div>
              </div>
              <div class="btn">
                <span v-if="item.s_state == 1 ? true : false">已确认</span>
                <span v-else style="color:#199f96">待确认</span>
              </div>
              <div class="btn">
                <span v-if="item.jiaokuan == 1 ? true : false">已付款</span>
                <span v-else style="color:#199f96">待付款</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'senior',
    data() {
      return {
        title: {
          text: "我的学员",
          back: true
        },
        isQian: true, // 是否前辈
        list: [] // 学员信息
      }
    },
    methods: {
      // 去认证前辈
      certification() {
        this.$router.push("certification");
      },
      // 请求学员
      get_xue() {
      let token = sessionStorage.getItem("token");
      // 请求学员信息
      this.$axios.get(`/api/Index/xueyuan/token/${token}`)
      .then((response) => {
        // console.log(response);
        if (response.data.ret_msg == -1) {
          this.isQian = false;
        } else {
          this.list = response.data.data;
        }
      })
      .catch((error) => {
        console.log(error);
        this.$toast("网络错误!");
      })
    },
    },
    filters: {
      formatDate(time) {
        var unixTimestamp = new Date( time * 1000 );
        Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
        };
        return unixTimestamp.toLocaleString();
      }
    },
    created() {
      this.get_xue();
    }
  }
</script>

<style lang='stylus' scoped>
  .h-senior
    .wrap
      position absolute
      top .682667rem
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      .noQian
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        width 100%
        height 100%
        background-color #fff
        .content
          position absolute
          position absolute
          top 30%
          left 50%
          transform translateX(-50%)
          width 80%
          text-align center
        p
          margin 0.170667rem 0
        button
          padding 0.085333rem 0.170667rem
          color #199f96
          font-size 0.273067rem
          background-color #fff
          border 1px solid #199f96
          outline none
          border-radius 0.0512rem
          cursor pointer
      .noXue
        text-align center
        color #009988
        position absolute
        top 30%
        left 50%
        transform translateX(-50%)
      .xueyuan
        display flex;
        align-items center;
        justify-content space-between
        padding .256rem .341333rem;
        border-bottom 1px solid #ddd
        background-color #fff
        .xue-left
          display flex
          align-items center
          justify-content space-between
          .portrayal
            width 1.024rem
            height 1.024rem
            margin-right .170667rem
            img
              width 1.024rem
              height 1.024rem




</style>