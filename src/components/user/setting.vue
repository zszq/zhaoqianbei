<template>
  <div class="setting">
    <v-title :title="title"></v-title>
    <div class="scrollBox" ref="scrollBox">
      <div class="box">
        <div class="items" @click="newMsg" v-fb>
          <span>新消息</span>
          <span class="more">＞</span>
        </div>
        <div class="items mt" @click="resetNickname" v-fb>
          <span>修改昵称</span>
          <span class="more">＞</span>
        </div>
        <div class="items" @click="resetPassword" v-fb>
          <span>重置密码</span>
          <span class="more">＞</span>
        </div>
        <div class="items mt" @click="clearCache" v-fb>
          <span>清除缓存</span>
          <span class="more">＞</span>
        </div>
        <div class="items" @click="feedback" v-fb>
          <span>意见反馈</span>
          <span class="more">＞</span>
        </div>
        <div class="items mt logout" @click="logout" v-fb>
          <span>退出登录</span>
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
          text: "设置",
          back: true
        },
        transitionName: "slide30"
      }
    },
    // inject: ["reload"],
    methods: {
      //退出登录
      logout() {
        this.$confirm("确定退出？").then(() => {
          this.$axios.get('/api/Index/loginout')
          .then((response) => {
            if(response.data.ret_msg == 1) {
              this.$toast("退出成功");
              this.$router.push("/user/login");
              sessionStorage.removeItem("isLogin"); // 删除本地存储的用户登录信息
            }
          })
          .catch((error) => {
            console.log(error);
            this.$toast("网络错误!");
          })
        }).catch((error) => {
          return;              
        })
      },
      // 跳转到新消息
      newMsg(){
        this.$router.push("/message");
      },
      // 跳转到修改昵称
      resetNickname(){
        this.transitionName = "slide";
        this.$router.push("/user/resetNickname");
      },
      // 跳转到重置密码
      resetPassword() {
        this.transitionName = "slide";
        this.$router.push("/user/verifyCode");
      },
      // 清除缓存
      clearCache(){
        this.$confirm("清除缓存会刷新页面！").then(() => {
          this.$toast("清除缓存成功！");
          setTimeout(() => {
            this.$router.go(0);
          }, 500);
          // this.reload(); // 只是当前页面刷新了
        }).catch(() => {
          return;
        })
      },
      // 意见反馈
      feedback(){
        this.$toast("暂未开放！");
      }
    },
    mounted() {
      this.$nextTick(() =>{
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true
        })
      })
    }
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

.scrollBox
  position absolute
  top .682667rem
  left 0
  right 0
  bottom 0
  overflow hidden
  .box
    padding .170667rem 0
    .items
      clear both
      padding 0 .170667rem
      height .853333rem
      line-height .853333rem
      background #fff
      border-top-1px(#ddd)
      cursor pointer
      .more
        float right
        color #bbb
        margin-right .085333rem
    .mt
      margin-top .341333rem
    .logout
      color red
      text-align center

</style>