import React, { useEffect, useRef } from "react";

interface mouse {
  x: any;
  y: any;
  radius: 150;
}

function AlphabetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef<mouse>({
    x: null,
    y: null,
    radius: 150,
  });

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
    window.addEventListener("mousemove", (event) => {
      mouseRef.current.x = event.x;
      mouseRef.current.y = event.y;
      console.log(mouseRef.current);
    });
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    contextRef.current = ctx;
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-black"></canvas>;
}

export default AlphabetCanvas;
