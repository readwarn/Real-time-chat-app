<template>
   <nav>
         <router-link to="/dashboard">
              <div class="brand">
                    <img src="//s.svgbox.net/social.svg?fill=6246ea#gumroad">
                    <p class="brand">Circuit</p>
              </div>
         </router-link>
         <div class="avatar">
             <img :src="avi" alt="avi">
             <p>{{user.username}}</p>
             <i class="fa fa-chevron-right" @click.stop="rotateCaret" :class="{'rotate':rotate}"></i>
         </div>
   </nav>
</template>

<script>
import avatar1 from '@/assets/rilwan.jpg'
/* eslint-disable */
export default {
     props:['user','rotate'],
     data(){
         return{
            avatar:avatar1
         }
     },
     computed:{
         avi(){
            if(this.user.avi===undefined){
                return this.avatar;
            }else{
                return this.user.avi;
            }
        }
     },
     methods:{
         rotateCaret(){
             this.$emit('clicke');
         },
     }
}
</script>

<style scoped>
   nav{
       display: flex;
       justify-content: space-between;
       align-items: center;
       margin: auto;
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       box-sizing: border-box;
       padding: 0rem 1.3rem;
       background: var(--stroke);
       z-index: 90;
       color: var(--button-text);
   }
   div.brand{
       display: flex;
       align-items: center;
       cursor: pointer;
   }
   div.brand img{
       width: 30px;
       height: 30px;
       cursor: pointer;
       margin-right: 0.4rem;
   }
   p.brand{
       font-size: 1rem;
       cursor: pointer;
       color: var(--button-text);
   }
   div.avatar{
       display: flex;
       align-items: center;
   }
   div.avatar p{
       margin: 0rem 0.5rem;
       font-size: 0.75rem;
       cursor: pointer;
   }
   div.avatar i{
      font-size: 1rem;
      cursor: pointer;
      transition: all ease-in-out 0.3s;
      color: var(--button-text);
   }
   div.avatar i.rotate{
       transform: rotate(90deg);
   }
   div.avatar img{
       width: 43px;
       height: 43px;
       border-radius: 0.3rem;
       cursor: pointer;
   }
   a{
       text-decoration: none;
   }

   @media only screen and (max-width: 720px) {
      nav{
           padding:0rem 0.5rem;
      }
}
</style>