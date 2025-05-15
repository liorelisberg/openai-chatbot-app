import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, Text, View, StyleSheet, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../theme/styles';
import { COLORS } from '../theme/colors';
import { useChat } from '../hooks/useChat';
import { useConnection } from '../hooks/useConnection';
import { useKeyboard } from '../hooks/useKeyboard';
import { ChatHeader } from '../components/ChatHeader';
import { MessageList } from '../components/MessageList';
import { InputArea } from '../components/InputArea';
import { QuickSuggestions } from '../components/QuickSuggestions';
import { isConfigValid } from '../constants/secureConfig';

/**
 * Main chat screen component
 */
const ChatScreen = () => {
  const [input, setInput] = useState('');
  const [configError, setConfigError] = useState(false);
  const useAutoSend = true;
  const inputRef = useRef(null);

  const isKeyboardVisible = useKeyboard();
  const isConnected = useConnection();

  const {
    messages,
    isLoading,
    hasMoreMessages,
    isLoadingEarlier,
    flatListRef,
    sendChatMessage,
    loadEarlierMessages,
  } = useChat();

  // Check if API key is configured
  useEffect(() => {
    // Only log errors, not successful initialization
    if (!isConfigValid()) {
      setConfigError(true);
      Alert.alert(
        'Configuration Error',
        'OpenAI API key is not configured correctly. Please check the README.md for setup instructions.\n\nMake sure there are no quotes around the API key value in the .env file.',
        [
          {
            text: 'Learn More',
            onPress: () => Linking.openURL('https://platform.openai.com/docs/quickstart'),
          },
          { text: 'OK' },
        ]
      );
    }
  }, []);

  // Handle suggestion press (just fills input field)
  const handleSuggestionPress = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  // Handle direct suggestion send (skips input field)
  const handleSuggestionSend = (suggestion) => {
    if (!isLoading) {
      sendChatMessage(suggestion, isConnected);
    }
  };

  // Handle send button press
  const handleSend = () => {
    if (input.trim()) {
      sendChatMessage(input, isConnected);
      setInput('');
    }
  };

  // Show suggestions when keyboard is hidden and we have few messages
  const shouldShowSuggestions = !isKeyboardVisible && messages.length < 5;

  // If we have a configuration error, display an error screen
  if (configError) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Configuration Error</Text>
          <Text style={styles.errorMessage}>
            The OpenAI API key is missing or invalid. To fix this issue:
          </Text>
          <Text style={styles.errorStep}>
            1. Create a file named .env in the root of the project
          </Text>
          <Text style={styles.errorStep}>
            2. Add your OpenAI API key: OPENAI_API_KEY=your_api_key_here
          </Text>
          <Text style={styles.errorStep}>
            3. Restart the app
          </Text>
          <Text style={styles.errorNote}>
            See README.md for detailed setup instructions.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <ChatHeader isConnected={isConnected} />

      {/* Chat area */}
      <KeyboardAvoidingView
        style={globalStyles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <MessageList
          messages={messages}
          onLoadEarlier={loadEarlierMessages}
          hasMoreMessages={hasMoreMessages}
          isLoadingEarlier={isLoadingEarlier}
          flatListRef={flatListRef}
        />

        {/* Quick suggestions with auto-send functionality */}
        {shouldShowSuggestions && (
          <QuickSuggestions
            onPress={handleSuggestionPress}
            onSend={useAutoSend ? handleSuggestionSend : undefined}
            count={5} // Show 5 random suggestions
          />
        )}

        {/* Input area */}
        <InputArea
          input={input}
          onChangeText={setInput}
          onSend={handleSend}
          isLoading={isLoading}
          inputRef={inputRef}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.error,
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.text,
  },
  errorStep: {
    fontSize: 14,
    marginBottom: 10,
    color: COLORS.text,
    alignSelf: 'flex-start',
  },
  errorNote: {
    fontSize: 14,
    marginTop: 20,
    fontStyle: 'italic',
    color: COLORS.textLight,
  },
});

export default ChatScreen;
