/**
 * @format
 */

import 'react-native-gesture-handler';
import {registerRootComponent} from 'expo';
import {AppRegistry} from 'react-native';
import App from './App';
import {LogBox} from 'react-native';
import {name as appName} from './app.json';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
]);

// Register for both React Native and Expo
registerRootComponent(App);
AppRegistry.registerComponent(appName, () => App);
