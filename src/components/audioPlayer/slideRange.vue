<template>
  <div class="bar" >
    <div class="played" :style="{width:percent + '%'}"></div>
    <div class="dot"
         ref="dot"
         @touchstart.prevent="startEvt"
         @touchmove.prevent="startMove"
         @touchend="startEnd"
         :style="{left : percent + '%'}"></div>
  </div>
</template>

<script>
    export default {
        name: "slideRange_bak",
        props:{
          percent:{
            default : 0
          }
        },
        data(){
          return {
            posX : 0,
            touchInfo: {
              initiated: false
            }
          }
        },
        watch : {
          percent(){
            this.posX =this.touchInfo.left= this.barLength * this.percent / 100;
          }
        },
        computed : {
          barLength(){
            return document.body.clientWidth - 120;
          }
        },
        mounted(){
          this.posX = this.touchInfo.left = this.barLength * this.percent / 100;
        },
        methods:{
          startEvt(e){
            this.touchInfo.initiated = true;
            this.touchInfo.startX = e.touches[0].pageX - this.touchInfo.left;
            this.$emit('touchStartEvt');
          },
          startMove(e){
            if(!this.touchInfo.initiated) return;

            this.posX = e.touches[0].pageX - this.touchInfo.startX;
            if(this.posX > this.barLength){this.posX = this.barLength}
            else if(this.posX < 0){this.posX = 0}
            let percent = Math.round(this.posX / this.barLength * 100);
            this.$emit('touchMoveEvt', percent);
          },
          startEnd (){
            this.touchInfo.initiated = false;
            this.$emit('touchEndEvt');
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .process
    position absolute
    left 0
    right: 0
    bottom 14%
    color #fff
    font-size 10px
    .time
      position absolute
      top 0
      &.current-time
        left 20px
      &.all-time
        right 20px
    .bar
      position relative
      margin 8px 60px
      height 2px
      border-radius unit(@height / 2, 'px')
      background #bbb
      .played
        position absolute
        left 0
        top 0
        height 100%
        border-radius unit(@height / 2, 'px')
        background-color g-color
      .dot
        position: absolute
        left 0
        width 36px
        height 36px
        top unit(-@height/2 + 1,'px')
        background-color rgba(255,255,255,0)
        border-radius 100%
        &:before
          content ''
          position absolute
          left 0
          top 50%
          width 12px
          height 12px
          margin-top -6px
          border-radius 100%
          background-color #fff
        &:after
          content ''
          position absolute
          left 0
          top 50%
          width 4px
          height 4px
          margin -2px 0 0 4px
          border-radius 100%
          background-color g-color

</style>
