import {observable, action} from "mobx";
import axios from "axios"
const URL = require("../../package.json").serverURL;
//import fetchHelper from "./fetchHelpers"

class dataHandlerBooks {

  @observable books = [];

  url = URL;

  @action
  setBookData(data) {
    console.log("Setting new book data!");
    this.books = data;
  }

  @action
  getDataNoAuth = () => {
    var configNoAuth = {
      headers: {
        "Content-type": "Application/json",
      }
    };

    axios.get(this.url + 'book/all', configNoAuth)
      .then(function (response) {
        this.setBookData(response.data);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  };

  @action
  getData = (username) => {

    var config = {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "Application/json",
      }
    };

    //const options = fetchHelper.makeOptions("GET", true);

    axios.get(this.url + 'book?username=' + username, config)
      .then(function (response) {
          this.setBookData(response.data);
          console.log("Got new data from server... " + this.books.length + " books");
        }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  @action
  setData(book, user) {
    console.log("Updating book user: " + user);
        var config = {
        headers: {
            "Authorization": `Bearer ${localStorage.token}`,
            "Content-type": "Application/json",
        }
    };
    axios.put(this.url + 'book', book
    , config).then(function (response) {
      console.log(response);
      this.getData(user);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }

  @action
  newData(book) {
    var config = {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "Application/json",
      }
    };
    axios.post(this.url + 'book', book
      , config).then(function (response) {
      console.log(response);
      this.getData(book.user);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }

  @action
  sendDelete(bookId, username) {
    var config = {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "Application/json",
      }
    };
    axios.get(this.url + 'book/delete?bookID=' + bookId
      , config).then(function (response) {
      console.log(response);
      this.getData(username);
    }.bind(this)).catch(function (error) {
      console.log(error);
    });
  }
}

let tableData = new dataHandlerBooks();

//Only for debugging
//window.userStore = userStore;
export default tableData;
