import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  const canvasSize = isMobile ? 300 : 500;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    const maxStep = 320;
    const balls = isMobile ? 8 : 12;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base circles
      ctx.strokeStyle = "rgba(26, 26, 26, 0.1)";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 6, 0, Math.PI * 2);
      ctx.stroke();

      // Calculate center point
      const radius = canvas.width / 4;
      const centerX = canvas.width / 2 + radius * Math.cos((step * 2) / maxStep * Math.PI);
      const centerY = canvas.height / 2 + radius * Math.sin((step * 2) / maxStep * Math.PI);

      // Draw dots
      for (let i = 0; i < balls; i++) {
        const x = centerX + radius * Math.cos((i * 2 / balls - step * 2 / maxStep) * Math.PI);
        const y = centerY + radius * Math.sin((i * 2 / balls - step * 2 / maxStep) * Math.PI);

        ctx.beginPath();
        ctx.arc(y, x, isMobile ? 3 : 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(26, 26, 26, 0.2)";
        ctx.fill();
      }

      step = (step + 1) % maxStep;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-secondary px-4 sm:px-6 md:px-8">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="absolute inset-0 w-full h-full opacity-50"
      />
      <div className="relative z-10 text-center flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary animate-fade-up">
          Nda-jiya
        </h1>
        <a 
          href="https://ndajiya.github.io/mohammed-suberu"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all text-sm sm:text-base md:text-lg animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Hero;