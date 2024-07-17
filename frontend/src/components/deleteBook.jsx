import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/deleteBook.css';

function DeleteBook() {

  const [msg, setMsg] = useState('');
  const [statusTag, setStatusTag] = useState(false);
  
  function performDeleteOperation(event) {

    event.preventDefault();
    const isbnValue = document.querySelector('.isbn').value;
    axios.delete(`http://localhost:3500/api/deleteBookData/${isbnValue}`)
    .then(response => {
      if(response.data.message) {
        setStatusTag(true);
        setMsg(response.data.message);
        document.querySelector('.isbn').value = '';
        // alert(`${response.data.message}`);
      } else {
        alert(`Unexcepted status code : ${response.status}`);
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
    })

  }

  return (
    <React.Fragment>
      <form onSubmit={performDeleteOperation}>
        <h2>DELETE A BOOK</h2>
          ISBN <input type="text" className='isbn' /> <br />
          <button type='submit'>Delete Book</button>
        </form>
        {(statusTag) ? <h2 className='response'>{msg}</h2> : <p></p>}
    </React.Fragment>
  );
}

export default DeleteBook;
