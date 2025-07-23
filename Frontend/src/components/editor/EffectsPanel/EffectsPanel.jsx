import { useEditor } from "../../../context/EditorContext";
import BlurBackgroundToggle from "./BlurBackgroundToggle";
import BlurAmountSlider from "./BlurAmountSlider";
import RemoveBackgroundToggle from "./RemoveBackgroundToggle";
import GrayscaleToggle from "./GrayscaleToggle";
import BlurFullToggle from "./BlurFullToggle";

function EffectsPanel() {
  const { isEffectsOpen, toggleEffects } = useEditor();

  if (!isEffectsOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-lg rounded-lg p-4 border z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Effects</h3>
        <button
          onClick={toggleEffects}
          className="text-gray-400 hover:text-gray-600 text-md cursor-pointer"
        >
          ❌
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <BlurBackgroundToggle />
        <BlurAmountSlider />
        <RemoveBackgroundToggle />
        <GrayscaleToggle />
        <BlurFullToggle />
      </div>
    </div>
  );
}

export default EffectsPanel;
