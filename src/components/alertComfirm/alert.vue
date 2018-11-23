<template>
    <modal-box class="m-alert" :visible="visible">
      <div class="content">
        <div class="title">{{title}}</div>
        <div class="text">{{text}}</div>
        <div class="buttons">
          <button v-for="btn in buttons"
                  @click="btn.event"
                  class="u-btn"
                  :class="{'col-2':buttons.length > 1}">
            {{btn.btnText}}
          </button>
        </div>
      </div>

    </modal-box>
</template>

<script>
    import modalBox from '../../components/modalbox/modalbox'

    export default {
        name: "alert",
        data(){
          return {
            visible : false,
            title : '',
            text : '',
            buttons : [{
              btnText : '确定',
              event : function () {}
            }]
          }
        },
        components:{
          modalBox
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
.m-alert
  .content
    position absolute
    left 10%
    top: 34%
    width 80%
    background-color rgba(0,0,0,0.96)
    border-radius 6px
    color #ddd
    text-align center
    .title
      margin 20px 0
      font-size 16px
      font-weight bold
      color g-color
    .text
      margin 20px
    .buttons
      overflow hidden
      &:after
        content ''
        position absolute
        left 0
        right 0
        width 100%
        height 1px
        transform scaleY(0.5)
        background-color #e8e8e8
      .u-btn
        display block
        width 100%
        padding 14px 0
        color g-color
        font-size 16px
        &.col-2
          position relative
          float left
          width 50%
          &:last-child
            color #dd
            &:after
              content ''
              position absolute
              left 0
              top 0
              bottom 0
              width 1px
              background-color #e8e8e8
              transform scaleX(0.5)



</style>
