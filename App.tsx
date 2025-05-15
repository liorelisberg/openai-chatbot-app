import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from './src/screens/ChatScreen';
import {ThemeProvider} from './src/theme/ThemeContext';
import ErrorBoundary from './src/components/ErrorBoundary';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
