<template>
    <div class="p-page account">
      <header-bar >
        <div class="title" slot="center">账号</div>
      </header-bar>
      <div class="scroller">
        <div class="content">

          <div class="logout-panel" v-if="!userInfo.nickname">
            <p>登录可同步歌单</p>
            <router-link to="login" class="u-btn u-btn-login">立即登录</router-link>
          </div>
          <div class="login-panel" v-else>
            <div class="header-img" :style="{backgroundImage : 'url(' +userInfo.avatarUrl+ ')'}"></div>
            <div class="user-info">
              <div class="name">{{userInfo.nickname}}</div>
              <i class="level">Lv {{userInfo.vipType}}</i>
            </div>
            <button class="u-btn u-btn-signin">签到</button>
            <div class="items-list top-border-1px">
              <div class="list">
                <div class="type">动态</div>
                <span>{{userInfo.authStatus}}</span>
              </div>
              <div class="list">
                <div class="type">关注</div>
                <span>{{userInfo.authority}}</span>
              </div>
              <div class="list">
                <div class="type">粉丝</div>
                <span>{{userInfo.userType}}</span>
              </div>
              <div class="list">
                <div class="">修改资料</div>
              </div>
            </div>
          </div>
          <ul class="m-list-panel">
            <li class="list">我的消息</li>
          </ul>
          <ul class="m-list-panel">
            <li class="list">会员中心</li>
            <li class="list">商城</li>
            <li class="list">游戏推荐</li>
            <li class="list">在线听歌免流量</li>
          </ul>
          <ul class="m-list-panel">
            <li class="list">设置</li>
            <li class="list">个性换肤</li>
            <li class="list">夜间模式</li>
            <li class="list">音乐闹钟</li>
          </ul>
          <ul class="m-list-panel">
            <li class="list">分享web app</li>
            <li class="list">关于</li>
          </ul>
          <ul class="m-list-panel" v-if="userInfo.nickname">
            <li >
              <button @click="logout" class="u-btn u-btn-logout">退出</button>
            </li>
          </ul>
        </div>
      </div>
      <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../../components/footernav/footernav'
    import headerBar from '../../components/headerbar/headerbar'

    import {reqLogout} from "../../api";

    import BScroll from 'better-scroll'
    export default {
        name: "account",
        data(){
          return {
            scroller : null
          }
        },
        computed:{
          userInfo(){
            return this.$store.state.userInfo
          }
        },
        mounted(){
          this.$nextTick(()=>{
            this.scroller = new BScroll('.scroller',{
              click : true
            })
          })
        },
        methods:{
          async logoutFn(){
            let res = await reqLogout();
            if(res.code == 200){
              this.$indicator.close();
              this.$store.commit('clearUserInfo');
              this.refreshScroll();
            }
          },
          logout(){
            this.$confirm('确定要退出登录吗？',{
              sureEvent : ()=>{
                this.$indicator.open('退出登录');
                this.logoutFn().catch((error)=>{
                  this.$indicator.close();
                  this.$toast('退出登录失败');
                })
              }
            })

          },

          refreshScroll(){
            this.$nextTick(()=>{
              this.scroller.scrollTo(0,0,200);
              this.scroller.refresh();
            })
          }
        },
        components:{
          footerNav,
          headerBar
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .account
    .scroller
      position absolute
      top 44px
      left 0
      right 0
      bottom 44px
    .logout-panel
      margin-bottom 16px
      height 120px
      background-color #fff
      overflow hidden
      p
        margin 20px 0 6px
        text-align center
      .u-btn-login
        display block
        margin 0 auto
        width 120px
        padding 8px 12px
        border 1px solid g-color
        text-align center
        border-radius 100px
        color #333
        font-size 12px
    .login-panel
      position relative
      height 160px
      margin-bottom 16px
      background-color #fff
      overflow hidden
      .header-img
        position absolute
        left 20px
        top 20px
        width 60px
        height 60px
        background-color #ccc
        background-size cover
        border-radius 100%
      .user-info
        margin 30px 0 0 100px
        .name
          font-size 18px
          color #000
        .level
          padding 0 12px
          font-size 10px
          font-style italic
          border 1px solid g-white-font-color
          border-radius 100px
      .u-btn-signin
        position absolute
        top 40px
        right 20px
        padding 2px 8px
        color g-color
        box-sizing border-box
        border 1px solid g-color
        border-radius 100px
      .items-list
        position relative
        margin-top 20px
        padding-top 14px
        .list
          float left
          width 25%
          text-align center
          .type
            color #ccc
            font-size 12px
    .u-btn-logout
      display block
      margin 10px auto
      padding 10px 0;
      background-color g-color
      color #fff
      border-radius 4px
      width 60%
</style>
