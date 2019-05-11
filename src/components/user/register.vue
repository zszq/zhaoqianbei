<template>
  <div class='register'>
    <img class="image" src="../../assets/images/logo.png" alt="">
    <div class="register-wrap">
      <h2>注册</h2>
      <P class="tips" v-show="showTips">{{tips}}</P>
      <input type="number" placeholder="请输入手机号" v-model="phoneNumber" @focus="onFocus">
      <div class="verifyBox">
        <input type="number" placeholder="请输入验证码" class="textVerifyCode" v-model="verifyCode">
        <input type="button" class="btnVerifyCode" @click="sendVerifyCode" v-model="btnContent">
      </div>
      <input type="button" value="注册" class="btnRegister" @click="register">
      <p class="remind">
        <span class="protocol" @click="goProtocol">《服务条款》</span>
        已有账号？马上<span class="extra" @click="goLogin">登录</span>
      </p>
    </div>
    <!-- 底部导航 -->
    <v-navfoot></v-navfoot>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data() {
      return {
        phoneNumber: "",
        verifyCode: "",
        showTips: false,
        tips: "",
        btnContent: "发送验证码",
        VerifyTime: 60, // 验证重发时间
        VerifyState: true // 防止重复点击发送验证码
      }
    },
    methods: {
      //注册
      register() {
        let data = {'shouji': this.phoneNumber,'verifycode': this.verifyCode}
        let formatData = this.$qs.stringify(data); //序列化数据
        // 返回值 0验证码错误  1注册成功 -1注册失败 -2验证码未填写 -3手机号已注册
        this.$axios.post('/api/Ajax/register', formatData)
        .then((response)=>{
          if(response.data.ret_msg == 1) {
            this.$toast("注册成功,请登录！");
            this.showTips = false;
            this.tips = "";
            // 一秒后跳转到登录页
            setTimeout(function(){
              this.$router.push("/user/login");
            }.bind(this), 1000)
          }else if(response.data.ret_msg == 0) {
            this.tips = "验证码错误！";
            this.showTips = true;
          }else if(response.data.ret_msg == -1) {
            this.tips = "注册失败，请重试！";
            this.showTips = true;
          }else if(response.data.ret_msg == -2) {
            this.tips = "验证码为空,请重试！";
            this.showTips = true;
          }else if(response.data.ret_msg == -3) {
            this.tips = "手机号已注册，请登录！";
            this.showTips = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast("请检查网络!");
        })
      },
      //发送验证码
      sendVerifyCode() {
        if(this.VerifyState){
          this.VerifyState = false;
          // 手机号正则验证
          var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if(reg.test(this.phoneNumber)) {
            // 请求验证码接口
            let data = {'phone': this.phoneNumber}
            let formatData = this.$qs.stringify(data); //序列化数据

            this.$axios.post('/api/Api/sendPhoneCpCode', formatData)
            .then((response)=>{
              if(response.data.ret_msg == 1){
                this.$toast("发送成功！");
                this.showTips = false;
                this.tips = "";
                //倒计时
                var timer = setInterval(() => {
                  this.VerifyTime --;
                  this.btnContent = this.VerifyTime + "秒后重发";
                  if(this.VerifyTime <= 0) {
                    clearInterval(timer);
                    this.btnContent = "发送验证码";
                    this.VerifyTime = 60;
                    this.VerifyState = true;
                  }
                }, 1000)
              }else if(response.data.ret_msg == 0) {
                this.tips = "手机号码错误！";
                this.showTips = true;
                this.btnContent = "重新发送";
                this.VerifyState = true;
              }else if(response.data.ret_msg == -1){
                this.tips = "手机号码未输入！";
                this.showTips = true;
                this.btnContent = "重新发送";
                this.VerifyState = true;
              }
            })
            .catch((error) => {
              console.log(error);
              this.$toast("网络错误!");
            })
          }else{
            this.tips = "手机号码错误！";
            this.showTips = true;
            this.VerifyState = true;
          }
        }
      },
      goProtocol() {
        this.$router.push("/user/protocol");
      },
      goLogin() {
        this.$router.back();
      },
      onFocus() {
        this.tips = "";
        this.showTips = false;
      }
    },
    mounted() {

    }
  }
</script>

<style lang='stylus' scoped>
  .register
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
    .register-wrap
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
        vertical-align middle
      .btnRegister
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
        .protocol
          color #199f96
          margin-right .170667rem
        .extra
          color #199f96
      .verifyBox
        font-size 0 //去掉中间空格
        .textVerifyCode
          font-size .273067rem
          display inline
          width 2.901333rem
          border-right 0
        .btnVerifyCode
          display inline
          width 1.365333rem
          padding 0
          background-color #ddd
          font-size .238933rem
          color #757575
          border-left-color #ccc

</style>