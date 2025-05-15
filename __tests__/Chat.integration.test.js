/**
 * Chat Integration Tests
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChatScreen from '../src/screens/ChatScreen';
import { sendMessage } from '../src/services/chatService';
import { isConfigValid } from '../src/constants/secureConfig';

// Mock the dependencies
jest.mock('../src/services/chatService', () => ({
  sendMessage: jest.fn(),
  checkConnection: jest.fn(() => Promise.resolve(true)),
}));

jest.mock('../src/constants/secureConfig', () => ({
  isConfigValid: jest.fn(),
}));

jest.mock('../src/hooks/useConnection', () => ({
  __esModule: true,
  default: jest.fn(),
  useConnection: () => true,
}));

jest.mock('../src/hooks/useKeyboard', () => ({
  __esModule: true,
  default: jest.fn(),
  useKeyboard: () => false,
}));

describe('Chat Integration', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    isConfigValid.mockReturnValue(true);
    sendMessage.mockResolvedValue('This is a mock response from the AI');
  });

  it('should render the chat screen', async () => {
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);
    
    // Check initial welcome message is displayed
    await waitFor(() => {
      expect(getByText(/Hello! I'm your AI assistant/)).toBeTruthy();
    });
    
    // Check input field is rendered
    expect(getByPlaceholderText('Type a message...')).toBeTruthy();
  });

  it('should send a message and display the response', async () => {
    const { getByPlaceholderText, getByTestId, findByText } = render(<ChatScreen />);
    
    // Enter message
    const input = getByPlaceholderText('Type a message...');
    fireEvent.changeText(input, 'Hello AI');
    
    // Send message
    const sendButton = getByTestId('send-button');
    fireEvent.press(sendButton);
    
    // Check API was called
    expect(sendMessage).toHaveBeenCalledWith('Hello AI', expect.anything());
    
    // Check response is displayed
    const response = await findByText('This is a mock response from the AI');
    expect(response).toBeTruthy();
    
    // Input should be cleared
    expect(input.props.value).toBe('');
  });

  it('should show suggestions and allow clicking on them', async () => {
    const { findAllByTestId, getByText } = render(<ChatScreen />);
    
    // Find suggestion chips
    const suggestions = await findAllByTestId('suggestion-chip');
    expect(suggestions.length).toBeGreaterThan(0);
    
    // Click a suggestion
    fireEvent.press(suggestions[0]);
    
    // Check API was called
    expect(sendMessage).toHaveBeenCalled();
  });

  it('should show error when API call fails', async () => {
    // Mock API error
    sendMessage.mockRejectedValueOnce(new Error('API error'));
    
    const { getByPlaceholderText, getByTestId, findByText } = render(<ChatScreen />);
    
    // Enter message
    const input = getByPlaceholderText('Type a message...');
    fireEvent.changeText(input, 'Hello AI');
    
    // Send message
    const sendButton = getByTestId('send-button');
    fireEvent.press(sendButton);
    
    // Check error message is displayed
    const errorMsg = await findByText(/Error: API error/);
    expect(errorMsg).toBeTruthy();
  });
}); 