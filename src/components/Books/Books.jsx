import { useGetBooksQuery, useCheckOutBookMutation } from "./bookSlice"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { selectToken } from "../Auth/authSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../Profile/accountSlice";


function BookCard({ book, handleCheckout }) {
  const token = useSelector(selectToken);

  if (token) {
    return (
      <li className="book-info">
        <p className="book-text">{book.title}</p>
        <p className="book-text"> {book.author}</p>
        <p>Available?</p>
        {book.available ? <p className="available">Yes</p> : <p className="not-available">No</p>}
        <img className="book-covers" src={book.coverimage} />
        <br />
        <Link to={`/books/${book.id}`}>See Details</Link>
        <br />
        <button className="check-out" onClick={handleCheckout}>Check Out</button>
      </li>
    );
  } else {
    return (
      <li className="book-info">
        <p className="book-text">{book.title}</p>
        <p className="book-text">{book.author}</p>
        <p>Available?</p>
        {book.available ? <p className="available">Yes</p> : <p className="not-available">No</p>}
        <img className="book-covers" src={book.coverimage} />
        <br />
        <Link to={`/books/${book.id}`}>See Details</Link>
      </li>
    );
  }
}

function Books() {
  const token = useSelector(selectToken);
  const { data: books, isLoading: booksLoading, isError: booksError, refetch: refetchBooks } = useGetBooksQuery();
  const [checkout] = useCheckOutBookMutation();
  const { refetch: refetchUser } = token ? useGetUserQuery() : {};


  useEffect(() => {
    refetchBooks();
    if (token) {
      refetchUser();
    }
  }, [token]);


  const [filteredBook, setFilteredBook] = useState("");
  const filteredBooks = books?.filter((b) => (b.title.toLowerCase().includes(filteredBook.toLowerCase()) || b.author.toLowerCase().includes(filteredBook.toLowerCase())));

  const handleCheckout = (book) => {
    if (book.available) {
      checkout(book.id).unwrap().then(() => {
        refetchBooks();
      });
    } else {
      window.alert('This book is unavailable! Try again later')
    }
  }

  return (
    <>
      {booksLoading && <h1>Loading...</h1>}
      {booksError && <h1> There was an error loading the books!</h1>}
      
      <div className="search-bar">
        <label className="search-label">Search:</label>
        <br />
        <input type="text" value={filteredBook} onChange={(e) => setFilteredBook(e.target.value)} placeholder="Enter Book Title or Author" />
      </div>

      {filteredBook ? (
        <ul className="search">
          {
            filteredBooks?.map((b) => (
              <BookCard key={b.title} book={b} handleCheckout={() => handleCheckout(b)} />
            ))
          }
        </ul>
      ) : (
        <ul className="book-container">
          {books?.map((b) => (
            < BookCard key={b.id} book={b} handleCheckout={() => handleCheckout(b)} />
          ))}
        </ul>
      )}
    </>
  );
}

export default Books