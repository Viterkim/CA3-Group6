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
      oldUsername: this.props.params.username
      ,newUsername: this.props.params.username
      ,password: ''
      ,role: this.props.params.role
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.setRoleToUser = this.setRoleToUser.bind(this);
    this.setRoleToAdmin = this.setRoleToAdmin.bind(this);
  }

  setRoleToUser = (event) => {
    this.setState(
      {
        oldUsername: this.state.oldUsername
        ,newUsername: this.state.newUsername
        ,password: this.state.password
        ,role: 'User'
      }
    )
  };

  setRoleToAdmin = (event) => {
    this.setState(
      {
        oldUsername: this.state.oldUsername
        ,newUsername: this.state.newUsername
        ,password: this.state.password
        ,role: 'Admin'
      }
    )
  };

  updateUser = (event) => {
    let user = {
      oldUsername: this.state.oldUsername
      ,newUsername: this.state.newUsername
      ,password: this.state.password
      ,role: this.state.role
    };
    userData.setData(user);
  };

  onUsernameChange = (event) => {
    const newUsername = event.target.value;
    this.setState(
      {
        newUsername: newUsername
        ,password: this.state.password
        ,role: this.state.role
      }
    );
  };

  onPasswordChange = (event) => {
    const newPassword = event.target.value;
    this.setState(
      {
        newUsername: this.state.newUsername
        ,password: newPassword
        ,role: this.state.role
      }
    );
  };

  render() {
    return (
      <div className="container">
        <p>
          <br/>
          <br/>
          <br/>
        </p>
        <div className="row">
          <div className="col s12">
            <div className="padding_left_right_normal">
              <h4>Edit User</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s9">
            <div className="padding_left_right_normal">
                <input disabled onChange={this.onUsernameChange} id="usernameInput" type="text" value={this.state.oldUsername}
                       className="validate"
                        placeholder="username" />
            </div>
          </div>
          <div className=" col s3">
            <div className="padding_left_right_normal">
              <a className='dropdown-button btn' data-activates='userRoleDropdown'>Choose Role</a>
              <ul id='userRoleDropdown' className='dropdown-content'>
                <li>
                  <a onClick={this.setRoleToUser}><i className="material-icons">view_module</i>User</a>
                </li>
                <li>
                  <a onClick={this.setRoleToAdmin}><i className="material-icons">cloud</i>Admin</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <div className="padding_left_right_normal">
              <input required onChange={this.onPasswordChange} id="passwordInput" type="password" value={this.state.password}
                   className="validate"
                   placeholder="password" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="padding_left_right_normal">
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
        <p>
          <br/>
          <br/>
          <br/>
        </p>
      </div>
    );
  }
}

export default EditUser;
