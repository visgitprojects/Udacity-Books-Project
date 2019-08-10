import React, { Component } from 'react';
import SearchResults from './SearchResults'
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom'

class SearchBook extends Component {

//declare state 
  state = {
    query: '',
    searchBooks: []
  }

//function to update displayed books based on the value in the input field
 updateQuery = (query) => {
 this.setState({query})
     if (query) {
    BooksAPI.search(query.trim(), 20).then(newBooks => {
        newBooks.length > 0
          ? this.setState({searchBooks: newBooks })
          : this.setState({searchBooks: []});
    });
     }else {
      this.setState({ searchBooks: []});
    }
    
  };
  //clears the input and displayed books called from button push
  clearQuery = () => {
    this.setState({ searchBooks: [], query:''})
  };
 
//displays input box for search query and calls search results to display returned books
  render() {
   const { query } = this.state
 let showingBooks = this.state.searchBooks

    return (
      <div>
        <div className='list-books'>
        <div className='list-books-top'>
          <input
            className='search-books'
            type='text'
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
	
        </div>
		<div>
        <Link className='close-search-book' to='/'>Close</Link>
		</div>
  		
        {(
          <div className='showing-books'>
            <span>Now showing {showingBooks.length} results</span>
            <button onClick={this.clearQuery}>Clear Results</button>
          </div>
        )}
        <div className="bookshelf">
			<SearchResults
            books={showingBooks}
			
          />

      </div>
 </div>

      </div>
    )
  }
}

export default SearchBook
