<template>
  <div class='dialogue'>
    <v-title :title="title"></v-title>
    <!-- 对话详情列表 -->
    <div :class="[{emojiActive: showEmojis}, 'dialogList']" ref="scrollBox">
      <div class="box">
        <div 
          class="dialog-item"
          v-for="(item, index) in listMsg" 
          :key="index"
        >
          <div class="dialog-time">
            <span>{{item.msg_time}}</span>
          </div>
          <div :class="$route.params.uid == item.from_u_id ? 'dialog-left' : 'dialog-right'">
            <div class="dialog-image">
              <img :src="item.u_img_curl" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
            </div>
            <div class="dialog-text">
              <span class="text" v-html="replaceFace(item.msg_content)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="msgInput">
      <!-- 输入框 -->
      <div class="chat">
        <div class="text">
          <textarea name="" placeholder="输入内容" 
            v-model="textareaValue"
            class="textArea"
            @focus="onFocus"
            @keyup="showSend"
          >
          </textarea>
        </div>
        <div class="tool">
          <div class="emoji" @click="showEmoji($event)">
            <span :class="{active: showEmojis}"><i class="iconfont icon-biaoqing"></i></span>
          </div>
          <div class="send" @click="sendMsg">
            <span :class="{active: sendActive}">发送</span>
          </div>
        </div>
      </div>
      <!-- 表情模块 -->
      <div class="emojiBox" v-show="showEmojis">
        <div class="emojiWrapper" ref="emojiWrapper">
          <!-- 分页 -->
          <div 
            class="emoji-item" 
            v-for="(n, index) in Math.ceil(EXPS.length / 15)" 
            :key="index" 
            ref="pages"
            @touchstart="onTouchStart(index, $event)"
            @touchmove="onTouchMove(index, $event)"
            @touchend="onTouchEnd(index, $event)"
          >
            <ul> <!-- 表情 -->
              <li v-for="(item,index) in getEmojiData(n, 15)" :key="index" class="list-item">
                <img :src="item.file" :data="item.code" @click="textareaValue += item.code;sendActive = true;">
              </li>
            </ul>
          </div>
        </div>
        <!-- 指示器 -->
        <div class="indicators">
          <div 
            :class="[{active: isActive == n},'indicator']" 
            v-for="n in Math.ceil(EXPS.length / 15)" 
            :key="n"
          ></div>
        </div>
      </div>
    </div>
    <!-- 提示音 -->
    <div class="tones" v-if="showTones">
      <audio ref="audio" preload="metadata" controls="controls" style="display: none;">
        <source src="../../assets/audio/msg.mp3" type="audio/mpeg">
      </audio>
    </div>
    <!-- 提示音开关 -->
    <div class="voice" @click="toggleVoice">
      <i class="iconfont icon-shengyin" v-show="showVoice"></i>
      <i class="iconfont icon-jingyin" v-show="!showVoice"></i>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"
