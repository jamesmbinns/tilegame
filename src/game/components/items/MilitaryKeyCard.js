// Constructors
import StoryItem from "game/components/items/constructors/StoryItem.js";

var MilitaryKeyCard = function militaryKeyCard( quantity ){
    StoryItem.call( this, "Military Key Card", quantity );
};

export default MilitaryKeyCard;
