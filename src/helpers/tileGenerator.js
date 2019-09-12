// Components
import Sprite from "game/components/Sprite.js";

// Data
import maps from "content/data/maps.json";
import waterSprites from "content/data/sprites/water.json";
import conveyorSprites from "content/data/sprites/conveyor.json";

var TileGenerator = function tileGenerator(){
    this.floorTypes = {
        "solid": 0,
        "path": 1,
        "water": 2,
        "ice": 3,
        "conveyorU": 4,
        "conveyorD": 5,
        "conveyorL": 6,
        "conveyorR": 7
    };

    this.tileTypes = {
        // Background
        "0": {
            "color": "#000000",
            "floor": this.floorTypes.solid,
            "animated": false,
            "sprite": new Sprite( [
                {
                    "x": 0,
                    "y": 0,
                    "w": 40,
                    "h": 40
                }
            ] )
        },

        // Grounds
        "1": {
            "color": "#5aa457",
            "floor": this.floorTypes.path,
            "movementSpeed": 500,
            "animated": false,
            "sprite": new Sprite( [
                {
                    "x": 40,
                    "y": 0,
                    "w": 40,
                    "h": 40
                }
            ] )
        },

        "2": {
            "color": "#e8bd7a",
            "floor": this.floorTypes.path,
            "movementSpeed": 450,
            "animated": false,
            "sprite": new Sprite( [
                {
                    "x": 80,
                    "y": 0,
                    "w": 40,
                    "h": 40
                }
            ] )
        },

        // Terrain
        "3": {
            "color": "#286625",
            "floor": this.floorTypes.solid,
            "animated": false,
            "sprite": new Sprite( [
                {
                    "x": 120,
                    "y": 0,
                    "w": 40,
                    "h": 40
                }
            ] )
        },

        "4": {
            "color": "#678fd9",
            "floor": this.floorTypes.water,
            "animated": true,
            "sprite": new Sprite( waterSprites ),
            "spriteDuration": 1200
        },

        "5": {
            "color": "#EEEEFF",
            "floor": this.floorTypes.ice,
            "movementSpeed": 350,
            "animated": false,
            "sprite": new Sprite( [
                {
                    "x": 120,
                    "y": 120,
                    "w": 40,
                    "h": 40
                }
            ] )
        },

        "6": {
            "color": "#CCCCCC",
            "floor": this.floorTypes.conveyorL,
            "movementSpeed": 800,
            "animated": true,
            "sprite": new Sprite( conveyorSprites.L ),
            "spriteDuration": 800
        },

        "7": {
            "color": "#CCCCCC",
            "floor": this.floorTypes.conveyorR,
            "movementSpeed": 800,
            "animated": true,
            "sprite": new Sprite( conveyorSprites.R ),
            "spriteDuration": 800
        },

        "8": {
            "color": "#CCCCCC",
            "floor": this.floorTypes.conveyorD,
            "movementSpeed": 800,
            "animated": true,
            "sprite": new Sprite( conveyorSprites.D ),
            "spriteDuration": 800
        },

        "9": {
            "color": "#CCCCCC",
            "floor": this.floorTypes.conveyorU,
            "movementSpeed": 800,
            "animated": true,
            "sprite": new Sprite( conveyorSprites.U ),
            "spriteDuration": 800
        },

        "10": {
            "color": "#CCAA00",
            "floor": this.floorTypes.path,
            "movementSpeed": 450,
            "animated": false,
            "sprite": new Sprite( [
                {
                    "x": 120,
                    "y": 120,
                    "w": 40,
                    "h": 40
                }
            ] )
        },

        "11": {
            "color": "#CCAA00",
            "floor": this.floorTypes.solid,
            "animated": false,
            "sprite": new Sprite( [
                {
                    "x": 80,
                    "y": 120,
                    "w": 40,
                    "h": 40
                }
            ] )
        }
    };

    this.generateTile = function generateTile( value, level ){
        var tile = maps[level].data[value];

        return this.tileTypes[tile];
    };
};

export default TileGenerator;
