import {observable, action} from "mobx";
import {Component} from "react"
import axios from "axios"
import fetchHelper from "./fetchHelpers"

class DataHandlerBooks extends Component {
    
    @observable books = [];

    @action
    setBookData(data) {
        this.books = data;
    }
    
    @action
    getData = () => {
        //console.log("Getting all books");
        const options = fetchHelper.makeOptions("GET", true);
        axios.get('http://localhost:8084/seedMaven/api/book/all', options).then(function(response) {
            this.setBookData(response.data);
        }.bind(this)).catch(function(error) {
            console.log(error);
        });
    }

    @action
    setData(book) {
        axios.post('/books', {
          newBook: book
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }
}

let tableData = new DataHandlerBooks();

export default tableData;
