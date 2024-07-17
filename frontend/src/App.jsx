import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import AddBook from './components/addBook';
import SearchBook from './components/searchBook';
import UpdateBook from './components/updateBook';
import DeleteBook from './components/deleteBook';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Search Book</Link>
          <Link to="/add" className="nav-link">Add Book</Link>
          <Link to="/update" className="nav-link">Update Book</Link>
          <Link to="/delete" className="nav-link">Delete Book</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/add" element={<AddBook />} />
            <Route path="/update" element={<UpdateBook />} />
            <Route path="/delete" element={<DeleteBook />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
