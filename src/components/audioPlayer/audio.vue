<template>
    <div class="m-audio">
      <audio ref="audioEle"
            @ended="onEnded"
            @canplaythrough="onCanplay"
            @timeupdate = "onTimeupdate">
      </audio>
      <div class="process">
        <span class="time current-time">{{timeFormat(currentTime)}}</span>
        <slide-bar @touchStartEvt="changeStart"
                  @touchMoveEvt="changePercent"
                  @touchEndEvt="changeDone"
                  :percent="percent">

        </slide-bar>
        <div class="time all-time">{{timeFormat(allTime)}}</div>

      </div>
      <button class="iconfont u-btn-play-tg"
              :class="playStatus ? 'u-icon-pause' : 'u-icon-play'"
              @click="playToggle">
      </button>
    </div>
</template>

<script>
    import {reqMusicUrl} from "../../api";
    import slideBar from './slideRange'

    export default {
        name: "myAudio",
        data(){
            return {
              audio : null,
              currentTime : 0,
              allTime : 0,
              percent : 0,
              canplaysmooth : false,
              audioSrc : ''     //歌曲的src
            }
        },
        computed:{
          playStatus (){
            return this.$store.state.playeraction
          },
          playMusicDetail (){
            return this.$store.state.playMusicDetail
          },
          playMusicModel(){
            return this.$store.state.playMusicModel
          }
        },
        watch:{
          playMusicDetail(){
            this.initAudioFn();
          },
          currentTime(){
            this.percent =(this.currentTime / this.allTime * 100).toFixed(2);
          }
          // canplaysmooth(){
          //   this.audio.currentTime = this.allTime - 16;
          // }
        },
        mounted(){
          this.audio = this.$refs.audioEle;
        },
        methods:{
          initAudioFn(){
            if(!this.playMusicDetail.ids){
              this.$indicator.toast('歌曲信息丢失，请退出重试！');
              return;
            }

            //初始化音频对象根据歌曲id获取src
            reqMusicUrl(this.playMusicDetail.ids).then((res)=>{
              if(res.code == 200){
                //当歌曲url更换后，刷新当前播放时间和平滑播放状态的数据
                this.audio.currentTime = 0;
                this.currentTime = 0;
                this.allTime = 0.0000001;
                this.canplaysmooth = false;
                //end
                this.audioSrc = res.data[0].url;
                this.audio.setAttribute('src', this.audioSrc);
              }
            }).catch((error)=>{
              this.$toast('歌曲播放地址获取失败！');
            });

          },
          playToggle(){
            if(this.playStatus){
              //暂停
              this.audio.pause();
              this.$store.commit('playerPause');
            }else{
              //播放
              this.audio.play();
              if(this.canplaysmooth){
                this.$store.commit('playerAction');
              }else{
                //当音频还不能顺滑播放，弹出提示框
                this.$indicator.open('准备播放',{
                  maxWaitTime : 10,
                  callback : ()=>{
                    this.$toast('当前网速不给力，试试刷新');
                  }
                });
              }
            }
          },

          onCanplay(){
            this.$indicator.close();
            this.canplaysmooth = true;
            this.$store.commit('playerAction');
            this.audio.play();
            this.allTime = this.audio.duration;
            //console.log(this.audio.buffered);
          },
          onTimeupdate(){
            this.currentTime = this.audio.currentTime;
            this.$emit('timeupdate', this.percent, this.allTime);
          },

          onEnded(){
            this.$store.commit('playerPause');

            if(this.playMusicModel == 0){
              //单曲循环模式
              this.audio.play();
              this.$store.commit('playerAction');
            }

            if(this.playMusicModel == 1){
              //列表循环模式
              let list = this.$store.state.musicRecords;
              let pos = 0;
              list.forEach((item, index)=>{
                if(item.ids == this.playMusicDetail.ids){
                  pos = index;
                }
              });
              pos = ++pos % list.length;
              this.$store.commit('setPlayMusicDetail', list[pos]);
            }

            if(this.playMusicModel == 2){
              //随机播放
              let list = this.$store.state.musicRecords;
              let pos = Math.floor(Math.random() * list.length);
              this.$store.commit('setPlayMusicDetail', list[pos]);
            }


          },
          changeStart(){
            this.audio.pause();
            this.$store.commit('playerPause');
          },
          changePercent(data){
            this.percent = data;
            if(this.percent > 100){
              this.percent = 100
            }else if(this.percent <0 ){
              this.percent =0
            }
            this.audio.currentTime = Math.round(this.percent * this.allTime / 100);
          },
          changeDone(){
            this.$store.commit('playerAction');
            this.audio.play();
          },
          timeFormat(time){
            time = Math.floor(time);
            let minute = ''+parseInt(time / 60);
            let second = ''+time % 60;
            return minute.padStart(2, '0') + ':' + second.padStart(2, '0');
          }
        },
        components:{
          slideBar
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .m-audio
    .process
      position absolute
      left 0
      right: 0
      bottom 14%
      color #fff
      font-size 10px
      .time
        position absolute
        top 3px
        &.current-time
          left 20px
        &.all-time
          right 20px

    .u-btn-play-tg
      position absolute
      left 50%
      bottom 4%
      transform translateX(-50%)
      font-size 50px
      color #fff





</style>
