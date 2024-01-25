import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import MainNavigator from './src';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreLogs(['new NativeEventEmitter']);

const App = () => {

  return (
    <MainNavigator />
  );
};

export default App;
