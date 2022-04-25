// Nathan Altice
// Updated: 7/1/20
// Phaser 3 Movement Studies
// Concepts: Arcade physics, atlas and atlasXML loading, atlas animation (custom and generated frames), physics world wrapping, physics body properties (velocity, acceleration, drag, max acceleration), keyboard (isDown, JustPressed, DownDuration, UpDuration)
// Some mechanics inspired by and adapted from Game Mechanic Explorer https://gamemechanicexplorer.com
// The two example atlases  are commercial assets and should not be used for your own projects - buy them from https://www.kenney.nl/assets :)

// tame the javashrek
'use strict';

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.WEBGL,
    width: 840,
    height: 525,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Velocity, Acceleration, Jump, Runner ]
};

let game = new Phaser.Game(config);

// Utility methods used by all scenes

// sceneSwitcher is used to check for number presses,
// which switch scenes.
// Use game, instead of this, since sceneSwitcher is outside
// of a scene. The game object has a pointer to the scene
// manager in "game.scene".
let sceneSwitcher = (event) => {
    //console.log("Key is: " + event.key);
    switch(event.key) {
        case '1':
            game.scene.start('velocityScene');
            game.scene.bringToTop('velocityScene');
            game.scene.pause('accelerationScene');
            game.scene.pause('jumpScene');
            game.scene.pause('runnerScene');
            break;
        case '2':
            game.scene.start('accelerationScene');
            game.scene.bringToTop('accelerationScene');
            game.scene.pause('velocityScene');
            game.scene.pause('jumpScene');
            game.scene.pause('runnerScene');
            break;
        case '3':
            game.scene.start('jumpScene');
            game.scene.bringToTop('jumpScene');
            game.scene.pause('velocityScene');
            game.scene.pause('accelerationScene');
            game.scene.pause('runnerScene');
            break;
        case '4':
            game.scene.start('runnerScene');
            game.scene.bringToTop('runnerScene');
            game.scene.pause('velocityScene');
            game.scene.pause('accelerationScene');
            game.scene.pause('jumpScene');
            break;
        default:
            break;
    }
}

