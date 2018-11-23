import {reqMusicDetail} from "../api";
import {
  PLAYERPAUSE,
  SETPLAYMUSICDETAIL
} from './mutation-types'

/**
 * vuex action
 * **/

export default {
  async getPlayMusicDetail({ commit, state }, params){
    if(!params && state.playeraction){
      //如果传递的参数为空，且歌曲正在播放
      return;
    }
    let ids = params ? params.ids : localStorage.getItem('ids');
    if(ids == state.playMusicDetail.ids && state.playeraction){
      //选择歌曲和播放歌曲相同;
      return;
    }
    commit(PLAYERPAUSE);
    let res = await reqMusicDetail(ids);
    if(res.code == 200){
      let obj = {
        ids : ids,
        poster : res.songs[0].al.picUrl,
        name : res.songs[0].name,
        singer : res.songs[0].ar[0].name
      };
      commit(SETPLAYMUSICDETAIL, obj);
      localStorage && localStorage.setItem('ids', ids);
    }
  },
}
