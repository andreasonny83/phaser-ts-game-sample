import Phaser from 'phaser';
import { Loading } from './Scenes/Loading';
import { GamePlay } from './Scenes/GamePlay';
import { config } from './config';

new Phaser.Game({
  ...config,
  scene: [Loading, GamePlay],
});
