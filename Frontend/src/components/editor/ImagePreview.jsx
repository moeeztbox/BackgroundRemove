import { useImage } from "../../context/ImageContext";
import { useEditor } from "../../context/EditorContext";

function ImagePreview() {
  const { imageURL } = useImage();
  const { editedImageURL } = useEditor();

  return (
    <div className="w-auto h-52 flex items-center justify-center bg-gray-100">
      <img
        src={editedImageURL || imageURL}
        alt="Preview"
        className="h-52 w-auto object-cover"
      />
    </div>
  );
}

export default ImagePreview;
