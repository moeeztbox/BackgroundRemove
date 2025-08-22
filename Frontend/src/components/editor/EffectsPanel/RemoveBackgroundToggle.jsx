import axios from "axios";
import { useImage } from "../../../context/ImageContext";
import { useEditor } from "../../../context/EditorContext";

function RemoveBackgroundToggle() {
  const { imageFile } = useImage();
  const {
    setEditedImageURL,
    getEditedImageFile,
    isRemoveBackgroundEnabled,
    setIsRemoveBackgroundEnabled,
    setIsProcessing, // ✅ loader state
    setFinalImage, // ✅ always update final image
  } = useEditor();

  const applyBackgroundRemoval = async () => {
    setIsProcessing(true); // show loader
    const formData = new FormData();
    const imageToSend = await getEditedImageFile();
    formData.append("image", imageToSend);

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

      // ✅ Update preview + final state
      setEditedImageURL(removedBgURL);
      setFinalImage(removedBgURL);
    } catch (error) {
      console.error("Background removal failed:", error);
      alert("Error removing background");
    } finally {
      setIsProcessing(false); // hide loader
    }
  };

  const restoreOriginalImage = () => {
    if (imageFile) {
      const originalURL = URL.createObjectURL(imageFile);

      // ✅ Reset preview + final state
      setEditedImageURL(originalURL);
      setFinalImage(originalURL);
    }
  };

  const handleToggle = () => {
    const newState = !isRemoveBackgroundEnabled;
    setIsRemoveBackgroundEnabled(newState);

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
          isRemoveBackgroundEnabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            isRemoveBackgroundEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default RemoveBackgroundToggle;
