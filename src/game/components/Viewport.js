// Data
import constants from "content/data/constants.js";

var Viewport = function viewport( canvas ){
    this.screen = {
        "w": canvas.width,
        "h": canvas.height
    };

    this.startTile = {
        "x": 0,
        "y": 0
    };

    this.endTile = {
        "x": 0,
        "y": 0
    };

    this.offset = {
        "x": 0,
        "y": 0
    };

    // Given the px ( player.x ) and py ( player.y ) coordinates of where we want dead center
    // of the visible screen to be ( centered on Player )
    this.update = function update( px, py, level ){
        // Find the coordinates of the tile that should be Viewport center given px and py
        var tile = {
            "x": Math.floor( px / constants.tileW ),
            "y": Math.floor( py / constants.tileH )
        };

        // Set offset as dead center of screen, minus where we want Viewport center to be
        this.offset = {
            "x": Math.floor( ( this.screen.w / 2 ) - px ),
            "y": Math.floor( ( this.screen.h / 2 ) - py )
        };

        this.startTile = {
            "x": tile.x - 1 - Math.ceil( ( this.screen.w / 2 ) / constants.tileW ),
            "y": tile.y - 1 - Math.ceil( ( this.screen.h / 2 ) / constants.tileH )
        };

        if( this.startTile.x < 0 ){
            this.startTile.x = 0;
        }

        if( this.startTile.y < 0 ){
            this.startTile.y = 0;
        }

        this.endTile = {
            "x": tile.x + 1 + Math.ceil( ( this.screen.w / 2 ) / constants.tileW ),
            "y": tile.y + 1 + Math.ceil( ( this.screen.h / 2 ) / constants.tileH )
        };

        if( this.endTile.x >= level.mapW ){
            this.endTile.x = level.mapW - 1;
        }

        if( this.endTile.y >= level.mapH ){
            this.endTile.y = level.mapH - 1;
        }
    };
};

export default Viewport;
