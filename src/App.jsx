import { useState } from "react";
import Upload from "./pages/Upload";
import Bookshelf from "./pages/Bookshelf";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-pink-50 text-gray-800">
      <header className="text-center py-6 text-3xl font-bold text-pink-700">❤️Scraps of Life❤️</header>

      <div className="max-w-4xl mx-auto px-4">
        <Upload onUpload={() => setRefresh(!refresh)} />
        <hr className="my-8 border-pink-300" />
        <Bookshelf refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
