import React, { Component } from 'react'
import { Link } from "react-router";
import NavLink from '../components/NavLink';
import auth from '../authorization/auth'
import { observer } from "mobx-react";

import {useStrict} from "..//stores/useStrict"

import { Footer } from 'react-materialize';

const App = observer(class App extends Component {

  render() {
    const logInStatus = auth.loggedIn;
    console.log(logInStatus);
    const userName = auth.userName;
    return (
      <div>

        <div className="container">

          <nav className="orange ligten-1" role="navigation">
            <div className="nav-wrapper padding_left_right_normal">

              <Link id="logo-container" to="/" className="brand-logo">Book Store</Link>

              <ul className="right hide-on-med-and-down">
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/documentation'>Documentation</NavLink></li>
                <li><NavLink to='/company'>Company</NavLink></li>
                <li><NavLink to='/books'>Products</NavLink></li>
                <li>{auth.isUser ? <NavLink to='#'>Add/Edit Books</NavLink> : null}</li>
                <li>{auth.isUser ? <NavLink to='#'>Add/Edit Users</NavLink> : null}</li>
                <li>{auth.isUser ? <NavLink to='/logout'>Log out</NavLink> : <NavLink to='/login'>Log in</NavLink>}</li>
                <li>{auth.isUser ? <li>Profile: {userName}</li> : null}</li>
              </ul>

              <ul id="nav-mobile" className="side-nav">
                <li>Not setup yet</li>
              </ul>
              <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>

            </div>
          </nav>

        </div>

        {this.props.children}

        <div className="container">
          <Footer copyrights="&copy; 2015 Copyright Text"
                  moreLinks={
                    <a className="grey-text text-lighten-4 right" href="https://github.com/Viterkim/CA3-Group6" target="blank">Github Repo</a>
                  }
                  links={
                    <ul>
                      <li className="margin_bottom_one"><Link className="grey-text text-lighten-3" to="/documentation">Documentation</Link></li>
                      <li className="margin_bottom_one"><Link className="grey-text text-lighten-3" to="/books">Products</Link></li>
                      <li className="margin_bottom_one"><Link className="grey-text text-lighten-3" to="/company">Company</Link></li>
                    </ul>
                  }
                  className='orange lighten-1'
          >
            <h5 className="white-text">cphbusiness AP degree in Computer Science</h5>
            <p className="grey-text text-lighten-4">We are group #6</p>
          </Footer>
        </div>

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
