import React, { useEffect, useRef } from "react";

interface mouse {
  x: any;
  y: any;
  radius: number;
}

function AlphabetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef<mouse>({
    x: null,
    y: null,
    radius: 250,
  });
  const particleArray: Particle[] = [];

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
    console.log("Resize", canvas.width, canvas.height, pixelRatio);
  };
  class Particle {
    x: number;
    y: number;
    size: number;
    baseX: number;
    baseY: number;
    density: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.size = 3;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 100 + 30;
    }

    draw = () => {
      const ctx = contextRef.current;
      if (!ctx) {
        return;
      }
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    update = () => {
      const mouse = mouseRef.current;
      if (!mouse) {
        return;
      }
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;
      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        this.size = 3;
      }
    };
  }

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    for (let i = 0; i < 100; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      particleArray.push(new Particle(x, y));
    }
  };

  const animate = () => {
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) {
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].draw();
      particleArray[i].update();
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      mouseRef.current.x = event.x;
      mouseRef.current.y = event.y;
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
    init();
    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-black"></canvas>;
}

export default AlphabetCanvas;
