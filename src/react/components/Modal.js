// Libraries
import React from "react";

class Modal extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        var modalHTML;

        if( !this.props.show ){
            return null;
        }

        return(
            <div className="gameModal">
                <p className="cancel" onClick={this.closeModal.bind( this )}>x</p>
                {this.props.children}
            </div>
        );
    }

    closeModal(){
        this.props.cancel();
    }
};

export default Modal;
