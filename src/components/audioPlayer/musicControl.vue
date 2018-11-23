<template>
    <div class="m-music-control">
      <div class="iconfont u-btn-model"
           @click="toggleModel"
           :class="classList[playMusicModel]"></div>

      <div class="iconfont u-icon-med-prev" @click="switchMusic('prev')"></div>
      <div class="iconfont u-icon-med-next" @click="switchMusic('next')"></div>
    </div>
</template>

<script>
    export default {
        name: "musicControl",
        data(){
          return {
            classList : ['u-icon-single-model','u-icon-list-model','u-icon-random-model']
          }

        },
        computed:{
          playMusicModel(){
            return this.$store.state.playMusicModel
          },
          playMusicDetail (){
            return this.$store.state.playMusicDetail
          }
        },

        methods:{
          toggleModel(){
            let index = this.playMusicModel;
            index = (++index % this.classList.length);
            this.$store.commit('setPlayMusicModel', index);
          },

          switchMusic(type){
            this.$store.commit('playerPause');
            if(this.playMusicModel == 1){
              //列表循环模式
              let list = this.$store.state.musicRecords;
              let pos = 0;
              list.forEach((item, index)=>{
                if(item.ids == this.playMusicDetail.ids){
                  pos = index;
                }
              });

              pos = (type == 'prev' ? --pos : ++pos) % list.length;
              this.$store.commit('setPlayMusicDetail', list[pos]);
            }

            if(this.playMusicModel == 2){
              //随机播放
              let list = this.$store.state.musicRecords;
              let pos = Math.floor(Math.random() * list.length);
              this.$store.commit('setPlayMusicDetail', list[pos]);
            }
          }

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .m-music-control
    .u-btn-model
      position absolute
      left 20px
      bottom 6%
      font-size 26px
      color #fff
    .u-icon-med-prev,
    .u-icon-med-next
      position absolute
      left 50%
      bottom 6%
      font-size 28px
      margin-left -14px
      color #fff
    .u-icon-med-prev
      transform translateX(-72px)
    .u-icon-med-next
      transform translateX(72px)

</style>
