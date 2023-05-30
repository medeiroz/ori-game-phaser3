import Phaser from 'phaser'
import CloudGroups from './cloud/CloudGroups'

export default class Background {
  protected sky!: Phaser.GameObjects.Image
  protected platforms!: Phaser.Physics.Arcade.StaticGroup
  protected clouds!: CloudGroups

  constructor(protected scene: Phaser.Scene) {
    this.create()
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('sky', 'assets/background/sky.png')
    scene.load.image('ground', 'assets/background/ground.png')
    CloudGroups.preload(scene)
  }

  create() {
    this.sky = this.scene.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.sky.displayWidth = this.scene.cameras.main.width
    this.sky.displayHeight = this.scene.cameras.main.height

    this.platforms = this.scene.physics.add.staticGroup()

    const width = this.scene.cameras.main.width
    const x = width / 2
    const y = this.scene.cameras.main.height - 20

    const ground = this.platforms.create(x, y, 'ground')
    ground.setDisplaySize(width, ground.height) // Definir a largura igual à largura da câmera
    ground.setDepth(2)
    ground.refreshBody()

    this.clouds = new CloudGroups(this.scene)
  }

  update() {
    this.clouds.update()
  }

  destroy() {
    this.sky.destroy()
    this.platforms.destroy()
    this.clouds.destroy()
  }
}
