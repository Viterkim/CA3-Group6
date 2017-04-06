import React, {Component} from 'react';
import tableData from '../stores/dataHandlerBooks';
import {Link} from 'react-router';

class EditBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      title: this.props.params.title,
      info: this.props.params.info,
      user: this.props.params.user
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onInfoChange = this.onInfoChange.bind(this);
    this.updateBook = this.updateBook.bind(this);
  }

  updateBook = function (event) {
    let book = {id: this.state.id, title: this.state.title, info: this.state.info, user: this.state.user};
    tableData.setData(book, this.state.user);
  }

  onTitleChange = function (event) {
    const newTitle = event.target.value;
    this.setState({title: newTitle});
  }

  onInfoChange = function (event) {
    const newInfo = event.target.value;
    this.setState({info: newInfo});
  }

  render() {
    let bookTitleInput = document.getElementById("bookTitle");
    let bookInfoInput = document.getElementById("bookInfo");

    const inputBookTitle = "bookTitle" + this.state.id;
    const inputBookInfo = "bookInfo" + this.state.id;

    return (
      <div className="container">

        <div className="row">
          <div className="col s12">

            <h4>Title</h4>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this.onTitleChange} id={inputBookTitle} type="text" value={this.state.title}
                       className="validate"/>
                <label htmlFor={inputBookTitle}>Title</label>
              </div>
              <h4>Info</h4>
              <div className="input-field col s12">
                <input onChange={this.onInfoChange} id={inputBookInfo} type="text" value={this.state.info}
                       className="validate"/>
                <label htmlFor={inputBookInfo}>Info</label>
              </div>
            </div>
          </div>

          <div className="">
            <Link to="/change-books">
              <button onClick={this.updateBook} className="modal-action modal-close btn waves-effect waves-light"
                      type="submit" name="action">
                Submit
                <i className="material-icons right">send</i>
              </button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}

export default EditBook;
