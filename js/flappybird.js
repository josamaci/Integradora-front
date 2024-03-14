class Flappy extends Phaser.Scene
    {

        constructor(){
            super("gameScene")
        }

        preload ()
        {
            this.load.image('sky', 'assets/background.png');
            this.load.image('pipe', 'assets/pipe.png');
            this.load.image('pipesup', 'assets/pipesup.png');
            this.load.spritesheet('bird', 'assets/bird.png', {frameWidth:1200, frameHeight:1200});
        }

        create ()
        {
            this.bg = this.add.tileSprite(400, 300, 1920,1200, 'sky').setScrollFactor(0);
            this.generatePlayer();
            this.generatePipes();

            this.physics.world.on('worldbounds', (body) => {
                this.scene.start('endScene');
               });
              
            this.player.setCollideWorldBounds(true);
            this.player.body.onWorldBounds = true;
        }

        update(time){
            this.bg.tilePositionX = time*0.1;
        }

        generatePlayer(){
            this.player = this.physics.add.sprite(100, 450, 'bird').setScale(0.05).refreshBody();
            this.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });
            this.player.play('fly');
            
            this.input.keyboard.on('keydown', (event)=>{
                if(event.keyCode === 32){
                    this.jump();
                }
            });

            this.input.on('pointerdown', ()=> this.jump())
        }

        generatePipes(){
            const valor = (Math.floor(Math.random()*185)) +445;
            const pipe=this.physics.add.group();
            const e1= pipe.create(960, valor, 'pipe').setScale(0.2, 0.25);
            e1.body.allowGravity = false;
            const e2= pipe.create(960, valor-475, 'pipesup').setScale(0.2, 0.25);
            e2.body.allowGravity = false;
            pipe.setVelocityX(-200);
            pipe.checkWorldBounds=true;
            pipe.outOfBoundsKill=true;
            this.physics.add.overlap(this.player, pipe, this.hitPipe,null,this);
            this.time.delayedCall(1750, this.generatePipes,[],this);
        }

        hitPipe(){
            this.scene.start("endScene");
        }

        jump(){
            this.player.setVelocityY(-200);
        }

    }

    class End extends Phaser.Scene
    {
        constructor(){
            super("endScene")
        }

        preload ()
        {
            this.load.image('fin', 'assets/fin.png');
        }

        create ()
        {
            this.add.image(400, 300, 'fin');
            this.input.on('pointerdown', ()=> this.playAgain())
        }
        
        playAgain(){
            this.scene.start("gameScene");
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [Flappy, End],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 800 }
            }
        }
    };

    const game = new Phaser.Game(config);