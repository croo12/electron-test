import { type FC } from "react";
import { Character } from "@/entities/character";
import { AppContainer } from "./styles/container";

export const App: FC = () => {
  return (
    <AppContainer>
      <Character />
    </AppContainer>
  );
};
