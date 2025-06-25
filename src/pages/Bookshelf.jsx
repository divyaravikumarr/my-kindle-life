import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

const Bookshelf = ({ refresh }) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  // Filter books by title, author, or tags
  const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      (book.author && book.author.toLowerCase().includes(query)) ||
      (book.tags && book.tags.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search by title, author, or tags..."
        className="w-full p-3 rounded-md bg-pink-100 text-pink-700 placeholder-pink-400 border border-pink-200 focus:outline-pink-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onDelete={fetchBooks} />
        ))}
        {filteredBooks.length === 0 && (
          <p className="text-center col-span-full text-pink-500">No books match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Bookshelf;
