<template>
  <div class="te-details">
    <div class="te-container">
      <!-- 顶部标题 -->
      <v-title :title="title"></v-title>
      <span class="talk" @click="goTalk"><i class="iconfont icon-liaotian"></i></span>
      <!-- 前辈详情 -->
      <div class="te-wrapper" ref="scrollBox">
        <div class="scrollWrapper">
          <div class="te-intro">
            <div class="picture">
              <img :src="qbDetail.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
            </div>
            <div class="info">
              <div class="intro">
                <h2 class="name">{{qbDetail.teacher_name}}</h2>
                <span class="edu">{{qbDetail.u_d_edu}}</span>
                <span class="birthday">{{qbDetail.u_d_birthday}}</span>
                <span class="address" v-if="qbDetail.area_name">{{qbDetail.province_name}}-{{qbDetail.city_name}}-{{qbDetail.area_name}}</span>
              </div>
              <div class="te-motto">
                Motto：
                <span class="motto" v-if="qbDetail.u_d_motto">{{qbDetail.u_d_motto}}</span>
                <span class="noMotto" v-else>暂无宣言</span>
              </div>
            </div>
          </div>
          <div class="te-resume">
            <div class="title">
              <h2>工作经历</h2>
              <div class="content">
                <p>
                  <span class="taj">任职公司</span>：<span class="text">{{qbDetail.q_company}}</span>
                </p>
                <p>
                  <span class="taj">职位</span>：<span class="text">{{qbDetail.q_job}}</span>
                </p>
                <p>
                  <span class="taj">技能</span>：<span class="text">{{qbDetail.q_tech}}</span>
                </p>
                <p>
                  <span class="taj">入行时间</span>：<span class="text">{{qbDetail.ruhang}}</span>
                </p>
              </div>
            </div>
            <div class="title">
              <h2>教育经历</h2>
              <div class="content">
                <p>
                  <span class="taj">学校名称</span>：<span class="text">{{qbDetail.u_d_collage_name}}</span>
                </p>
                <p>
                  <span class="taj">专业</span>：<span class="text">{{qbDetail.u_d_major}}</span>
                </p>
                <p>
                  <span class="taj">最高学历</span>：<span class="text">{{qbDetail.u_d_edu_name}}</span>
                </p>
                <p>
                  <span class="taj">毕业时间</span>：<span class="text">{{qbDetail.u_d_edu_time_view}}</span>
                </p>
              </div>
            </div>
            <div class="title">
              <h2>项目经验</h2>
              <div class="content">
                <div class="text" v-if="!project">{{projects}}</div>
                <div class="item-list" v-else v-for="(project,index) in projects" :key="index">
                  <p>
                    <span class="taj">项目名称</span>：<span class="text">{{project.p_title}}</span>
                  </p>
                  <p>
                    <span class="taj">项目职位</span>：<span class="text">{{project.p_work}}</span>
                  </p>
                  <p>
                    <span class="taj">项目地址</span>：
                    <span class="text">
                      <a :href="project.p_url">{{project.p_url}}</a>
                    </span>
                  </p>
                  <p>
                    <span class="taj">开发时间</span>：<span class="text">{{project.p_pro_time}}</span>
                  </p>
                  <p>
                    <span class="taj">项目简介</span>：<span class="text">{{project.p_intro}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="title">
              <h2>作品展示</h2>
              <div class="content">
                <div class="text" v-if="!zuoping">{{zuopings}}</div>
                <div class="item-list" v-else v-for="(zuoping,index) in zuopings" :key="index">
                  <p>
                    <span class="taj">作品名称</span>：<span class="text">{{zuoping.u_z_title}}</span>
                  </p>
                  <p>
                    <span class="taj">作品地址</span>：
                    <span class="text">
                      <a :href="zuoping.u_z_url">{{zuoping.u_z_url}}</a>
                    </span>
                  </p>
                  <p>
                    <span class="taj">作品简介</span>：<span class="text">{{zuoping.u_z_intro}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="title">
              <h2>联系方式</h2>
              <div class="content">
                <p>
                  <span class="taj">手机</span>：<span class="text">{{qbDetail.phone_view}}</span>
                </p>
                <p>
                  <span class="taj">QQ邮箱</span>：<span class="text">{{qbDetail.email}}</span>
                </p>
              </div>
            </div>
            <div class="title">
              <h2>自我评价</h2>
              <div class="content">
                <div class="text" v-if="qbDetail.q_intro">{{qbDetail.q_intro}}</div>
                <div class="text" v-else>前辈很忙，连自我评价的时间都没有</div>
              </div>
            </div>
            <div class="title">
              <h2>带领学员-<span>{{shituNum}}</span>人</h2>
              <div class="content">
                <div class="text" v-if="!shitu">{{shitus}}</div>
                <div class="shitu" v-else>
                  <ul>
                    <li class="shitu-item" v-for="(shitu,index) in shitus" :key="index">
                      <div class="shitu-img">
                        <img :src="shitu.s_d_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null">
                      </div>
                      <div class="shitu-info">
                        <p class="shitu-name">
                          <span>{{shitu.s_d_name}} - {{shitu.s_d_ke_title}}</span>
                        </p>
                        <p class="text">{{shitu.s_d_stime}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll"

  export default {
    name:"teDetails",
    data () {
      return {
        title: {
          text: "前辈详情",
          back: true
        },
        qbDetail: {},
        projects: "",
        project: false,
        shitus: "",
        shitu: false,
        shituNum:0,
        zuopings: "",
        zuoping: false
      }
    },
    methods: {
      // 获取前辈详情
      get_teDetails() {
        let qbId = this.$route.params.qianId;
        this.$axios.get("/api/Index/qianbeiDetail/rid/" + qbId)
        .then((response) =>{
          let res = response.data.data.data;
          this.qbDetail = res.qianbeiDetail;
          // 项目
          if(res.projects.length == 0) {
            this.projects = "该前辈没有已做过的项目！";
          }else{
            this.project = true;
            this.projects = res.projects;
          }
          // 学员
          if(res.shitus.length == 0) {
            this.shitus = "该前辈暂未收徒，赶快拜他为师吧！";
          }else{
            this.shitu = true;
            this.shituNum = res.shitus.length;
            this.shitus = res.shitus;
          }
          // 作品
          if(res.zuopings.length == 0) {
            this.zuopings = "前辈暂无作品展示！";
          }else{
            this.zuoping = true;
            this.zuopings = res.zuopings;
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast("网络错误!");
        })
      },
      // 去聊天
      goTalk() {
        // 登录验证由main.js里路由导航守卫完成
        this.$router.push({
          name: "dialogue",
          params: {
            uid: this.qbDetail.u_id,
            qian_name: this.$route.params.user_name
          }
        });
      },
      _initScroll() {
        this.BScroll = new betterScroll(this.$refs.scrollBox,{
          click: true,
          mouseWheel: true, // 开启鼠标滚轮
        })
      }
    },
    created() {
      this.get_teDetails();
    },
    mounted() {
      this.$nextTick(() =>{
        this._initScroll();
      })
    }
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

  .te-details
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    width 100%
    height 100%
    z-index 1000
    .te-container
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      width 100%
      height 100%
      overflow hidden
      .talk
        position absolute
        top 0
        right 0
        width .682667rem
        height .682667rem
        line-height .682667rem
        color #199f96
        z-index 9
        .icon-liaotian
          font-size .341333rem
      .te-wrapper
        position absolute
        top .682667rem
        bottom 0rem
        width 100%
        overflow hidden
        .scrollWrapper
          padding .170667rem 0
          .te-intro
            display flex
            align-items center
            background-color #fff
            min-height 1.706667rem
            .picture
              display inline-block
              width 1.024rem
              height 1.024rem
              margin 0 .170667rem
              img
                width 1.024rem
                height 1.024rem
                border-radius 50%
            .info
              display inline-block
              width 100%
              font-size .238933rem
              .name
                display inline-block
                font-size .273067rem
                font-weight 600
              .intro
                padding .085333rem 0
                border-bottom 1px solid #199f96
                .edu, .birthday, .address
                  font-size .221867rem
              .te-motto
                padding .085333rem
                font-size .238933rem
                word-wrap break-word
                .noMotto
                  color #838383
          .te-resume
            .title
              margin .170667rem 0
              h2
                text-align center
                color #199f96
                margin-bottom .085333rem
              .content
                background-color #fff
                padding .170667rem .256rem
                line-height .3072rem
                a
                  color #199f96
                .text
                  color #838383
                .item-list
                  margin-bottom .170667rem
                .shitu
                  .shitu-item
                    display flex
                    padding .170667rem 0
                    border-bottom-1px(#ccc)
                    &:last-child
                      border-none-1px()
                    .shitu-img
                      display inline-block
                      width .682667rem
                      height .682667rem
                      padding-right .170667rem
                      img
                        width .682667rem
                        height .682667rem
                        border-radius 50%
                    .shitu-info
                      display inline-block
                      line-height .341333rem
                      .shitu-name
                        font-size .238933rem
                        color #000
                .taj
                  display inline-block
                  width 1.194667rem
                  height .341333rem
                  text-align justify
                  vertical-align top
                .taj:after
                  display inline-block
                  content ""
                  width 100%

</style>