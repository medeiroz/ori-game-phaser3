import Phaser from 'phaser'
import Sun from './Sun'

export default class SunGroup extends Phaser.Physics.Arcade.Group {
  maxChildren: number = 5
  spawnLastTime: number = 0
  spawnInterval: number = 2000

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
  }

  static preload(scene: Phaser.Scene) {
    Sun.preload(scene)
  }

  update() {
    if (this.getChildren().length < this.maxChildren && this.scene.time.now > this.spawnLastTime + this.spawnInterval) {
      this.spawn()
    }
    // @ts-ignore: Unreachable code error
    this.children.each((child: Sun) => {
      child.update()
      if (child.y > this.scene.cameras.main.height) {
        this.killAndHide(child)
        child.destroy()
      }
    })
  }

  spawn() {
    const y = 0
    const x = this.getXposition()

    this.add(new Sun(this.scene, x, y, Phaser.Math.Between(85, 185)))
    this.spawnLastTime = this.scene.time.now
  }

  getXposition(): number {
    const lastChild = this.getChildren()[this.getChildren().length - 1]

    // @ts-ignore: Unreachable code error
    const lastChildX = lastChild ? lastChild.x : 0

    const x = Phaser.Math.Between(0, this.scene.cameras.main.width)
    const diff = Math.abs(lastChildX - x)

    if (diff < 180) {
      return this.getXposition()
    }
    return x
  }
}
