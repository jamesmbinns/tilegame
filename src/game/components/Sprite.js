var Sprite = function sprite( data ){
    var i;

    this.animated = data.length > 1;
    this.frameCount = data.length;
    this.duration = 0;
    this.loop = true;

    if( data.length > 1 ){
        for( i in data ){
            // Set default duration if it doesn't exist
            if( typeof data[i].d == "undefined" ){
                data[i].d = 100;
            }

            // Sprite duration equals sum of all frame durations
            this.duration += data[i].d;

            if( typeof data[i].loop != "undefined" ){
                this.loop = data[i].loop ? true : false;
            }
        }
    }

    this.frames = data;
};

Sprite.prototype.draw = function draw( time, x, y, context, tileset ){
    var frameIndex = 0;
    var totalDuration;
    var offset;
    var i;

    if(
        !this.loop &&
        this.animated &&
        time >= this.duration
    ){
        frameIndex = ( this.frames.length - 1 );
    }
    else if( this.animated ){
        time = time % this.duration;
        totalDuration = 0;

        for( i in this.frames ){
            totalDuration += this.frames[i].d;
            frameIndex = i;

            if( time <= totalDuration ){
                break;
            }
        }
    }

    offset = ( typeof this.frames[frameIndex].offset == "undefined" ? { "x": 0, "y": 0 } : this.frames[frameIndex].offset );

    context.drawImage(
        tileset,
        this.frames[frameIndex].x,
        this.frames[frameIndex].y,
        this.frames[frameIndex].w,
        this.frames[frameIndex].h,
        x + offset.x,
        y + offset.y,
        this.frames[frameIndex].w,
        this.frames[frameIndex].h
    );
};

export default Sprite;
