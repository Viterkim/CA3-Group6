import React, {Component} from "react";
import {observer} from "mobx-react";
import tableData from "../stores/dataHandlerBooks";

@observer
class Books extends Component {

  componentWillMount() {
    tableData.getDataNoAuth();
  }

  renderTable() {
    console.log(tableData.books);

    let bookTableContent = tableData.books.map(function (book) {
      return (
        <tr key={book.id}>
          <td className="padding_left_right_normal">{book.title}</td>
          <td className="padding_left_right_normal">{book.info}</td>
        </tr>
      );
    });

    return (
      <table className="background_white striped highlight padding_left_right_normal">
        <thead>
          <tr>
            <th className="padding_left_right_normal">Book Title</th>
            <th className="padding_left_right_normal">Book Info</th>
          </tr>
        </thead>
        <tbody>
          {bookTableContent}
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
    )
  }
}

export default Books;