<template>
    <div class="player-bar bot-border-1px">
      <div class="iconfont u-icon-back" @click="$store.commit('hidePlayer')"></div>
      <slot></slot>
      <div class="u-icon u-icon-share"></div>
    </div>
</template>

<script>
    export default {
        name: "headerbar",

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .player-bar
    position absolute
    left 0
    top: 0
    width 100%
    height 44px
    .u-icon-back
      position absolute
      left 10px
      top: 10px
      color #fff
      font-size 20px
    .title
      margin 4px 20%
      text-align center
      color g-white-font-color
      .s-name
        font-size 14px
      .singer
        font-size 10px
</style>
