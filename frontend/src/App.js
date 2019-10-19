import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const Sensors = React.lazy(() => import('./views/Sensors'));

class App extends Component {

  render() {
    return (
          <HashRouter>
              <React.Suspense fallback={loading()}>
                <Switch>
                  <Route path="/" name="Sensors" render={props => <Sensors {...props}/>} />
                </Switch>
              </React.Suspense>
          </HashRouter>
    );
  }
}

export default App;
