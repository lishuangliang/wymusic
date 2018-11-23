<template>
    <transition name="slide-left">
      <div class="p-page player">
        <div class="u-poster" :style="{backgroundImage:'url(' +playMusicDetail.poster+ ')'}"></div>
        <div class="u-bg-gradient"></div>
        <header-bar>
          <div class="title">
            <div class="s-name">{{playMusicDetail.name}}</div>
            <div class="singer">{{playMusicDetail.singer}}</div>
          </div>
        </header-bar>
        <transition name="fade-in">
          <div class="disc-bg" @click="lrcShow = true" v-show="!lrcShow">
            <div class="bg"></div>
            <div class="disc" :class="{on:platStatus}">
              <div class="cover" :style="{backgroundImage:'url(' +playMusicDetail.poster+ ')'}"></div>
            </div>
            <div class="control" :class="{on:platStatus}"></div>
            <div class="control-dot"></div>
          </div>
        </transition>
        <my-audio @timeupdate="timeupdate"></my-audio>
        <music-control></music-control>
        <!--歌词模块-->
        <lrc :rendered="lrcShow" @closeLrc="lrcShow = false" ref="lrc"></lrc>
      </div>
    </transition>

</template>

<script>
    import headerBar from './headerbar';
    import myAudio from './audio';
    import musicControl from './musicControl'
    import lrc from './lrc'

    export default {
        name: "player",
        data(){
          return{
            lrcShow : false
          }
        },
        computed:{
          platStatus (){
            return this.$store.state.playeraction
          },
          playMusicDetail (){
            return this.$store.state.playMusicDetail
          }
        },
        watch :{
          playMusicDetail(){
              this.lrcShow  = false;
          }
        },
        methods:{
          timeupdate(percent, allTime){
            //console.log(percent);
            this.$refs.lrc.scrollTo(percent, allTime);
            //this.$refs.lrc.scrollTo(percent);
          }
        },
        components:{
          headerBar,
          myAudio,
          musicControl,
          lrc
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .player
    z-index 2
    .u-bg-gradient,
    .u-poster
      position absolute
      left 0
      top 0
      width 100%
      height 100%
    .u-poster
      background-position center
      background-repeat no-repeat
      background-size 240%
      filter blur(14px)
    .u-bg-gradient
      background: -webkit-linear-gradient(rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.6) 60%);
    .disc-bg
      position absolute
      left 0
      right: 0
      top 44px
      bottom: 0
      overflow hidden
      .control
        position absolute
        left 50%
        top: 0
        width 100px
        height 154px
        background url("./images/play-controler.png") no-repeat
        background-position -4px top
        background-size 100% auto
        transition transform ease 0.3s
        transform-origin left top
        transform rotate(-30deg)
        &.on
          transform rotate(0)
      .control-dot
        position absolute
        left 50%
        top -16px
        width 30px
        height 30px
        margin-left -15px
        background #fff
        border-radius 100%
        &:after
          content ''
          position absolute
          left 50%
          top 50%
          width 14px
          height 14px
          margin -7px 0 0 -7px
          background #ccc
          border-radius 100%


      .bg
        position absolute
        left 50%
        top 60px
        width 300px
        height 300px
        margin-left unit(-@width/2,'px')
        background-color rgba(255,255,255,0.2)
        border-radius 100%

    .disc
      position absolute
      left 50%
      top: 66px
      width 286px
      height 286px
      margin-left unit(-@width/2,'px')
      background url("./images/cd-wrapper.png") no-repeat center
      background-size 100% auto
      animation-fill-mode both
      &.on
        animation rotate 30s infinite linear
        animation-fill-mode both
      .cover
        width 190px
        height 190px
        margin 48px auto
        border-radius 100%
        background-size 100% auto




</style>
