/**
 * Created by scheldejonas on 05/04/2017.
 */
import React, { Component } from 'react';
import {observer} from "mobx-react";
import tableData from "../stores/dataHandlerBooks";
import auth from '../authorization/auth';
import EditBook from '../components/EditBook';

class ChangeBooks extends Component {

  componentWillMount() {
    tableData.getData();
  }

  deleteBook(id) {
    const bookÍd = id;
    console.log('I tried to delete book id ' + bookÍd);
  }

  renderTable() {

    const bookTableContent = tableData.books.map(function (book) {
      const modalId = 'modal' + book.id;
      return (
        <tr key={book.id}>
          <td className="padding_left_right_normal">{book.title}</td>
          <td className="padding_left_right_normal">{book.info}</td>
          <td>
            <a href={modalId} class="waves-effect orange lighten-1 waves-light btn">Edit</a>
            <EditBook modalId={modalId} id={book.id} title={book.title} info={book.info} user={auth.username} />
          </td>
          <td>
            <a onClick={this.deleteBook(book.id)} href="modal1" class="waves-effect red darken-1 waves-light btn">Delete</a>
          </td>
        </tr>
      )
    });

    return (
      <table className="background_white striped highlight padding_left_right_normal">
        <thead>
        <tr>
          <th className="padding_left_right_normal">Book Title</th>
          <th className="padding_left_right_normal">Book Info</th>
          <th className="padding_left_right_normal">Edit</th>
          <th className="padding_left_right_normal">Delete</th>
        </tr>
        </thead>
        <tbody>
        { bookTableContent }
        </tbody>
      </table>
    );

  }

  render() {

    return (
      <div className="container">
        <div className="section background_white">
          <div className="row">
            <div className="col s12">
              <div className="padding_left_right_normal">
                <h4 className="center">Books</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="parallax">
          <img id="paralaxImageOne" src="/background_frontpage.jpg" alt="Error"/>
        </div>
        {this.renderTable()}
      </div>
    );
  }
}

export default ChangeBooks;