// Libraries
import React from "react";
import Game from "game/game.js";
import { connect } from "react-redux";

// Actions
import {
    toggleModal,
    changeMap,
    changeVitals,
    addItems,
    removeItem,
    changeLevel,
    changePosition
} from "react/actions/index.js";

// Components
import Modal from "react/components/Modal.js";
import Dialogue from "react/components/dialogue/Dialogue.js";
import Inventory from "react/components/Inventory.js";
import ItemStack from "react/components/ItemStack.js";
import HUD from "react/components/HUD.js";
import Menu from "react/components/menus/Menu.js";
import DeadMenu from "react/components/menus/DeadMenu.js";
import MainMenu from "react/components/menus/MainMenu.js";

// Helpers
import npcHelper from "helpers/npcHelper.js";
import { clearState } from "react/helpers/localStorage.js";

let mapStateToProps = ( state ) => {
    return {
        "modalIsOpen": state.modalIsOpen,
        "inventory": state.inventory,
        "map": state.map,
        "vitals": state.vitals,
        "level": state.level,
        "position": state.position,
        "storyState": state.storyState
    };
}

let mapDispatchToProps = ( dispatch ) => ( {
    "toggleModal": () => dispatch( toggleModal() ),
    "changeMap": ( map, level ) => dispatch( changeMap( map, level ) ),
    "changeVitals": ( vitals ) => dispatch( changeVitals( vitals ) ),
    "addItems": ( items ) => dispatch( addItems( items ) ),
    "removeItem": ( item ) => dispatch( removeItem( item ) ),
    "changeLevel": ( level ) => dispatch( changeLevel( level ) ),
    "changePosition": ( tileTo ) => dispatch( changePosition( tileTo ) )
} );

