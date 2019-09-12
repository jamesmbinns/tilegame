const defaultState = {
    "tileTo": {
        "x": 1,
        "y": 1
    }
};
const positionReducer = ( state = defaultState, action ) => {
    switch( action.type ){
        case "CHANGE_POSITION":
            return {
                "tileTo": action.tileTo
            };

        default:
            return state;
    }
};

export default positionReducer;
