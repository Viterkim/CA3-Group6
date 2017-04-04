import {observable, action} from "mobx";
import React, {Component} from "react"
import axios from "axios"

class dataHandlerUsers extends Component {
    @observable users = [];

    constructor() {
        super();
        this.getData();
    }

    render() {

        const userTableContent = users.map(function(index, book) {
            return <tr key={index}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.info}</td>
            </tr>s
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
            this.users = response.json;
        }).catch(function(error) {
            console.log(error);
        });
    }

    @action
    setData(user) {
        axios.post('/users', {newUser: user}).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }
}

var dataUsers = new dataHandlerUsers();

export default data;
