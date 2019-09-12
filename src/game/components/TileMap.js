import Tile from "game/components/Tile.js";

var TileMap = function tileMap(){
    this.w = 0;
    this.h = 0;
    this.map = [];
    this.levels = 4;
};

TileMap.prototype.buildMapFromData = function buildMapFromData( tiles, mapW, mapH ){
    var y;
    var x;

    this.w = mapW;
    this.h = mapH;

    if( tiles.length != ( this.w * this.h ) ){
        return false;
    }

    this.map = [];

    for( y = 0; y < this.h; y++ ){
        for( x = 0; x < this.w; x++ ){
            this.map = [ ...this.map, new Tile( x, y, tiles[( ( y * this.w ) + x )] ) ];
        }
    }

    return true;
};

TileMap.prototype.replaceMap = function replaceMap( map, w, h ){
    this.map = map;
    this.w = w;
    this.h = h;
};

export default TileMap;
