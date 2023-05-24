import Phaser from 'phaser'
import Player from '../physics/player'
import PrimaryButton from '../game-objects/buttons/PrimaryButton'

export default class StartGameScene extends Phaser.Scene {
  sky!: Phaser.GameObjects.Image

  constructor() {
    super('start_game')
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

    const screenCenterX = this.cameras.main.width / 2
    const screenCenterY = this.cameras.main.height / 2

    new PrimaryButton(this, screenCenterX, screenCenterY, 'Start', () => this.onStart(), {
      fontSize: '48px',
    })
  }

  update() {}

  onStart() {
    this.scene.start('scene01')
  }
}
