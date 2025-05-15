import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { inputStyles } from '../theme/styles';
import { COLORS } from '../theme/colors';

/**
 * Chat input area with send button
 * @param {Object} props - Component props
 * @param {string} props.input - Input text value
 * @param {Function} props.onChangeText - Function to call when text changes
 * @param {Function} props.onSend - Function to call when send button is pressed
 * @param {boolean} props.isLoading - Whether a message is being sent
 * @param {Object} props.inputRef - Ref for the TextInput
 */
export const InputArea = ({
  input,
  onChangeText,
  onSend,
  isLoading,
  inputRef,
}) => (
  <View style={inputStyles.inputContainer}>
    <TextInput
      ref={inputRef}
      style={inputStyles.input}
      placeholder="Type a message..."
      placeholderTextColor={COLORS.placeholder}
      value={input}
      onChangeText={onChangeText}
      multiline
      maxLength={500}
      testID="message-input"
    />

    <TouchableOpacity
      style={[
        inputStyles.sendButton,
        (isLoading || input.trim().length === 0) && inputStyles.sendButtonDisabled,
      ]}
      onPress={onSend}
      disabled={isLoading || input.trim().length === 0}
      testID="send-button"
    >
      <Text style={inputStyles.sendButtonText}>
        {isLoading ? '...' : 'Send'}
      </Text>
    </TouchableOpacity>
  </View>
);
