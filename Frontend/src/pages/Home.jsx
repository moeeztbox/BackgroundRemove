import FileUpload from "../components/home/FileUpload";

function Home() {
  return (
    <div className="w-full max-w-5xl bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-2xl shadow-2xl p-8">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Upload Box */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Upload Your Image
          </h2>
          <p className="text-gray-600 mb-6">
            Drag & drop or choose a file to start editing.
          </p>
          <FileUpload />
        </div>

        {/* Right Side - Website Highlights */}
        <div className="text-white space-y-6">
          <h2 className="text-3xl font-extrabold text-gold-400">
            Why Choose Our Editor?
          </h2>
          <ul className="space-y-4 list-disc list-inside text-lg">
            <li>✨ Easy to use & beginner friendly</li>
            <li>🎨 Powerful background editing tools</li>
            <li>⚡ Fast and optimized performance</li>
            <li>🖼️ Support for multiple image formats</li>
            <li>🔒 Safe & secure processing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
