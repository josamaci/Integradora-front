/* eslint-disable @typescript-eslint/no-unused-vars */
import Phaser from 'phaser'
import { EventBus } from '../EventBus';
import { CONFIG } from '../../global.ts';

// let ganador = "";
let horses: Array<Phaser.GameObjects.Image> = []
let teamsColorX: Array<string> = ['red', 'green', 'blue', 'yellow', 'gray'];
// let caballosCountX: number;

export class Caballos extends Phaser.Scene {
  timeInSeconds!: number;
  timeText!: Phaser.GameObjects.Text;
  timer!: Phaser.Time.TimerEvent;

  initialTimer!: Phaser.Time.TimerEvent;
  initialTimeInSeconds!: number;
  initialTimeText!: Phaser.GameObjects.Text;

  emitter!: Phaser.GameObjects.Particles.ParticleEmitter;
  emitterGray!: Phaser.GameObjects.Particles.ParticleEmitter;
  emitterRed!: Phaser.GameObjects.Particles.ParticleEmitter;
  emitterGreen!: Phaser.GameObjects.Particles.ParticleEmitter;
  emitterBlue!: Phaser.GameObjects.Particles.ParticleEmitter;
  emitterYellow!: Phaser.GameObjects.Particles.ParticleEmitter;

  constructor() {
    super("Caballos")
  }

  preload() {
    this.load.setPath('/assets/');
    this.load.image('bg-vacio', 'bg-vacio.svg');
    this.load.image('bg-inicial', 'bg-inicial.svg');
    this.load.image('bg-medio', 'bg-medio.svg');
    this.load.image('bg-lleno', 'bg-lleno.svg');
    this.load.image('horse', 'horse.png');
    this.load.image('horse-red', 'horse-red.png');
    this.load.image('horse-green', 'horse-green.png');
    this.load.image('horse-blue', 'horse-blue.png');
    this.load.image('horse-yellow', 'horse-yellow.png');
    this.load.image('white-smoke', ['white-smoke.png']);

    this.load.image('cheer', ['cheer.svg']);
    this.load.image('cheer-red', ['red-cheer.svg']);
    this.load.image('cheer-green', ['green-cheer.svg']);
    this.load.image('cheer-blue', ['blue-cheer.svg']);
    this.load.image('cheer-yellow', ['yellow-cheer.svg']);

    this.load.audio('race-sound', ['../sounds/race-sound.mp3']);
  }

