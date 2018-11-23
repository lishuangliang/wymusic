<template>
    <transition name="fade-in">
      <div class="search-result">
        <ul class="content">
          <li class="list bot-border-1px"
              v-for="(list,index) in resultSearch"
              :key="index"
              @click="toPlayer(list.ids)">
            <div class="sname">{{list.sname}}</div>
            <div class="desc">
              {{list.singer}}&nbsp;-&nbsp;{{list.album}}
            </div>
          </li>
        </ul>
      </div>
    </transition>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "result",
        props:{
          resultSearch :{
            type : Array,
            default : []
          }
        },
        data(){
          return {
            scroller : null
          }
        },
        watch:{
          resultSearch(){
            if(this.resultSearch.length > 0){
              this.$nextTick(()=>{
                this.scroller = new BScroll('.search-result',{
                  click : true
                });
              });
            }else{
              this.scroller && this.scroller.destroy();
            }
          }
        },
        methods:{
          toPlayer(ids){
            this.$store.dispatch('getPlayMusicDetail', {ids :ids});
            this.$store.commit('showPlayer');
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search-result
    position absolute
    left 0
    right 0
    top 44px
    bottom 0
    overflow hidden
    padding 12px
    box-sizing border-box
    background-color #fff
    .list
      position relative
      padding 8px 0
      .sname
        color darkslateblue
        font-size 14px
      .desc
        color #666
        font-size 10px
</style>
