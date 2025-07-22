// components/editor/EffectsPanel/RemoveBackgroundToggle.jsx
import { useState } from "react";

function RemoveBackgroundToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium">Remove Background</label>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative cursor-pointer inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default RemoveBackgroundToggle;
