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
    const maxStep = 320; // Increased from 128 to 320 to slow down by 80%
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
      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-primary">Nda-jiya</h1>
        <button className="px-6 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;