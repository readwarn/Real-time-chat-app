<template>
  <div></div>
</template>

<script>
/* eslint-disable */
import router from "../router";
export default {
  created() {
    this.$http
      .get("https://real-time-chat-app-c18p.onrender.com/auth/status")
      .then((res) => {
        if (res.data) {
          router.push("/channels/5fc52db79aa9fb091c81c332");
        } else {
          router.push("/login");
        }
      });
  },
};
</script>

<style></style>
