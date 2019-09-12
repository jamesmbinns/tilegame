import {
    toIndex
} from "helpers/helpers.js";

// Helpers
import itemConstructor from "helpers/itemConstructor.js";

var tMap;

var PlacedItemStack = function placedItemStack( items, tileMap, level ){
    this.level = level;
    this.items = items.map(
        ( item ) => itemConstructor( item )
    );

    /* eslint-disable no-console */
    console.log( "this.items", this.items );
    this.x = 0;
    this.y = 0;

    tMap = tileMap;
};

PlacedItemStack.prototype.updateLevel = function updateLevel( level ){
    this.level = level;
};

PlacedItemStack.prototype.placeAt = function placeAt( itemX, itemY ){
    if( tMap.map[toIndex( this.x, this.y, this.level )].itemStack == this ){
        tMap.map[toIndex( this.x, this.y, this.level )].itemStack === null;
    }

    this.x = itemX;
    this.y = itemY;

    tMap.map[toIndex( itemX, itemY, this.level )].itemStack = this;
};

export default PlacedItemStack;
