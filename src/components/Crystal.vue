<template>
  <div class="crystal">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { MeshPhongMaterial,
  Mesh,
  Light,
  Scene,
  Object3D,
  WebGLRenderer,
  PerspectiveCamera,
  SpotLight,
  IcosahedronGeometry,
  Vector3 } from 'three'

@Component({ name: 'crystal' })
export default class Crystal extends Vue {
  private renderer: WebGLRenderer|null
  private scene: Scene|null
  private camera: PerspectiveCamera|null
  private crystal: Mesh|null

  public constructor() {
    super()
    this.renderer = null
    this.scene = null
    this.camera = null
    this.crystal = null
  }

  public mounted(): void {
    this.setupSketch()
    this.renderFunc()
  }

  private setupSketch(): void {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(90, 1, 0.1, 1000)
    this.renderer = new WebGLRenderer({ alpha: true })

    let elements = document.getElementsByClassName('crystal')
    let element = elements.item(0)

    if (elements.length === 1 && element != null) {
      element.appendChild(this.renderer.domElement)
      let sketchWidth = element.clientWidth
      let sketchHeight = element.clientHeight
      this.renderer.setSize(sketchWidth, sketchHeight)
      this.crystal = this.createCrystal()
      this.setRotation([this.crystal], Math.PI / 3, 0, 0)
      this.setPosition([this.crystal], 0, 0, -2)
      let lights = this.createLights(this.crystal)
      let objects = [this.crystal, ...lights]
      this.addToScene(objects, this.scene)
    } else {
      throw new Error('More or none entrypoints for sketch')
    }
  }

  private createCrystal(): Mesh {
    let geometry = new IcosahedronGeometry(1)
    let material = new MeshPhongMaterial({
      color: 0xA0A0A0,
      emissive: 0x0,
      specular: 0xFFFFFF,
      flatShading: true,
      shininess: 50
    })
    return new Mesh(geometry, material)
  }

  private createLights(target: Mesh): Light[] {
    let topLight = new SpotLight(0xFFFFFF, 2, 100, Math.PI / 3, 0.3, 1)
    topLight.position.set(-5, 4, -2)
    topLight.target = target

    let bottomLight = new SpotLight(0xFFFFFF, 0.05)
    bottomLight.position.set(0, -5, -4)
    topLight.target = target

    return [topLight, bottomLight]
  }

  private setRotation(mashs: Mesh[], angleX: number, angleY: number, angleZ: number): void {
    mashs.forEach(mesh => mesh.rotation.set(angleX, angleY, angleZ))
  }

  private setPosition(objects: Object3D[], x: number, y: number, z: number): void {
    objects.forEach(object => object.position.set(x, y, z))
  }

  private addToScene(objects: Object3D[], scene: Scene): void {
    objects.forEach(object => scene.add(object))
  }

  private renderFunc(): void {
    if (this.crystal != null &&
      this.scene != null &&
      this.renderer != null &&
      this.camera != null) {
      requestAnimationFrame(this.renderFunc)
      this.crystal.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI / 256)
      this.renderer.render(this.scene, this.camera)
    }
  }
}
</script>
