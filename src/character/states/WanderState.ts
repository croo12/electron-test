import type { ICharacterState } from './ICharacterState';
import { Character } from '../Character';

export class WanderState implements ICharacterState {
  private character: Character;
  private moveTimer: number = 0;
  private readonly moveInterval: number = 2000; // 2초마다 이동
  private targetX: number = 0;
  private targetY: number = 0;
  private speed: number = 2;
  
  public name = 'wander';

  constructor(character: Character) {
    this.character = character;
    this.setNewTarget();
  }

  public enter(): void {
    console.log('캐릭터가 배회 상태로 들어갔습니다.');
  }

  public update(): void {
    const pos = this.character.getPosition();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 현재 위치에서 목표 지점까지의 방향 계산
    const dx = this.targetX - pos.x;
    const dy = this.targetY - pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.speed || this.moveTimer >= this.moveInterval) {
      // 목표 지점에 도달했거나 이동 시간이 지났으면 새로운 목표 지점 설정
      this.setNewTarget();
      this.moveTimer = 0;
    } else {
      // 목표 지점을 향해 이동
      const newX = pos.x + (dx / distance) * this.speed;
      const newY = pos.y + (dy / distance) * this.speed;

      // 화면 경계 체크
      const finalX = Math.max(40, Math.min(screenWidth - 40, newX));
      const finalY = Math.max(40, Math.min(screenHeight - 40, newY));

      this.character.setPosition({ x: finalX, y: finalY });
      this.moveTimer += 16; // 약 60FPS 기준
    }
  }

  public exit(): void {
    console.log('캐릭터가 배회 상태를 종료합니다.');
  }

  private setNewTarget(): void {
    const margin = 40; // 화면 경계에서의 여유 공간
    this.targetX = Math.random() * (window.innerWidth - margin * 2) + margin;
    this.targetY = Math.random() * (window.innerHeight - margin * 2) + margin;
  }
} 