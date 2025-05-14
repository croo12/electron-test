import type { FC } from "react";
import { AppContainer } from "./styles/container";
import CanvasPage, { MoveCharacterCanvas } from "@/pages/canvas";

export const App: FC = () => {
  return (
    <AppContainer>
      {/* <CanvasPage /> */}
      <MoveCharacterCanvas />
    </AppContainer>
  );
};
