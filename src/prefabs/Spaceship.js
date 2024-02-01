// Spaceship prefab.
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, startingX, moveSpeed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = moveSpeed;
        this.startingX = startingX;
    }

    update() {
        // Move spaceship left.
        this.x -= this.moveSpeed;

        // Wrap from left to right edge.
        if (this.x <= 0 - this.width) {
            this.x = this.startingX;
        }
    }

    reset() {
        this.x = this.startingX;
    }
}