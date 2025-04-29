import { ICharacterState, ICharacterPosition } from './states/ICharacterState';

export class Character {
  private currentState: ICharacterState;
  private position: ICharacterPosition;
  private sprite: HTMLImageElement;
  private isDragging: boolean = false;
  private dragOffset: ICharacterPosition = { x: 0, y: 0 };

  constructor(initialState: ICharacterState, initialPosition: ICharacterPosition) {
    this.currentState = initialState;
    this.position = initialPosition;
    this.sprite = new Image();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  private handleMouseDown(event: MouseEvent): void {
    const { clientX, clientY } = event;
    if (this.isPointInCharacter(clientX, clientY)) {
      this.isDragging = true;
      this.dragOffset = {
        x: clientX - this.position.x,
        y: clientY - this.position.y
      };
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.setPosition({
        x: event.clientX - this.dragOffset.x,
        y: event.clientY - this.dragOffset.y
      });
    }
  }

  private handleMouseUp(): void {
    this.isDragging = false;
  }

  private isPointInCharacter(x: number, y: number): boolean {
    return (
      x >= this.position.x &&
      x <= this.position.x + this.sprite.width &&
      y >= this.position.y &&
      y <= this.position.y + this.sprite.height
    );
  }

  public setState(newState: ICharacterState): void {
    this.currentState.exit();
    this.currentState = newState;
    this.currentState.enter();
  }

  public update(): void {
    this.currentState.update();
  }

  public getPosition(): ICharacterPosition {
    return { ...this.position };
  }

  public setPosition(newPosition: ICharacterPosition): void {
    this.position = { ...newPosition };
  }

  public setSprite(src: string): void {
    this.sprite.src = src;
  }
} 