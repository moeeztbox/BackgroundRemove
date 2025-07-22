import { useImage } from "../../context/ImageContext";

function ImagePreview() {
  const { imageURL } = useImage();

  return (
    <div className="flex-1 bg-gray-50 min-h-64 flex-col text-gray-500">
      {imageURL ? (
        <>
          <img
            src={imageURL}
            alt="Preview"
            className="w-full h-64 object-fit border rounded-lg"
          />
        </>
      ) : (
        <div className="text-center border rounded-lg min-h-64 flex-1 items-center flex w-full h-64 justify-center flex-col">
          <svg
            className="mx-auto w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M3 7l6 6-6 6M21 7l-6 6 6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm">Waiting for image to preview...</p>
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
