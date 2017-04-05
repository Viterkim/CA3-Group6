import React, { Component } from 'react'
import { observer } from "mobx-react";
import { Link } from 'react-router';
import EditBook from "../components/EditBook";

const Home = observer(class Home extends Component {

  render() {
    return (
      <div>
        <div className="parallax-container">
          <div className="row">
            <div className="col s12">
              <p>
                <br/>
                <br/>
                <br/>
                <br/>
              </p>
              <a href="#modal1" className="modal-trigger btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
              <h1 className="header center orange-text text-lighten-2">Welcome to our project</h1>
              <div className="row center">
                <h5 className="header col s12 light">A modern single page book store application</h5>
              </div>
              <div className="row center">
                <Link to='/books' id="download-button" className="btn-large waves-effect waves-light orange lighten-1">Books</Link>
              </div>
              <p>
                <br/>
                <br/>
                <br/>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="section background_white">
            <div className="row">
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
                  <h5 className="center">React</h5>
                  <p className="light">We did most of the heavy lifting in react for us to show this single page application can do we tell it to do.</p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text"><i className="material-icons">group</i></h2>
                  <h5 className="center">Group 6</h5>
                  <p className="light">By using the communication together pair by pair. We problem solved the setups for each task one by one over teamspeak. Also we were using Teamviewer to teach and discuss over for collaboration.</p>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="icon-block">
                  <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
                  <h5 className="center">Coding</h5>
                  <p className="light">The setup used for this single page application is React and a lot of Boilerplate code with this. On the backend we have a JAX-RS in java setup on a tomcat server with a MySQL handlingen all the data requests.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="parallax">
            <img id="paralaxImageOne" src="/background_frontpage.jpg" alt="Error"/>
          </div>
        </div>
      </div>
    )
  }
});

export default Home;
