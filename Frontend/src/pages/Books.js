/**
 * Created by scheldejonas on 04/04/2017.
 */
import React, {Component} from "react";

export default class Books extends Component{
  render() {
    return (
      <div className="container">
        <div className="section background_white">
          <div className="row">
            <div className="col s12">
              <div className="padding_left_right_normal">
                <h4 className="center">Books</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="parallax">
          <img id="paralaxImageOne" src="/background_frontpage.jpg"/>
        </div>
      </div>
    )
  }
}