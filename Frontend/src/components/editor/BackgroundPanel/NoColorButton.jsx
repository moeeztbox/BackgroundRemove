import { useEditor } from "../../../context/EditorContext";

function NoColorButton() {
  const { setSelectedBgColor } = useEditor();

  return (
    <button
      onClick={() => setSelectedBgColor(null)}
      className="w-full aspect-square bg-gray-100 rounded-md border border-gray-300 text-xs flex items-center justify-center hover:bg-gray-200 cursor-pointer"
    >
      No Color
    </button>
  );
}
export default NoColorButton;
