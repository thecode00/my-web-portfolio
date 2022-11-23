import React, { useEffect, useRef } from "react";

interface mouse {
  x: any;
  y: any;
  radius: number;
}
// TODO: Change screen size
function AlphabetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef<mouse>({
    x: null,
    y: null,
    radius: 150,
  });
  const particleArray: Particle[] = [];
  const textCoordinate = useRef<ImageData | null>(null);
  const adjustX = 30;
  const adjustY = -40;

  // 화면크기수정 함수
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
      this.density = Math.random() * 50 + 30;
    }

    draw = () => {
      const ctx = contextRef.current;
      if (!ctx) {
        return;
      }
      ctx.fillStyle = "white";
      ctx.beginPath();
      // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.font = "15px Verdana";
      ctx.fillText("A", this.x, this.y);
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
        // 마우스가 근처에가면 퍼지는 코드
        this.x -= directionX;
        this.y -= directionY;
      } else {
        // 처음위치로 돌아가게 하는 코드
        if (this.x !== this.baseX) {
          let dx = this.baseX - this.x;
          this.x += dx / 10;
        }
        if (this.y !== this.baseY) {
          let dy = this.baseY - this.y;
          this.y += dy / 10;
        }
      }
    };
  }
  // 처음에 Particle들을 초기화하는 함수
  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    // for (let i = 0; i < 100; i++) {
    //   let x = Math.random() * canvas.width;
    //   let y = Math.random() * canvas.height;
    //   particleArray.push(new Particle(x, y));
    // }
    const textCoord = textCoordinate.current;

    if (textCoord) {
      console.log(textCoord.data);
      for (let y = 0, y2 = textCoord.height; y < y2; y++) {
        for (let x = 0, x2 = textCoord.width; x < x2; x++) {
          if (textCoord.data[y * 4 * textCoord.width + x * 4 + 3] > 128) {
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(new Particle(positionX * 10, positionY * 10));
          }
        }
      }
    }
  };

  const connect = () => {
    for (let i = 0; i < particleArray.length; i++) {
      for (let j = i; j < particleArray.length; j++) {
        let dx = particleArray[i].x - particleArray[j].x;
        let dy = particleArray[i].y - particleArray[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const ctx = contextRef.current;
        if (!ctx) {
          return;
        }
        if (distance < 10) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particleArray[i].x, particleArray[i].y);
          ctx.lineTo(particleArray[j].x, particleArray[j].y);
          ctx.stroke();
        }
      }
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
    connect();
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
    ctx.fillStyle = "white";
    ctx.font = "30px Verdana";
    ctx.fillText("Hello", 0, 100);
    console.log("fint");
    textCoordinate.current = ctx.getImageData(0, 0, 100, 100);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="bg-black"></canvas>;
}

export default AlphabetCanvas;
