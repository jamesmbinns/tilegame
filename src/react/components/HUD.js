// Libraries
import React from "react";

class HUD extends React.Component{
    constructor( props ){
        super( props );
    }

    render(){
        if( this.props.modalOpen ){
            return "";
        }

        return(
            <div className="hud">
                <p className="inventory" onClick={() => this.props.openInventory()}>Inventory</p>
                { this.renderVitals() }
            </div>
        );
    }

    renderVitals(){
        if( Object.keys( this.props.vitals ).length ){
            return(
                <div>
                    <p>Health: { this.props.vitals.health.value }</p>
                    <p>Thirst: { this.props.vitals.thirst.value }</p>
                    <p>Hunger: { this.props.vitals.hunger.value }</p>
                    <p>Bathroom: { this.props.vitals.bathroom.value }</p>
                </div>
            );
        }

        return "";
    }
};

export default HUD;
