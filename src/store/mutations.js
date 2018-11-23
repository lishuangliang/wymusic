/**
 * vuex mutations
 * **/
import {
  SHOWPLAYER,
  HIDEPLAYER,
  PLAYERACTION,
  PLAYERPAUSE,
  CLEARUSERINFO,
  SETUSERINFO,
  SETMUSICRECORDS,
  SETPLAYMUSICDETAIL,
  SETPLAYMUSICMODEL
} from './mutation-types'

export default {
  [SHOWPLAYER](state){
    state.playerShow = true;
  },
  [HIDEPLAYER](state){
    state.playerShow = false;
  },
  [PLAYERACTION](state){
    state.playeraction = true;
  },
  [PLAYERPAUSE](state){
    state.playeraction = false;
  },

  [CLEARUSERINFO](state){
    state.userInfo = {}
  },
  [SETUSERINFO](state, user){
    state.userInfo = user;
  },

  [SETMUSICRECORDS](state, newArray=['传值失败']){
    state.musicRecords = state.musicRecords.concat(newArray);
  },

  //设置要播放的音乐相关详情
  [SETPLAYMUSICDETAIL](state, obj){
    state.playMusicDetail = obj;
  },

  //设置要播放音乐的模式
  [SETPLAYMUSICMODEL](state, type){
    state.playMusicModel = type;
  }
}
