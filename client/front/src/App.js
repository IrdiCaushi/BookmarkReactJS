import React, { Component, Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import './index.css';


import CreateCard from './components/CreateCard';
import Cards from './components/Cards';


const App = () => {

    return (
      <Router>
          <Fragment>

              <nav className="navigation">
                <a><img height="40px"  src={logo} /><h2>Irdi's Project</h2></a>
              </nav>

              <main>
                  <div className="leftContent">
                      <CreateCard />
                  </div>

                  <div className="rightContent">
                      <Cards />
                  </div>
              </main>
          </Fragment>
      </Router>
    );
}

export default App;