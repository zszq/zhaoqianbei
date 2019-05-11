<template>
  <div class="h-myPredecessor">
    <v-title :title="title"></v-title>
    <div class="main">
      <div class="nav">
        <ul class="navBar">
          <li 
          v-for="(item,index) in navList" 
          :key="index" 
          @click="navigation(index)" 
          :class="{'action': index === nowIndex}"
          >
            {{item.title}}
          </li>
        </ul>
      </div>
      <div class="content">
        <transition :name="transitionName">
          <component :is="currentPage" :studyIngs="studyIngs" :studyEnds="studyEnds" :payments="payments"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import studying from "./studying"
import studied from "./studied"

  export default {
    data () {
      return {
        title: {
          text: "我的前辈",
          back: true
        },
        navList:[
          {title: "求学中", component: studying},
          {title: "已结束", component: studied}
        ],
        studyIngs: [],
        studyEnds: [],
        payments: [],
        currentPage: studying,
        transitionName: "",
        nowIndex: 0
      }
    },
    methods: {
      // 请求我的前辈数据
      get_mySenior() {
        let token = sessionStorage.getItem("token");

        this.$axios.get(`/api/Index/qiuxue/token/${token}`)
        .then((response) => {
          // console.log(response)
          let res = response.data.data;
          // 根据s_state进行数据分类
          res.forEach(item => {
            if(item.s_state == 0) {
              this.studyIngs.push(item);
            }else if(item.s_state == 1) {
              this.payments.push(item);
            }else {
              this.studyEnds.push(item);
            }
          })
        })
        .catch((error) => {
          console.log(error);
          this.$toast("网络错误!");
        })
      },
      // 导航
      navigation(index){
        this.currentPage = this.navList[index].component;
        this.nowIndex = index;
      }
    },
    mounted() {
      this.get_mySenior();
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
.h-myPredecessor
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  z-index 999
  .main
    position absolute
    top .682667rem
    left 0
    right 0
    bottom 0
    width 100%
    .nav
      width 100%
      height .682667rem
      background-color #fff
      .navBar
        display flex
        justify-content space-around
        height .682667rem
        li
          height .631467rem
          line-height .631467rem
          text-align center
          cursor pointer
          &.action
            color #199f96
            border-bottom .0512rem solid #199f96
    .content
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