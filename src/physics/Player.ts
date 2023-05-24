import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  keyW!: Phaser.Input.Keyboard.Key | undefined
  keyA!: Phaser.Input.Keyboard.Key | undefined
  keyS!: Phaser.Input.Keyboard.Key | undefined
  keyD!: Phaser.Input.Keyboard.Key | undefined
  keySpace!: Phaser.Input.Keyboard.Key | undefined
  jumping = false

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'idle_opened_eyes')

    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    this.initCursorKeys()
    this.initAnimations()

    this.setScale(0.5).setCollideWorldBounds(true).setBounce(0.2)
  }

  public static preload(scene: Phaser.Scene) {
    scene.load.image('idle_opened_eyes', 'assets/player/idle_opened_eyes.png')
    scene.load.image('idle_closed_eyes', 'assets/player/idle_closed_eyes.png')
    scene.load.image('walking_opened_eyes', 'assets/player/walking_opened_eyes.png')
    scene.load.image('walking_closed_eyes', 'assets/player/walking_closed_eyes.png')
  }

  update() {
    const speed = 300
    this.jumping = !this.body?.touching.down

    if (this.cursors?.left?.isDown || this.keyA?.isDown) {
      this.flipX = true
      this.setVelocityX(-speed)
      this.anims.play('walk', true)
    } else if (this.cursors?.right?.isDown || this.keyD?.isDown) {
      this.flipX = false
      this.setVelocityX(speed)
      this.anims.play('walk', true)
    } else {
      this.setVelocityX(0)
    }

    if ((this.cursors?.up?.isDown || this.keyW?.isDown || this.keySpace?.isDown) && !this.jumping) {
      this.setVelocityY(-speed)
    } else if (this.cursors?.down?.isDown || this.keyS?.isDown) {
      this.setVelocityY(speed)
    }

    if (this.body?.velocity.x === 0) {
      this.anims.play('idle', true)
    }
  }

  private initCursorKeys() {
    this.cursors = this.scene.input.keyboard?.createCursorKeys()
    this.keyW = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyA = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyS = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyD = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keySpace = this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
  }

  private initAnimations() {
    this.scene.anims.create({
      key: 'idle',
      frames: [{ key: 'idle_opened_eyes' }, { key: 'idle_closed_eyes' }],
      frameRate: 3,
      repeat: -1,
    })

    this.scene.anims.create({
      key: 'walk',
      frames: [{ key: 'walking_opened_eyes' }, { key: 'walking_closed_eyes' }],
      frameRate: 3,
      repeat: -1,
    })
  }
}
