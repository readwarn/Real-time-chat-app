<template>
   <div class="form-cont">
           <div class="form">
       <div class="head">
            <i class="fab fa-airbnb"></i><p>DevChallenges</p>
        </div>
        <p class="title">Login</p>
         <div class="input-field">
            <i class="fa fa-envelope"></i>
            <input type="text" placeholder="Username" v-model="user.username">
         </div>
         <div class="input-field">
            <i class="fa fa-lock"></i>
            <input :type="password" placeholder="Password" v-model="user.password">
            <i class="fa fa-eye eye" :class="{'fa-eye-slash':eye}"  @click="togglePasswordField"></i>
         </div>
         <p class="error">{{error}}</p>
         <button @click="login">Start coding now</button>
         <p class="option">or continue with these social profile</p>
         <div class="social-icons">
            <a href="https://rocky-temple-08906.herokuapp.com/auth/google" target="_self"><i class="fab fa-google"></i></a>
            <a href="https://rocky-temple-08906.herokuapp.com/auth/facebook" target="_self"><i class="fab fa-facebook-square"></i></a>
            <a href="#" target="_self"><i class="fab fa-twitter"></i></a>
            <a href="https://rocky-temple-08906.herokuapp.com/auth/github" target="_self"><i class="fab fa-github"></i></a>
         </div>
         <p class="option">Dont have an account? <router-link to="/register">Register</router-link>  </p>
   </div>
   <div class="rilwan">
        <p>Rilwan</p>
        <p>devchallenges.io</p>
   </div>
   </div>
</template>

<script>

import router from '../router'
/* eslint-disable */
export default {
    data(){
       return{
           user:{
               username:'',
               password:''
           },
           error:'',
           password:'password',
           eye:false
       }
    },
    methods:{
        login(){
            const self=this;
            this.$http.post('https://rocky-temple-08906.herokuapp.com/auth/login',self.user).then((response)=>{
                  if(!response.data.loggedIn){ 
                     self.error=response.data.message;
                     console.log('logged in: ',response) 
                  }else{
                     console.log('logged out: ',response) 
                     router.push('/');
                  }
            })
        },
        togglePasswordField(){
            this.eye=!this.eye;
            if(this.password==='password'){
                this.password='text'
            }else{
                this.password='password'
            }
        }
    }
}
</script>

<style scoped>
   div.form-cont{
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       min-height: 100vh;
       background: #050505;
       color: white;
       padding: 20px 0;
   }
   div.form p.title{
       font-weight: 700;
       font-size: 1.4rem;
   }
   div.form{
    padding: 2rem;
    border-radius: 20px;
    width: 32%;
    border: 1.5px solid rgb(5, 5, 5);
    background: #2a2158;
    box-sizing: border-box;
}
div.head{
    display: flex;
    align-items: center;
}
div.head p{
    color: white;
    margin: 0;
    font-size: 0.8rem;
}
div.head i{
    margin-right: 0.1rem;
    color: #C73622;
    font-size: 1.2rem;
}
div.rilwan{
    font-size: 0.7rem;
    display: flex;
    width: 22%;
    justify-content: space-between;
    padding: 0rem 1.5rem;
}
p.option{
    font-size: 0.85rem;
    color: gray;
    text-align: center;
}
p.option a{
    text-decoration: none;
    color: tomato;
}
div.input-field{
    border: 1.7px solid black;
    border-radius: 0.4rem;
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    background: rgb(241, 238, 238);
}
div.input-field input{
    width: 90%;
    height: 95%;
    outline: none;
    border: none;
    background: transparent;
}
div.input-field i{
    margin: 0rem 1rem;
    color: rgb(71, 67, 67);
}
div.social-icons{
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    margin-top:1rem;
}
div.social-icons i{
    border: 1.2px solid white;
    border-radius: 100%;
    padding: 0.5rem;
    cursor: pointer;
}
div.social-icons i:hover{
     filter: brightness(1.7);
}
div.social-icons a:nth-child(1){
    text-decoration: none;
    color: rgb(235, 60, 60);
}
div.social-icons a:nth-child(2){
    text-decoration: none;
    color: rgb(64, 194, 233);
}
div.social-icons a:nth-child(3){
    text-decoration: none;
    color: rgb(65, 83, 240);
}
div.social-icons a:nth-child(4){
    text-decoration: none;
    color: rgb(15, 0, 0);
}
div.input-field i.eye{
    cursor: pointer;
}
button{
    background: #2F80ED;
    border: none;
    color: white;
    border-radius: 0.4rem;
    padding: 0.8rem;
    width: 100%;
    text-align: center;
    cursor: pointer;
}
button:hover{
    color: #2F80ED;
    background: white;
}
p.error{
    color: #F0402C;
    font-size: 0.7rem;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 720px) {
      div.form, div.rilwan{
         width: 90%;
      } 
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 720px) {
      div.form,div.rilwan{
           width: 65%;
      }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 1000px) {
       div.form,div.rilwan{
          width: 40%;
       }
}
</style>
