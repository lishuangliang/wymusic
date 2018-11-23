<template>
  <div id="app" @touchmove.prevent>
    <router-view/>
    <audio-player v-show="$store.state.playerShow"></audio-player>
  </div>
</template>

<script>
  import audioPlayer from './components/audioPlayer/audioPlayer';


  import {reqMusicRecord} from "./api";

  export default {
    name: 'App',
    data(){
      return {

      }
    },
    computed:{
      userInfo(){
        return this.$store.state.userInfo;
      },
      musicRecords (){
        return this.$store.state.musicRecords;
      }
    },
    mounted(){
      this.getMusicRecords().catch((error)=>{
        this.$toast('获取听歌记录失败');
      })
    },
    methods:{
      async getMusicRecords(){
        if(!this.userInfo.nickname || this.musicRecords.length > 0)return;
        let res = await reqMusicRecord(this.userInfo.userId);
        //console.log('getMusicRecords-->',res);
        if(res.code != 200){
          this.$toast('获取听歌记录失败');
          return;
        }

        let resData = [];
        res.weekData.forEach((item, index)=>{
          let obj = {};
          obj.ids = item.song.id;
          obj.name = item.song.name;
          obj.album = item.song.al.name;
          obj.singer = item.song.ar[0].name;
          obj.poster = item.song.al.picUrl;
          resData.push(obj);
        });
        this.$store.commit('setMusicRecords', resData);
      }
    },
    components:{
      audioPlayer

    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../src/stylus/base.styl"
  @import "../src/stylus/mixins.styl"
</style>
