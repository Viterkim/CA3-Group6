import React, {Component} from "react";

export default class About extends Component{
  render() {
    return (
      <div className="container">
        <p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </p>
        <div className="section background_white">
          <div className="row">
            <div className="col s12">
              <div className="padding_left_right_normal">
                <h4 className="center">About us</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="padding_left_right_normal center">
                <p>This page is suppose to display the company's strengths and elevator speech in a clean simpel designed layout.</p>
                <br/>
                <div class="row">
                  <div className="col s12 center">
                    <a href="https://viter.dk" id="download-button" className="btn-large waves-effect waves-light orange">See Our Page</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </p>
        <div className="parallax">
          <img id="paralaxImageOne" src="/background_frontpage.jpg" alt="Error"/>
        </div>
      </div>
    )
  }
}