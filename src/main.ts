import Phaser from 'phaser'

import Scene01Scene from './scenes/Scene01Scene'
import GameOverScene from './scenes/GameoverScene'
import StartGameScene from './scenes/StartGameScene'

const padding = 0
const windowsWidth = window.innerWidth - padding
const windowsHeight = window.innerHeight - padding

const maxWidth = 800
const width = windowsWidth > maxWidth ? maxWidth : windowsWidth
const height = windowsHeight

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  pixelArt: true,
  width,
  height,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 800 },
    },
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  keyboard: {
    target: window,
    arrowKeys: true,
    wasdKeys: true,
  },
  input: {
    gamepad: true,
    keyboard: true,
  },
  scene: [StartGameScene, Scene01Scene, GameOverScene],
} as Phaser.Types.Core.GameConfig

if (screen.orientation && screen.orientation.lock) {
  // Tenta bloquear a orientação em landscape-primary
  screen.orientation
    .lock('landscape-primary')
    .then(function () {
      console.log('Orientação bloqueada em landscape-primary')
    })
    .catch(function (error) {
      console.error('Falha ao bloquear a orientação:', error)
    })
} else {
  console.warn('API de bloqueio de orientação não suportada neste navegador')
}

export default new Phaser.Game(config)
