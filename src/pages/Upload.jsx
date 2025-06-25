import { useState } from "react";
import axios from "axios";

const Upload = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Please provide a title and select a PDF!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("tags", tags);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setAuthor("");
      setTags("");
      setFile(null);
      onUpload(); // trigger refresh
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  return (
    <form className="p-6 bg-white rounded-xl shadow space-y-4" onSubmit={handleSubmit}>
      <input
        className="w-full p-2 rounded bg-pink-100 text-pink-700 placeholder-pink-400"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-pink-100 text-pink-700 placeholder-pink-400"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        className="w-full p-2 rounded bg-pink-100 text-pink-700 placeholder-pink-400"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        className="w-full p-2 text-pink-700"
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        type="submit"
        className="bg-pink-500 px-4 py-2 rounded text-white hover:bg-pink-600 transition"
      >
        Upload Book
      </button>
    </form>
  );
};

export default Upload;
