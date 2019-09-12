// Libraries
import React from "react";

class DeadMenu extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        return(
            <div>
                <h1>You Are Now Dead</h1>
                <button onClick={ () => this.props.restartGame() }>Restart Game</button>
            </div>
        );
    }
};

export default DeadMenu;
