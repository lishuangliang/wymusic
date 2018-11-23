<template>
    <div class="p-page">
      <header-bar>
        <a class="left iconfont u-icon-microphone"></a>
        <div class="u-search" slot="center" @click="$router.push('search')">随机推荐</div>
      </header-bar>
      <div class="home-scroller">
        <div class="content">
          <banner></banner>
          <div class="home-menu">
            <a class="item">
              <div class="icon">
                <span class="iconfont u-icon-radio"></span>
              </div>
              <span class="text">私人FM</span>
            </a>
            <a class="item">
              <div class="icon">
                <span class="iconfont u-icon-kalendar"></span>
              </div>
              <span class="text">每日推荐</span>
            </a>
            <a class="item">
              <div class="icon">
                <span class="iconfont u-icon-music-list"></span>
              </div>
              <span class="text">歌单</span>
            </a>
            <a class="item">
              <div class="icon">
                <span class="iconfont u-icon-rank"></span>
              </div>
              <span class="text">排行榜</span>
            </a>
          </div>

          <!--推荐歌单-->
          <h2 class="item-title">推荐歌单</h2>
          <ul class="commend-music" v-if="commendMusic.length > 0">
            <li class="list" v-for="list in commendMusic.slice(0,9)">
              <!--<div class="bg"></div>-->
              <div class="bg" v-lazy:background-image="list.picUrl"></div>
              <div class="playcount">{{list.playCount}}</div>
              <div class="desc">{{list.copywriter}}</div>
            </li>
          </ul>
          <div class="block-loading" v-else>
            <div class="list"></div>
            <div class="list"></div>
            <div class="list"></div>
          </div>
        </div>
      </div>

      <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../../components/footernav/footernav'
    import headerBar from '../../components/headerbar/headerbar'
    import banner from './banner/banner'

    import {reqCommendMusic} from "../../api";

    import BScroll from 'better-scroll'


    export default {
        name: "home",
        data(){
          return {
            scroller : null,
            commendMusic : []     //推荐歌单
          }
        },
        mounted(){
            this.getCommendMusic();
        },
        methods:{
          async getCommendMusic(){
            let res = await reqCommendMusic();
            if(res.code != 200){
              this.$toast('获取推荐歌单失败');
              return
            }
            this.commendMusic = res.result;

            this.$nextTick(()=>{
              this.scroller = new BScroll('.home-scroller',{
                click : true
              })
            });
          }
        },
        components:{
          headerBar,
          banner,
          footerNav
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .home-scroller
    position absolute
    left 0
    right 0
    top 48px
    bottom 44px
    padding 0 4px;
    box-sizing border-box
  .home-menu
    margin 20px 0
    overflow hidden
    .item
      display block
      float left
      width 25%
      text-align center
      .icon
        margin 0 auto
        width 50px
        height 50px
        line-height 50px
        background g-color
        border-radius 100%
      .iconfont
        font-size 30px
        color #fff
        text-align center

      .text
        font-size 12px
  .item-title
    font-size 18px
    margin 10px 2px
  .commend-music
    overflow hidden
    .list
      position relative
      float left
      width calc(33.33% - 4px)
      margin 0 2px 10px 2px
      .bg
        width 100%
        padding-bottom 100%
        background-color #eee
        background-size cover
        border-radius 4px
      .playcount
        position absolute
        right 6px
        top 6px
        font-size 10px
        color #fff
      .desc
        margin 2px
        height 32px
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size 12px





</style>
