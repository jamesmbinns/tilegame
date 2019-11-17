# 2D Tile Game Engine

This is a small 2D game engine built using the native DOM Canvas API. A small React application is used to serve the engine and create game components such as menu systems, inventory, dialogue, etc. React and Canvas communicate via the use of the DOM's [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent). The engine was based loosely on the game [Don't Starve](https://www.klei.com/games/dont-starve) and mimics the general survival life-cycle of the game.

In this engine the character has Health, Thirst, Hunger, and Bathroom visible in the text-only HUD in the top right hand corner. The engine constantly reduces Thirst, Hunger, and Bathroom. When these values are at 0, Health is steadily reduced. When Health hits 0, the player dies and is presented with a a "You Died" screen to restart the game. The player can click on ```Inventory``` in the HUD and consume/use bread and tea to boost their Hunger and Thirst, respectively.

### Live Demo
[Heroku Link](https://jamietilegame.herokuapp.com)

### Steps to Run Locally
1. Clone the repo and ensure you have ```npm``` installed on your local machine
2. Navigate to the repo directory on your local machine and run ```npm install``` followed by ```npm run dev```
3. In your browser navigate to localhost:8080
4. Click ```Start Game``` to play
5. Arrow keys move the character, spacebar allows you to speak with NPCs and pick up objects off the ground

### Files Worth Reviewing
If you would like to review my JavaScript code, I recommend the following files:
1. /src/react/pages/Home.js - This is the main React page that renders and builds the Canvas element along with supporting React components
2. /src/game/game.js - A good example of vanilla JavaScript, this is the main game engine file that kicks off the engine and all game components ( Character, Tiles, Map, etc. )
3. /src/game/components/Character.js
