<template>
  <div class="item-selector">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'item-selector' })
export default class ItemSelector extends Vue {}
</script>

<style lang="sass" scoped>
.item-selector
    width: 100%
    height: 100px
</style>
