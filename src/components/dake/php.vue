<template>
  <div :class="this.navList[this.nowIndex].title">
    <div class="scrollBox" ref="scrollBox">
      <div class="box">
        <div ref="minHeight">
          <div class="keFlag" v-if="!keFlag">
            <img src="../../assets/images/ProLogo.png" alt="">
            <p>课程加载中......</p>
          </div>

          <!-- 课程简介组件 -->
          <v-keIntro :kecheng="kecheng" v-if="keFlag"></v-keIntro>
          <div class="teFlag" v-if="!teFlag">
            <img src="../../assets/images/ProLogo.png" alt="">
            <p>前辈加载中......</p>
          </div>

          <!-- 前辈列表组件 -->
          <v-teIntro :teacherList="teacherList" v-if="teFlag"></v-teIntro>
        </div>

        <!-- 上拉加载更多 -->
        <div class="pullup">
          <span v-show="!loadUp">{{pullupTips}}</span>
          <div class="up" v-show="loadUp">
            <img src="../../assets/images/loading.gif" alt="加载中......">
          </div>
        </div>
        
      </div>

      <!-- 下拉刷新 -->
      <div class="pulldown" ref="pulldown">
        <div class="down" v-show="!loadDown">
          <span class="rotate" ref="rotate">↓</span>
        </div>
        <div class="down" v-show="loadDown">
          <img src="../../assets/images/loading.gif" alt="加载中......">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

import keIntro from "./keIntro"
import teIntro from "./teIntro"

  export default {
    data () {
      return {
        keFlag: false,
        teFlag: false,
        kecheng: {},
        teacherList: [],
        pageNum: 1, // 加载了几页
        loadDown: false, // 下拉刷新提示
        loadUp: false, // 上拉刷新提示
        pullupTips: ""
      }
    },
    methods: {
      // 请求课程简介
      get_keIntro() {
        let ke = this.navList[this.nowIndex].keid;
        this.$axios.get(`/api/Index/keDetail/keid/${ke}`)
        .then((response) => {
          this.keFlag = true;
          this.kecheng = response.data.data.data.kechengDetail;
        })
        .catch((error) => {
          console.log(error);
          this.$toast("网络错误!");
        })
      },
      // 请求老师列表
      get_teList() {
        if(this.teacherList.length / 20 == this.pageNum - 1) {
          let category = this.navList[this.nowIndex].categoryId;
          let page = {page: this.pageNum}
          let formatData = this.$qs.stringify(page); //序列化数据

          this.$axios.post(`/api/Index/dake/categoryId/${category}`, formatData)
          .then((response) => {
            let res = response.data.data.data;
            // if防止一页都没有时第一次加载出错
            if(res) {
              for (let i = 0; i < res.length; i++) {
                this.teacherList.push(res[i]);
              }
            }
            this.teFlag = true;
            this.pageNum++;
            this.loadUp = false;
            
            // 停顿效果，加载图片 展示
            setTimeout(() => {
              this.BScroll.finishPullDown(); // 告诉better-scroll下拉请求数据完成回弹到顶部
              this.BScroll.finishPullUp(); // 告诉better-scroll上拉请求数据完成
              this.BScroll.refresh(); // 重新计算 better-scroll
            }, 500)
          })
          .catch((error) => {
            console.log(error);
          })
        }else{
          this.teFlag = true;
          this.loadUp = false;
          this.BScroll.finishPullUp(); // 告诉better-scroll上拉请求数据完成
        }
      },
      // 初始化better-scroll
      _initBScroll() {
        this.$nextTick(() =>{
          // 初始化
          this.BScroll = new betterScroll(this.$refs.scrollBox, {
            click: true, // 派发click事件
            probeType: 2, // 实时滚动的位置
            bounceTim: 600, // 设置回弹动画的动画时长
            scrollbar: true, // 显示滚动条
            mouseWheel: true, // 开启鼠标滚轮
            pullDownRefresh: {
              threshold: 50, // 下拉距离超过50px触发pullingDown事件
              stop: 50 // 回弹停留在距离顶部50px的位置
            },
            pullUpLoad: {
              threshold: -50 // 上拉距离超过50px触发pullingUp事件
            }
          })
          // 设置最小高度，防止内容过小不能滑动刷新(直接设置ui等页面,获取的高度为0？)
          setTimeout(() => {
            this.$refs.minHeight.style.minHeight = this.$refs.scrollBox.offsetHeight + "px";
          }, 500)
          // 获取实时滚动位置触发显示加载箭头和图片
          this.BScroll.on('scroll', (pos) => {
            // 下拉刷新
            this.$refs.pulldown.style.top = pos.y - 50 + "px";
            if(pos.y <= 0) {
              this.loadDown = false;
            }
            if(pos.y > 50) {
              this.$refs.rotate.style= "transform: rotate(-180deg)";
            }else{
              this.$refs.rotate.style= "transform: rotate(0deg)";
            }
            // 上拉加载更多
            if(pos.y < this.BScroll.maxScrollY + 15){
              if(this.teacherList.length / 20 == this.pageNum - 1) {
                this.pullupTips = "-- 上拉加载更多前辈 --";
              }else{
                this.pullupTips = "-- 没有更多前辈 --";
              }
            }
          })
          // 下拉刷新
          this.BScroll.on("pullingDown", () => {
            this.teFlag = false;
            this.loadDown = true;
            this.teacherList = [];
            this.pageNum = 1;
            this.get_teList();
          })
          // 上拉加载更多
          this.BScroll.on("pullingUp", () => {
            this.loadUp = true;
            // 停顿效果，加载图片展示
            setTimeout(() => {
              this.get_teList();
            }, 500)
          })
        })
      }
    },
    created() {
      this.get_keIntro();
      this.get_teList();
    },
    mounted() {
      this._initBScroll();
    },
    components: {
      'v-keIntro': keIntro,
      'v-teIntro': teIntro
    },
    props: ['navList', 'nowIndex']
  }
</script>

<style lang='stylus' scoped>
  .scrollBox
    position absolute
    top 0px
    bottom 0px
    width 100%
    .box
      .keFlag, .teFlag  // 用position会在加载完成之后此div跳转到顶部等内容出现之后才消失
        width 80%
        margin 0 auto
        text-align center
        img
          width 80px
          height 80px
        p
          text-align center
          color #ababab
      .keFlag
        padding 10% 0
      .teFlag
        padding 20% 0
    .pulldown
      position absolute
      top -50px
      left 0
      display flex
      justify-content center
      align-items center
      width 100%
      text-align center
      z-index 9
      .down
        position relative
        width 50px
        height 50px
        line-height 50px
        text-align center
        .rotate
          display inline-block
          color #888
          font-size 30px
          transition all .3s
        img
          display inline-block
          position absolute
          left 50%
          top 50%
          transform translate(-50%, -50%)
          width 20px
          height 20px
    .pullup
      width 100%
      height 20%
      background-color #efeff4
      color #666
      font-size 14px
      text-align center
      .up
        position relative
        width 50px
        height 50px
        margin 0 auto
        line-height 50px
        text-align center
        img
          display inline-block
          position absolute
          left 50%
          top 50%
          transform translate(-50%, -50%)
          width 20px
          height 20px

</style>