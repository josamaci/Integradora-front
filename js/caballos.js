/* dic en memoria 
cada user conectado tiene un id único 
dic - key:id, val:equipo



Túneles de reverse proxy - (servicio )*/

var ganador = "";
var horses = []
class Horses extends Phaser.Scene{

    constructor(){
        super("gameScene")
    }

    preload() {
        this.load.image('sky', 'assets/bg-caballo.webp');
        this.load.image('horse', 'assets/horse.png');
    }

    create() {
        var bg = this.add.image(400, 300, 'sky');
        horses = []
        this.generateHorses();
        this.movement();
    }

    update() {
        this.end();
    }

    generateHorses(){
        for (var i = 0; i < 5; i++) {
            var horse = this.add.image(50, 150 + i * 75, 'horse');
            horse.setScale(0.15)
            horses.push(horse);
        }
    }

    movement(){
        this.input.on('pointerdown', ()=> {
            for (var i = 0; i < horses.length; i++) {
                horses[i].x += Phaser.Math.Between(1, 50);
            }
        });
    }
    
    end(){
        for (var i = 0; i < horses.length; i++) {
            if (horses[i].x >= 750) {
                ganador = "¡EL CABALLO " + (i + 1) + " HA GANADO!";
                this.scene.start("endScene");
            }
        }
    }
}

class End extends Phaser.Scene
    {
        constructor(){
            super("endScene")
        }

        preload ()
        {
            this.load.image('fin', 'assets/background.png');
        }

        create ()
        {
            this.add.image(400, 300, 'fin');
            var texto = this.add.text(115, 250, ganador, { fontFamily: 'Fantasy', fontSize: 60, color: '#565656' });
            this.input.on('pointerdown', ()=> this.playAgain())
        }
        
        playAgain(){
            this.scene.start("gameScene");
        }
    }

    // Configuración del juego
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Horses, End]
};

// Inicializar el juego
var game = new Phaser.Game(config);