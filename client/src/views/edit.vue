<template>
  <div class="edit-cont" @click="display = false">
    <navbar @clicke="display = !display" :user="user" :rotate="display" />
    <div class="profile-container">
      <profile :display="display" />
    </div>
    <div class="back">
      <router-link to="/dashboard"
        ><i class="fa fa-chevron-left"> back</i></router-link
      >
    </div>
    <div class="edit-form">
      <p class="title">Change Info</p>
      <p class="subtitle">Changes will be reflected to every services</p>
      <div class="photo">
        <label :style="{ backgroundImage: avi }">
          <input
            @change="uploadAvi"
            type="file"
            name="avatar"
            id="avatar"
            style="display:none; cursor:pointer;"
          />
          <i class="fa fa-camera"></i>
        </label>
        <p>{{ photo }}</p>
      </div>
      <input-field
        title="name"
        placeholder="Enter your name"
        v-model="user.username"
      />
      <input-field
        title="Bio"
        placeholder="Enter your bio"
        textarea="true"
        v-model="user.bio"
      />
      <input-field
        title="Phone"
        placeholder="Enter your phone"
        v-model="user.phone"
      />
      <input-field
        title="email"
        placeholder="Enter your email"
        v-model="user.email"
      />
      <input-field
        title="password"
        placeholder="Enter your new password"
        v-model="user.password"
      />
      <button class="save" @click="save">save</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import profile from "@/components/profile.vue";
import nav from "@/components/nav.vue";
import inputField from "@/components/inputfield.vue";
import avatar1 from "@/assets/rilwan.jpg";
import router from "../router";
export default {
  data() {
    return {
      avatar: avatar1,
      display: false,
      photo: "CHANGE PHOTO",
      CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dmigpnpar/image/upload",
      CLOUDINARY_UPLOAD_PRESET: "qv83yxtp",
      user: {
        username: "",
        bio: "",
        phone: "",
        email: "",
        password: "",
        avi: "",
      },
    };
  },
  computed: {
    avi() {
      if (this.user.avi === undefined) {
        return `url(${this.avatar})`;
      } else {
        return `url(${this.user.avi})`;
      }
    },
  },
  methods: {
    save() {
      const self = this;
      this.$http
        .put(
          "https://real-time-chat-app-2jwk.vercel.app/users/currentUser",
          self.user
        )
        .then((res) => {
          router.push("/dashboard");
        });
    },
    uploadAvi(e) {
      const image = e.target.files[0];
      if (image.size < 100000) {
        this.photo = "CHANGE PHOTO";
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", this.CLOUDINARY_UPLOAD_PRESET);
        fetch(this.CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            this.user.avi = data.secure_url;
            console.log(data);
          })
          .catch((err) => console.error(err));
      } else {
        this.photo = "File too big";
      }
    },
  },
  created() {
    this.$http
      .get("https://real-time-chat-app-2jwk.vercel.app/users/currentUser")
      .then((res) => {
        this.user = res.data;
        console.log(this.user.avi);
      });
  },
  components: {
    profile: profile,
    navbar: nav,
    inputField: inputField,
  },
};
</script>

<style scoped>
div.edit-cont {
  padding: 75px 0;
  background: var(--background);
  min-height: 100vh;
  color: var(--text);
}
div.edit-form {
  border: 1.5px solid var(--stroke);
  width: 55%;
  margin: auto;
  border-radius: 0.4rem;
  padding: 1rem 2rem;
  background: var(--highlight);
  color: var(--button-text);
}
div.back {
  width: 55%;
  margin: auto;
  display: flex;
  align-items: baseline;
  margin-bottom: 0.6rem;
}
div.back i {
  cursor: pointer;
}
div.back a {
  color: var(--stroke);
  z-index: 50;
}
div.back i:hover {
  color: var(--button);
}
div.back i {
  margin-right: 0.4rem;
}
div.photo {
  display: flex;
  align-items: center;
  margin: 1.5rem 0rem;
  font-size: 0.9rem;
}
p.title {
  font-weight: 700;
  margin: 0;
}
p.subtitle {
  font-size: 0.7rem;
  margin: 0.3rem 0rem;
}
div.photo label {
  margin-right: 0.5rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.3rem;
  background-size: 100% 100%;
  font-size: 1.1rem;
}
button.save {
  text-align: center;
  color: var(--button-text);
  background: var(--sec-bg);
  border: none;
  width: 65px;
  padding: 0.6rem 0rem;
  border-radius: 0.3rem;
  cursor: pointer;
}
button.save:hover {
  background: #2d9cdb;
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
  div.edit-form,
  div.back {
    width: 95%;
  }
  div.edit-form {
    padding: 1rem;
  }
}
@media only screen and (min-width: 720px) {
  div.edit-form,
  div.back {
    width: 75%;
  }
  div.edit-form {
    padding: 1.5rem;
  }
}
@media only screen and (min-width: 1000px) {
  div.edit-form,
  div.back {
    width: 55%;
  }
}
</style>
