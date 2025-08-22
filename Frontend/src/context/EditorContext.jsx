import { createContext, useContext, useState, useEffect } from "react";
import { useImage } from "./ImageContext"; // ✅ Import image context

const EditorContext = createContext();
export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [isGrayScaleEnabled, setIsGrayScaleEnabled] = useState(false);
  const [isRemoveBackgroundEnabled, setIsRemoveBackgroundEnabled] =
    useState(false);
  const [isBlurEnabled, setIsBlurEnabled] = useState(false);
  const [blurAmount, setBlurAmount] = useState(10);
  const [isBlurBackgroundEnabled, setIsBlurBackgroundEnabled] = useState(false);
  const [bgTab, setBgTab] = useState("photo");

  const [customImages, setCustomImages] = useState([]);
  const [selectedBgColor, setSelectedBgColor] = useState(null);
  const [selectedBgPhoto, setSelectedBgPhoto] = useState(null);
  const [appliedBackgroundType, setAppliedBackgroundType] = useState(null);

  const { imageURL, imageMeta } = useImage(); // ✅ Get imageURL from ImageContext
  const [editedImageURL, setEditedImageURL] = useState(imageURL);
  const [color, setColor] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hello, setHello] = useState(null);
  // in EditorContext.js
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalImage, setFinalImage] = useState(null);

  // ✅ Set default editedImageURL to imageURL when imageURL is loaded
  // useEffect(() => {
  //   if (imageURL && !editedImageURL) {
  //     setEditedImageURL(imageURL);
  //   }
  // }, [imageURL, editedImageURL]);

  const getEditedImageFile = async () => {
    const response = await fetch(editedImageURL);
    console.log("Fetching edited image file from URL:", editedImageURL);
    const blob = await response.blob();
    console.log("Fetched blob:", blob);
    const a = new File([blob], imageMeta.name, { type: imageMeta.type });
    console.log("Converted editedImageURL to File:", a);
    return a;
  };

  const toggleSelectedBgColor = (color) => {
    setSelectedBgColor((prevColor) => {
      const newColor = prevColor === color ? null : color;
      if (newColor) {
        setSelectedBgPhoto(null);
        setAppliedBackgroundType("color");
      } else {
        setAppliedBackgroundType(null);
      }
      return newColor;
    });
  };

  const toggleSelectedBgPhoto = (photo) => {
    setSelectedBgPhoto((prevPhoto) => {
      const newPhoto = prevPhoto === photo ? null : photo;
      if (newPhoto) {
        setSelectedBgColor(null);
        setAppliedBackgroundType("photo");
      } else {
        setAppliedBackgroundType(null);
      }
      return newPhoto;
    });
  };

  const toggleEffects = () => {
    setIsEffectsOpen((prev) => {
      const newState = !prev;
      if (newState) setIsBackgroundOpen(false);
      return newState;
    });
  };

  const toggleBackground = () => {
    setIsBackgroundOpen((prev) => {
      const newState = !prev;
      if (newState) setIsEffectsOpen(false);
      return newState;
    });
  };

  return (
    <EditorContext.Provider
      value={{
        isGrayScaleEnabled,
        setIsGrayScaleEnabled,
        isRemoveBackgroundEnabled,
        setIsRemoveBackgroundEnabled,
        isBlurEnabled,
        setIsBlurEnabled,
        isBlurBackgroundEnabled,
        setIsBlurBackgroundEnabled,
        blurAmount,
        setBlurAmount,
        isEffectsOpen,
        isBackgroundOpen,
        toggleEffects,
        toggleBackground,

        bgTab,
        setBgTab,

        customImages,
        setCustomImages,
        selectedBgColor,
        setSelectedBgColor,
        selectedBgPhoto,
        setSelectedBgPhoto,
        toggleSelectedBgColor,
        toggleSelectedBgPhoto,
        editedImageURL,
        setEditedImageURL,
        appliedBackgroundType,
        setAppliedBackgroundType,
        getEditedImageFile,
        setColor,
        color,
        setPhoto,
        photo,
        hello,
        setHello,
        isProcessing,
        setIsProcessing,
        finalImage,
        setFinalImage,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
