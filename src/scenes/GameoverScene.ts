import Phaser from 'phaser'
import Player from '../physics/player'
import PrimaryButton from '../game-objects/buttons/PrimaryButton'

export default class GameoverScene extends Phaser.Scene {
  sky!: Phaser.GameObjects.Image
  score: number = 0

  constructor() {
    super('gameover')
  }

  init(data?: any) {
    this.score = data?.score || 0
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
    this.add.text(screenCenterX, screenCenterY, `Score: ${this.score}`, { fontSize: '32px' }).setOrigin(0.5)

    new PrimaryButton(this, screenCenterX, screenCenterY + 100, 'Restart', () => this.onRestart())
  }

  update() {}

  onRestart() {
    this.scene.start('scene01')
  }
}