  create() {
    // this.add.image(CONFIG.x / 2, CONFIG.y / 2, 'bg-vacio').setScale(0.30);

    const raceSound = this.sound.add("race-sound", { loop: true, volume: 0.2 })
    if (!this.sound.locked) {
      // already unlocked so play
      raceSound.play()
    }
    else {
      // wait for 'unlocked' to fire and then play
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        raceSound.play()
      })
    }
    // raceSound.play()
    
    this.setEmitters();
    
    this.createInitialTimer();
    
    EventBus.emit('current-scene-ready', this);
    
    EventBus.emit('init-configs', this);

    horses = []
    this.generateHorses();
  }

  setEmitters = () => {
    this.emitter = this.add.particles(0, 0, 'white-smoke', {
      speed: 26, lifespan: 500, quantity: 1, scale: { start: 0.4, end: 0 }, emitting: false
    })

    this.emitterGray = this.add.particles(0, 0, 'cheer', {
      speed: 26, lifespan: 500, quantity: 1, scale: { start: 0.4, end: 0 }, emitting: false
    })

    this.emitterRed = this.add.particles(0, 0, 'cheer-red', {
      speed: 26, lifespan: 500, quantity: 1, scale: { start: 0.4, end: 0 }, emitting: false
    })

    this.emitterGreen = this.add.particles(0, 0, 'cheer-green', {
      speed: 26, lifespan: 500, quantity: 1, scale: { start: 0.4, end: 0 }, emitting: false
    })

    this.emitterYellow = this.add.particles(0, 0, 'cheer-yellow', {
      speed: 26, lifespan: 500, quantity: 1, scale: { start: 0.4, end: 0 }, emitting: false
    })

    this.emitterBlue = this.add.particles(0, 0, 'cheer-blue', {
      speed: 26, lifespan: 500, quantity: 1, scale: { start: 0.4, end: 0 }, emitting: false
    })
  }

  setBackground = (playerCount: number) => {
    if (playerCount >= 50) {
      this.add.image(CONFIG.x / 2, CONFIG.y / 2, 'bg-lleno').setScale(0.30).setDepth(-100);
      this.textures.remove('bg-vacio')
      this.textures.remove('bg-medio')
      this.textures.remove('bg-inicial')
    } else if (playerCount >= 25) {
      this.add.image(CONFIG.x / 2, CONFIG.y / 2, 'bg-medio').setScale(0.30).setDepth(-100);
      this.textures.remove('bg-vacio')
      this.textures.remove('bg-lleno')
      this.textures.remove('bg-inicial')
    } else if (playerCount >= 1) {
      this.add.image(CONFIG.x / 2, CONFIG.y / 2, 'bg-inicial').setScale(0.30).setDepth(-100);
      this.textures.remove('bg-vacio')
      this.textures.remove('bg-medio')
      this.textures.remove('bg-lleno')
    } else {
      this.add.image(CONFIG.x / 2, CONFIG.y / 2, 'bg-vacio').setScale(0.30).setDepth(-100);
      this.textures.remove('bg-lleno')
      this.textures.remove('bg-medio')
      this.textures.remove('bg-inicial')
    }
  }

  // setCaballosCount = (caballosCount: number) => {
  //   console.log("Cantidad de caballos");
  //   console.log(caballosCount);
  //   caballosCountX = caballosCount;
  // }

  setTeamsColor = (teamsColor: Array<string>) => {
    console.log("Colores en uso");
    console.log(teamsColor);
    teamsColorX = teamsColor;
  }

  createInitialTimer = () => {
    this.initialTimeText = this.add.text(CONFIG.x / 2, CONFIG.y / 2, CONFIG.initialTimeInSeconds + "")
    this.initialTimeText.setFill("#00be44").setFontSize(100).setFontStyle("bold").setOriginFromFrame().setOrigin(0.5, 0.5)


    this.initialTimeInSeconds = CONFIG.initialTimeInSeconds
    this.initialTimer = this.time.addEvent({ loop: true, delay: 1000, callback: this.InitialTimerCallback, callbackScope: this, });

  }

  InitialTimerCallback() {
    this.initialTimeInSeconds--;
    const timeString = this.initialTimeInSeconds.toString();
    this.initialTimeText.text = timeString;

    if (this.initialTimeInSeconds == 0) {
      this.time.removeEvent(this.initialTimer);
      this.initialTimeText.destroy();
      this.createTimer();
      EventBus.emit('start-game');
    }
  }


  createTimer = () => {
    //total time until trigger
    this.timeInSeconds = CONFIG.timer;
    //make a text field
    this.timeText = this.add.text(CONFIG.x / 2, 0, CONFIG.timer + "");
    //turn the text white
    this.timeText.setOriginFromFrame().setOrigin(1, 0)
    this.timeText.setFill("#ffffff").setFontStyle("bold").setStroke("#000000", 7.5).setFontSize(50);
    //set up a loop timer
    this.timer = this.time.addEvent({ loop: true, callback: this.tick, callbackScope: this, delay: 1000 })
  }

  tick() {
    this.timeInSeconds--;
    const timeString = this.timeInSeconds.toString();
    this.timeText.text = timeString;
    if (this.timeInSeconds == 0) {
      this.time.removeEvent(this.timer);
      this.timeText.text = "Game Over";
      this.timeText.setX(CONFIG.x/1.63);
      
      EventBus.emit('end-game');
    }
  }

  update() {
    // this.end();
  }

  changeScene() {
    this.scene.start('EndScene');
  }

  getRandomNumberBetween(x1: number, x2: number): number {
    return Math.random() * (x2 - x1) + x1;
}

  handleHorseMoved(state: { red: number, green: number, blue: number, yellow: number, gray: number }) {
    console.log(state);

    if (horses[0].x < state.gray + CONFIG.HorsesInitialX){
      this.emitterGray.emitParticleAt(this.getRandomNumberBetween(0, CONFIG.x/5), this.getRandomNumberBetween(CONFIG.y/12, CONFIG.y/3));
      this.emitter.emitParticleAt(horses[0].getBottomLeft().x + 8.5, horses[0].getBottomLeft().y - 6.5);
    }
    horses[0].x = state.gray + CONFIG.HorsesInitialX;

    if (horses[1].x < state.red + CONFIG.HorsesInitialX){
      this.emitterRed.emitParticleAt(this.getRandomNumberBetween(CONFIG.x/5, (2*CONFIG.x/5)), this.getRandomNumberBetween(CONFIG.y/12, CONFIG.y/3));
      this.emitter.emitParticleAt(horses[1].getBottomLeft().x + 8.5, horses[1].getBottomLeft().y - 6.5);
    }
    horses[1].x = state.red + CONFIG.HorsesInitialX;

    if (horses[2].x < state.green + CONFIG.HorsesInitialX){
      this.emitterGreen.emitParticleAt(this.getRandomNumberBetween((4*CONFIG.x/5), (CONFIG.x)), this.getRandomNumberBetween(CONFIG.y/12, CONFIG.y/3));
      this.emitter.emitParticleAt(horses[2].getBottomLeft().x + 8.5, horses[2].getBottomLeft().y - 6.5);
    }
    horses[2].x = state.green + CONFIG.HorsesInitialX;

    if (horses[3].x < state.blue + CONFIG.HorsesInitialX){
      this.emitterBlue.emitParticleAt(this.getRandomNumberBetween((2*CONFIG.x/5), (3*CONFIG.x/5)), this.getRandomNumberBetween(CONFIG.y/12, CONFIG.y/3));
      this.emitter.emitParticleAt(horses[3].getBottomLeft().x + 8.5, horses[3].getBottomLeft().y - 6.5);
    }
    horses[3].x = state.blue + CONFIG.HorsesInitialX;

    if (horses[4].x < state.yellow + CONFIG.HorsesInitialX){
      this.emitterYellow.emitParticleAt(this.getRandomNumberBetween((3*CONFIG.x/5), (4*CONFIG.x/5)), this.getRandomNumberBetween(CONFIG.y/12, CONFIG.y/3));
      this.emitter.emitParticleAt(horses[4].getBottomLeft().x + 8.5, horses[4].getBottomLeft().y - 6.5);
    }
    horses[4].x = state.yellow + CONFIG.HorsesInitialX;

  }

  generateHorses() {
    const horse = this.add.image(CONFIG.HorsesInitialX, CONFIG.HorsesInitialY + 0 * CONFIG.HorsesYGap, 'horse').setScale(0.35);
    const horseRed = this.add.image(CONFIG.HorsesInitialX, CONFIG.HorsesInitialY + 1 * CONFIG.HorsesYGap, 'horse-red').setScale(0.35);
    const horseGreen = this.add.image(CONFIG.HorsesInitialX, CONFIG.HorsesInitialY + 2 * CONFIG.HorsesYGap, 'horse-green').setScale(0.35);
    const horseBlue = this.add.image(CONFIG.HorsesInitialX, CONFIG.HorsesInitialY + 3 * CONFIG.HorsesYGap, 'horse-blue').setScale(0.35);
    const horseYellow = this.add.image(CONFIG.HorsesInitialX, CONFIG.HorsesInitialY + 4 * CONFIG.HorsesYGap, 'horse-yellow').setScale(0.35);
    
    const horsesPosition: Array<Phaser.GameObjects.Image> = []
    console.log(teamsColorX);
    if (!teamsColorX.includes("gray")) {
      console.log("destruye color gray");
      horse.destroy();
    }else{
      horsesPosition.push(horse)
    }
    if (!teamsColorX.includes("red")) {
      console.log("destruye color red");
      horseRed.destroy()
    }else{
      horsesPosition.push(horseRed)
    }
    if (!teamsColorX.includes("green")) {
      console.log("destruye color green");
      horseGreen.destroy()
    }else{
      horsesPosition.push(horseGreen)
    }
    if (!teamsColorX.includes("blue")) {
      console.log("destruye color blue");
      horseBlue.destroy()
    }else{
      horsesPosition.push(horseBlue)
    }
    if (!teamsColorX.includes("yellow")) {
      console.log("destruye color yellow");
      horseYellow.destroy()   
    }else{
      horsesPosition.push(horseYellow)
    }

    switch(horsesPosition.length){
      case 1: 
        horsesPosition[0].setY(CONFIG.HorsesInitialY + 2 * CONFIG.HorsesYGap);
        break;
      case 2: 
        horsesPosition[0].setY(CONFIG.HorsesInitialY + 1 * CONFIG.HorsesYGap);
        horsesPosition[1].setY(CONFIG.HorsesInitialY + 3 * CONFIG.HorsesYGap);
        break;
      case 3: 
        horsesPosition[0].setY(CONFIG.HorsesInitialY + 0 * CONFIG.HorsesYGap);
        horsesPosition[1].setY(CONFIG.HorsesInitialY + 2 * CONFIG.HorsesYGap);
        horsesPosition[2].setY(CONFIG.HorsesInitialY + 4 * CONFIG.HorsesYGap);
        break;
      case 4: 
        horsesPosition[0].setY(CONFIG.HorsesInitialY + 1 * CONFIG.HorsesYGap);
        horsesPosition[1].setY(CONFIG.HorsesInitialY + 2 * CONFIG.HorsesYGap);
        horsesPosition[2].setY(CONFIG.HorsesInitialY + 3 * CONFIG.HorsesYGap);
        horsesPosition[3].setY(CONFIG.HorsesInitialY + 4 * CONFIG.HorsesYGap);
        break;
    }

    horses.push(horse);
    horses.push(horseRed);
    horses.push(horseGreen);
    horses.push(horseBlue);
    horses.push(horseYellow);
  }

  // end() {
  //   for (let i = 0; i < horses.length; i++) {
  //     if (horses[i].x >= (CONFIG.x - CONFIG.HorsesInitialX)) {
  //       ganador = "¡EL CABALLO " + (i === 0 ? 'ROSA' : i === 1 ? "ROJO" : i === 2 ? "VERDE" : i === 3 ? "AZUL" : i === 4 ? "AMARILLO" : "") + " HA GANADO!";
  //       // EventBus.emit('end-game');
  //     }
  //   }
  // }
}

export class End extends Phaser.Scene {
  constructor() {
    super("EndScene")
  }

  preload() {
    this.load.image('fin', '/assets/bg-vacio.webp');
  }

  create() {
    // this.add.image(CONFIG.x / 2, CONFIG.y / 2, 'fin').setScale(0.30).setDepth(-100);
    // this.add.text(CONFIG.x / 5, CONFIG.y / 2, ganador, { fontFamily: 'Fantasy', fontSize: 50, color: '#565656' });
    //this.input.on('pointerdown', () => this.playAgain())

    EventBus.emit('current-scene-ready', this);
  }

  /*playAgain() {
    this.scene.start("Caballos");
  }*/
}