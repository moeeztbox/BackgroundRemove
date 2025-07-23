import { createContext, useState, useContext } from "react";

const ImageContext = createContext();

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (file) => {
    setImageFile(file);
    setImageURL(URL.createObjectURL(file));
  };

  return (
    <ImageContext.Provider
      value={{ imageURL, imageFile, handleImageUpload, setImageURL }}
    >
      {children}
    </ImageContext.Provider>
  );
};
