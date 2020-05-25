// src/App.js

import React from "react";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import './Home.css';
// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Home from "./components/Home";
import ConcertAdmin from "./components/ConcertAdmin";
import history from "./utils/history";
import Statistics from './components/Statistics';

function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/concert" component={ConcertAdmin} />
          <PrivateRoute path="/statistics" component={Statistics} />
        </Switch>
      </Router>
    </div>
  );
}



export default App;