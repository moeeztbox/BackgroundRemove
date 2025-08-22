import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ImageProvider } from "./context/ImageContext";
import { EditorProvider } from "./context/EditorContext";

import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <ImageProvider>
      <EditorProvider>
        <Router>
          {/* Background Gradient */}
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-yellow-500 flex flex-col">
            {/* Navbar */}
            <header className="bg-blue-950 bg-opacity-70 shadow-lg py-3">
              <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-white">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                  ✨ MyEditor
                </Link>
                <nav className="flex gap-6 text-lg font-medium">
                  <Link to="/" className="hover:text-yellow-400 transition">
                    Home
                  </Link>
                  <Link
                    to="/editor"
                    className="hover:text-yellow-400 transition"
                  >
                    Editor
                  </Link>
                </nav>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex flex-1 items-center justify-center p-6">
              <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/editor" element={<Editor />} />
                </Routes>
              </div>
            </main>

            {/* Footer */}
            <footer className="bg-blue-950 bg-opacity-80 py-4 text-center text-sm text-gray-200">
              © {new Date().getFullYear()} MyEditor — All Rights Reserved
            </footer>
          </div>
        </Router>
      </EditorProvider>
    </ImageProvider>
  );
}

export default App;
