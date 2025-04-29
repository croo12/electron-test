import { type FC, useEffect, useRef } from "react";
import styled from "styled-components";
import { CHARACTER_CONFIG } from "../model/config";

const CharacterCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
`;

export const Character: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.warn("Failed to get canvas context");
      return;
    }

    // 캔버스 크기를 화면 크기에 맞춤
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

    // 캐릭터 렌더링
    drawCharacter(ctx);

    // 창 크기 변경 이벤트 처리
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
};
