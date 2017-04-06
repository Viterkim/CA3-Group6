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
import Books from './pages/Books';
import auth from "./authorization/auth";
import ChangeBooks from './pages/ChangeBooks';
import EditBook from './components/EditBook';
import ChangeUsers from './pages/ChangeUsers';
import EditUser from './components/EditUser';

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
      <Route path="book/:id/:title/:info/:user" component={EditBook} />
      <Route path="change-books" component={ChangeBooks} />
      <Route path="change-users" component={ChangeUsers} />
      <Route path="user/:username/:role" component={EditUser} />
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
    </Route>
  </Router>
), document.getElementById('root'))
