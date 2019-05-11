<template>
  <div class="keInfo">
    <div class="info" @click="showKeDetails" v-fb>
      <div class="wrap">
        <div>
          <p>原价：<span class="invalid">{{kecheng.ke_price}}元</span></p>
          <p>班级大小：<span>一对一</span></p>
        </div>
        <div>
          <p>优惠价：<span class="enable">{{kecheng.ke_dis_price}}元</span></p>
          <p>学习周期：<span>{{kecheng.ke_period}}个月左右</span></p>
        </div>
      </div>
      <p class="text">{{kecheng.ke_short_intro}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    methods:{
      showKeDetails() {
        this.$store.commit('set_detail', this.kecheng);
        this.$router.push("/dake/keDetails");
      }
    },
    props:{
      kecheng:{
        type: Object
      }
    }
  }
</script>

<style lang='stylus' scoped>
.keInfo
  padding .170667rem 0
  background-color #efeff4
  .info
    padding .170667rem
    background-color #fff
    .wrap
      display flex
      justify-content space-between
      .invalid
        text-decoration line-through
      .enable
        color #f23a3a
    .text
      text-indent 2em
    
</style>