import { useEditor } from "../../context/EditorContext";

function ActionPanel() {
  const { toggleEffects, toggleBackground } = useEditor();

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={toggleEffects}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
      >
        Effects
      </button>
      <button
        onClick={toggleBackground}
        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded cursor-pointer"
      >
        Background
      </button>
    </div>
  );
}

export default ActionPanel;
