import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./views/Header";
import Splash from "./views/Splash"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <div>
              <Switch>
                  <Route path="/book_track/disclaimer">
                      <Splash />
                  </Route>
                  <Route path="/book_track">
                      <Header />
                  </Route>
              </Switch>
          </div>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
