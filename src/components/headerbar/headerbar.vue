<template>
    <div class="m-header-bar in-search">
      <slot></slot>
      <slot name="center"></slot>
      <open-player></open-player>
    </div>
</template>

<script>
    import openPlayer from '../../components/openPlayer/openPlayer'
    export default {
        name: "headerbar",
        components:{
          openPlayer
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .m-header-bar
    position fixed
    top:0
    left 0
    width 100%
    height 44px
    background-color g-color
    z-index 1
    .left
      position absolute
      left 12px
      top:9px
      font-size 22px
      color #fff
    .right
      position absolute
      right:10px
      top:8px
    .u-search
      margin 6px auto
      width 70%
      height 32px
      line-height 30px
      border-radius 18px
      background-color rgba(255,255,255,0.4)
      color rgba(255,255,255,0.6)
      font-size 14px
      text-align center
    .title
      margin 0 100px
      line-height 44px
      color #fff
      font-size 16px
      text-align center


</style>
