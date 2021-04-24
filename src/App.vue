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
  background: #fff;
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
