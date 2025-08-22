import axios from "axios";
import { useImage } from "../../../context/ImageContext";
import { useEditor } from "../../../context/EditorContext";

function BlurFullToggle() {
  const { imageFile, imageMeta } = useImage();
  const {
    setEditedImageURL,
    getEditedImageFile,
    isBlurEnabled,
    setIsBlurEnabled,
    color,
    photo,
    hello,
    setHello,
    setColor,
    setPhoto,
    setFinalImage, // ✅ always update final image
  } = useEditor();

  // ✅ Utility to convert URL back into File
  const convertURLToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], imageMeta.name || "image", {
      type: imageMeta.type || blob.type,
    });
  };

  const applyFullBlur = async () => {
    try {
      const formData = new FormData();
      let imageToSend;

      // ✅ Step 1: Pick the latest image from hello > color > photo > editedImage
      if (hello) {
        imageToSend = await convertURLToFile(hello);
      } else if (color) {
        imageToSend = await convertURLToFile(color);
      } else if (photo) {
        imageToSend = await convertURLToFile(photo);
      } else {
        imageToSend = await getEditedImageFile();
      }

      // ✅ Step 2: Send to backend
      formData.append("image", imageToSend);
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
      console.log("Full Blur URL:", fullBlurURL);

      // ✅ Step 3: Store result
      if (hello) {
        setHello(fullBlurURL);
      } else if (color || photo) {
        setHello(fullBlurURL);
        setColor(null);
        setPhoto(null);
      } else {
        setEditedImageURL(fullBlurURL);
      }

      // ✅ Step 4: Always update final image
      setFinalImage(fullBlurURL);
    } catch (error) {
      console.error("Blur failed:", error);
      alert("Error applying blur");
    }
  };

  const removeBlur = () => {
    if (imageFile) {
      const originalURL = URL.createObjectURL(imageFile);
      setEditedImageURL(originalURL);
      setFinalImage(originalURL); // ✅ reset final image to original
    }
  };

  const handleToggle = () => {
    const newState = !isBlurEnabled;
    setIsBlurEnabled(newState);

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
          isBlurEnabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            isBlurEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default BlurFullToggle;
