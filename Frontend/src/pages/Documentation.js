/**
 * Created by scheldejonas on 04/04/2017.
 */
import React, {Component} from "react";

export default class Documentation extends Component{
  render() {
    return (
      <div className="container">
        <p>
          <br/>
          <br/>
          <br/>
        </p>
        <div className="row">
          <div className="col s12 center">
            <a className="btn-large waves-effect waves-light orange lighten-1" href="https://github.com/Viterkim/CA3-Group6">Github Repo</a>
          </div>
        </div>
        <p>
          <br/>
        </p>
        <div className="section background_white">
          <div className="row">
            <div className="col s12">
              <div className="padding_left_right_normal">
                <h4 className="center">Documentation</h4>
                <iframe id="documentation_frame" src="https://docs.google.com/document/d/1paf7ajRg6FARcwwjrcU7PZmRssfT5Xpa_VcHRk4DWvI/pub?embedded=true"></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="parallax">
          <img id="paralaxImageOne" src="/background_frontpage.jpg" alt="Error"/>
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
        </p>
      </div>
    );
  }
};