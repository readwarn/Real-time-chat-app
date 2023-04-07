<template>
  <div class="main" :style="{ backgroundImage: bg2 }">
    <div class="brand">
      <img src="//s.svgbox.net/social.svg?fill=6246ea#gumroad" />
      <p>Circuit</p>
    </div>
    <div class="form-container">
      <div class="welcome">
        <h3>Create an account,</h3>
        <h4>Introduce yourself</h4>
      </div>
      <div class="form" :style="{ backgroundImage: bg1 }">
        <div class="input-field" :class="{ focus: focusUser }">
          <i class="fa fa-envelope"></i>
          <input
            type="text"
            placeholder="Username"
            v-model="user.username"
            @focus="focus('user')"
          />
        </div>
        <div class="input-field" :class="{ focus: focusPassword }">
          <i class="fa fa-lock"></i>
          <input
            :type="password"
            placeholder="Password"
            v-model="user.password"
            @focus="focus('password')"
          />
          <i
            class="fa fa-eye eye"
            :class="{ 'fa-eye-slash': eye }"
            @click="togglePasswordField"
          ></i>
        </div>
        <p class="error">{{ error }}</p>
        <div class="sign-in">
          <p class="option">
            Already have an account?
            <router-link to="/login">Sign in</router-link>
          </p>
          <button @click="register" :disabled="disabled">
            <span v-if="!disabled">Continue</span
            ><img
              src="//s.svgbox.net/loaders.svg?fill=ffffff#oval"
              v-if="disabled"
            />
          </button>
        </div>
        <p class="option">or continue with these social profile</p>
        <div class="social-icons">
          <a
            href="https://real-time-chat-app-2jwk.vercel.app/auth/google"
            target="_self"
            ><i class="fab fa-google"></i
          ></a>
          <a
            href="https://real-time-chat-app-2jwk.vercel.app/auth/facebook"
            target="_self"
            ><i class="fab fa-facebook-square"></i
          ></a>
          <a href="#" target="_self"><i class="fab fa-twitter"></i></a>
          <a
            href="https://real-time-chat-app-2jwk.vercel.app/auth/github"
            target="_self"
            ><i class="fab fa-github"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import bg1 from "@/assets/guide-back.png";
import bg2 from "@/assets/offer-bg.png";
/* eslint-disable */

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      bg1: `url(${bg1})`,
      bg2: `url(${bg2})`,
      eye: false,
      password: "password",
      error: "",
      disabled: false,
      focusUser: false,
      focusPassword: false,
    };
  },
  methods: {
    register() {
      const self = this;
      if (this.validateForm(self.user)) {
        this.disabled = true;
        this.$http
          .post(
            "https://real-time-chat-app-2jwk.vercel.app/auth/register",
            self.user
          )
          .then((response) => {
            this.disabled = false;
            if (!response.data.loggedIn) {
              self.error = response.data.message;
            } else {
              router.push("/channels/5fc52db79aa9fb091c81c332");
            }
          });
      }
    },
    togglePasswordField() {
      this.eye = !this.eye;
      if (this.password === "password") {
        this.password = "text";
      } else {
        this.password = "password";
      }
    },
    validateForm(data) {
      if (data.username === "") {
        this.error = "really? empty username?";
        return false;
      }
      if (data.username.length < 4) {
        this.error = "username should be at least 4 characters";
        return false;
      }
      if (data.password.length < 6) {
        this.error = "password should be at least 6 characters";
        return false;
      }
      return true;
    },
    focus(element) {
      if (element === "user") {
        this.focusUser = true;
        this.focusPassword = false;
      } else {
        this.focusUser = false;
        this.focusPassword = true;
      }
    },
  },
};
</script>
<style scoped>
div.main {
  background-color: var(--background);
  background-size: 30% 60%;
  background-repeat: no-repeat;
  background-position: -0% -45%;
  padding: 2rem;
  color: var(--text);
}
div.brand {
  display: flex;
  align-items: center;
  color: var(--button);
  margin-bottom: 3rem;
}
div.brand img {
  width: 30px;
  height: 30px;
}
div.brand p {
  margin: 0;
  margin-left: 0.4rem;
  font-weight: 700;
  font-size: 1.5rem;
}
div.welcome h3 {
  font-size: 2.5rem;
  margin-bottom: 0.3rem;
}
div.welcome h4 {
  font-size: 2rem;
  margin: 0;
  filter: brightness(2.5);
}
div.form-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
div.form {
  padding: 2rem;
  border-radius: 0.35rem;
  border: 1.7px solid var(--stroke);
}
div.input-field {
  border: 1.7px solid var(--stroke);
  border-radius: 0.4rem;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
div.input-field.focus {
  border: 1.7px solid var(--button);
}
div.input-field input {
  width: 90%;
  height: 100%;
  outline: none;
  border: none;
  background: transparent;
}
div.input-field i {
  margin: 0rem 1rem;
  color: var(--button);
}
div.sign-in {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}
div.sign-in button {
  color: var(--button-text);
  background: var(--button);
  border: none;
  outline: none;
  width: 100px;
  padding: 0.7rem;
  border-radius: 0.35rem;
  cursor: pointer;
}
div.sign-in button img {
  width: 16px;
  height: 16px;
}
div.sign-in button:disabled {
  filter: brightness(0.6);
}
p.option {
  font-size: 0.8rem;
  text-align: center;
}
div.social-icons {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 1rem;
}
div.social-icons i {
  border: 1.2px solid var(--stroke);
  border-radius: 100%;
  padding: 0.5rem;
  cursor: pointer;
}
div.social-icons i:hover {
  filter: brightness(1.7);
}
div.social-icons a:nth-child(1) {
  text-decoration: none;
  color: rgb(235, 60, 60);
}
div.social-icons a:nth-child(2) {
  text-decoration: none;
  color: rgb(64, 194, 233);
}
div.social-icons a:nth-child(3) {
  text-decoration: none;
  color: rgb(65, 83, 240);
}
div.social-icons a:nth-child(4) {
  text-decoration: none;
  color: var(--text);
}
div.input-field i.eye {
  cursor: pointer;
}
p.error {
  color: var(--error);
  font-size: 0.7rem;
  text-align: center;
}
a {
  text-decoration: none;
  color: var(--button);
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 720px) {
  div.main {
    padding: 1rem;
    background-size: 57% 53%;
    background-repeat: no-repeat;
    background-position: -0% -45%;
  }
  div.form {
    width: 100%;
    padding: 0.8rem;
  }
  div.sign-in button {
    width: 80px;
  }
  div.welcome h3 {
    font-size: 2rem;
  }
  div.welcome h4 {
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
  div.brand {
    margin-bottom: 1.5rem;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 720px) {
  div.main {
    padding: 2rem;
  }
  div.form {
    width: 100%;
  }
  div.welcome h3 {
    font-size: 2rem;
  }
  div.welcome h4 {
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
  div.brand {
    margin-bottom: 1.5rem;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 1000px) {
  div.form {
    width: 50%;
  }
  div.welcome h3 {
    font-size: 2.5rem;
  }
  div.welcome h4 {
    font-size: 2rem;
  }
}
</style>
