import { createContext, useContext, useState } from "react";

const EditorContext = createContext();
export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [blurAmount, setBlurAmount] = useState(10);
  const [bgTab, setBgTab] = useState("photo");
  const [isBlurBackgroundEnabled, setIsBlurBackgroundEnabled] = useState(false);
  const [customImages, setCustomImages] = useState([]);
  const [editedImageURL, setEditedImageURL] = useState(null);
  const [selectedBgColor, setSelectedBgColor] = useState(null);
  const [selectedBgPhoto, setSelectedBgPhoto] = useState(null); // New state

  const toggleSelectedBgColor = (color) => {
    setSelectedBgColor((prevColor) => (prevColor === color ? null : color));
  };

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
        selectedBgColor,
        setSelectedBgColor,
        selectedBgPhoto,
        setSelectedBgPhoto,
        toggleSelectedBgColor,
        editedImageURL,
        setEditedImageURL,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
