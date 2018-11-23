import ajax from './ajax'

const HOST = 'http://192.168.191.1:3000';

//根据关键字搜索
export const searchMusic = (word)=> ajax(`${HOST}/search`, {keywords : word});

//登录（用密码方式）
export const loginByPWD = (phone, pwd) => ajax(`${HOST}/login/cellphone`, {phone : phone, password : pwd});

//退出登录
export const reqLogout = () => ajax(`${HOST}/logout`);

//获取播放记录（type=1 时只返回 weekData, type=0 时返回 allData,作练习将type固定为1）
export const reqMusicRecord = (uid) => ajax(`${HOST}/user/record`, {uid:uid, type:1});

//通过歌曲id获取歌曲详情
export const reqMusicDetail = (ids) => ajax(`${HOST}/song/detail`, {ids:ids});

//通过歌曲id获取歌曲url
export const reqMusicUrl = (id) => ajax(`${HOST}/song/url`, {id:id});

//通过歌曲id获取歌词
export const reqMusicLrc = (id) => ajax(`${HOST}/lyric`, {id:id});

//通过关键字搜索歌曲 (默认加载12条)
export const searchMusicByWord = (keyword)=> ajax(`${HOST}/search`,{keywords : keyword, limit : 12});

//home首頁banner
export const reqHomeBanner = (keyword)=> ajax(`${HOST}/banner`);

//home首页推荐歌单
export const reqCommendMusic = ()=> ajax(`${HOST}/personalized`);

//搜索建议(默认加载8条)
export const reqSearchSuggest = (keyword)=> ajax(`${HOST}/search/suggest`,{keywords : keyword, limit : 8});

//获取推荐mv
export const reqCommendMV = () => ajax(`${HOST}/personalized/mv`);

//通过mv的id获取视频播放地址
export const reqMvSrc = (id)=> ajax(`${HOST}/mv/detail`, {mvid : id});
