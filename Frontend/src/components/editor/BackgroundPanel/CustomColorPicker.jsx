// components/editor/BackgroundPanel/CustomColorPicker.jsx
function CustomColorPicker() {
  const handleChange = (e) => {
    console.log("Custom color selected:", e.target.value);
  };

  return (
    <label className="w-full aspect-square rounded-md border border-gray-300 flex items-center justify-center bg-white cursor-pointer hover:bg-gray-100">
      <input type="color" onChange={handleChange} className="hidden" />
      🎨
    </label>
  );
}

export default CustomColorPicker;
