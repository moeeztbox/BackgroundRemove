// import { useEditor } from "../../../context/EditorContext";

// function BlurAmountSlider() {
//   const { blurAmount, setBlurAmount, isBlurBackgroundEnabled } = useEditor();

//   return (
//     <div className={`opacity-${isBlurBackgroundEnabled ? "100" : "40"}`}>
//       <label className="text-sm font-medium block mb-1">Blur Amount</label>
//       <input
//         type="range"
//         min="0"
//         max="100"
//         step="10"
//         value={blurAmount}
//         onChange={(e) => setBlurAmount(Number(e.target.value))}
//         className="w-full cursor-pointer"
//         disabled={!isBlurBackgroundEnabled}
//       />
//       <div className="text-right text-xs text-gray-500">{blurAmount}px</div>
//     </div>
//   );
// }

// export default BlurAmountSlider;
