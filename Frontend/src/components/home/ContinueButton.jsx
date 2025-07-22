import { useImage } from "../../context/ImageContext";
import { useNavigate } from "react-router-dom";

const ContinueButton = () => {
  const { imageURL } = useImage();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!imageURL) {
      alert("No image to edit. Please select an image first.");
      return;
    }

    navigate("/editor");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition"
    >
      Continue to Editor
    </button>
  );
};

export default ContinueButton;
