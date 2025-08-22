import { useEditor } from "../../context/EditorContext";

function DownloadButton() {
  const { finalImage } = useEditor();

  const handleDownload = () => {
    if (!finalImage) {
      alert("No image to download!");
      return;
    }

    // Check if finalImage is a base64 string (data URL)
    if (finalImage.startsWith("data:image")) {
      // Convert base64 to Blob
      const byteString = atob(finalImage.split(",")[1]);
      const mimeString = finalImage.split(",")[0].split(":")[1].split(";")[0];

      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const url = URL.createObjectURL(blob);

      // Create a hidden link
      const link = document.createElement("a");
      link.href = url;
      link.download = "edited-image.png"; // Default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up URL
      URL.revokeObjectURL(url);
    } else {
      // If finalImage is already a Blob URL or server URL
      const link = document.createElement("a");
      link.href = finalImage;
      link.download = "edited-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      Download
    </button>
  );
}

export default DownloadButton;
