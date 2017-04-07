/**
 * Created by scheldejonas on 05/04/2017.
 */
import React, {Component} from 'react';
import {observer} from "mobx-react";
import tableData from "../stores/dataHandlerBooks";
import auth from '../authorization/auth';
import {Link} from 'react-router';

@observer
class ChangeBooks extends Component {

  constructor() {
    super();
    this.state = {
      newBook: {
        title: '',
        info: '',
        user: auth.userName
      }
    };
    this.createBookOnServer = this.createBookOnServer.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onInfoChange = this.onInfoChange.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.render = this.render.bind(this);
  }

  componentWillMount() {
    tableData.getData(this.state.newBook.user);
  }

  deleteBook = (event) => {
    const bookId = parseInt(event.target.id.replace(/[^0-9\.]/g, ''), 10);
    tableData.sendDelete(bookId, this.state.newBook.user);
  };

  createBookOnServer = () => {
    this.closeModal();
    tableData.newData(this.state.newBook);
    this.setState(
      {
        newBook: {
          info: ''
          ,title: ''
          ,user: this.state.newBook.user
        }
      }
    );
    const inputTitle = document.getElementById('create_book_title');
    inputTitle.value = '';
    const inputInfo = document.getElementById('create_book_info');
    inputInfo.value = '';
  };

  onTitleChange = (event) => {
    const newTitle = event.target.value;
    this.setState(
      {
        newBook: {
          title: newTitle
          ,info: this.state.newBook.info
          ,user: this.state.newBook.user
        }
      }
    )
  };

  onInfoChange = (event) => {
    const newInfo = event.target.value;
    this.setState(
      {
        newBook: {
          info: newInfo
          ,title: this.state.newBook.title
          ,user: this.state.newBook.user
        }
      }
    )
  };

  showModal = () => {
    console.log('Doing opening of modal');
    const modalDiv = document.getElementById('createBook');
    const modalBackground = document.getElementById('transparent_background_modal');
    modalDiv.style.display = 'block';
    modalBackground.style.zIndex = 5;
  };

  closeModal = () => {
    console.log('Doing close of modal');
    const modalDiv = document.getElementById('createBook');
    const modalBackground = document.getElementById('transparent_background_modal');
    modalDiv.style.display = 'none';
    modalBackground.style.zIndex = -9;
  };

  renderBooks() {
    let bookTableContent = tableData.books.map(function (book) {
      const modalId = 'modal' + book.id;
      const modalIdHash = '#modal' + book.id;
      const url = `/book/${book.id}/${book.title}/${book.info}/${book.user}`;
      const deleteButtonId = 'delete_button' + book.id;
      return (
        <div className="row no_margin_bottom padding_bottom_normal" key={book.id}>
          <div className="col s3 center">
            <div className="padding_left_right_normal">{book.title}</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">{book.info}</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">
              <Link to={url} className="waves-effect orange lighten-1 waves-light btn">Edit</Link>
            </div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">
              <a id={deleteButtonId} onClick={this.deleteBook} className="waves-effect red darken-1 waves-light btn">Delete</a>
            </div>
          </div>
        </div>
      )
    }.bind(this));

    return (
      <div className="background_white">
        <div className="row">
          <div className="col s3 center">
            <div className="padding_left_right_normal">Book Title</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">Book Info</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">Edit</div>
          </div>
          <div className="col s3 center">
            <div className="padding_left_right_normal">Delete</div>
          </div>
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
            <div className="col s12 m4 offset-m4">
              <div className="padding_left_right_normal">
                <h4 className="center">Books</h4>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="right padding_left_right_normal">
                <a onClick={this.showModal} className="btn-floating btn-large waves-effect waves-light red">
                  <i className="material-icons">add</i>
                </a>
              </div>
              <span id="transparent_background_modal"></span>
              <div id="createBook" className="modal">
                <div className="padding_left_right_top_bottom_normal">
                  <div className="row">
                    <div className="col s12">
                      <h4>Create New Book</h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input onChange={this.onTitleChange} placeholder="title on the cover" id="create_book_title" type="text" className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input onChange={this.onInfoChange} placeholder="info about the book" id="create_book_info" type="text" className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <a onClick={this.createBookOnServer} href="#" className="modal-action modal-close waves-effect orange waves-green btn-flat">Create</a>
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
        {this.renderBooks()}
      </div>
    );
  }
}

export default ChangeBooks;
