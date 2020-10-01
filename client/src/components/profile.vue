<template>
   <div class="profile" :class="{'display':display}">
       <router-link to="/">
        <div>
         <i class="fa fa-user"></i>
         <p>My profile</p>
       </div>
       </router-link>
       <div>
          <i class="fa fa-users"></i>
          <p>Group Chat</p>
       </div>
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
            this.$http.get('https://rocky-temple-08906.herokuapp.com/auth/logout').then((response)=>{
                console.log(response);
                router.push('/login');
            })
        }
    }
}
</script>

<style>
   div.profile{
       font-size: 0.75rem;
       border: 1.35px solid #E0E0E0;
       box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
       border-radius: 0.3rem;
       padding: 0.4rem;
       width: 150px;
       background: #07031a;
       opacity: 0;
       transition: all ease-in-out 0.3s;
       z-index: 99;
   }
   div.display.profile{
       opacity: 1;
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
        color: white;
    }
   
   div.profile div.logout{
        color: #EB5757;
        border-top: 1px solid #E0E0E0;
        margin-top: 0.6rem;
        margin-bottom: 4px;
        padding: 0.6rem 0.45rem;
   }
   div.profile i{
       width: 25%;
   }

</style>