import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './assets/styles/index.scss';
import Home from './components/Home/Home';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </>
  );
};

export default App;
