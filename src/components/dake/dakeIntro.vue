<template>
  <div class="dake">
    <!-- 顶部导航 -->
    <div class="fix">
      <div class="nav" ref="navScroll">
        <ul class="nav-wrapper" ref="ulWidth">
          <li
            ref="currentLi"
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
          <component :is="currentComponent" :navList="navList" :nowIndex="nowIndex"></component>
        </keep-alive>
      </transition>
    </div>
    <!-- 底部导航 -->
    <v-navfoot></v-navfoot>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

import frontEnd from "./frontEnd";
import php from "./php";
import java from "./java";
import net from "./net";
import ui from "./ui";
import android from "./android";
import python from "./python";
import c from "./c";
import bigData from "./bigData";

  export default {
    data () {
      return {
        // 导航项和相关组件
        navList:[
          {title: "web前端", component: frontEnd, keid: 2, categoryId: 69},
          {title: "PHP", component: php, keid: 1, categoryId: 18},
          {title: "Java", component: java, keid: 3, categoryId: 16},
          {title: ".NET", component: net, keid: 4, categoryId: 19},
          {title: "Android", component: android, keid: 5, categoryId: 39},
          {title: "UI", component: ui, keid: 6, categoryId: 45},
          {title: "Python", component: python, keid: 7, categoryId: 17},
          {title: "C++", component: c, keid: 8, categoryId: 21},
          {title: "大数据", component: bigData, keid: 9, categoryId: 14}
        ],
        currentComponent: frontEnd, // 第一页默认加载的组件
        nowIndex: 0,
        transitionName: "",
      }

    },
    methods: {
      //动态设置顶部导航ul宽度：获取每个li宽度时注意li不要设置margin,offsetWidth获取不到
      setWidth() {
        var navWidth = 0; // 导航宽度
        var lis = this.$refs.currentLi; // 所有li数组
        var clientWidth = document.body.offsetWidth; // 屏幕宽度

        for(var i = 0; i < this.navList.length; i++) {
          navWidth += lis[i].offsetWidth;
        }
        if(navWidth > clientWidth) {
          this.$refs.ulWidth.style.width = navWidth + "px";
        }else{
          this.$refs.ulWidth.style.width = clientWidth + "px";
        }
      },
      //点击顶部导航
      changeIndex(index) {
        this.nowIndex = index;
        this.currentComponent = this.navList[index].component;
        //当前点击标签滚动到中间
        const target = this.$refs.currentLi[index];
        this.BScroll.scrollToElement(target, 300, true);
      },
      // 初始化滚动插件
      _initNavScroll() {
        this.BScroll = new betterScroll(this.$refs.navScroll,{
          click: true,
          startX: 0,
          scrollY: false,
          scrollX: true
        })
      }
    },
    mounted() {
      // 设置顶部导航宽度
      this.setWidth();
      // 屏幕旋转时，设置顶部导航宽度(因为betterScroll原因最好在app中设置刷新)
      window.addEventListener("orientationchange", () => {
        // this.setWidth();
        // this.BScroll.refresh();
        location.reload(); // this.$router.go(0)在safari中不起作用
      })
      
      this.$nextTick(() =>{
        this._initNavScroll();
      })
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
        padding 0 .085333rem
        .nav-item
          flex 1
          padding 0 .256rem
          height .853333rem
          text-align center
          cursor pointer
          span
            display inline-block
            height .802133rem
            line-height .802133rem
            white-space nowrap
            text-align center
            &.action
              color #199f96
              border-bottom 0.0512rem solid #199f96
  .content
    position absolute
    top .853333rem
    bottom .853333rem
    left 0
    right 0
    overflow hidden
    //页面左右切换的过渡动画
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active
      will-change transform
      transition all 0.3s
    .slide-right-enter, .slide-left-leave-active
      transform translateX(-100%)
    .slide-left-enter, .slide-right-leave-active
      transform: translateX(100%)
      

    

</style>