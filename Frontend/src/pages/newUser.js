import auth from '../authorization/auth'

class Home extends Component {

  handleSubmit(event) {
    event.preventDefault()
    const bookTitle = this.refs.bookTitle.value;
    const bookInfo = this.refs.bookInfo.value;
    const bookMoreInfo = this.refs.bookMoreInfo.value;
    alert("Du har tilføjet bruger med følgende data: " + bookTitle + " : " + bookInfo + " : " + bookMoreInfo);
  }

  render() {
    return (
    <div className="container">
    <form className="form-signin" onSubmit={this.handleSubmit}>
      <input id="book_title" ref="bookTitle" type="text" class="validate">
        <label for="book_title">Title</label>
      <input id="book_info" ref="bookInfo" type="text" class="validate">
        <label for="book_info">Book Info</label>
      <input id="book_more_info" ref="bookMoreInfo" type="text" class="validate">
        <label for="book_more_info">Additional Book Info</label>
      <button class="btn waves-effect waves-light" type="submit" name="action">Submit
      <i class="material-icons right">send</i>
      </button>
    </form>
    </div>
    )
  }
}

export default Home;
