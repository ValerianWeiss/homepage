<template>
  <div id="app">
    <hello-world></hello-world>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue'

@Component({ components: { HelloWorld } })
export default class App extends Vue {}
</script>
