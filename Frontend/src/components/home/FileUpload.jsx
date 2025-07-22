import { useState } from "react";
import { useImage } from "../../context/ImageContext";

function FileUpload() {
  const { handleImageUpload } = useImage();
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex-1 border-2 ${
        isDragging
          ? "border-blue-500 bg-blue-50"
          : "border-dashed border-gray-400"
      } rounded-lg p-6 flex items-center justify-center text-center transition-colors`}
    >
      <label className="cursor-pointer w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <div className="text-gray-500">
          <p className="font-semibold">Upload Image</p>
          <p className="text-sm">
            or <span className="text-blue-500">drag & drop</span>
          </p>
        </div>
      </label>
    </div>
  );
}

export default FileUpload;
