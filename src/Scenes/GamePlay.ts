import Phaser from 'phaser';
import { Player } from '../Player/Player';

export class GamePlay extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite | undefined;
  private static PLAYER_SPEED = 200;

  constructor() {
    super('playGame');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileSet = map.addTilesetImage('tiles', 'world', 32, 32);
    const belowLayer = map.createStaticLayer('Below Player', tileSet, 0, 0);
    const worldLayer = map.createStaticLayer('World', tileSet, 0, 0);
    const aboveLayer = map.createStaticLayer('Above Player', tileSet, 0, 0);
    const spawnPoint: any = map.findObject('Objects', (obj) => obj.name === 'Spawn Point');
    const camera = this.cameras.main;

    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;
    this.player = new Player(this, spawnPoint.x, spawnPoint.y);

    camera.zoom = 1.5;
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.startFollow(this.player);
    worldLayer.setCollisionByProperty({ collides: true });
    this.player.setCollideWorldBounds();
    this.physics.add.collider(this.player, worldLayer);

    aboveLayer.setDepth(10);
    this.startDebug(worldLayer);
  }

  update() {
    this.player?.update(GamePlay.PLAYER_SPEED);
  }

  startDebug(layer: Phaser.Tilemaps.StaticTilemapLayer) {
    const debugGraphics = this.add.graphics().setAlpha(0.5);
    layer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
  }
}
