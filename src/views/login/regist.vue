<template>
    <transition name="slide-left">
      <div class="p-page regist">
        <div class="u-btn-back" @click="goback()">&lt;</div>
        <router-link to="login" class="u-right-router">登录</router-link>
        <div class="title">my app</div>
        <div class="m-form">
          <div class="list">
            <input type="text" placeholder="注册手机号" class="u-input" v-model="phone"/>
          </div>
          <div class="list">
            <input type="password" class="u-input" placeholder="请输入密码" v-model="password"/>
          </div>
          <div class="list">
            <input type="password" placeholder="请确认密码" class="u-input" v-model="pwdsure"/>
          </div>
          <div class="list">
            <button class="u-btn block" :disabled="!form_right">注册</button>
          </div>
        </div>
      </div>
    </transition>

</template>

<script>
    export default {
        name: "regist",
        data(){
          return{
            phone : '',
            password : '',
            pwdsure : ''
          }
        },
        computed : {
          phone_right(){
            return /^1[3|5|6|7|8|9]\d{9}$/.test(this.phone)
          },
          form_right(){
            return this.phone_right && /\S/.test(this.password) && (this.password == this.pwdsure)
          }
        },
        methods:{
          goback(){
            window.history.length > 1
              ? this.$router.go(-1)
              : this.$router.push('/')
          },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixins.styl";
  @import "./stylus/login.styl";
</style>
