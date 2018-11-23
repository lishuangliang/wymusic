<template>
    <div class="p-page my">
      <header-nav>
        <div class="title">我的音乐</div>
      </header-nav>
      <div class="scroller" v-if="$store.state.userInfo.nickname">
        <div class="content">
          <ul class="m-list-panel">
            <li class="list">本地音乐</li>

            <li class="list" @click="goTo('/my/records')">
              <span class="title">最近播放</span>
              <span class="pos-rt count">{{musicRecords.length}}</span>
            </li>


            <li class="list">我的电台</li>
            <li class="list">
              <span class="title">我的收藏</span>
            </li>
            <li class="list">Sati空间</li>
          </ul>
          <ul class="m-list-panel">
            <li class="list">我喜欢的音乐</li>
          </ul>
        </div>
      </div>
      <div class="logout-tips" v-else>
        <p>登录才能获取相关信息哦</p>
        <router-link to="login" class="u-btn-login">去登录</router-link>
      </div>

      <transition name="slide-left" mode="in-out">
        <router-view></router-view>
      </transition>

      <footer-nav></footer-nav>
    </div>

</template>

<script>
  import headerNav from '../../components/headerbar/headerbar'
  import footerNav from '../../components/footernav/footernav'



  export default {
        name: "my",
        computed:{
          userInfo(){
            return this.$store.state.userInfo;
          },
          musicRecords (){
            return this.$store.state.musicRecords;
          }
        },
        methods:{


          goTo(router){
            this.$router.push(router);
          }
        },
        components:{
          headerNav,
          footerNav
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .p-page.my
    .logout-tips
      position absolute
      left 0
      top 36%
      width 100%
      text-align center
      .u-btn-login
        display inline-block
        margin-top 8px
        padding 8px 30px
        color #fff
        font-size 12px
        background-color g-color
        border-radius 100px
    .scroller
      position absolute
      left 0
      right 0
      top 44px
      bottom 44px



</style>
