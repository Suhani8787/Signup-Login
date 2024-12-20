import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './Navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </>
  );
};

export default App;