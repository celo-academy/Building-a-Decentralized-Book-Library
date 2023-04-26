/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";
import { contractABI, contractAddress } from "./utils/const";
import {
  Navbar,
  Welcome,
  AddBook,
  BookList,
  ReadingList,
} from "./components/Index";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [contract, setContractInstance] = useState(null);
  const [kit, setKit] = useState(null);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState([]);
  const [bookCIDs, setBookCIDs] = useState([]);
  const [selectedCID, setSelectedCID] = useState("");

  const initContract = useCallback(async () => {
    try {
      if (!window.ethereum) {
        console.error("Celo Wallet extension not detected");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const kit = newKitFromWeb3(web3);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = new kit.web3.eth.Contract(contractABI, contractAddress);

      setCurrentAccount((await kit.web3.eth.getAccounts())[0]);
      setKit(kit);
      setContractInstance(contract);
    } catch (error) {
      console.log(error);
    }
  }, [contractAddress]);
  useEffect(() => {
    if (currentAccount) {
      initContract();
    }
  }, [currentAccount, initContract]);

  const checkIfWalletIsConnected = () => {
    try {
      if (!window.ethereum)
        return alert("Please install the Celo wallet extension");

      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts((err, accounts) => {
        if (err) {
          console.error(err);
          throw new Error("Failed to get accounts");
        }
        if (accounts && accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          console.log("No accounts found");
        }
        console.log(accounts);
      });
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectToWallet = async () => {
    try {
      if (!window.ethereum)
        throw new Error("Celo wallet extension not detected");

      await window.ethereum.enable({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to connect to Celo wallet");
    }
  };

  const addBook = async (title, author, pinataCid, availableCopies) => {
    try {
      console.log(
        "title:",
        title,
        "author:",
        author,
        "pinataCid:",
        pinataCid,
        "availableCopies:",
        availableCopies
      );

      await contract.methods
        .addBook(title, author, pinataCid, availableCopies)
        .send({ from: currentAccount, gasLimit: 2000000 });

      const bookCount = await contract.methods.getBookCount().call();
      setBookCount(bookCount);

      // Fetch the new book by its index (bookCount - 1) and update the state
      const newBook = await contract.methods.getAllBooks().call();
      setBooks([...books, newBook]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooks = async () => {
    try {
      if (!contract) return;
      const bookCount = await contract.methods.getBookCount().call();
      const booksArray = await contract.methods.getAllBooks().call();

      setBooks(booksArray);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [contract]);

  const borrowBook = async (bookId) => {
    try {
      await contract.methods
        .borrowBook(bookId)
        .send({ from: currentAccount, gasLimit: 2000000 });
      const updateBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...book, availableCopies: book.availableCopies - 1 };
        }
        return book;
      });
      setBooks(updateBooks);
    } catch (error) {
      console.error("Error borrowing the book:", error);
    }
  };

  const readingList = async () => {
    try {
      const borrowedBooks = await contract.methods
        .readingList(currentAccount)
        .call();
      setUserBorrowedBooks(borrowedBooks);
    } catch (error) {
      console.error("Error fetching reading list:", error);
    }
  };
  useEffect(() => {
    if (currentAccount && contract) {
      readingList();
    }
  }, [currentAccount, contract, readingList]);

  const getBookCIDs = async () => {
    const bookCIDs = await Promise.all(
      userBorrowedBooks.map(async (bookId) => {
        const pinataCid = await contract.methods.getBookCID(bookId).call();

        return { bookId, pinataCid };
      })
    );

    setBookCIDs(bookCIDs);
  };

  useEffect(() => {
    if (userBorrowedBooks.length > 0) {
      getBookCIDs();
    }
  }, [userBorrowedBooks]);

  const openPDF = (pinataCid) => {
    setSelectedCID(pinataCid);
  };

  const returnBook = async (bookId) => {
    try {
      await contract.methods
        .returnBook(bookId)
        .send({ from: currentAccount, gasLimit: 200000 });
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...book, availableCopies: book.availableCopies + 1 };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome
          connectToWallet={connectToWallet}
          currentAccount={currentAccount}
        />
      </div>
      <AddBook addBook={addBook} />
      <BookList
        books={books}
        borrowBook={borrowBook}
        readingList={readingList}
      />
      <ReadingList
        borrowedBooks={userBorrowedBooks}
        bookCIDs={bookCIDs}
        openPDF={openPDF}
        selectedCID={selectedCID}
        returnBook={returnBook}
      />
    </div>
  );
}
export default App;
