import { useState } from "react";
import axios from "axios";
import { useImage } from "../../../context/ImageContext";
import { useEditor } from "../../../context/EditorContext";

function BlurFullToggle() {
  const [enabled, setEnabled] = useState(false);
  const { imageFile } = useImage();
  const { setEditedImageURL } = useEditor();

  const applyFullBlur = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=full-blur-background",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const fullBlurURL = response.data.data.imageUrl;
      setEditedImageURL(fullBlurURL);
    } catch (error) {
      console.error("Blur failed:", error);
      alert("Error applying blur");
    }
  };

  const removeBlur = () => {
    if (imageFile) {
      const originalURL = URL.createObjectURL(imageFile);
      setEditedImageURL(originalURL);
    }
  };

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);

    if (newState) {
      applyFullBlur();
    } else {
      removeBlur();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">Blur Entire Image</label>
      <button
        onClick={handleToggle}
        className={`relative cursor-pointer inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
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

export default BlurFullToggle;
