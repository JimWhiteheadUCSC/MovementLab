class Velocity extends Phaser.Scene {
    constructor() {
        super('velocityScene');
    }

    create() {
        // variables and settings
        this.physics.world.gravity.y = 1000;

        // set bg color
        this.cameras.main.setBackgroundColor('#CCC');

        // print Scene name
        this.add.text(game.config.width/2, 30, 'Scene 1: Velocity Moves', { font: '14px Futura', fill: '#FFFFFF' }).setOrigin(0.5);
        this.add.text(game.config.width/2, 50, '(Number Keys 1–4 Start Their Respective Scene Numbers)', { font: '14px Futura', fill: '#FFFFAA' }).setOrigin(0.5);

        // make ground tiles
        this.ground = this.add.group();
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'platformer_atlas', 'block').setScale(SCALE).setOrigin(0);
            groundTile.body.immovable = true;
            groundTile.body.allowGravity = false;
            this.ground.add(groundTile);
        }

        // add some physics clouds
        this.cloud01 = this.physics.add.sprite(600, 100, 'platformer_atlas', 'cloud_1');
        this.cloud01.body.setAllowGravity(false).setVelocityX(25);
        this.cloud02 = this.physics.add.sprite(200, 200, 'platformer_atlas', 'cloud_2');
        this.cloud02.body.setAllowGravity(false).setVelocityX(45);

        // set up my alien son 👽
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/arcade-gameobject/#sprite-object
        this.alien = this.physics.add.sprite(game.config.width/2, game.config.height/6, 'platformer_atlas', 'front').setScale(SCALE);
        this.alien.setCollideWorldBounds(true);

        // add arrow key graphics as UI
        this.upKey = this.add.sprite(64, 32, 'arrowKey');
		this.leftKey = this.add.sprite(32, 64, 'arrowKey');
		this.downKey = this.add.sprite(64, 64, 'arrowKey');
		this.rightKey = this.add.sprite(96, 64, 'arrowKey');
		this.leftKey.rotation = Math.PI/2*3;
		this.downKey.rotation = Math.PI;
        this.rightKey.rotation = Math.PI/2;
        this.upKey.tint = 0x333333;
        this.downKey.tint = 0x333333;

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // add physics collider
        // this.physics.add.collider(this.alien, this.ground);

        // set up Scene switcher
        // note: this style of scene switching is for demo purposes only
        this.input.keyboard.on('keydown', sceneSwitcher);

    }

    update() {
        // check keyboard input
        if(cursors.left.isDown) {
            // set alien velocity here (.setVelocityX())
            // A negative value moves left


            // Animation and arrow key tinting
            // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Animation.html#play__anchor
            // play(key [, ignoreIfPlaying] [, startFrame])
            this.alien.setFlip(true, false);
            this.alien.anims.play('walk', true);
            this.leftKey.tint = 0xFACADE;   // tint key

        } else if(cursors.right.isDown) {
            // Set alien velocity here (.setVelocityX())
            // A positive value moves right


            // Animation and arrow key tinting
            this.alien.resetFlip();
            this.alien.anims.play('walk', true);
            this.rightKey.tint = 0xFACADE;  // tint key

        } else {
            // Set alien velocity to zero here (.setVelocityX())


            // Animation and arrow key tinting
            this.alien.anims.play('idle');
            this.leftKey.tint = 0xFFFFFF;   // un-tint keys
            this.rightKey.tint = 0xFFFFFF;  
        }

        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.cloud01, this.cloud01.width/2);
        this.physics.world.wrap(this.cloud02, this.cloud02.width/2);
        // add alien world wrap line here

    }
}