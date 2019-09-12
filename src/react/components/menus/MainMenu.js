// Libraries
import React from "react";

class DeadMenu extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        return(
            <div>
                <h1>Main Menu</h1>
                <button onClick={ () => this.props.startGame() }>Start Game</button>
                <button onClick={ () => this.props.loadGame() }>Load Game</button>
            </div>
        );
    }
};

export default DeadMenu;
