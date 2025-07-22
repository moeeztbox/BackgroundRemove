import CustomColorPicker from "./CustomColorPicker";
import ColorSwatch from "./ColorSwatch";
import NoColorButton from "./NoColorButton";

const colors = [
  "#ffffff",
  "#facc15",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#fb923c",
  "#e879f9",
  "#86efac",
];

function ColorTab() {
  return (
    <div className="max-h-64 overflow-y-auto pr-1 hide-scrollbar">
      <div className="grid grid-cols-3 gap-6">
        <NoColorButton />
        <CustomColorPicker />
        {colors.map((color, index) => (
          <ColorSwatch key={index} color={color} />
        ))}
      </div>
    </div>
  );
}

export default ColorTab;
