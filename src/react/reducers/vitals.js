const vitalsReducer = ( state = {}, action ) => {
    switch( action.type ){
        case "CHANGE_VITALS":
            return Object.assign( {}, action.vitals );

        default:
            return state;
    }
};

export default vitalsReducer;
