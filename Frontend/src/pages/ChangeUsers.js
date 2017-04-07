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
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.setRoleToUser = this.setRoleToUser.bind(this);
    this.setRoleToAdmin = this.setRoleToAdmin.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      username: ''
      ,password: ''
      ,role: ''
    }
  }

  componentWillMount() {
    userData.getDataAll()
  }

  deleteUser = (event) => {
    userData.sendDelete(event.target.id);
  };

  createUserOnServer = () => {
    this.closeModal();
    const newUser = {
      username: this.state.username
      ,password: this.state.password
      ,role: this.state.role
    };
    userData.newData(newUser);
    const usernameInputField = document.getElementById('create_username');
    usernameInputField.value = '';
    const passwordInputField = document.getElementById('create_password');
    passwordInputField.value = '';
  };

  setRoleToUser = (event) => {
    this.setState(
      {
        username: this.state.username
        ,password: this.state.password
        ,role: 'User'
      }
    )
  };

  setRoleToAdmin = (event) => {
    this.setState(
      {
        username: this.state.username
        ,password: this.state.password
        ,role: 'Admin'
      }
    )
  };

  onUsernameChange = (event) => {
    const newUserNameData = event.target.value;
    this.setState(
      {
        username: newUserNameData
        ,password: this.state.password
        ,role: this.state.role
      }
    )
  };

  onPasswordChange = (event) => {
    const newPassword = event.target.value;
    this.setState(
      {
        password: newPassword
        ,username: this.state.username
        ,role: this.state.role
      }
    )
  };

  showModal = () => {
    console.log('Doing opening of modal');
    const modalDiv = document.getElementById('createUser');
    const modalBackground = document.getElementById('transparent_background_modal');
    modalDiv.style.display = 'block';
    modalBackground.style.zIndex = 5;
  };

  closeModal = () => {
    console.log('Doing close of modal');
    const modalDiv = document.getElementById('createUser');
    const modalBackground = document.getElementById('transparent_background_modal');
    modalDiv.style.display = 'none';
    modalBackground.style.zIndex = -9;
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
                <a id={deleteButtonUsername} onClick={this.deleteUser} className="waves-effect red darken-1 waves-light btn">Delete</a>
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
                <a onClick={this.showModal} className="btn-floating btn-large waves-effect waves-light red">
                  <i className="material-icons">add</i>
                </a>
              </div>
              <span id="transparent_background_modal"></span>
              <div id="createUser" className="modal">
                <div className="padding_left_right_top_bottom_normal">
                  <div className="row">
                    <div className="col s12">
                      <h4>Create New User</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className=" col s9">
                      <input onChange={this.onUsernameChange} placeholder="username" id="create_username" type="text"
                             className="validate"/>
                    </div>
                    <div className="col s3">
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
                  <div className="row">
                    <div className="col s12">
                      <input onChange={this.onPasswordChange} placeholder="password" id="create_password" type="text"
                             className="validate"/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s8">
                      <a onClick={this.createUserOnServer}
                         className="left waves-effect orange waves-green btn-flat z-depth-1">
                        Create
                      </a>
                    </div>
                    <div className="col s4">
                      <a onClick={this.closeModal}
                         className="right waves-effect red waves-red btn-flat z-depth-1">
                        Close
                      </a>
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
