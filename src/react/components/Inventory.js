// Libraries
import React from "react";

class Inventory extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "selected": []
        };
    }

    render(){
        if( this.props.inventory.length ){
            return (
                <div className="items">
                    <h1>INVENTORY</h1>
                    <ul>
                        <li><p>Type</p></li>
                        {
                            this.props.inventory.map(
                                ( item, i ) => {
                                    if( item.canUse ){
                                        return (
                                            <li key={i} onClick={() => this.clickItem(item)} className={this.isSelected(item)}>
                                                <p>{item.type} ( {item.quantity} )</p>
                                            </li>
                                        )
                                    }

                                    return (
                                        <li key={i}>
                                            <p>{item.type} ( {item.quantity} )</p>
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>
                    <button disabled={!this.state.selected.length} onClick={() => this.props.useItem( this.state.selected[0] ) }>Use</button>
                </div>
            );
        }
        else{
            return (
                <div className="items">
                    <h1>INVENTORY</h1>
                    <ul>
                        <li>You have no items</li>
                    </ul>
                </div>
            );
        }
    }

    clickItem( item ){
        this.setState( {
            "selected": [ item ]
        } );
    }

    isSelected( item ){
        if( this.state.selected[0] == item ){
            return "active";
        }

        return "";
    }

    closeModal(){
        this.props.cancel();
    }
};

export default Inventory;
