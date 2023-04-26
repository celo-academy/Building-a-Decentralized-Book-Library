import React, { useState } from "react";

const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_API_SECRET;

const Input = ({ placeholder, name, type, value, handleChange, id }) => (
  <input
    id={id}
    name={name}
    placeholder={placeholder}
    type={type}
    step="1"
    value={value}
    onChange={(e) => handleChange(e)}
    className="white-glassmorphism"
  />
);

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [pinataCid, setPinataCid] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "availableCopies":
        setAvailableCopies(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pinataMetadata", JSON.stringify({ name: file.name }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("File added to IPFS with CID:", result.IpfsHash);
      setPinataCid(result.IpfsHash);
    } else {
      console.error("Error uploading file to IPFS:", response.status);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !pinataCid || !availableCopies) return;

    addBook(title, author, pinataCid, availableCopies);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Book Title"
          name="title"
          type="text"
          value={title}
          handleChange={handleChange}
        />
        <Input
          placeholder="Book Author"
          name="author"
          type="text"
          value={author}
          handleChange={handleChange}
        />
        <Input
          placeholder="Number of Copies"
          name="availableCopies"
          type="number"
          value={availableCopies}
          handleChange={handleChange}
        />
        <input
          placeholder="pdf here"
          type="file"
          id="pdfFileInput"
          accept="application/pdf"
          onChange={handleFileChange}
          className="white-glassmorphism"
        />
      </div>
      <div />
      <button type="button" onClick={handleSubmit}>
        Add Book
      </button>
    </div>
  );
};

export default AddBook;
