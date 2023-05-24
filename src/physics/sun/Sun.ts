import Phaser from 'phaser'

export default class Sun extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, private speed: number) {
    super(scene, x, y, 'sun')

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setScale(0.3)
    this.initAnimations()
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('sun', 'assets/sun/frame_1.png')

    for (let i = 1; i <= 4; i++) {
      scene.load.image(`sun_${i}`, `assets/sun/frame_${i}.png`)
    }
  }

  update() {
    this.setVelocityY(this.speed)
  }

  initAnimations() {
    const frames = []

    if (!this.scene.anims.get('sun')) {
      for (let i = 1; i <= 4; i++) {
        frames.push({ key: `sun_${i}` })
      }
      this.scene.anims.create({
        key: 'sun',
        frames,
        frameRate: 4,
        repeat: -1,
      })
    }
    this.anims.play('sun')
  }
}
