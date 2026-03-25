import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  phase: number;
};

export const StarrySky = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
      createStars();
    }

    function createStars() {
      const width = canvas!.offsetWidth;
      const height = canvas!.offsetHeight;
      const count = Math.floor((width * height) / 2800);

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 2 + 0.8,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      const width = canvas!.offsetWidth;
      const height = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = 0.15 + 0.85 * Math.sin(time * 0.003 * star.speed + star.phase);
        ctx!.beginPath();
        ctx!.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201, 169, 110, ${twinkle * 0.9})`;
        ctx!.fill();

        // Subtle glow for larger stars
        if (star.radius > 1) {
          ctx!.beginPath();
          ctx!.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(212, 186, 138, ${twinkle * 0.12})`;
          ctx!.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};
