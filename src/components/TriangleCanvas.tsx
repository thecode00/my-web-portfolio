import React, { useEffect, useRef } from "react";

function TriangleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const random = [
    "#cec6ff",
    "#8cefff",
    "#ffe3ff",
    "#8a383b",
    "#e3ebf6",
    "#271a00",
    "#fffaf2",
  ];

  const drawCircle = (e: any) => {
    const ctx = contextRef.current;
    if (!ctx) {
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const dx = canvas.width / 5;
    const dy = canvas.height / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        ctx.beginPath();
        ctx.fillRect(dx * j, dy * i, dx, dy);
        ctx.fillStyle = random[Math.floor(Math.random() * random.length)];
        ctx.closePath();
      }
    }
    ctx.fill();
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    // Default value is 1, Retina display is 2
    const pixelRatio = window.devicePixelRatio;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = contextRef.current;
    if (!ctx) {
      return;
    }
    ctx.scale(pixelRatio, pixelRatio);
    console.log("Resize", canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    contextRef.current = context;
    return () => {
      // Prevent memory leak
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <canvas ref={canvasRef} onMouseDown={drawCircle}></canvas>;
}

export default TriangleCanvas;
