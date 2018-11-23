<template>
    <transition name="slide-up">
        <div class="p-page login">
            <div class="iconfont u-icon-back" @click="goback()"></div>
            <router-link to="regist" class="u-right-router">注册</router-link>
            <div class="title">my app</div>
            <div class="btns">
              <button @click="logintype = 0" :class="{active:logintype==0}">短信登录</button>
              <button @click="logintype = 1" :class="{active:logintype==1}">密码登录</button>
            </div>
            <div class="m-form use-message" v-show="logintype==0">
              <div class="list">
                <input type="text" class="u-input" placeholder="请输入手机号" v-model="phone0"/>
                <button class="u-btn-getcode"
                        :disabled="!phone0_right"
                        @click="getCode()"
                        v-show="codeCountDown == 0">
                  获取验证码
                </button>
                <button class="show-countdown" v-show="codeCountDown != 0">{{codeCountDown}}s后获取</button>
              </div>
              <div class="list">
                <input type="text" class="u-input code" placeholder="请输入验证码" v-model="code"/>
              </div>
              <button class="u-btn block" @click="login(0)" :disabled="!form0_right">登录</button>
            </div>

            <div class="m-form use-account" v-show="logintype==1">
              <div class="list">
                <input type="number" class="u-input" placeholder="请输入手机号" v-model="phone1"/>
              </div>
              <div class="list">
                <input :type="pwdShow ? 'text' : 'password'" class="u-input" placeholder="请输入密码" v-model="password"/>
                <div class="iconfont"
                     v-show="password"
                     :class="pwdShow ? 'u-icon-eye' : 'u-icon-eye-close'"
                     @click="pwdShow = !pwdShow">
                </div>
              </div>
              <button class="u-btn block" @click="login(1)" :disabled="!form1_right">登录</button>
            </div>
        </div>
    </transition>
</template>

<script>
    import {loginByPWD} from "../../api";

    export default {
        name: "login",
        data (){
          return {
            logintype : 1,  // 0 短信登录， 1 账号密码登录（默认）,
            phone0 : '',
            phone1 : '',
            code : '',
            password : '',
            pwdShow : false,    //密码是否显示
            codeCountDown : 0,   //获取验证码倒计时,
            backRouter : '/'      //记录从哪个路由跳转到登录页(默认跳转到首页)
          }
        },

        beforeRouteEnter (to, from, next) {
          next(vm => {
            vm.backRouter = from.path;
            //console.log(vm);
          })
        },
        watch:{
          logintype () {
            if(this.logintype == 1 && this.codeCountDown > 1){
              this.codeCountDown = 1;
            }
          }
        },

        computed : {
          phone0_right(){
            return /^1[3|5|6|7|8|9]\d{9}$/.test(this.phone0)
          },
          form0_right(){
            return this.phone0_right && /^\d{4}$/.test(this.code)
          },
          form1_right(){
            return /^1[3|5|6|7|8|9]\d{9}$/.test(this.phone1) && /\S/.test(this.password)
          }
        },
        beforeDestroy(){
           this.codeCountDown = 1;
        },

        methods : {
          goback(){
            console.log(this.backRouter);
            this.$router.replace(this.backRouter);
          },
          codeCountDownFn(){
            setTimeout(()=>{
              if(this.codeCountDown > 1)this.codeCountDownFn();
              console.log(this.codeCountDown--);
            }, 1000)
          },
          getCode(){
            this.codeCountDown = 60;     //获取验证码倒计时的限制时间
            this.codeCountDownFn();
            console.log('来吧，发验证码请求啦~~~')
          },
          login(type){
            //打开等待框
            this.$indicator.open('登录中');
            if(type==0){
              //短信登录
              console.log(this.phone0, this.code)
              this.$store.commit('setUserInfo', {id:103, name : this.phone0});
            }
            if(type==1){
              //密码登录
              this.loginbypwd(this.phone1, this.password).catch((error)=>{
                this.$indicator.close();
                this.$toast('登录失败');
              })
            }
          },

          async loginbypwd(phone, pwd){
              let res = await loginByPWD(phone, pwd);
              if(res.code == 200){
                this.$indicator.close();
                this.$store.commit('setUserInfo', res.profile);
                localStorage.setItem('userId', res.profile.userId);
                this.$router.replace(this.backRouter);
              }
          }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl";
  @import "./stylus/login.styl";

</style>
