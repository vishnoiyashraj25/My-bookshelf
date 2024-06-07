import { useState, useEffect } from 'react';
import styles from './BookCard.module.css';

const BookCard = ({ book, onAddToBookshelf, onRemoveFromBookshelf, isInBookshelf }) => {
  const [isInBookshelfState, setIsInBookshelfState] = useState(isInBookshelf);

  useEffect(() => {
    setIsInBookshelfState(isInBookshelf);
  }, [isInBookshelf]);

  const handleRemoveFromBookshelf = () => {
    onRemoveFromBookshelf(book);
    setIsInBookshelfState(false);
  };

  const handleAddToBookshelf = () => {
    onAddToBookshelf(book);
    setIsInBookshelfState(true);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{book.title}</h3>
      <p className={styles.author}>
        Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}
      </p>
      <p className={styles.editionCount}>Edition Count: {book.edition_count}</p>
      {isInBookshelfState ? (
        <button onClick={handleRemoveFromBookshelf} className={styles.button}>
          Remove from Bookshelf
        </button>
      ) : (
        <button onClick={handleAddToBookshelf} className={styles.button}>
          Add to Bookshelf
        </button>
      )}
    </div>
  );
};

export default BookCard;