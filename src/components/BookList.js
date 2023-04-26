import React from "react";

const BookList = ({ books, borrowBook, readingList }) => {
  // The function that handles borrowing a book and updating the reading list
  const handleBorrowBook = async (bookId) => {
    try {
      // Call the borrowBook function and wait for it to complete
      await borrowBook(bookId);

      // After successfully borrowing the book, update the reading list
      await readingList();
    } catch (error) {
      console.error(
        "Error borrowing the book and updating the reading list:",
        error
      );
    }
  };

  return (
    <div className="books">
      <h2> Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.availableCopies}</td>
              <td>
                <button onClick={() => handleBorrowBook(book.id)}>
                  Borrow Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
