import React, {Component, Link} from 'react';
import tableData from '../stores/dataHandlerBooks';

class EditBook extends Component{

    updateBook(id, title, info, user){
      this.props.book.id = id;
      this.props.book.title = title;
      this.props.book.info = info;
      this.props.book.user = user;
      tableData.setData(this.props.book);
    }

  render(){
    let bookTitleInput = document.getElementById("bookTitle");
    let bookInfoInput = document.getElementById("bookInfo");

    return (
    <div>

      <div id="modal1" className="modal modal-fixed-footer">
      <div className="modal-content">

        <h4>Title</h4>
        <div className="row">
        <div className="input-field col s12">
          <input id="bookTitle" type="text" value={this.props.book.title} className="validate" />
          <label for="bookTitle">Title</label>
        </div>
        <h4>Info</h4>
        <div className="input-field col s12">
          <input id="bookInfo" type="text" value={this.props.book.info} className="validate" />
          <label for="bookInfo">Info</label>
        </div>
        </div>
    </div>

    <div className="modal-footer">
        <button onClick={this.updateBook(this.props.book.id, bookTitleInput, bookInfoInput, this.props.book.user)} className="modal-action modal-close btn waves-effect waves-light" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
        </button>
    </div>

      </div>
    </div>
  );
  }
}

export default EditBook;
