import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/searchBook.css';

function SearchBook() {
  const [books, setBooks] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3500/api/getAllBookData')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching all book data:', error);
        alert('Error fetching all book data');
      });
  }, []);

  function getBookbyISBN(event) {
    event.preventDefault();
    const isbnValue = document.querySelector('.isbn').value;
    if(isbnValue)
    {
      axios.get(`http://localhost:3500/api/getBookDataByIsbn/${isbnValue}`)
        .then(response => {
          setSearchResult(response.data);
        })
        .catch(error => {
          if (error.response) {
            alert(`${error.response.data.message}`);
          } else if (error.message) {
            console.error('Error: No response received from server', error.request);
            alert('Error: No response received from server');
          } else {
            console.error('Error:', error.message);
            alert(`Error: ${error.message}`);
          }
        });
      }
  }

  return (
    <React.Fragment>
      <form onSubmit={getBookbyISBN}>
        <h2 className='search-p'>SEARCH A BOOK</h2>
        ISBN <input type="text" className='isbn' /> <br />
        <button type='submit'>Search Book</button>
      </form>
      <div className='books'>
        {searchResult ? (
            <div className='book-details'>
              <h2>{searchResult.title}</h2>
              <p>Authors: <span className='highlight'>{searchResult.authors}</span></p>
              <p>ISBN: <span className='highlight'>{searchResult.isbn}</span></p>
              <p>Genre: <span className='highlight'>{searchResult.genre}</span></p>
              <p>Published Year: <span className='highlight'>{searchResult.publishedYear}</span></p>
              <p>Number of Copies: <span className='highlight'>{searchResult.numberOfCopies}</span></p>
              <p>Available Copies: <span className='highlight'>{searchResult.availableCopies}</span></p>
              <p>Publisher: <span className='highlight'>{searchResult.publisher}</span></p>
            </div>
        ) : (
          books.map((book, index) => (
            <div key={index} className='books-card'>
              <div className='book-details'>
                <h2>{book.title}</h2>
                <p>Authors : <span className='highlight'>{book.authors}</span></p>
                <p>ISBN : <span className='highlight'>{book.isbn}</span></p>
                <p>Genre : <span className='highlight'>{book.genre}</span></p>
                <p>Published Year : <span className='highlight'>{book.publishedYear}</span></p>
                <p>Number of Copies : <span className='highlight'>{book.numberOfCopies}</span></p>
                <p>Available Copies : <span className='highlight'>{book.availableCopies}</span></p>
                <p>Publisher: <span className='highlight'>{book.publisher}</span></p>
              </div>
            </div>
          ))
        )}
      </div>
    </React.Fragment>
  );
}

export default SearchBook;
