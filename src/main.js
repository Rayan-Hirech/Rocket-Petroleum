/*
Name: Rayan Hirech
Mod Title: Rocket Petroleum
Time to Complete: (if i remember correctly i started at 4:00ish) TODO
Mods Added:
    - (5 points): Created a new spaceship type (called Meowship) that's smaller, moves a lot faster, shows up slightly less often, and is worth 50 points.
    - (5 points): Implemented an interactive timer that counts down every second, as well as increases by one tenth of the ships score when hitting a ship, and decreases by 3 seconds when missing.
    - (3 points): Displayed the time remaining on the interactive timer on the top right of the screen.
    - (3 points): Implemented a scrolling parallax background.
    - (1 point): Implemented a speed increase for the ships and rocket after 30 seconds.
*/

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