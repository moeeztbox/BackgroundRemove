import { useEditor } from "../../../context/EditorContext";

function UploadCustomImage() {
  const { customImages, setCustomImages } = useEditor();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomImages((prev) => [imageUrl, ...prev]);
    }
  };

  return (
    <label className="w-full aspect-square border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-100">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <span className="text-gray-400 text-xl font-bold">+</span>
    </label>
  );
}

export default UploadCustomImage;
