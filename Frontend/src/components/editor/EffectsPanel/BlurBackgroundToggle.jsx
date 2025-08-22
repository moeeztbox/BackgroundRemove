// import { useEffect, useRef } from "react";
// import axios from "axios";
// import { useEditor } from "../../../context/EditorContext";
// import { useImage } from "../../../context/ImageContext";

// function BlurBackgroundToggle() {
//   const {
//     isBlurBackgroundEnabled,
//     setIsBlurBackgroundEnabled,
//     blurAmount,
//     setEditedImageURL,
//     getEditedImageFile,
//   } = useEditor();
//   const { imageFile } = useImage();

//   // Track the last applied blur amount
//   const lastAppliedBlurRef = useRef(null);

//   useEffect(() => {
//     if (!imageFile) return;

//     const applyBlur = async () => {
//       try {
//         const imageToSend = await getEditedImageFile();
//         const formData = new FormData();
//         formData.append("image", imageToSend);
//         formData.append("blur_strength", blurAmount);

//         console.log("Applying blur with:", blurAmount);

//         const response = await axios.post(
//           "http://localhost/BACKGROUNDREMOVE/Backend/Index.php?action=blur-background-level",
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         const BackgroundBlur = response.data.data.imageUrl;
//         setEditedImageURL(BackgroundBlur);

//         // Save last applied amount
//         lastAppliedBlurRef.current = blurAmount;
//       } catch (error) {
//         console.error("Failed to apply blur:", error);
//         if (error.response) {
//           console.error("Response data:", error.response.data);
//         }
//       }
//     };

//     const revertToOriginal = () => {
//       const originalURL = URL.createObjectURL(imageFile);
//       setEditedImageURL(originalURL);
//       lastAppliedBlurRef.current = null; // reset
//     };

//     // If toggle is on
//     if (isBlurBackgroundEnabled) {
//       // Apply blur only if amount changed OR it was never applied before
//       if (lastAppliedBlurRef.current !== blurAmount) {
//         applyBlur();
//       } else {
//         console.log("Blur amount unchanged, skipping API call");
//       }
//     } else {
//       revertToOriginal();
//     }
//   }, [isBlurBackgroundEnabled, blurAmount, imageFile, setEditedImageURL]);

//   return (
//     <div className="flex items-center justify-between">
//       <label className="text-sm font-medium">Blur Background</label>
//       <button
//         onClick={() => setIsBlurBackgroundEnabled((prev) => !prev)}
//         className={`relative cursor-pointer inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
//           isBlurBackgroundEnabled ? "bg-blue-600" : "bg-gray-300"
//         }`}
//       >
//         <span
//           className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
//             isBlurBackgroundEnabled ? "translate-x-6" : "translate-x-1"
//           }`}
//         />
//       </button>
//     </div>
//   );
// }

// export default BlurBackgroundToggle;
