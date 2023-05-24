import Phaser from 'phaser'

import Scene01Scene from './scenes/Scene01Scene'
import GameOverScene from './scenes/GameoverScene'
import StartGameScene from './scenes/StartGameScene'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 800 },
    },
  },
  scene: [Scene01Scene, StartGameScene, GameOverScene],
  pixelArt: true,
} as Phaser.Types.Core.GameConfig

export default new Phaser.Game(config)
