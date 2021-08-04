<template>
  <div id="app">
    <mosartpanel />
  </div>
</template>

<script>
import mosartpanel from "./components/PannellinoMosart.vue";

export default {
  name: "App",
  components: {
    mosartpanel,
  },
};
</script>

<style>
#app {
  background-color: #36393d;
  color: white;
  text-align: center;
  padding:5px;
}
#titlePanel {
  color: white;
  font-size: large;
  background: tomato;
  box-shadow: 2px 2px 20px black;
  border-radius: 10px 10px 0px 0px;
  padding: 10px;
}
label {
  color: white;
}
</style>
