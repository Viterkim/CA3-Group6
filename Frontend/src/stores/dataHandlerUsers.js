import {observable, action} from "mobx";
import axios from "axios"

class dataHandlerUsers {

  @observable users = [];

  url = "http://localhost:8084/seedMaven/api/";

  @action
  setUserData(data) {
    console.log("Setting new user data!");
    this.users = data;
  }

  @action
  getData = (username) => {

    var config = {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "Application/json",
      }
    };

    axios.get(this.url + 'user?username=' + username, config)
      .then(function (response) {
        this.setUserData(response.data);
        console.log("Got new data from server... " + this.users.length + " user");
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  @action
  setData(user) {
    console.log("Updating user: " + user);
    var config = {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "Application/json",
      }
    };
    axios.put(this.url + 'user', user
      , config).then(function (response) {
      console.log(response);
      this.getData(user);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }

  @action
  newData(user) {
    var config = {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "Application/json",
      }
    };
    axios.post(this.url + 'user', user
      , config).then(function (response) {
      console.log(response);
      this.getData(user.user);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }

  @action
  sendDelete(username) {
    var config = {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "Application/json",
      }
    };
    axios.get(this.url + 'user/delete?username=' + username
      , config).then(function (response) {
      console.log(response);
      this.getData(username);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }
}

var userData = new dataHandlerUsers();

export default userData;
