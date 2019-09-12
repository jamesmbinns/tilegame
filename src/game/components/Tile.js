var Tile = function tile( tileX, tileY, tileType ){
    this.x = tileX;
    this.y = tileY;
    this.type = tileType;
    this.enterEvent = null;
    this.object = null;
    this.itemStack = null;
};

export default Tile;
