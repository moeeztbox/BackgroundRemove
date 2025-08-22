import { useImage } from "../context/ImageContext";
import { EditorProvider, useEditor } from "../context/EditorContext";
import ImagePreview from "../components/editor/ImagePreview";
import EffectsPanel from "../components/editor/EffectsPanel/EffectsPanel";
import BackgroundPanel from "../components/editor/BackgroundPanel/BackgroundPanel";
import DownloadButton from "../components/editor/DownloadButton";

function EditorContent() {
  const { imageURL } = useImage();
  const { isEffectsOpen, isBackgroundOpen, toggleEffects, toggleBackground } =
    useEditor();

  if (!imageURL) {
    return (
      <div className="text-center mt-20 text-lg text-gray-500">
        No image uploaded. Please upload one first.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800">
          Image Editor Studio
        </h1>
        <p className="text-gray-500">Apply effects and customize background</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Preview */}
        <div className="flex-1 flex items-center justify-center bg-white border-2 border-blue-200 rounded-2xl shadow-lg p-4">
          <ImagePreview />
        </div>

        {/* Right Panel with Effects & Background */}
        <div className="w-full lg:w-72 flex flex-col gap-6">
          {/* Effects */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
            <button
              onClick={toggleEffects}
              className="w-full flex justify-between items-center text-xl font-semibold text-blue-700 mb-3"
            >
              🎨 Effects
              <span>{isEffectsOpen ? "−" : "+"}</span>
            </button>

            {isEffectsOpen && <EffectsPanel />}
          </div>

          {/* Background */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
            <button
              onClick={toggleBackground}
              className="w-full flex justify-between items-center text-xl font-semibold text-blue-700 mb-3"
            >
              🖼 Background
              <span>{isBackgroundOpen ? "−" : "+"}</span>
            </button>

            {isBackgroundOpen && <BackgroundPanel />}
            <DownloadButton />
          </div>
        </div>
      </div>
    </div>
  );
}

function Editor() {
  return (
    <EditorProvider>
      <EditorContent />
    </EditorProvider>
  );
}

export default Editor;
