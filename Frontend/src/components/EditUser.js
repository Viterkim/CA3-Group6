/**
 * Created by scheldejonas on 07/04/2017.
 */
import React, {Component} from 'react';
import userData from '../stores/dataHandlerUsers';
import {Link} from 'react-router';

class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.params.username
      , role: this.props.params.role
    };
    this.onUsernameChange = this.onTitleChange.bind(this);
    this.onRoleChange = this.onInfoChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.setRoleToUser = this.setRoleToUser.bind(this);
    this.setRoleToAdmin = this.setRoleToAdmin.bind(this);
  }

  setRoleToUser = (event) => {
    this.setState(
      {
        username: this.state.username
        ,role: 'User'
      }
    )
  };

  setRoleToAdmin = (event) => {
    this.setState(
      {
        username: this.state.username
        ,role: 'Admin'
      }
    )
  };

  updateUser = (event) => {
    let user = {
      username: this.state.username
      ,role: this.state.role
    };
    userData.setData(user);
  };

  onUsernameChange = (event) => {
    const newUsername = event.target.value;
    this.setState(
      {
        username: newUsername
        ,role: this.state.role
      }
    );
  };

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col s12">

            <h4>Edit User</h4>
            <div className="row">
              <div className="input-field col s9">
                <input onChange={this.onUsernameChange} id="usernameInput" type="text" value={this.state.username}
                       className="validate"
                        placeholder="username" />
              </div>
              <h4>Role</h4>
              <div className=" col s3">
                <ul id='userRoleDropdown' class='dropdown-content'>
                  <li><a onClick={this.setRoleToUser} href="#"><i class="material-icons">view_module</i>User</a></li>
                  <li><a onClick={this.setRoleToAdmin} href="#"><i class="material-icons">cloud</i>Admin</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="">
            <Link to="/change-users">
              <button onClick={this.updateUser} className="modal-action modal-close btn waves-effect waves-light"
                      type="submit" name="action">
                Submit
                <i className="material-icons right">send</i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUser;
