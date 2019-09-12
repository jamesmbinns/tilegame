// Libraries
import React from "react";
import { connect } from "react-redux";

// Components
import BasicDialogue from "react/components/dialogue/BasicDialogue.js";
import QuestionDialogue from "react/components/dialogue/QuestionDialogue.js";

// Helpers
import itemConstructor from "helpers/itemConstructor.js";

// Actions
import {
    addItems,
    removeItems,
    updateStoryState
} from "react/actions/index.js";

let mapDispatchToProps = ( dispatch ) => ( {
    "addItems": ( items ) => dispatch( addItems( items ) ),
    "removeItems": ( items ) => dispatch( removeItems( items ) ),
    "updateStoryState": ( updatedState ) => dispatch( updateStoryState( updatedState ) )
} );

class Dialogue extends React.Component{
    constructor( props ){
        super( props );

        /* eslint-disable no-console */
        console.log( "props", props );

        this.state = {
            "storyLocation": props.data.storyLocation
        };
    }

    render(){
        return this.getDialogueHTML();
    }

    getDialogueHTML(){
        switch( this.props.data.npcJson.story[this.state.storyLocation].type ){
            case "question":
                return <QuestionDialogue
                    data={this.props.data.npcJson.story[this.state.storyLocation]}
                    callback={this.actionCallback.bind( this) }
                />;

                break;

            default:
                return <BasicDialogue
                    data={this.props.data.npcJson.story[this.state.storyLocation]}
                    callback={this.actionCallback.bind( this) }
                    />;

        }
    }

    actionCallback( action ){
        if( action == "exit" ){
            this.closeModal();
        }
        else{
            this.handleComplexAction( action );
        }
    }

    handleComplexAction( action ){
        var items;

        if( action.updatedStoryState ){
            this.props.updateStoryState( action.updatedStoryState );
        }

        if( action.giveItems ){
            items = action.giveItems.map(
                ( item ) => itemConstructor( item )
            );

            this.props.addItems( items );

        }

        if( action.takeItems ){
            this.props.removeItems( action.takeItems );
        }

        if( action.storyLocation ){
            this.setState( {
                "storyLocation": action.storyLocation
            } );
        }
        else{
            this.closeModal();
        }
    }

    closeModal(){
        this.setState( {
            "storyLocation": "intro"
        } );

        this.props.cancel();
    }
};

let ConnectedDialogue = connect( null, mapDispatchToProps )( Dialogue );

export default ConnectedDialogue;
