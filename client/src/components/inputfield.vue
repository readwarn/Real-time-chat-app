<template>
   <div class="input-field">
      <label :for="title">{{title}}</label>
      <input  :id="title" :placeholder="placeholder" v-if="!textarea" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
      <textarea name="bio" :id="title" cols="30" rows="7" v-if="textarea" :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)"></textarea>
   </div>
</template>

<script>
/* eslint-disable */
export default {
     props:['title','placeholder','textarea','value'],
}
</script>

<style>
  div.input-field{
       width: 60%;
       margin-bottom: 0.6rem;
  }
 div.input-field input,textarea{
      width: 100%;
      outline: none;
      padding: 1rem 0.5rem;
      border-radius: 0.3rem;
      border: 1.4px solid black;
      background: rgb(241, 238, 238);
      color: gray;
  }
  label{
      color: gray;
      font-size: 0.8rem;
      text-transform: capitalize;
  }
  @media only screen and (max-width: 720px) {
      div.input-field{
        width: 90%;
      }
}
@media only screen and (min-width: 720px) {
      div.input-field{
        width: 75%;
      }
}
@media only screen and (min-width: 1000px) {
      div.input-field{
        width: 65%;
      }
}
</style>