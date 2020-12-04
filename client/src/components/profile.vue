<template>
   <div class="profile" :class="{'display':display}">
       <router-link to="/dashboard">
        <div>
         <i class="fa fa-user"></i>
         <p>My profile</p>
       </div>
       </router-link>
        <router-link :to="{name: 'channel', params: { id: '5fc52db79aa9fb091c81c332' }}">
        <div>
         <i class="fa fa-users"></i>
         <p>Channels</p>
       </div>
       </router-link>
       <div class="logout" @click="logout">
          <i class="fa fa-sign-out-alt"></i>
          <p>Logout</p>
       </div>
   </div>
</template>

<script>
import router from '../router'
/* eslint-disable */
export default {
    props:['display'],
    methods:{
        logout(){
            this.$http.get('https://whispering-everglades-42925.herokuapp.com/auth/logout').then((response)=>{
                console.log(response);
                router.push('/login');
            })
        }
    }
}
</script>

<style scoped>
   div.profile{
       font-size: 0.75rem;
       box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
       border-radius: 0.3rem;
       padding: 0.4rem;
       width: 150px;
       background:var(--stroke);
       z-index: 99;
       display: none;
       color: var(--button-text);
   }
   div.display.profile{
       display: block;
   }
   div.profile div{
       display: flex;
       align-items: center;
       flex-wrap: wrap;
       margin-bottom: 6px;
       cursor: pointer;
       padding: 0.45rem;
   }
     div.profile div:hover{
         background:#838383;
         border-radius: 0.3rem;
     }
    div.profile p{
    margin: 0;
    }
    div.profile a{
        text-decoration: none;
        color: var(--button-text);
    }
   
   div.profile div.logout{
        color: var(--error);
        border-top: 1px solid #E0E0E0;
        margin-top: 0.6rem;
        margin-bottom: 4px;
        padding: 0.6rem 0.45rem;
   }
   div.profile i{
       width: 25%;
   }

</style>