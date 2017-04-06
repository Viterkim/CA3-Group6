/**
 * Created by scheldejonas on 05/04/2017.
 */
import React, { Component } from 'react';
import {observer} from "mobx-react";
import tableData from "../stores/dataHandlerBooks";
import auth from '../authorization/auth';
import EditBook from '../components/EditBook';
import { Link } from 'react-router';

class ChangeBooks extends Component {

  componentWillMount() {
    tableData.getData();
  }

  deleteBook(id) {
    const bookÍd = id;
    console.log('I tried to delete book id ' + bookÍd);
  }

  renderBooks() {
    console.log(tableData.books.length);
    
    
      let bookTableContent = tableData.books.map(function (book) {
        const modalId = 'modal' + book.id;
        const modalIdHash = '#modal' + book.id;
        const url = `/book/${book.id}/${book.title}/${book.info}/${book.user}`;
        return (
          <div className="row" key={book.id}>
              <div className="col s3 center"><div className="padding_left_right_normal">{book.title}</div></div>
              <div className="col s3 center"><div className="padding_left_right_normal">{book.info}</div></div>
              <div className="col s3 center"><div className="padding_left_right_normal">
                  <Link to={url} className="waves-effect orange lighten-1 waves-light btn">Edit</Link>
              </div></div>
              <div className="col s3 center"><div className="padding_left_right_normal">
                  <a onClick={() => this.deleteBook(book.id)} className="waves-effect red darken-1 waves-light btn">Delete</a>
              </div></div>
          </div>
        )
      });
    
    
    return (
        <div>
            <div className="row">
                <div className="col s3 center"><div className="padding_left_right_normal">Book Title</div></div>
                <div className="col s3 center"><div className="padding_left_right_normal">Book Info</div></div>
                <div className="col s3 center"><div className="padding_left_right_normal">Edit</div></div>
                <div className="col s3 center"><div className="padding_left_right_normal">Delete</div></div>
            </div>
            {bookTableContent}
      </div>
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
            {this.renderBooks()}
      </div>
    );
  }
}

export default ChangeBooks;