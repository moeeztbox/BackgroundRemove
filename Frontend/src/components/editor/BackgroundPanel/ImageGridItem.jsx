function ImageGridItem({ src, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`aspect-square rounded-md overflow-hidden border-2 cursor-pointer ${
        isSelected
          ? "border-blue-500"
          : "border-transparent hover:border-blue-300"
      }`}
    >
      <img src={src} alt="bg" className="w-full h-full object-cover" />
    </div>
  );
}
export default ImageGridItem;
