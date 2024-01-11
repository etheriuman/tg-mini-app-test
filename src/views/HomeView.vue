<template>
  <div class="home flex-col flex items-center">
    <span>123</span>
    <img alt="Vue w-[200px]" src="../assets/logo.png">
    <HelloWorld class="hw" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
