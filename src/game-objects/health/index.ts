import Phaser from 'phaser'

export default class Health {
  protected hearts: Phaser.GameObjects.Image[] = []

  constructor(protected scene: Phaser.Scene, protected x: number, protected y: number, protected quantity: number) {
    this.init()
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image('health_on', 'assets/health/on.png')
    scene.load.image('health_off', 'assets/health/off.png')
  }

  destroy() {
    this.hearts.forEach((heart) => heart.destroy())
  }

  increase() {
    this.quantity++
    this.drawNew()
  }

  decrease() {
    this.quantity--
    const lastHeart = this.hearts.pop()
    lastHeart?.destroy()
  }

  recovery() {
    const heartWithoutLife = this.hearts.findLast((heart) => heart.texture.key === 'health_off')

    if (heartWithoutLife) {
      heartWithoutLife.setTexture('health_on')
    }
  }

  damage() {
    const heartWithLife = this.hearts.find((heart) => heart.texture.key === 'health_on')

    if (heartWithLife) {
      heartWithLife.setTexture('health_off')
    }

    this.emitGameoverWhenHealthIsEmpty()
  }

  private init() {
    for (let i = 0; i < this.quantity; i++) {
      this.drawNew()
    }
  }

  private drawNew() {
    const index = this.hearts.length

    const x = this.x - index * 30 - 30
    const y = this.y + 15

    this.hearts.push(this.scene.add.image(x, y, 'health_on').setScale(0.4))
  }

  private emitGameoverWhenHealthIsEmpty() {
    const quantityHasLife = this.hearts.filter((heart) => heart.texture.key === 'health_on').length

    if (quantityHasLife === 0) {
      this.scene.events.emit('gameover')
    }
  }
}
