<template>
    <div class="p-page video">
      <header-bar>
        <div class="title" slot="center">动态/附近</div>
      </header-bar>

      <video-player :videoOption="videoOption" ref="video"></video-player>

      <button style="position: absolute; width: 100%; bottom: 30%;border: 1px solid red; padding: 8px 0"
      @click="playVideo">play</button>
      <footer-nav></footer-nav>
    </div>
</template>

<script>
    import headerBar from '../../components/headerbar/headerbar'
    import footerNav from '../../components/footernav/footernav'
    import videoPlayer from '../../components/videoPlayer/videoPlayer'

    import BScroll from 'better-scroll'

    export default {
        name: "friend",
        data(){
          return {
            videoOption:{
              videoSrc : 'http://14.152.72.43/677303CC6A343828F238233684/03000801005BF52CEACE2DB0818C17CF936131-5B9B-4523-8089-D4897D74C9BC.mp4?ccode=0501&duration=262&expire=18000&psid=832ac61e2088642e22e717e9ad02e3f6&ups_client_netip=7d54ec17&ups_ts=1542884808&ups_userid=&utid=LMwcFKX61ikCAXHOgI6qwrk1&vid=XMzkyOTY5MTA1Ng&vkey=A433263aa242e2afd414e4c1db46e1137&sp=',
              rendered : true,
              top : 50
            }
          }
        },
        methods:{
          playVideo(){
            this.$refs.video.playVideo();
          }
        },
        mounted(){

        },
        components:{
          headerBar,
          footerNav,
          videoPlayer
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.p-page.video

  .m-lrc
    position absolute
    left 0
    right 0
    top 54px
    bottom 18%
    z-index 2
</style>
