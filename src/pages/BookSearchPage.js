import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { fetchBooks } from "../utils/apiUtils";
import { addBookToBookshelf, removeBookFromBookshelf } from "../utils/storageUtils";
import styles from "./BookSearchPage.module.css";
import { getBookshelfFromStorage } from "../utils/storageUtils";
import NotificationPopup from '../components/NotificationPopup';

const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [bookshelf, setBookshelf] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const books = getBookshelfFromStorage();
    setBookshelf(books);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchBooks(searchQuery)
        .then((data) => setBooks(data.docs))
        .catch((error) => console.error("Error fetching books:", error));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToBookshelf = (book) => {
    addBookToBookshelf(book);
    setNotificationMessage(`${book.title} added to your bookshelf!`);
    setShowNotification(true);
  };

  const handleRemoveFromBookshelf = (book) => {
    removeBookFromBookshelf(book);
    setBookshelf((prevBookshelf) => prevBookshelf.filter((b) => b.key !== book.key));
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
    setNotificationMessage('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Find Your Book</h1>
      <input
        type="text"
        placeholder="Search for books..."
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.bookList}>
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onAddToBookshelf={handleAddToBookshelf}
            onRemoveFromBookshelf={handleRemoveFromBookshelf}
            isInBookshelf={bookshelf.some((b) => b.key === book.key)}
          />
        ))}
      </div>
      {showNotification && (
      <NotificationPopup
        message={notificationMessage}
        onClose={handleCloseNotification}
      />
    )}
    </div>
  );
};

export default BookSearchPage;