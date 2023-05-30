import Phaser from 'phaser'
import Player from '../physics/player'
import PrimaryButton from '../game-objects/buttons/PrimaryButton'
import { findMappingById } from '../config/gamepad'

export default class GameoverScene extends Phaser.Scene {
  protected sky!: Phaser.GameObjects.Image
  protected score: number = 0
  protected joystick!: Phaser.Input.Gamepad.Gamepad | undefined
  protected buttonStart!: Phaser.Input.Gamepad.Button | undefined

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

  update() {
    this.initGamePad()

    if (this.joystick?.A || this.buttonStart?.pressed || this.input.keyboard?.addKey('SPACE').isDown) {
      this.onRestart()
    }
  }

  private initGamePad() {
    if (!this.joystick && this.input.gamepad?.pad1) {
      this.joystick = this.input.gamepad.pad1
      const index = findMappingById(this.joystick.id).gamepadMapping.START
      this.buttonStart = this.joystick?.buttons[index]
    }
  }

  private onRestart() {
    this.scene.start('scene01')
  }
}
