import { useEffect, useRef } from "react";
import { CHARACTER_CONFIG } from "@/entities/character/model/config";
import styled from "styled-components";

const CharacterCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
`;

export default function CanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawCharacter = (context: CanvasRenderingContext2D) => {
      context.fillStyle = CHARACTER_CONFIG.color;
      context.beginPath();
      context.arc(
        CHARACTER_CONFIG.position.x,
        CHARACTER_CONFIG.position.y,
        CHARACTER_CONFIG.size,
        0,
        Math.PI * 2
      );
      context.fill();
    };

    drawCharacter(ctx);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCharacter(ctx);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <CharacterCanvas ref={canvasRef} />;
}
