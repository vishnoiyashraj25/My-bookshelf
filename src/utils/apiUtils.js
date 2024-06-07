const API_URL = 'https://openlibrary.org/search.json';

export const fetchBooks = async query => {
  const response = await fetch(`${API_URL}?q=${query}&limit=10&page=1`);
  const data = await response.json();
  return data;
};