<template>
    <modal-box class="m-toast" :visible="visible">
        <div class="content">{{text}}</div>
    </modal-box>
</template>

<script>
    import modalBox from '../../components/modalbox/modalbox'
    export default {
        name: "toast",
        data (){
          return{
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
.m-toast
  .content
    position absolute
    left 10%
    width 80%
    top 46%
    padding 14px 20px
    box-sizing border-box
    color #fff
    text-align center
    font-size 16px
    background-color rgba(0,0,0,0.9)
    border-radius 6px
</style>
