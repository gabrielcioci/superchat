import React from 'react';
import {Route, BrowserRouter as Router} from "react-router-dom"
import ChatRoom from "./ChatRoom";
import Login from "./Login";
import './App.scss';

function App() {
    return (
        <Router>
            <div className="App">
                <section>
                    <Route path="/" exact component={Login}/>
                    <Route path="/room/:name/:id" exact component={ChatRoom}/>
                </section>
            </div>
        </Router>
    );
}

export default App;
