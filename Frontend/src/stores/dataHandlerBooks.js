import {observable, action} from "mobx";
import axios from "axios"
import fetchHelper from "./fetchHelpers"

class dataHandlerBooks {

  @observable books = [];

  @action
  setBookData(data) {
    this.books = data;
  }

  @action
  getDataNoAuth = () => {

    var configNoAuth = {
      headers: {
        "Content-type": "Application/json",
      }
    };

    axios.get('http://localhost:8084/seedMaven/api/book/all', configNoAuth)
      .then(function (response) {
        this.setBookData(response.data);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  };

  @action
  getData = () => {
      
    const options = fetchHelper.makeOptions("GET", true);
    
    axios.get('http://localhost:8084/seedMaven/api/book/all', options)
      .then(function (response) {
          this.setBookData(response.data);
        }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  @action
  setData(book) {
    axios.post('/books', {
      newBook: book
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
}

let tableData = new dataHandlerBooks();

//Only for debugging
//window.userStore = userStore;
export default tableData;
