// Items
import Tea from "game/components/items/Tea.js";
import Bread from "game/components/items/Bread.js";
import MilitaryKeyCard from "game/components/items/MilitaryKeyCard.js";

var itemConstructors = {
    "1": Tea,
    "2": Bread,
    "3": MilitaryKeyCard
};

var ItemConstructor = function itemConstructor( item ){
    var Constructor = itemConstructors[item.type];

    return new Constructor( item.quantity );
};

export default ItemConstructor;
