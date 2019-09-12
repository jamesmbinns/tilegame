// Data
import npcJSON from "content/data/npcs/npc1.json";

var npc1 = function npc1( gameState ){
    var storyLocation = "intro";

    if( gameState.receivedMilitaryCard ){
        storyLocation = "receivedMilitaryCard";
    }

    if( gameState.gaveMilitaryCard ){
        storyLocation = "gaveMilitaryCard";
    }

    return {
        "storyLocation": storyLocation,
        "npcJson": npcJSON
    };
};

export default npc1;
