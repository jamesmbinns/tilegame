const levelReducer = ( state = 1, action ) => {
    switch( action.type ){
        case "CHANGE_LEVEL":
            /* eslint-disable no-console */
            console.log( "changeLevel - action", action );

            return action.level;

        default:
            return state;
    }
};

export default levelReducer;
