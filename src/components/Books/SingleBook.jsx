import { useGetBookByIdQuery } from "./bookSlice"
import { useParams } from 'react-router-dom'


function SingleBook() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id);

  if (isLoading) {
    return <h1>Loading Book ...</h1>;
  }

  if (isError || !data) {
    return <h1>Error loading data</h1>;
  }
  const book = data.book

  return (
    <div className="book-details-container">
      <div className="book-details">
        <p className="book-text">{book.title}</p>
        <p className="book-text">{book.author}</p>
        <p>{book.description}</p>
        <p>Available?</p>
        {book.available ?<p className="available">Yes</p> : <p className="not-available">No</p>}
        <img className="book-covers" src={book.coverimage} />
      </div>
    </div>
  )
}

export default SingleBook