import Phaser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private inputKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private playerVelocity: Phaser.Math.Vector2;
  private isAlive: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.inputKeys = this.scene.input.keyboard.createCursorKeys();
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.playerVelocity = new Phaser.Math.Vector2();
    this.body.setSize(42, 42, false);
    this.body.setOffset(12, 22);
    this.setCollideWorldBounds();

    scene.anims.create({
      key: 'drown',
      frames: scene.anims.generateFrameNames('player', {
        start: 260,
        end: 265,
      }),
      frameRate: 5,
      repeat: 0,
    });

    scene.anims.create({
      key: 'idle',
      frames: [
        scene.anims.generateFrameNames('player')[130],
        scene.anims.generateFrameNames('player')[135],
        scene.anims.generateFrameNames('player')[130],
        scene.anims.generateFrameNames('player')[131],
      ],
      frameRate: 2,
      repeat: -1,
    });

    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNames('player', {
        start: 143,
        end: 151,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.on('animationcomplete', this.animComplete, this);

    this.isAlive = true;
  }

  static preload(scene: Phaser.Scene) {
    scene.load.spritesheet('player', '/assets/images/avatar.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  animComplete(animation: Phaser.Animations.Animation) {
    if (animation.key === 'drown') {
      this.emit('playerdrown');
    }
  }

  dropToWater() {
    if (this.isAlive) {
      console.warn(this.playerVelocity);

      this.setVelocity(0);
      this.flipY = true;
      this.anims.play('drown', false);
      this.isAlive = false;
    }
  }

  update(playerSpeed: number, frame: any) {
    if (this.isAlive) {
      this.movePlayerManager(playerSpeed);
    }
  }

  movePlayerManager(playerSpeed: number) {
    this.playerVelocity.x = 0;
    this.playerVelocity.y = 0;

    if (this.inputKeys.left?.isDown && this.inputKeys.down?.isDown) {
      this.playerVelocity.y = 1;
      this.playerVelocity.x = -1;
    } else if (this.inputKeys.left?.isDown && this.inputKeys.up?.isDown) {
      this.playerVelocity.y = -1;
      this.playerVelocity.x = -1;
    } else if (this.inputKeys.right?.isDown && this.inputKeys.up?.isDown) {
      this.playerVelocity.y = -1;
      this.playerVelocity.x = 1;
    } else if (this.inputKeys.right?.isDown && this.inputKeys.down?.isDown) {
      this.playerVelocity.y = 1;
      this.playerVelocity.x = 1;
    } else if (this.inputKeys.left?.isDown) {
      this.playerVelocity.x = -1;
    } else if (this.inputKeys.right?.isDown) {
      this.playerVelocity.x = 1;
    } else if (this.inputKeys.up?.isDown) {
      this.playerVelocity.y = -1;
    } else if (this.inputKeys.down?.isDown) {
      this.playerVelocity.y = 1;
    }

    this.setVelocity(this.playerVelocity.x, this.playerVelocity.y);
    this.body.velocity.normalize().scale(playerSpeed);

    if (this.playerVelocity.length()) {
      this.anims.play('walk', true);
    } else {
      this.anims.play('idle', true);
    }

    this.checkDirection();
  }

  checkDirection() {
    if (this.playerVelocity.x < 0) {
      this.flipX = true;
    } else if (this.playerVelocity.x > 0) {
      this.flipX = false;
    }
  }
}
