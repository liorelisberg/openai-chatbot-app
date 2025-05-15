/**
 * @format
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { InputArea } from '../src/components/InputArea';

describe('InputArea', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <InputArea 
        input=""
        onChangeText={() => {}} 
        onSend={() => {}}
        isLoading={false}
      />
    );
    
    // Check the input field is rendered
    expect(getByPlaceholderText('Type a message...')).toBeTruthy();
  });
  
  it('calls onChangeText when text is entered', () => {
    const mockOnChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <InputArea 
        input=""
        onChangeText={mockOnChangeText} 
        onSend={() => {}}
        isLoading={false}
      />
    );
    
    // Enter text
    const input = getByPlaceholderText('Type a message...');
    fireEvent.changeText(input, 'Hello world');
    
    // Check onChangeText was called
    expect(mockOnChangeText).toHaveBeenCalledWith('Hello world');
  });
  
  it('calls onSend when send button is pressed', () => {
    const mockOnSend = jest.fn();
    const { getByTestId } = render(
      <InputArea 
        input="Test message"
        onChangeText={() => {}} 
        onSend={mockOnSend}
        isLoading={false}
      />
    );
    
    // Press send button
    fireEvent.press(getByTestId('send-button'));
    
    // Check onSend was called
    expect(mockOnSend).toHaveBeenCalled();
  });
  
  it('disables send button when input is empty', () => {
    const { getByTestId } = render(
      <InputArea 
        input=""
        onChangeText={() => {}} 
        onSend={() => {}}
        isLoading={false}
      />
    );
    
    // Check button is disabled
    const button = getByTestId('send-button');
    expect(button.props.disabled).toBeTruthy();
  });
  
  it('disables send button when loading', () => {
    const { getByTestId } = render(
      <InputArea 
        input="Test message"
        onChangeText={() => {}} 
        onSend={() => {}}
        isLoading={true}
      />
    );
    
    // Check button is disabled
    const button = getByTestId('send-button');
    expect(button.props.disabled).toBeTruthy();
  });
}); 