import Emoji from "../../assets/js/emojiDB.js"

  export default {
    data () {
      return {
        title: {
          text: this.$route.params.qian_name,
          back: true
        },
        textareaValue: "", // 输入的信息内容
        listMsg: {}, // 聊天信息列表
        sendActive: false, // 内容不为空显示发送背景色
        timer: null, // 定时获取聊天信息的定时器
        showEmojis: false, // 显示emoji表情
        EXPS: [], // 存储emoji表情
        isActive: 1, // 当前表情指示器class,和页面数对应
        netEmoji: false, // 控制获取表情较慢时会造成设置偏移失效
        showTones: false, // 显示提示音audio标签
        startX: 0, // 触摸开始位置
        moveX: 0, // 触摸滑动位置
        X: 0, // 触摸位置差
        pageW: 0, // 表情页最大宽度
        pageMaxIndex: 0, // 最大页数
        showVoice: true, // 提示音开关
        msgSuccess: false, // 请求消息成功跳转到底部
        handler: function(e){
          e.preventDefault();
        }, // 阻止默认事件
      }
    },
    methods: {
      // 请求聊天内容
      get_msg() {
        let token = sessionStorage.getItem("token");
        let uid = this.$route.params.uid;

        this.$axios.get(`/api/Ajax/listMsg/token/${token}/id/${uid}`)
        .then((response) => {
          // console.log(response);
          if (response.data.data) {
            this.listMsg = response.data.data;
          }else{
            return;
          }
          this.msgSuccess = true; // 请求成功跳转到底部
        })
        .catch((error) => {
          console.log(error);
          this.$toast("网络错误!");
        })
      },
      // 轮询请求是否有新消息
      get_newMsg() {
        let token = sessionStorage.getItem("token");
        let uid = this.$route.params.uid;

        this.$axios.get(`/api/Ajax/ajaxMsg/token/${token}/id/${uid}`)
        .then((res) => {
          // console.log(res)
          if (res.data.ret_msg != 0) {
            this.get_msg(); // 请求聊天内容
            this.promptTone(); // 播放提示音
          }else{
            return;
          }
        })
        .catch((error) => {
          console.log(error);
        })
      },
      // 输入框获得焦点
      onFocus() {
        this.showEmojis = false; // 隐藏表情
        this._resetBscroll(300); // 重置better-scroll
      },
      // 判断有无空格或有无输入内容 显示发送字体颜色
      showSend() {
        if(this.textareaValue.toString().trim() == "") {
          this.sendActive = false;
        }else{
          this.sendActive = true;
        }
      },
      // 发送信息
      sendMsg() {
        if(this.textareaValue.toString().trim() == "") {
          this.$toast("发送内容不能为空");
        }else{
          let token = sessionStorage.getItem("token");
          let data = {cont: this.textareaValue, uid: this.$route.params.uid}
          let formatData = this.$qs.stringify(data); // 序列化数据

          this.$axios.post(`/api/Ajax/liao/token/${token}`, formatData)
          .then((response)=>{
            this.get_msg(); // 发送成功再次请求聊天内容
            this.textareaValue = ""; // 清空输入框
            this.sendActive = false; // 隐藏发送按钮背景色
            this.showEmojis = false; // 隐藏表情
          })
          .catch((error) => {
            console.log(error);
            this.$toast("网络错误!");
          })
        }
      },
      // 提示音
      promptTone() {
        let audio = this.$refs.audio;
        if(this.showVoice) {
          audio.play();
        }
      },
      // 提示音开关
      toggleVoice() {
        this.showVoice = !this.showVoice;
      },
      // 表情code替换成表情图片
      replaceFace(content) {
        if (!content) {
          return;
        }
        if (content.toString().indexOf('/:') >= 0) {
          var exps = this.EXPS;
          for (var i = 0; i < exps.length; i++) {
            content = content.replace(exps[i].reg, '<img src="' + exps[i].file + '"  alt="" />');
          }
        }
        return content;
      },
      // 获取emoji表情
      loadEmojiData() {
        this.EXPS = Emoji.EXPS;
        this.netEmoji = true;
      },
      // 截取每页表情数量
      getEmojiData(pageNow, pageNum) {
        return this.EXPS.slice((pageNow - 1) * pageNum, pageNow * pageNum);
      },
      // 控制显示隐藏表情
      showEmoji(e) {
        if(this.netEmoji) {
          this.showEmojis = !this.showEmojis;
          if(this.showEmojis){ // 显示之后才加载元素,才可以获取 表情页 宽度
            setTimeout(() => { // 确保元素渲染完成了
              this.pageX();
            }, 100);
          }
          this._resetBscroll(50); // 重置better-scroll
        }else{
          e.preventDefault();
          this.$toast("请稍后......", "bottom")
        }
      },
      // 设置表情页偏移成一排显示
      pageX() {
        var W = this.$refs.pages[0].offsetWidth; // 获取 表情页 宽度
        this.$refs.pages.forEach((page,index) => {
          page.style.transform = `translateX(${W * index}px)`; // 每一页做偏移
        })
      },
      // 滑动表情开始
      onTouchStart(index,e){
        e = e || event;
        this.pageW = this.$refs.pages[0].offsetWidth; // 获取表情页宽度
        this.startX = e.touches[0].clientX;
        this.pageMaxIndex = this.$refs.pages.length - 1; // 页数
      },
      // 滑动表情中
      onTouchMove(index,e){
        e = e || event;
        this.moveX = e.changedTouches[0].clientX;
        this.X = this.moveX - this.startX;
        var total = this.X + (-this.pageW * index); // 滑动的距离加上已经偏移的距离(比如第二页滑动)
        this.$refs.emojiWrapper.style.transform = `translateX(${total}px)`;
        this.$refs.emojiWrapper.style.transition = "0s";
      },
      // 滑动表情结束
      onTouchEnd(index,e){
        // 滑动的距离大于1/5时翻页
        if(Math.abs(this.X) > this.pageW / 5) {
          // 左滑
          if(this.X < 0) {
            // 最大index不能超过页数，超过回弹
            if( index >= this.pageMaxIndex) {
              var total = -this.pageW * index;
              this.$refs.emojiWrapper.style.transform = `translateX(${total}px)`;
              this.$refs.emojiWrapper.style.transition = "0.3s";
            }else{
              var total = -this.pageW * (index + 1);
              this.$refs.emojiWrapper.style.transform = `translateX(${total}px)`;
              this.$refs.emojiWrapper.style.transition = "0.3s";
            }
            // 设置左滑指示器
            if(this.isActive < this.pageMaxIndex + 1){
              this.isActive ++;
            }
          }
          // 右滑
          if(this.X > 0) {
            // 最小index不能超过页数，超过回弹
            if( index <= 0) {
              var total = -this.pageW * index;
              this.$refs.emojiWrapper.style.transform = `translateX(${total}px)`;
              this.$refs.emojiWrapper.style.transition = "0.3s";
            }else{
              var total = -this.pageW * (index - 1);
              this.$refs.emojiWrapper.style.transform = `translateX(${total}px)`;
              this.$refs.emojiWrapper.style.transition = "0.3s";
            }
            // 设置右滑指示器
            if(this.isActive > 1){
              this.isActive --;
            }
          }
        }
        // 滑动的距离小于1/5时不翻页
        if(Math.abs(this.X) < this.pageW / 5) {
          var total = -this.pageW * index;
          this.$refs.emojiWrapper.style.transform = `translateX(${total}px)`;
          this.$refs.emojiWrapper.style.transition = "0.3s";
        }
        // this.X不重置为0点击时会根据上面条件进行滑动
        this.X = 0;
      },
      // 重新计算 better-scroll并滚动到底部
      _resetBscroll(d_time = 300, b_time = 0) { // d_time几秒后开始重新滚动 b_time动画滚动时间
        setTimeout(() => {
          this.BScroll.refresh(); // 重新计算 better-scroll
          this.BScroll.scrollTo(0, this.BScroll.maxScrollY, b_time); // 滚动到底部
        }, d_time)
      },
      /*解决页面层级相互影响滑动picker穿透的问题*/
      closeTouch() {
        document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, {passive: false})//阻止默认行为
      },
      openTouch() {
        document.getElementsByTagName('body')[0].removeEventListener('touchmove', this.handler, {passive: false})//打开默认行为
      },
    },
    created() {
      this.loadEmojiData(); // 获取本地emoji表情
      this.get_msg(); // 首次加载立即获取一次聊天信息
    },
    mounted() {
      this.$nextTick(() => {
        // 无滚动条滚动
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true,
          mouseWheel: true
        });
        // 延迟加载audio标签，不延迟在safari上页面进入动画有问题
        setTimeout(() => {this.showTones = true;}, 800);
      })
      // 定时查看有无新聊天信息
      this.timer = setInterval(() => {
        this.get_newMsg();
      }, 1000);
    },
    watch: {
      // 请求聊天信息成功后跳转到底部
      msgSuccess: function(nowVal) {
        if(nowVal == true) {
          this.$nextTick(() => {
            this._resetBscroll(150, 300); // 重置better-scroll
            this.msgSuccess = false; // 重置此变量，进行下次判断
          })
        }
      },
      // 打开关闭滑动默认事件
      showEmojis: function(newVal) {
        if(newVal) {
          this.closeTouch();
        } else {
          this.openTouch();
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.timer); // 销毁组件前清除获取聊天信息的定时器
    }
  }
