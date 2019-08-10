import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import ListBooks from './ListBooks'
import * as BooksAPI from './utils/BooksAPI'

class Shelf extends Component {
  //send in books
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    books: []
  }
//to move book to different shelf
moveBook = (bookId: string, e: any) => {
    let tempBooks = this.props.books;
    const book = tempBooks.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: tempBooks
      });
    });
  };
  render() {
    const { books} = this.props

	
    let showingBooks= books
    
//sort books by title
    showingBooks.sort(sortBy('title'))

//send books array, function and shelf to listbooks to display books
    return (
      <div className='list-books'>


	<div className="bookshelf">
  <h2 className="bookshelf-title">Read</h2>
		<div className="bookshelf-books">
   
       <ListBooks
            books={showingBooks }
			onMoveBook={this.moveBook}
			shelf='read'
          />
      </div>
 <h2 className="bookshelf-title">Currently Reading</h2>
		<div className="bookshelf-books">
       <ListBooks
            books={showingBooks }
			onMoveBook={this.moveBook}
			shelf='currentlyReading'
          />
      </div>
<h2 className="bookshelf-title">Want To Read</h2>
		<div className="bookshelf-books">
       <ListBooks
            books={showingBooks }
			onMoveBook={this.moveBook}
			shelf='wantToRead'
          />
      </div>
</div>
</div>


    )
  }
}

export default Shelf
