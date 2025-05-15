import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './Main';

/**
 * Main App component
 * Provides the SafeAreaProvider context and renders the Main component
 */
const App = () => {
    return (
        <SafeAreaProvider>
            <Main />
        </SafeAreaProvider>
    );
};

export default App;
