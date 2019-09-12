const mapReducer = ( state = {}, action ) => {
    switch( action.type ){
        case "CHANGE_MAP":
            /* eslint-disable no-console */
            console.log( "action.map", action.map );
            console.log( "action.level", action.level );

            return Object.assign(
                {},
                state,
                {
                    [action.level]: action.map
                }
            );

        default:
            return state;
    }
};

export default mapReducer;
