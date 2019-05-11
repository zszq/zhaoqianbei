<template>
  <!-- <transition name="slide"> -->
    <div class='search'>
      <!-- 搜索框 -->
      <div class="searchBox">
        <div class="searchWrapper">
          <div class="search-outer">
            <input 
              type="text" 
              class="search-input" 
              placeholder="搜索" 
              autofocus="autofocus" 
              v-model="searchText" 
              @keyup="search"
              v-focus
            >
            <div class="search-inner">
              <i class="iconfont icon-search"></i>
            </div>
          </div>
          <div class="search-cancel" @click="searchCancel">
            <span>取消</span>
          </div>
        </div>
      </div>
      <!-- 搜索结果 -->
      <div class="searchResult" ref="scrollBox">
        <div class="box">
          <div class="searchTips" v-show="!showResult"><span>输入内容进行搜索</span></div>
          <div v-show="showResult">
            <ul class="resultList">
              <li 
                class="list-item" 
                v-for="(item, index) in searchResult" 
                :key="index" 
                @click="goDialog(index)"
                v-fb
              >
                <div class="list-item-dialog">
                  <div class="dialog-left">
                    <img :src="item.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
                  </div>
                  <div class="dialog-right">
                    <h3 class="dialog-name">{{item.user_name}}</h3>
                    <p class="location">{{item.ip_location}}</p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="searchTips"><span>没有更多搜索结果</span></div>
          </div>
        </div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<script>
import betterScroll from "better-scroll"

  export default {
    data () {
      return {
        searchText: "",
        searchResult: [],
        dialogList: this.$route.params.dialogList,
        showResult: false
      }
    },
    methods: {
      // 搜索聊天
      search() {
        if(this.searchText !== "") {
          this.showResult = true;
          this.searchResult = []; // 每次触发搜索先清空
          this.dialogList.forEach((list_item) => {
            let name = list_item.user_name;
            if(name.indexOf(this.searchText) >= 0) {
              this.searchResult.push(list_item);
            }
          })
        }else{
          this.showResult = false;
        }
      },
      // 取消搜索
      searchCancel() {
        this.$router.back();
      },
      // 去聊天
      goDialog(index) {
        this.$router.push({
          name: "dialogue",
          params: {
            uid: this.searchResult[index].u_id,
            qian_name: this.searchResult[index].user_name
          }
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true
        })
      })
    },
    components: {

    }
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

  .search
    .searchBox
      position fixed
      top 0
      left 0
      width 100%
      height .768rem
      background #efeff4
      z-index 99
      .searchWrapper
        display flex
        margin .085333rem
        .search-outer
          flex 1
          display flex
          position relative
          background-color #fff
          border-radius .0512rem
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
        .search-cancel
          width .768rem
          height .5632rem
          margin-left .085333rem
          line-height .5632rem
          text-align center
          span
            color #199f96
            line-height .512rem
    .searchResult
      position absolute
      top .768rem
      left 0
      right 0
      bottom 0
      overflow hidden
      .box
        padding .170667rem 0
        .searchTips
          padding .170667rem 0
          text-align center
          color #a4a4a4
          font-size .221867rem
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
            border-bottom-1px(#f1f1f1)
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
                font-weight normal
                font-size .273067rem
              .location
                font-size .221867rem
                color #666

</style>