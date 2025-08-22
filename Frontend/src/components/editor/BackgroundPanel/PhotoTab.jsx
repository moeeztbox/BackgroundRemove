import { useEffect } from "react";
import { useEditor } from "../../../context/EditorContext";
import { useImage } from "../../../context/ImageContext";
import axios from "axios";

const staticImages = [
  "/images/1_thumbnail.jpg",
  "/images/2_thumbnail.jpg",
  "/images/3_thumbnail.jpg",
  "/images/4_thumbnail.jpg",
  "/images/5_thumbnail.jpg",
  "/images/6_thumbnail.jpg",
  "/images/7_thumbnail.jpg",
  "/images/8_thumbnail.jpg",
];

function PhotoTab() {
  const {
    customImages,
    setCustomImages,
    selectedBgPhoto,
    toggleSelectedBgPhoto,
    getEditedImageFile,
    setAppliedBackgroundType,
    setSelectedBgColor,
    editedImageURL,
    setPhoto,
    setColor,
  } = useEditor();

  const { imageFile } = useImage();
  const allImages = [...customImages, ...staticImages];

  // Apply selected photo background
  useEffect(() => {
    const updateBackgroundPhoto = async () => {
      if (!selectedBgPhoto) return; // No photo selected, skip effect

      try {
        const imageToSend = await getEditedImageFile();

        const formData = new FormData();
        formData.append("image", imageToSend);

        // Convert selected background image to File
        const response = await fetch(selectedBgPhoto);
        const blob = await response.blob();
        const file = new File([blob], "background.jpg", { type: blob.type });
        formData.append("background", file);

        // Send to backend
        const backendResponse = await axios.post(
          "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=add-background-photo",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const updatedImageURL = backendResponse?.data?.data?.imageUrl;
        if (updatedImageURL) {
          setPhoto(updatedImageURL);
          setColor(null);
          // setEditedImageURL(updatedImageURL);
          setAppliedBackgroundType("photo");
          setSelectedBgColor(null); // clear color when photo used
        }
      } catch (error) {
        console.error(
          "Error applying photo background:",
          error?.response || error
        );
      }
    };

    updateBackgroundPhoto();
  }, [selectedBgPhoto]);

  // Upload custom photo
  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImages((prev) => [imageUrl, ...prev]);
    }
  };

  // Handle click (toggle selection or revert)
  const handlePhotoClick = (src) => {
    if (selectedBgPhoto === src) {
      // Revert to original image
      toggleSelectedBgPhoto(null);
      setPhoto(editedImageURL);
      // setEditedImageURL(imageFile ? URL.createObjectURL(imageFile) : null);
      setAppliedBackgroundType("photo");
      setSelectedBgColor(null);
    } else {
      toggleSelectedBgPhoto(src);
    }
  };

  // Explicit remove background image
  const handleNoImageClick = () => {
    toggleSelectedBgPhoto(null);
    // setEditedImageURL(imageFile ? URL.createObjectURL(imageFile) : null);
    setPhoto(editedImageURL);
    setAppliedBackgroundType("photo");
    setSelectedBgColor(null);
  };

  return (
    <div className="max-h-64 overflow-y-auto pr-1 hide-scrollbar">
      <div className="grid grid-cols-3 gap-6">
        {/* No Image Button */}
        <button
          onClick={handleNoImageClick}
          className="w-full aspect-square bg-gray-100 rounded-md border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-200 cursor-pointer"
        >
          No Image
        </button>

        {/* Upload box */}
        <label className="w-full aspect-square border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadChange}
          />
          <span className="text-gray-400 text-xl font-bold">+</span>
        </label>

        {/* Background photo options */}
        {allImages.map((src, index) => (
          <div
            key={index}
            onClick={() => handlePhotoClick(src)}
            className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
              selectedBgPhoto === src
                ? "border-blue-500"
                : "border-transparent hover:border-blue-300"
            }`}
          >
            <img src={src} alt="bg" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoTab;
