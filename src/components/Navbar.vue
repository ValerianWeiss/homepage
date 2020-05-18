<template>
  <div class="navbar">
    <div class="menu">
      <hr class="menu-line">
      <hr class="menu-line">
      <hr class="menu-line">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'navbar' })
export default class Navbar extends Vue {}
</script>

<style lang="sass" scoped>
.menu
  height: 30px
  width: 40px
  margin-left: 30px
  padding: 20px 5px 10px 5px

.menu-line
  margin: 0 0 8px 0
  border-top: 1px solid black

</style>
