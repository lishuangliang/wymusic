<template>
    <transition name="fade-in">
      <div class="m-lrc" v-show="rendered" @click.stop="$emit('closeLrc')">
        <ul class="items" v-if="dataList.length > 0">
          <li v-for="(list,index) in dataList" :key="index" class="list" :class="{on: index == currIndex}">
            {{list.lrc}}
          </li>
        </ul>
        <p class="lrc-loading" v-else>{{lrcTextTip}}</p>
        <!--<div class="u-time-line"-->
             <!--v-show="dataList.length > 0 && isScrollingLrc">-->
        <!--</div>-->
      </div>
    </transition>
</template>

<script>
    import {reqMusicLrc} from "../../api";
    import BScroll from 'better-scroll';

    export default {
        name: "lrc",
        props:{
          rendered:{
            type: Boolean,
            default: false
          }
        },
        data(){
          return {
            lrcTextTip : '正在加载歌词...',
            dataList : [],
            currIndex : 0,             //当前歌词在第几行
            scroller : null,          //歌词滚动器对象
            isScrollingLrc : false,   //是否正在滚动歌词
            lrcScrollerTimer : null   //滚动歌词后的计时器，限定时间内不跳转到当前播放歌词视线内
          }
        },
        computed:{

          playMusicDetail (){
            return this.$store.state.playMusicDetail
          },


        },
        watch:{
          playMusicDetail (){
              this.scroller = null;
              this.dataList = [];
              this.getIrc().catch(()=>{
                this.$toast('歌词解析出现错误');
              });
          },
          rendered(){
            if(this.rendered && this.dataList.length > 0){
              this.$nextTick(()=>{
                this.initScroller();
              })
            }
          }
        },
        methods:{
          async getIrc(){
            if(!this.playMusicDetail.ids){
              this.$indicator.toast('歌曲信息丢失，请退出重试！');
              return;
            }
            let res = await reqMusicLrc(this.playMusicDetail.ids);
            if(res.code != 200){
              this.$toast('获取歌词失败');
              return;
            }
            if(!res.lrc){
              this.$toast('当前歌曲无对应歌词');
              this.lrcTextTip = '当前歌曲无对应歌词';
              return;
            }
            this.computedList(res.lrc.lyric);
          },

          computedList(lrc){
            let listArr = lrc.trim().split('\n');
            let timeReg = /\[\d{2}\:\d{2}\.\d{1,3}\]/g;

            listArr.forEach((item, index)=>{
              let timeList = item.match(timeReg);
              let lrc = item.substring(item.lastIndexOf(']') + 1);

              //todolist  返回結果出現異常

              if(lrc && (timeList instanceof Array)){
                timeList.forEach((list, innerIndex)=>{
                  let t = list.substring(1, list.length - 1);
                  this.dataList.push({
                    time : parseFloat((t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3)),
                    lrc : lrc
                  });
                });
              }

            });
            this.dataList.sort((a, b)=>{
              return a.time - b.time;
            });
          },

          initScroller(){
            if(!this.scroller){
              this.scroller = new BScroll('.m-lrc',{
                probeType : 2,
                click : true
              });

              this.scroller.on('scrollStart', ()=> {
                clearTimeout(this.lrcScrollerTimer);
                this.isScrollingLrc = true;
              });

              this.scroller.on('touchEnd', ()=> {
                this.lrcScrollerTimer = setTimeout(()=>{
                  this.isScrollingLrc = false;
                }, 3600);
              });

              //计算每句歌词在容器内应该滚动的距离
              let liList = document.querySelector('.m-lrc').querySelectorAll('li');
              liList.forEach((item, index)=>{
                if(index == 0){
                  this.dataList[0].height = 0;
                }else{
                  this.dataList[index].height = item.offsetHeight + this.dataList[index-1].height;
                }
              });

              // this.dataList.forEach((item, index)=>{
              //   console.log(item.time, item.height, item.lrc)
              // });
            }
          },

          scrollTo(percent, allTime) {
            if(!this.dataList.length) return;      //歌曲无对应的歌词
            let currentTime = allTime * percent / 100;
            let currIndex = 0;
            //[try...catch] --> 最后一句歌词的时间是小于歌曲时长的，故时间大于最后一句会抛出异常，捕获
            try {
              currIndex = this.dataList.findIndex((list, index) => {
                return list.time <= currentTime && currentTime < this.dataList[index + 1].time;
              });
            }catch(err){
              currIndex = this.dataList.length - 1;
            }
            //end [try...catch]
            this.currIndex = currIndex < 0 ? 0 : currIndex;
            if(this.scroller && !this.isScrollingLrc){
              this.scroller.scrollTo(0,-this.dataList[this.currIndex].height-40, 1600);
            }
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .m-lrc
    position absolute
    left 0
    right 0
    top 50px
    bottom 17%
    color #ccc
    z-index 2
    text-align center
    overflow hidden
    .lrc-loading
      position absolute
      top 40%
      width 100%
    .items
      padding 240px 0
    .list
      font-size 16px
      padding 10px 20px
      box-sizing border-box
      transition color ease 0.2s
      &.on
        color g-color
    .u-time-line
      position absolute
      left 0
      right 0
      top 50%
      height 1px
      line-height 1px
      text-align right
      padding-right 20px
      box-sizing border-box
      font-size 10px
      background-color g-color




</style>
