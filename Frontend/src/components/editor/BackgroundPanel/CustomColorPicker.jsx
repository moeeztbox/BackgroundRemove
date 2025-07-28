import { useEditor } from "../../../context/EditorContext";

function CustomColorPicker() {
  const { selectedBgColor, toggleSelectedBgColor } = useEditor();

  const handleChange = (e) => {
    const selectedColor = e.target.value;
    toggleSelectedBgColor(selectedColor);
  };

  return (
    <label className="w-full aspect-square rounded-md border border-gray-300 flex items-center justify-center bg-white cursor-pointer hover:bg-gray-100">
      <input type="color" onChange={handleChange} className="hidden" />
      🎨
    </label>
  );
}
export default CustomColorPicker;
