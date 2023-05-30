import Phaser from 'phaser'

export default class Score extends Phaser.GameObjects.Text {
  score: number = 0

  constructor(scene: Phaser.Scene, x: number = 10, y: number = 10, score: number = 0) {
    super(scene, x, y, 'Score: 0', { font: '16px Arial', color: '#ffffff' })
    this.scene.add.existing(this)
    this.set(score)
  }

  increase() {
    this.set(++this.score)
  }

  updateScoreText(score: number) {
    this.setText(`Score: ${score}`)
  }

  set(score: number) {
    this.score = score
    this.updateScoreText(this.score)
    this.scene.events.emit('score-changed', score)
  }

  get() {
    return this.score
  }
}
