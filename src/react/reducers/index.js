import { combineReducers } from "redux";
import inventoryReducer from "react/reducers/inventory.js";
import mapReducer from "react/reducers/map.js";
import levelReducer from "react/reducers/level.js";
import vitalsReducer from "react/reducers/vitals.js";
import positionReducer from "react/reducers/position.js";
import modalReducer from "react/reducers/modal.js";
import storyReducer from "react/reducers/story.js";

export default combineReducers( {
    "inventory": inventoryReducer,
    "map": mapReducer,
    "level": levelReducer,
    "vitals": vitalsReducer,
    "position": positionReducer,
    "modalIsOpen": modalReducer,
    "storyState": storyReducer
} );
