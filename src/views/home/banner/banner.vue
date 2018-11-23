<template>
    <div class="m-banner">
      <transition name="fade-in">
        <swiper  :options="swiperOption" v-if="slideList.length > 0">
          <div class="swiper-slide swiper-lazy"
               v-for="list in slideList"
               :data-background="list.imageUrl" >
            <div class="swiper-lazy-preloader"></div>
          </div>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </transition>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    import {reqHomeBanner} from "../../../api";
    let vm = null;
    export default {
        name: "banner",
        data(){
          return {
            slideList : [],
            swiperOption:{
              autoplay : {
                delay : 5000,
                disableOnInteraction : false
              },
              loop : true,
              pagination: {el: '.swiper-pagination'},
              lazy: {loadPrevNext: true},
              on:{
                click (){
                  vm.toDestination(this.realIndex);
                }
              }
            }
          }
        },
        created(){
          vm = this;
        },
        mounted(){
          this.getBanner().catch(()=>{
            this.$toast('轮播图渲染出错')
          });
        },
        methods:{
          async getBanner(){
            let res = await reqHomeBanner();
            if(res.code != 200){
              this.$toast('获取轮播图失败');
              return
            }
            this.slideList = res.banners;
          },

          toDestination(index){
            if(!this.slideList[index].url){
              this.$toast('该轮播图片无跳转地址');
              return;
            }
            location.href = this.slideList[index].url;
          }

        },

        components:{
          swiper,
          swiperSlide
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../stylus/mixins.styl"
  .m-banner
    position relative
    height 100px
    background-color #fff
    .swiper-container
      height 100%
    .swiper-slide
      background-position center
      background-repeat no-repeat
      background-size 100% auto
    .swiper-pagination-bullet
      background #fff
    .swiper-pagination-bullet-active
      background g-color
</style>
