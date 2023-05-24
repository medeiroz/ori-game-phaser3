import Phaser from 'phaser'

export default class Meteor extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, private speed: number) {
    super(scene, x, y, 'meteor')

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.setScale(0.3)
    this.initAnimations()
    this.body?.setSize(this.width - 50, this.height - 25).setOffset(25, 25)
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('meteor', 'assets/meteor/frame_1.png')
    scene.load.image(`meteor_1`, 'assets/meteor/frame_1.png')
    scene.load.image(`meteor_2`, 'assets/meteor/frame_2.png')
  }

  update() {
    this.setVelocityY(this.speed)
  }

  initAnimations() {
    if (!this.scene.anims.get('meteor')) {
      this.scene.anims.create({
        key: 'meteor',
        frames: [{ key: `meteor_1` }, { key: `meteor_2` }],
        frameRate: 4,
        repeat: -1,
      })
    }
    this.anims.play('meteor')
  }
}
