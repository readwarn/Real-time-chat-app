<template>
  <section class="channel" @click="Channelrotate = false" :style="channel">
    <section class="overlay" v-if="overlay" @click.self="overlay = false">
      <div class="new-channel" v-if="newChannel">
        <p>
          NEW CHANNEL <span class="error">{{ error }}</span>
        </p>
        <input
          type="text"
          placeholder="name"
          v-model="channelDetails.name"
          @focus="created = false"
        />
        <textarea
          placeholder="description"
          cols="30"
          rows="10"
          v-model="channelDetails.description"
        ></textarea>
        <button
          class="join"
          @click="addNewChannel(channelDetails)"
          :disabled="creating || created"
        >
          <span v-if="!creating && !created">Create</span>
          <img
            src="//s.svgbox.net/loaders.svg?fill=ffffff#oval"
            v-if="creating"
          />
          <img
            src="//s.svgbox.net/materialui.svg?fill=ffffff#check_circle_outline"
            v-if="created"
          />
        </button>
      </div>
      <div class="new-channel" v-if="joinChannel">
        <p>JOIN A CHANNEL</p>
        <input
          type="text"
          placeholder="Input channel name"
          v-model="findChannelbyName"
        />
        <p>{{ searchError }}</p>
        <button
          class="join"
          @click="findChannel(findChannelbyName)"
          :disabled="finding"
        >
          <span v-if="!finding">Search</span
          ><img
            src="//s.svgbox.net/loaders.svg?fill=ffffff#oval"
            v-if="finding"
          />
        </button>
        <div class="foundChannel" v-if="foundChannel">
          <img
            src="//s.svgbox.net/materialui.svg?fill=fffff5#close"
            alt="close"
            class="close"
            @click="foundChannel = false"
          />
          <img src="@/assets/channel-avi.svg" alt="" class="avi" />
          <p class="title">{{ foundChannel.name }}</p>
          <p>{{ foundChannel.description }}</p>
          <p>{{ joiningError }}</p>
          <button
            class="join"
            :disabled="joining || joined"
            @click="joinNewChannel(foundChannel)"
          >
            <span v-if="!joining && !joined">Join</span>
            <img
              src="//s.svgbox.net/loaders.svg?fill=ffffff#oval"
              v-if="joining"
            />
            <img
              src="//s.svgbox.net/materialui.svg?fill=ffffff#check_circle_outline"
              v-if="joined"
            />
          </button>
        </div>
      </div>
    </section>
    <section class="left" :class="{ showSectionLeft: show }">
      <div class="joinOrCreate" :class="{ shrink: joinOrCreate }">
        <img
          src="//s.svgbox.net/materialui.svg?fill=fffff5#close"
          class="close"
          @click="joinOrCreate = true"
        />
        <p class="joinOrCreate">Create or Join a channel</p>
        <p class="desc">
          Channel is where you and your friends hang out. Join one and start
          having fun
        </p>
        <div class="create mt-5" @click.stop="showOption('create')">
          <div>
            <img
              src="https://discord.com/assets/79516499036b21acd5f56ccba0635c38.svg"
              alt="discord"
            />
            <p class="desc">Create my own channel</p>
          </div>
          <i class="fa fa-chevron-right"></i>
        </div>
        <div class="create" @click.stop="showOption('join')">
          <div>
            <img
              src="https://discord.com/assets/6670414aa93c6a4b3b5c7f57ead40533.svg"
              alt="discord"
            />
            <p class="desc">Join a channel</p>
          </div>
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>
      <channels
        :channels="channels"
        @leave-channel="leaveChannel"
        @add-channel="joinOrCreate = false"
        @channel-click="showChannels = false"
        v-if="showChannels"
      />
      <members
        :channel="channel"
        @icon-click="showChannels = true"
        v-if="!showChannels"
      />
      <div class="user">
        <div class="profile-container">
          <profile :display="Channelrotate" />
        </div>
        <img :src="avi" alt="avi" />
        <p>{{ currentUser.username }}</p>
        <i
          class="fa fa-chevron-right"
          :class="{ rotate: Channelrotate }"
          @click.stop="Channelrotate = !Channelrotate"
        ></i>
      </div>
    </section>
    <section class="right">
      <div class="loading" v-if="channel.name === undefined">
        <img src="//s.svgbox.net/loaders.svg?fill=805ad5#ball-triangle" />
      </div>
      <div class="channel-head">
        <p>
          <i class="fa fa-bars toggle" @click="show = true"></i>
          {{ channel.name | capitalize }}
        </p>
        <i class="fa fa-times cancel" @click="show = false" v-if="show"></i>
      </div>
      <p class="disconnected" v-if="disconnected">disconnected</p>
      <div class="body-right-container">
        <div class="body-right">
          <div
            class="mssg"
            v-for="(message, index) in channel.messages"
            :key="index"
          >
            <div v-if="showDivider(index)" class="divider">
              <div></div>
              <p>{{ message.date | dividerDate }}</p>
              <div></div>
            </div>
            <p class="notification" v-if="message.type === 'notification'">
              {{ message.content }}
            </p>
            <message
              v-if="message.type !== 'notification'"
              :message="message"
              :yours="
                currentUser._id === message.owner.id._id ||
                  currentUser.username === message.owner.name
              "
            />
          </div>
        </div>
      </div>
      <div class="send">
        <input
          type="text"
          placeholder="Type a message here"
          v-model="message.content"
          @keyup.enter="sendMessage(channel)"
        />
        <button
          @click.stop.prevent="sendMessage(channel)"
          :disabled="message.content == '' || channel.name === undefined"
        >
          <img src="//s.svgbox.net/materialui.svg?fill=ffffff#send" />
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import members from "@/components/members.vue";
import message from "@/components/message.vue";
import channels from "@/components/channels.vue";
import profile from "@/components/profile.vue";
import avatar1 from "@/assets/rilwan.jpg";
import router from "../router";
import { io } from "socket.io-client";
import dayjs from "dayjs";
/* eslint-disable */
export default {
  components: {
    members: members,
    channels: channels,
    message: message,
    profile: profile,
  },
  data() {
    return {
      error: "",
      disconnected: false,
      channel: {},
      searchError: "",
      joiningError: "",
      Channelrotate: false,
      joinOrCreate: true,
      channelDetails: {
        name: "",
        description: "",
      },
      findChannelbyName: "",
      currentUser: "",
      message: {
        content: "",
        owner: {
          name: "",
          id: {
            _id: "",
            avi: "",
          },
        },
        date: "",
      },
      notification: {
        type: "notification",
        content: "",
        date: "",
      },
      newChannel: false,
      joinChannel: false,
      showChannels: false,
      overlay: false,
      show: false,
      avatar: avatar1,
      channels: [],
      channel: {},
      foundChannel: false,
      created: false,
      creating: false,
      joining: false,
      joined: false,
      finding: false,
      socket: io("wss://real-time-chat-app-2jwk.vercel.app/socket.io"),
      child: 100,
      parent: 30,
    };
  },
  filters: {
    capitalize(value) {
      if (value === undefined) {
        return `SELECT OR JOIN ANOTHER CHANNEL`;
      } else {
        return value.toUpperCase();
      }
    },
    dividerDate(value) {
      const date = dayjs(value);
      const today = new Date();
      const now = dayjs(
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
      if (now.isSame(date, "day")) {
        return "Today";
      }
      if (now.diff(date, "day", true) > 0 && now.diff(date, "day", true) < 1) {
        return "Yesterday";
      }
      return date.format("DD MMMM YYYY");
    },
  },
  watch: {
    $route(to, from) {
      this.channels.forEach((channel) => {
        if (channel._id === to.params.id) {
          this.channel = channel;
        }
      });
    },
  },
  computed: {
    avi() {
      if (this.currentUser.avi === undefined) {
        return this.avatar;
      } else {
        return this.currentUser.avi;
      }
    },
  },
  methods: {
    showDivider(index) {
      if (index === 0) {
        return true;
      }
      const newMessage = dayjs(this.channel.messages[index].date);
      const prevMessage = dayjs(this.channel.messages[index - 1].date);
      return !newMessage.isSame(prevMessage, "day");
    },
    showOption(option) {
      this.overlay = true;
      if (option === "create") {
        this.newChannel = true;
        this.joinChannel = false;
      } else {
        this.joinChannel = true;
        this.newChannel = false;
      }
    },
    findChannel(ChannelName) {
      this.finding = true;
      this.joiningError = "";
      this.joined = false;
      this.$http
        .get(
          "https://real-time-chat-app-2jwk.vercel.app/channels/name/" +
            ChannelName
        )
        .then((res) => {
          this.finding = false;
          if (res.data === null) {
            this.searchError = "No channel found. NOTE: Name is case-sensitive";
          } else {
            this.foundChannel = res.data;
            this.searchError = "";
          }
        });
    },
    joinNewChannel(channel) {
      this.joined = false;
      this.joining = true;
      this.$http
        .post(
          "https://real-time-chat-app-2jwk.vercel.app/channels/" + channel._id
        )
        .then((res) => {
          this.joining = false;
          if (res.data.isHere) {
            this.joiningError = "You are already a member";
          } else {
            this.joined = true;
            this.channels.push(res.data.foundChannel);
            this.channel = res.data.foundChannel;
            if (this.$route.params.id !== channel._id) {
              router.push("/channels/" + channel._id);
            }
            this.registerChannel(this.channel);
            let channelCopy = JSON.parse(JSON.stringify(this.channel));
            this.notification.content = `${this.currentUser.username} joined`;
            this.sendNotification(channelCopy);
          }
        });
    },
    addNewChannel(channelDetails) {
      this.creating = true;
      this.error = "";
      this.$http
        .post(
          "https://real-time-chat-app-2jwk.vercel.app/channels",
          channelDetails
        )
        .then((res) => {
          this.creating = false;
          if (res.data.nameTaken) {
            this.error = "Name is already taken";
          } else {
            this.error = "";
            this.created = true;
            this.channels.push(res.data);
            this.channel = res.data;
            let channelCopy = JSON.parse(JSON.stringify(res.data));
            this.notification.content = `${this.currentUser.username} created ${res.data.name}`;
            this.sendNotification(channelCopy);
          }
        });
    },
    send(message, channel) {
      this.socket.emit("messageSent", channel);
      this.$http
        .post(
          "https://real-time-chat-app-2jwk.vercel.app/channels/" +
            channel._id +
            "/messages",
          message
        )
        .then((res) => {});
    },
    sendMessage(channel) {
      const message = JSON.parse(JSON.stringify(this.message));
      message.date = Date.now();
      let channelCopy = JSON.parse(JSON.stringify(channel));
      channelCopy.messages.push(message);
      this.send(message, channelCopy);
      if (channel._id === this.channel._id) {
        this.channel.messages.push(message);
        this.message.content = "";
        this.$nextTick(() => {
          this.parent.scrollTop = this.updatedScrollTop();
        });
      }
    },
    sendNotification(channel) {
      const notification = JSON.parse(JSON.stringify(this.notification));
      notification.date = Date.now();
      channel.messages.push(notification);
      this.send(notification, channel);
      if (channel._id === this.channel._id) {
        this.channel.messages.push(notification);
        this.$nextTick(() => {
          this.parent.scrollTop = this.updatedScrollTop();
        });
      }
    },
    registerChannels(channels) {
      this.socket.emit("registerAll", channels);
    },
    registerChannel(channel) {
      this.socket.emit("register", channel);
    },
    updateChannel(updatedChannel) {
      if (updatedChannel._id === this.channel._id) {
        this.channel = updatedChannel;
      }
      this.channels = this.channels.map((channel) =>
        channel._id === updatedChannel._id ? updatedChannel : channel
      );
    },
    leaveChannel(channel, index) {
      let channelCopy = JSON.parse(JSON.stringify(channel));
      this.$http
        .delete(
          "https://real-time-chat-app-2jwk.vercel.app/channels/" + channel._id
        )
        .then((res) => {
          this.channels.splice(index, 1);
          this.channel = {};
          this.notification.content = `${this.currentUser.username} left`;
          this.sendNotification(channelCopy);
        });
    },
    updatedScrollTop() {
      const parentHeight = this.parent.clientHeight;
      const childHeight = this.child.clientHeight;
      return childHeight - parentHeight + 13;
    },
  },
  mounted() {
    this.socket.on("connect", () => {
      console.log("SOCKET CONNECTED!");
      if (this.channels.length > 0) {
        this.registerChannels(this.channels);
        this.disconnected = false;
      }
    });
    this.socket.on("disconnect", (reason) => {
      console.log("SOCKET DISCONNECTED COS", reason);
      this.disconnected = true;
    });
    this.parent = document.querySelector("div.body-right-container");
    this.child = document.querySelector("div.body-right");
    this.socket.on("messageReceived", (channel) => {
      this.updateChannel(channel);
      let diff =
        this.child.clientHeight -
        (this.parent.clientHeight + this.parent.scrollTop);
      if (diff < 10) {
        this.$nextTick(() => {
          this.parent.scrollTop = this.updatedScrollTop();
        });
      }
    });
    const self = this;

    this.$http
      .get("https://real-time-chat-app-2jwk.vercel.app/users/currentUser")
      .then((res) => {
        if (res.data.isLoggedIn === false) {
          router.push("/login");
        } else {
          this.currentUser = res.data;
          this.message.owner.name = res.data.username;
          this.message.owner.id._id = res.data._id;
          this.message.owner.id.avi = res.data.avi;

          this.$http
            .get(
              "https://real-time-chat-app-2jwk.vercel.app/users/currentUser/channels"
            )
            .then((res) => {
              self.channels = res.data;
              this.registerChannels(self.channels);
              res.data.forEach((channel) => {
                if (this.$route.params.id === channel._id) {
                  self.channel = channel;
                }
              });
              this.$nextTick(() => {
                this.parent.scrollTop = this.updatedScrollTop();
              });
            });
        }
      });
  },
};
</script>

<style>
i.fa-paper-plane,
div.user i.fa-chevron-right,
div.new-channel button,
i.cancel {
  cursor: pointer;
}
section.channel {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  overflow: hidden;
  background: var(--background);
  color: var(--text);
}
section.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(210, 210, 233, 0.6);
  z-index: 99;
}

