/**
 * @format
 */

import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './App';
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
]);

// Register for both React Native and Expo
registerRootComponent(App);
AppRegistry.registerComponent('openai_demo', () => App);
