import FileUpload from "../components/home/FileUpload";
import ImagePreview from "../components/home/ImagePreview";
import ContinueButton from "../components/home/ContinueButton";

function Home() {
  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-row md:flex-row gap-6 transition-all duration-300">
        <FileUpload />
        <ImagePreview />
      </div>

      <div className="mt-6 flex justify-center">
        <ContinueButton />
      </div>
    </div>
  );
}

export default Home;
