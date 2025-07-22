// components/editor/BackgroundPanel/ImageGridItem.jsx
function ImageGridItem({ src }) {
  return (
    <div className="aspect-square rounded-md overflow-hidden border border-amber-50 hover:border-blue-500 cursor-pointer">
      <img src={src} alt="bg" className="w-full h-full object-cover" />
    </div>
  );
}

export default ImageGridItem;
