import type { ICharacterConfig } from "./types";

export const CHARACTER_CONFIG: ICharacterConfig = {
  size: 20,
  color: "pink",
  position: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
} as const;
