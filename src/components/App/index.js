import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from '@components/Header';
import Auth from '@components/Auth';
import Dashboard from '@components/Dashboard';

import '../../index.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <Header/>
          <Route exact path="/" component={() => (<Redirect to={{ pathname: '/dashboard' }}/>)} />
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
