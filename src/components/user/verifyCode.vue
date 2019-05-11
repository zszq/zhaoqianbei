<template>
  <div class='verifyCode'>
    <v-title :title="title"></v-title>
    <div class="wrap">
      <h2>短信验证</h2>
      <P class="tips" v-show="showTips">{{tips}}</P>
      <input type="number" placeholder="请输入手机号" v-model="phoneNumber" @focus="onFocus">
      <div class="verifyBox">
        <input type="number" placeholder="请输入验证码" class="textVerifyCode" v-model="verifyCode" @focus="onFocus">
        <input type="button" class="btnVerifyCode" @click="sendVerifyCode" v-model="btnContent">
      </div>
      <input type="button" value="验证手机号" class="btn" @click="verify">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'verifyCode',
    data() {
      return {
        title: {
          text: "重置密码",
          back: true
        },
        phoneNumber: "",
        verifyCode: "",
        showTips: false,
        tips: "验证码即为新密码！",
        btnContent: "发送验证码",
        VerifyTime: 60, //验证重发时间
        VerifyState: true //防止重复点击发送验证码
      }
    },
    methods: {
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
                  this.VerifyTime--;
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
                this.tips = "未输入手机号码！";
                this.showTips = true;
                this.btnContent = "重新发送";
                this.VerifyState = true;
              }
            })
            .catch((error) => {
              console.log(error);
              this.$toast("请检查网络!");
            })
          }else{
            this.tips = "手机号码错误！";
            this.showTips = true;
            this.VerifyState = true;
          }
        }
      },
      // 验证手机号
      verify() {
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(reg.test(this.phoneNumber) && this.verifyCode != "") {
          // 清空提示
          this.showTips = false;
          this.tips = "";
          // 请求更改密码
          let data = {phone: this.phoneNumber, verifycode: this.verifyCode}
          let formatData = this.$qs.stringify(data); //序列化数据
          // 1成功 0无此用户 -1验证码错误 -2未传入数据
          this.$axios.post("/api/Index/phoneLogin", formatData)
          .then((response) => {
            console.log(response);
            if(response.data.ret_msg == 1) {
              this.$toast("验证成功，请重置!");
              this.$router.push("/user/resetPassword");
            }else if(response.data.ret_msg == 0) {
              this.$toast("用户不存在,请注册!");
              this.$router.push("/user/register");
            }else if(response.data.ret_msg == -1) {
              this.showTips = true;
              this.tips = "验证码错误!";
            }else if(response.data.ret_msg == -2) {
              this.showTips = true;
              this.tips = "未传入数据!";
            }
          })
          .catch((error) => {
            console.log(error);
            this.$toast("网络错误!");
          })
        }else{
          this.tips = "手机号或验证码错误！";
          this.showTips = true;
          this.VerifyState = true;
        }
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
  .verifyCode
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    text-align center
    background-color #fff
    z-index 999
    .wrap
      position absolute
      top 20%
      left 50%
      transform translate(-50%,0)
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
      .btn
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