import { useState } from "react";
import axios from "axios";
import { useImage } from "../../../context/ImageContext";
import { useEditor } from "../../../context/EditorContext";

function GrayscaleToggle() {
  const [enabled, setEnabled] = useState(false);
  const { imageFile } = useImage();
  const { setEditedImageURL } = useEditor();

  const applyGrayscale = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=grayscale",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const grayscaleURL = response.data.data.imageUrl;
      setEditedImageURL(grayscaleURL);
    } catch (error) {
      console.error("Grayscale failed:", error);
      alert("Error applying grayscale");
    }
  };

  const removeGrayscale = () => {
    if (imageFile) {
      const originalURL = URL.createObjectURL(imageFile);
      setEditedImageURL(originalURL);
    }
  };

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);

    if (newState) {
      applyGrayscale();
    } else {
      removeGrayscale();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">Grayscale</label>
      <button
        onClick={handleToggle}
        className={`relative cursor-pointer inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default GrayscaleToggle;
