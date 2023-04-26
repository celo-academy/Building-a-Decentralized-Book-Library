import React from "react";

const ReadingList = ({
  bookCIDs = [],
  openPDF,
  selectedCID,
  returnBook,
  borrowedBooks,
}) => {
  return (
    <div>
      <h2> Reading List</h2>
      {borrowedBooks?.map((bookId, index) => {
        const bookCID = bookCIDs.find((book) => book.bookId === bookId);
        return (
          <div key={index}>
            <button onClick={() => openPDF(bookCID.pinataCid)}>
              Open Book {bookId}
            </button>
            <button onClick={() => returnBook(bookId)}>
              Return Book {bookId}
            </button>
          </div>
        );
      })}
      {selectedCID && (
        <iframe
          title="PDF Viewer"
          src={`https://gateway.pinata.cloud/ipfs/${selectedCID}`}
          width="100%"
          height="600"
        />
      )}
    </div>
  );
};
export default ReadingList;
