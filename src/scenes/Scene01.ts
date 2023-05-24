import Phaser from 'phaser'
import Player from '../physics/Player'

export default class Scene01 extends Phaser.Scene {
  sky!: Phaser.GameObjects.Image
  player!: Player
  platforms!: Phaser.Physics.Arcade.StaticGroup

  constructor() {
    super('scene01')
  }

  preload() {
    this.load.image('sky', 'assets/background/sky.png')
    this.load.image('ground', 'assets/background/ground.png')
    Player.preload(this)
  }

  create() {
    this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.sky.displayWidth = this.cameras.main.width
    this.sky.displayHeight = this.cameras.main.height

    this.player = new Player(this, 100, 100)

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 568, 'ground').refreshBody()

    this.physics.add.collider(this.player, this.platforms)

    this.physics.world.setBounds(-50, 0, this.cameras.main.width + 100, this.cameras.main.height)
  }

  update() {
    this.player.update()
  }
}
