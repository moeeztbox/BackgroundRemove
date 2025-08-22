import { useEditor } from "../../context/EditorContext";

function ActionPanel() {
  const { toggleBackground, toggleEffects, isEffectsOpen, isBackgroundOpen } =
    useEditor();

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={toggleEffects}
        className={`py-2 px-4 rounded cursor-pointer text-white transition-colors ${
          isEffectsOpen ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Effects
      </button>
      <button
        onClick={toggleBackground}
        className={`py-2 px-4 rounded cursor-pointer text-white transition-colors ${
          isBackgroundOpen ? "bg-gray-700" : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        Background
      </button>
    </div>
  );
}

export default ActionPanel;
