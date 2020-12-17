import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    getBooks();
  }, []);

  // Create
  const onSubmitBook = async e => {
    e.preventDefault()
    const {title, author, description} = e.target
    await axios.post('https://ancient-reaches-30470.herokuapp.com/api/books', {
      title: title.value,
      author: author.value,
      description: description.value,
    })
    title.value = ''
    author.value = ''
    description.value = ''
    getBooks()
  }

  // Read
  const getBooks = async () => {
    const res = await axios.get('https://ancient-reaches-30470.herokuapp.com/api/books')
    const data = res.data
    setBooks(data)
  }

  // Update
  const onSubmitEdits = async (e, id) => {
    e.preventDefault()
    const {title, author, description} = e.target
    await axios.post(`https://ancient-reaches-30470.herokuapp.com/api/books/update/${id}`, {
      title: title.value,
      author: author.value,
      description: description.value,
    })
    setEditing(null)
    getBooks()
  }

  // Delete
  const deleteBook = async bookToDelete => {
    await axios({
      method: 'DELETE',
      url: 'https://ancient-reaches-30470.herokuapp.com/api/books/',
      data: {
        id: bookToDelete,
      },
    })
    await getBooks()
  }

  return (
    <div className="App">
      <div className="DataInput">
        <h2>Enter book:</h2>
        <form onSubmit={e => onSubmitBook(e)}>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" />
          <label htmlFor="author">Author:</label>
          <input type="text" name="author" />
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" />
          <button>Add Book</button>
        </form>
      </div>
      <div className="DataOutput">
        {books.map(book => (
          <div key={book._id}>
            {editing !== book._id ? (
              <div key={book._id} className="DataOutput__card">
                <div className="DataOutput__card--details">
                  <div>
                    <span>Title:</span>
                    {book.title}
                  </div>
                  <div>
                    <span>Author:</span>
                    {book.author}
                  </div>
                  <div>
                    <span>Description:</span>
                    {book.description}
                  </div>
                </div>
                <div className="DataOutput__card--options">
                  <button onClick={() => setEditing(book._id)}>Edit</button>
                  <button onClick={() => deleteBook(book._id)}>Delete</button>
                </div>
              </div>
            ) : (
              <div key={book._id} className="DataOutput__editing">
                <form onSubmit={e => onSubmitEdits(e, book._id)}>
                  <div className="DataOutput__editing--option">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" defaultValue={book.title} />
                  </div>
                  <div className="DataOutput__editing--option">
                    <label htmlFor="author">Author:</label>
                    <input type="text" name="author" defaultValue={book.author} />
                  </div>
                  <div className="DataOutput__editing--option">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" defaultValue={book.description} />
                  </div>
                  <div>
                    <button type="Submit">Submit</button>
                    <button
                      className="DataOutput__editing--cancel"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
