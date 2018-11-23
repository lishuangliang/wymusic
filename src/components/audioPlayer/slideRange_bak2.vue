<template>
  <div class="process">
    <div class="bar" ref="barEle">
      <div class="played" :style="{width : percent + '%'}"></div>
      <div class="dot"
           @touchstart.prevent="startEvt"
           @touchmove.prevent="startMove"
           @touchend="startEnd"
           :style="{webkitTransform : 'translateX(' +dotOffsetLeft+ 'px)'}"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "slideRange",
        props :{
          percent:{
            default : 0
          }
        },
        data(){
          return {
            dotOffsetLeft : 0,
            touchInfo: {
              initiated: false
            }
          }
        },
        mounted(){
          this.barLength = this.$refs.barEle.clientWidth;
          console.log('this.barLength', this.barLength);
          this.dotOffsetLeft = this.barLength * this.percent / 100;
        },
        methods:{
          startEvt(e){
            this.touchInfo.initiated = true;
            // 点击位置
            this.touchInfo.startX = e.touches[0].pageX - this.dotOffsetLeft;
            // 点击时进度条长度
            this.$emit('changeStart');
          },
          startMove(e){
            if(!this.touchInfo.initiated) return;
            let disX = e.touches[0].pageX - this.touchInfo.startX;
            let posX = Math.round(disX / this.barLength * 100);

            if(disX > this.barLength){disX = this.barLength}
            else if(disX <0){disX = 0}
            this.dotOffsetLeft = this.barLength * this.percent / 100;

            this.$emit('changePercent', posX);
          },
          startEnd (){
            this.touchInfo.initiated = false;
            this.$emit('changeDone');
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
        margin-left unit(-@width/2 + 1, 'px')
        top unit(-@height/2 + 1,'px')
        background-color rgba(255,255,255,0)
        border-radius 100%
        &:before
          content ''
          position absolute
          left 50%
          top 50%
          width 12px
          height 12px
          margin -6px 0 0 -6px
          border-radius 100%
          background-color #fff
        &:after
          content ''
          position absolute
          left 50%
          top 50%
          width 4px
          height 4px
          margin -2px 0 0 -2px
          border-radius 100%
          background-color g-color

</style>
