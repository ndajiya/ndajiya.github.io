import { useEffect, useRef } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    const maxStep = 128; // Doubled from 64 to slow down the animation
    const balls = 12;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base circles
      ctx.strokeStyle = "rgba(26, 26, 26, 0.1)";
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 160, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Calculate center point
      const centerX = canvas.width / 2 + 115 * Math.cos((step * 2) / maxStep * Math.PI);
      const centerY = canvas.height / 2 + 115 * Math.sin((step * 2) / maxStep * Math.PI);

      // Draw dots
      for (let i = 0; i < balls; i++) {
        const x = centerX + 115 * Math.cos((i * 2 / balls - step * 2 / maxStep) * Math.PI);
        const y = centerY + 115 * Math.sin((i * 2 / balls - step * 2 / maxStep) * Math.PI);

        ctx.beginPath();
        ctx.arc(y, x, 5, 0, Math.PI * 2);
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
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-secondary">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="absolute inset-0 w-full h-full opacity-50"
      />
      <div className="relative z-10 text-center px-4 animate-fade-up">
        <span className="inline-block px-4 py-1 mb-6 text-sm font-medium bg-white/30 backdrop-blur-sm rounded-full text-primary">
          Introducing Innovation
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">
          Design Meets
          <br />
          Perfection
        </h1>
        <p className="text-lg md:text-xl text-primary/80 mb-8 max-w-2xl mx-auto">
          Experience the perfect blend of form and function, crafted with precision
          and care for those who appreciate the finest details.
        </p>
        <button className="px-8 py-3 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all transform hover:scale-105">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;