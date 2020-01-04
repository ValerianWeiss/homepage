<template>
  <div class="hello-world">
    <h1>Hello World!</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'hello-world' })
export default class HelloWorld extends Vue { }
</script>
