import { Caballos, End } from './scene/Caballos';
import Phaser from 'phaser';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  scene: [
    Caballos, End
  ]
};

/**
 * 
 * @param parent ID del componente HTML padre el cual renderiza el juego
 * @returns El objeto del juego Phaser.Game
 */
const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent });
}

export default StartGame;