// components/editor/BackgroundPanel/ColorSwatch.jsx
function ColorSwatch({ color }) {
  return (
    <div
      className="w-full aspect-square border border-gray-300 rounded-md cursor-pointer"
      style={{ backgroundColor: color }}
      title={color}
    />
  );
}

export default ColorSwatch;
