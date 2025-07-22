import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ImageProvider } from "./context/ImageContext";
import { EditorProvider } from "./context/EditorContext";

import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <ImageProvider>
      <EditorProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </div>
        </Router>
      </EditorProvider>
    </ImageProvider>
  );
}

export default App;
