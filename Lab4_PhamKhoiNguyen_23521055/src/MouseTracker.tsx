import { useEffect } from "react";

function MouseTracker() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      console.log(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // cleanup — this is NOT optional
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null; // this component doesn't render UI
}

export default MouseTracker;
