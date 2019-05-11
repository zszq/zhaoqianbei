<template>
  <div class="xiaoke">
    <!-- 顶部导航 -->
    <div class="fix">
      <div class="nav" ref="navScroll">
        <ul class="nav-wrapper" ref="ulWidth">
          <li
            ref="currentTab"
            class="nav-item fc4"
            v-for="(item,index) in navList"
            :key="index"
            @click="changeIndex(index)"
          >
            <span :class="{'action': index === nowIndex}">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 动态组件引入导航每一项详情 -->
    <div class="content">
      <transition :name="transitionName">
        <keep-alive>
          <component :is="currentComponent" :xiaokeDetails="xiaokeDetails"></component>
        </keep-alive>
      </transition>
    </div>
    <!-- 显示小课详情页 -->
    <!-- <router-view></router-view> -->
    <!-- 底部导航 -->
    <v-navfoot></v-navfoot>
  </div>
</template>

<script>
import xiaokeFirsts from "./xiaokeFirsts"
import xiaokeFinishs from "./xiaokeFinishs"

  export default {
    data () {
      return {
        navList:[
          {title: "已开团", component: xiaokeFirsts},
          {title: "已结束", component: xiaokeFinishs}
        ],
        currentComponent: xiaokeFirsts, //和vuex保存的后台数据对应，方便keDetail取到数据
        nowIndex: 0,
        transitionName: "",
        xiaokeDetails:{}
      }
    },
    methods: {
      // 请求小课详情
      get_xiaokeDetails() {
        this.$axios.get("/api/Index/xiaoke")
        .then((response) => {
          this.xiaokeDetails = response.data.data.data;
        })
        .catch((error) => {
          console.log(error)
          this.$toast("请检查网络!");
        })
      },
      changeIndex(index) {
        this.nowIndex = index;
        this.currentComponent = this.navList[index].component;
      }
    },
    created() {
      this.get_xiaokeDetails();
    },
    mounted() {
      
    },
    watch: {
      nowIndex: function(newIndex,oldIndex ) {
        //动态切换左滑还是右滑的transitionName
        if(newIndex > oldIndex){
          this.transitionName = "slide-left";
        }
        if(newIndex < oldIndex){
          this.transitionName = "slide-right";
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .xiaoke
    .fix
      position fixed
      top 0
      left 0
      height .853333rem
      width 100%
      z-index 99
      background-color #fff
      .nav
        position relative
        height .853333rem
        width 100%
        overflow hidden
        background-color #fff
        &:after
          content ""
          position absolute
          left 0
          bottom 0
          display block
          width 100%
          border-bottom 1px solid #ddd
          transform: scaleY(0.5);
        .nav-wrapper
          display flex
          height .853333rem
          // padding 0 .085333rem
          .nav-item
            flex 1
            padding 0 .256rem
            height .853333rem
            text-align center
            span
              display inline-block
              height .802133rem
              line-height .802133rem
              white-space nowrap
              text-align center
              &.action
                color #199f96
                border-bottom .0512rem solid #199f96
    .content
      position absolute
      top .853333rem
      left 0
      right 0
      bottom .853333rem
      width 100%
      //页面左右切换的过渡动画
      .slide-right-enter-active,
      .slide-right-leave-active,
      .slide-left-enter-active,
      .slide-left-leave-active
        will-change transform
        transition all 0.3s
      .slide-right-enter, .slide-left-leave-active
        transform translateX(-100%)
      .slide-right-leave-active, .slide-left-enter
        transform: translateX(100%)

</style>