class Home extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "modalChild": "",
            "modalData": "",
            "menuChild": "main"
        };
    }

    componentDidMount(){
        this.refs.canvas.addEventListener( "interact", this.interact.bind( this ) );
        this.refs.canvas.addEventListener( "changeMap", this.changeMap.bind( this ) );
        this.refs.canvas.addEventListener( "changeVitals", this.changeVitals.bind( this ) );
        this.refs.canvas.addEventListener( "playerDead", this.playerDied.bind( this ) );
        this.refs.canvas.addEventListener( "changeLevel", this.changeLevel.bind( this ) );
        this.refs.canvas.addEventListener( "changePosition", this.changePosition.bind( this ) );
    }

    render(){
        var windowWidth = window.innerWidth;
        var width;

        if( windowWidth >= 768 ){
            width = 600;
        }

        if( windowWidth < 768 && windowWidth >= 400 ){
            width = 400;
        }

        if( windowWidth < 400 ){
            width = windowWidth;
        }

        return (
            <div className="gameContainer">
                <canvas id="game" ref="canvas" width={ width } height={ width }></canvas>
                <Modal show={ this.props.modalIsOpen } cancel={this.cancelInteract.bind(this)}>
                    {this.getModalChild()}
                </Modal>
                <HUD modalOpen={this.state.modalChild} openInventory={this.openInventory.bind(this)} vitals={this.props.vitals}/>
                <Menu open={this.state.menuChild}>
                    {this.getMenuChild()}
                </Menu>
            </div>
        );
    }

    startGame(){
        const context = this.refs.canvas.getContext( "2d" );
        let game;

        clearState();

        game = new Game( this.refs.canvas, context );

        // Initialize level 1
        game.initialize( 1 );

        this.setState( {
            "menuChild": ""
        } );
    }

    loadGame(){
        const context = this.refs.canvas.getContext( "2d" );
        const game = new Game( this.refs.canvas, context );
        let loadGameObject = {
            "detail": {
                "map": this.props.map,
                "vitals": this.props.vitals,
                "level": this.props.level,
                "position": this.props.position
            }
        };
        let loadGameEvent = new CustomEvent( "loadGame", loadGameObject );

        // Initialize saved level
        game.initialize( this.props.level );

        this.refs.canvas.dispatchEvent( loadGameEvent );

        this.setState( {
            "menuChild": ""
        } );
    }

    cancelInteract(){
        var cancelEvent = new CustomEvent( "cancelInteract" );

        this.setState( {
            "modalChild": "",
            "modalData": ""
        } );

        this.props.toggleModal();

        this.refs.canvas.dispatchEvent( cancelEvent );
    }

    // @TODO: Refactor to be general
    interact( event ){
        if( event.detail.npc ){
            this.setState( {
                "modalChild": "dialogue",
                "modalData": npcHelper.getStory( event.detail.npc.id, this.props.storyState, this.props.inventory )
            } );
        }

        if( event.detail.itemStack ){
            this.setState( {
                "modalChild": "itemStack",
                "modalData": event.detail.itemStack
            } );
        }

        this.props.toggleModal();
    }

    getModalChild(){
        switch( this.state.modalChild ){
            case "dialogue":
                return <Dialogue data={this.state.modalData} cancel={this.cancelInteract.bind(this)}/>;

            case "itemStack":
                return <ItemStack data={this.state.modalData} cancel={this.cancelInteract.bind(this)} setItems={this.setItems.bind(this)}/>;

            case "inventory":
                return <Inventory inventory={this.props.inventory} cancel={this.cancelInteract.bind(this)} useItem={this.useItem.bind(this)}/>;

            default:
                return "";
        }
    }

    getMenuChild(){
        switch( this.state.menuChild ){
            case "main":
                return <MainMenu startGame={this.startGame.bind(this)} loadGame={this.loadGame.bind(this)}/>;

            case "playerDead":
                return <DeadMenu restartGame={this.restartGame.bind(this)}/>;

            default:
                return "";
        }
    }

    setItems( takenItems, leftItems ){
        var eventObject = {
            "detail": {
                "leftItems": leftItems
            }
        };
        var leftItemsEvent = new CustomEvent( "setItems", eventObject );

        // Send left items back to canvas to update tile
        this.refs.canvas.dispatchEvent( leftItemsEvent );

        this.props.addItems( takenItems );

        this.cancelInteract();
    }

    openInventory(){
        this.setState( {
            "modalChild": "inventory"
        } );

        this.props.toggleModal();
    }

    changeMap( event ){
        this.props.changeMap( event.detail.map, event.detail.level );
    }

    changeVitals( event ){
        this.props.changeVitals( event.detail.vitals );
    }

    changeLevel( event ){
        this.props.changeLevel( event.detail.level);
    }

    changePosition( event ){
        this.props.changePosition( event.detail.tileTo );
    }

    playerDied(){
        this.setState( {
            "menuChild": "playerDead"
        } );
    }

    restartGame(){
        var restartGameEvent = new CustomEvent( "restartGame" );

        this.setState( {
            "menuChild": ""
        } );

        this.refs.canvas.dispatchEvent( restartGameEvent );
    }

    useItem( item ){
        var eventObject = {
            "detail": {
                "item": item
            }
        };
        var useItemEvent = new CustomEvent( "useItem", eventObject );

        // Let canvas know to update Character
        this.refs.canvas.dispatchEvent( useItemEvent );

        this.props.removeItem( item );
    }

    moveKeyDown( key ){
        var eventObject = {
            "detail": {
                "key": key
            }
        };
        var keyDownEvent = new CustomEvent( "mobileKeyDown", eventObject );

        this.refs.canvas.dispatchEvent( keyDownEvent );
    }

    moveKeyUp( key ){
        var eventObject = {
            "detail": {
                "key": key
            }
        };
        var keyUpEvent = new CustomEvent( "mobileKeyUp", eventObject );

        this.refs.canvas.dispatchEvent( keyUpEvent );
    }
};

let ConnectedHome = connect( mapStateToProps, mapDispatchToProps )( Home );

export default ConnectedHome;
