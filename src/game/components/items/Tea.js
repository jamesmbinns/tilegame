// Constructors
import Liquid from "game/components/items/constructors/Liquid.js";

var Tea = function tea( quantity ){
    Liquid.call( this, "Tea", quantity, 10 );
};

export default Tea;
