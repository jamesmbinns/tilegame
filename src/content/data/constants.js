// Components
import Sprite from "game/components/Sprite.js";

var constants = {
    "tileW": 40,
    "tileH": 40,
    "directions": {
        "up": 0,
        "right": 1,
        "down": 2,
        "left": 3
    },
    "vitalsCheck": {
        "hunger": 4000,
        "thirst": 2000,
        "bathroom": 6000
    },
    "speeds": [
        {
            "name": "Normal",
            "mult": 1
        },
        {
            "name": "Slow",
            "mult": 0.3
        },
        {
            "name": "Fast",
            "mult": 3
        },
        {
            "name": "Paused",
            "mult": 0
        }
    ],
    "objectCollision": {
        "none": 0,
        "solid": 1
    },
    "objectTypes": {
        "1": {
            "name": "box",
            "sprite": new Sprite( [
                {
                    "x": 40,
                    "y": 160,
                    "w": 40,
                    "h": 40
                }
            ] ),
            "offset": {
                "x": 0,
                "y": 0
            },
            "collision": 1,
            "zIndex": 1
        },
        "2": {
            "name": "brokenBox",
            "sprite": new Sprite( [
                {
                    "x": 40,
                    "y": 200,
                    "w": 40,
                    "h": 40
                }
            ] ),
            "offset": {
                "x": 0,
                "y": 0
            },
            "collision": 0,
            "zIndex": 1
        },
        "3": {
            "name": "tree",
            "sprite": new Sprite( [
                {
                    "x": 80,
                    "y": 160,
                    "w": 80,
                    "h": 80
                }
            ] ),
            "offset": {
                "x": -20,
                "y": -20
            },
            "collision": 0,
            "zIndex": 3
        }
    },
    "itemTypes": {
        "activeStack": {
            "sprite": new Sprite( [
                {
                    "x": 240,
                    "y": 40,
                    "w": 40,
                    "h": 40
                }
            ] ),
            "offset": {
                "x": 0,
                "y": 0
            }
        },
        "1": {
            "name": "Star",
            "maxStack": 2,
            "sprite": new Sprite( [
                {
                    "x": 240,
                    "y": 0,
                    "w": 40,
                    "h": 40
                }
            ] ),
            "offset": {
                "x": 0,
                "y": 0
            }
        }
    }
};

export default constants;
