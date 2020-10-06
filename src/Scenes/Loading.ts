import Phaser from 'phaser';
import { Player } from '../Player/Player';

export class Loading extends Phaser.Scene {
  constructor() {
    super('loading');
  }

  preload() {
    this.cameras.main.setBackgroundColor(0x2a0503);
    const fullBar = this.add.graphics();
    const progress = this.add.graphics();
    const camera = this.cameras.main;

    fullBar.fillStyle(0xda7a34, 1);
    fullBar.fillRect(camera.width / 4 - 2, camera.height / 2 - 18, camera.width / 2 + 4, 20);

    this.load.on(
      'progress',
      function (value: any) {
        progress.clear();
        progress.fillStyle(0xfff6d3, 1);
        progress.fillRect(camera.width / 4, camera.height / 2 - 16, (camera.width / 2) * value, 16);
      },
      this
    );

    this.load.on(
      'complete',
      function () {
        setTimeout(() => {
          progress.destroy();
          fullBar.destroy();
        }, 2000);
      },
      this
    );

    this.load.image('world', '/assets/images/IceTileset.png');
    this.load.tilemapTiledJSON('map', '/assets/images/map.json');
    Player.preload(this);
  }

  create() {
    setTimeout(() => {
      this.scene.start('playGame');
    }, 1000);
  }
}
