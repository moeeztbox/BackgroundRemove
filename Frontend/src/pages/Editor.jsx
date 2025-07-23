import { useImage } from "../context/ImageContext";
import { EditorProvider } from "../context/EditorContext";
import ImagePreview from "../components/editor/ImagePreview";
import ActionPanel from "../components/editor/ActionPanel";
import EffectsPanel from "../components/editor/EffectsPanel/EffectsPanel";
import BackgroundPanel from "../components/editor/BackgroundPanel/BackgroundPanel";

function Editor() {
  const { imageURL } = useImage();

  if (!imageURL) {
    return (
      <div className="text-center mt-20 text-lg text-gray-500">
        No image uploaded. Please upload one first.
      </div>
    );
  }

  return (
    <EditorProvider>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 border rounded-lg overflow-hidden">
            <ImagePreview />
          </div>
          <div className="w-full md:w-64">
            <ActionPanel />
          </div>
        </div>

        <EffectsPanel />
        <BackgroundPanel />
      </div>
    </EditorProvider>
  );
}

export default Editor;
