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
      gravity: { y: 600 },
    },
  },
  scene: [Scene01],
}

export default new Phaser.Game(config)
