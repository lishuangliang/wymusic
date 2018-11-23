<template>
  <transition name="slide-left">
    <div class="u-btn iconfont u-icon-music-tg"
         :class="{on : $store.state.playeraction}"
         @click="openPlayer">
    </div>
  </transition>
</template>

<script>
    export default {
        name: "openPlayer",
        methods:{
          openPlayer(){
            this.$store.dispatch('getPlayMusicDetail');
            this.$store.commit('showPlayer');
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .u-icon-music-tg
    position absolute
    right:10px
    top:8px
    font-size 26px
    color #fff
    z-index 1
    &.on
      animation rotate 6s infinite linear

</style>
