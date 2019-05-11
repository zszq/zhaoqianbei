<template>
  <div class="teacherDetail">
    <div class="teacherlist">
      <ul>
        <li class="item" v-for="(item, index) in teacherList" :key="index" @click="showTeDetails(index)">
          <div class="item-left" v-fb>
            <div class="warp">
              <div class="picture">
                <img :src="item.u_img_curl" alt="" onerror="javascript:this.src='https://www.zhaoqianbei.com/Public/img/default.png';this.onerror=null;">
              </div>
              <div class="info">
                <h2 class="name fc4">{{item.user_name}}</h2>
                <p class="company">{{item.q_company}}</p>
              </div>
            </div>
            <div class="intro">
              <p class="intro-info">已带{{item.allStuIng}} | 在带{{item.allStuEnd}} | {{item.pinjia}}</p>
              <p class="describe">{{item.q_intro}}</p>
            </div>
          </div>
          <div class="item-right">
            <button 
              :class="[{prohibit: item.guanxi == -1 ? false : true}, 'baishiBtn']" 
              :disabled="item.guanxi == -1 ? false : true"
              @click.stop="baishi(index)" 
            >
              {{baishiState(item.guanxi)}}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import qs from "qs"

  export default {
    data () {
      return {
        
      }
    },
    methods: {
      // 显示前辈详情
      showTeDetails(index) {
        let qianId = this.teacherList[index].qian_id;
        let user_name = this.teacherList[index].user_name;

        this.$router.push({
          name: "teDetails",
          params: {
            qianId: qianId, // 详情页请求数据用
            user_name: user_name // 聊天页面标题名字用
          }
        });
      },
      // 拜师
      baishi(index) {
        if (sessionStorage.getItem("isLogin")) {
          this.$confirm("确认拜师？").then(() => {
            let qian_id = this.teacherList[index].qian_id; // 前辈id
            let ke_id = this.teacherList[index].q_k_id; // 课程id
            let u_id = this.teacherList[index].id; // uid
            let data = {qid: qian_id, kid: ke_id, u_id: u_id}
            let formatData = qs.stringify(data); //序列化数据
            
            this.$axios.post('/api/Ajax/baishi', formatData)
            .then((response) => {
              // console.log(response)
              // 0 拜师自己, 1 拜师成功, -1 拜师失败, -2 数据未传入
              if(response.data.ret_msg === 1) {
                this.$toast("拜师成功,等待确认！");
              }else{
                this.$toast("拜师失败！");
              }
            })
            .catch((error) => {
              console.log(error);
              this.$toast("网络错误！");
            })
          }).catch(() => {
            return;
          })
        }else{
          this.$toast("请先登录！");
          setTimeout(() => {
            this.$router.push({
              path: "/user/login",
              query: {redirect: "/dake"}
            });
          }, 1200)
        }
      },
      // 拜师状态
      // -1拜师 0等待确认 1时pc端支付 2去学习 3已结业 5自己
      baishiState(state) {
        // console.log(state)
        switch(state) {
          case -1:
            return "拜师";
            break;
          case 0:
            return "待确认";
            break;
          case 1:
            return "待支付";
            break;
          case 2:
            return "学习中";
            break;
          case 3:
            return "已结业";
            break;
          case 5:
            return "自己";
            break;
          default:
            break;
        }
      }
    },
    mounted() {
      
    },
    props:['teacherList']
  }
</script>

<style lang='stylus' scoped>
@import '../../assets/stylus/mixin.styl'

  .teacherlist
    .item
      position relative
      overflow auto
      border-bottom-1px(#ddd)
      &:last-child
        border-none-1px()
      .item-left
        padding .170667rem 1.877333rem .170667rem .170667rem
        background-color #fff
        .warp 
          display flex
          .picture
            width .853333rem
            height .853333rem
            display inline-block
            img
              width .853333rem
              height .853333rem
          .info
            width 70%
            display inline-block
            margin-left .170667rem
            .name
              font-weight 600
            .company
              white-space nowrap
              text-overflow ellipsis
              overflow hidden
        .intro
          word-wrap break-word
          .intro-info
            color #666
            font-size .256rem
          .describe
            overflow hidden
            text-overflow ellipsis
            display -webkit-box //将对象作为弹性伸缩盒子模型显示。
            -webkit-box-orient vertical //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
            -webkit-line-clamp 2 //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。这个属性比较合适WebKit浏览器或移动端（绝大部分是WebKit内核的）浏览器。
      .item-right
        position absolute
        right .426667rem
        top 50%
        transform translateY(-50%)
        .baishiBtn
          width 1.024rem
          padding .085333rem 0
          text-align center
          vertical-align middle
          color #199f96
          font-size .273067rem
          background-color #fff
          border .017067rem solid #199f96
          outline none
          border-radius .0512rem
          cursor pointer
        .prohibit
          color #666
          border .017067rem solid #666
          cursor not-allowed

  

</style>