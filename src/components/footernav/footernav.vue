<template>
    <div class="m-footer-nav top-border-1px">
      <div class="list"
           v-for="(list,index) in navList"
           :key="index"
           @click="goTo(list.router)"
           :class="{on : $route.path.indexOf(list.router) == 0 }">
        <div class="iconfont"
             :class="list.classname">
        </div>
        <span>{{list.text}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "footerbar",
        data(){
          return {
              navList : [
                {router : '/home', text : '发现', classname:'u-icon-find'},
                {router : '/videos', text : '视频', classname:'u-icon-video'},
                {router : '/my', text : '我的', classname:'u-icon-music'},
                {router : '/friend', text : '朋友', classname:'u-icon-friend'},
                {router : '/account', text : '账号', classname:'u-icon-account'},
              ]
          }
        },
        methods:{
          goTo(router){
            this.$router.replace(router)
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .m-footer-nav
    position fixed
    bottom:0
    left 0
    height 44px
    width 100%
    background-color rgba(255,255,255,1)
    .list
      width 20%
      float left
      padding-top 4px
      text-align center
      font-size 12px
      &.on
          color g-color
      .iconfont
        margin 0 auto

</style>
