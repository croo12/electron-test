export interface ICharacterState {
  name: string;
  update: () => void;
  enter: () => void;
  exit: () => void;
  handleMouseInteraction?: (x: number, y: number) => void;
}

export interface ICharacterPosition {
  x: number;
  y: number;
}

export interface ICharacterAnimation {
  currentFrame: number;
  totalFrames: number;
  frameWidth: number;
  frameHeight: number;
  updateFrame: () => void;
} 