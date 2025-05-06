import React from 'react';
import { Button } from '@poc-changesets/core';

export const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Package A</h1>
      <Button onClick={() => alert('¡Hola desde Package A!')} styles={{ backgroundColor: 'purple' }}>
        Click me!
      </Button>
    </div>
  );
}; 