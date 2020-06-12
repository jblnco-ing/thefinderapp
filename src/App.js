import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebaseConfig from './firebaseConfig';
import { FirebaseAppProvider } from 'reactfire';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Error from './views/Error';
import { Loading } from './components/Loading';

function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback={<Loading/>}>
        <Router>
          <Switch>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/">
              <Dashboard /> 
            </Route>
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </FirebaseAppProvider>
  );
}

export default App;
