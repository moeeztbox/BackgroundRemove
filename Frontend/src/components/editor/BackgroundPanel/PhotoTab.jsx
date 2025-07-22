import { useEditor } from "../../../context/EditorContext";
import UploadCustomImage from "./UploadCustomImage";
import ImageGridItem from "./ImageGridItem";

const staticImages = [
  "/images/1_thumbnail.jpg",
  "/images/2_thumbnail.jpg",
  "/images/3_thumbnail.jpg",
  "/images/4_thumbnail.jpg",
  "/images/5_thumbnail.jpg",
  "/images/6_thumbnail.jpg",
  "/images/7_thumbnail.jpg",
  "/images/8_thumbnail.jpg",
];

function PhotoTab() {
  const { customImages } = useEditor();

  return (
    <div className="max-h-64 overflow-y-auto pr-1 hide-scrollbar">
      <div className="grid grid-cols-3 gap-6">
        <UploadCustomImage />
        {[...customImages, ...staticImages].map((src, index) => (
          <ImageGridItem key={index} src={src} />
        ))}
      </div>
    </div>
  );
}

export default PhotoTab;
