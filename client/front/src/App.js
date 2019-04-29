import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';


import CreateCard from './components/CreateCard';
import Cards from './components/Cards';


const App = () => {

    return (
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
    );
}

export default App;