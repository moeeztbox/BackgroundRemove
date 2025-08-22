import { useEditor } from "../../../context/EditorContext";
import { useImage } from "../../../context/ImageContext"; // ✅ Import image context
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
  const {
    selectedBgColor,
    setSelectedBgPhoto,
    setEditedImageURL,
    setAppliedBackgroundType,
    getEditedImageFile,
    toggleSelectedBgColor,
    setColor,
    setPhoto,
    editedImageURL,
  } = useEditor();
  const { imageURL } = useImage(); // ✅ Get imageURL from ImageContext

  const applyColorBackground = async (color) => {
    if (!color) return;
    const formData = new FormData();
    const imageToSend = await getEditedImageFile();
    formData.append("image", imageToSend);
    formData.append("color", color);

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
      console.log("Color Background Image URL:", addColorBackground);
      setColor(addColorBackground);
      setPhoto(null);
      // setEditedImageURL(addColorBackground);
      setAppliedBackgroundType("color");
      setSelectedBgPhoto(null);
    } catch (error) {
      console.error("Error applying color background:", error);
    }
  };

  const handlePresetColorClick = (color) => {
    if (selectedBgColor === color) {
      // Toggle off
      toggleSelectedBgColor(color);
      setSelectedBgPhoto(null);
      setColor(editedImageURL);
      setEditedImageURL(imageURL);
      setAppliedBackgroundType("color");
    } else {
      // Apply new color
      console.log("Applying preset color:", color);
      toggleSelectedBgColor(color);
      applyColorBackground(color);
    }
  };

  const handleColorPickerChange = (e) => {
    const customColor = e.target.value;
    if (selectedBgColor === customColor) {
      toggleSelectedBgColor(customColor);
      setSelectedBgPhoto(null);
      setColor(editedImageURL);
      setEditedImageURL(imageURL);
      setAppliedBackgroundType("color");
    } else {
      toggleSelectedBgColor(customColor);
      applyColorBackground(customColor);
    }
  };

  const handleNoColorClick = () => {
    toggleSelectedBgColor(null);
    setSelectedBgPhoto(null);
    setColor(editedImageURL);
    setEditedImageURL(imageURL);
    setAppliedBackgroundType("color");
  };

  return (
    <div className="max-h-64 overflow-y-auto pr-1 hide-scrollbar">
      <div className="grid grid-cols-3 gap-6">
        {/* No Color Button */}
        <button
          onClick={handleNoColorClick}
          className="w-full aspect-square bg-gray-100 rounded-md border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-200 cursor-pointer"
        >
          No Color
        </button>

        {/* Custom Color Picker */}
        <label className="w-full aspect-square rounded-md border border-gray-300 flex items-center justify-center bg-white cursor-pointer hover:bg-gray-100">
          <input
            type="color"
            onChange={handleColorPickerChange}
            className="hidden"
          />
          🎨
        </label>

        {/* Preset Color Swatches */}
        {colors.map((color, index) => {
          const isSelected = selectedBgColor === color;
          return (
            <div
              key={index}
              onClick={() => handlePresetColorClick(color)}
              className={`w-full aspect-square border rounded-md cursor-pointer ${
                isSelected ? "ring-2 ring-blue-500" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ColorTab;
