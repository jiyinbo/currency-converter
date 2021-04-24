<template>
  <div id="app">
    <Converter/>
  </div>
</template>

<script>
import Converter from './features/converter/Converter.vue';

export default {
  name: 'App',
  components: {
    Converter,
  },
};
</script>

<style>
body {
  background: linear-gradient(91.24deg,#e1e6ed -1.08%,#cbf6ff 113.22%);
  background-attachment: fixed;
}
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #354052;
  max-width: 900px;
  margin: auto;
}
</style>
