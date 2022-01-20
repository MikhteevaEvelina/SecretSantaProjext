import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import HobbyStore from "./store/HobbyStore";
import ParticipantStore from "./store/ParticipantStore";
import RecipientStore from "./store/RecipientStore";

export const Context = createContext( null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        recipient: new RecipientStore(),
        participant: new ParticipantStore(),
        hobby: new HobbyStore(),
    }}>
        <App />
    </Context.Provider>,

  document.getElementById('root')
);
