import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();
  const isBookSearchPage = location.pathname === '/';
  const isBookshelfPage = location.pathname === '/bookshelf';

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Book Shelf</div>
      <nav>
        {isBookSearchPage ? (
          <button className={styles.button}>
            <Link to="/bookshelf">My Bookshelf</Link>
          </button>
        ) : (
          <button className={styles.button}>
            <Link to="/">Go to Search</Link>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;