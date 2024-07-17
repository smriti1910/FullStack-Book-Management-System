import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/addBook.css'

function AddBook() {
  
  const [msg, setMsg] = useState('');
  const [statusTag, setStatusTag] = useState(false);

  function addNewBook(event) {
    event.preventDefault();
    const newBook = {
      "title" : `${document.querySelector('.title').value}`,
      "authors" : `${[document.querySelector('.author').value]}`,
      "isbn" : `${document.querySelector('.isbn').value}`,
      "genre" : `${document.querySelector('.genre').value}`,
      "publishedYear" : `${document.querySelector('.year').value}`,
      "numberOfCopies" : `${document.querySelector('.copies').value}`,
      "availableCopies" : `${document.querySelector('.avaCopies').value}`,
      "publisher" : `${document.querySelector('.publisher').value}`,
    };
    axios.post('http://localhost:3500/api/addNewBookData', newBook)
    .then(response => {
      // console.log(response.data);
      if(response.data.message) {
        setStatusTag(true);
        setMsg(response.data.message);
        document.querySelector('.title').value = '';
        document.querySelector('.author').value = '';
        document.querySelector('.isbn').value = '';
        document.querySelector('.genre').value = '';
        document.querySelector('.year').value = '';
        document.querySelector('.copies').value = '';
        document.querySelector('.avaCopies').value = '';
        document.querySelector('.publisher').value = '';
      } else {
        alert(`Unexpected status code : ${response.status}`);
      }
    })
    .catch(error => {
      if(error.response) {
        alert(`${error.response.data.message}`)
      } else if (error.message) {
        console.error('Error: No response received from server', error.request);
        alert('Error: No response received from server');
      } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={addNewBook}>
        <h2>ADD A BOOK</h2>
          ISBN <input type="text" className='isbn' /> <br />
          Title <input type="text" className='title' /> <br />
          Author <input type="text" className='author' /> <br />
          Genre <input type="text" className='genre' /> <br />
          Year <input type="number" className='year' /> <br />
          Number of Copies <input type="number" className='copies' /> <br />
          Availabe Copies <input type="number" className='avaCopies' /> <br />
          Publisher <input type="text" className='publisher' />
          <button type='submit'>Add Book</button>
        </form>
        {(statusTag) ? <h2 className='add-response'>{msg}</h2> : <p></p>}
    </React.Fragment>
  );
}

export default AddBook;
