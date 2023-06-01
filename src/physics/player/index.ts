import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  protected keySpace!: Phaser.Input.Keyboard.Key | undefined
  protected arrowKeys!: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  protected wasdKeys!: { [key: string]: Phaser.Input.Keyboard.Key } | undefined
  protected joystick!: Phaser.Input.Gamepad.Gamepad | undefined
  protected jumping = false
  protected speed = 300
  protected jumpSpeed = this.speed + 100
  protected gamma: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player')
    this.create()
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('player', 'assets/player/idle_opened_eyes.png')
    scene.load.image('idle_closed_eyes', 'assets/player/idle_closed_eyes.png')
    scene.load.image('walking_opened_eyes', 'assets/player/walking_opened_eyes.png')
    scene.load.image('walking_closed_eyes', 'assets/player/walking_closed_eyes.png')
  }

  create() {
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.initCursor()
    this.initGyroscope()
    this.initAnimations()

    this.setScale(0.5).setCollideWorldBounds(true).setBounce(0.2)
    // define o tamanho do corpo do player
    // para ignorar a parte de cima da imagem que é transparente
    this.body?.setSize(this.width - 100, this.height - 100).setOffset(50, 100)
    this.setDepth(3)
  }

  update() {
    this.initGamePad()
    this.jumping = !this.body?.touching.down

    if (this.leftPressed) {
      this.moveLeft(this.speed)
    } else if (this.rightPressed) {
      this.moveRight(this.speed)
    } else {
      this.setVelocityX(0)
    }

    if (this.upPressed && !this.jumping && !this.downPressed) {
      this.jump(this.jumpSpeed)
    } else if (this.downPressed && !this.upPressed) {
      this.down(this.jumpSpeed)
    }

    if (this.body?.velocity.x === 0) {
      this.anims.play('idle', true)
    }
    console.log('player', { x: this.x, y: this.y })

    this.updateHitbox()
  }

  destroy() {
    super.destroy()
    window.removeEventListener('deviceorientation', this.onDeviceorientation)
  }

  damage() {
    this.setTint(0xff0000)
    setTimeout(() => {
      this.clearTint()
    }, 200)
  }

  private initCursor() {
    this.keySpace = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.arrowKeys = this.scene.input.keyboard?.createCursorKeys()
    this.wasdKeys = this.scene.input.keyboard?.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
    }) as { [key: string]: Phaser.Input.Keyboard.Key }

    this.initGamePad()
  }

  private initGamePad() {
    if (!this.joystick) {
      this.joystick = this.scene.input.gamepad?.pad1
    }
  }

  private initGyroscope() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.onDeviceorientation)
    }
  }

  private initAnimations() {
    if (!this.scene.anims.get('idle')) {
      this.scene.anims.create({
        key: 'idle',
        frames: [{ key: 'player' }, { key: 'idle_closed_eyes' }],
        frameRate: 3,
        repeat: -1,
      })
    }

    if (!this.scene.anims.get('walk')) {
      this.scene.anims.create({
        key: 'walk',
        frames: [{ key: 'walking_opened_eyes' }, { key: 'walking_closed_eyes' }],
        frameRate: 3,
        repeat: -1,
      })
    }
  }

  private updateHitbox() {
    switch (this.anims.currentAnim?.key) {
      case 'idle':
        this.body?.setSize(this.width - 100, this.height - 100).setOffset(50, 100)
        break
      case 'walk':
        this.body?.setSize(this.width - 150, this.height - 100).setOffset(75, 100)
        break
    }
  }

  onDeviceorientation = (event: DeviceOrientationEvent) => this.handleGyroscope(event?.gamma || 0)

  private handleGyroscope(angle: number) {
    this.gamma = angle
  }

  private get leftPressed(): boolean {
    const leftJoystick = this.joystick?.leftStick.x && this.joystick.leftStick.x < -0.5
    const gammaLeft = this.gamma < -10

    return (
      this.arrowKeys?.left?.isDown ||
      this.wasdKeys?.A?.isDown ||
      (this.joystick && this.joystick.left) ||
      leftJoystick ||
      gammaLeft ||
      false
    )
  }

  private get rightPressed(): boolean {
    const leftJoystick = this.joystick?.leftStick.x && this.joystick.leftStick.x > 0.5
    const gammaRight = this.gamma > 10

    return (
      this.arrowKeys?.right?.isDown ||
      this.wasdKeys?.D?.isDown ||
      (this.joystick && this.joystick.right) ||
      leftJoystick ||
      gammaRight ||
      false
    )
  }

  private get upPressed(): boolean {
    const leftJoystick = this.joystick?.leftStick.y && this.joystick.leftStick.y < -0.7
    return (
      this.keySpace?.isDown ||
      this.arrowKeys?.up?.isDown ||
      this.wasdKeys?.W?.isDown ||
      this.joystick?.up ||
      this.joystick?.A ||
      leftJoystick ||
      this.scene.input.activePointer.isDown ||
      false
    )
  }

  private get downPressed(): boolean {
    const leftJoystick = this.joystick?.leftStick.y && this.joystick.leftStick.y > 0.7
    return this.arrowKeys?.down?.isDown || this.wasdKeys?.S?.isDown || this.joystick?.down || leftJoystick || false
  }

  private moveLeft(speed: number) {
    this.flipX = true
    this.setVelocityX(-speed)
    this.anims.play('walk', true)
  }

  private moveRight(speed: number) {
    this.flipX = false
    this.setVelocityX(speed)
    this.anims.play('walk', true)
  }

  private jump(speed: number) {
    this.setVelocityY(-speed)
  }

  private down(speed: number) {
    this.setVelocityY(speed)
  }
}
