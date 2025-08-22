import { useEffect, useState } from "react";

function ProcessingText() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-blue-600 font-semibold text-lg">
      Processing{dots}
    </span>
  );
}

export default ProcessingText;
