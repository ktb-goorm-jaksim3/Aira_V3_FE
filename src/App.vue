<!-- App.vue -->
<template>
  <div id="app">
    <button @click="showSignup">회원가입</button>
    <button @click="showLogin">로그인</button>

    <SignupForm v-if="isSignupPage" />
    <LoginForm v-else />
  </div>
</template>

<script>
import SignupForm from "./components/SignupForm.vue";
import LoginForm from "./components/LoginForm.vue";

export default {
  name: "App",
  components: {
    SignupForm,
    LoginForm,
  },
  data() {
    return {
      isSignupPage: true,
    };
  },
  methods: {
    showSignup() {
      this.isSignupPage = true;
    },
    showLogin() {
      this.isSignupPage = false;
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #2c2c2c;
}

button {
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #333;
  color: white;
}

button:hover {
  background: #555;
}
</style>