import React from 'react';
import { AppProvider } from './src/model/AppContext';
import { Router } from './src/Router';

function App(): JSX.Element {
  return (
    <AppProvider>
      <Router/>
    </AppProvider>
  );
}

export default App;
