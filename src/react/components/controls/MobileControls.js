// Libraries
import React from "react";

class MobileControls extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        return (
            <div className="mobileControls">
                <div className="movementControls">
                    <div onMouseDown={() => this.mouseDown(37)} onMouseLeave={() => this.mouseLeave(37)} onMouseUp={() => this.mouseUp(37)} className="moveLeft">&larr;</div>
                    <div onMouseDown={() => this.mouseDown(38)} onMouseLeave={() => this.mouseLeave(38)} onMouseUp={() => this.mouseUp(38)} className="moveUp">&uarr;</div>
                    <div onMouseDown={() => this.mouseDown(39)} onMouseLeave={() => this.mouseLeave(39)} onMouseUp={() => this.mouseUp(39)} className="moveRight">&rarr;</div>
                    <div onMouseDown={() => this.mouseDown(40)} onMouseLeave={() => this.mouseLeave(40)} onMouseUp={() => this.mouseUp(40)} className="moveDown">&darr;</div>
                </div>
            </div>
        );
    }

    mouseDown( key ){
        this.props.keyDown( key );
    }

    mouseLeave( key ){
        this.props.keyUp( key );
    }

    mouseUp( key ){
        this.props.keyUp( key );
    }
};

export default MobileControls;
