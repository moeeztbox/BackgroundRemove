import { createContext, useState, useContext } from "react";

const ImageContext = createContext();
export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imageURL, setImageURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageMeta, setImageMeta] = useState({ name: "", type: "" });

  const handleImageUpload = (file) => {
    const url = URL.createObjectURL(file);
    console.log("Image URL:", url);
    setImageFile(file);
    console.log("File name", imageFile);
    setImageURL(url);
    console.log("URL", imageURL);
    setImageMeta({ name: file.name, type: file.type });
  };

  return (
    <ImageContext.Provider
      value={{
        imageURL,
        imageFile,
        imageMeta,
        handleImageUpload,
        setImageURL,
        setImageMeta,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
