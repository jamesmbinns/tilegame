// Libraries
import React from "react";

class QuestionDialogue extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        return(
            <div className="dialogue">
                <p>{this.props.data.text}</p>
                <ol className="response">
                    {
                        this.props.data.responses.map(
                            ( response, i ) => <li key={i} onClick={ () => this.props.callback( response.action ) }>{response.text}</li>
                        )
                    }
                </ol>
            </div>
        );
    }
};

export default QuestionDialogue;
