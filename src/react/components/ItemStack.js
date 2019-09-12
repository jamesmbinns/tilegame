// Libraries
import React from "react";

class ItemStack extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "selected": []
        };
    }

    render(){
        return (
            <div className="items">
                <h1>ITEMS</h1>
                <ul>
                    <li><p>Type</p><span>Quantity</span></li>
                    {
                        this.props.data.items.map(
                            ( item, i ) => {
                                return (
                                    <li key={i} onClick={() => this.clickItem(i)} className={this.isSelected(i)}>
                                        <p>{item.type}</p>
                                        <p>{item.quantity}</p>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                <button onClick={() => this.getAllItems()}>Take All</button>
                <button disabled={!this.state.selected.length} onClick={() => this.setItems()}>Take</button>
            </div>
        );
    }

    clickItem( i ){
        var index = this.state.selected.indexOf( i );
        var cloned;

        if( index == -1 ){
            this.setState( {
                "selected": [ ...this.state.selected, i ]
            } );
        }
        else{
            cloned = this.state.selected.slice( 0 );
            cloned.splice( index, 1 );

            this.setState( {
                "selected": cloned
            } );
        }
    }

    isSelected( i ){
        if( this.state.selected.indexOf( i ) != -1 ){
            return "active";
        }

        return "";
    }

    setItems(){
        var takenItems = [];
        var leftItems = [];
        var i;

        for( i = 0; i < this.props.data.items.length; i++ ){
            if( this.state.selected.indexOf( i ) == -1 ){
                leftItems.push( this.props.data.items[i] );
            }
            else{
                takenItems.push( this.props.data.items[i] );
            }
        }

        this.props.setItems( takenItems, leftItems );
    }

    getAllItems(){
        this.props.setItems( this.props.data.items, [] );
    }
};

export default ItemStack;
