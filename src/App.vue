<template>
  <div id="app">
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "./components/SignupForm.vue";

export default {
  name: "App",
  components: {
    SignupForm,
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
</style>