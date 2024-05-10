import Phaser from 'phaser'
import { EventBus } from '../EventBus';

let ganador = "";
let horses: { x: number; }[] = []
export class Caballos extends Phaser.Scene {
  constructor() {
    super("Caballos")
  }

  preload() {
    this.load.image('sky', '../../../public/assets/bg-caballo.webp');
    this.load.image('horse', '../../../public/assets/horse.png');
    this.load.image('horse-red', '../../../public/assets/horse-red.png');
    this.load.image('horse-green', '../../../public/assets/horse-green.png');
    this.load.image('horse-blue', '../../../public/assets/horse-blue.png');
    this.load.image('horse-yellow', '../../../public/assets/horse-yellow.png');
  }

  create() {
    this.add.image(400, 300, 'sky');
    horses = []
    this.generateHorses();

    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.end();
  }

  changeScene() {
    this.scene.start('EndScene');
  }

  handleHorseMoved(state: { red: number, green: number, blue: number, yellow: number, gray: number }) {
    horses[0].x = state.gray + 50
    horses[1].x = state.red + 50
    horses[2].x = state.green + 50
    horses[3].x = state.blue + 50
    horses[4].x = state.yellow + 50
  }

  generateHorses() {
    const horse = this.add.image(50, 150 + 0 * 75, 'horse').setScale(0.15);
    const horseRed = this.add.image(50, 150 + 1 * 75, 'horse-red').setScale(0.35);
    const horseGreen = this.add.image(50, 150 + 2 * 75, 'horse-green').setScale(0.35);
    const horseBlue = this.add.image(50, 150 + 3 * 75, 'horse-blue').setScale(0.35);
    const horseYellow = this.add.image(50, 150 + 4 * 75, 'horse-yellow').setScale(0.35);
    horses.push(horse);
    horses.push(horseRed);
    horses.push(horseGreen);
    horses.push(horseBlue);
    horses.push(horseYellow);
  }

  end() {
    for (let i = 0; i < horses.length; i++) {
      if (horses[i].x >= 750) {
        ganador = "¡EL CABALLO " + (i + 1) + " HA GANADO!";
        this.scene.start("EndScene");
      }
    }
  }
}

export class End extends Phaser.Scene {
  constructor() {
    super("EndScene")
  }

  preload() {
    this.load.image('fin', '../../../public/assets/bg-caballo.webp');
  }

  create() {
    this.add.image(400, 300, 'fin');
    this.add.text(115, 250, ganador, { fontFamily: 'Fantasy', fontSize: 60, color: '#565656' });
    this.input.on('pointerdown', () => this.playAgain())

    EventBus.emit('current-scene-ready', this);
  }

  playAgain() {
    this.scene.start("Caballos");
  }
}