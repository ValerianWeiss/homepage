<template>
<div class="hello-world">
  <div>
    <h1 class="center heading">Hello World!</h1>
    <h4 class="center text">Work in progress{{this.dots}}</h4>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import '@/main.sass'

@Component({ name: 'hello-world' })
export default class HelloWorld extends Vue {
  private dotCount = 0
  private maxDotCount = 3
  private dots = ''

	constructor() {
		super()
		this.drawDots()
	}


	drawDots(): void {
		setInterval(() => {
			let result = ''

			for(let i = 0; i < this.maxDotCount; i++)
				result += '.'
		}, 500)
	}
}
</script>

<style lang="sass" scoped>
.heading
  margin-top: 40%
</style>