div.new-channel textarea,
div.new-channel input,
div.new-channel p {
  margin: 0;
  margin-bottom: 0.7rem;
  width: 100%;
}
div.new-channel textarea,
div.new-channel input {
  display: block;
  padding: 0.8rem;
  border-radius: 0.4rem;
  outline: none;
  border: 1.7px solid var(--button-text);
  background: var(--button-text);
}
div.new-channel textarea:focus,
div.new-channel input:focus {
  border-color: var(--button);
}
button.create {
  background: var(--button);
  padding: 0.5rem 1rem;
  color: var(--button-text);
  border-radius: 0.3rem;
  outline: none;
  border: none;
  display: block;
  margin-left: auto;
}
button.join {
  border-radius: 0.3rem;
  outline: none;
  border: none;
  display: block;
  width: 100%;
  padding: 0.8rem;
  background: var(--button);
  color: var(--button-text);
}
button.join img {
  width: 20px;
  height: 20px;
}
div.new-channel p {
  font-size: 0.8rem;
}
div.new-channel {
  color: var(--button-text);
  width: 40%;
  margin: auto;
  padding: 1rem;
  background: var(--stroke);
  border-radius: 0.4rem;
  position: relative;
  border: var(--stroke) 1.5px solid;
}
section.left {
  background: var(--highlight);
  width: 25%;
  height: 100%;
  transition: all ease 0.5s;
  position: relative;
  z-index: 50;
}
section.right {
  width: 75%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-left: auto;
}
div.loading {
  background: var(--background);
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
div.user {
  background: var(--stroke);
  color: var(--button-text);
  height: 8%;
  display: flex;
  padding: 0rem 1rem;
  align-items: center;
  position: relative;
}
div.user p {
  font-size: 0.8rem;
}
div.user i.fa-chevron-right {
  transition: all ease 0.3s;
  margin-left: auto;
}
div.user img {
  margin-right: 1.2rem;
  width: 31px;
  height: 31px;
  border-radius: 0.3rem;
}
.rotate {
  transform: rotate(90deg);
}
div.channel-head p {
  margin: 0;
  display: flex;
  align-items: center;
  color: var(--button);
  font-weight: 700;
  z-index: 5;
}
div.channel-head i.toggle {
  display: none;
  margin-right: 2rem;
  font-size: 1.5rem;
}
div.channel-head i.cancel {
  width: 25px;
  height: 25px;
  border-radius: 0.3rem;
  background: var(--button);
  color: var(--button-text);
  z-index: 10;
  display: none;
  justify-content: center;
  align-items: center;
}
div.channel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  border-bottom: 3px solid var(--button);
  padding: 0.8rem 1rem;
  padding-left: 2.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  z-index: 10;
  background: var(--button-text);
}
div.body-right-container {
  width: 100%;
  height: 80%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}
