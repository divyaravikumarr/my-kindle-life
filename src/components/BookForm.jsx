import { useState } from 'react';
import axios from 'axios';

function BookForm({ onUpload }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file || !title) {
    alert("Please provide a title and select a PDF file.");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("author", author);      // Optional
  formData.append("tags", tags);          // Optional
  formData.append("file", file);          // File from <input type="file" />

  try {
    const response = await axios.post("http://localhost:8080/api/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload success:", response.data);
    alert("Book uploaded successfully!");
    // Reset form here if needed
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload book. Check console.");
  }
};


  return (
   <form onSubmit={handleSubmit} className="space-y-4">
  <input
    className="p-2 bg-pink-100 text-pink-700 w-full rounded"
    placeholder="Book Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />
  <input
    className="p-2 bg-pink-100 text-pink-700 w-full rounded"
    placeholder="Author"
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
  />
  <input
    className="p-2 bg-pink-100 text-pink-700 w-full rounded"
    placeholder="Tags (comma-separated)"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
  />
  <input
    className="p-2 w-full"
    type="file"
    accept="application/pdf"
    onChange={(e) => setFile(e.target.files[0])}
  />
  <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
    Upload Book
  </button>
</form>


  );
}
export default BookForm;
