class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        // Place parallax starfield tile sprites.
        this.starfieldA = this.add.tileSprite(0, 0, 640, 480, 'starfieldA').setOrigin(0, 0);
        this.starfieldB = this.add.tileSprite(0, 0, 640, 480, 'starfieldB').setOrigin(0, 0);
        this.starfieldC = this.add.tileSprite(0, 0, 640, 480, 'starfieldC').setOrigin(0, 0);

        // Green UI background.
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // White borders.
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // Add rocket (p1).
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // Add 3 spaceships.
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30, game.config.width, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20, game.config.width, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10, game.config.width, game.settings.spaceshipSpeed).setOrigin(0,0);
        this.meowship = new Spaceship(this, game.config.width + 500, borderUISize * 7 + borderPadding * 6, 'meowship', 0, 50, game.config.width + 1000, game.settings.spaceshipSpeed * 3);

        // Define keys.
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Initialize score.
        this.p1Score = 0;

        // Display score.
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // Game over flag.
        this.gameOver = false;

        // Initialize interactive timer.
        this.timeLeft = game.settings.gameTimer;

        // Display score.
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
        this.timerRight = this.add.text(game.config.width - borderUISize * 4 - borderPadding * 2, borderUISize + borderPadding * 2, Math.ceil(this.timeLeft / 1000), timerConfig);
    }

    update(time, delta) {
        // Check key input for restart.
        if (!this.gameOver && this.timeLeft <= 0) {
            this.timeLeft = 0;
            let gameOverConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                    top: 5,
                    bottom: 5,
                }
            };
            this.add.text(game.config.width / 2, game.config.height/2, 'GAME OVER', gameOverConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', gameOverConfig).setOrigin(0.5);
            this.gameOver = true;
        } else if (!this.gameOver) {
            this.timeLeft -= delta;
            this.timerRight.text = Math.ceil(this.timeLeft / 1000);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfieldA.tilePositionX -= 0.5;
        this.starfieldB.tilePositionX -= 1.5;
        this.starfieldC.tilePositionX -= 4;
        if (!this.gameOver) {
            if (this.p1Rocket.update()) {
                this.timeLeft -= 3000;
            }
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.meowship.update();
        }

        // Check collisions.
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.meowship)) {
            this.p1Rocket.reset();
            this.shipExplode(this.meowship);
        }
    }

    checkCollision(rocket, ship) {
        // Simple AABB checking.
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // Temporarily hide ship.
        ship.alpha = 0;

        // Create explosion sprite at ship's position.
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
            ship.reset()                         // reset ship position
            ship.alpha = 1                       // make ship visible again
            boom.destroy()                       // remove explosion sprite
        });

        // Play explosion sound.
        this.sound.play('sfx-explosion');

        // Score add and text update.
        this.p1Score += ship.points;
        this.timeLeft += ship.points * 100;
        this.scoreLeft.text = this.p1Score;
    }
}