// Libraries
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import rootReducer from "react/reducers/index.js";

// Components
import App from "react/App.js";
import { loadState, saveState } from "react/helpers/localStorage.js";

// Styles
import style from "style.scss";

const persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(
    () => {
        saveState( {
            "inventory": store.getState().inventory,
            "map": store.getState().map,
            "vitals": store.getState().vitals,
            "level": store.getState().level,
            "position": store.getState().position,
            "storyState": store.getState().storyState
        } );
    }
);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById( "content" )
);
