/**
 * Created by scheldejonas on 06/04/2017.
 */
import React, {Component} from 'react';
import {observer} from "mobx-react";
import userData from "../stores/dataHandlerUsers";
import auth from '../authorization/auth';
import {Link} from 'react-router';

@observer
class ChangeUsers extends Component {

  constructor() {
    super();
    this.createUserOnServer = this.createUserOnServer.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.setRoleToUser = this.setRoleToUser.bind(this);
    this.setRoleToAdmin = this.setRoleToAdmin.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      username: ''
      , role: ''
    }
  }

  componentWillMount() {
    userData.getDataNoAuth()
  }

  deleteUser = (event) => {
    userData.sendDelete(event.target.id);
  };

  createUserOnServer = () => {
    const newUser = {
      username: this.state.username
      ,role: this.state.role
    };
    userData.newData(newUser);
    const usernameInputField = document.getElementById('create_username');
    usernameInputField.value = '';
  };

  setRoleToUser = (event) => {
    this.setState(
      {
        username: this.state.username
        , role: 'User'
      }
    )
  };

  setRoleToAdmin = (event) => {
    this.setState(
      {
        username: this.state.username
        , role: 'Admin'
      }
    )
  };

  onUsernameChange = (event) => {
    const newUserNameData = event.target.value;
    this.setState(
      {
        username: newUserNameData
        , role: this.state.username
      }
    )
  };

  renderUsers = () => {
    const userRows = userData.users.map(
      (user) => {
        const editUrl = `/user/${user.username}/${user.role}`;
        const deleteButtonUsername = `${user.username}`;
        return (
          <div className="row no_margin_bottom padding_bottom_normal" key={user.username}>
            <div className="col s3 center">
              <div className="padding_left_right_normal">{user.username}</div>
            </div>
            <div className="col s3 center">
              <div className="padding_left_right_normal">{user.role}</div>
            </div>
            <div className="col s3 center">
              <div className="padding_left_right_normal">
                <Link to={editUrl} className="waves-effect orange lighten-1 waves-light btn">Edit</Link>
              </div>
            </div>
            <div className="col s3 center">
              <div className="padding_left_right_normal">
                <a id={deleteButtonUsername} onClick={this.deleteUser}
                   className="waves-effect red darken-1 waves-light btn">Delete</a>
              </div>
            </div>
          </div>
        );
      }
    );

    return (
      <div className="background_white">
        <div className="row">
          <div className="col s3 center">
            <div className="padding_left_right_normal">Username</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">Role</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">Edit</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">Delete</div>
          </div>
        </div>
        {userRows}
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="section background_white">
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <div className="padding_left_right_normal">
                <h4 className="center">Users</h4>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="right padding_left_right_normal">
                <a href="#createUser" className="btn-floating btn-large waves-effect waves-light red">
                  <i className="material-icons">add</i>
                </a>
              </div>
              <div id="createUser" className="modal">
                <div className="modal-content">
                  <div className="row">
                    <div className="col s12">
                      <h4>Create New User</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s9">
                      <input onChange={this.onUsernameChange} placeholder="username" id="create_username" type="text"
                             className="validate"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <a className='dropdown-button btn' href='#' data-activates='userRoleDropdown'>Choose Role</a>
                      <ul id='userRoleDropdown' className='dropdown-content'>
                        <li><a onClick={this.setRoleToUser} href="#"><i className="material-icons">view_module</i>User</a>
                        </li>
                        <li><a onClick={this.setRoleToAdmin} href="#"><i className="material-icons">cloud</i>Admin</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="modal-footer">
                        <a onClick={this.createUserOnServer} href="#!"
                           className="modal-action modal-close waves-effectn orange waves-green btn-flat">Create</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="parallax">
          <img id="paralaxImageOne" src="/background_frontpage.jpg" alt="Error"/>
        </div>
        {this.renderUsers()}
      </div>
    );
  }
}

export default ChangeUsers;