div.body-right-container::-webkit-scrollbar {
  display: none;
}
div.body-right {
  width: 83%;
  margin: auto;
}
div.divider {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
div.divider p {
  margin: 0 0.3rem;
  font-size: 0.75rem;
  text-align: center;
  white-space: nowrap;
}
div.divider div {
  height: 1px;
  width: 100%;
  background: var(--button);
}
div.body-right p.notification {
  color: var(--button-text);
  padding: 0.4rem;
  border-radius: 0.3rem;
  width: 40%;
  margin: 0 auto 1.3rem auto;
  text-align: center;
  font-size: 0.65rem;
  background: var(--button);
}
div.send {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3rem;
  width: 83%;
  min-height: 45px;
  background: var(--stroke);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: calc(100% - 50px);
  margin: auto;
  margin-bottom: 15px;
  padding-left: 1rem;
  padding-right: 0.3rem;
}
div.send input {
  width: 92%;
  height: 100%;
  background: transparent;
  font-size: 16.2px;
  outline: none;
  border: none;
  color: var(--button-text);
}
div.send button {
  width: 5%;
  height: 80%;
  border: none;
  outline: none;
  color: var(--button-text);
  background: var(--button);
  border-radius: 0.3rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  transition: transform ease-in-out 0.3s;
}
div.send button img {
  width: 25px;
  height: 25px;
}
div.send button:active {
  transform: scale(0.7);
}
section.channel div.profile-container {
  position: absolute;
  padding: 0rem 1rem;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
div.joinOrCreate {
  position: absolute;
  padding: 0.5rem;
  border-radius: 0.4rem;
  width: 97%;
  margin: auto;
  height: 310px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 10px;
  background: var(--stroke);
  z-index: 6;
  transition: all ease-in-out 0.35s;
  overflow: hidden;
  box-sizing: border-box;
  color: var(--button-text);
}
section.left div.joinOrCreate.shrink {
  height: 0;
  padding: 0;
}

img.close {
  width: 30px;
  height: 30px;
  display: block;
}
div.joinOrCreate p {
  margin: 0;
}
div.joinOrCreate p.joinOrCreate {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 1rem 0rem;
}
p.desc {
  font-size: 0.7rem;
  color: var(--button-text);
}
div.create {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--highlight);
  border-radius: 0.4rem;
  padding: 0.4rem 0.6rem;
  margin-bottom: 0.8rem;
}
div.create div {
  display: flex;
  align-items: center;
}
.mt-5 {
  margin-top: 0.8rem;
}
div.create img {
  width: 40px;
  height: 40px;
  margin-right: 0.6rem;
}
div.foundChannel {
  position: absolute;
  padding: 0.5rem;
  top: 0;
  left: -5px;
  width: calc(100% + 10px);
  background: var(--stroke);
  border-radius: 0.4rem;
  transform: translateY(-25px);
  text-align: center;
}
div.foundChannel img.close {
  display: block;
  margin: 0 0 0 auto;
}
div.foundChannel img.avi {
  width: 100px;
  height: 50px;
  display: block;
  margin: auto;
}
div.foundChannel p.title {
  font-weight: 700;
  font-size: 1.3rem;
}
section.left.showSectionLeft {
  position: fixed;
  left: 0%;
  top: 0%;
}
span.error {
  color: var(--error);
}
p.disconnected {
  text-align: center;
  font-size: 0.7rem;
  color: var(--button-text);
  background: var(--error);
  padding: 0.2rem;
  margin: 0;
}

@media only screen and (max-width: 720px) {
  section.right {
    width: 100%;
  }
  section.left {
    position: absolute;
    width: 85%;
    left: -85%;
    z-index: 50;
  }
  div.channel-head i.toggle {
    display: block;
  }
  div.channel-head i.cancel {
    display: flex;
  }
  div.body-right {
    width: 95%;
  }
  div.channel-head {
    padding: 0.67rem 1rem;
    padding-left: 1rem;
    width: 100%;
  }
  div.send {
    width: 95%;
  }
  div.send input {
    width: 87%;
  }
  div.send button {
    width: 13%;
  }
  div.new-channel {
    width: 90%;
  }
  div.divider p {
    font-size: 0.65rem;
  }
  div.body-right p.notification {
    width: 45%;
  }
}
</style>
