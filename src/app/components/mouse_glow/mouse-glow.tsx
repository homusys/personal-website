import { useEffect } from "react";
import "./mouse-glow.css";

export default function MouseGlow() {
  useEffect(() => {
    const mouseGlow = document.querySelector<HTMLElement>("#mouseGlow");

    let mouseX = 0;
    let mouseY = 0;
    let reqId: number;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    function renderMouseGradient() {
      mouseGlow?.style.setProperty("--mouse-x", `${mouseX}px`);
      mouseGlow?.style.setProperty("--mouse-y", `${mouseY}px`);

      reqId = requestAnimationFrame(renderMouseGradient);
    }

    renderMouseGradient();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return <div id="mouseGlow"></div>;
}
