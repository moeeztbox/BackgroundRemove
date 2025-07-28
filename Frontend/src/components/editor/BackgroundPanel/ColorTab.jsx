import { useEffect } from "react";
import { useEditor } from "../../../context/EditorContext";
import { useImage } from "../../../context/ImageContext";
import CustomColorPicker from "./CustomColorPicker";
import ColorSwatch from "./ColorSwatch";
import NoColorButton from "./NoColorButton";
import axios from "axios";

const colors = [
  "#ffffff",
  "#facc15",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#fb923c",
  "#e879f9",
  "#86efac",
];

function ColorTab() {
  const { selectedBgColor, setEditedImageURL } = useEditor();
  const { imageFile } = useImage();
  useEffect(() => {
    const applyColorBackground = async () => {
      if (!imageFile) return; // only block if no image

      const formData = new FormData();
      formData.append("image", imageFile);

      // Only append color if it exists
      if (selectedBgColor) {
        formData.append("color", selectedBgColor);
      } else {
        formData.append("color", "none"); // Handle null/none explicitly
      }

      try {
        const response = await axios.post(
          "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=add-background-color",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const addColorBackground = response.data.data.imageUrl;
        setEditedImageURL(addColorBackground);
      } catch (error) {
        console.error("Error applying color background:", error);
      }
    };

    applyColorBackground();
  }, [selectedBgColor, imageFile]);

  return (
    <div className="max-h-64 overflow-y-auto pr-1 hide-scrollbar">
      <div className="grid grid-cols-3 gap-6">
        <NoColorButton />
        <CustomColorPicker />
        {colors.map((color, index) => (
          <ColorSwatch key={index} color={color} />
        ))}
      </div>
    </div>
  );
}

export default ColorTab;
