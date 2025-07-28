import { useState } from "react";
import axios from "axios";
import { useImage } from "../../../context/ImageContext";
import { useEditor } from "../../../context/EditorContext";

function RemoveBackgroundToggle() {
  const [enabled, setEnabled] = useState(false);
  const { imageFile } = useImage();
  const { setEditedImageURL } = useEditor();

  const applyBackgroundRemoval = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=remove-background",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const removedBgURL = response.data.data.imageUrl;
      setEditedImageURL(removedBgURL);
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Error removing background");
    }
  };

  const restoreOriginalImage = () => {
    if (imageFile) {
      const originalURL = URL.createObjectURL(imageFile);
      setEditedImageURL(originalURL);
    }
  };

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);

    if (newState) {
      applyBackgroundRemoval();
    } else {
      restoreOriginalImage();
    }
  };

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">Remove Background</label>
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

export default RemoveBackgroundToggle;
