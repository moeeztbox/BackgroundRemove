// components/editor/BackgroundPanel/BackgroundTabSwitcher.jsx
import { useEditor } from "../../../context/EditorContext";

export default function BackgroundTabSwitcher() {
  const { bgTab, setBgTab } = useEditor();

  return (
    <div className="flex border-b mb-4">
      <button
        className={`flex-1 cursor-pointer py-2 text-sm font-medium ${
          bgTab === "photo"
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setBgTab("photo")}
      >
        Photo
      </button>
      <button
        className={`flex-1 cursor-pointer py-2 text-sm font-medium ${
          bgTab === "color"
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500"
        }`}
        onClick={() => setBgTab("color")}
      >
        Color
      </button>
    </div>
  );
}
