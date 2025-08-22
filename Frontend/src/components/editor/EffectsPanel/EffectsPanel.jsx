import { useEditor } from "../../../context/EditorContext";
// import BlurAmountSlider from "./BlurAmountSlider";
import RemoveBackgroundToggle from "./RemoveBackgroundToggle";
import GrayscaleToggle from "./GrayscaleToggle";
import BlurFullToggle from "./BlurFullToggle";
import { X } from "lucide-react"; // ✅ Nice close icon

function EffectsPanel() {
  const { isEffectsOpen, toggleEffects } = useEditor();

  if (!isEffectsOpen) return null;

  return (
    <div
      className="fixed bottom-6 right-6 w-80 bg-white/80 backdrop-blur-md 
                 shadow-2xl rounded-2xl p-5 border border-gray-200 z-50 
                 animate-slideIn"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-700">🎨 Effects</h3>
        <button
          onClick={toggleEffects}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5">
        {/* <div className="p-3 bg-gray-50 rounded-xl shadow-sm border">
          <BlurAmountSlider />
        </div> */}

        <div className="p-3 bg-gray-50 rounded-xl shadow-sm border">
          <RemoveBackgroundToggle />
        </div>

        <div className="p-3 bg-gray-50 rounded-xl shadow-sm border">
          <GrayscaleToggle />
        </div>

        <div className="p-3 bg-gray-50 rounded-xl shadow-sm border">
          <BlurFullToggle />
        </div>
      </div>
    </div>
  );
}

export default EffectsPanel;
