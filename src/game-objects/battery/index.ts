import Phaser from 'phaser'

const TEXTURE_ON = 'battery_on'
const TEXTURE_OFF = 'battery_off'

export default class Battery {
  batteries: Phaser.GameObjects.Image[] = []

  constructor(protected scene: Phaser.Scene, protected x: number, protected y: number, protected quantity: number) {
    this.create()
  }

  static preload(scene: Phaser.Scene) {
    scene.load.image(TEXTURE_ON, 'assets/battery/on.png')
    scene.load.image(TEXTURE_OFF, 'assets/battery/off.png')
  }

  destroy() {
    this.batteries.forEach((item) => item.destroy())
  }

  increase() {
    this.quantity++
    this.drawNew()
  }

  decrease() {
    this.quantity--
    const lastItem = this.batteries.pop()
    lastItem?.destroy()
  }

  charge() {
    const itemOff = this.batteries.findLast((item) => item.texture.key === TEXTURE_OFF)

    if (itemOff) {
      itemOff.setTexture(TEXTURE_ON)
    }
  }

  discharge() {
    const itemOn = this.batteries.find((item) => item.texture.key === TEXTURE_ON)

    if (itemOn) {
      itemOn.setTexture(TEXTURE_OFF)
    }

    this.emitGameoverWhenLowBattery()
  }

  private create() {
    for (let i = 0; i < this.quantity; i++) {
      this.drawNew()
    }
  }

  private drawNew() {
    const index = this.batteries.length

    const x = this.x - index * 30 - 30
    const y = this.y + 15

    this.batteries.push(this.scene.add.image(x, y, TEXTURE_ON).setScale(0.4))
  }

  private emitGameoverWhenLowBattery() {
    const quantityOn = this.batteries.filter((item) => item.texture.key === TEXTURE_ON).length

    if (quantityOn === 0) {
      this.scene.events.emit('gameover')
    }
  }
}
