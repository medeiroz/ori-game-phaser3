import Phaser from 'phaser'

export default class Scene01 extends Phaser.Scene {
  sky!: Phaser.GameObjects.Image
  player!: Phaser.Physics.Arcade.Sprite
  platforms!: Phaser.Physics.Arcade.StaticGroup
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  keyW!: Phaser.Input.Keyboard.Key | undefined
  keyA!: Phaser.Input.Keyboard.Key | undefined
  keyS!: Phaser.Input.Keyboard.Key | undefined
  keyD!: Phaser.Input.Keyboard.Key | undefined
  keySpace!: Phaser.Input.Keyboard.Key | undefined
  jumping = false

  constructor() {
    super('scene01')
  }

  preload() {
    this.load.image('sky', 'assets/background/sky.png')
    this.load.image('ground', 'assets/background/ground.png')
    this.load.spritesheet('player', 'assets/player/idle.png', { frameWidth: 256, frameHeight: 256 })
  }

  create() {
    this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.sky.displayWidth = this.cameras.main.width
    this.sky.displayHeight = this.cameras.main.height

    this.player = this.physics.add.sprite(100, 400, 'player').setScale(0.5).setCollideWorldBounds(true)

    this.cursors = this.input.keyboard?.createCursorKeys()
    this.keyW = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keyA = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.keyS = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.keyD = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.keySpace = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 568, 'ground').refreshBody()

    this.physics.add.collider(this.player, this.platforms)

    this.physics.world.setBounds(-50, 0, this.cameras.main.width + 100, this.cameras.main.height)

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    })
  }

  update() {
    const speed = 220
    this.jumping = !this.player.body?.touching.down

    if (this.cursors?.left?.isDown || this.keyA?.isDown) {
      this.player.setVelocityX(-speed)
      this.player.anims.play('walk', true)
    } else if (this.cursors?.right?.isDown || this.keyD?.isDown) {
      this.player.setVelocityX(speed)
      this.player.anims.play('walk', true)
    } else {
      this.player.setVelocityX(0)
    }

    if ((this.cursors?.up?.isDown || this.keyW?.isDown || this.keySpace?.isDown) && !this.jumping) {
      this.player.setVelocityY(-speed)
    } else if (this.cursors?.down?.isDown || this.keyS?.isDown) {
      this.player.setVelocityY(speed)
    }
  }
}
