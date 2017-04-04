import React, { Component } from 'react'
import { Link } from "react-router";
import auth from '../authorization/auth'
import { observer } from "mobx-react";

import {useStrict} from "..//stores/useStrict"

import { Navbar, NavItem, Footer } from 'react-materialize';

const App = observer(class App extends Component {

  render() {
    const logInStatus = auth.loggedIn ? "Logged in as: " + auth.userName : "";
    return (
      <div>

        <Navbar brand='Book Store' left>
          <NavItem href='/'>Home</NavItem>
          <NavItem href='/docs'>Documentation</NavItem>
          <NavItem href='/'>Products</NavItem>
          <NavItem href='/company'>Company</NavItem>
          <NavItem href='#'>Add/Edit Books</NavItem>
          <NavItem href='#'>Add/Edit Users</NavItem>
          {auth.isUser ? <li><Link to="/user">Page for Users </Link></li> : null}
          {auth.isAdmin ? <li><Link to="/admin">Page for Admins </Link></li> : null}
          <NavItem href='/login'>Login</NavItem>
        </Navbar>

        {this.props.children || <p>You are {!auth.loggedIn && 'not'} logged in.</p>}

        <Footer copyrights="&copy; 2015 Copyright Text"
                moreLinks={
                  <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                }
                links={
                  <ul>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                  </ul>
                }
                className='example'
        >
          <h5 className="white-text">Footer Content</h5>
          <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </Footer>
      </div>
    )
  }
})

export default App;

{/*<nav className="navbar navbar-default" >*/}
{/*<div className="container-fluid">*/}
{/*<div className="navbar-header">*/}
{/*<a className="navbar-brand" href="#">Semester Seed</a>*/}
{/*</div>*/}
{/*<ul className="nav navbar-nav">*/}
{/*<li><Link to="/about">About</Link></li>*/}
{/*{auth.isUser ? <li><Link to="/user">Page for Users </Link></li> : null}*/}
{/*{auth.isAdmin ? <li><Link to="/admin">Page for Admins </Link></li> : null}*/}
{/*<li><Link to="/dashboard">Dashboard (authenticated) </Link> </li>*/}
{/*</ul>*/}
{/*<ul className="nav navbar-nav navbar-right">*/}
{/*<li className="navbar-text" style={{ color: "steelBlue" }}>{logInStatus}</li>*/}
{/*<li>*/}
{/*{auth.loggedIn ?*/}
{/*(*/}
{/*<Link to="/logout"><span className="glyphicon glyphicon-log-in"></span> Logout</Link>*/}
{/*) :*/}
{/*(*/}
{/*<Link to="/login">*/}
{/*<span className="glyphicon glyphicon-log-out"></span> Login </Link>*/}
{/*)}*/}
{/*</li>*/}
{/*</ul>*/}
{/*</div>*/}
{/*</nav>*/}
