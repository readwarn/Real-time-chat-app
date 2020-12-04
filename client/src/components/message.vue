<template>
  <div class="message" :class="{'viewer':yours}">
     <img :src="avi" alt="avi" v-if="!yours">
     <div class="message-body">
        <div class="message-head" :class="{'viewer':yours}">
            <p v-if="!yours" class="name">{{message.owner.name}}</p>
            <p class="date">{{message.date | messageDate}}</p>
        </div>
        <p id="content" :class="{'viewer':yours}">{{message.content}}</p>
     </div>
    <img :src="avi" alt="avi" v-if="yours" :class="{'viewer':yours}">
  </div>
</template>

<script>
/* eslint-disable */
import avatar1 from '@/assets/rilwan.jpg';
import dayjs from 'dayjs';
export default {
     data(){
         return{
             avatar:avatar1
         }
     },
     props:['message','yours'],
     computed:{
        avi(){
            if(this.message.owner.id.avi==undefined){
                  return this.avatar;
            }else{
                return this.message.owner.id.avi;
            }
        }
     },
     filters:{
           messageDate(value){
              const date = dayjs(value);
              const today=new Date();
              const now = dayjs(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
              if(now.isSame(date,'day')){
                  return date.format('[Today at] HH:mm');
              }
              else if(now.diff(date,'day',true) > 0 && now.diff(date,'day',true) < 1){
                  return date.format('[Yesterdaay at] HH:mm')
              }
              else{
                  return date.format('DD/MM/YYYY')
              }
          }
     }
}
</script>

<style scoped>
div.message{
     margin-bottom: 1.3rem;
}
div.message{
    display: flex;
    align-items: flex-end;
}

div.message-head{
    display: flex;
    align-items: center;
}
div.message.viewer, div.message-head.viewer{
    justify-content: flex-end;
}
p#content{
 color: var(--stroke);
 font-size: 0.9rem;
}
div.message.viewer p.viewer{
    display: flex;
    justify-content: flex-end;
}
div.message-head p.name{
     margin-right: 0.65rem;
     font-size: 0.8rem;
     color: var(--button);
     font-weight: 700;
}
 div.message p{
     margin: 0;
     font-size: 0.8rem;
 }
 div.message p.date{
     color: #b8b8bd;
     font-size: 0.6rem;
 }
 div.message-head{
     margin-bottom: 0.2rem;
 }
 div.message img{
     margin-right: 1.1rem;
     width: 35px;
     height: 35px;
     border-radius: 0.3rem;
 }
 div.message img.viewer{
   margin-left: 1.1rem;
   margin-right: 0rem;
 }
</style>