import { useEditor } from "../../../context/EditorContext";

function ColorSwatch({ color }) {
  const { selectedBgColor, toggleSelectedBgColor } = useEditor();

  const isSelected = selectedBgColor === color;

  return (
    <div
      onClick={() => toggleSelectedBgColor(color)}
      className={`w-full aspect-square border rounded-md cursor-pointer ${
        isSelected ? "ring-2 ring-blue-500" : "border-gray-300"
      }`}
      style={{ backgroundColor: color }}
      title={color}
    />
  );
}
export default ColorSwatch;
