<template>
    <div class="p-page search">
      <div class="m-search-header">
        <div class="m-search-input">
          <input type="text" class="u-input" placeholder="随机推荐"
                 @keydown="_debounce(searchSuggest, 200)"
                 @keyup.enter="search"
                 v-model="searchText"
                 v-focus>
          <div class="iconfont u-icon-close"
               @click="searchText = ''"
                v-show="searchText">
          </div>
        </div>
        <button class="btn-cancel" @click="$router.back()">取消</button>
      </div>

      <!--推荐和历史记录-->
      <div class="items-page" v-show="!searchText">
        <div class="items">
          <h2 class="title">热门搜索</h2>
          <ul>
            <li class="list"
                v-for="(list,index) in hotSearch"
                :key="index"
                @click="search(list, '520')">
              {{list}}
            </li>
          </ul>
        </div>
        <div class="items">
          <div class="iconfont u-icon-trashbox" @click="clearHistorySearch"></div>
          <h2 class="title">搜索历史</h2>
          <ul>
            <li class="list"
                v-for="(list,index) in historySearch"
                :key="index"
                @click="search(list, '520')">
              {{list}}
            </li>
          </ul>
        </div>
      </div>
      <!--搜索结果-->
      <search-result v-show="searchText" :resultSearch="resultSearch"></search-result>

      <!--搜索建议-->
      <div class="search-suggest" v-show="suggestList.length > 0">
          <h3 class="desc bot-border-1px">搜索"{{searchText}}"</h3>
          <ul>
            <li class="list bot-border-1px"
                @click="search(list)"
                v-for="list in suggestList">{{list}}</li>
          </ul>
      </div>

    </div>
</template>

<script>
    import searchResult from './result/result'
    import {searchMusicByWord, reqSearchSuggest} from "../../api";


    export default {
        name: "search",
        data(){
          return {
            searchText : '',
            hotSearch:['张楚新歌','陈绮贞','Imagine Dragons新专辑','少年音乐大战','年少有为'],
            suggestList : [],     //搜索建议
            historySearch: localStorage && JSON.parse(localStorage.getItem('historySearch')) || [],
            showResultSearch : false,
            resultSearch : [],
            scroller : null
          }
        },
        watch:{
          searchText(){
            //如果搜索关键字被清空，用户企图重新输入，则清空搜索结果和销毁滑动容器
            if(!this.searchText){
              this.resultSearch = [];
              this.suggestList = [];
            }
          }
        },
        methods: {
          search(word, notSaveLocal){
            //this.$toast('search');
            //进入搜索动作后马上将搜索建议置空
            this.suggestList = [];
            if(typeof word == 'string'){
              this.searchText = word;
            }
            this.$indicator.open('搜索中');
            this.searchMusic(this.searchText).catch(()=>{
                this.$indicator.close();
                this.$toast('搜索歌曲失败')
            });
            if(!notSaveLocal){ this.saveSearchToLocal() }
          },

          async searchMusic(word){
             let res = await searchMusicByWord(word);
             this.$indicator.close();
             if(res.code == 200){

               res.result.songs.forEach((item, index)=>{
                 let song = {};
                 song.ids = item.id;
                 song.sname = item.name;
                 song.singer = item.artists[0].name;
                 song.album = item.album.name;
                 this.resultSearch.push(song);
               });
             }
          },
          async getSuggest(){
              let res = await reqSearchSuggest(this.searchText);
              this.suggestList = [];
              //console.log(res);
              if(res.code != 200){
                this.$toast('搜索建议获取失败');
                return
              }
            //搜索建议之歌曲
              if(res.result.songs){
                res.result.songs.forEach((item, index)=>{
                  if(this.suggestList.indexOf(item) != -1) return;
                  this.suggestList.push(item.name);
                })
              }
              //搜索建议之歌手
              if(res.result.artists){
                res.result.artists.forEach((item, index)=>{
                  if(this.suggestList.indexOf(item) != -1) return;
                  this.suggestList.push(item.name);
                })
              }
          },

          searchSuggest(){
            console.log('search-->',this.searchText );
            if(!this.searchText) return;
            this.getSuggest().catch(()=>{
              this.$toast('搜索建议渲染出错');
            });
          },

          _debounce(func, delay){
            if (func.timer) {
              clearTimeout(func.timer)
            }
            func.timer = setTimeout(() => {
              func.apply(this)
            }, delay)
          },

          saveSearchToLocal(){
            //如果历史记录中包含搜索的关键字则不写入
            if(this.historySearch.indexOf(this.searchText) != -1) return;

            if(this.historySearch.length > 50){
              this.historySearch.splice(this.historySearch.length-5, 5);
            }
            this.historySearch.unshift(this.searchText);
            localStorage && localStorage.setItem('historySearch', JSON.stringify(this.historySearch));
          },

          clearHistorySearch(){
            this.historySearch = [];
            localStorage && localStorage.removeItem('historySearch')
          }
        },
        components:{
          searchResult
        },
        directives:{
          focus:{
            inserted(el){
              el.focus()
            }
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl"
  .p-page.search
    background-color #fff
    .m-search-header
      height 44px
      background-color g-color
      overflow hidden
      .m-search-input
        position relative
        display block
        margin 6px 0 0 12px
        width calc(100% - 60px)
        height 32px
        padding 0 40px 0 10px;
        box-sizing border-box
        line-height 30px
        border-radius 18px
        background rgba(255,255,255,0.4)
        .u-icon-close
          position absolute
          right 10px
          top 0
          color #eee
        .u-input
          width 100%
          height 100%
          color rgba(255,255,255,0.6)
          font-size 14px
          &::-webkit-input-placeholder
            color rgba(255,255,255,0.6)
      .btn-cancel
        position absolute
        right 0
        top 0
        padding 12px
        color #fff
        font-size 14px

    .items
      position relative
      padding 12px
      box-sizing border-box
      overflow hidden
      .u-icon-trashbox
        position absolute
        right 12px
        top 12px
        font-size 22px
      .title
        margin-bottom 10px
        font-size 14px
        color #000
      .list
        display inline-block
        margin 0 8px 8px 0
        padding 6px 12px
        font-size 14px
        background-color #e2e2e2
        border-radius 100px
    .search-suggest
      position absolute
      left 0
      right 0
      top 44px
      bottom 0
      font-size 14px
      .desc
        position relative
        margin 0 8px
        line-height 44px
        color darkslateblue
      .list
        position relative
        margin-left 30px
        line-height 44px

</style>
