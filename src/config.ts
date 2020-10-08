import Phaser from 'phaser';

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  fps: {
    smoothStep: true,
    min: 20,
    target: 20,
  },
  render: {
    pixelArt: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {},
    },
  },
  parent: 'root',
  backgroundColor: '#111',
};
