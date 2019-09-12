// Helpers
import TileGenerator from "helpers/tileGenerator.js";
import {
    toIndex
} from "helpers/helpers.js";

// Lodash
import debounce from "lodash/debounce";

// Data
import constants from "content/data/constants.js";
import characterSprites from "content/data/sprites/character.js";

// var tileEvents = {
//     "22": function twentyTwo(){
//         this.placeAt( 4, 1 );
//     },
//     "26": function twentySix(){
//         this.placeAt( 1, 1 );
//     }
// };

var tileGen = new TileGenerator();

var Character = function character( tileMap, canvas, level ){
    this.level = level;
    this.canvas = canvas;
    this.tileMap = tileMap;
    this.direction = constants.directions.up;
    this.isAlive = true;

    // What tile Character currently is on
    this.tileFrom = {
        "x": 1,
        "y": 1
    };

    // What tile Character is moving to
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

    this.vitals = {
        "health": {
            "maxValue": 100,
            "value": 100,
            "lastCheck": 0
        },
        "hunger": {
            "maxValue": 100,
            "value": 100,
            "lastCheck": 0
        },
        "thirst": {
            "maxValue": 100,
            "value": 100,
            "lastCheck": 0
        },
        "bathroom": {
            "maxValue": 100,
            "value": 100,
            "lastCheck": 0
        }
    };

    this.sprites = characterSprites;
};

Character.prototype.updateLevel = function updateLevel( level, tileMap, x, y ){
    this.level = level;
    this.tileMap = tileMap;
    this.placeAt( x, y );
};

Character.prototype.placeAt = function placeAt( x, y ){
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

    debounce( this.savePosition.bind( this, x, y ), 1000, false )();
};

Character.prototype.savePosition = function savePosition( x, y ){
    var changePositionEvent;
    var eventObject;

    eventObject = {
        "detail": {
            "tileTo": {
                "x": x,
                "y": y
            }
        }
    };

    changePositionEvent = new CustomEvent( "changePosition", eventObject );

    this.canvas.dispatchEvent( changePositionEvent );
};

Character.prototype.processMovement = function processMovement( t, keys ){
    var tileFloor;
    var moveSpeed = tileGen.tileTypes[ this.tileMap.map[ toIndex( this.tileTo.x, this.tileTo.y, this.level ) ].type ].movementSpeed;
    var xDiff;
    var yDiff;

    // If interacting, cannot move, do not checkMovement()
    if( this.interacting ){
        return true;
    }

    // If tileFrom and tileTo are exactly the same ( player is not moving ),
    // return false. This triggers the game to check for
    // movement ( keys down ) by calling this.game.checkMovement()
    if( this.tileFrom.x == this.tileTo.x &&
        this.tileFrom.y == this.tileTo.y
    ){
        return false;
    }

    // If player has moved and the time passed since the move was initiated is above the delay,
    // then the player can officially be placed in the tile they are/were moving to
    if( ( t - this.timeMoved ) >= moveSpeed ){
        tileFloor = tileGen.tileTypes[ this.tileMap.map[ toIndex( this.tileTo.x, this.tileTo.y, this.level ) ].type ].floor;

        this.placeAt( this.tileTo.x, this.tileTo.y );

        // Check if tile user is on has movement defaults built in ( ice, conveyor, etc )
        if( tileFloor == tileGen.floorTypes.ice && this.canMoveDirection( this.direction, keys ) ){
            this.moveDirection( this.direction, t );
        }
        else if( tileFloor == tileGen.floorTypes.conveyorL && this.canMoveLeft( keys ) ){
            this.moveLeft( t );
        }
        else if( tileFloor == tileGen.floorTypes.conveyorR && this.canMoveRight( keys ) ){
            this.moveRight( t );
        }
        else if( tileFloor == tileGen.floorTypes.conveyorU && this.canMoveUp( keys ) ){
            this.moveUp( t );
        }
        else if( tileFloor == tileGen.floorTypes.conveyorD && this.canMoveDown( keys ) ){
            this.moveDown( t );
        }

        // Check tileEvents
        if( this.tileMap.map[toIndex( this.tileTo.x, this.tileTo.y, this.level )].enterEvent !== null ){
            this.tileMap.map[toIndex( this.tileTo.x, this.tileTo.y, this.level )].enterEvent.call( this );
        }
    }

    // Else, the player is still moving between tiles and we need to show that visually to the user
    // by rendering the Character's position between start and end tiles
    else{
        // Get starting tile position( x, y ) of Character using tileFrom
        this.position.x = ( this.tileFrom.x * constants.tileW ) + ( ( constants.tileW - this.dimensions.w ) / 2 );
        this.position.y = ( this.tileFrom.y * constants.tileH ) + ( ( constants.tileH - this.dimensions.h ) / 2 );

        // To that static tile position we add ( or subtract by adding negative ) the diff
        // diff = ( tile width / time to move 1 tile ) * ( current time - time movement began )
        // diff = ( pixels / ms ) * ( timePassed in ms )
        // diff = pixels to move
        if( this.tileTo.x != this.tileFrom.x ){
            xDiff = ( constants.tileW / moveSpeed ) * ( t - this.timeMoved );

            this.position.x += ( this.tileTo.x < this.tileFrom.x ? 0 - xDiff : xDiff );
        }

        if( this.tileTo.y != this.tileFrom.y ){
            yDiff = ( constants.tileH / moveSpeed ) * ( t - this.timeMoved );

            this.position.y += ( this.tileTo.y < this.tileFrom.y ? 0 - yDiff : yDiff );
        }

        this.position = {
            "x": Math.round( this.position.x ),
            "y": Math.round( this.position.y )
        };
    }

    return true;
};

