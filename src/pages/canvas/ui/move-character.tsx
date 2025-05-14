import { ipcRenderer } from "@/shared/electron";
import { useCallback, useEffect, useRef, useState } from "react";

// Ball 타입 정의
interface Ball {
  offsetX: number; // 중앙에서의 상대 x
  offsetY: number; // 중앙에서의 상대 y
  amplitude: number; // 흔들림 폭
  radius: number; // 반지름
  color: string; // 색상
  phase: number; // 개별 위상(서로 다른 타이밍)
  pausedUntil?: number; // 멈춤이 끝나는 시간 (timestamp)
}

// 여러 개의 공 정보
const initialBalls: Ball[] = [
  {
    offsetX: -150,
    offsetY: 0,
    amplitude: 30,
    radius: 20,
    color: "white",
    phase: 0,
  },
  {
    offsetX: 0,
    offsetY: 0,
    amplitude: 50,
    radius: 15,
    color: "skyblue",
    phase: Math.PI / 2,
  },
  {
    offsetX: 150,
    offsetY: 0,
    amplitude: 40,
    radius: 25,
    color: "pink",
    phase: Math.PI,
  },
];

export function MoveCharacterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>(initialBalls);

  const isPointerOnBall = useCallback(
    (x: number, y: number, time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return false;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (const ball of balls) {
        const isPaused = ball.pausedUntil && Date.now() < ball.pausedUntil;
        const phaseT = isPaused ? ball.phase : time + ball.phase;
        const bx = centerX + ball.offsetX + Math.sin(phaseT) * ball.amplitude;
        const by = centerY + ball.offsetY;
        const dist = Math.sqrt((bx - x) ** 2 + (by - y) ** 2);
        if (dist <= ball.radius) return true;
      }
      return false;
    },
    [balls]
  );

  // 여러 공을 그리는 함수
  const drawBalls = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      t: number,
      balls: Ball[],
      width: number,
      height: number
    ) => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      for (const ball of balls) {
        // 멈춤 상태면 마지막 위치로 고정
        const now = Date.now();
        const isPaused = ball.pausedUntil && now < ball.pausedUntil;
        const phaseT = isPaused ? ball.phase + 0 : t + ball.phase;
        const x = centerX + ball.offsetX + Math.sin(phaseT) * ball.amplitude;
        const y = centerY + ball.offsetY;
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // const resizeCanvas = () => {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    // };
    // resizeCanvas();
    // window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let t = 0; // 시간 변수

    const animate = () => {
      drawBalls(ctx, t, balls, canvas.width, canvas.height);
      // 각 공이 멈춰있지 않으면 t 증가
      t += 0.05;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const time = t;

      const isOverBall = isPointerOnBall(clickX, clickY, time);

      // ipcRenderer({
      //   id: "ignore-mouse-event",
      //   payload: isOverBall,
      // });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      // window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [drawBalls, balls, isPointerOnBall]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100vw", height: "100vh", display: "block" }}
    />
  );
}
