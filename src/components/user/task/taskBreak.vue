<template>
  <div class='task' ref="scrollBox">
    <div class="box">
      <ul>
        <li v-for="(task, index) in taskBreak" :key="index" class="taskList">
          <div class='title'>任务{{index + 1}}</div>
          <div>任务简介：<span class='intro'>{{task.biaoti}}</span></div>
          <div>任务分数：<span class='score'>{{task.fenshu}}分</span></div>
          <div>发布时间：<span class='time'>{{task.r_k_time | formatDate}}</span></div>
          <div class='ask' v-html="task.yaoqiu"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

  export default {
    data () {
      return {
        
      }
    },
    methods: {

    },
    mounted() {
      this.$nextTick(() =>{
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true,
          mouseWheel: true
        })
      })
    },
    filters: {
      formatDate(time) {
        var unixTimestamp = new Date( time * 1000 );
        
        Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
        };
        return unixTimestamp.toLocaleString();
      }
    },
    created() {

    },
    props:['taskBreak']
  }
</script>

<style lang='stylus' scoped>
  .task
    position absolute
    top .682667rem
    left 0
    right 0
    bottom 0
    overflow hidden
    .box
      padding .341333rem .170667rem
    .taskList
      background-color #fff
      border-radius .085333rem
      padding .170667rem
      margin-bottom .341333rem
      word-wrap break-word
      .title
        margin-bottom .170667rem
        text-align center
        font-weight bold
      .name, .intro, .score, .time
        color #199f96
      .ask
        margin-top .170667rem
      
</style>