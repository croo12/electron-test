import React from 'react';
import { Character } from '@/widgets/character';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: transparent;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Character />
    </AppContainer>
  );
};

export default App; 