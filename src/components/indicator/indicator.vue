<template>
    <modal-box class="m-loading" :visible="visible">
      <div class="content">{{text}}</div>
    </modal-box>
</template>

<script>
    import modalBox from '../../components/modalbox/modalbox'

    export default {
        name: "indicator",
        data(){
          return {
            visible : false,
            text : ''
          }
        },
        components:{
          modalBox
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .m-loading
    .content
      position absolute
      left 50%
      top: 40%
      width 100px
      height 100px
      margin-left unit(-@width/2,'px')
      border-radius 4px
      background-color #000
      color #fff
      text-align center
      &:before
        content ''
        display block
        width 40px
        height 40px
        margin 12px auto 8px
        border 2px solid rgba(255,255,255,0.7)
        border-right-color transparent
        border-radius 100%
        animation rotate 0.8s linear infinite

</style>
