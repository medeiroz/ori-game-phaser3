import Cloud from './Cloud'

export default class CloudGroups extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
    this.spawn('left')
  }

  static preload(scene: Phaser.Scene) {
    Cloud.preload(scene)
  }

  update() {
    // @ts-ignore: Unreachable code error
    this.children.each((child: Cloud) => {
      child.update()

      if (child.x > this.scene.cameras.main.width + child.width) {
        child.destroy()
      }
    })
  }

  spawn(direction: 'left' | 'right') {
    if (this.scene?.cameras?.main) {
      const y = Phaser.Math.Between(60, this.scene.cameras.main.height - 100)
      const x = direction === 'left' ? -150 : this.scene.cameras.main.width + 150
      const speed = direction === 'left' ? 0.5 : -0.5
      const cloud = new Cloud(this.scene, x, y, speed)
      cloud.setScale(Phaser.Math.Between(5, 10) * 0.1)
      this.add(cloud)

      setTimeout(() => {
        this.spawn(direction === 'left' ? 'right' : 'left')
      }, Phaser.Math.Between(5000, 10000))
    }
  }
}
