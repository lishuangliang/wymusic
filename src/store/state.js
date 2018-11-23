/**
 * vuex常量存储
 * */


export default {
  playerShow : false,
  playeraction : false,
  //userInfo : {},
  userInfo : {nickname : '立霜凉233', userId : 57011302},
  musicRecords : [],
  //正在或准备要播放的音乐的详情
  playMusicDetail : {
    poster : '/static/images/default_poster.jpg'
  },
  //音乐播放的模式   （0：单曲循环， 1：列表循环， 2 ： 随机播放）
  playMusicModel : 1
}
