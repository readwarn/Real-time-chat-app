<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root{
 --background:#fffffe;
 --sec-bg:#d1d1e9;
 --highlight:#6246ea;
 --text:#2b2c34;
 --button:#6246ea;
 --button-text:#fffffe;
 --stroke:#2b2c34;
 --card-bg:#d1d1e9;
 --error:#e45858;
}
*{
  box-sizing: border-box;
}
#app {
font-family: 'Noto Sans JP', sans-serif;
}
html,body,div#app{
        margin: 0;
        min-height: 100%;
 }
 button img{
   display: block;
   margin: auto;
 }
 button:disabled{
   filter: brightness(0.4);
   cursor: not-allowed;
 }
 input{
   font-size: 16.2px;
 }
</style>
