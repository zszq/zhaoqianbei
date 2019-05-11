<template>
  <div class="h-task">
    <v-title :title="title"></v-title>
    <div class="main">
      <div class="nav">
        <ul class="navBar">
          <li 
            ref="currentTab"
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
          <component :is="currentPage" 
            :taskIng="taskIng"
            :taskBreak="taskBreak"
            :taskEnd="taskEnd"
            :taskNo="taskNo"
          ></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import taskIng from "./taskIng"
import taskBreak from "./taskBreak"
import taskEnd from "./taskEnd"
import taskNo from "./taskNo"

  export default {
    data () {
      return {
        title: {
          text: "我的任务",
          back: true
        },
        navList:[
          {title: "进行中", component: taskIng},
          {title: "已终止", component: taskBreak},
          {title: "已完成", component: taskEnd},
          {title: "未通过", component: taskNo}
        ],
        currentPage: taskIng,
        transitionName: "",
        nowIndex: 0,
        taskIng: [],
        taskBreak: [],
        taskEnd: [],
        taskNo: []
      }
    },
    methods: {
      // 请求任务数据
      getUserInfo() {
        let token = sessionStorage.getItem("token");
        this.$axios.get(`/api/Index/xueRenwu/token/${token}`)
        .then((response) => {
          // console.log(response);
          let res = response.data.data;
          let taskIng = [];
          let taskBreak = []; 
          let taskEnd = []; 
          let taskNo = [];

          res.forEach((item) => {
            // 归类 r_state: 0为在进行，1为提交，2为通过。-1为中止，-2为不通过。
            if (item.r_state == 0) {
              taskIng.push(item);
            } else if (item.r_state == -1) {
              taskBreak.push(item);
            } else if (item.r_state == 2) {
              taskEnd.push(item);
            } else if (item.r_state == -2) {
              taskNo.push(item);
            }
          })
          this.taskIng = taskIng;
          this.taskBreak = taskBreak;
          this.taskEnd = taskEnd;
          this.taskNo = taskNo;
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
      },
      // 返回个人中心
      toHome() {
        this.$router.back();
      }
    },
    mounted() {
      this.getUserInfo();
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
  .h-task
    position absolute
    left 0
    right 0
    top 0
    bottom 0
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
          transition all 0.3s
        .slide-right-enter, .slide-left-leave-active
          transform translateX(-100%)
        .slide-right-leave-active, .slide-left-enter
          transform: translateX(100%)



</style>