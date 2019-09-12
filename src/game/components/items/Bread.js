// Constructors
import Food from "game/components/items/constructors/Food.js";

var Bread = function bread( quantity ){
    Food.call( this, "Bread", quantity, 5 );
};

export default Bread;
