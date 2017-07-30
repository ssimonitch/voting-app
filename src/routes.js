import React from 'react';
import App from './containers/AppContainer';
import SignUp from './components/SignUp/SignUp';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/signup" component={SignUp} />
      </div>
    </Router>
  );
};

export default Routes;
