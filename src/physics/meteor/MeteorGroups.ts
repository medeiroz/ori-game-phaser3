import Phaser from 'phaser'
import Meteor from './Meteor'

export default class MeteorGroup extends Phaser.Physics.Arcade.Group {
  protected limitChildren: number = 20
  protected childrenQuantity: number = 1
  protected spawnIntervalInitial: number = 2750
  protected spawnInterval: number = this.spawnIntervalInitial
  protected spawnLastTime: number = 0
  protected minSpeed: number = 85
  protected maxSpeed: number = 185
  protected limitSpeed: number = 500

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
    this.scene.events.on('score-changed', (score: number) => this.onScoreChanged(score))
  }

  static preload(scene: Phaser.Scene) {
    Meteor.preload(scene)
  }

  update() {
    if (
      this.getChildren().length < this.childrenQuantity &&
      this.scene.time.now > this.spawnLastTime + this.spawnInterval
    ) {
      this.spawn()
    }
    // @ts-ignore: Unreachable code error
    this.children.each((child: Meteor) => {
      child.update()
      if (child.y > this.scene.cameras.main.height) {
        this.killAndHide(child)
        child.destroy()
      }
    })
  }

  destroy(destroyChildren?: boolean | undefined, removeFromScene?: boolean | undefined): void {
    super.destroy(destroyChildren, removeFromScene)
    this.scene.events.off('score-changed')
  }

  spawn() {
    const y = 0
    const x = this.getXposition()

    this.add(new Meteor(this.scene, x, y, Phaser.Math.Between(this.minSpeed, this.maxSpeed)))
    this.spawnLastTime = this.scene.time.now
  }

  getXposition(): number {
    const lastChild = this.getChildren()[this.getChildren().length - 1]

    // @ts-ignore: Unreachable code error
    const lastChildX = lastChild ? lastChild.x : 0

    const x = Phaser.Math.Between(0, this.scene.cameras.main.width)
    const diff = Math.abs(lastChildX - x)

    if (diff < 180) {
      return this.getXposition()
    }
    return x
  }

  private onScoreChanged(score: number) {
    this.updateChildrenQuantity(score)
    this.updateSpawnInterval(score)
    this.updateSpeed(score)
  }

  private updateChildrenQuantity(score: number) {
    const newQuantity = Math.ceil(score / 5)

    this.childrenQuantity = newQuantity < 1 ? 1 : newQuantity
  }

  private updateSpawnInterval(score: number) {
    const newInterval = this.spawnIntervalInitial - score * (30 * this.getMultiplier(score))

    if (newInterval < 500) {
      this.spawnInterval = 500
    } else {
      this.spawnInterval = newInterval
    }
  }

  private updateSpeed(score: number) {
    const newSpeed = this.maxSpeed + 1 * this.getMultiplier(score)
    this.maxSpeed = newSpeed > this.limitSpeed ? this.limitSpeed : newSpeed
  }

  private getMultiplier(score: number): number {
    const maxMultiplier = 10

    let multiplier = score / 10

    multiplier = Math.abs(multiplier - maxMultiplier)
    return multiplier < 1 ? 1 : multiplier
  }
}
