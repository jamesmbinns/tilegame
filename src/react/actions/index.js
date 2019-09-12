export const toggleModal = () => ( {
    "type": "TOGGLE_MODAL"
} );

export const changeMap = ( map, level ) => ( {
    "type": "CHANGE_MAP",
    "map": map,
    "level": level
} );

export const changeVitals = ( vitals ) => ( {
    "type": "CHANGE_VITALS",
    "vitals": vitals
} );


export const addItems = ( items ) => ( {
    "type": "INVENTORY_ADD_ITEMS",
    "items": items
} );

export const removeItem = ( item ) => ( {
    "type": "INVENTORY_REMOVE_ITEM",
    "item": item
} );

export const removeItems = ( items ) => ( {
    "type": "INVENTORY_REMOVE_ITEMS",
    "items": items
} );

export const changeLevel = ( level ) => ( {
    "type": "CHANGE_LEVEL",
    "level": level
} );

export const changePosition = ( tileTo ) => ( {
    "type": "CHANGE_POSITION",
    "tileTo": tileTo
} );

export const updateStoryState = ( updatedStoryState ) => ( {
    "type": "CHANGE_STORY",
    "updatedStoryState": updatedStoryState
} );