</script>

<style lang='stylus' scoped>
.dialogue
  position absolute   // 取消之后进入跳转到底部高度错误，待解决
  top 0
  left 0
  right 0
  bottom 0
  .dialogList
    position absolute
    top .682667rem
    left 0
    right 0
    bottom .938667rem
    overflow hidden
    background-color #f5f5f5
    &.emojiActive
      bottom 3.498667rem
    .box
      padding .170667rem 0
      .dialog-item
        padding 0 .170667rem
        margin-bottom .256rem
        .dialog-time
          text-align center
          margin-bottom .256rem
          span
            display inline-block
            padding .085333rem
            color #ababab
            font-size .2048rem
            border-radius .085333rem
        // 左显示聊天信息
        .dialog-left
          position relative
          .dialog-image
            position absolute
            top 0
            left 0
            width .682667rem
            height .682667rem
            img
              width .682667rem
              height .682667rem
              border-radius 50%
          .dialog-text
            padding-left .938667rem
            .text
              position relative
              display inline-block
              word-break break-all
              padding .2048rem
              color #000
              background-color #fff
              line-height .3072rem
              border-radius .085333rem
              &::after 
                content: ""
                position absolute
                top .170667rem
                left 0
                display block
                width 0
                height 0
                border .136533rem solid transparent
                border-right-color #fff
                transform translateX(-100%)
        // 右显示聊天信息
        .dialog-right
          position relative
          .dialog-image
            position absolute
            top 0
            right 0
            width .682667rem
            height .682667rem
            img
              width .682667rem
              height .682667rem
              border-radius 50%
          .dialog-text
            text-align right
            padding-right .938667rem
            .text
              text-align left
              position relative
              display inline-block
              min-height .273067rem
              min-width .341333rem
              max-width 80%
              word-break break-all
              padding .2048rem
              color #000
              background-color #98e165
              line-height .3072rem
              border-radius .085333rem
              &::before 
                content: ""
                position absolute
                top .170667rem
                right 0
                display block
                width 0
                height 0
                border .136533rem solid transparent
                border-left-color #98e165
                transform translateX(100%)
  .msgInput
    position fixed
    left 0
    bottom 0
    width 100%
    .chat
      position relative
      display flex
      background-color #fff
      box-shadow: 0rem -0.017067rem .0512rem rgba(0, 0, 0, 0.1)
      border-bottom 1px solid #f1f1f1
      .text
        flex 1
        background-color #fff
        .textArea
          display block
          box-sizing border-box
          z-index 1
          overflow-y auto
          font-size .238933rem
          width 80%
          line-height 1.2
          font-size .273067rem
          border none
          resize none
          outline none
          padding .256rem .682667rem 0rem .170667rem
          font-family inherit
          white-space pre
          white-space pre-wrap
          word-wrap break-word
          caret-color #199f96
          border-bottom 1px solid #fff
          -webkit-appearance none // 去掉safari默认圆角
          border-radius 0
      .tool
        position absolute
        right 0
        top 0
        display flex
        height 100%
        padding-right .170667rem
        text-align center
        background-color #fff
        z-index 2
        .emoji, .send
          flex 1
          display flex
          justify-content center
          align-items center
          height 100%
          span
            display inline-block
            width .938667rem
            height .682667rem
            line-height .682667rem
            color #ababab
            text-align center
            border-radius .085333rem
        .emoji
          span
            &.active
              color #199f96
            i
              font-size .375467rem
        .send
          span
            &.active
              color #fff
              background-color #199f96
    .emojiBox
      position relative
      width 100%
      height 2.56rem
      overflow hidden
      background-color #fff
      .emojiWrapper
        position relative
        width 100%
        height 100%
        .emoji-item
          position absolute
          top 0
          left 0
          width 100%
          height 100%
          clear both
          background-color #fff
          .list-item
            float left
            width 20%
            text-align center
            margin .170667rem 0 0
      .indicators
        position absolute
        bottom .170667rem
        left 50%
        transform translateX(-50%)
        .indicator
          display inline-block
          width .136533rem
          height .136533rem
          margin 0 .0512rem
          border-radius 50%
          background-color #000
          opacity 0.2
          &.active 
            background-color red
            opacity 1
  .tones
    position absolute
    bottom 0
    left 0
  .voice
    position absolute
    top 0
    right 0
    padding 0 .170667rem
    height .682667rem
    line-height .682667rem
    z-index 99
    .icon-shengyin, .icon-jingyin
      font-size .426667rem
    .icon-shengyin
      color #199f96
    .icon-jingyin
      color #ccc

</style>