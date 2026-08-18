import { useRef, useEffect, useState } from "react";
import "./curtains.css";

export default function Curtains() {
  const [cellCount, setCellCount] = useState(0);
  const curtainsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cellSize = 100;
    const curtains = curtainsRef.current;

    if (!curtains) {
      return;
    }

    const width = curtains.clientWidth;
    const height = curtains.clientHeight;

    if (width < 700) {
      cellSize = 60;
    }

    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);

    curtains.style.setProperty("--cols", cols.toString());
    curtains.style.setProperty("--rows", rows.toString());

    setCellCount(cols * rows);
  }, []);

  return (
    <div ref={curtainsRef} id="curtains">
      {Array.from({ length: cellCount }, (_, index) => (
        <div
          key={index}
          className="curtain__cell hidden"
          style={{ animationDelay: `${index * 4}ms` }}
        ></div>
      )).reverse()}
    </div>
  );
}
