import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Shelf from './Shelf'
import SearchBook from './SearchBook'
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom'


class App extends Component {
  state = {
    books: []
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
 
  render() {
    return (
      <div>
        <div className='list-books-top'>
         
          <Link
            to='/search'
            className='search-book-page'
     		>Search Books</Link>
        	</div>
        <Route exact path='/' render={() => (
         
          <Shelf
            books={this.state.books}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBook
          />
        )}/>
      </div>
    )
  }
}

export default App;
