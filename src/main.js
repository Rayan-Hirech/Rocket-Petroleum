let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// Reserve keyboard bindings.
let keyFIRE, keyRESET, keyLEFT, keyRIGHT;

// Set UI sizes.
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;