Character.prototype.canMoveTo = function canMoveTo( x, y, keys ){
    var tile = tileGen.generateTile( toIndex( x, y, this.level ), this.level );
    var object;

    if( this.notFacingKeyDirection( keys ) ){
        return false;
    }

    if( x < 0 ||
        x >= this.tileMap.w ||
        y < 0 ||
        y >= this.tileMap.h
    ){
        return false;
    }

    if( this.tileMap.map[toIndex( x, y, this.level )].object !== null ){
        object = this.tileMap.map[toIndex( x, y, this.level )].object;

        if( constants.objectTypes[object.type].collision == constants.objectCollision.solid ){
            return false;
        }
    }

    if(
        tile.floor != tileGen.floorTypes.path &&
        tile.floor != tileGen.floorTypes.ice &&
        tile.floor != tileGen.floorTypes.conveyorU &&
        tile.floor != tileGen.floorTypes.conveyorD &&
        tile.floor != tileGen.floorTypes.conveyorL &&
        tile.floor != tileGen.floorTypes.conveyorR
    ){
        return false;
    }

    // If NPC is on tile
    if( this.tileMap.map[toIndex( x, y, this.level )].npc ){
        return false;
    }

    return true;
};

Character.prototype.canMoveUp = function canMoveUp( keys ){
    var canMove = this.canMoveTo( this.tileFrom.x, this.tileFrom.y - 1, keys );

    this.direction = constants.directions.up;

    return canMove;
};

Character.prototype.canMoveDown = function canMoveDown( keys ){
    var canMove = this.canMoveTo( this.tileFrom.x, this.tileFrom.y + 1, keys );

    this.direction = constants.directions.down;

    return canMove;
};

Character.prototype.canMoveLeft = function canMoveLeft( keys ){
    var canMove = this.canMoveTo( this.tileFrom.x - 1, this.tileFrom.y, keys );

    this.direction = constants.directions.left;

    return canMove;
};

Character.prototype.canMoveRight = function canMoveRight( keys ){
    var canMove = this.canMoveTo( this.tileFrom.x + 1, this.tileFrom.y, keys );

    this.direction = constants.directions.right;

    return canMove;
};

Character.prototype.moveUp = function moveUp( t ){
    this.direction = constants.directions.up;
    this.tileTo.y -= 1;
    this.timeMoved = t;
};

Character.prototype.moveDown = function moveDown( t ){
    this.direction = constants.directions.down;
    this.tileTo.y += 1;
    this.timeMoved = t;
};

Character.prototype.moveLeft = function moveLeft( t ){
    this.direction = constants.directions.left;
    this.tileTo.x -= 1;
    this.timeMoved = t;
};

Character.prototype.moveRight = function moveRight( t ){
    this.direction = constants.directions.right;
    this.tileTo.x += 1;
    this.timeMoved = t;
};

Character.prototype.canMoveDirection = function canMoveDirection( d, keys ){
    switch( d ){
        case constants.directions.up:
            return this.canMoveUp( keys );

        case constants.directions.down:
            return this.canMoveDown( keys );

        case constants.directions.left:
            return this.canMoveLeft( keys );

        default:
            return this.canMoveRight( keys );
    }
};

Character.prototype.moveDirection = function moveDirection( d, t ){
    switch( d ){
        case constants.directions.up:
            return this.moveUp( t );

        case constants.directions.down:
            return this.moveDown( t );

        case constants.directions.left:
            return this.moveLeft( t );

        default:
            return this.moveRight( t );
    }
};

