import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import React, { Component } from 'react';
import Home from './pages/Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}
