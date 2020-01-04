<template>
	<div class="hello-world">
		<div>
			<h1 class="center heading h1-bright">Hello World!</h1>
		<div class="center">
			<h4 class="text h4-bright">Work in progress{{this.dots}}
			</h4>
		</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import '@/main.sass'

@Component({ name: 'hello-world' })
export default class HelloWorld extends Vue {
	private dots = '   '
	private drawDotsFuncId = 0

	mounted(): void {
		this.drawDots()
	}

	destroy(): void {
		clearInterval(this.drawDotsFuncId)
	}

	drawDots(): void {
		let maxDotCount = 3

		this.drawDotsFuncId = setInterval(() => {
			let array = this.dots.split('')
			for (let i = 0; i < array.length; i++) {
				if (array[i] === ' ') {
					array[i] = '.'
					this.dots = array.join('')
					return
				}
			}
			this.dots = '   '
		}, 500)
	}
}
</script>

<style lang="sass" scoped>
.heading
	margin-top: 40vh
</style>