Character.prototype.canInteract = function canInteract(){
    var tileInFront;

    if( this.interacting ){
        return false;
    }

    tileInFront = this.getTileInFront();

    // If tileInFront has an NPC, return true
    if( this.tileMap.map[toIndex( tileInFront.x, tileInFront.y, this.level )].npc ){
        return true;
    }

    if( this.tileMap.map[toIndex( tileInFront.x, tileInFront.y, this.level )].itemStack ){
        return true;
    }

    return false;
};

Character.prototype.interact = function interact(){
    var tileInFront = this.getTileInFront();
    var tileObject = this.tileMap.map[toIndex( tileInFront.x, tileInFront.y, this.level )];
    var eventObject = {
        "detail": {}
    };
    var interactEvent;

    // TODO: This can be made more generic to handle any type of interaction, NPC or object
    if( tileObject.itemStack ){
        eventObject.detail.itemStack = tileObject.itemStack;
    }

    if( tileObject.npc ){
        eventObject.detail.npc = tileObject.npc;
    }


    interactEvent = new CustomEvent( "interact", eventObject );

    this.interacting = true;

    this.canvas.dispatchEvent( interactEvent );
};

Character.prototype.cancelInteract = function cancelInteract(){
    this.interacting = false;
};

Character.prototype.getTileInFront = function getTileInFront(){
    var tileInFront = Object.assign( {}, this.tileFrom );

    if( this.direction == constants.directions.up ){
        tileInFront.y -= 1;
    }
    else if( this.direction == constants.directions.right ){
        tileInFront.x += 1;
    }
    else if( this.direction == constants.directions.down ){
        tileInFront.y += 1;
    }
    else if( this.direction == constants.directions.left ){
        tileInFront.x -= 1;
    }

    return tileInFront;
};

Character.prototype.setLeftItems = function setLeftItems( leftItems ){
    var tileInFront = this.getTileInFront();

    if( leftItems.length ){
        this.tileMap.map[toIndex( tileInFront.x, tileInFront.y, this.level )].itemStack.items = leftItems;
    }
    else{
        this.tileMap.map[toIndex( tileInFront.x, tileInFront.y, this.level )].itemStack = null;
    }
};

Character.prototype.notFacingKeyDirection = function notFacingKeyDirection( keys ){
    if( keys.up && this.direction !== 0 ){
        this.direction = constants.directions.up;

        return true;
    }

    else if( keys.right && this.direction !== 1 ){
        this.direction = constants.directions.right;

        return true;
    }

    else if( keys.down && this.direction !== 2 ){
        this.direction = constants.directions.down;

        return true;
    }

    else if( keys.left && this.direction !== 3 ){
        this.direction = constants.directions.left;

        return true;
    }

    return false;
};

Character.prototype.getVitals = function getVitals(){
    return this.vitals;
};

Character.prototype.updateVitals = function updateVitals( timeNow ){
    var vitals = this.vitals;

    if( ( timeNow - vitals.hunger.lastCheck ) > constants.vitalsCheck.hunger ){
        if( vitals.hunger.value > 0 ){
            vitals.hunger.value -= 1;
        }

        if( vitals.hunger.value === 0 ){
            vitals.health.value -= 1;
        }

        vitals.hunger.lastCheck = timeNow;
    }

    if( ( timeNow - vitals.thirst.lastCheck ) > constants.vitalsCheck.thirst ){
        if( vitals.thirst.value > 0 ){
            vitals.thirst.value -= 1;
        }

        if( vitals.thirst.value === 0 ){
            vitals.health.value -= 1;
        }

        vitals.thirst.lastCheck = timeNow;
    }

    if( ( ( timeNow - vitals.bathroom.lastCheck ) > constants.vitalsCheck.bathroom ) ){
        if( vitals.bathroom.value > 0 ){
            vitals.bathroom.value -= 1;
        }

        if( vitals.bathroom.value === 0 ){
            vitals.health.value -= 20;
            vitals.bathroom.value = 100;
        }

        vitals.bathroom.lastCheck = timeNow;
    }

    this.vitals = vitals;
};

Character.prototype.replaceVitals = function replaceVitals( vitals ){
    this.vitals = vitals;
};

Character.prototype.useItem = function useItem( item ){
    if( this.vitals[item.vital].value + item.value <  this.vitals[item.vital].maxValue ){
        this.vitals[item.vital].value += item.value;
    }
    else{
        this.vitals[item.vital].value = this.vitals[item.vital].maxValue;
    }
};

export default Character;
