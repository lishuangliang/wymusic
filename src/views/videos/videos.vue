<template>
    <div class="p-page videos">
      <header-bar>
        <a class="left iconfont u-icon-upload-video"></a>
        <div class="u-search" slot="center" @click="$router.push('search')">随机推荐</div>
      </header-bar>
      <div class="video-scroller">
        <div class="block-loading center" v-if="videoList.length == 0">
          <div class="list"></div>
          <div class="list"></div>
          <div class="list"></div>
        </div>
        <ul class="video-items" v-else>
          <li class="list" v-for="(list,index) in videoList">
            <div class="poster" v-lazy:background-image="list.picUrl"></div>
            <div class="iconfont u-icon-play" ></div>
            <div class="u-btn-play" @click="playVideo(index)"></div>
          </li>
          <video-player ref="video"
                        :videoOption="videoOption"
                        @closeVideo="closeVideo"></video-player>
        </ul>

      </div>
      <footer-nav></footer-nav>
    </div>
</template>

<script>
    import footerNav from '../../components/footernav/footernav'
    import headerBar from '../../components/headerbar/headerbar'
    import videoPlayer from '../../components/videoPlayer/videoPlayer'

    import BScroll from 'better-scroll'

    import {reqCommendMV, reqMvSrc} from "../../api";

    export default {
        name: "videos",
        data(){
          return {
            videoOption : {
              rendered : false,
              src : '',
              top : 0
            },
            videoList : [],
          }
        },
        mounted(){
          this.getCommendMV().catch(()=>{
            this.$toast('mv列表渲染出错');
          });

        },

        methods:{
          async playVideo(index){
            this.videoOption.rendered = true;
            this.videoOption.top = index * 220;

            let res = await reqMvSrc(this.videoList[index].id);
            //console.log(res);
            if(res.code != 200){
              this.$toast('当前mv播放地址获取失败');
              return;
            }

            this.videoOption.src = res.data.brs[240];
            this.$refs.video.playVideo();
          },

          async getCommendMV(){
            let res = await reqCommendMV();
            console.log(res);
            if(res.code != 200){
              this.$toast('mv列表获取失败');
              return;
            }
            this.videoList = res.result;

            this.$nextTick(()=>{
              this.scroller = new BScroll('.video-scroller',{
                click : true
              })
            })

          },
          closeVideo(){
            this.videoOption.rendered = false;
            this.videoOption.src = '';
          }
        },
        components:{
          videoPlayer,
          headerBar,
          footerNav
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .video-scroller
    position absolute
    left 0
    right 0
    top 44px
    bottom 44px
    .video-items
      position relative
      .list
        position relative
        margin-bottom 20px
        height 200px
        background-color #eee
        .poster
          position absolute
          left 0
          right 0
          width 100%
          height 100%
          background-position center
          background-size cover
          background-repeat no-repeat
        .u-icon-play
          position absolute
          left 50%
          top 50%
          font-size 60px
          margin -30px 0 0 -30px
          color #eee
        .u-btn-play
          position absolute
          left 50%
          top 50%
          width 100px
          height 100px
          margin  -50px 0 0 -50px


</style>
