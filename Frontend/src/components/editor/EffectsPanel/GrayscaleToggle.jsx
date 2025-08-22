import axios from "axios";
import { useEditor } from "../../../context/EditorContext";
import { useImage } from "../../../context/ImageContext";

function GrayscaleToggle() {
  const {
    setEditedImageURL,
    getEditedImageFile,
    isGrayScaleEnabled,
    setIsGrayScaleEnabled,
    color,
    photo,
    hello,
    setHello,
    setColor,
    setPhoto,
    setFinalImage, // ✅ NEW
  } = useEditor();

  const { imageFile, imageMeta } = useImage();

  const convertURLToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], imageMeta.name || "image", {
      type: imageMeta.type || blob.type,
    });
  };

  const applyGrayscale = async () => {
    try {
      const formData = new FormData();
      let imageToSend;

      if (hello) {
        imageToSend = await convertURLToFile(hello);
      } else if (color) {
        imageToSend = await convertURLToFile(color);
      } else if (photo) {
        imageToSend = await convertURLToFile(photo);
      } else {
        imageToSend = await getEditedImageFile();
      }

      formData.append("image", imageToSend);
      const response = await axios.post(
        "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=grayscale",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const grayscaleURL = response.data.data.imageUrl;
      console.log("Grayscale URL:", grayscaleURL);

      // ✅ Update all your local states
      if (hello) {
        setHello(grayscaleURL);
      } else if (color || photo) {
        setHello(grayscaleURL);
        setColor(null);
        setPhoto(null);
      } else {
        setEditedImageURL(grayscaleURL);
      }

      // ✅ Always update final image
      setFinalImage(grayscaleURL);
    } catch (error) {
      console.error("Grayscale failed:", error);
      alert("Error applying grayscale");
    }
  };

  const removeGrayscale = () => {
    if (imageFile) {
      const originalURL = URL.createObjectURL(imageFile);
      setEditedImageURL(originalURL);
      setFinalImage(originalURL); // ✅ reset final image to original
    }
  };

  const handleToggle = () => {
    const newState = !isGrayScaleEnabled;
    setIsGrayScaleEnabled(newState);

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
          isGrayScaleEnabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            isGrayScaleEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default GrayscaleToggle;
