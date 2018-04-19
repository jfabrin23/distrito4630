<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  localStorage: {
    user: {
      type: Array
    }
  }
}
</script>

<style>
:root {
  --bgPrincipal: #ccc;
}
</style>
