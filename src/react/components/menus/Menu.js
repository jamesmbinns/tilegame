// Libraries
import React from "react";

class Menu extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        if( this.props.open ){
            return(
                <div className="menu">
                    {this.props.children}
                </div>
            );
        }

        return "";
    }
};

export default Menu;
