<template>
  <div class='msgList'>
    <!-- 顶部标题 -->
    <v-title :title="title"></v-title>
    <!-- 没有登录时 -->
    <v-gologin v-if="showLogin"></v-gologin>
    <!-- 登录时 消息列表 -->
    <div class="scrollBox" ref="scrollBox" v-if="!showLogin">
      <div class="box">
        <div class="search">
          <div class="search-outer" @click="toSearch($event)">
            <input type="text" class="search-input" placeholder="搜索">
            <div class="search-inner">
              <i class="iconfont icon-search"></i>
            </div>
          </div>
        </div>
        <div class="list">
          <ul>
            <li 
              class="list-item" 
              v-for="(item, index) in dialogList" 
              :key="index"
              @touchstart="onTouchStart(index,$event)"
              @touchmove="onTouchMove(index,$event)"
              @touchend="onTouchEnd(index,$event)"
              ref="listSlider"
            >
              <div class="list-item-dialog" @click="goDialog(index,$event)" v-fb>
                <div class="dialog-left">
                  <img :src="item.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
                </div>
                <div class="dialog-right">
                  <h3 class="dialog-name">{{item.user_name}}</h3>
                  <p class="location">{{item.ip_location}}</p>
                </div>
              </div>
              <div class="list-item-delete" @click.stop="deleteDialog(index)" ref="deleteWidth">删除</div>
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
    data () {
      return {
        title: {
          text: "消息",
          back: false
        },
        showLogin: false,
        dialogList: [], // 聊天列表
        startX: "",
        startY: "",
        X:"",
        moveX: "",
        moveY: "",
        Y:"",
        endX: "",
        deleteWidth: "", // 删除按钮 的宽度
        itemHeight: "" // 每一项的高度
      }
    },
    methods: {
      // 请求消息列表
      get_msgList() {
        let token = sessionStorage.getItem("token");
        this.$axios.get(`/api/Ajax/msg/token/${token}`)
        .then((response) => {
          // console.log(response);
          this.dialogList = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.$toast("网络错误!");
        })
      },
      // 跳转到search搜索页
      toSearch(e) {
        e = e || event;
        e.target.blur(); // 不获取焦点
        this.$router.push({
          name: "search",
          params: {dialogList: this.dialogList}
        });
      },
      // 跳转到聊天页
      goDialog(index,e) {
        e = e || event;
        // 如果点击的项显示删除则隐藏并阻止默认事件
        if(this.$refs.listSlider[index].style.transform == "translateX(-1.365333rem)") {
          e.preventDefault();
          this.$refs.listSlider[index].style = "transform:translateX(0px)";
        }else{
          // 如果点击项没有显示删除则设置所有删除隐藏
          this.$refs.listSlider.forEach(list => {
            list.style.transform = "translateX(0px)";
          });
          // 跳转到dialog聊天页,延迟100ms只是为了删除按钮动画和跳转动画不突兀
          setTimeout(() => {
            this.$router.push({
              name: "dialogue",
              params: {
                uid: this.dialogList[index].u_id,
                qian_name: this.dialogList[index].user_name
              }
            });
          }, 100)
        }
      },
      // 删除当前对话
      deleteDialog(index) {
        // 后台尚未提供删除api，模拟操作
        this.dialogList.splice(index, 1); // 删除dialogList里当前项
        // 删除完后设置所有滑动到最右边（因为index保持不变，删除项下面项会继续保持删除按钮）
        this.$refs.listSlider.forEach(list => {
          list.style.transform = "translateX(0rem)";
          list.style.transition = "0s";
        });
      },
      onTouchStart(index, e) {
        e = e || event;
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
        this.deleteWidth = this.$refs.deleteWidth[0].offsetWidth;
        this.itemHeight = this.$refs.listSlider[0].offsetHeight;
      },
      onTouchMove(index, e) {
        e = e || event;
        this.moveX = e.changedTouches[0].clientX;
        this.moveY = e.changedTouches[0].clientY;
        this.X = this.startX - this.moveX;
        this.Y = Math.abs(this.startY - this.moveY);
        // 开始滑动时让所有已滑动恢复原样
        this.$refs.listSlider.forEach(list => {
          list.style.transform = "translateX(0rem)";
        });
        // X方向滑动大于0并且Y方向滑动绝对值小于当前项高度开始左滑
        if(this.X > 0 && this.Y < this.itemHeight){
          // X滑动距离小于删除宽度滑动X距离，大于时最大滑动只能为删除宽度
          this.X = this.X < this.deleteWidth ? this.X : this.deleteWidth;
          this.$refs.listSlider[index].style = `transform:translateX(-${this.X}px)`;
        }else{
          // 否则进行的是右滑恢复或者或者上滑不进行滑动
          this.$refs.listSlider[index].style = "transform:translateX(0rem)";
        }
      },
      onTouchEnd(index, e) {
        // 此时滑动(左滑)大于删除宽度时this.X的宽度设置为了删除宽度
        // X滑动大于Y滑动绝对值（X正数才会大于），并且Y小于当前项高度设置左滑
        if(this.X > this.Y && this.Y < this.itemHeight) {
          if(0 < this.X < this.deleteWidth / 2){ // 如果X方向滑动小于删除宽度一半恢复滑动到0
            this.$refs.listSlider[index].style = "transform:translateX(0rem)";
          }
          if(this.X > this.deleteWidth / 2){ // 如果X方向滑动大于删除宽度一半滑动到删除宽度
            this.$refs.listSlider[index].style = `transform:translateX(-${this.deleteWidth}px)`;
          }
        }
        // 滑动结束重置X，Y为0
        this.X = 0;
        this.Y = 0;
      },
      // 去登录
      goLogin() {
        this.$router.push({
          path: "/user/login",
          query: {redirect: "/message/msgList"}
        });
      }
    },
    mounted() {
      this.get_msgList();
      
      this.$nextTick(() => {
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true,
          mouseWheel: true, // 开启鼠标滚轮
        })
      })
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if(sessionStorage.getItem("isLogin")) {
          vm.showLogin = false;
        }else{
          vm.showLogin = true;
        }
      })
    }
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

  .msgList
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color #fff
    .scrollBox
      position absolute
      top .682667rem
      left 0
      right 0
      bottom .853333rem
      overflow hidden
      background-color #efeff4
      .box
        .search
          padding .136533rem .085333rem
          background #f5f5f5
          .search-outer
            position relative
            display flex
            background-color #fff
            border-radius .0512rem
            overflow hidden
            .search-input
              flex 1
              padding .136533rem 0
              padding-left .512rem
              caret-color #199f96
              background-color #fff
              border none
              outline none
            .search-inner
              position absolute
              left .136533rem
              top 50%
              transform translateY(-50%)
              color #a4a4a4
        .list
          .list-item
            position relative
            width 100%
            transition all .2s linear
            cursor pointer
            .list-item-dialog
              position relative
              display flex
              align-items center
              height .768rem
              padding .170667rem
              background-color #fff
              border-bottom-1px(#ddd)
              .dialog-left
                display inline-block
                width .682667rem
                height .682667rem
                img
                  width .682667rem
                  height .682667rem
                  border-radius 50%
              .dialog-right
                display inline-block
                padding-left .170667rem
                line-height .341333rem
                .dialog-name
                  color #444
                  font-size .273067rem
                .location
                  font-size .221867rem
                  color #666
            .list-item-delete
              position absolute
              right 0
              top 0
              width 1.365333rem
              height 1.109333rem
              line-height 1.109333rem
              color #fff
              text-align center
              background-color #ff1744
              transform translateX(100%)



</style>