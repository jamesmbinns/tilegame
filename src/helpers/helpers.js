// Data
import maps from "content/data/maps.json";

var toIndex = function toIndex( x, y, level ){
    // Get index in array based upon x and y
    // y * mapW because each "row" in the array is mapW long
    return ( ( y * maps[level].mapW ) + x );
};

var getFrame = function getFrame( sprite, duration, time, animated ){
    var i = 0;
    var timeCut;

    if( !animated ){
        return sprite[0];
    }

    // Divide the current game time by the duration of a single sprite cycle
    // ( time to loop through entire sprite animation )
    // This allows us to loop the animation
    timeCut = time % duration;

    for( i in sprite ){
        if( sprite[i].end >= timeCut ){
            return sprite[i];
        }
    }
};

export {
    toIndex,
    getFrame
};
