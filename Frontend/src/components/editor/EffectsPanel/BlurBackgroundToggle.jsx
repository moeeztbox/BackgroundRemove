import { useEditor } from "../../../context/EditorContext";

function BlurBackgroundToggle() {
  const { isBlurBackgroundEnabled, setIsBlurBackgroundEnabled } = useEditor();

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">Blur Background</label>
      <button
        onClick={() => setIsBlurBackgroundEnabled((prev) => !prev)}
        className={`relative cursor-pointer inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
          isBlurBackgroundEnabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            isBlurBackgroundEnabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default BlurBackgroundToggle;
