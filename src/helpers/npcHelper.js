// NPCs
import npc1 from "content/data/npcs/npc1.js";
import npc2 from "content/data/npcs/npc2.js";
import npc3 from "content/data/npcs/npc3.js";

var npcs = {
    "1": npc1,
    "2": npc2,
    "3": npc3
};

var npcHelper = {
    getStory( id, gameState, inventory ){
        return npcs[id].call( this, gameState, inventory );
    }
};

export default npcHelper;
