// components/editor/ImagePreview.jsx
import { useImage } from "../../context/ImageContext";

function ImagePreview() {
  const { imageURL } = useImage();

  return (
    <div className="w-auto h-52 flex items-center justify-center bg-gray-100">
      <img src={imageURL} alt="Preview" className="h-52 w-auto object-cover" />
    </div>
  );
}

export default ImagePreview;
