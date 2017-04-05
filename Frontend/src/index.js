import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { browserHistory, Router, Route, /* IndexRoute */ } from 'react-router'
import App from './pages/App';
import Home from './pages/Home';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Documentation from './pages/Documentation';
import Company from  './pages/Company';
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import Books from './pages/Books';
import auth from "./authorization/auth";
import Dashboard from './pages/Dashboard';
import ChangeBooks from './pages/ChangeBooks';


function requireAuth(nextState, replace) {
  if (!auth.loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="documentation" component={Documentation} />
      <Route path="company" component={Company} />
      <Route path="books" component={Books} />
      <Route path="change-books" component={ChangeBooks} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="user" component={UserPage} />
      <Route path="admin" component={AdminPage} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'))