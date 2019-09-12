const defaultState = {
    "receivedMilitaryCard": false,
    "gaveMilitaryCard": false
};

const storyReducer = ( state = defaultState, action ) => {
    switch( action.type ){
        case "CHANGE_STORY":
            return Object.assign( state, action.updatedStoryState );

        default:
            return state;
    }
};

export default storyReducer;
