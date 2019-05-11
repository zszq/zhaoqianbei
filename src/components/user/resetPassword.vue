<template>
  <div class='resetPassword'>
    <v-title :title="title"></v-title>
    <div class="wrap">
      <h2>设置新密码</h2>
      <P class="tips" v-show="showTips">{{tips}}</P>
      <div class="inputBox">
        <div>
          <input 
            :type="inputType" 
            placeholder="输入新密码" 
            minlength="6" 
            maxlength="12" 
            v-model="newPassWord" 
            @focus="onFocus"
          >
        </div>
        <div class="pr">
          <input 
            :type="inputType" 
            placeholder="再次输入新密码" 
            minlength="6" 
            maxlength="12" 
            v-model="newPassWord2" 
            @focus="onFocus"
          >
          <div class="clearText" @click="clearText">
            <span><i :class="[icon, 'iconfont']"></i></span>
          </div>
        </div>
      </div>
      <input class="btn" type="button" value="重置密码" @click="resetPass">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'resetPassword',
    data() {
      return {
        title: {
          text: "重置密码",
          back: true
        },
        newPassWord: "",
        newPassWord2: "",
        showTips: false,
        tips: "",
        inputType: "password",
        icon: "icon-biyan"
      }
    },
    methods: {
      // 重置密码
      resetPass() {
        if(this.newPassWord === this.newPassWord2 && this.newPassWord != "") {
          let token = sessionStorage.getItem("token");
          let data = {password: this.newPassWord};
          let formatData = this.$qs.stringify(data); //序列化数据
          console.log(token);
          console.log(data)
          // -1未传入数据 0无此用户 1修改成功
          this.$axios.post(`/api/Ajax/resetPass/token/${token}`, formatData)
          .then((response) => {
            console.log(response); // 请求会出现半天无响应然后报错，后台问题，让先搁置
            if(response.data.ret_msg === -1) {
              this.showTips = true;
              this.tips = "未输入新密码";
            }else if(response.data.ret_msg === 0) {
              this.showTips = true;
              this.tips = "用户不存在，请注册！";
            }else if(response.data.ret_msg === 1) {
              this.$toast("修改成功，请重新登录！");
              sessionStorage.removeItem("isLogin");
              setTimeout(() => {
                this.$router.push({
                  path: "/user/login",
                  query: {redirect: "/dake"},
                  replace: true
                });
              }, 1200)
            }
          })
          .catch((error) => {
            console.log(error);
            this.$toast("网络错误!");
          })
        }else{
          this.showTips = true;
          this.tips = "两次输入的密码不一样！";
        }
      },
      // 明文显示密码
      clearText() {
        if(this.inputType == "password") {
          this.inputType = "text";
          this.icon = "icon-zhengyan";
        }else{
          this.inputType = "password";
          this.icon = "icon-biyan";
        }
      },
      // 获取焦点清除tips
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
  .resetPassword
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
      .inputBox
        position relative
        .clearText
          position absolute
          top 50%
          right 0
          transform translateY(-50%)
          padding .136533rem
          i 
            color #666
            font-size .3072rem
      input
        display block
        width 4.266667rem
        height .682667rem
        line-height .341333rem
        padding .170667rem .682667rem .170667rem .170667rem
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
      
      
</style>