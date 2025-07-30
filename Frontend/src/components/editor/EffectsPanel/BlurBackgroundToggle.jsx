import { useEffect } from "react";
import axios from "axios";
import { useEditor } from "../../../context/EditorContext";
import { useImage } from "../../../context/ImageContext";

function BlurBackgroundToggle() {
  const {
    isBlurBackgroundEnabled,
    setIsBlurBackgroundEnabled,
    blurAmount,
    setEditedImageURL,
  } = useEditor();
  const { imageFile } = useImage();

  // Handle toggle and API call
  useEffect(() => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("blur_strength", blurAmount);

    const applyBlur = async () => {
      try {
        console.log("Applying blur with values:");
        console.log("Image file:", imageFile);
        console.log("Blur amount:", blurAmount);

        const response = await axios.post(
          "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=blur-background-level",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response from server:", response.data);
        setEditedImageURL(response.data.data.imageUrl);
      } catch (error) {
        console.error("Failed to apply blur:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    };

    const revertToOriginal = () => {
      const originalURL = URL.createObjectURL(imageFile);
      setEditedImageURL(originalURL);
    };

    if (isBlurBackgroundEnabled) {
      applyBlur();
    } else {
      revertToOriginal();
    }
  }, [isBlurBackgroundEnabled, blurAmount, imageFile, setEditedImageURL]);

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">Blur Background</label>
      <button
        onClick={() => setIsBlurBackgroundEnabled((prev) => !prev)}
        className={`relative cursor-pointer inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
          isBlurBackgroundEnabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            isBlurBackgroundEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default BlurBackgroundToggle;
