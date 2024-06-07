export const getBookshelfFromStorage = () => {
  const bookshelf = localStorage.getItem('bookshelf');
  return bookshelf ? JSON.parse(bookshelf) : [];
};

export const addBookToBookshelf = (book) => {
  const bookshelf = getBookshelfFromStorage();
  localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
};

export const removeBookFromBookshelf = (book) => {
  const bookshelf = getBookshelfFromStorage();
  const updatedBookshelf = bookshelf.filter(b => b.key !== book.key);
  localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
};
