// Data
import npcJSON from "content/data/npcs/npc2.json";

// Lodash
import find from "lodash/find";

var npc2;

function hasTwoBread( inventory ){
    var bread = find( inventory, { "type": "Bread" } );

    if( bread && bread.quantity >= 2 ){
        return true;
    }

    return false;
}

npc2 = function npc2Func( gameState, inventory ){
    var storyLocation = "intro";

    if( hasTwoBread( inventory ) ){
        storyLocation = "hasTwoBread";
    }

    if( gameState.receivedMilitaryCard ){
        storyLocation = "receivedMilitaryCard";
    }

    return {
        "storyLocation": storyLocation,
        "npcJson": npcJSON
    };
};

export default npc2;
