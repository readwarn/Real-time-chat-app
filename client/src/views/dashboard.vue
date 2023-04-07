<template>
  <div class="dashboard" @click="display = false">
    <navbar @clicke="display = !display" :user="user" :rotate="display" />
    <div class="profile-container">
      <profile :display="display" />
    </div>
    <div class="heading">
      <h3>Personal Profile</h3>
      <p>Basic info, like your name and photo</p>
    </div>
    <div class="profile-cont">
      <div class="profile-head mb">
        <div>
          <p class="title">Profile</p>
          <p class="option">Some info may be visible to other people</p>
        </div>
        <router-link to="/edit"><button class="edit">Edit</button></router-link>
      </div>
      <div class="row mb">
        <p class="key">PHOTO</p>
        <img :src="avi" alt="id" />
      </div>
      <div class="row mb">
        <p class="key">NAME</p>
        <p>{{ user.username }}</p>
      </div>
      <div class="row mb">
        <p class="key">BIO</p>
        <p>{{ user.bio }}</p>
      </div>
      <div class="row mb">
        <p class="key">PHONE</p>
        <p>{{ user.phone }}</p>
      </div>
      <div class="row">
        <p class="key">EMAIL</p>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import nav from "@/components/nav.vue";
import profile from "@/components/profile.vue";
import avatar from "@/assets/rilwan.jpg";
/* eslint-disable */
export default {
  data() {
    return {
      display: false,
      avatar: avatar,
      user: {
        username: "",
        bio: "",
        phone: "",
        email: "",
        avi: "",
      },
    };
  },
  created() {
    this.$http
      .get("https://real-time-chat-app-2jwk.vercel.app/users/currentUser")
      .then((res) => {
        this.user = res.data;
      });
  },
  computed: {
    avi() {
      if (this.user.avi === undefined) {
        return this.avatar;
      } else {
        return this.user.avi;
      }
    },
  },
  components: {
    navbar: nav,
    profile: profile,
  },
};
</script>

<style scoped>
div.dashboard p,
h3 {
  margin: 0;
}
div.dashboard {
  padding: 75px 0;
  position: relative;
  background: var(--background);
  min-height: 100vh;
  color: var(--text);
}
div.heading {
  text-align: center;
  margin: 1.5rem 0rem;
}
div.heading h3 {
  font-size: 1.4rem;
  font-weight: 700;
}
div.heading p {
  font-size: 0.85rem;
}
div.profile-cont {
  border: 1.5px solid var(--stroke);
  border-radius: 0.4rem;
  width: 55%;
  background: var(--highlight);
  margin: auto;
  color: var(--button-text);
}

div.profile-head {
  display: flex;
  justify-content: space-between;
  padding: 1.4rem;
  align-items: center;
}
p.option {
  font-size: 0.75rem;
}
p.title {
  font-weight: 700;
}
button.edit {
  outline: none;
  border: 1.5px solid var(--stroke);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0.4rem 0.8rem;
}
button.edit:hover {
  background: var(--highlight);
  color: var(--button-text);
}
div.row {
  display: flex;
  padding: 1.2rem;
  align-items: center;
  flex-wrap: wrap;
}
div.row img {
  width: 50px;
  height: 50px;
  border-radius: 0.3rem;
}
div.row p:nth-child(1) {
  width: 35%;
  font-size: 0.78rem;
}
div.row p:nth-child(2) {
  font-size: 0.8rem;
  max-width: 65%;
}
.mb {
  border-bottom: 1.3px solid var(--button-text);
}
div.profile-container {
  position: fixed;
  padding: 0rem 0.3rem;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  top: 65px;
}
@media only screen and (max-width: 720px) {
  div.profile-cont {
    width: 95%;
  }
  div.row {
    justify-content: space-between;
  }
}
@media only screen and (min-width: 720px) {
  div.profile-cont {
    width: 75%;
  }
}
@media only screen and (min-width: 1000px) {
  div.profile-cont {
    width: 55%;
  }
}
</style>
