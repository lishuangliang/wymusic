<template>
    <transition name="zoom-in">
      <div class="m-modal-box" v-show="visible" @touchmove.stop.prevent>
        <div class="u-mask" ></div>
        <slot></slot>
      </div>
    </transition>
</template>

<script>
    export default {
        name: "modalbox",
        props:{
          visible :{
            type : Boolean,
            default : false
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .m-modal-box
    position fixed
    left 0
    right 0
    top 0
    bottom 44px
    z-index 999
    .u-mask
      position absolute
      left -50%
      top -50%
      width 200%
      height 200%
      background-color rgba(0,0,0,0.1)
</style>
