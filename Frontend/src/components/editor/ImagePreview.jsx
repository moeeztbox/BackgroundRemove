// import { useImage } from "../../context/ImageContext";
// import { useEditor } from "../../context/EditorContext";

// function ImagePreview() {
//   const { imageURL } = useImage();
//   const { editedImageURL, abc, xyz, hello } = useEditor();
//   console.log("HEllo", hello);
//   console.log("ABC", abc);
//   console.log("XYZ", xyz);
//   console.log("Edited Image URL:", editedImageURL);
//   console.log("Image URL:", imageURL);

//   return (
//     <div className="w-auto h-52 flex items-center justify-center bg-gray-100">
//       <img
//         src={hello || abc || xyz || editedImageURL || imageURL}
//         alt="Preview"
//         className="h-52 w-auto object-cover"
//       />
//     </div>
//   );
// }

// export default ImagePreview;
import { useImage } from "../../context/ImageContext";
import { useEditor } from "../../context/EditorContext";
import ProcessingText from "./ProcessingText";

function ImagePreview() {
  const { imageURL } = useImage();
  const { editedImageURL, isProcessing, color, photo, hello } = useEditor();
  console.log("HEllo", hello);
  console.log("ABC", color);
  console.log("XYZ", photo);
  console.log("Edited Image URL:", editedImageURL);
  console.log("Image URL:", imageURL);

  return (
    <div className="w-auto h-52 flex items-center justify-center bg-gray-100">
      {isProcessing ? (
        <ProcessingText />
      ) : (
        <img
          src={hello || color || photo || editedImageURL || imageURL}
          alt="Preview"
          className="h-52 w-auto object-cover"
        />
      )}
    </div>
  );
}

export default ImagePreview;
