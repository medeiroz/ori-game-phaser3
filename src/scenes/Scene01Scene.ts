import Phaser from 'phaser'
import Player from '../physics/player/index'
import SunGroup from '../physics/sun/SunGroups'
import Score from '../game-objects/score/index'
import MeteorGroup from '../physics/meteor/MeteorGroups'
import Health from '../game-objects/health'

export default class Scene01 extends Phaser.Scene {
  sky!: Phaser.GameObjects.Image
  platforms!: Phaser.Physics.Arcade.StaticGroup
  player!: Player
  sunGroup!: SunGroup
  meteorGroup!: MeteorGroup
  score!: Score
  health!: Health

  constructor() {
    super('scene01')
  }

  preload() {
    this.load.image('sky', 'assets/background/sky.png')
    this.load.image('ground', 'assets/background/ground.png')
    Player.preload(this)
    SunGroup.preload(this)
    MeteorGroup.preload(this)
    Health.preload(this)
  }

  create() {
    this.sys.events.once('shutdown', () => this.destroy())
    this.events.once('gameover', () => this.onGameOver())

    this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0)
    this.sky.displayWidth = this.cameras.main.width
    this.sky.displayHeight = this.cameras.main.height

    this.score = new Score(this, 10, 10, 0)
    this.health = new Health(this, this.cameras.main.width, 10, 3)
    this.player = new Player(this, 100, 400)
    this.sunGroup = new SunGroup(this)
    this.meteorGroup = new MeteorGroup(this)

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 568, 'ground').setDepth(1).refreshBody()

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.overlap(this.player, this.sunGroup, (player: any, sun: any) =>
      this.onOverlapPlayerSun(player, sun),
    )
    this.physics.add.overlap(this.player, this.meteorGroup, (player: any, meteor: any) =>
      this.onOverlapPlayerMeteor(player, meteor),
    )

    this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height)
  }

  update() {
    this.player.update()
    this.sunGroup.update()
    this.meteorGroup.update()
  }

  destroy() {}

  onOverlapPlayerSun(player: any, sun: any) {
    sun.destroy()
    this.score.increase()
    this.health.recovery()
  }

  onOverlapPlayerMeteor(player: any, meteor: any) {
    meteor.destroy()
    this.health.damage()
    player.damage()
  }

  onGameOver() {
    this.scene.start('gameover', { score: this.score.get() })
  }
}
