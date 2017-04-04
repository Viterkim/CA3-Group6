import {observable, action} from "mobx";
import React, {Component} from "react"
import axios from "axios"

class dataHandlerBooks extends Component {
    @observable books = [];

    constructor() {
        super();
        this.getData();
    }

    render() {

        const bookTableContent = books.map(function(index, book) {
            return <tr key={index}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.info}</td>
            </tr>
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Book Id</th>
                        <th>Book Title</th>
                        <th>Book Info</th>
                    </tr>
                </thead>
                <tbody>
                    {bookTableContent}
                </tbody>
            </table>
        );
    }

    @action
    getData() {
        axios.get('/users').then(function(response) {
            this.books = response.json;
        }).catch(function(error) {
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

var dataBooks = new dataHandlerBooks();

export default data;
