<template>
  <div class='h-certification'>
    <v-title :title="title"></v-title>
    <div class="box">
      <div class="wrap">
        <!-- 目前公司 -->
        <input type="text" placeholder="目前公司" v-model="company">
        <!-- 当前职位 -->
        <input type="text" placeholder="当前职位" v-model="jobs">

        <!-- 入行时间 -->
        <input type="text" placeholder="入行时间" onfocus=this.blur() v-model="joinTime" @click="selectYear">
        <mt-datetime-picker
          type="date"
          ref="datePicker"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          :startDate="new Date(1970,0,1)"
          :endDate="new Date()"
          @confirm="handleConfirm"
          @visible-change = "visbleChange"
        >
        </mt-datetime-picker>
        
        <!-- 授课课程 -->
        <input type="text" placeholder="授课课程" onfocus=this.blur() v-model="curriculum" @click="popupVisibleKe = !popupVisibleKe">
        <mt-popup class="popup" v-model="popupVisibleKe" position="bottom">
          <mt-picker :slots="slots" showToolbar @change="onValuesChange">
            <div class="picker-toolbar-title">
              <div class="btn-cancel" @click="popupVisibleKe = !popupVisibleKe">取消</div>
              <div class="btn-sure" @click="sure">确定</div>
            </div>
          </mt-picker>
        </mt-popup>

        <!-- 申请理由 -->
        <textarea name="" placeholder="申请理由" cols="30" rows="10" v-model="reason"></textarea>
        <!-- 重置提交按钮 -->
        <div class="btns">
          <button @click="reset">重置</button>
          <button @click="submit">提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: {
          text: "前辈认证",
          back: true
        },
        company: "", // 目前公司
        jobs: "", // 当前职位
        joinTime: "", // 入行时间
        curriculum: "", // 授课课程
        reason: "", // 申请理由
        slots: [
          {
            flex: 1,
            values: ["前端技术", "后端开发", "移动开发", "设计与建模", "运维", "测试", "DBA", "高级职务", "硬件开发", "企业软件", "控件设计", "操作系统", "云计算/大数据", "算法及应用", "人工智能"],
            className: 'slot1',
            textAlign: 'center'
          }
        ],
        popupVisibleKe: false, // 显示隐藏（弹出框）课程选择器
        ke_val: "", // 存储选择器选中的课程
        handler: function(e){
          e.preventDefault();
        }, // 阻止默认事件
      }
    },
    methods: {
      visbleChange (val) {
        if(val) {
          this.closeTouch();
        } else {
          this.openTouch();
        }
      },
      // 显示入行时间选择器
      selectYear() {
        this.$refs.datePicker.open();
      },
      // 确认入行时间
      handleConfirm(value) {
        function formatDate (secs) {
          var t = new Date(secs)
          var year = t.getFullYear()
          var month = t.getMonth() + 1
          if (month < 10) { month = '0' + month }
          var date = t.getDate()
          if (date < 10) { date = '0' + date }
          var hour = t.getHours()
          if (hour < 10) { hour = '0' + hour }
          var minute = t.getMinutes()
          if (minute < 10) { minute = '0' + minute }
          var second = t.getSeconds()
          if (second < 10) { second = '0' + second }
          return year + '-' + month + '-' + date
        }
        this.joinTime = formatDate(value);
      },

      // 选择授课课程
      onValuesChange(picker, values) {
        this.ke_val = values[0];
      },
      // 确认课程选择
      sure() {
        this.curriculum = this.ke_val;
        this.popupVisibleKe = false;
      },
      /*解决页面层级相互影响滑动picker穿透的问题*/
      closeTouch() {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive: false})//阻止默认事件
      },
      openTouch() {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive: false})//打开默认事件
      },
      // 重置
      reset() {
        this.company = "";
        this.jobs = "";
        this.joinTime = "";
        this.curriculum = "";
        this.reason = "";
      },
      // 提交
      submit() {
        // console.log(this.company)
        // console.log(this.jobs)
        // console.log(this.joinTime)
        // console.log(this.curriculum)
        // console.log(this.reason)
        this.$toast("暂未开放！");
        // this.$router.replace("senior");
      }
    },
    watch: {
      // 打开关闭滑动默认事件
      popupVisibleKe: function(newVal) {
        if(newVal) {
          this.closeTouch();
        } else {
          this.openTouch();
        }
      }
    },
    mounted() {
      
    }
  }
</script>

<style lang='stylus' scoped>
  .h-certification
    .box
      position absolute
      top .682667rem
      left 0
      padding .170667rem .256rem
      text-align center
      .wrap
        padding .170667rem
        background-color #fff
        border-radius .068267rem
        .mint-datetime-action
          color #199f96
        .mint-datetime-cancel
          color #199f96!important
        input, textarea
          width 100%
          box-sizing border-box
          padding .170667rem .085333rem
          margin .170667rem 0
          border-radius .068267rem
          border none
          outline none
          border 1px solid #dcdfe6
          font-size .238933rem
          color #606266
          caret-color #199f96
          -webkit-appearance none
        .popup
          width 100%
          position fixed
          bottom 0
          .picker-toolbar-title
            display flex
            justify-content space-around
            height .682667rem
            line-height .682667rem
            border-bottom: solid .017067rem #eaeaea;
            .btn-cancel, .btn-sure
              width 50%
              line-height .682667rem
              color #26a2ff
              font-size .273067rem
        .btns
          display flex
          justify-content space-around
          align-items center
          button
            padding 0.085333rem 0.170667rem
            text-align center
            vertical-align middle
            color #199f96
            font-size 0.273067rem
            background-color #fff
            border 1px solid #199f96
            outline none
            border-radius 0.0512rem
            cursor pointer
      
</style>