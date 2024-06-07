import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import {
  getBookshelfFromStorage,
  removeBookFromBookshelf,
} from "../utils/storageUtils";
import styles from "./BookshelfPage.module.css";
import NotificationPopup from '../components/NotificationPopup';


const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const books = getBookshelfFromStorage();
    setBookshelf(books);
  }, []);

  const handleRemoveFromBookshelf = (book) => {
    removeBookFromBookshelf(book);
    setBookshelf((prevBookshelf) => prevBookshelf.filter((b) => b.key !== book.key));
    setNotificationMessage(`${book.title} removed from your bookshelf!`);
    setShowNotification(true);
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
    setNotificationMessage('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>My Bookshelf</h2>
      <div className={styles.bookList}>
        {bookshelf.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            onRemoveFromBookshelf={handleRemoveFromBookshelf}
            isInBookshelf={true}
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

export default BookshelfPage;
