const inventoryReducer = ( state = [], action ) => {
    var added;
    var clonedState = state.slice( 0 );
    var i;
    var j;

    switch( action.type ){
        case "INVENTORY_ADD_ITEMS":
            for( i = 0; i < action.items.length; i++ ){
                added = false;

                for( j = 0; j < clonedState.length; j++ ){
                    if( action.items[i].type == clonedState[j].type ){
                        clonedState[j].quantity += action.items[i].quantity;
                        added = true;
                    }
                }

                if( !added ){
                    clonedState.push( action.items[i] );
                }
            }

            return clonedState;

        case "INVENTORY_REMOVE_ITEM":
            for( j = 0; j < clonedState.length; j++ ){
                if( action.item.type == clonedState[j].type ){
                    if( clonedState[j].quantity > 1 ){
                        clonedState[j].quantity--;
                    }
                    else{
                        clonedState.splice( j, 1 );
                    }
                }
            }

            return clonedState;

        case "INVENTORY_REMOVE_ITEMS":
            for( i = 0; i < action.items.length; i++ ){
                for( j = 0; j < clonedState.length; j++ ){
                    if( action.items[i].type == clonedState[j].type ){
                        clonedState[j].quantity -= action.items[i].quantity;
                    }

                    if( clonedState[j].quantity < 1 ){
                        clonedState.splice( j, 1 );
                    }
                }
            }

            return clonedState;

        default:
            return state;
    }
};

export default inventoryReducer;
