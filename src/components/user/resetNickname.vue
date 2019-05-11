<template>
  <div class='resetNickname'>
    <v-title :title="title"></v-title>
    <div class="wrap">
      <h2>新昵称</h2>
      <P class="tips" v-show="showTips">{{tips}}</P>
      <input type="text" placeholder="输入新昵称" v-model="newName" @focus="onFocus">
      <p class="notice">注意：昵称为4-8位的字母,数字或汉字。</p>
      <input class="btn" type="button" value="保存" @click="saveNewName">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'resetNickname',
    data() {
      return {
        title: {
          text: "修改昵称",
          back: true
        },
        newName: "",
        showTips: false,
        tips: ""
      }
    },
    methods: {
      // 保存新昵称
      saveNewName() {
        if(this.newName != "") {
          let reg = /[a-zA-Z\d\u4e00-\u9fa5]{4,8}/;
          if(reg.test(this.newName)) {
            let token = sessionStorage.getItem("token");
            let data = {user_name: this.newName};
            let formatData = this.$qs.stringify(data); //序列化数据
            // -1未传入数据 0无此用户 1修改成功
            this.$axios.post(`/api/Ajax/resetUsername/token/${token}`, formatData)
            .then((response) => {
              console.log(response);
              if(response.data.ret_msg == 1) {
                this.$toast("修改成功，请重新登录！");
                sessionStorage.removeItem("isLogin");
                setTimeout(() => {
                  this.$router.push({
                    path: "/user/login",
                    query: {redirect: "/dake"}
                  });
                }, 1200)
              }else if(response.data.ret_msg == 0) {
                this.$toast("昵称未传入，请重试！");
              }else if(response.data.ret_msg == -1) {
                this.$toast("请先登录！");
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
            this.tips = "请输入4-8位的字母,数字或汉字!";
            this.showTips = true;
          }
        }else{
          this.showTips = true;
          this.tips = "昵称不能为空！";
        }
      },
      onFocus() {
        this.tips = "";
        this.showTips = false;
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .resetNickname
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
        margin 0 auto
        margin-bottom .170667rem
        outline none
        border-bottom 1px solid #888
        box-sizing border-box
        -webkit-appearance none //这两条解决safari圆角问题
        border-radius 0
        vertical-align middle
      .notice
        color #199f96
        text-align left
        padding .085333rem 0 .170667rem
        font-size .238933rem
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