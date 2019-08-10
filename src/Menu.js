import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Menu extends Component {
    static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }

    
    state = {
      showMenu: false,
    };
    
    showMenu = this.showMenu.bind(this);
    closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu() {
    
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
    
  }

  render() {
      const { books,  shelf,  onMoveBook} = this.props
    return (
    <div>
          {books.filter((book)=>book.shelf === shelf).map((book) => (
           <div>
  				<button onClick={this.showMenu}>
                Move
              </button>
			{
          		this.state.showMenu
          	  ? (
              <div className="menu" ref={(element) => {
                  this.dropdownMenu = element;
                }}>
                <button onClick={() => onMoveBook(book, 'read')}> 
					Read </button>
                <button onClick={() => onMoveBook(book, 'currentlyReading')} > 
					Currently Reading </button>
                <button onClick={() => onMoveBook(book, 'wantToRead')} > 
					Want to Read </button>
              </div>
            )
            : (
              null
            )
        }
				</div> 
          ))}
        </div>
   
);
}
  }
  export default Menu