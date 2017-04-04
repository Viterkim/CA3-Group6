import React, {Component} from "react";
import { observer } from "mobx-react";
import tableData from "../stores/DataHandlerBooks";

@observer
class Books extends Component {

    componentWillMount() {
        tableData.getData();
    }

    renderTable() {
        //console.log("Rendering table data")
            let bookTableContent = tableData.books.map(function(book) {
            //console.log("Getting book: " + book.title);
            return (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.info}</td>
                </tr>
            )
        });
        return (
            <table>
                <thead>
                    <tr>
                        <td>Book Title</td>
                        <td>Book Info</td>
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