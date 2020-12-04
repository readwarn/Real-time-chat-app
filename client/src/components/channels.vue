<template>
    <div class="channel-container">
        <div class="channels-header">
             <p class="add-channel" @click="$emit('add-channel')"><i class="fa fa-plus"></i>channel</p>
             <i class="fa fa-users" @click.stop="$emit('channel-click')"></i>
        </div>
        <div class="search">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="search" v-model="channelSearch">
        </div>
           <div class="channel-box">
                  <div class="channel" v-for="(channel,index) in computedChannels" :key="index">
                        <router-link   :to="{name: 'channel', params: { id: channel._id }}">
                            <div class="channel-name">
                                <span :class="{'picked':($route.params.id===channel._id)}">CH</span>
                                <p>{{channel.name}}</p>
                            </div>
                        </router-link>
                    <i class="fa fa-times-circle" v-if="($route.params.id===channel._id)" @click="confirmIndex=index"></i>
                    <div class="confirm" v-if="confirm(index)" :id="index">
                            <p class="channel-name">Leave '{{channel.name}}'</p>
                            <p>Are you sure</p>
                            <div>
                                <p class="cancel" @click="confirmIndex=undefined">Cancel</p>
                                <button @click="leaveChannel(channel,index)">Leave channel</button>
                            </div>
                    </div>
                  </div>
           </div>
    </div>
</template>

<script>
export default {
     props:['channels'],
     data(){
         return{
            confirmIndex:undefined,
            channelSearch:''
         }
     },
     computed:{
         computedChannels(){
             return this.channels.filter(channel=>{return channel.name.includes(this.channelSearch)});
         }
     },
     methods:{
        confirm(index){
            if(index===this.confirmIndex){
                return true;
            }
            else{
                return false;
            }
        },
        leaveChannel(channel,index){
             this.confirmIndex=undefined;
             this.$emit('leave-channel',channel,index);
        }
     }
}
</script>

<style scoped>
p.add-channel,i.fa-users,i.fa-times-circle,div.channel-name,p.cancel{
    cursor: pointer;
}
div.channel-container{
    font-size: 0.8rem;
    color: var(--button-text);
    height: 92%;
    position: relative;
}
div.channels-header,div.channel,div.search,div.channel-name{
    display: flex;
    align-items: center;
}
div.channels-header{
    justify-content: space-between;
    padding: 0.8rem 1rem;
    display: flex;
    border-bottom: 3px solid var(--button-text);
    font-size: 0.9rem;
    margin-bottom: 2rem;
}
div.channels-header i.fa-plus{
    margin-right: 0.7rem;
}
div.channels-header p,div.head i{
    margin: 0;
}
div.search{
    height: 35px;
    width: 90%;
    margin: auto;
    border-radius: 0.3rem;
    padding: 0rem 0.5rem;
    background: var(--background);
}
div.search i{
    margin-right: 0.5rem;
    color: var(--button);
}
div.search input{
    outline: none;
    border: none;
    height: 100%;
    width: 100%;
    background: transparent;
}
div.channel{
      width: 90%;
      margin: auto;
      justify-content: space-between;
      position: relative;
}
div.channel-box{
    -ms-overflow-style: none; 
    scrollbar-width: none;
    overflow: scroll;
    max-height: 72%;
    padding: 2rem 0rem;
}
div.channel-box::-webkit-scrollbar {
    display: none;
}
div.channel-name{
    width: 90%;
}
i.fa-times-circle:hover{
    transform: scale(1.2);
    color: var(--error);
}
div.channel-name span{
   padding: 0.2rem; 
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 0.2rem;
   margin-right: 0.5rem;
   color: var(--text);
   background: var(--background);
}
div.channel-name span.picked{
    background: var(--error);
    color: var(--button-text);
}
div.confirm{
    position: absolute;
    width: 100%;
    background:var(--stroke);
    border-radius: 0.4rem;
    color: white;
    z-index: 99;
    text-align: center;
    transform: translateY(40px);
}
div.confirm p{
    margin: 0;
}
div.confirm  p.channel-name{
    font-size: 1.1rem;
    text-transform: uppercase;
    margin: 0.6rem 0rem 0.8rem 0rem;
}
div.confirm div{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: var(--sec-bg);
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    padding: 0.7rem;
    margin-top: 2rem;
}
div.confirm p.cancel{
    font-size: 0.8rem;
    margin: 0;
    margin-right:0.6rem;
}
div.confirm p.cancel:hover{
    text-decoration: underline;
}
div.confirm button{
    background: var(--error);
    font-size: 0.8rem;
    padding: 0.7rem;
    border-radius: 0.35rem;
    color: var(--button-text);
    border: 0;
    outline: 0;
    text-align: center;
}
a{
    text-decoration: none;
    color:var(--button-text);
    width: 100%;
}

</style>