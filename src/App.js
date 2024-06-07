import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearchPage from './pages/BookSearchPage';
import BookshelfPage from './pages/BookshelfPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<BookSearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;