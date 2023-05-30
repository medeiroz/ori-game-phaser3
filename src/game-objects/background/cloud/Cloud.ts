export default class Cloud extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number, public speed: number) {
    const name = 'cloud_' + Phaser.Math.Between(1, 2)
    super(scene, x, y, name)
    this.scene.add.existing(this)
    this.setDepth(0)
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('cloud_1', 'assets/background/clouds/cloud_1.png')
    scene.load.image('cloud_2', 'assets/background/clouds/cloud_2.png')
  }

  update() {
    this.setX(this.x + this.speed)
  }
}
