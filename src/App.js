import React from 'react';
import {Route, BrowserRouter as Router} from "react-router-dom"
import Chat from "./Chat";
import Login from "./Login";
import CreateRoom from "./CreateRoom";
import './App.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <section>
                    <Route path="/" exact component={Login}/>
                    <Route path="/rooms" exact component={CreateRoom}/>
                    <Route path="/room/:name/:id" exact component={Chat}/>
                </section>
            </div>
        </Router>
    );
}

export default App;
