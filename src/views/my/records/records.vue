<template>
    <div class="p-page records">
      <header-bar>
        <div class="left iconfont u-icon-back" @click="$router.back()"></div>
        <div class="title" slot="center">最近播放</div>
      </header-bar>
      <div class="tab-title">歌曲{{musicRecords.length}}</div>

      <div class="re-scroller">
        <ul class="content m-list-panel">
          <li class="list" v-for="list in musicRecords" @click="toPlayer(list.ids)">
            <div class="s-name">{{list.name}}</div>
            <p class="s-desc">{{list.singer}}&nbsp;-&nbsp;{{list.album}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    import headerBar from '../../../components/headerbar/headerbar'
    import BScroll from 'better-scroll'

    export default {
        name: "records",
        computed:{
          musicRecords (){
            return this.$store.state.musicRecords;
          }
        },
        mounted(){
          this.$nextTick(()=>{
            this.initScroller();
          })
        },
        methods:{
          initScroller(){
            this.scroller = new BScroll('.re-scroller', {
              click : true
            })
          },

          toPlayer(ids){
            //this.$store.commit('setPlayMusicDetail', {ids : ids});
            this.$store.dispatch('getPlayMusicDetail', {ids :ids});
            this.$store.commit('showPlayer');
          }


        },
        components : {
          headerBar
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../stylus/mixins.styl"
  .p-page.records
    background-color #fff
    .tab-title
      position absolute
      width 100%
      top 44px
      padding 8px 10px
      box-sizing border-box
      background-color g-color
      color #fff
      z-index 1
    .re-scroller
      position absolute
      left 0
      right 0
      top 84px
      bottom 44px
    .m-list-panel
      .list
        margin 0 12px
        padding 12px 0
        .s-name
          font-size 16px
          color #333
        .s-desc
          font-size 12px
          color #999

</style>
