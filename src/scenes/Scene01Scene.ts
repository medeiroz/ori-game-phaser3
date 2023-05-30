import Phaser from 'phaser'
import Player from '../physics/player/index'
import SunGroup from '../physics/sun/SunGroups'
import Score from '../game-objects/score/index'
import MeteorGroup from '../physics/meteor/MeteorGroups'
import Health from '../game-objects/health'
import Background from '../game-objects/background'
import Battery from '../game-objects/battery'

export default class Scene01 extends Phaser.Scene {
  protected player!: Player
  protected sunGroup!: SunGroup
  protected meteorGroup!: MeteorGroup
  protected score!: Score
  protected health!: Health
  protected battery!: Battery
  protected background!: Background

  constructor() {
    super('scene01')
  }

  preload() {
    Background.preload(this)
    Player.preload(this)
    SunGroup.preload(this)
    MeteorGroup.preload(this)
    Health.preload(this)
    Battery.preload(this)
  }

  create() {
    this.sys.events.once('shutdown', () => this.destroy())
    this.events.once('gameover', () => this.onGameOver())
    this.events.on('sun-missed', () => this.onSunMissed())

    this.background = new Background(this)
    this.sunGroup = new SunGroup(this)
    this.meteorGroup = new MeteorGroup(this)
    this.score = new Score(this, 10, 10, 0)
    this.health = new Health(this, this.cameras.main.width, 10, 3)
    this.battery = new Battery(this, this.cameras.main.width, 40, 3)
    this.player = new Player(this, 100, 100)

    this.physics.add.collider(this.player, this.background.platforms)
    this.physics.add.overlap(this.player, this.sunGroup, (player: any, sun: any) =>
      this.onOverlapPlayerSun(player, sun),
    )
    this.physics.add.overlap(this.player, this.meteorGroup, (player: any, meteor: any) =>
      this.onOverlapPlayerMeteor(player, meteor),
    )

    this.physics.world.setBounds(0, 0, this.cameras.main.width, this.cameras.main.height)
  }

  update() {
    this.background.update()
    this.player.update()
    this.sunGroup.update()
    this.meteorGroup.update()
  }

  destroy() {
    this.events.off('sun-missed')
  }

  onOverlapPlayerSun(player: any, sun: any) {
    console.log('player', player)
    sun.destroy()
    this.score.increase()
    this.battery.charge()
  }

  onOverlapPlayerMeteor(player: any, meteor: any) {
    meteor.destroy()
    this.health.damage()
    player.damage()
  }

  onGameOver() {
    this.scene.start('gameover', { score: this.score.get() })
  }

  onSunMissed() {
    this.battery.discharge()
  }
}
