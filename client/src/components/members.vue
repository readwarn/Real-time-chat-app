<template>
  <div class="members">
      <div class="all-channel">
          <i class="fa fa-chevron-left" @click="$emit('icon-click')"></i>
          <p @click="$emit('icon-click')">All channels</p>
      </div>
      <div class="body">
          <div class="description">
                <h3>{{channel.name | capitalize}}</h3>
                <p>{{channel.description}}</p>
          </div>
         <h3>MEMBERS</h3>
         <div class="member-container" >
                  <div class="member" v-for="(member,index) in channel.members" :key="index">
                        <img :src="avi(member)" alt="avi">
                        <p>{{member.username}}</p>
                  </div>
         </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import avatar1 from '@/assets/rilwan.jpg'
export default {
      data(){
          return{
              avatar:avatar1
          }
      },
      props:['channel'],
      methods:{
           avi(member){
              if(member.avi==undefined){
                  return this.avatar
              }else{
                  return member.avi;
              }
          }
      },
      filters:{
          capitalize(value){
              if(value==undefined){
                  return ''
              }
              else{
                   return value.toUpperCase();
              }
          },
      }

}
</script>

<style>
i.fa-chevron-left,div.all-channel p{
    cursor: pointer;
}
div.members{
    font-size: 0.8rem;
    color: var(--button-text);
    height: 92%;
}
div.member-container{
    -ms-overflow-style: none; 
    scrollbar-width: none;
    overflow: scroll;
    max-height: 53%;
}
div.member-container::-webkit-scrollbar {
    display: none;
}
div.body{
      padding: 0rem 1rem;
      height: 100%;
}
h3{
    font-size: 1rem;
}
div.description{
    margin-bottom: 2rem;
}

div.members p{
    margin: 0;
}
div.all-channel{
    padding: 0.8rem 1rem;
    display: flex;
    align-items: center;
    border-bottom: 3px solid var(--button-text);
    font-size: 0.9rem;
}
div.all-channel i{
    font-size: 1.1rem;
    color: var(--button-text);
    margin-right: 1rem;
}
div.member{
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}
div.member img{
    width: 35px;
    height: 35px;
    border-radius: 0.3rem;
    margin-right: 1.2rem;
}
</style>