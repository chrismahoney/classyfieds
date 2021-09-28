import React from 'react';

import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import AppFrame from './Pages/AppFrame';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Listings from './Pages/Listings';
import Listing from './Pages/Listing';

function App() {
  return (
    <>
      <Router>
        <AppFrame />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />

        <Route exact path="/listings" component={Listings} />
        <Switch>
          <Route exact path="/listing/:id" children={<Listing />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
