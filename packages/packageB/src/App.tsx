import React from 'react';
import { Button } from '@poc-changesets/core';

export const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Package B</h1>
      <Button onClick={() => alert('¡Hola desde Package B!')}>
        Click me too!
      </Button>
    </div>
  );
}; 