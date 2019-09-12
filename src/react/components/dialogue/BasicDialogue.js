// Libraries
import React from "react";

class BasicDialogue extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        return(
            <div className="dialogue">
                <p>{this.props.data.text}</p>
            </div>
        );
    }
};

export default BasicDialogue;
