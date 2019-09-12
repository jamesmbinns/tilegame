// Components
import Character from "game/components/Character.js";
import NPC from "game/components/NPC.js";
import Viewport from "game/components/Viewport.js";
import TileMap from "game/components/TileMap.js";
import MapObject from "game/components/MapObject.js";
import PlacedItemStack from "game/components/PlacedItemStack.js";

// Lodash
import debounce from "lodash/debounce";

// Helpers
import TileGenerator from "helpers/tileGenerator";
import {
    toIndex,
    // getFrame
} from "helpers/helpers.js";

// Data
import keyCodes from "content/data/keyCodes.json";
import constants from "content/data/constants.js";
import maps from "content/data/maps.json";

var tileGen = new TileGenerator();

var Game = function game( canvas, context ){
    this.initialize = function initialize( level ){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.npcs = [];
        this.lastFrameTime = 0;
        this.keys = {};
        this.level = level;
        this.tileMap = new TileMap();
        this.tileset = new Image();
        this.player = new Character( this.tileMap, this.canvas, this.level );
        this.gameTime = 0;
        this.currentSpeed = 0;
        this.existingMapData = {};

        if( !this.context ){
            alert( "You must update your browser before playing this game" );
        }

        this.setupInput( this );

        this.tileset.onerror = () => {
            this.context = null;

            alert( "Failed loading tileset." );
        };

        // Loading tileset then starting game
        this.tileset.onload = () => {
            this.startGame();
        };

        this.tileset.src = "/src/content/images/spritesheet.png";
    };

    // Handle Input
    this.setupInput = ( gameObj ) => {
        window.addEventListener( "keydown", ( e ) => {
            // On keydown, if we care about this key, set this.keys[direction] to true
            if( keyCodes[e.keyCode] ){
                gameObj.keys[keyCodes[e.keyCode]] = true;
                e.preventDefault();
            }
        }, false );

        // Mobile controls
        this.canvas.addEventListener( "mobileKeyDown", ( e ) => {
            e.preventDefault();

            if( keyCodes[e.detail.key] ){
                gameObj.keys[keyCodes[e.detail.key]] = true;
                e.preventDefault();
            }
        } );

        this.canvas.addEventListener( "mobileKeyUp", ( e ) => {
            e.preventDefault();

            if( keyCodes[e.detail.key] ){
                gameObj.keys[keyCodes[e.detail.key]] = false;
                e.preventDefault();
            }
        } );

        // Save the map when the user stops moving for more than 1 second
        window.addEventListener( "keyup", debounce( this.saveMap.bind( this ), 1000, false ) );

        this.canvas.addEventListener( "cancelInteract", ( e ) => {
            e.preventDefault();

            this.player.cancelInteract();
        } );

        this.canvas.addEventListener( "setItems", ( e ) => {
            e.preventDefault();

            this.player.setLeftItems( e.detail.leftItems );
        } );

        this.canvas.addEventListener( "useItem", ( e ) => {
            e.preventDefault();

            this.player.useItem( e.detail.item );
        } );

        this.canvas.addEventListener( "loadGame", ( e ) => {
            e.preventDefault();

            /* eslint-disable no-console */
            console.log( "loadGame - detail", e.detail );

            this.level = e.detail.level;

            this.player.placeAt( e.detail.position.tileTo.x, e.detail.position.tileTo.y );

            if( Object.keys( e.detail.vitals ).length ){
                this.player.replaceVitals( e.detail.vitals );
            }

            if( e.detail.map[this.level].length ){
                this.existingMapData = e.detail.map;

                this.tileMap.replaceMap( e.detail.map[this.level], maps[this.level].mapW, maps[this.level].mapH );
            }
        } );

        this.canvas.addEventListener( "restartGame", ( e ) => {
            e.preventDefault();

            this.initialize();
        } );
    };


    this.startGame = function startGame(){
        this.setLevel();

        this.viewport = new Viewport( this.canvas );

        this.loop( this );
    };

    // Game Loop
    this.loop = () => {
        if( this.player.isAlive ){
            this.currentFrameTime = Date.now();

            this.updatePlayerVitals();

            this.draw();

            this.lastFrameTime = this.currentFrameTime;

            requestAnimationFrame( this.loop );
        }
        else{
            // Player is dead
            this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        }
    };

    this.draw = function draw(){
        // var timeElapsed = this.currentFrameTime - this.lastFrameTime;
        var object;
        var tileInFront;
        var itemStack;
        var z;
        var y;
        var x;

        this.gameTime = Math.floor( this.currentFrameTime * constants.speeds[this.currentSpeed].mult );

        if( !this.player.processMovement( this.gameTime, this.keys ) && constants.speeds[this.currentSpeed].mult != 0 ){
            this.checkMovement();
        }

        // Center viewport over player
        this.viewport.update(
            this.player.position.x + ( this.player.dimensions.w / 2 ),
            this.player.position.y + ( this.player.dimensions.h / 2 ),
            maps[this.level]
        );

        this.context.fillStyle = "#000000";
        this.context.fillRect( 0, 0, this.viewport.screen.w, this.viewport.screen.h );

        // Draw all sprites, level by level
        for( z = 0; z < this.tileMap.levels; z++ ){
            for( y = this.viewport.startTile.y; y <= this.viewport.endTile.y; y++ ){
                for( x = this.viewport.startTile.x; x <= this.viewport.endTile.x; x++ ){
                    // If first level, draw tiles
                    if( z == 0 ){
                        tileGen.tileTypes[ this.tileMap.map[ toIndex( x, y, this.level ) ].type ].sprite.draw(
                            this.gameTime,
                            this.viewport.offset.x + ( x * constants.tileW ),
                            this.viewport.offset.y + ( y * constants.tileH ),
                            this.context,
                            this.tileset
                        );
                    }

                    else if( z == 1 ){
                        itemStack = this.tileMap.map[toIndex( x, y, this.level )].itemStack;
                        tileInFront = this.player.getTileInFront();

                        if( itemStack !== null && ( tileInFront.x == x && tileInFront.y == y ) ){
                            constants.itemTypes["activeStack"].sprite.draw(
                                this.gameTime,
                                this.viewport.offset.x + ( x * constants.tileW ),
                                this.viewport.offset.y + ( y * constants.tileH ),
                                this.context,
                                this.tileset
                            );
                        }
                    }

                    object = this.tileMap.map[toIndex( x, y, this.level )].object;

                    if(
                        object !== null &&
                        constants.objectTypes[object.type].zIndex == z
                    ){
                        constants.objectTypes[object.type].sprite.draw(
                            this.gameTime,
                            this.viewport.offset.x + ( x * constants.tileW ),
                            this.viewport.offset.y + ( y * constants.tileH ),
                            this.context,
                            this.tileset
                        );
                    }
                }
            }

            if( z == 1 ){
                this.drawNPCs();
                this.drawPlayer();
            }
        }

        this.keys = {};
    };

    this.checkMovement = function checkMovement(){
        var exitTile;

        if( maps[this.level].exits[`${this.player.tileFrom.x},${this.player.tileFrom.y}`] ){
            exitTile = maps[this.level].exits[`${this.player.tileFrom.x},${this.player.tileFrom.y}`];

            this.level = exitTile.level;

            this.updateLevel( exitTile.entryTile.x, exitTile.entryTile.y );
        }

        else if( this.keys.up && this.player.canMoveUp( this.keys ) ){
            this.player.moveUp( this.gameTime );
        }

        else if( this.keys.right && this.player.canMoveRight( this.keys ) ){
            this.player.moveRight( this.gameTime );
        }

        else if( this.keys.down && this.player.canMoveDown( this.keys ) ){
            this.player.moveDown( this.gameTime );
        }

        else if( this.keys.left && this.player.canMoveLeft( this.keys ) ){
            this.player.moveLeft( this.gameTime );
        }

        else if( this.keys.spacebar && this.player.canInteract() ){
            this.player.interact();
        }

        if( this.player.tileFrom.x != this.player.tileTo.x ||
            this.player.tileFrom.y != this.player.tileTo.y
        ){
            this.player.timeMoved = this.gameTime;
        }
    };

    this.drawPlayer = function drawPlayer(){
        this.player.sprites[this.player.direction].draw(
            this.gameTime,
            this.viewport.offset.x + this.player.position.x,
            this.viewport.offset.y + this.player.position.y,
            this.context,
            this.tileset
        );
    };

    this.drawBridge = function drawBridge(){
        maps[this.level].data[ toIndex( 4, 1, this.level ) ];

        maps[this.level].data[ toIndex( 4, 1, this.level ) ] = ( maps[this.level].data[ toIndex( 4, 1, this.level ) ] == 4 ? 2 : 4 );
    };

    this.updateLevel = function updateLevel( x, y ){
        this.player.updateLevel( this.level, this.tileMap, x, y );

        this.setLevel();
    };

    this.setLevel = function setLevel(){
        var changeLevelEvent;
        var eventObject = {
            "detail": {
                "level": this.level
            }
        };

        changeLevelEvent = new CustomEvent( "changeLevel", eventObject );

        this.canvas.dispatchEvent( changeLevelEvent );

        // @TODO: Get drawNPCs to work like draw()
        if( this.getExistingLevelData() ){
            this.tileMap.replaceMap( this.existingMapData[this.level], maps[this.level].mapW, maps[this.level].mapH );
            this.generateNPCs();
        }
        else{
            this.tileMap.buildMapFromData( maps[this.level].data, maps[this.level].mapW, maps[this.level].mapH );
            this.generateMapObjects();
            this.generateNPCs();
        }
    };

    this.getExistingLevelData = function getExistingLevelData(){
        if( this.existingMapData[this.level] && this.existingMapData[this.level].length ){
            return true;
        }

        return false;
    };

    this.drawNPCs = function drawNPCs(){
        var i;
        var npc;

        for( i = 0; i < this.npcs.length; i++ ){
            npc = this.npcs[i];

            npc.sprites[npc.direction].draw(
                this.gameTime,
                this.viewport.offset.x + npc.position.x,
                this.viewport.offset.y + npc.position.y,
                this.context,
                this.tileset
            );
        }
    };

    this.generateNPCs = function generateNPCs(){
        var npcTemplate;
        var npc;
        var i;

        this.npcs = [];

        for( i = 0; i < maps[this.level].npcs.length; i++ ){
            npcTemplate = maps[this.level].npcs[i];

            npc = new NPC( npcTemplate.id, this.tileMap, this.level );

            npc.placeAt( npcTemplate.x, npcTemplate.y );

            this.npcs.push( npc );
        }
    };

    this.generateMapObjects = function generateMapObjects(){
        var placedStack;
        var placedObject;
        var stack;
        var obj;
        var i;
        var j;

        for( i = 0; i < maps[this.level].mapObjects.length; i++ ){
            obj = maps[this.level].mapObjects[i];

            placedObject = new MapObject( obj.type, this.tileMap, this.level );

            placedObject.placeAt( obj.x, obj.y );
        }

        for( j = 0; j < maps[this.level].itemStacks.length; j++ ){
            stack = maps[this.level].itemStacks[j];

            placedStack = new PlacedItemStack( stack.items, this.tileMap, this.level );

            placedStack.placeAt( stack.x, stack.y );
        }
    };

    this.updatePlayerVitals = function updatePlayerVitals(){
        var playerVitals = this.player.getVitals();
        var eventObject;
        var changeVitalsEvent;
        var deadEvent;

        // Check if dead ( health = 0 )
        if( playerVitals.health.value <= 0 && this.player.isAlive ){
            this.player.isAlive = false;

            deadEvent = new CustomEvent( "playerDead" );

            this.canvas.dispatchEvent( deadEvent );
        }

        // Check if should reduce vitals based on timeElapsed or subvitals
        this.player.updateVitals( this.currentFrameTime );

        eventObject = {
            "detail": {
                "vitals": this.player.getVitals()
            }
        };

        changeVitalsEvent = new CustomEvent( "changeVitals", eventObject );

        this.canvas.dispatchEvent( changeVitalsEvent );
    };

    this.saveMap = function saveMap(){
        var eventObject;
        var changeMapEvent;

        this.existingMapData[this.level] = this.tileMap.map;

        eventObject = {
            "detail": {
                "map": this.tileMap.map,
                "level": this.level
            }
        };

        changeMapEvent = new CustomEvent( "changeMap", eventObject );

        this.canvas.dispatchEvent( changeMapEvent );
    };
};

export default Game;
