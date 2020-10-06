import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private inputKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');
    this.scale = 0.4;
    this.inputKeys = this.scene.input.keyboard.createCursorKeys();
    scene.add.existing(this);
    scene.physics.add.existing(this);

    scene.anims.create({
      key: 'idle',
      frames: [
        this.scene.anims.generateFrameNames('player')[10],
        this.scene.anims.generateFrameNames('player')[11],
        this.scene.anims.generateFrameNames('player')[12],
      ],
      frameRate: 3,
      repeat: -1,
    });

    scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNames('player'),
      frameRate: 15,
      repeat: -1,
    });
  }

  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet('player', '/assets/images/player.png', {
      frameWidth: 84,
      frameHeight: 119,
    });
  }

  update(playerSpeed: number) {
    this.movePlayerManager(playerSpeed);
  }

  movePlayerManager(playerSpeed: number) {
    const playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left?.isDown && this.inputKeys.down?.isDown) {
      playerVelocity.y = 1;
      playerVelocity.x = -1;
    } else if (this.inputKeys.left?.isDown && this.inputKeys.up?.isDown) {
      playerVelocity.y = -1;
      playerVelocity.x = -1;
    } else if (this.inputKeys.right?.isDown && this.inputKeys.up?.isDown) {
      playerVelocity.y = -1;
      playerVelocity.x = 1;
    } else if (this.inputKeys.right?.isDown && this.inputKeys.down?.isDown) {
      playerVelocity.y = 1;
      playerVelocity.x = 1;
    } else if (this.inputKeys.left?.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right?.isDown) {
      playerVelocity.x = 1;
    } else if (this.inputKeys.up?.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down?.isDown) {
      playerVelocity.y = 1;
    }

    this.setVelocity(playerVelocity.x, playerVelocity.y);
    this.body.velocity.normalize().scale(playerSpeed);

    if (playerVelocity.length()) {
      this.anims.play('walk', true);
    } else {
      this.anims.play('idle', true);
    }

    if (playerVelocity.x < 0) {
      this.flipX = true;
    } else if (playerVelocity.x > 0) {
      this.flipX = false;
    }
  }
}
