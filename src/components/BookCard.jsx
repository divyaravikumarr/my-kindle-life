import axios from "axios";

const BookCard = ({ book, onDelete }) => {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/api/books/${book.id}`);
    onDelete();
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2 hover:shadow-md transition">
      <h2 className="text-xl font-semibold text-pink-700">{book.title}</h2>
      {book.author && <p className="text-sm text-pink-500">{book.author}</p>}
      {book.tags && <p className="text-xs text-pink-400">{book.tags}</p>}

      <div className="flex gap-2 mt-2">
        <a
          href={`http://localhost:8080/api/books/${book.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 text-sm"
        >
          Read
        </a>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm text-red-400 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
