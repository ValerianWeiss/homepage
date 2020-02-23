<template>
  <div class="app">
    <navbar></navbar>
    <home></home>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Home from '@/views/Home.vue'
import Navbar from '@/components/Navbar.vue'

@Component({ components: { Home, Navbar } })
export default class App extends Vue {}
</script>
