import React, { Component } from 'react';
import PropTypes from 'prop-types'
import noCover from './icons/no-cover-image.png';


class ListBooks extends Component {
  //require books, function and shelf
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }
  
  render() {
    //set books, shelf and function
    const { books,  shelf,  onMoveBook} = this.props
//filter books on shelf only display authors if the book has the authors property otherwise join throws error
//when click button and select shelf from menu it calls the onMoveBook function to change the shelf to the selected shelf
    return (
    
      
        <ol className='book-list'>
          {books.filter((book)=>book.shelf === shelf).map((book) => (
            <li key={book.id} className='book-list-item'>
            <div className='book-avatar' style={{
                backgroundImage: `url(${book.imageLinks.thumbnail? book.imageLinks.thumbnail: noCover})`
              }}/>
              <div className='book-details'>
                <p>{book.title? book.title : 'No title available'}</p>
                <p>{book.hasOwnProperty("authors")?book.authors.join(", "):''}</p>
              </div>
				 <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={e => onMoveBook(book.id, e)}>
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

export default ListBooks
