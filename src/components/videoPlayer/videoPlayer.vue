<template>
    <transition name="fade-in">
      <div class="m-video" v-show="videoOption.rendered" :style="{top : videoOption.top + 'px'}">
        <video  ref="videoEle"
                webkit-playsinline playsinline
                :src="videoOption.src"
                @timeupdate="videoplaying"></video>
        <div class="iconfont u-icon-close2" @click="closeVideo"></div>
      </div>
    </transition>

</template>

<script>
    export default {
        name: "player",
        props:{
          videoOption :{
            type  : Object,
            require : true
          }
        },
        data(){
          return{
          }
        },
        mounted(){

        },
        methods:{
          closeVideo(){
            this.$emit('closeVideo');
          },
          playVideo(){
            this.$nextTick(()=>{
              this.video = this.$refs.videoEle;
              console.log(this.video);
              this.video.play();
            });

          },
          videoplaying(){
            //console.log(this.video.currentTime);
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .m-video
    position absolute
    left 0
    top 0
    width 100%
    height 200px;
    background-color #000
    .u-icon-close2
      position absolute
      right 10px
      top 10px
      color #fff
      font-size 22px
    video
      width 100%

</style>
