import { useEditor } from "../../../context/EditorContext";
import BackgroundTabSwitcher from "./BackgroundTabSwitcher";
import PhotoTab from "./PhotoTab";
import ColorTab from "./ColorTab";

function BackgroundPanel() {
  const { isBackgroundOpen, toggleBackground, bgTab } = useEditor();

  if (!isBackgroundOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white shadow-lg rounded-lg p-4 border z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Background</h3>
        <button onClick={toggleBackground} className="cursor-pointer text-md">
          ❌
        </button>
      </div>

      <BackgroundTabSwitcher />
      {bgTab === "photo" ? <PhotoTab /> : <ColorTab />}
    </div>
  );
}

export default BackgroundPanel;
