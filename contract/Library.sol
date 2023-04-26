// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Library {
    struct Book {
        uint id;
        string title;
        string author;
        string pinataCid; // Pinata CID for the PDF file
        uint availableCopies;
        address borrower;
    }

    Book[] private bookList;

    mapping(uint => address) public owner;

    event BookAdded(address recipient, uint bookId);
    event BookBorrowed(address borrower, uint bookId);
    event BookReturned(address borrower, uint bookId);

    function addBook(
        string memory title,
        string memory author,
        string memory pinataCid,
        uint availableCopies
    ) public {
        uint bookId = bookList.length;
        bookList.push(
            Book(bookId, title, author, pinataCid, availableCopies, address(0))
        );
        owner[bookId] = msg.sender;
        emit BookAdded(msg.sender, bookId);
    }

    function getAllBooks() public view returns (Book[] memory) {
        return bookList;
    }

    function borrowBook(uint bookId) public {
        require(bookId >= 0 && bookId < bookList.length, "Invalid Book ID");
        require(bookList[bookId].availableCopies > 0, "No available copies.");
        require(
            msg.sender != owner[bookId],
            "You cannot borrow your own book."
        );
        require(
            bookList[bookId].borrower != msg.sender,
            "You already borrowed this book."
        );

        bookList[bookId].borrower = msg.sender;
        bookList[bookId].availableCopies--;

        emit BookBorrowed(msg.sender, bookId);
    }

    function returnBook(uint bookId) public {
        require(bookId >= 0 && bookId < bookList.length, "Invalid Book ID");
        require(
            bookList[bookId].borrower == msg.sender,
            "You didn't borrow this book"
        );

        bookList[bookId].borrower = address(0);
        bookList[bookId].availableCopies++;

        emit BookReturned(msg.sender, bookId);
    }

    function readingList(address user) public view returns (uint[] memory) {
        uint count = 0;

        for (uint i = 0; i < bookList.length; i++) {
            if (bookList[i].borrower == user) {
                count++;
            }
        }

        uint[] memory borrowedBookIds = new uint[](count);
        count = 0;
        for (uint i = 0; i < bookList.length; i++) {
            if (bookList[i].borrower == user) {
                borrowedBookIds[count] = i;
                count++;
            }
        }

        return borrowedBookIds;
    }

    function getBookCount() public view returns (uint256) {
        return bookList.length;
    }

    function getBookCID(uint bookId) public view returns (string memory) {
        require(bookId >= 0 && bookId < bookList.length, "Invalid Book ID");

        Book storage book = bookList[bookId];
        return book.pinataCid;
    }
}
