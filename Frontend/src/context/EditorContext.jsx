// context/EditorContext.jsx
import { createContext, useContext, useState } from "react";

const EditorContext = createContext();
export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const [bgTab, setBgTab] = useState("photo");
  const [isBlurBackgroundEnabled, setIsBlurBackgroundEnabled] = useState(false);
  const [customImages, setCustomImages] = useState([]);

  // ✅ Add edited image state
  const [editedImageURL, setEditedImageURL] = useState(null);

  const toggleEffects = () => setIsEffectsOpen((prev) => !prev);
  const toggleBackground = () => setIsBackgroundOpen((prev) => !prev);

  return (
    <EditorContext.Provider
      value={{
        isEffectsOpen,
        isBackgroundOpen,
        toggleEffects,
        toggleBackground,
        blurAmount,
        setBlurAmount,
        bgTab,
        setBgTab,
        isBlurBackgroundEnabled,
        setIsBlurBackgroundEnabled,
        customImages,
        setCustomImages,
        editedImageURL,
        setEditedImageURL,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
