<template>
  <transition name="slide">
    <div class="login">
      <img class="image" src="../../assets/images/logo.png" alt="">
      <div class="login-wrap">
        <h2>登录</h2>
        <P class="tips">{{tips}}</P>
        <input type="text" placeholder="请输入用户名" v-model="userinfo.username" @focus="onFocus">
        <input type="password" placeholder="请输入密码" v-model="userinfo.password" @focus="onFocus">
        <input type="button" value="登录" class="btnLogin" @click="login">
        <p class="remind">
          <span class="forget" @click="goResetPassword">忘记密码？</span>
          没有账号？马上<span class="extra" @click="goRegister">注册</span>
        </p>
      </div>
      <div class="third">
        <p class="third-text">第三方登录</p>
        <p class="third-items">
          <span class="third-item" @click="login_qq">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qq-online"></use>
            </svg>
          </span>
          <span class="third-item" @click="login_weixin">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weixin-online"></use>
            </svg>
          </span>
          <span class="third-item offline" @click="login_weibo">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weibo-offline"></use>
            </svg>
          </span>
        </p>
      </div>
      <!-- 底部导航 -->
      <v-navfoot></v-navfoot>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        userinfo: {
          username:'',
          password:''
        },
        showTips: true,
        tips: ""
      }
    },
    methods: {
      //登录
      login() {
        if(this.userinfo.username == "" || this.userinfo.password == ""){
          this.tips = "请输入用户名或密码";
          this.showTips = true;
        }else{
          //请求登录接口,参数为user_name和password
          let data = {user_name: this.userinfo.username, password: this.userinfo.password};
          let formatData = this.$qs.stringify(data); //序列化数据
          
          this.$axios.post('/api/Index/login', formatData)
          .then((response)=>{
            // console.log(response);
           // 1为成功 0为密码错误 -1账号不存在 -2为未填写
            if(response.data.ret_msg === ""){
              this.showTips = false;
              this.$toast("登录成功！");
              sessionStorage.setItem("isLogin", true); //用户登录信息存储到本地
              sessionStorage.setItem("token", response.data.data.skey); //用户登录token存储到本地
              sessionStorage.setItem("id", response.data.data.id); //用户登录id存储到本地
              // 登录成功，跳转到之前页面，否则跳转到home页
              if(this.$route.query.redirect) {
                let redirect = this.$route.query.redirect; // 导航守卫传进来的登录之前页面路径
                setTimeout(() => {
                  this.$router.replace(redirect);
                }, 1000);
              }else{
                setTimeout(() => {
                  this.$router.replace("/user/home");
                }, 1000);
              }
            }else if(response.data.ret_msg === -1){
              this.tips = "账号不存在！";
              this.showTips = true;
            }else if(response.data.ret_msg === 0){
              this.tips = "密码错误！";
              this.showTips = true;
            }
          })
          .catch((error) => {
            console.log(error);
            this.$toast("网络错误!");
          })
        }
      },
      onFocus() {
        this.tips = "";
        this.showTips = false;
      },
      // 第三方登录
      login_qq() {
        this.$toast("PC端已开放!");
      },
      login_weixin() {
        this.$toast("PC端已开放!");
      },
      login_weibo() {
        this.$toast("暂未开放，敬请期待!");
      },
      // 去注册
      goRegister() {
        this.$router.push("/user/register");
      },
      // 找回密码
      goResetPassword() {
        this.$router.push("/user/verifyCode");
      }
    },
    mounted() {
      // 需要登录的页面跳转到登录页时提醒需要登录
      if(this.$route.query.redirect) {
        this.$toast("请先登录！");
      }
    }
  }
</script>

<style lang='stylus' scoped>
  // 此组件过渡动画
  .slide-enter-active,
  .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translateX(-100%)
  .login
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background-color #fff
    text-align center
    .image
      width 2.389333rem
      height auto
      margin .853333rem auto 0
    .login-wrap
      margin-top .682667rem
      h2
        margin-bottom .341333rem
        color #199f96
      .tips
        padding-bottom .085333rem
        color red
        font-size .238933rem
      input
        display block
        width 4.266667rem
        height .682667rem
        line-height .341333rem
        padding .170667rem
        margin 0 auto
        margin-bottom .170667rem
        outline none
        border 1px solid #888
        box-sizing border-box
        -webkit-appearance none //这两条解决safari圆角问题
        border-radius 0
      .btnLogin
        display block
        margin 0 auto
        padding 0
        width 4.266667rem
        height .682667rem
        line-height .682667rem
        color #fff
        font-size .273067rem
        vertical-align middle
        border none
        background-color #199f96
        margin-bottom .170667rem
      .remind
        padding-top .170667rem
        .extra
          color #199f96
        .forget
          margin-right .170667rem
          color #199f96
    .third
      margin-top .341333rem
      .third-text
        margin-bottom .341333rem
      .third-items
        .third-item
          padding .085333rem
          margin 0 .085333rem
          font-size .512rem
        .offline
          color #666
</style>