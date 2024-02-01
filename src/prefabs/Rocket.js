// Rocket prefab.
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add object to existing scene.
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2;
        this.sfxShot = scene.sound.add('sfx-shot');
    }

    update() { // Returns true if the rocket misses any ships.
        // Left/right movement.
        if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }

        // Fire button.
        if (Phaser.Input.Keyboard.JustDown(keyFIRE)) {
            this.isFiring = true;
            this.sfxShot.play();
        }

        // If fired, move up.
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // Reset on miss.
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
            return true;
        }
        return false;
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

    changeSpeed(speed) {
        this.moveSpeed = speed;
    }
}