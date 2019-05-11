<template>
  <div class="home">
    <v-title :title="title"></v-title>
    <div class="scrollBox" ref="scrollBox">
      <div class="box">
        <div class="information" @click="toInformation" v-fb>
          <div class="avatar">
            <img :src="userInfo.u_img_curl ? userInfo.u_img_curl : 'https://www.zhaoqianbei.com/Public/img/default.png'" alt="">
          </div>
          <div class="text">
            <h3 class="name">{{userInfo.user_name}}</h3>
            <p class="datum">查看个人资料</p>
          </div>
          <span>＞</span>
        </div>
        <div class="items">
          <ul>
            <li class="item" 
              v-for="(item,index) in homeItems" 
              :key="index" 
              @click="toDetail(item.component)" 
              v-fb
            >
              <i :class="[item.icon, 'iconfont']"></i><span class="item-title">{{item.title}}</span><span class="arrow">＞</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <v-navfoot></v-navfoot>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

export default {
  name: "home",
  data() {
    return {
      title: {
        text: "个人中心",
        back: false
      },
      userInfo: {},
      homeItems: [
        {title: "我的前辈", component: "mySenior", icon: "icon-myqianbei"},
        {title: "我的任务", component: "task", icon: "icon-renwu"},
        {title: "我是前辈", component: "senior", icon: "icon-isqianbei"},
        {title: "设置", component: "setting", icon: "icon-shezhi"}
      ]
    };
  },
  methods: {
    get_userInfo() {
      let token = sessionStorage.getItem("token");
      // 请求用户中心个人数据
      this.$axios.get(`/api/Index/userInfo/token/${token}`)
      .then((response) => {
        // console.log(response);
        this.userInfo = response.data.data;
      })
      .catch((error) => {
        console.log(error);
        this.$toast("网络错误!");
      })
    },
    // 跳转到个人详细资料
    toInformation() {
      this.$store.commit("set_detail", this.userInfo);
      this.$router.push("/user/information");
    },
    // 跳转home每一项详情
    toDetail(detail) {
      this.$router.push(`/user/${detail}`);
    }
  },
  mounted() {
    this.get_userInfo();
    // 无滚动条滚动
    this.$nextTick(() =>{
      this.BScroll = new betterScroll(this.$refs.scrollBox,{
        click: true
      })
    })
  }
};
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

.scrollBox
  position absolute
  top .682667rem
  left 0
  right 0
  bottom .853333rem
  overflow hidden
  .box
    padding .170667rem 0
    .information
      position relative
      width 100%
      height 1.706667rem
      background-color #fff
      cursor pointer
      .avatar
        width 1.024rem
        height 1.024rem
        display inline-block
        margin .341333rem .256rem
        vertical-align middle
        img
          width 1.024rem
          height 1.024rem
          border-radius 50%
      .text
        display inline-block
        vertical-align middle
        .name
          padding .085333rem 0
          color #444
          font-size .273067rem
        .datum
          padding .085333rem 0
          font-size .238933rem
      span
        position absolute
        top 50%
        right .256rem
        color #bbb
        transform translateY(-50%)
    .items
      width 100%
      margin-top .341333rem
      .iconfont
        font-size .273067rem
      .item
        height .853333rem
        line-height .853333rem
        padding 0 .170667rem
        background-color #fff
        border-top-1px(#ddd)
        cursor pointer
        clear both
        &:last-child
          margin-top .341333rem
        .item-title
          margin-left .170667rem
        .arrow
          float right
          color #bbb
          margin-right .085333rem
</style>