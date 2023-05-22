import Phaser from 'phaser'

export default class Scene01 extends Phaser.Scene {
  sky!: Phaser.GameObjects.Image
  player!: Phaser.Physics.Arcade.Sprite
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined

  constructor() {
    super('scene01')
  }

  preload() {
    this.load.image('sky', 'assets/sky.jpg')
    this.loadAnimationFrames('idle', 'Idle', 1, 10)
  }

  create() {
    this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.sky.displayWidth = this.cameras.main.width
    this.sky.displayHeight = this.cameras.main.height

    this.cursors = this.input.keyboard?.createCursorKeys()
    this.player = this.physics.add.sprite(100, 100, 'player').setScale(0.1)

    this.anims.create({
      key: 'playerIdle',
      frames: this.anims.generateFrameNames('idle', {
        prefix: 'Idle (',
        suffix: ').png',
        start: 1,
        end: 10,
        zeroPad: 1,
      }),
      frameRate: 10,
      repeat: -1,
    })

    this.player.anims.play('playerIdle')
  }

  update() {
    const speed = 200

    if (this.cursors?.left.isDown) {
      this.player.setVelocityX(-speed)
    } else if (this.cursors?.right.isDown) {
      this.player.setVelocityX(speed)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursors?.up.isDown) {
      this.player.setVelocityY(-speed)
    } else if (this.cursors?.down.isDown) {
      this.player.setVelocityY(speed)
    } else {
      this.player.setVelocityY(0)
    }
  }

  loadAnimationFrames(key: string, frameName: string, startFrame: number, endFrame: number) {
    const path = 'assets/player/'

    const frames: any[] = []

    for (let i = startFrame; i <= endFrame; i++) {
      frames.push({ key: key, frame: `${frameName} (${i}).png` })
    }

    this.load.image(key, path + `${frameName} (1).png`)

    this.load.on('complete', () => {
      this.player = this.physics.add.sprite(100, 100, key).setScale(0.1)
      this.player.anims.play('playerIdle')
      console.log(`All animation frames for '${key}' loaded.`)
    })

    this.textures.once('addtexture', () => {
      this.anims.create({
        key: 'playerIdle',
        frames: this.anims.generateFrameNames(key, { frames }),
        frameRate: 10,
        repeat: -1,
      })
    })
  }
}
