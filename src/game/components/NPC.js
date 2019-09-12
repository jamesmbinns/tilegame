// Helpers
import {
    toIndex
} from "helpers/helpers.js";

// Data
import characterSprites from "content/data/sprites/character.js";
import constants from "content/data/constants.js";

var tMap;

var NPC = function npc( id, tileMap, level ){
    this.level = level;
    this.direction = constants.directions.up;
    this.id = id;

    // What tile NPC currently is on
    this.tileFrom = {
        "x": 1,
        "y": 1
    };
    // What tile NPC is moving to
    this.tileTo = {
        "x": 1,
        "y": 1
    };

    this.timeMoved = 0;

    // Physical Dimesions
    this.dimensions = {
        "w": 30,
        "h": 30
    };

    this.position = {
        "x": 45,
        "y": 45
    };

    this.sprites = characterSprites;

    tMap = tileMap;
};

NPC.prototype.updateLevel = function updateLevel( level ){
    this.level = level;
};

NPC.prototype.placeAt = function placeAt( x, y ){
    var positionX = ( ( constants.tileW * x ) + ( ( constants.tileW - this.dimensions.w ) / 2 ) );
    var positionY = ( ( constants.tileH * y ) + ( ( constants.tileH - this.dimensions.h ) / 2 ) );

    this.tileFrom = {
        "x": x,
        "y": y
    };

    this.tileTo = {
        "x": x,
        "y": y
    };

    this.position = {
        "x": positionX,
        "y": positionY
    };

    tMap.map[toIndex( x, y, this.level )].npc = this;
};

export default NPC;
