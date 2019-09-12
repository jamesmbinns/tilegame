// Helpers
import {
    toIndex
} from "helpers/helpers.js";

var tMap;

var MapObject = function mapObject( type, tileMap, level ){
    this.x = 0;
    this.y = 0;
    this.type = type;
    this.level = level;

    tMap = tileMap;
};

MapObject.prototype.updateLevel = function updateLevel( level ){
    this.level = level;
};

MapObject.prototype.placeAt = function placeAt( x, y ){
    if( tMap.map[toIndex( this.x, this.y, this.level )].object == this ){
        tMap.map[toIndex( this.x, this.y, this.level )].object = null;
    }

    this.x = x;
    this.y = y;

    tMap.map[toIndex( this.x, this.y, this.level )].object = this;
};

export default MapObject;
