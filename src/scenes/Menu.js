class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    init(highScore) {
        this.bestScore = highScore.bScore;
        this.bestTime = highScore.bTime;
        if (typeof this.bestScore == "undefined") {
            this.bestScore = 0;
        }
        if (typeof this.bestTime == "undefined") {
            this.bestTime = 0;
        }
    }

    preload() {
        // Load images / tile sprites.
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('meowship', './assets/meowship.png');
        this.load.image('starfieldA', './assets/starfieldA.png');
        this.load.image('starfieldB', './assets/starfieldB.png');
        this.load.image('starfieldC', './assets/starfieldC.png');

        // Load spritesheet.
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });

        // Load audio.
        this.load.audio('sfx-select', './assets/sfx-select.wav');
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav');
        this.load.audio('sfx-shot', './assets/sfx-shot.wav');
    }

    create() {
        // Animation configuration.
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };

        // Display menu text.
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROCKET PETROLEUM', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use <--> arrows to move & (F) to fire.', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press <-- for Novice or --> for Expert.', menuConfig).setOrigin(0.5);

        // Display high score.
        let highConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        };
        this.bScore = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, `Best Score: ${this.bestScore}P`, highConfig);
        this.bTime = this.add.text(game.config.width - borderUISize * 8 - borderPadding * 4, borderUISize + borderPadding * 2, `Best Time: ${Math.floor(this.bestTime / 1000)}`, highConfig);

        // Define keys.
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Easy mode.
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 5000//45000
            }
            this.sound.play('sfx-select');
            let highScore = {
                bScore: this.bestScore,
                bTime: this.bestTime
            };
            this.scene.start('playScene', highScore);
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Hard mode.
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 30000
            }
            this.sound.play('sfx-select');
            let highScore = {
                bScore: this.bestScore,
                bTime: this.bestTime
            };
            this.scene.start('playScene', highScore);
        }
    }
}