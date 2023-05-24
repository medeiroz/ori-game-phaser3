import Phaser from 'phaser'

export default class PrimaryButton extends Phaser.GameObjects.Text {
  static readonly PURPLE = '#A800B5'
  static readonly PURPLE_OVER = '#82007F'

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    protected onClickCallback: Function,
    style: Phaser.Types.GameObjects.Text.TextStyle = {},
  ) {
    super(scene, x, y, text, style)
    this.scene.add.existing(this)
    this.setInteractive({ useHandCursor: true })
      .setOrigin(0.5)
      .setPadding({
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      })
      .setShadow(2, 2, '#333333', 2, true, true)

      .setStyle({ backgroundColor: PrimaryButton.PURPLE })
      .on('pointerup', this.onPointerClick)
      .on('pointerover', this.onPointerOver)
      .on('pointerout', this.onPointerOut)
  }

  onPointerClick() {
    this.onClickCallback()
  }

  onPointerOver() {
    this.setStyle({ backgroundColor: PrimaryButton.PURPLE_OVER })
  }

  onPointerOut() {
    this.setStyle({ backgroundColor: PrimaryButton.PURPLE })
  }
}
