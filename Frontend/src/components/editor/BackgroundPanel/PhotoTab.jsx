import { useEffect } from "react";
import { useEditor } from "../../../context/EditorContext";
import { useImage } from "../../../context/ImageContext";
import UploadCustomImage from "./UploadCustomImage";
import ImageGridItem from "./ImageGridItem";
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
    selectedBgPhoto,
    setSelectedBgPhoto,
    setEditedImageURL,
  } = useEditor();
  const { imageFile } = useImage();

  const toggleSelectedBgPhoto = (photo) => {
    setSelectedBgPhoto((prev) => (prev === photo ? null : photo));
  };

  useEffect(() => {
    const updateBackgroundPhoto = async () => {
      if (!imageFile) return;

      const formData = new FormData();
      formData.append("image", imageFile);

      if (selectedBgPhoto) {
        // 🟢 Apply selected background
        try {
          const response = await fetch(selectedBgPhoto);
          const blob = await response.blob();
          const file = new File([blob], "background.jpg", { type: blob.type });
          formData.append("background", file);
        } catch (error) {
          console.error("Error fetching background image:", error);
          return;
        }
      } else {
        // 🔴 Remove background photo (revert to original)
        formData.append("background", "none");
      }

      try {
        const response = await axios.post(
          "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=add-background-photo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedImageURL = response?.data?.data?.imageUrl;
        if (updatedImageURL) {
          setEditedImageURL(updatedImageURL);
        }
      } catch (error) {
        console.error(
          "Error updating background photo:",
          error?.response || error
        );
      }
    };

    updateBackgroundPhoto();
  }, [selectedBgPhoto, imageFile]);

  const allImages = [...customImages, ...staticImages];

  return (
    <div className="max-h-64 overflow-y-auto pr-1 hide-scrollbar">
      <div className="grid grid-cols-3 gap-6">
        <UploadCustomImage />
        {allImages.map((src, index) => (
          <ImageGridItem
            key={index}
            src={src}
            isSelected={selectedBgPhoto === src}
            onClick={() => toggleSelectedBgPhoto(src)}
          />
        ))}
      </div>
    </div>
  );
}

export default PhotoTab;
