import React, { Component } from 'react';
import PropTypes from 'prop-types'
import noCover from './icons/no-cover-image.png';
import * as BooksAPI from './utils/BooksAPI'


class SearchResults extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
//redeclared function do to issues sending it in as a property
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
//filter book results based on if they have an assigned shelf only display authors if the book has the authors property otherwise join throws error
//when click button and select shelf from menu it calls the onMoveBook function to change the shelf to the selected shelf
  render() {
    const { books} = this.props

    return (
    
      
        <ol className='book-list'>
          {books.filter((book)=>!book.hasOwnProperty("shelf")).map((book) => (
            <li key={book.id} className='book-list-item'>
              <div className='book-avatar' style={{
                backgroundImage: `url(${book.imageLinks.thumbnail? book.imageLinks.thumbnail
        : noCover})`
              }}/>
              <div className='book-details'>
                <p>{book.title? book.title : 'No title available'}</p>
	
               <p>{book.hasOwnProperty("authors")?book.authors.join(", "):''}</p>
		

              </div>
				 <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={e => this.moveBook(book.id, e)}>
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
               
                </div>
            </li>
          ))}
        </ol>
     
    )
  }

}

export default SearchResults
