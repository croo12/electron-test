import type { ICharacterState } from './ICharacterState';

export class IdleState implements ICharacterState {
  private frameCount: number = 0;
  private readonly animationInterval: number = 60; // 프레임 간격 (밀리초)
  
  public name = 'idle';

  constructor() {}

  public enter(): void {
    console.log('캐릭터가 대기 상태로 들어갔습니다.');
  }

  public update(): void {
    this.frameCount++;
    if (this.frameCount >= this.animationInterval) {
      this.frameCount = 0;
      // 여기에 대기 상태 애니메이션 로직 추가
    }
  }

  public exit(): void {
    console.log('캐릭터가 대기 상태를 종료합니다.');
  }

  public handleMouseInteraction(x: number, y: number): void {
    console.log(`마우스 상호작용: x=${x}, y=${y}`);
  }
} 