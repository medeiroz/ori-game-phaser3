import Phaser from 'phaser'

import Scene01 from './scenes/Scene01'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 800 },
    },
  },
  scene: [Scene01],
  pixelArt: true,
} as Phaser.Types.Core.GameConfig

export default new Phaser.Game(config)
